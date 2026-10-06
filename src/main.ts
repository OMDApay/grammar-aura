import './styles/main.css'
import * as THREE from 'three'
import { lessons, lessonsByLevel, levels, type LevelId, type Lesson } from './data/curriculum'
import { copy, languageOptions, type Locale } from './data/i18n'

type Mode = 'home' | 'lesson'
type Feedback = { correct: boolean; submitted: string }

type SaveState = {
  locale: Locale
  completed: string[]
  xp: number
  streak: number
  muted: boolean
  selectedLevel: LevelId
  mentor: 'nova' | 'milo' | 'aya'
  hints: number
}

const SAVE_KEY = 'grammar-aura-progress-v1'
const canvasElement = document.querySelector<HTMLCanvasElement>('#game')
const uiRootElement = document.querySelector<HTMLDivElement>('#ui')

if (!canvasElement || !uiRootElement) throw new Error('Grammar Aura could not find its interface root.')
const canvas = canvasElement
const uiRoot = uiRootElement

let state = loadState()
let mode: Mode = 'home'
let currentLessonId = ''
let selectedAnswer = ''
let orderSelection: number[] = []
let feedback: Feedback | null = null
let toastTimer = 0

createScene(canvas)
const audio = createAudio()

function loadState(): SaveState {
  const fallback: SaveState = { locale: 'en', completed: [], xp: 0, streak: 0, muted: false, selectedLevel: 'A1', mentor: 'nova', hints: 0 }
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as Partial<SaveState>
    const validLocale = languageOptions.some(item => item.id === parsed.locale) ? parsed.locale as Locale : 'en'
    const validLevel = levels.some(item => item.id === parsed.selectedLevel) ? parsed.selectedLevel as LevelId : 'A1'
    return {
      locale: validLocale,
      completed: Array.isArray(parsed.completed) ? parsed.completed.filter(item => typeof item === 'string') : [],
      xp: typeof parsed.xp === 'number' ? Math.max(0, parsed.xp) : 0,
      streak: typeof parsed.streak === 'number' ? Math.max(0, parsed.streak) : 0,
      muted: Boolean(parsed.muted),
      selectedLevel: validLevel,
      mentor: parsed.mentor === 'milo' || parsed.mentor === 'aya' ? parsed.mentor : 'nova',
      hints: typeof parsed.hints === 'number' ? Math.max(0, parsed.hints) : 0,
    }
  } catch {
    return fallback
  }
}

function save(): void {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)) } catch { /* Private browsing can disable storage; the game still works. */ }
}

function tr(key: keyof ReturnType<typeof copy>): string {
  return copy(state.locale)[key]
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character)
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[“”"']/g, '').replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ').trim()
}

function percentageFor(level: LevelId): number {
  const items = lessonsByLevel(level)
  if (!items.length) return 0
  return Math.round(items.filter(item => state.completed.includes(item.id)).length / items.length * 100)
}

function currentLesson(): Lesson | undefined {
  return lessons.find(item => item.id === currentLessonId)
}

function render(): void {
  document.documentElement.lang = state.locale
  document.documentElement.dir = 'ltr'
  document.title = mode === 'lesson' && currentLesson() ? `${currentLesson()?.title} · Grammar Aura` : 'Grammar Aura — English Grammar Adventure'
  uiRoot.innerHTML = mode === 'home' ? renderHome() : renderLesson()
  bindEvents()
}

function renderTopbar(): string {
  const optionMarkup = languageOptions.map(option => `<option value="${option.id}" ${option.id === state.locale ? 'selected' : ''}>${escapeHtml(option.native)}</option>`).join('')
  return `<header class="topbar">
    <button class="wordmark" data-action="home" aria-label="Grammar Aura home"><span class="wordmark-mark">✦</span><span>Grammar <b>Aura</b></span></button>
    <div class="top-actions">
      <label class="language-picker"><span class="sr-only">Language</span><select data-role="language" aria-label="Language">${optionMarkup}</select></label>
      <button class="icon-button" data-action="toggle-mute" aria-label="${escapeHtml(state.muted ? tr('soundOff') : tr('soundOn'))}">${state.muted ? '◌' : '◉'}</button>
    </div>
  </header>`
}

