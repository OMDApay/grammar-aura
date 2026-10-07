export type Locale = 'en' | 'es' | 'tr' | 'fr' | 'de' | 'ru' | 'ha' | 'sw' | 'rw' | 'ja' | 'ko' | 'zh' | 'it'

type Copy = {
  languageName: string
  tagline: string
  title: string
  subtitle: string
  choosePath: string
  progress: string
  lessons: string
  xp: string
  streak: string
  continue: string
  start: string
  back: string
  home: string
  chooseLesson: string
  lesson: string
  challenge: string
  check: string
  next: string
  retry: string
  correct: string
  incorrect: string
  perfect: string
  explanation: string
  yourAnswer: string
  selectAnswer: string
  arrange: string
  completeSentence: string
  correctSentence: string
  completed: string
  locked: string
  unlocked: string
  noData: string
  soundOn: string
  soundOff: string
  localSave: string
  localSaveDetail: string
  guide: string
  levelComplete: string
  levelCompleteDetail: string
  chooseLevel: string
  reset: string
  resetConfirm: string
  yesReset: string
  cancel: string
  characterNova: string
  characterMilo: string
  characterAya: string
  characterLine: string
  meetMentors: string
  mentorLine: string
  hint: string
}

export const languageOptions: { id: Locale; label: string; native: string }[] = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'es', label: 'Spanish', native: 'Español' },
  { id: 'tr', label: 'Turkish', native: 'Türkçe' },
  { id: 'fr', label: 'French', native: 'Français' },
  { id: 'de', label: 'German', native: 'Deutsch' },
  { id: 'ru', label: 'Russian', native: 'Русский' },
  { id: 'ha', label: 'Hausa', native: 'Hausa' },
  { id: 'sw', label: 'Swahili', native: 'Kiswahili' },
  { id: 'rw', label: 'Kinyarwanda', native: 'Ikinyarwanda' },
  { id: 'ja', label: 'Japanese', native: '日本語' },
  { id: 'ko', label: 'Korean', native: '한국어' },
  { id: 'zh', label: 'Chinese', native: '中文' },
  { id: 'it', label: 'Italian', native: 'Italiano' },
]

const base: Copy = {
  languageName: 'English', tagline: 'Grammar, but make it an adventure.', title: 'Grammar Aura', subtitle: 'A living map from first sentence to fluent precision.', choosePath: 'Choose your path', progress: 'Progress', lessons: 'lessons', xp: 'XP', streak: 'streak', continue: 'Continue', start: 'Start lesson', back: 'Back to path', home: 'Home', chooseLesson: 'Choose a lesson', lesson: 'Lesson', challenge: 'Challenge', check: 'Check answer', next: 'Next lesson', retry: 'Try again', correct: 'Correct!', incorrect: 'Not yet', perfect: 'Perfect round!', explanation: 'Why it works', yourAnswer: 'Your answer', selectAnswer: 'Select an answer', arrange: 'Arrange the words', completeSentence: 'Complete the sentence', correctSentence: 'Rewrite the sentence correctly', completed: 'Completed', locked: 'Locked', unlocked: 'Ready', noData: 'Your journey starts here.', soundOn: 'Sound on', soundOff: 'Sound off', localSave: 'Saved on this device', localSaveDetail: 'No account. Progress stays in this browser. Analytics measure anonymous usage.', guide: 'Study the rule, then enter the challenge.', levelComplete: 'Level complete!', levelCompleteDetail: 'You have cleared every lesson in this level.', chooseLevel: 'Choose a CEFR level', reset: 'Reset progress', resetConfirm: 'Reset all local progress?', yesReset: 'Reset', cancel: 'Cancel', characterNova: 'Nova', characterMilo: 'Milo', characterAya: 'Aya', characterLine: 'Every sentence is a door. Let’s open one.', meetMentors: 'Meet your mentors', mentorLine: 'Choose who leads your next quest.', hint: 'Hint',
}