function renderHome(): string {
  const selected = levels.find(level => level.id === state.selectedLevel) ?? levels[0]
  const selectedLessons = lessonsByLevel(selected.id)
  const completedCount = state.completed.length
  const total = lessons.length
  const overall = Math.round(completedCount / total * 100)
  return `${renderTopbar()}
  <main class="home-shell">
    <section class="hero-panel" aria-labelledby="page-title">
      <div class="hero-copy">
        <div class="eyebrow"><span class="pulse-dot"></span> CEFR A1 → C2 <span class="eyebrow-line"></span> 78 grammar quests</div>
        <h1 id="page-title">${tr('title')}<span class="title-dot">.</span></h1>
        <p class="hero-subtitle">${tr('subtitle')}</p>
        <div class="hero-actions"><button class="primary-button" data-action="start-next">${tr('continue')} <span>↗</span></button><button class="secondary-button" data-action="academy">${tr('meetMentors')}</button></div>
      </div>
      <div class="hero-characters" aria-label="${escapeHtml(tr('characterLine'))}">
        <div class="orbital orbital-one"></div><div class="orbital orbital-two"></div>
        <button type="button" class="character character-nova ${state.mentor === 'nova' ? 'selected' : ''}" data-mentor="nova" aria-label="Choose Nova"><span class="character-name">Nova</span></button>
        <button type="button" class="character character-milo ${state.mentor === 'milo' ? 'selected' : ''}" data-mentor="milo" aria-label="Choose Milo"><span class="character-name">Milo</span></button>
        <button type="button" class="character character-aya ${state.mentor === 'aya' ? 'selected' : ''}" data-mentor="aya" aria-label="Choose Aya"><span class="character-name">Aya</span></button>
        <div class="hero-spark spark-a">+</div><div class="hero-spark spark-b">✦</div><div class="hero-spark spark-c">•</div>
      </div>
    </section>

    <section class="stat-strip" aria-label="${escapeHtml(tr('progress'))}">
      <div class="stat"><span class="stat-icon mint">✦</span><div><strong>${overall}%</strong><small>${tr('progress')}</small></div></div>
      <div class="stat"><span class="stat-icon violet">◈</span><div><strong>${state.xp}</strong><small>${tr('xp')}</small></div></div>
      <div class="stat"><span class="stat-icon gold">↗</span><div><strong>${state.streak}</strong><small>${tr('streak')}</small></div></div>
      <div class="save-note"><span class="save-check">✓</span><div><strong>${tr('localSave')}</strong><small>${tr('localSaveDetail')}</small></div></div>
    </section>

    <section class="path-section" aria-labelledby="path-title">
      <div class="section-heading"><div><p class="eyebrow">01 / ${tr('choosePath')}</p><h2 id="path-title">${tr('chooseLevel')}</h2></div><span class="section-count">${completedCount}/${total} ${tr('lessons')}</span></div>
      <div class="level-grid">${levels.map(level => renderLevelCard(level.id, level.name, level.tagline, level.color, level.id === selected.id)).join('')}</div>
    </section>

    <section class="lesson-section" aria-labelledby="lesson-title">
      <div class="section-heading"><div><p class="eyebrow">02 / ${escapeHtml(selected.name)}</p><h2 id="lesson-title">${tr('chooseLesson')}</h2></div><span class="level-progress" style="--level-color:${selected.color}">${percentageFor(selected.id)}%</span></div>
      <div class="lesson-grid">${selectedLessons.map((item, index) => renderLessonCard(item, index)).join('')}</div>
    </section>
    <section class="mentor-section"><div class="section-heading"><div><p class="eyebrow">03 / The living academy</p><h2>${tr('meetMentors')}</h2></div><span class="section-count">${tr('mentorLine')}</span></div><div class="mentor-grid">${renderMentorCard('nova', 'Nova', 'The Guide', 'Explains the rule and gives one gentle hint.', '✦')}${renderMentorCard('milo', 'Milo', 'Error Analyst', 'Finds the exact pattern behind every mistake.', '◈')}${renderMentorCard('aya', 'Aya', 'Quest Captain', 'Turns perfect streaks into bonus XP and harder quests.', '✧')}</div></section>
    <footer class="app-footer"><span>Grammar Aura · original learning game</span><button class="text-button" data-action="reset">${tr('reset')}</button></footer>
  </main>`
}

function renderLevelCard(id: LevelId, name: string, tagline: string, color: string, active: boolean): string {
  const complete = percentageFor(id)
  const isUnlocked = id === 'A1' || percentageFor(previousLevel(id)) >= 35
  return `<button class="level-card ${active ? 'active' : ''} ${isUnlocked ? '' : 'locked'}" data-level="${id}" style="--level-color:${color}" ${isUnlocked ? '' : 'aria-disabled="true"'}>
    <span class="level-orbit"><span>${id}</span></span><span class="level-text"><b>${escapeHtml(name)}</b><small>${escapeHtml(tagline)}</small></span><span class="level-percent">${complete}%</span>
  </button>`
}

function previousLevel(id: LevelId): LevelId {
  const index = levels.findIndex(level => level.id === id)
  return levels[Math.max(0, index - 1)].id
}

function renderLessonCard(item: Lesson, index: number): string {
  const done = state.completed.includes(item.id)
  const isNext = !done && lessonsByLevel(item.level).slice(0, index).every(previous => state.completed.includes(previous.id))
  const typeLabel = item.kind === 'choice' ? 'MULTI-CHOICE' : item.kind === 'fill' ? 'FILL THE GAP' : item.kind === 'order' ? 'WORD ORDER' : 'FIX THE ERROR'
  return `<button class="lesson-card ${done ? 'done' : ''} ${isNext ? 'next' : ''}" data-lesson="${item.id}">
    <span class="lesson-number">${String(index + 1).padStart(2, '0')}</span><span class="lesson-card-copy"><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.focus)}</small><em>${typeLabel}</em></span><span class="lesson-status">${done ? '✓' : isNext ? '↗' : '·'}</span>
  </button>`
}

function renderLesson(): string {
  const item = currentLesson()
  if (!item) { mode = 'home'; return renderHome() }
  const level = levels.find(candidate => candidate.id === item.level) ?? levels[0]
  const levelLessons = lessonsByLevel(item.level)
  const index = levelLessons.findIndex(candidate => candidate.id === item.id)
  const doneCount = levelLessons.filter(candidate => state.completed.includes(candidate.id)).length
  return `${renderTopbar()}
  <main class="lesson-shell">
    <div class="lesson-nav"><button class="back-button" data-action="home">← ${tr('back')}</button><span class="lesson-breadcrumb"><b>${item.level}</b> / ${tr('lesson')} ${index + 1} of ${levelLessons.length}</span><span class="lesson-xp">+${item.kind === 'choice' ? 10 : 15} XP</span></div>
    <div class="lesson-progress"><span style="width:${Math.max(8, doneCount / levelLessons.length * 100)}%;background:${level.color}"></span></div>
    <section class="lesson-header"><div class="level-pill" style="--level-color:${level.color}">${item.level}</div><div><p class="eyebrow">${escapeHtml(item.focus)}</p><h1>${escapeHtml(item.title)}</h1><p class="lesson-summary">${escapeHtml(item.summary)}</p></div></section>
    <div class="lesson-layout">
      <article class="rule-card"><div class="card-label">${tr('guide')}</div><div class="mentor-banner ${state.mentor}"><span class="mentor-avatar">${mentorGlyph(state.mentor)}</span><div><b>${mentorName(state.mentor)}</b><small>${mentorRole(state.mentor)}</small></div><button type="button" class="hint-button" data-action="hint">? ${tr('hint')}</button></div><h2>${escapeHtml(item.rule)}</h2><div class="example-box"><span>Example</span><strong>${escapeHtml(item.example)}</strong></div><div class="mentor-line"><span class="mini-avatar">✦</span><span>${escapeHtml(characterMessage(item))}</span></div></article>
      <form class="challenge-card" data-form="challenge"><div class="challenge-top"><span class="card-label">${tr('challenge')}</span><span class="challenge-type">${item.kind === 'choice' ? '01' : item.kind === 'fill' ? '02' : item.kind === 'order' ? '03' : '04'}</span></div><h2>${escapeHtml(challengeHeading(item))}</h2><p class="challenge-prompt">${escapeHtml(item.prompt)}</p>${renderChallengeInput(item)}${feedback ? renderFeedback(item) : `<button class="primary-button challenge-submit" type="submit">${tr('check')} <span>↗</span></button>`}</form>
    </div>
  </main>`
}