const overrides: Record<Locale, Partial<Copy>> = {
  en: {},
  es: { languageName: 'Español', tagline: 'La gramática se convierte en aventura.', title: 'Grammar Aura', subtitle: 'Un mapa vivo desde la primera frase hasta la precisión.', choosePath: 'Elige tu camino', progress: 'Progreso', lessons: 'lecciones', xp: 'XP', streak: 'racha', continue: 'Continuar', start: 'Empezar lección', back: 'Volver al mapa', home: 'Inicio', chooseLesson: 'Elige una lección', lesson: 'Lección', challenge: 'Desafío', check: 'Comprobar', next: 'Siguiente lección', retry: 'Intentar de nuevo', correct: '¡Correcto!', incorrect: 'Aún no', perfect: '¡Ronda perfecta!', explanation: 'Por qué funciona', yourAnswer: 'Tu respuesta', selectAnswer: 'Elige una respuesta', arrange: 'Ordena las palabras', completeSentence: 'Completa la frase', correctSentence: 'Corrige la frase', completed: 'Completada', locked: 'Bloqueada', unlocked: 'Lista', localSave: 'Guardado en este dispositivo', localSaveDetail: 'Sin cuenta. Tu progreso queda en este navegador. Analytics mide uso anónimo.', guide: 'Estudia la regla y entra en el desafío.', levelComplete: '¡Nivel completado!', levelCompleteDetail: 'Has superado todas las lecciones de este nivel.', chooseLevel: 'Elige un nivel CEFR', reset: 'Reiniciar progreso', resetConfirm: '¿Reiniciar todo el progreso local?', yesReset: 'Reiniciar', cancel: 'Cancelar', characterLine: 'Cada frase es una puerta. Abramos una.', },
  tr: { languageName: 'Türkçe', tagline: 'Grameri bir maceraya dönüştür.', title: 'Grammar Aura', subtitle: 'İlk cümleden akıcı hassasiyete uzanan canlı bir harita.', choosePath: 'Yolunu seç', progress: 'İlerleme', lessons: 'ders', streak: 'seri', continue: 'Devam et', start: 'Derse başla', back: 'Yola dön', home: 'Ana sayfa', chooseLesson: 'Bir ders seç', lesson: 'Ders', challenge: 'Meydan okuma', check: 'Cevabı kontrol et', next: 'Sonraki ders', retry: 'Tekrar dene', correct: 'Doğru!', incorrect: 'Henüz değil', perfect: 'Mükemmel tur!', explanation: 'Neden doğru?', selectAnswer: 'Bir cevap seç', arrange: 'Kelimeleri sırala', completeSentence: 'Cümleyi tamamla', correctSentence: 'Cümleyi düzelt', completed: 'Tamamlandı', locked: 'Kilitli', unlocked: 'Hazır', localSave: 'Bu cihazda kaydedildi', guide: 'Kuralı çalış, sonra meydan okumaya gir.', levelComplete: 'Seviye tamamlandı!', chooseLevel: 'Bir CEFR seviyesi seç', reset: 'İlerlemeyi sıfırla', resetConfirm: 'Yerel ilerlemenin tamamı sıfırlansın mı?', yesReset: 'Sıfırla', cancel: 'İptal', characterLine: 'Her cümle bir kapıdır. Birini açalım.', },
  fr: { languageName: 'Français', tagline: 'La grammaire devient une aventure.', title: 'Grammar Aura', subtitle: 'Une carte vivante, de la première phrase à la précision.', choosePath: 'Choisissez votre parcours', progress: 'Progression', lessons: 'leçons', streak: 'série', continue: 'Continuer', start: 'Commencer la leçon', back: 'Retour au parcours', home: 'Accueil', chooseLesson: 'Choisissez une leçon', lesson: 'Leçon', challenge: 'Défi', check: 'Vérifier', next: 'Leçon suivante', retry: 'Réessayer', correct: 'Correct !', incorrect: 'Pas encore', perfect: 'Tour parfait !', explanation: 'Pourquoi cela fonctionne', selectAnswer: 'Choisissez une réponse', arrange: 'Ordonnez les mots', completeSentence: 'Complétez la phrase', correctSentence: 'Corrigez la phrase', completed: 'Terminée', locked: 'Verrouillée', unlocked: 'Prête', localSave: 'Enregistré sur cet appareil', guide: 'Étudiez la règle, puis relevez le défi.', levelComplete: 'Niveau terminé !', chooseLevel: 'Choisissez un niveau CECR', reset: 'Réinitialiser', resetConfirm: 'Réinitialiser toute la progression locale ?', yesReset: 'Réinitialiser', cancel: 'Annuler', characterLine: 'Chaque phrase est une porte. Ouvrons-en une.', },
  de: { languageName: 'Deutsch', tagline: 'Grammatik wird zum Abenteuer.', title: 'Grammar Aura', subtitle: 'Eine lebendige Karte vom ersten Satz bis zur Präzision.', choosePath: 'Wähle deinen Weg', progress: 'Fortschritt', lessons: 'Lektionen', streak: 'Serie', continue: 'Weiter', start: 'Lektion starten', back: 'Zurück zum Weg', home: 'Start', chooseLesson: 'Wähle eine Lektion', lesson: 'Lektion', challenge: 'Herausforderung', check: 'Antwort prüfen', next: 'Nächste Lektion', retry: 'Noch einmal', correct: 'Richtig!', incorrect: 'Noch nicht', perfect: 'Perfekte Runde!', explanation: 'Warum es funktioniert', selectAnswer: 'Antwort auswählen', arrange: 'Wörter ordnen', completeSentence: 'Satz vervollständigen', correctSentence: 'Satz korrigieren', completed: 'Abgeschlossen', locked: 'Gesperrt', unlocked: 'Bereit', localSave: 'Auf diesem Gerät gespeichert', guide: 'Lerne die Regel, dann starte die Herausforderung.', levelComplete: 'Level abgeschlossen!', chooseLevel: 'Wähle ein GER-Niveau', reset: 'Fortschritt löschen', resetConfirm: 'Den gesamten lokalen Fortschritt löschen?', yesReset: 'Löschen', cancel: 'Abbrechen', characterLine: 'Jeder Satz ist eine Tür. Öffnen wir eine.', },
  ru: { languageName: 'Русский', tagline: 'Грамматика превращается в приключение.', title: 'Grammar Aura', subtitle: 'Живая карта от первого предложения до точности.', choosePath: 'Выберите путь', progress: 'Прогресс', lessons: 'уроков', streak: 'серия', continue: 'Продолжить', start: 'Начать урок', back: 'Вернуться к пути', home: 'Главная', chooseLesson: 'Выберите урок', lesson: 'Урок', challenge: 'Задание', check: 'Проверить', next: 'Следующий урок', retry: 'Попробовать снова', correct: 'Верно!', incorrect: 'Пока нет', perfect: 'Идеальный раунд!', explanation: 'Почему это работает', selectAnswer: 'Выберите ответ', arrange: 'Расставьте слова', completeSentence: 'Дополните предложение', correctSentence: 'Исправьте предложение', completed: 'Пройдено', locked: 'Закрыто', unlocked: 'Готово', localSave: 'Сохранено на этом устройстве', guide: 'Изучите правило, затем выполните задание.', levelComplete: 'Уровень пройден!', chooseLevel: 'Выберите уровень CEFR', reset: 'Сбросить прогресс', resetConfirm: 'Сбросить весь локальный прогресс?', yesReset: 'Сбросить', cancel: 'Отмена', characterLine: 'Каждое предложение — дверь. Откроем одну.', },
  ha: { languageName: 'Hausa', tagline: 'Nahawu ya zama kasada.', choosePath: 'Zaɓi hanyarka', progress: 'Ci gaba', lessons: 'darussa', streak: 'jerin nasara', continue: 'Ci gaba', start: 'Fara darasi', back: 'Koma hanya', home: 'Gida', chooseLesson: 'Zaɓi darasi', lesson: 'Darasi', challenge: 'Kalubale', check: 'Duba amsa', next: 'Darasi na gaba', retry: 'Sake gwadawa', correct: 'Daidai!', incorrect: 'Ba tukuna ba', perfect: 'Zagaye cikakke!', explanation: 'Dalilin da ya sa', selectAnswer: 'Zaɓi amsa', arrange: 'Jera kalmomi', completeSentence: 'Cika jimla', correctSentence: 'Gyara jimla', completed: 'An kammala', locked: 'Kulle', unlocked: 'A shirye', localSave: 'An ajiye a wannan na’ura', guide: 'Koyi ƙa’idar, sannan ka shiga kalubalen.', levelComplete: 'An kammala matakin!', chooseLevel: 'Zaɓi matakin CEFR', reset: 'Sake saita ci gaba', resetConfirm: 'A sake saita duk ci gaban gida?', yesReset: 'Sake saita', cancel: 'Soke', characterLine: 'Kowace jimla ƙofa ce. Mu buɗe ɗaya.', },
  sw: { languageName: 'Kiswahili', tagline: 'Sarufi inakuwa safari.', choosePath: 'Chagua njia yako', progress: 'Maendeleo', lessons: 'masomo', streak: 'mfululizo', continue: 'Endelea', start: 'Anza somo', back: 'Rudi kwenye njia', home: 'Nyumbani', chooseLesson: 'Chagua somo', lesson: 'Somo', challenge: 'Changamoto', check: 'Kagua jibu', next: 'Somo linalofuata', retry: 'Jaribu tena', correct: 'Sahihi!', incorrect: 'Bado', perfect: 'Mzunguko mkamilifu!', explanation: 'Kwa nini inafanya kazi', selectAnswer: 'Chagua jibu', arrange: 'Panga maneno', completeSentence: 'Kamilisha sentensi', correctSentence: 'Sahihisha sentensi', completed: 'Imekamilika', locked: 'Imefungwa', unlocked: 'Tayari', localSave: 'Imehifadhiwa kwenye kifaa hiki', guide: 'Jifunze kanuni, kisha ingia kwenye changamoto.', levelComplete: 'Kiwango kimekamilika!', chooseLevel: 'Chagua kiwango cha CEFR', reset: 'Weka upya maendeleo', resetConfirm: 'Uweke upya maendeleo yote ya kifaa?', yesReset: 'Weka upya', cancel: 'Ghairi', characterLine: 'Kila sentensi ni mlango. Tufungue mmoja.', },
  rw: { languageName: 'Ikinyarwanda', tagline: 'Ikibonezamvugo kiba urugendo.', choosePath: 'Hitamo inzira yawe', progress: 'Intambwe', lessons: 'amasomo', streak: 'uruhererekane', continue: 'Komeza', start: 'Tangira isomo', back: 'Subira ku nzira', home: 'Ahabanza', chooseLesson: 'Hitamo isomo', lesson: 'Isomo', challenge: 'Ikibazo', check: 'Reba igisubizo', next: 'Isomo rikurikira', retry: 'Ongera ugerageze', correct: 'Ni byo!', incorrect: 'Ntabwo birakorwa', perfect: 'Icyiciro cyiza!', explanation: 'Impamvu bikora', selectAnswer: 'Hitamo igisubizo', arrange: 'Tondeka amagambo', completeSentence: 'Uzuza interuro', correctSentence: 'Kosora interuro', completed: 'Byarangiye', locked: 'Birafunze', unlocked: 'Biteguye', localSave: 'Byabitswe kuri iki gikoresho', guide: 'Iga itegeko, hanyuma ukore ikibazo.', levelComplete: 'Urwego rurangiye!', chooseLevel: 'Hitamo urwego rwa CEFR', reset: 'Siba intambwe', resetConfirm: 'Siba intambwe yose ibitswe kuri iki gikoresho?', yesReset: 'Siba', cancel: 'Reka', characterLine: 'Buri nteruro ni umuryango. Reka dufungure umwe.', },
  ja: { languageName: '日本語', tagline: '文法を冒険に変えよう。', choosePath: '進む道を選ぶ', progress: '進み具合', lessons: 'レッスン', streak: '連続', continue: '続ける', start: 'レッスン開始', back: '道に戻る', home: 'ホーム', chooseLesson: 'レッスンを選ぶ', lesson: 'レッスン', challenge: 'チャレンジ', check: '答えを確認', next: '次のレッスン', retry: 'もう一度', correct: '正解！', incorrect: 'もう少し', perfect: 'パーフェクト！', explanation: 'なぜ正しい？', selectAnswer: '答えを選ぶ', arrange: '単語を並べる', completeSentence: '文を完成する', correctSentence: '文を直す', completed: '完了', locked: 'ロック中', unlocked: '準備完了', localSave: 'この端末に保存', guide: 'ルールを学んでチャレンジへ。', levelComplete: 'レベル完了！', chooseLevel: 'CEFRレベルを選ぶ', reset: '進み具合をリセット', resetConfirm: '端末の進み具合をすべて消しますか？', yesReset: 'リセット', cancel: 'キャンセル', characterLine: 'すべての文は扉。ひとつ開けてみよう。', },
  ko: { languageName: '한국어', tagline: '문법을 모험으로 바꿔 보세요.', choosePath: '경로 선택', progress: '진행도', lessons: '레슨', streak: '연속', continue: '계속하기', start: '레슨 시작', back: '경로로 돌아가기', home: '홈', chooseLesson: '레슨 선택', lesson: '레슨', challenge: '도전', check: '정답 확인', next: '다음 레슨', retry: '다시 시도', correct: '정답!', incorrect: '아직 아니에요', perfect: '완벽한 라운드!', explanation: '왜 맞을까요?', selectAnswer: '답 선택', arrange: '단어 배열', completeSentence: '문장 완성', correctSentence: '문장 수정', completed: '완료', locked: '잠김', unlocked: '준비됨', localSave: '이 기기에 저장됨', guide: '규칙을 공부하고 도전에 들어가세요.', levelComplete: '레벨 완료!', chooseLevel: 'CEFR 레벨 선택', reset: '진행도 초기화', resetConfirm: '이 기기의 진행도를 모두 초기화할까요?', yesReset: '초기화', cancel: '취소', characterLine: '모든 문장은 문입니다. 하나를 열어 볼까요?', },
  zh: { languageName: '中文', tagline: '让语法变成一场冒险。', choosePath: '选择你的路径', progress: '进度', lessons: '课', streak: '连续', continue: '继续', start: '开始课程', back: '返回路径', home: '首页', chooseLesson: '选择课程', lesson: '课程', challenge: '挑战', check: '检查答案', next: '下一课', retry: '再试一次', correct: '正确！', incorrect: '还不对', perfect: '完美回合！', explanation: '为什么这样用', selectAnswer: '选择答案', arrange: '排列单词', completeSentence: '完成句子', correctSentence: '改正句子', completed: '已完成', locked: '锁定', unlocked: '准备好了', localSave: '已保存到此设备', guide: '先学习规则，再进入挑战。', levelComplete: '等级完成！', chooseLevel: '选择 CEFR 等级', reset: '重置进度', resetConfirm: '重置此设备上的全部本地进度？', yesReset: '重置', cancel: '取消', characterLine: '每个句子都是一扇门。打开一扇吧。', },
  it: { languageName: 'Italiano', tagline: 'La grammatica diventa un’avventura.', choosePath: 'Scegli il tuo percorso', progress: 'Progressi', lessons: 'lezioni', streak: 'serie', continue: 'Continua', start: 'Inizia la lezione', back: 'Torna al percorso', home: 'Home', chooseLesson: 'Scegli una lezione', lesson: 'Lezione', challenge: 'Sfida', check: 'Controlla la risposta', next: 'Lezione successiva', retry: 'Riprova', correct: 'Corretto!', incorrect: 'Non ancora', perfect: 'Round perfetto!', explanation: 'Perché funziona', selectAnswer: 'Scegli una risposta', arrange: 'Ordina le parole', completeSentence: 'Completa la frase', correctSentence: 'Correggi la frase', completed: 'Completata', locked: 'Bloccata', unlocked: 'Pronta', localSave: 'Salvato su questo dispositivo', guide: 'Studia la regola, poi entra nella sfida.', levelComplete: 'Livello completato!', chooseLevel: 'Scegli un livello CEFR', reset: 'Azzera i progressi', resetConfirm: 'Azzerare tutti i progressi locali?', yesReset: 'Azzera', cancel: 'Annulla', characterLine: 'Ogni frase è una porta. Apriamone una.', },
}

export const copy = (locale: Locale): Copy => ({ ...base, ...overrides[locale] })