function challengeHeading(item: Lesson): string {
  if (item.kind === 'choice') return tr('selectAnswer')
  if (item.kind === 'order') return tr('arrange')
  if (item.kind === 'fix') return tr('correctSentence')
  return tr('completeSentence')
}

function renderChallengeInput(item: Lesson): string {
  if (item.kind === 'choice') return `<div class="answer-options">${(item.options ?? []).map(option => `<button type="button" class="answer-option ${selectedAnswer === option ? 'selected' : ''}" data-answer="${escapeHtml(option)}"><span>${String.fromCharCode(65 + (item.options ?? []).indexOf(option))}</span>${escapeHtml(option)}</button>`).join('')}</div>`
  if (item.kind === 'order') {
    const selectedWords = orderSelection.map(index => item.words?.[index] ?? '')
    const available = (item.words ?? []).map((word, index) => orderSelection.includes(index) ? '' : `<button type="button" class="word-chip" data-word-index="${index}">${escapeHtml(word)}</button>`).join('')
    return `<div class="order-zone"><div class="selected-words">${selectedWords.length ? selectedWords.map((word, index) => `<button type="button" class="selected-chip" data-remove-word="${index}">${escapeHtml(word)} ×</button>`).join('') : `<span class="order-placeholder">${tr('arrange')}</span>`}</div><div class="word-bank">${available}</div></div>`
  }
  return `<label class="answer-field"><span>${tr('yourAnswer')}</span><input name="answer" autocomplete="off" spellcheck="false" placeholder="Type your answer…" value="" autofocus /></label>`
}

function renderFeedback(item: Lesson): string {
  if (!feedback) return ''
  const title = feedback.correct ? tr('correct') : tr('incorrect')
  const detail = feedback.correct ? tr('perfect') : `${tr('yourAnswer')}: ${feedback.submitted || '—'}`
  return `<div class="feedback ${feedback.correct ? 'success' : 'error'}"><div class="feedback-icon">${feedback.correct ? '✓' : '!'}</div><div><strong>${title}</strong><span>${escapeHtml(detail)}</span></div></div><div class="explanation"><span>${tr('explanation')}</span><p>${escapeHtml(item.explanation)}</p></div><div class="feedback-actions">${feedback.correct ? `<button class="primary-button" type="button" data-action="next-lesson">${tr('next')} <span>↗</span></button>` : `<button class="secondary-button" type="button" data-action="retry">${tr('retry')}</button>`}</div>`
}

function mentorName(mentor: SaveState['mentor']): string { return mentor === 'milo' ? 'Milo' : mentor === 'aya' ? 'Aya' : 'Nova' }
function mentorRole(mentor: SaveState['mentor']): string { return mentor === 'milo' ? 'Error Analyst' : mentor === 'aya' ? 'Quest Captain' : 'Grammar Guide' }
function mentorGlyph(mentor: SaveState['mentor']): string { return mentor === 'milo' ? '◈' : mentor === 'aya' ? '✧' : '✦' }
function renderMentorCard(id: SaveState['mentor'], name: string, role: string, bio: string, glyph: string): string { return `<button class="mentor-card ${state.mentor === id ? 'active' : ''}" data-mentor="${id}"><span class="mentor-art ${id}">${glyph}</span><span><b>${name}</b><small>${role}</small><em>${bio}</em></span></button>` }

function characterMessage(item: Lesson): string {
  if (item.level === 'C2') return 'Aya says: precision is a choice, not a coincidence.'
  if (item.level === 'B2' || item.level === 'C1') return 'Milo says: look for the relationship between the ideas.'
  return 'Nova says: make the rule visible in your next sentence.'
}

function bindEvents(): void {
  uiRoot.querySelector<HTMLSelectElement>('[data-role="language"]')?.addEventListener('change', event => {
    const value = (event.target as HTMLSelectElement).value as Locale
    if (languageOptions.some(option => option.id === value)) { state.locale = value; save(); render() }
  })
  uiRoot.querySelectorAll<HTMLElement>('[data-level]').forEach(element => element.addEventListener('click', () => {
    const next = element.dataset.level as LevelId
    if (!next || element.classList.contains('locked')) return
    state.selectedLevel = next; save(); render()
  }))
  uiRoot.querySelectorAll<HTMLElement>('[data-mentor]').forEach(element => element.addEventListener('click', () => { const mentor = element.dataset.mentor as SaveState['mentor']; if (!mentor) return; state.mentor = mentor; save(); audio.unlock(); audio.play(true, false); render(); showToast(`${mentorName(mentor)} is leading your next quest.`, 'success') }))
  uiRoot.querySelectorAll<HTMLElement>('[data-lesson]').forEach(element => element.addEventListener('click', () => {
    currentLessonId = element.dataset.lesson ?? ''
    selectedAnswer = ''; orderSelection = []; feedback = null; mode = 'lesson'; audio.unlock(); render()
  }))
  uiRoot.querySelectorAll<HTMLElement>('[data-answer]').forEach(element => element.addEventListener('click', () => { selectedAnswer = element.dataset.answer ?? ''; audio.unlock(); render() }))
  uiRoot.querySelectorAll<HTMLElement>('[data-word-index]').forEach(element => element.addEventListener('click', () => { orderSelection.push(Number(element.dataset.wordIndex)); render() }))
  uiRoot.querySelectorAll<HTMLElement>('[data-remove-word]').forEach(element => element.addEventListener('click', () => { orderSelection.splice(Number(element.dataset.removeWord), 1); render() }))
  uiRoot.querySelectorAll<HTMLElement>('[data-action]').forEach(element => element.addEventListener('click', () => handleAction(element.dataset.action ?? '')))
  uiRoot.querySelector<HTMLFormElement>('[data-form="challenge"]')?.addEventListener('submit', event => { event.preventDefault(); submitAnswer(event.currentTarget as HTMLFormElement) })
}

function handleAction(action: string): void {
  if (action === 'toggle-mute') { audio.unlock(); state.muted = !state.muted; save(); audio.setMuted(state.muted); render(); return }
  if (action === 'home') { mode = 'home'; feedback = null; render(); return }
  if (action === 'academy') { document.querySelector('.mentor-section')?.scrollIntoView({ behavior: 'smooth' }); return }
  if (action === 'hint') { const item = currentLesson(); if (item && !feedback) { state.hints += 1; save(); showToast(`${mentorName(state.mentor)}: ${item.rule}`, 'success'); audio.playHint() } return }
  if (action === 'start-next') {
    const next = lessons.find(item => !state.completed.includes(item.id)) ?? lessons[lessons.length - 1]
    state.selectedLevel = next.level; currentLessonId = next.id; mode = 'lesson'; feedback = null; selectedAnswer = ''; orderSelection = []; audio.unlock(); render(); return
  }
  if (action === 'retry') { feedback = null; selectedAnswer = ''; orderSelection = []; render(); return }
  if (action === 'next-lesson') { goToNextLesson(); return }
  if (action === 'reset') {
    if (window.confirm(tr('resetConfirm'))) { state = { locale: state.locale, completed: [], xp: 0, streak: 0, muted: state.muted, selectedLevel: 'A1', mentor: 'nova', hints: 0 }; save(); render(); showToast(tr('noData'), 'success') }
  }
}

function submitAnswer(form: HTMLFormElement): void {
  const item = currentLesson()
  if (!item || feedback) return
  let answer = selectedAnswer
  if (item.kind === 'order') answer = orderSelection.map(index => item.words?.[index] ?? '').join(' ')
  if (item.kind === 'fill' || item.kind === 'fix') answer = new FormData(form).get('answer')?.toString() ?? ''
  const correct = normalize(answer) === normalize(item.answer)
  feedback = { correct, submitted: answer }
  if (correct && !state.completed.includes(item.id)) {
    state.completed.push(item.id); state.xp += item.kind === 'choice' ? 10 : 15; state.streak += 1; save()
  }
  audio.unlock(); audio.play(correct, correct && state.streak > 0 && state.streak % 5 === 0)
  render()
}

function goToNextLesson(): void {
  const item = currentLesson()
  if (!item) return
  const levelLessons = lessonsByLevel(item.level)
  const next = levelLessons[levelLessons.findIndex(candidate => candidate.id === item.id) + 1]
  if (next) { currentLessonId = next.id; selectedAnswer = ''; orderSelection = []; feedback = null; render(); return }
  mode = 'home'; feedback = null; render(); showToast(tr('levelComplete'), 'success')
}

function showToast(message: string, kind: 'success' | 'error'): void {
  window.clearTimeout(toastTimer)
  const toast = document.createElement('div')
  toast.className = `toast ${kind}`
  toast.textContent = message
  document.body.appendChild(toast)
  toastTimer = window.setTimeout(() => toast.remove(), 2400)
}

function createScene(target: HTMLCanvasElement): { scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer } {
  const renderer = new THREE.WebGLRenderer({ canvas: target, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0.1, 13)
  scene.add(new THREE.AmbientLight(0xabc7ff, 2.6))
  const key = new THREE.DirectionalLight(0xffffff, 3)
  key.position.set(2, 4, 5); scene.add(key)
  const characters = [makeCharacter(0x5eead4, -1.4, 0.1, 0.5), makeCharacter(0xa78bfa, 0.05, 0.35, 0.62), makeCharacter(0xfbbf24, 1.55, 0.18, 0.48)]
  characters.forEach(character => scene.add(character))
  const halo = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.012, 8, 96), new THREE.MeshBasicMaterial({ color: 0x7c6cff, transparent: true, opacity: 0.35 }))
  halo.rotation.x = Math.PI / 2.2; halo.position.y = 0.4; scene.add(halo)
  const dust = new THREE.Group()
  for (let index = 0; index < 28; index += 1) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(index % 4 === 0 ? 0.035 : 0.018, 8, 8), new THREE.MeshBasicMaterial({ color: index % 3 === 0 ? 0x5eead4 : 0xb9a7ff, transparent: true, opacity: 0.5 }))
    const angle = index / 28 * Math.PI * 2
    dot.position.set(Math.cos(angle) * (2.7 + index % 3 * 0.4), (index % 5 - 2) * 0.52, Math.sin(angle) * 0.8 - 1.2)
    dust.add(dot)
  }
  scene.add(dust)
  let pointerX = 0
  window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight) })
  window.addEventListener('pointermove', event => { pointerX = (event.clientX / window.innerWidth - 0.5) * 0.4 })
  const animate = (time: number): void => {
    const seconds = time * 0.001
    characters.forEach((character, index) => { character.position.y = Math.sin(seconds * 1.2 + index) * 0.08; character.rotation.y = Math.sin(seconds * 0.45 + index) * 0.08 })
    halo.rotation.z = seconds * 0.08; dust.rotation.y = seconds * 0.025
    camera.position.x += (pointerX - camera.position.x) * 0.035
    camera.lookAt(0, 0.15, 0)
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
  }
  window.requestAnimationFrame(animate)
  return { scene, camera, renderer }
}

function makeCharacter(color: number, x: number, y: number, scale: number): THREE.Group {
  const group = new THREE.Group()
  group.position.set(x, y, 0)
  group.scale.setScalar(scale)
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 0.7, 6, 12), new THREE.MeshStandardMaterial({ color, roughness: 0.32, metalness: 0.05 }))
  body.position.y = -0.38; group.add(body)
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 12), new THREE.MeshStandardMaterial({ color: 0xf7d8c2, roughness: 0.5 }))
  head.position.y = 0.35; group.add(head)
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x17152f })
  const eyeLeft = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), eyeMaterial); eyeLeft.position.set(-0.14, 0.4, 0.41); group.add(eyeLeft)
  const eyeRight = eyeLeft.clone(); eyeRight.position.x = 0.14; group.add(eyeRight)
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.025, 6, 32), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 }))
  ring.rotation.x = Math.PI / 2; ring.position.y = 0.08; group.add(ring)
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.28, 8), new THREE.MeshBasicMaterial({ color: 0xfbbf24 }))
  antenna.position.y = 0.92; group.add(antenna)
  const spark = new THREE.Mesh(new THREE.OctahedronGeometry(0.09), new THREE.MeshBasicMaterial({ color: 0xfbbf24 }))
  spark.position.y = 1.1; group.add(spark)
  return group
}

function createAudio(): { unlock: () => void; play: (correct: boolean, perfect: boolean) => void; playHint: () => void; setMuted: (muted: boolean) => void } {
  let context: AudioContext | undefined
  let master: GainNode | undefined
  let music: HTMLAudioElement | undefined
  const unlock = (): void => {
    if (context) { if (context.state === 'suspended') void context.resume(); return }
    context = new AudioContext(); master = context.createGain(); master.gain.value = state.muted ? 0 : 0.14; master.connect(context.destination)
    music = new Audio('./audio/aura-academy.mp3'); music.loop = true; music.preload = 'auto'; music.volume = 0.22; void music.play().catch(() => undefined)
  }
  const play = (correct: boolean, perfect: boolean): void => {
    if (state.muted) return
    unlock(); if (!context || !master) return
    const oscillator = context.createOscillator(); const gain = context.createGain()
    oscillator.type = correct ? 'triangle' : 'sawtooth'; oscillator.frequency.setValueAtTime(correct ? 540 : 180, context.currentTime); oscillator.frequency.exponentialRampToValueAtTime(correct ? (perfect ? 980 : 700) : 90, context.currentTime + 0.24)
    gain.gain.setValueAtTime(0.0001, context.currentTime); gain.gain.exponentialRampToValueAtTime(correct ? 0.18 : 0.08, context.currentTime + 0.02); gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.28)
    oscillator.connect(gain); gain.connect(master); oscillator.start(); oscillator.stop(context.currentTime + 0.3)
  }
  const playHint = (): void => { if (state.muted || !context || !master) return; const now = context.currentTime; [392, 523, 659].forEach((frequency, index) => { const oscillator = context!.createOscillator(); const gain = context!.createGain(); oscillator.type = 'sine'; oscillator.frequency.value = frequency; gain.gain.setValueAtTime(0.0001, now + index * 0.07); gain.gain.exponentialRampToValueAtTime(0.06, now + index * 0.07 + 0.02); gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.07 + 0.25); oscillator.connect(gain); gain.connect(master!); oscillator.start(now + index * 0.07); oscillator.stop(now + index * 0.07 + 0.28) }) }
  const setMuted = (muted: boolean): void => { if (master) master.gain.value = muted ? 0 : 0.14; if (music) { music.volume = muted ? 0 : 0.22; if (!muted) void music.play().catch(() => undefined) } }
  return { unlock, play, playHint, setMuted }
}

render()
;(window as unknown as { __grammarAura?: unknown }).__grammarAura = { state, lessons }
