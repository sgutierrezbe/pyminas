/**
 * PySparkle / Python 101 - Motor de Aprendizaje Interactivo
 * Mapa de aventura con nodos circulares 3D, títulos cortos y ruta sinuosa.
 */

// ==================== VERSIÓN Y ESTADO GLOBAL ====================
const APP_VERSION = "v1.37";
window.APP_VERSION = APP_VERSION;
console.log(`%c🐍 pyMinas ${APP_VERSION} (Facultad de Minas · UNAL)`, "color: #059669; font-weight: bold; font-size: 12px;");

let currentLesson = null;
let currentStepIndex = 0;
let soundEnabled = true;
let pyodideInstance = null;
let isPyodideLoading = false;

// ==================== AUTENTICACIÓN INSTITUCIONAL UNAL (SOULSEEK) ====================
const AUTH_TOKEN_KEY = 'pyminas_auth_token';
const AUTH_EMAIL_KEY = 'pyminas_auth_email';

let currentUser = {
  email: localStorage.getItem(AUTH_EMAIL_KEY) || '',
  token: localStorage.getItem(AUTH_TOKEN_KEY) || '',
  xp: 0,
  weeklyStreak: parseInt(localStorage.getItem('pyminas_weekly_streak') || '0', 10) || 0,
  lastActiveWeek: localStorage.getItem('pyminas_last_active_week') || ''
};
window.currentUser = currentUser;

// --- Sistema de Rachas Semanales (Weekly Streaks) ---
function getMondayOfWeek(d = new Date()) {
  const date = new Date(d);
  const day = date.getDay(); // 0: Dom, 1: Lun, ..., 6: Sáb
  const diff = (day === 0 ? -6 : 1 - day);
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getMondayString(d = new Date()) {
  const monday = getMondayOfWeek(d);
  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, '0');
  const date = String(monday.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
}

function getWeekDiff(mondayStrA, mondayStrB) {
  if (!mondayStrA || !mondayStrB) return Infinity;
  const [yA, mA, dA] = mondayStrA.split('-').map(Number);
  const [yB, mB, dB] = mondayStrB.split('-').map(Number);
  const dateA = new Date(yA, mA - 1, dA);
  const dateB = new Date(yB, mB - 1, dB);
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.round((dateB.getTime() - dateA.getTime()) / msPerWeek);
}

function getEffectiveWeeklyStreak() {
  const currentWeek = getMondayString();
  const lastWeek = currentUser.lastActiveWeek || localStorage.getItem('pyminas_last_active_week') || '';
  const rawStreak = parseInt(currentUser.weeklyStreak || localStorage.getItem('pyminas_weekly_streak') || 0, 10) || 0;

  if (rawStreak <= 0 || !lastWeek) return 0;
  const diff = getWeekDiff(lastWeek, currentWeek);
  // Si completó lección en la semana actual (diff=0) o la semana inmediatamente anterior (diff=1), la racha sigue viva
  if (diff <= 1) {
    return rawStreak;
  }
  return 0;
}

function updateStreakDisplay() {
  const effectiveStreak = getEffectiveWeeklyStreak();
  const streakText = `${effectiveStreak} ${effectiveStreak === 1 ? 'sem' : 'sems'}`;

  // Badge en cabecera principal (Navbar del Dashboard)
  const navText = document.getElementById('nav-streak-text');
  if (navText) {
    navText.textContent = streakText;
  }
  const navBadge = document.getElementById('nav-streak-badge');
  if (navBadge) {
    if (effectiveStreak > 0) {
      navBadge.className = 'flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-amber-50 border border-amber-300 rounded-full shadow-sm transition-all shrink-0';
      navBadge.title = `¡Racha semanal activa! Llevas ${effectiveStreak} ${effectiveStreak === 1 ? 'semana consecutiva' : 'semanas consecutivas'} aprendiendo`;
    } else {
      navBadge.className = 'flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-full opacity-70 transition-all shrink-0';
      navBadge.title = 'Completa cualquier lección para iniciar tu racha semanal';
    }
  }

  // Badge en cabecera de la lección / ejercicio (Navbar de la Lección)
  const lessonText = document.getElementById('lesson-streak-text');
  if (lessonText) {
    lessonText.textContent = streakText;
  }
  const lessonBadge = document.getElementById('lesson-streak-badge');
  if (lessonBadge) {
    if (effectiveStreak > 0) {
      lessonBadge.className = 'flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-amber-50 border border-amber-300 rounded-full shadow-sm transition-all shrink-0';
      lessonBadge.title = `¡Racha semanal activa! Llevas ${effectiveStreak} ${effectiveStreak === 1 ? 'semana consecutiva' : 'semanas consecutivas'} aprendiendo`;
    } else {
      lessonBadge.className = 'flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-slate-50 border border-slate-200 rounded-full opacity-70 transition-all shrink-0';
      lessonBadge.title = 'Completa cualquier lección para iniciar tu racha semanal';
    }
  }

  // Contador dentro del modal de victoria
  const victoryStreak = document.getElementById('victory-streak-counter');
  if (victoryStreak) {
    victoryStreak.textContent = `🔥 ${streakText}`;
  }
}

function recordLessonCompletionStreak() {
  const currentWeek = getMondayString();
  const lastWeek = currentUser.lastActiveWeek || localStorage.getItem('pyminas_last_active_week') || '';
  let streak = parseInt(currentUser.weeklyStreak || localStorage.getItem('pyminas_weekly_streak') || 0, 10) || 0;

  if (!lastWeek) {
    streak = 1;
  } else {
    const diff = getWeekDiff(lastWeek, currentWeek);
    if (diff === 0) {
      // Misma semana: si estaba en 0, inicia en 1; si ya tenía racha se mantiene
      if (streak < 1) streak = 1;
    } else if (diff === 1) {
      // Semana consecutiva siguiente: racha continúa (+1 semana)
      streak = (streak < 1 ? 1 : streak) + 1;
    } else if (diff > 1) {
      // Pasó más de una semana sin completar: la racha se reinicia en 1
      streak = 1;
    } else {
      if (streak < 1) streak = 1;
    }
  }

  currentUser.weeklyStreak = streak;
  currentUser.lastActiveWeek = currentWeek;

  localStorage.setItem('pyminas_weekly_streak', String(streak));
  localStorage.setItem('pyminas_last_active_week', currentWeek);

  updateStreakDisplay();

  if (typeof syncProgressToServer === 'function') {
    syncProgressToServer();
  }
}

// Almacenamiento local de lecciones completadas y progreso por pasos
let completedLessons = JSON.parse(localStorage.getItem('py101_completed_lessons') || '[]');
let savedLessonSteps = JSON.parse(localStorage.getItem('py101_lesson_steps') || '{}');

// Seguimiento de precisión y errores de la lección activa
let currentLessonStats = {
  lessonId: '',
  questionsEvaluated: new Set(),
  questionsWrongAttempts: {}
};

function getSavedLessonStep(lessonId) {
  if (!lessonId) return 0;
  const val = savedLessonSteps[lessonId];
  return typeof val === 'number' ? val : 0;
}

function saveLessonStep(lessonId, stepIndex) {
  if (!lessonId) return;
  savedLessonSteps[lessonId] = stepIndex;
  try {
    localStorage.setItem('py101_lesson_steps', JSON.stringify(savedLessonSteps));
    if (typeof syncProgressToServer === 'function') {
      syncProgressToServer();
    }
  } catch (e) {
    console.warn("Error guardando progreso en localStorage:", e);
  }
}

// Web Audio API
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (type === 'select') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(580, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'correct') {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.14, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.28);
      });
    } else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'step') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === 'victory') {
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.14, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.38);
      });
    }
  } catch (err) {
    console.warn("Audio error:", err);
  }
}

function triggerConfetti() {
  if (window.confetti) {
    confetti({
      particleCount: 55,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#10b981', '#34d399', '#059669', '#6ee7b7', '#f59e0b'],
      ticks: 180,
      gravity: 1.15
    });
  }
}

function triggerGrandConfetti() {
  if (window.confetti) {
    const end = Date.now() + 1200;
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 50, origin: { x: 0 }, colors: ['#10b981', '#34d399', '#f59e0b'] });
      confetti({ particleCount: 4, angle: 120, spread: 50, origin: { x: 1 }, colors: ['#10b981', '#34d399', '#f59e0b'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const on = document.getElementById('dash-sound-on');
  const off = document.getElementById('dash-sound-off');
  if (on) on.classList.toggle('hidden', !soundEnabled);
  if (off) off.classList.toggle('hidden', soundEnabled);
}

// ==================== NODOS CIRCULARES 3D ====================
function getCircular3DNodeHTML(status) {
  if (status === 'completed') {
    return `
      <div class="relative w-16 h-16 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 border-4 border-emerald-300 shadow-circle-green flex items-center justify-center cursor-pointer node-circle-btn">
        <div class="w-10 h-10 rounded-full border-2 border-emerald-200/50 flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    `;
  } else if (status === 'active') {
    return `
      <div class="relative flex flex-col items-center">
        <!-- Insignia flotante verde sobre el nodo activo -->
        <div class="floating-badge -top-9 absolute z-20">
          <div class="w-7 h-7 bg-brand-500 rounded-lg transform rotate-45 border-2 border-white shadow-md flex items-center justify-center">
            <div class="w-2.5 h-2.5 bg-white rounded-sm transform -rotate-45"></div>
          </div>
        </div>

        <div class="absolute -inset-2 rounded-full border-2 border-emerald-400 active-circle-halo pointer-events-none"></div>

        <div class="relative w-16 h-16 rounded-full bg-white border-4 border-brand-500 shadow-circle-active flex items-center justify-center cursor-pointer node-circle-btn">
          <div class="w-7 h-7 rounded-full bg-brand-50 border-2 border-brand-300 flex items-center justify-center">
            <div class="w-3 h-3 rounded-full bg-brand-600"></div>
          </div>
        </div>
      </div>
    `;
  } else {
    return `
      <div class="relative w-16 h-16 rounded-full bg-slate-100 border-4 border-slate-300 shadow-circle-locked flex items-center justify-center opacity-60">
        <div class="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center">
          <div class="w-2 h-2 rounded-full bg-slate-400"></div>
        </div>
      </div>
    `;
  }
}

// ==================== RENDERIZADO DEL MAPA EN RUTA SINUOSA ====================
function renderDashboard() {
  const container = document.getElementById('game-map-container');
  if (!container) return;

  container.innerHTML = '';

  CURRICULUM.weeks.forEach((week, wIdx) => {
    const weekSection = document.createElement('div');
    weekSection.className = 'w-full flex flex-col items-center mb-12';

    // Cabecera Pill del Nivel
    const pillHeader = document.createElement('div');
    pillHeader.id = 'week-header-' + week.id;
    pillHeader.className = 'w-full max-w-sm sm:max-w-md bg-white border-2 border-slate-200 rounded-2xl py-3 px-4 sm:px-6 text-center shadow-sm mb-6 z-20';
    pillHeader.innerHTML = `
      <div class="text-[11px] font-extrabold uppercase tracking-widest text-brand-700">NIVEL ${week.number}</div>
      <div class="text-base font-extrabold text-slate-900 mt-0.5">${week.title.replace(`Semana ${week.number}: `, '')}</div>
    `;
    weekSection.appendChild(pillHeader);

    if (week.lessons) {
      // Coordenadas porcentuales para X y fijas en Y para garantizar perfecta alineación y cero desborde en cualquier pantalla
      const nodeLayout = [
        { x: 64, y: 45, align: 'right' },
        { x: 36, y: 150, align: 'left' },
        { x: 64, y: 255, align: 'right' },
        { x: 36, y: 360, align: 'left' },
        { x: 64, y: 465, align: 'right' },
        { x: 36, y: 570, align: 'left' },
        { x: 64, y: 675, align: 'right' },
        { x: 36, y: 780, align: 'left' }
      ];

      const mapHeight = week.lessons && week.lessons.length > 5 ? (week.lessons.length * 105 + 15) : 520;

      const windingCanvas = document.createElement('div');
      windingCanvas.className = 'relative w-full max-w-md';
      windingCanvas.style.height = `${mapHeight}px`;

      // SVG de la curva Bezier punteada usando viewBox 0 0 100 mapHeight y preserveAspectRatio="none"
      const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgPath.setAttribute("class", "absolute inset-0 w-full h-full pointer-events-none z-0");
      svgPath.setAttribute("viewBox", `0 0 100 ${mapHeight}`);
      svgPath.setAttribute("preserveAspectRatio", "none");

      let pathD = "";
      week.lessons.forEach((_, idx) => {
        const pos = nodeLayout[idx] || { x: 50, y: idx * 105 + 45 };
        const realX = pos.x;
        const realY = pos.y;

        if (idx === 0) {
          pathD += `M ${realX} ${realY}`;
        } else {
          const prevPos = nodeLayout[idx - 1] || { x: 50, y: (idx - 1) * 105 + 45 };
          const prevX = prevPos.x;
          const prevY = prevPos.y;
          const midY = (prevY + realY) / 2;
          pathD += ` C ${prevX} ${midY}, ${realX} ${midY}, ${realX} ${realY}`;
        }
      });

      const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathElement.setAttribute("d", pathD);
      pathElement.setAttribute("fill", "none");
      pathElement.setAttribute("stroke", "#10b981");
      pathElement.setAttribute("stroke-width", "4");
      pathElement.setAttribute("stroke-linecap", "round");
      pathElement.setAttribute("vector-effect", "non-scaling-stroke");
      pathElement.setAttribute("class", "animated-dotted-path");
      svgPath.appendChild(pathElement);

      windingCanvas.appendChild(svgPath);

      // Renderizar cada nodo con su anchor centrado exactamente sobre la curva
      week.lessons.forEach((lesson, idx) => {
        const isCompleted = completedLessons.includes(lesson.id);
        let status = 'locked';
        if (isCompleted) {
          status = 'completed';
        } else {
          const prevLesson = week.lessons[idx - 1];
          if (!prevLesson || completedLessons.includes(prevLesson.id)) {
            status = 'active';
          }
        }

        const pos = nodeLayout[idx] || { x: 50, y: idx * 105 + 45, align: 'right' };

        // El anchor se posiciona en el centro geométrico del nodo (-translate-x-1/2 -translate-y-1/2)
        const nodeAnchor = document.createElement('div');
        nodeAnchor.id = `map-node-${lesson.id}`;
        nodeAnchor.className = 'absolute z-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group select-none';
        nodeAnchor.style.left = `${pos.x}%`;
        nodeAnchor.style.top = `${pos.y}px`;
        nodeAnchor.onclick = () => startLesson(lesson.id);

        const circleHtml = getCircular3DNodeHTML(status);
        const displayTitle = lesson.shortTitle || lesson.title;

        // La etiqueta pill se orienta siempre hacia el centro de la pantalla para nunca desbordar la pantalla
        let labelHtml = '';
        if (pos.x <= 50) {
          labelHtml = `
            <div class="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-white border-2 border-slate-200 shadow-sm rounded-xl py-1.5 px-3 whitespace-nowrap group-hover:border-brand-500 group-hover:shadow transition pointer-events-none">
              <span class="text-xs font-extrabold text-slate-800">${displayTitle}</span>
            </div>
          `;
        } else {
          labelHtml = `
            <div class="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white border-2 border-slate-200 shadow-sm rounded-xl py-1.5 px-3 whitespace-nowrap text-right group-hover:border-brand-500 group-hover:shadow transition pointer-events-none">
              <span class="text-xs font-extrabold text-slate-800">${displayTitle}</span>
            </div>
          `;
        }

        nodeAnchor.innerHTML = `${circleHtml} ${labelHtml}`;
        windingCanvas.appendChild(nodeAnchor);
      });

      weekSection.appendChild(windingCanvas);
    }

    container.appendChild(weekSection);
  });
}

function backToDashboard() {
  playSound('select');
  stopAllCodePlayers();
  if (currentLesson) {
    saveLessonStep(currentLesson.id, currentStepIndex);
  }
  if (!isUserAuthenticated()) {
    switchView('login');
  } else {
    switchView('dashboard');
    renderDashboard();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToPrevStep() {
  if (!currentLesson || currentStepIndex <= 0) return;
  stopAllCodePlayers();
  playSound('step');
  currentStepIndex--;
  saveLessonStep(currentLesson.id, currentStepIndex);
  renderCurrentStep();
}

// ==================== REPRODUCTOR (1 EJERCICIO POR PANTALLA) ====================
function startLesson(lessonId) {
  let found = null;
  for (const week of CURRICULUM.weeks) {
    if (week.lessons) {
      found = week.lessons.find(l => l.id === lessonId);
      if (found) break;
    }
  }

  if (!found) return;

  currentLesson = found;
  currentLessonStats = {
    lessonId: lessonId,
    questionsEvaluated: new Set(),
    questionsWrongAttempts: {}
  };
  const savedStep = getSavedLessonStep(lessonId);
  currentStepIndex = (savedStep >= 0 && savedStep < found.steps.length) ? savedStep : 0;

  const startModal = document.getElementById('start-lesson-modal');
  const titleEl = document.getElementById('start-modal-title');
  const descEl = document.getElementById('start-modal-desc');

  if (titleEl) titleEl.textContent = found.title;
  if (descEl) {
    if (currentStepIndex > 0) {
      descEl.textContent = `${found.tag || 'Fundamentos'} · Continuando desde el Paso ${currentStepIndex + 1} de ${found.steps.length}.`;
    } else {
      descEl.textContent = `${found.tag || 'Fundamentos'} · ${found.steps.length} retos interactivos para construir tu intuición paso a paso.`;
    }
  }

  if (startModal) {
    playSound('step');
    startModal.classList.remove('hidden');
  } else {
    dismissStartModal();
  }
}

// ==================== PANTALLA DE CARGA ARTIFICIAL ====================
const LOADING_TIPS = [
  "En Python, los textos se escriben entre comillas simples o dobles: 'hola' o \"hola\".",
  "La función print() añade un salto de línea automático al final de la salida por defecto.",
  "Para convertir texto a número entero usamos int(), y para decimales float().",
  "El operador // realiza una división entera, descartando los decimales.",
  "El módulo math incluye funciones clave como math.sqrt() y constantes como math.pi.",
  "El orden de operaciones sigue la jerarquía matemática estándar (PEMDAS)."
];

function showLessonLoadingScreen(callback) {
  const loadingScreen = document.getElementById('lesson-loading-screen');
  const tagEl = document.getElementById('loading-lesson-tag');
  const titleEl = document.getElementById('loading-lesson-title');
  const statusEl = document.getElementById('loading-status-text');
  const barEl = document.getElementById('loading-progress-bar');
  const percentEl = document.getElementById('loading-percent-label');
  const tipEl = document.getElementById('loading-tip-text');

  if (!loadingScreen || window.FAST_ANIM) {
    if (loadingScreen) loadingScreen.classList.add('hidden');
    if (callback) callback();
    return;
  }

  // Actualizar datos de la lección
  if (currentLesson) {
    if (tagEl) tagEl.textContent = currentLesson.tag || 'Preparando lección';
    if (titleEl) titleEl.textContent = currentLesson.title;
  }

  if (tipEl) {
    const randomTip = LOADING_TIPS[Math.floor(Math.random() * LOADING_TIPS.length)];
    tipEl.textContent = randomTip;
  }

  // Reset de animación
  if (barEl) barEl.style.width = '0%';
  if (percentEl) percentEl.textContent = '0%';
  if (statusEl) statusEl.textContent = 'Iniciando entorno interactivo...';

  loadingScreen.classList.remove('hidden');

  // Secuencia de progreso artificial (~1.25s)
  const steps = [
    { p: 28, delay: 200, text: 'Configurando variables del intérprete...' },
    { p: 58, delay: 480, text: 'Compilando ejemplos didácticos...' },
    { p: 88, delay: 800, text: 'Cargando retos interactivos...' },
    { p: 100, delay: 1050, text: '¡Todo listo!' }
  ];

  steps.forEach(st => {
    setTimeout(() => {
      if (barEl) barEl.style.width = `${st.p}%`;
      if (percentEl) percentEl.textContent = `${st.p}%`;
      if (statusEl) statusEl.textContent = st.text;
    }, st.delay);
  });

  setTimeout(() => {
    playSound('step');
    loadingScreen.classList.add('hidden');
    if (callback) callback();
  }, 1250);
}

function closeStartModalWithoutStarting() {
  const startModal = document.getElementById('start-lesson-modal');
  if (startModal) {
    startModal.classList.add('hidden');
  }
}

function dismissStartModal() {
  const startModal = document.getElementById('start-lesson-modal');
  if (startModal) {
    startModal.classList.add('hidden');
  }

  playSound('select');

  // Mostrar pantalla de carga artificial antes de abrir el ejercicio
  showLessonLoadingScreen(() => {
    switchView('lesson');
    renderCurrentStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function updateLessonProgressSegments() {
  const container = document.getElementById('lesson-segments-container');
  if (!container || !currentLesson) return;

  const total = currentLesson.steps.length;
  let html = '';

  for (let i = 0; i < total; i++) {
    if (i < currentStepIndex) {
      html += `<div class="step-segment h-2 sm:h-2.5 flex-1 rounded-full bg-brand-500 min-w-0"></div>`;
    } else if (i === currentStepIndex) {
      html += `<div class="step-segment h-2 sm:h-2.5 flex-1 rounded-full bg-brand-400 ring-2 ring-brand-200 min-w-0"></div>`;
    } else {
      html += `<div class="step-segment h-2 sm:h-2.5 flex-1 rounded-full bg-slate-200 min-w-0"></div>`;
    }
  }
  container.innerHTML = html;
}

function scrollToLessonTop(behavior = 'smooth') {
  const doScroll = () => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: behavior });
    } catch (e) {
      window.scrollTo(0, 0);
    }
    const viewLesson = document.getElementById('view-lesson');
    if (viewLesson && viewLesson.scrollTop > 0) {
      try {
        viewLesson.scrollTo({ top: 0, left: 0, behavior: behavior });
      } catch (e) {
        viewLesson.scrollTop = 0;
      }
    }
    const contentArea = document.getElementById('lesson-content-area');
    if (contentArea && contentArea.scrollTop > 0) {
      try {
        contentArea.scrollTo({ top: 0, left: 0, behavior: behavior });
      } catch (e) {
        contentArea.scrollTop = 0;
      }
    }
  };

  doScroll();
  requestAnimationFrame(doScroll);
  setTimeout(doScroll, 80);
}

function renderCurrentStep() {
  const contentArea = document.getElementById('lesson-content-area');
  updateLessonProgressSegments();
  updateStreakDisplay();

  const prevStepBtn = document.getElementById('lesson-prev-step-btn');
  if (prevStepBtn) {
    if (currentStepIndex > 0 && currentLesson && currentStepIndex < currentLesson.steps.length) {
      prevStepBtn.classList.remove('hidden');
    } else {
      prevStepBtn.classList.add('hidden');
    }
  }

  if (currentStepIndex >= currentLesson.steps.length) {
    renderLessonVictory();
    return;
  }

  if (currentLesson) {
    saveLessonStep(currentLesson.id, currentStepIndex);
  }

  stopAllCodePlayers();
  scrollToLessonTop('smooth');
  const step = currentLesson.steps[currentStepIndex];

  if (step.type === 'explanation') {
    renderExplanationStep(step, contentArea);
  } else if (step.type === 'predict') {
    renderPredictStep(step, contentArea);
  } else if (step.type === 'visualizer_print') {
    renderPrintVisualizer(step, contentArea);
  } else if (step.type === 'visualizer_input') {
    renderInputVisualizer(step, contentArea);
  } else if (step.type === 'visualizer_math') {
    renderMathVisualizer(step, contentArea);
  } else if (step.type === 'code_sandbox') {
    renderSandboxStep(step, contentArea);
  }
}

// ==================== REPRODUCTOR DE CÓDIGO PASO A PASO (ESTILO BRILLIANT) ====================
const codePlayerRegistry = {};
let sandboxAnimTimer = null;

function stopSandboxAnimation() {
  if (sandboxAnimTimer) {
    clearTimeout(sandboxAnimTimer);
    clearInterval(sandboxAnimTimer);
    sandboxAnimTimer = null;
  }
}

function stopAllCodePlayers() {
  stopSandboxAnimation();
  Object.values(codePlayerRegistry).forEach(player => {
    if (player.timer) {
      clearInterval(player.timer);
      player.timer = null;
    }
  });
}

const CONTROL_KEYWORDS = new Set(['import', 'from', 'as', 'def', 'return', 'for', 'in', 'while', 'if', 'else', 'elif', 'and', 'or', 'not']);
const BUILTIN_TYPES = new Set(['int', 'float', 'str', 'bool', 'len', 'range', 'input']);
const BOOL_CONSTANTS = new Set(['True', 'False', 'None']);

function splitCodeAndComment(line) {
  if (!line) return { code: '', comment: '' };
  let inString = false;
  let quoteChar = null;
  let isEscaped = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (isEscaped) {
      isEscaped = false;
      continue;
    }
    if (ch === '\\' && inString) {
      isEscaped = true;
      continue;
    }
    if ((ch === '"' || ch === "'") && !inString) {
      inString = true;
      quoteChar = ch;
    } else if (ch === quoteChar && inString) {
      inString = false;
      quoteChar = null;
    } else if (ch === '#' && !inString) {
      return {
        code: line.slice(0, i),
        comment: line.slice(i)
      };
    }
  }
  return { code: line, comment: '' };
}

function highlightPythonSyntax(line, playerId = '') {
  if (!line) return '';
  
  const { code: rawCode, comment: rawComment } = splitCodeAndComment(line);
  if (!rawCode.trim() && rawComment) {
    return `<span class="text-[#6a9955] italic font-normal">${escapeHtml(line)}</span>`;
  }

  const codePart = rawCode;
  const commentPart = rawComment ? `<span class="text-[#6a9955] italic font-normal">${escapeHtml(rawComment)}</span>` : '';

  // Tokenizador en una sola pasada: nunca procesa dos veces los mismos caracteres
  // Coincide con: Strings entre comillas | Slot ___ | Números | Palabras/Identificadores | Operadores | Puntuación | Espacios
  const tokenRegex = /(["'])(?:(?=(\\?))\2.)*?\1|___|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_]\w*\b|\/\/|\*\*|==|!=|<=|>=|[+\-*/%=<>]|[()[\]{},.:]|\s+/g;

  let resultHtml = '';
  let match;
  let lastIndex = 0;

  while ((match = tokenRegex.exec(codePart)) !== null) {
    const token = match[0];

    // 1. Strings
    if (token.startsWith('"') || token.startsWith("'")) {
      resultHtml += `<span class="text-[#fde047] font-normal">${escapeHtml(token)}</span>`;
    }
    // 2. Slot de código interactivo
    else if (token === '___') {
      if (playerId) {
        resultHtml += `<span id="code-slot-${playerId}" class="code-slot-box slot-empty px-2 py-0.5 text-xs font-bold font-mono select-none" data-player="${playerId}"><span class="blinking-cursor"></span></span>`;
      } else {
        resultHtml += `<span class="code-slot-box slot-empty px-2 py-0.5 text-xs font-bold font-mono select-none"><span class="blinking-cursor"></span></span>`;
      }
    }
    // 3. Números literales
    else if (/^\d+(?:\.\d+)?$/.test(token)) {
      resultHtml += `<span class="text-[#c084fc] font-medium">${token}</span>`;
    }
    // 4. Palabras clave / Funciones / Variables
    else if (/^[a-zA-Z_]\w*$/.test(token)) {
      if (token === 'print') {
        resultHtml += `<span class="text-[#f472b6] font-bold">print</span>`;
      } else if (token === 'math') {
        resultHtml += `<span class="text-[#4ec9b0] font-bold">math</span>`;
      } else if (CONTROL_KEYWORDS.has(token)) {
        resultHtml += `<span class="text-[#c586c0] font-bold">${token}</span>`;
      } else if (BUILTIN_TYPES.has(token)) {
        resultHtml += `<span class="text-[#4ec9b0] font-bold">${token}</span>`;
      } else if (BOOL_CONSTANTS.has(token)) {
        resultHtml += `<span class="text-[#569cd6] font-bold">${token}</span>`;
      } else {
        // Variables e identificadores (azul claro VS Code: #9cdcfe)
        resultHtml += `<span class="text-[#9cdcfe]">${token}</span>`;
      }
    }
    // 5. Operadores
    else if (/^(\/\/|\*\*|==|!=|<=|>=|[+\-*/%=<>])$/.test(token)) {
      resultHtml += `<span class="text-[#94a3b8] font-bold">${escapeHtml(token)}</span>`;
    }
    // 6. Puntuación
    else if (/^[()[\]{},.:]$/.test(token)) {
      resultHtml += `<span class="text-[#cbd5e1]">${escapeHtml(token)}</span>`;
    }
    // 7. Espacios en blanco
    else {
      resultHtml += token;
    }

    lastIndex = tokenRegex.lastIndex;
  }

  // Cualquier resto no capturado
  if (lastIndex < codePart.length) {
    resultHtml += escapeHtml(codePart.slice(lastIndex));
  }

  return resultHtml + commentPart;
}

function replaceSafePythonOperators(code) {
  // 0. Soporte de f-strings en simulador (f"..." o f'...'): convertir a template literals `...`
  code = code.replace(/\bf(["'])([\s\S]*?)\1/g, (match, q, content) => {
    const jsTemplate = content.replace(/\{([^}]+)\}/g, '${$1}');
    return '`' + jsTemplate + '`';
  });

  // 1. Proteger cadenas entre comillas simples o dobles para no alterar su contenido
  const stringLiterals = [];
  let tokenized = code.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
    const placeholder = `__PY_STR_${stringLiterals.length}__`;
    stringLiterals.push(match);
    return placeholder;
  });

  // 2. Reemplazos seguros en la lógica del código
  tokenized = tokenized.replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false');
  tokenized = tokenized.replace(/\band\b/g, '&&');
  tokenized = tokenized.replace(/\bor\b/g, '||');
  tokenized = tokenized.replace(/\bnot\s+/g, '!');
  tokenized = tokenized.replace(/\bnot\s*\(/g, '!(');
  tokenized = tokenized.replace(/\btype\s*\(([^)]+)\)\.__name__/g, '((typeof ($1) === "number") ? (Number.isInteger($1) ? "int" : "float") : (typeof ($1) === "string" ? "str" : (typeof ($1) === "boolean" ? "bool" : "object")))');
  tokenized = tokenized.replace(/\bint\s*\(([^)]+)\)/g, 'Math.trunc(Number($1))');
  tokenized = tokenized.replace(/\bfloat\s*\(([^)]+)\)/g, 'Number($1)');
  tokenized = tokenized.replace(/\bstr\s*\(([^)]+)\)/g, 'String($1)');
  tokenized = tokenized.replace(/([a-zA-Z0-9_]+)\s*\/\/\s*([a-zA-Z0-9_]+)/g, 'Math.floor(($1) / ($2))');

  // 3. Restaurar cadenas originales
  for (let i = 0; i < stringLiterals.length; i++) {
    tokenized = tokenized.replace(`__PY_STR_${i}__`, stringLiterals[i]);
  }

  return tokenized;
}

function evaluateSafeExpr(expr, scope, math) {
  const { code: cleanExpr } = splitCodeAndComment(expr);
  let jsExpr = cleanExpr.trim();

  if (/\bsqrt\s*\(/.test(jsExpr) && !/math\.sqrt/.test(jsExpr)) {
    throw new Error("NameError: name 'sqrt' is not defined (usa math.sqrt)");
  }

  if (/\bfloat\s*\(\s*["']([^"']+)["']\s*\)/.test(expr)) {
    const floatArg = expr.match(/\bfloat\s*\(\s*["']([^"']+)["']\s*\)/)[1];
    if (isNaN(Number(floatArg))) {
      throw new Error(`ValueError: could not convert string to float: '${floatArg}'`);
    }
  }

  for (const [k, v] of Object.entries(scope)) {
    if (typeof v === 'string' && new RegExp(`[\\-\\*/%]\\s*\\b${k}\\b|\\b${k}\\b\\s*[\\-\\*/%]`).test(expr)) {
      throw new Error(`TypeError: unsupported operand type(s) for -: 'int' and 'str'`);
    }
  }

  jsExpr = replaceSafePythonOperators(jsExpr);

  const isPlainDivision = /\b\d+\s*\/\s*\d+\b/.test(expr);
  const scopeKeys = Object.keys(scope);
  const scopeVals = Object.values(scope);

  try {
    const fn = new Function('math', ...scopeKeys, `return (${jsExpr});`);
    const res = fn(math, ...scopeVals);
    if (isPlainDivision && typeof res === 'number' && Number.isInteger(res)) {
      return res.toFixed(1);
    }
    return res;
  } catch (e) {
    return expr;
  }
}

function evaluateSafePrint(innerStr, scope, math) {
  let inner = innerStr.trim();
  let sep = " ";
  let end = "\n";

  const sepMatch = inner.match(/sep\s*=\s*["'](.*?)["']/);
  if (sepMatch) {
    sep = sepMatch[1];
    inner = inner.replace(/,?\s*sep\s*=\s*["'].*?["']/, '');
  }

  const endMatch = inner.match(/end\s*=\s*["'](.*?)["']/);
  if (endMatch) {
    end = endMatch[1].replace('\\n', '\n');
    inner = inner.replace(/,?\s*end\s*=\s*["'].*?["']/, '');
  }

  const parts = [];
  let cur = '';
  let inQuotes = false;
  let quoteChar = '';

  for (let ch of inner) {
    if ((ch === '"' || ch === "'") && !inQuotes) {
      inQuotes = true;
      quoteChar = ch;
      cur += ch;
    } else if (ch === quoteChar && inQuotes) {
      inQuotes = false;
      cur += ch;
    } else if (ch === ',' && !inQuotes) {
      parts.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) parts.push(cur.trim());

  const evaluatedParts = parts.map(part => {
    try {
      const val = evaluateSafeExpr(part, scope, math);
      if (typeof val === 'boolean') {
        return val ? 'True' : 'False';
      }
      if (val === null || val === undefined) {
        return 'None';
      }
      return String(val);
    } catch (e) {
      return part;
    }
  });

  return evaluatedParts.join(sep) + end;
}

function tracePythonExecution(code, expectedOutput, userInputs = {}) {
  const trimmed = (code || '').trim();
  const hasInputCall = /\binput\s*\(/.test(trimmed);

  if (!hasInputCall && window.BAKED_TRACES && window.BAKED_TRACES[trimmed]) {
    const baked = window.BAKED_TRACES[trimmed];
    return {
      lines: baked.lines,
      lineTrace: baked.lineTrace
    };
  }

  const lines = code.split('\n');
  const scope = {};
  const math = {
    pi: 3.141592653589793,
    e: 2.718281828459045,
    sqrt: (x) => Math.sqrt(Number(x)),
    ceil: (x) => Math.ceil(Number(x)),
    floor: (x) => Math.floor(Number(x)),
    pow: (x, y) => Math.pow(Number(x), Number(y))
  };

  const lineTrace = [];
  let stdoutBuffer = "";
  const getOutputSoFar = () => stdoutBuffer ? stdoutBuffer.replace(/\n$/, '').split('\n') : [];
  const condStack = [];

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const { code: codeWithoutComment } = splitCodeAndComment(raw);
    const trimmedLine = codeWithoutComment.trim();

    if (!trimmedLine) {
      lineTrace.push({ prints: null, outputSoFar: getOutputSoFar() });
      continue;
    }

    // Calcular sangría / indentación
    const indentMatch = raw.match(/^([ \t]*)/);
    const currentIndent = indentMatch ? indentMatch[1].length : 0;

    const isIf = /^if\s+(.+):\s*$/.test(trimmedLine);
    const isElif = /^elif\s+(.+):\s*$/.test(trimmedLine);
    const isElse = /^(else)\s*:\s*$/.test(trimmedLine);

    // Ajustar la pila de condicionales al nivel de indentación actual
    while (condStack.length > 0) {
      const top = condStack[condStack.length - 1];
      if (currentIndent <= top.baseIndent && !(currentIndent === top.baseIndent && (isElif || isElse))) {
        condStack.pop();
      } else {
        break;
      }
    }

    const currentFrame = condStack.length > 0 ? condStack[condStack.length - 1] : null;
    const parentActive = condStack.length === 0 || condStack.every((frame, fIdx) => fIdx === condStack.length - 1 || frame.active);
    const inActiveBranch = condStack.length === 0 || condStack.every(frame => frame.active);

    // 1. Encabezado if
    if (isIf) {
      const ifMatch = trimmedLine.match(/^if\s+(.+):\s*$/);
      const condExpr = ifMatch[1].trim();
      let condVal = false;
      const willEval = parentActive && (condStack.length === 0 || (currentFrame && currentFrame.active));
      if (willEval) {
        try {
          condVal = Boolean(evaluateSafeExpr(condExpr, scope, math));
        } catch (e) {
          condVal = false;
        }
      }
      condStack.push({
        baseIndent: currentIndent,
        chainMatched: condVal,
        active: condVal,
        parentActive: willEval
      });
      if (willEval) {
        lineTrace.push({ prints: null, outputSoFar: getOutputSoFar() });
      } else {
        lineTrace.push({ skipped: true, prints: null, outputSoFar: getOutputSoFar() });
      }
      continue;
    }

    // 2. Encabezado elif
    if (isElif) {
      const elifMatch = trimmedLine.match(/^elif\s+(.+):\s*$/);
      const condExpr = elifMatch[1].trim();
      const top = condStack[condStack.length - 1];
      if (top && top.parentActive && !top.chainMatched) {
        let condVal = false;
        try {
          condVal = Boolean(evaluateSafeExpr(condExpr, scope, math));
        } catch (e) {
          condVal = false;
        }
        if (condVal) {
          top.chainMatched = true;
          top.active = true;
        } else {
          top.active = false;
        }
        lineTrace.push({ prints: null, outputSoFar: getOutputSoFar() });
      } else {
        if (top) top.active = false;
        lineTrace.push({ skipped: true, prints: null, outputSoFar: getOutputSoFar() });
      }
      continue;
    }

    // 3. Encabezado else
    if (isElse) {
      const top = condStack[condStack.length - 1];
      if (top && top.parentActive && !top.chainMatched) {
        top.chainMatched = true;
        top.active = true;
        lineTrace.push({ prints: null, outputSoFar: getOutputSoFar() });
      } else {
        if (top) top.active = false;
        lineTrace.push({ skipped: true, prints: null, outputSoFar: getOutputSoFar() });
      }
      continue;
    }

    // 4. Líneas dentro de ramas omitidas
    if (!inActiveBranch) {
      lineTrace.push({ skipped: true, prints: null, outputSoFar: getOutputSoFar() });
      continue;
    }

    if (trimmedLine.startsWith('import')) {
      lineTrace.push({ prints: null, outputSoFar: getOutputSoFar() });
      continue;
    }

    // Comprobar si la línea contiene una llamada a input()
    const isInputLine = /\binput\s*\(/.test(trimmedLine);
    if (isInputLine) {
      const pMatch = trimmedLine.match(/\binput\s*\(\s*(?:(['"])([\s\S]*?)\1)?\s*\)/);
      const prompt = pMatch && pMatch[2] !== undefined ? pMatch[2] : "";

      const assignMatch = trimmedLine.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
      const varName = assignMatch ? assignMatch[1] : null;
      const fullExpr = assignMatch ? assignMatch[2].trim() : trimmedLine;

      const pLow = prompt.toLowerCase();
      let smartDefault = "20";
      if (pLow.includes('nota')) smartDefault = "4.2";
      else if (pLow.includes('segundo') || pLow.includes('(y)')) smartDefault = "20";
      else if (pLow.includes('primer') || pLow.includes('(x)')) smartDefault = "10";
      else if (pLow.includes('clasificar') || pLow.includes('entero')) smartDefault = "-8";
      else if (pLow.includes('edad')) smartDefault = "14";
      else if (pLow.includes('llamas') || pLow.includes('nombre')) smartDefault = "Sara";

      let enteredVal = userInputs[i] !== undefined 
        ? userInputs[i] 
        : (window.FAST_ANIM ? smartDefault : null);

      if (enteredVal !== null) {
        const safeValLiteral = JSON.stringify(String(enteredVal));
        const replacedExpr = fullExpr.replace(/\binput\s*\(\s*(?:(['"])([\s\S]*?)\1)?\s*\)/, safeValLiteral);
        try {
          const val = evaluateSafeExpr(replacedExpr, scope, math);
          if (varName) scope[varName] = val;
        } catch (err) {
          if (varName) scope[varName] = enteredVal;
        }
        stdoutBuffer += prompt + enteredVal + "\n";
        lineTrace.push({
          isInput: true,
          isCompleted: true,
          prompt: prompt,
          userValue: enteredVal,
          varName: varName,
          prints: prompt + enteredVal,
          outputSoFar: getOutputSoFar()
        });
      } else {
        lineTrace.push({
          isInput: true,
          isCompleted: false,
          prompt: prompt,
          varName: varName,
          fullExpr: fullExpr,
          prints: prompt,
          outputSoFar: stdoutBuffer ? [...stdoutBuffer.replace(/\n$/, '').split('\n'), prompt] : [prompt]
        });
      }
      continue;
    }

    const assignMatch = trimmedLine.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
    if (assignMatch) {
      const varName = assignMatch[1];
      const expr = assignMatch[2].trim();
      try {
        const val = evaluateSafeExpr(expr, scope, math);
        scope[varName] = val;
      } catch (err) {
        scope[varName] = expr;
      }
      lineTrace.push({ prints: null, outputSoFar: getOutputSoFar() });
      continue;
    }

    const printMatch = trimmedLine.match(/^print\s*\((.*)\)$/);
    if (printMatch) {
      const outputText = evaluateSafePrint(printMatch[1], scope, math);
      stdoutBuffer += outputText;
      lineTrace.push({ prints: outputText.replace(/\n$/, ''), outputSoFar: getOutputSoFar() });
      continue;
    }

    lineTrace.push({ prints: null, outputSoFar: getOutputSoFar() });
  }

  if (!stdoutBuffer && expectedOutput) {
    const expectedLines = expectedOutput.split('\n');
    let outIdx = 0;
    for (let i = 0; i < lineTrace.length; i++) {
      if (lines[i].includes('print') && outIdx < expectedLines.length) {
        lineTrace[i].prints = expectedLines[outIdx];
        outIdx++;
        lineTrace[i].outputSoFar = expectedLines.slice(0, outIdx);
      }
    }
  }

  return { lines, lineTrace };
}

// --- Desplazamiento inteligente para encuadrar ventanitas de código en pantalla ---
function ensureCodeVisible(target, forceCenter = true) {
  let el = null;
  if (typeof target === 'string') {
    el = document.getElementById(target)
      || document.getElementById(`code-player-wrapper-${target}`)
      || document.getElementById(`code-lines-${target}`)
      || document.getElementById(`single-sandbox-term`)
      || document.querySelector(target);
  } else if (target instanceof HTMLElement) {
    el = target;
  }

  if (!el) {
    el = document.getElementById('sandbox-editor-container')
      || document.querySelector('.code-exec-line')?.closest('.flex-col')
      || document.getElementById('single-sandbox-term');
  }

  if (!el) return;

  const wrapper = el.closest('#sandbox-editor-container')
    || el.closest('[id^="code-player-wrapper-"]')
    || el;

  requestAnimationFrame(() => {
    const rect = wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    const lessonHeader = document.querySelector('#view-lesson header') || document.querySelector('header');
    const headerHeight = lessonHeader ? Math.max(50, lessonHeader.getBoundingClientRect().height) : 64;

    const availableHeight = windowHeight - headerHeight;
    const topMargin = 20;
    const bottomMargin = 20;

    if (!forceCenter) {
      const isFullyVisible = (
        rect.top >= (headerHeight + topMargin) &&
        rect.bottom <= (windowHeight - bottomMargin)
      );
      if (isFullyVisible) return;
    }

    let targetScrollY;
    if (rect.height < availableHeight - (topMargin + bottomMargin)) {
      const idealTop = headerHeight + ((availableHeight - rect.height) / 2);
      targetScrollY = window.pageYOffset + rect.top - idealTop;
    } else {
      targetScrollY = window.pageYOffset + rect.top - headerHeight - topMargin;
    }

    targetScrollY = Math.max(0, Math.round(targetScrollY));

    if (Math.abs(window.pageYOffset - targetScrollY) > 8) {
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    }
  });
}
window.ensureCodeVisible = ensureCodeVisible;

function renderCodePlayerHTML(playerId, code, expectedOutput, isLocked = false) {
  const { lines, lineTrace } = tracePythonExecution(code, expectedOutput);
  
  codePlayerRegistry[playerId] = {
    code,
    lines,
    lineTrace,
    currentIndex: -1,
    isPlaying: false,
    timer: null,
    isLocked: !!isLocked
  };

  const linesHtml = lines.map((line, idx) => {
    return `
      <div id="code-line-${playerId}-${idx}" class="code-exec-line flex items-center py-1 px-2 rounded-lg font-mono text-xs sm:text-sm min-w-0 w-max sm:w-full">
        <span class="w-5 sm:w-6 shrink-0 flex items-center justify-center font-bold text-white text-xs select-none" id="code-arrow-${playerId}-${idx}"></span>
        <span class="w-5 sm:w-6 shrink-0 text-slate-500 text-right pr-2 sm:pr-3 text-xs select-none">${idx + 1}</span>
        <span class="code-line-text text-slate-200 flex-1 leading-relaxed whitespace-pre">${highlightPythonSyntax(line, playerId) || '&nbsp;'}</span>
      </div>
    `;
  }).join('');

  return `
    <div id="code-player-wrapper-${playerId}" class="w-full min-w-0 flex flex-col items-center">
      <!-- 1. Editor de código con flecha indicadora y toolbar -->
      <div class="w-full min-w-0 bg-[#0d151c] rounded-2xl overflow-hidden border border-[#1e2d3d] shadow-md text-left mb-3">
        <div class="bg-[#101923] border-b border-[#1e2d3d] px-3 sm:px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-400">
          <span class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            <span class="ml-2 text-slate-300 font-semibold">ejecución.py</span>
          </span>
          <span id="code-status-${playerId}" class="text-[11px] text-slate-400 font-mono">Paso 0/${lines.length}</span>
        </div>

        <div class="p-2.5 sm:p-3 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto space-y-0.5 max-w-full" id="code-lines-${playerId}">
          ${linesHtml}
        </div>

        <!-- Barra de control inferior estilo Brilliant -->
        <div class="bg-[#101923] border-t border-[#1e2d3d] px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2" id="code-toolbar-${playerId}">
          ${isLocked ? `
            <div class="flex items-center gap-1.5 text-xs text-slate-400" id="code-locked-indicator-${playerId}">
              <svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              <span class="font-mono text-[11px] text-slate-300">Modo análisis: responde abajo</span>
            </div>
            <div class="flex items-center gap-1 opacity-30 pointer-events-none transition-all shrink-0" id="code-buttons-group-${playerId}">
              <button onclick="codePlayerReset('${playerId}')" title="Reiniciar ejecución" class="p-1.5 sm:p-2 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 text-xs">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
              <button onclick="codePlayerPrevStep('${playerId}')" title="Línea anterior" class="p-1.5 sm:p-2 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 text-xs">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onclick="codePlayerNextStep('${playerId}')" title="Línea siguiente" class="p-1.5 sm:p-2 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 text-xs">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
              </button>
              <button id="code-play-btn-${playerId}" class="px-3 sm:px-4 py-1.5 rounded-xl bg-slate-800 text-slate-500 font-extrabold text-xs flex items-center gap-1.5 border border-slate-700 cursor-not-allowed">
                <span id="code-play-icon-${playerId}">▶</span>
                <span id="code-play-text-${playerId}">Ejecutar</span>
              </button>
            </div>
          ` : `
            <div class="flex items-center gap-1 shrink-0">
              <button onclick="codePlayerReset('${playerId}')" title="Reiniciar ejecución" class="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700 text-xs">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
              <button onclick="codePlayerPrevStep('${playerId}')" title="Línea anterior" class="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700 text-xs">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onclick="codePlayerNextStep('${playerId}')" title="Línea siguiente" class="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700 text-xs">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            <button onclick="codePlayerTogglePlay('${playerId}')" id="code-play-btn-${playerId}" class="btn-3d px-3 sm:px-4 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm border-brand-700 transition cursor-pointer shrink-0 ${playerId.startsWith('expl_') ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900 animate-pulse' : ''}">
              <span id="code-play-icon-${playerId}">▶</span>
              <span id="code-play-text-${playerId}">Ejecutar</span>
            </button>
          `}
        </div>
      </div>

      <!-- 2. Pantalla de salida (Consola verde ubicada DEBAJO del código, estilo IDE) -->
      <div class="w-full min-w-0 bg-[#000000] border-2 border-[#10b981] rounded-2xl p-3 sm:p-3.5 font-mono text-xs sm:text-sm text-[#34d399] min-h-[58px] shadow-sm flex flex-col justify-center text-left">
        <div class="text-[10px] text-emerald-500 font-extrabold uppercase tracking-wider mb-1 flex items-center justify-between border-b border-emerald-950 pb-1">
          <span>Salida en pantalla (Terminal)</span>
          <span class="w-2 h-2 rounded-full ${isLocked ? 'bg-amber-400' : 'bg-emerald-400'} animate-ping"></span>
        </div>
        <div id="code-terminal-${playerId}" class="min-h-[22px] whitespace-pre-wrap font-semibold leading-relaxed">
          ${isLocked ? `
            <span class="text-slate-400 italic select-none text-xs flex items-center gap-2 py-0.5">
              <svg class="w-3.5 h-3.5 text-amber-400 inline shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              <span>Piensa tu respuesta. El código se ejecutará al comprobar...</span>
            </span>
          ` : `
            <span class="text-slate-600 italic select-none text-xs">Presiona ▶ para ejecutar línea por línea...</span>
          `}
        </div>
      </div>
    </div>
  `;
}

function codePlayerSetLine(playerId, targetIndex) {
  const player = codePlayerRegistry[playerId];
  if (!player) return;

  targetIndex = Math.max(-1, Math.min(targetIndex, player.lines.length - 1));
  player.currentIndex = targetIndex;

  // Actualizar flechas e iluminación de cada línea
  player.lines.forEach((_, idx) => {
    const arrowEl = document.getElementById(`code-arrow-${playerId}-${idx}`);
    const lineEl = document.getElementById(`code-line-${playerId}-${idx}`);
    const state = player.lineTrace ? player.lineTrace[idx] : null;
    if (arrowEl && lineEl) {
      if (idx === targetIndex) {
        arrowEl.innerHTML = '<span class="text-white text-xs font-black animate-pulse">▶</span>';
        lineEl.classList.add('active');
      } else {
        arrowEl.innerHTML = '';
        lineEl.classList.remove('active');
      }
      if (state && state.skipped && targetIndex >= 0) {
        lineEl.classList.add('opacity-40');
      } else {
        lineEl.classList.remove('opacity-40');
      }
    }
  });

  // Actualizar pantalla de salida (Terminal)
  const termEl = document.getElementById(`code-terminal-${playerId}`);
  if (termEl) {
    if (targetIndex === -1) {
      if (player.isLocked) {
        termEl.innerHTML = `
          <span class="text-slate-400 italic select-none text-xs flex items-center gap-2 py-0.5">
            <svg class="w-3.5 h-3.5 text-amber-400 inline shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            <span>Piensa tu respuesta. El código se ejecutará al comprobar...</span>
          </span>
        `;
      } else {
        termEl.innerHTML = '<span class="text-slate-600 italic select-none text-xs">Presiona ▶ para ejecutar línea por línea...</span>';
      }
    } else {
      const state = player.lineTrace[targetIndex];
      if (state && state.isInput && !state.isCompleted) {
        renderInteractiveInputPrompt(playerId, targetIndex, state.prompt);
      } else if (state && state.outputSoFar && state.outputSoFar.length > 0) {
        termEl.innerHTML = `<div class="text-[#34d399] font-mono whitespace-pre-wrap leading-relaxed">${escapeHtml(state.outputSoFar.join('\n'))}</div>`;
      } else {
        termEl.innerHTML = '<span class="text-slate-600 italic select-none text-xs">(Línea en proceso, sin salida aún)</span>';
      }
    }
  }

  // Actualizar badge de estado
  const statusEl = document.getElementById(`code-status-${playerId}`);
  if (statusEl) {
    const state = targetIndex >= 0 ? player.lineTrace[targetIndex] : null;
    let isAtEnd = targetIndex >= player.lines.length - 1;
    if (!isAtEnd && targetIndex >= 0) {
      isAtEnd = true;
      for (let k = targetIndex + 1; k < player.lines.length; k++) {
        if (!player.lineTrace[k] || !player.lineTrace[k].skipped) {
          isAtEnd = false;
          break;
        }
      }
    }
    if (targetIndex === -1) {
      statusEl.textContent = `Paso 0/${player.lines.length}`;
    } else if (state && state.isInput && !state.isCompleted) {
      statusEl.textContent = `Esperando entrada...`;
    } else if (isAtEnd) {
      statusEl.textContent = `✓ Finalizado`;
      if (playerId.startsWith('expl_')) {
        unlockExplanationContinue();
      }
    } else {
      statusEl.textContent = `Línea ${targetIndex + 1}/${player.lines.length}`;
    }
  }

  playSound('step');
}

function renderInteractiveInputPrompt(playerId, lineIndex, promptText) {
  const termEl = document.getElementById(`code-terminal-${playerId}`);
  if (!termEl) return;

  const player = codePlayerRegistry[playerId];
  const prevLines = lineIndex > 0 && player && player.lineTrace[lineIndex - 1]?.outputSoFar
    ? player.lineTrace[lineIndex - 1].outputSoFar
    : [];

  const prevText = prevLines.join('\n');
  const cleanPrompt = promptText || 'Entrada: ';
  const pLow = cleanPrompt.toLowerCase();
  let placeholder = 'Escribe aquí...';
  if (pLow.includes('nota')) placeholder = 'Ej: 4.2 (o prueba 2.5)';
  else if (pLow.includes('edad')) placeholder = 'Ej: 14 (o prueba 25)';
  else if (pLow.includes('clasificar') || pLow.includes('entero')) placeholder = 'Ej: -8 (o prueba 15 ó 0)';
  else if (pLow.includes('segundo') || pLow.includes('(y)')) placeholder = 'Ej: 20';
  else if (pLow.includes('primer') || pLow.includes('(x)')) placeholder = 'Ej: 10';
  else if (pLow.includes('llamas') || pLow.includes('nombre')) placeholder = 'Escribe tu nombre aquí...';

  termEl.innerHTML = `
    <div class="text-[#34d399] font-mono whitespace-pre-wrap leading-relaxed">
      ${prevText ? `<div>${escapeHtml(prevText)}</div>` : ''}
      <div class="flex flex-wrap items-center gap-2 mt-1.5 p-2 bg-[#052e16]/90 rounded-xl border-2 border-emerald-500 shadow-lg animate-pulse" style="animation-duration: 3s;">
        <span class="text-emerald-300 font-bold text-xs sm:text-sm shrink-0 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>${escapeHtml(cleanPrompt)}</span>
        </span>
        <div class="flex items-center gap-1.5 flex-1 min-w-[150px]">
          <input id="term-input-box-${playerId}" type="text" autocomplete="off" autofocus placeholder="${placeholder}" class="w-full bg-black text-amber-300 font-mono text-xs sm:text-sm px-2.5 py-1.5 rounded-lg border-2 border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 font-bold placeholder-slate-500" onkeydown="if(event.key==='Enter'){event.preventDefault();event.stopPropagation();handleTerminalInputSubmit('${playerId}', ${lineIndex});}" />
          <button id="term-input-btn-${playerId}" onclick="handleTerminalInputSubmit('${playerId}', ${lineIndex})" type="button" class="choice-pill px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-mono font-black text-xs rounded-lg transition shadow flex items-center gap-1 cursor-pointer shrink-0">
            <span>Enviar</span>
            <span>↵</span>
          </button>
        </div>
      </div>
    </div>
  `;

  if (window.FAST_ANIM) {
    setTimeout(() => handleTerminalInputSubmit(playerId, lineIndex), 5);
    return;
  }

  // Enfocar el input inmediatamente
  const inputEl = document.getElementById(`term-input-box-${playerId}`);
  if (inputEl) {
    inputEl.focus();
    inputEl.select();
  }
}

function handleTerminalInputSubmit(playerId, lineIndex) {
  const player = codePlayerRegistry[playerId];
  if (!player) return;

  const inputEl = document.getElementById(`term-input-box-${playerId}`);
  const userVal = inputEl ? inputEl.value.trim() : "";

  const lineState = player.lineTrace && player.lineTrace[lineIndex];
  const promptText = (lineState && lineState.prompt ? lineState.prompt : (player.code || "")).toLowerCase();
  
  let defaultVal = "20";
  if (promptText.includes('nota')) defaultVal = "4.2";
  else if (promptText.includes('segundo') || promptText.includes('(y)')) defaultVal = "20";
  else if (promptText.includes('primer') || promptText.includes('(x)')) defaultVal = "10";
  else if (promptText.includes('clasificar') || promptText.includes('entero')) defaultVal = "-8";
  else if (promptText.includes('edad')) defaultVal = "14";
  else if (promptText.includes('llamas') || promptText.includes('nombre')) defaultVal = "Sara";

  const finalVal = userVal.length > 0 ? userVal : defaultVal;

  playSound('click');

  if (!player.userInputs) player.userInputs = {};
  player.userInputs[lineIndex] = finalVal;

  const newTrace = tracePythonExecution(player.code, player.expectedOutput, player.userInputs);
  player.lineTrace = newTrace.lineTrace;

  codePlayerSetLine(playerId, lineIndex);

  if (player.wasAutoPlaying) {
    player.wasAutoPlaying = false;
    setTimeout(() => {
      resumeCodePlayerAutoAnimate(playerId, lineIndex + 1, player.onCompleteCallback);
    }, window.FAST_ANIM ? 20 : 450);
  }
}

function runCodePlayerAutoAnimate(playerId, onComplete) {
  const player = codePlayerRegistry[playerId];
  if (!player) {
    if (onComplete) onComplete();
    return;
  }

  if (player.isPlaying && player.timer) {
    clearInterval(player.timer);
    player.isPlaying = false;
  }

  codePlayerSetLine(playerId, -1);
  ensureCodeVisible(`code-player-wrapper-${playerId}`);
  player.isPlaying = true;

  let current = 0;
  while (current < player.lines.length && player.lineTrace[current] && player.lineTrace[current].skipped) {
    current++;
  }
  const firstState = player.lineTrace[current];
  if (firstState && firstState.isInput && !firstState.isCompleted) {
    player.isPlaying = false;
    player.wasAutoPlaying = true;
    player.onCompleteCallback = onComplete;
    codePlayerSetLine(playerId, current);
    return;
  }
  codePlayerSetLine(playerId, current);

  const stepInterval = window.FAST_ANIM ? 20 : 550;
  player.timer = setInterval(() => {
    current++;
    while (current < player.lines.length && player.lineTrace[current] && player.lineTrace[current].skipped) {
      current++;
    }
    if (current < player.lines.length) {
      const state = player.lineTrace[current];
      if (state && state.isInput && !state.isCompleted) {
        clearInterval(player.timer);
        player.timer = null;
        player.isPlaying = false;
        player.wasAutoPlaying = true;
        player.onCompleteCallback = onComplete;
        codePlayerSetLine(playerId, current);
        return;
      }
      codePlayerSetLine(playerId, current);
    } else {
      clearInterval(player.timer);
      player.timer = null;
      player.isPlaying = false;

      const statusEl = document.getElementById(`code-status-${playerId}`);
      if (statusEl) statusEl.textContent = `✓ Finalizado`;

      enableCodePlayerControls(playerId);

      setTimeout(() => {
        if (onComplete) onComplete();
      }, window.FAST_ANIM ? 30 : 350);
    }
  }, stepInterval);
}

function resumeCodePlayerAutoAnimate(playerId, startIndex, onComplete) {
  const player = codePlayerRegistry[playerId];
  if (!player) return;

  if (player.isPlaying && player.timer) {
    clearInterval(player.timer);
  }
  player.isPlaying = true;

  const playText = document.getElementById(`code-play-text-${playerId}`);
  const playIcon = document.getElementById(`code-play-icon-${playerId}`);
  if (playText) playText.textContent = "Pausar";
  if (playIcon) playIcon.textContent = "⏸";

  let current = startIndex - 1;
  const stepInterval = window.FAST_ANIM ? 20 : 550;
  player.timer = setInterval(() => {
    current++;
    while (current < player.lines.length && player.lineTrace[current] && player.lineTrace[current].skipped) {
      current++;
    }
    if (current < player.lines.length) {
      const state = player.lineTrace[current];
      if (state && state.isInput && !state.isCompleted) {
        clearInterval(player.timer);
        player.timer = null;
        player.isPlaying = false;
        player.wasAutoPlaying = true;
        player.onCompleteCallback = onComplete;
        codePlayerSetLine(playerId, current);
        if (playText) playText.textContent = "Esperando entrada";
        if (playIcon) playIcon.textContent = "⌨️";
        return;
      }
      codePlayerSetLine(playerId, current);
      if (current >= player.lines.length - 1 && playerId.startsWith('expl_')) {
        unlockExplanationContinue();
      }
    } else {
      clearInterval(player.timer);
      player.timer = null;
      player.isPlaying = false;
      player.wasAutoPlaying = false;

      const statusEl = document.getElementById(`code-status-${playerId}`);
      if (statusEl) statusEl.textContent = `✓ Finalizado`;

      if (playText) playText.textContent = "Reiniciar";
      if (playIcon) playIcon.textContent = "↺";

      enableCodePlayerControls(playerId);

      if (playerId.startsWith('expl_')) {
        unlockExplanationContinue();
      }

      setTimeout(() => {
        if (onComplete) onComplete();
      }, window.FAST_ANIM ? 30 : 350);
    }
  }, stepInterval);
}

function enableCodePlayerControls(playerId) {
  const player = codePlayerRegistry[playerId];
  if (player) player.isLocked = false;

  const lockedInd = document.getElementById(`code-locked-indicator-${playerId}`);
  if (lockedInd) {
    lockedInd.innerHTML = `
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span class="font-mono text-[11px] text-emerald-400 font-bold">Código ejecutado</span>
      </div>
    `;
  }

  const btnGroup = document.getElementById(`code-buttons-group-${playerId}`);
  if (btnGroup) {
    btnGroup.classList.remove('opacity-30', 'pointer-events-none');
    const playBtn = document.getElementById(`code-play-btn-${playerId}`);
    if (playBtn) {
      playBtn.className = "btn-3d px-4 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm border-brand-700 transition cursor-pointer";
      playBtn.onclick = () => codePlayerTogglePlay(playerId);
      const playText = document.getElementById(`code-play-text-${playerId}`);
      const playIcon = document.getElementById(`code-play-icon-${playerId}`);
      if (playText) playText.textContent = "Reiniciar";
      if (playIcon) playIcon.textContent = "↺";
    }
  }
}

function resetCodePlayerLocked(playerId) {
  const player = codePlayerRegistry[playerId];
  if (!player) return;

  if (player.isPlaying && player.timer) {
    clearInterval(player.timer);
    player.isPlaying = false;
  }

  player.isLocked = true;
  codePlayerSetLine(playerId, -1);

  const termEl = document.getElementById(`code-terminal-${playerId}`);
  if (termEl) {
    termEl.innerHTML = `
      <span class="text-slate-400 italic select-none text-xs flex items-center gap-2 py-0.5">
        <svg class="w-3.5 h-3.5 text-amber-400 inline shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        <span>Piensa tu respuesta. El código se ejecutará al comprobar...</span>
      </span>
    `;
  }

  const lockedInd = document.getElementById(`code-locked-indicator-${playerId}`);
  if (lockedInd) {
    lockedInd.innerHTML = `
      <svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
      <span class="font-mono text-[11px] text-slate-300">Modo análisis: responde abajo para ejecutar</span>
    `;
  }

  const btnGroup = document.getElementById(`code-buttons-group-${playerId}`);
  if (btnGroup) {
    btnGroup.classList.add('opacity-30', 'pointer-events-none');
    const playBtn = document.getElementById(`code-play-btn-${playerId}`);
    if (playBtn) {
      playBtn.className = "px-4 py-1.5 rounded-xl bg-slate-800 text-slate-500 font-extrabold text-xs flex items-center gap-1.5 border border-slate-700 cursor-not-allowed";
      playBtn.onclick = null;
      const playText = document.getElementById(`code-play-text-${playerId}`);
      const playIcon = document.getElementById(`code-play-icon-${playerId}`);
      if (playText) playText.textContent = "Ejecutar";
      if (playIcon) playIcon.textContent = "▶";
    }
  }

  const statusEl = document.getElementById(`code-status-${playerId}`);
  if (statusEl) statusEl.textContent = `Paso 0/${player.lines.length}`;
}

function codePlayerNextStep(playerId) {
  const player = codePlayerRegistry[playerId];
  if (!player) return;

  const playBtn = document.getElementById(`code-play-btn-${playerId}`);
  if (playBtn) {
    playBtn.classList.remove('ring-2', 'ring-emerald-400', 'ring-offset-2', 'ring-offset-slate-900', 'animate-pulse');
  }

  // Si la línea actual es un input esperando que el usuario escriba, NO permitir saltarla
  if (player.currentIndex >= 0) {
    const currentState = player.lineTrace[player.currentIndex];
    if (currentState && currentState.isInput && !currentState.isCompleted) {
      const inputEl = document.getElementById(`term-input-box-${playerId}`);
      if (inputEl) {
        inputEl.focus();
        inputEl.classList.add('ring-4', 'ring-amber-400');
        setTimeout(() => inputEl && inputEl.classList.remove('ring-4', 'ring-amber-400'), 600);
      }
      return;
    }
  }

  // Buscar la siguiente línea no omitida
  let nextIdx = player.currentIndex + 1;
  while (nextIdx < player.lines.length && player.lineTrace[nextIdx] && player.lineTrace[nextIdx].skipped) {
    nextIdx++;
  }

  if (nextIdx < player.lines.length) {
    ensureCodeVisible(`code-player-wrapper-${playerId}`, false);
    codePlayerSetLine(playerId, nextIdx);
    if (nextIdx >= player.lines.length - 1 && playerId.startsWith('expl_')) {
      unlockExplanationContinue();
    }
  } else {
    // Si ya terminó la ejecución automática
    if (player.isPlaying) {
      codePlayerTogglePlay(playerId);
    }
    const playText = document.getElementById(`code-play-text-${playerId}`);
    const playIcon = document.getElementById(`code-play-icon-${playerId}`);
    if (playText) playText.textContent = "Reiniciar";
    if (playIcon) playIcon.textContent = "↺";
    if (playerId.startsWith('expl_')) {
      unlockExplanationContinue();
    }
  }
}

function codePlayerPrevStep(playerId) {
  const player = codePlayerRegistry[playerId];
  if (!player) return;
  if (player.currentIndex > 0) {
    let prevIdx = player.currentIndex - 1;
    while (prevIdx > 0 && player.lineTrace[prevIdx] && player.lineTrace[prevIdx].skipped) {
      prevIdx--;
    }
    ensureCodeVisible(`code-player-wrapper-${playerId}`, false);
    codePlayerSetLine(playerId, prevIdx);
  } else {
    codePlayerReset(playerId);
  }
}

function codePlayerReset(playerId) {
  const player = codePlayerRegistry[playerId];
  if (!player) return;

  if (player.isPlaying) {
    clearInterval(player.timer);
    player.isPlaying = false;
    player.timer = null;
  }
  player.isPlaying = false;
  player.wasAutoPlaying = false;

  player.userInputs = {};
  const newTrace = tracePythonExecution(player.code, player.expectedOutput, player.userInputs);
  player.lineTrace = newTrace.lineTrace;

  codePlayerSetLine(playerId, -1);

  const playText = document.getElementById(`code-play-text-${playerId}`);
  const playIcon = document.getElementById(`code-play-icon-${playerId}`);
  if (playText) playText.textContent = "Ejecutar";
  if (playIcon) playIcon.textContent = "▶";
}

function codePlayerTogglePlay(playerId) {
  const player = codePlayerRegistry[playerId];
  if (!player) return;

  const playText = document.getElementById(`code-play-text-${playerId}`);
  const playIcon = document.getElementById(`code-play-icon-${playerId}`);
  const playBtn = document.getElementById(`code-play-btn-${playerId}`);
  if (playBtn) {
    playBtn.classList.remove('ring-2', 'ring-emerald-400', 'ring-offset-2', 'ring-offset-slate-900', 'animate-pulse');
  }

  if (player.isPlaying) {
    if (player.timer) {
      clearInterval(player.timer);
      player.timer = null;
    }
    player.isPlaying = false;
    player.wasAutoPlaying = false;
    if (playText) playText.textContent = "Continuar";
    if (playIcon) playIcon.textContent = "▶";

    if (playerId.startsWith('expl_')) {
      const explBtn = document.getElementById('explanation-continue-btn');
      if (explBtn && explBtn.dataset.unlocked !== 'true') {
        explBtn.innerHTML = `
          <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>Ejecuta el código arriba para continuar</span>
        `;
      }
    }
  } else {
    // Si ya estaba al final, reiniciar antes de reproducir
    if (player.currentIndex >= player.lines.length - 1) {
      codePlayerReset(playerId);
    }

    // Encuadrar perfectamente la ventanita de código en pantalla al dar clic a ejecutar
    ensureCodeVisible(`code-player-wrapper-${playerId}`);

    // Si la línea actual ya está esperando input del usuario, solo enfocarla
    if (player.currentIndex >= 0) {
      const curSt = player.lineTrace[player.currentIndex];
      if (curSt && curSt.isInput && !curSt.isCompleted) {
        const inputEl = document.getElementById(`term-input-box-${playerId}`);
        if (inputEl) {
          inputEl.focus();
          inputEl.classList.add('ring-4', 'ring-amber-400');
          setTimeout(() => inputEl && inputEl.classList.remove('ring-4', 'ring-amber-400'), 600);
        }
        return;
      }
    }

    // Determinar siguiente línea
    const nextIdx = player.currentIndex + 1;
    const nextState = player.lineTrace[nextIdx];

    // Si el siguiente paso es un input no completado, avanzar a él y pausar esperando al usuario
    if (nextState && nextState.isInput && !nextState.isCompleted) {
      player.isPlaying = false;
      player.wasAutoPlaying = true;
      codePlayerSetLine(playerId, nextIdx);
      if (playText) playText.textContent = "Esperando entrada";
      if (playIcon) playIcon.textContent = "⌨️";
      return;
    }

    player.isPlaying = true;
    if (playText) playText.textContent = "Pausar";
    if (playIcon) playIcon.textContent = "⏸";

    if (playerId.startsWith('expl_')) {
      const explBtn = document.getElementById('explanation-continue-btn');
      if (explBtn && explBtn.dataset.unlocked !== 'true') {
        explBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Ejecutando código...</span>
        `;
      }
    }

    // Avanzar primer paso de inmediato si está en -1
    codePlayerSetLine(playerId, nextIdx);
    if (nextIdx >= player.lines.length - 1 && playerId.startsWith('expl_')) {
      unlockExplanationContinue();
    }

    const interval = window.FAST_ANIM ? 30 : 600;
    player.timer = setInterval(() => {
      if (player.currentIndex < player.lines.length - 1) {
        const upcomingIdx = player.currentIndex + 1;
        const upcomingState = player.lineTrace[upcomingIdx];

        // Si la próxima línea es un input, avanzar y DETENER EL TIMER de inmediato!
        if (upcomingState && upcomingState.isInput && !upcomingState.isCompleted) {
          clearInterval(player.timer);
          player.timer = null;
          player.isPlaying = false;
          player.wasAutoPlaying = true;
          codePlayerSetLine(playerId, upcomingIdx);
          if (playText) playText.textContent = "Esperando entrada";
          if (playIcon) playIcon.textContent = "⌨️";
          return;
        }

        codePlayerSetLine(playerId, upcomingIdx);
        if (upcomingIdx >= player.lines.length - 1 && playerId.startsWith('expl_')) {
          unlockExplanationContinue();
        }
      } else {
        clearInterval(player.timer);
        player.isPlaying = false;
        player.wasAutoPlaying = false;
        player.timer = null;
        if (playText) playText.textContent = "Reiniciar";
        if (playIcon) playIcon.textContent = "↺";
        if (playerId.startsWith('expl_')) {
          unlockExplanationContinue();
        }
      }
    }, interval);
  }
}

function unlockExplanationContinue() {
  const btn = document.getElementById('explanation-continue-btn');
  if (!btn || btn.dataset.unlocked === 'true') return;
  btn.dataset.unlocked = 'true';
  btn.disabled = false;
  btn.onclick = advanceNextStep;
  btn.className = "btn-3d w-full max-w-md bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-extrabold text-base py-3.5 px-8 rounded-2xl shadow-brilliant-btn border-b-4 border-brand-700 transition cursor-pointer animate-modal-pop flex items-center justify-center gap-2";
  btn.innerHTML = `Continuar ➔`;
  playSound('correct');
}

function formatRichText(str) {
  if (!str) return '';
  let text = String(str)
    .replace(/<\/?code>/gi, '`')
    .replace(/<\/?strong>/gi, '**')
    .replace(/<\/?b>/gi, '**');
  
  let escaped = escapeHtml(text);
  escaped = escaped.replace(/`([^`]+)`/g, (match, codeContent) => {
    const isSingleToken = !codeContent.trim().includes(' ');
    const wrapClass = isSingleToken ? 'whitespace-nowrap' : 'break-words';
    return `<code class="px-1.5 py-0.5 bg-slate-100 text-brand-700 font-mono text-xs sm:text-sm rounded-md border border-slate-200 font-bold inline-block max-w-full align-middle ${wrapClass}">${codeContent}</code>`;
  });
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-extrabold text-slate-900">$1</strong>');
  return escaped;
}

// 0. Pantalla Explicativa con Reproductor Interactivo
function renderExplanationStep(step, container) {
  const ex = step.examples[0] || { label: 'Ejemplo', code: 'print("Hola")', output: 'Hola', explanation: 'Salida básica' };
  const playerId = 'expl_' + currentStepIndex;
  const hasCode = ex && ex.code && ex.code.trim().length > 0;

  container.innerHTML = `
    <div class="w-full max-w-xl min-w-0 flex flex-col items-center text-center">
      
      <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-brand-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
        <span>${step.partLabel}</span>
      </div>

      <h1 class="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight break-words max-w-full mb-2">
        ${formatRichText(step.title)}
      </h1>

      <p class="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3.5 max-w-lg">
        ${formatRichText(step.intro)}
      </p>

      <div class="w-full min-w-0 bg-white border-2 border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-sm text-left mb-3.5">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-extrabold text-brand-700 uppercase tracking-wider">${ex.label}</span>
          <span class="text-[11px] font-semibold text-slate-400">Ejecución interactiva</span>
        </div>

        ${renderCodePlayerHTML(playerId, ex.code, ex.output)}

        <div class="pt-2.5 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500 leading-relaxed mt-3">
          <span class="font-extrabold text-brand-700 uppercase tracking-wider text-[10px] bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200">Nota</span>
          <span>${formatRichText(ex.explanation)}</span>
        </div>
      </div>

      ${step.keyTakeaway ? `
        <div class="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3 text-xs text-emerald-950 text-left mb-3.5 leading-relaxed shadow-sm">
          <div class="font-extrabold uppercase tracking-wider text-[10px] text-brand-700 mb-0.5">Concepto clave para recordar:</div>
          <div>${step.keyTakeaway}</div>
        </div>
      ` : ''}

      ${hasCode ? `
        <button id="explanation-continue-btn" disabled class="w-full max-w-md py-3 px-8 rounded-2xl font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2 bg-slate-200 text-slate-400 border-2 border-slate-300 cursor-not-allowed shadow-none">
          <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>Ejecuta el código arriba para continuar</span>
        </button>
      ` : `
        <button onclick="advanceNextStep()" class="btn-3d w-full max-w-md bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base py-3 px-8 rounded-2xl shadow-brilliant-btn border-brand-700 transition">
          Continuar ➔
        </button>
      `}

    </div>
  `;
}

// 1. Pantalla de Ejercicio con Reproductor Interactivo
let selectedPredictOption = null;
let predictStepPassed = false;
let predictWhyVisible = false;

function renderPredictStep(step, container) {
  selectedPredictOption = null;
  predictStepPassed = false;
  predictWhyVisible = false;

  let codePlayerHtml = '';
  if (step.code && step.code.trim().length > 0) {
    const playerId = 'pred_' + currentStepIndex;
    codePlayerHtml = renderCodePlayerHTML(playerId, step.code, null, true);
  }

  const isLongOptions = step.options.some(opt => opt.text.length > 20);

  let optionsHtml = '';
  if (isLongOptions) {
    optionsHtml = `
      <div class="flex flex-col gap-2.5 w-full mb-4" id="predict-options-row">
        ${step.options.map(opt => `
          <button onclick="selectPredictPill('${opt.id}')" id="pill-${opt.id}" class="choice-pill w-full px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl border-2 border-slate-200 bg-white text-left text-xs sm:text-sm font-semibold text-slate-800 hover:border-brand-500 hover:bg-slate-50 transition flex items-center gap-2.5 sm:gap-3 cursor-pointer min-w-0">
            <span id="pill-badge-${opt.id}" class="w-6 sm:w-7 h-6 sm:h-7 rounded-xl bg-slate-100 border border-slate-300 text-slate-600 font-mono font-bold text-xs flex items-center justify-center shrink-0">
              ${opt.id}
            </span>
            <span class="leading-snug break-words min-w-0 flex-1">${formatRichText(opt.text)}</span>
          </button>
        `).join('')}
      </div>
    `;
  } else {
    optionsHtml = `
      <div class="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full mb-4" id="predict-options-row">
        ${step.options.map(opt => `
          <button onclick="selectPredictPill('${opt.id}')" id="pill-${opt.id}" class="choice-pill px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border-2 border-slate-200 bg-white font-mono text-xs sm:text-sm font-bold text-slate-800 hover:border-brand-500 hover:bg-slate-50 transition flex items-center gap-2 cursor-pointer min-w-0">
            <span id="pill-badge-${opt.id}" class="w-5 sm:w-6 h-5 sm:h-6 rounded-lg bg-slate-100 border border-slate-300 text-slate-600 text-xs flex items-center justify-center shrink-0">
              ${opt.id}
            </span>
            <span class="break-words min-w-0">${formatRichText(opt.text)}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  const headingTitle = step.title || "¿Cuál es la salida de este programa?";
  const questionBody = step.question && step.question !== step.title ? step.question : null;

  container.innerHTML = `
    <div class="w-full max-w-xl min-w-0 flex flex-col items-center text-center px-1 sm:px-0">
      
      ${step.partLabel ? `
        <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-brand-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
          <span>${step.partLabel}</span>
        </div>
      ` : ''}

      <h2 class="text-base sm:text-2xl font-extrabold text-slate-900 tracking-tight break-words max-w-full mb-2">
        ${formatRichText(headingTitle)}
      </h2>

      ${questionBody ? `
        <div class="text-xs sm:text-base text-slate-700 mb-3 sm:mb-4 leading-relaxed max-w-lg w-full min-w-0 font-medium break-words">
          ${formatRichText(questionBody)}
        </div>
      ` : ''}

      ${step.theory ? `
        <p class="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4 leading-relaxed max-w-lg w-full min-w-0 break-words">
          ${formatRichText(step.theory)}
        </p>
      ` : ''}

      ${codePlayerHtml ? `<div class="w-full mb-4 sm:mb-5">${codePlayerHtml}</div>` : ''}

      ${optionsHtml}

      <!-- Contenedor dinámico de retroalimentación y explicaciones -->
      <div id="predict-feedback-area" class="w-full mb-4 transition-all"></div>

      <!-- Barra de acciones inferior -->
      <div id="predict-actions-container" class="w-full flex items-center justify-center gap-3">
        <button id="predict-check-btn" onclick="checkPredictSingleAnswer()" disabled class="btn-3d w-full max-w-sm bg-slate-300 text-slate-500 font-extrabold text-base py-3 px-8 rounded-2xl border-slate-400 cursor-not-allowed transition">
          Comprobar
        </button>
      </div>

    </div>
  `;
}

function selectPredictPill(optId) {
  playSound('select');
  selectedPredictOption = optId;
  const step = currentLesson.steps[currentStepIndex];
  const optionData = step.options.find(o => o.id === optId);
  if (!optionData) return;

  const isLongOptions = step.options.some(opt => opt.text.length > 20);

  if (predictStepPassed) {
    // La pregunta ya fue aprobada: el estudiante está explorando por curiosidad
    step.options.forEach(opt => {
      const pill = document.getElementById(`pill-${opt.id}`);
      const badge = document.getElementById(`pill-badge-${opt.id}`);
      if (!pill) return;

      if (opt.isCorrect) {
        // La opción correcta se mantiene siempre verde con checkmark
        pill.className = `choice-pill ${isLongOptions ? 'w-full px-5 py-3' : 'px-6 py-3'} rounded-2xl border-2 border-emerald-500 bg-emerald-50/80 font-bold text-emerald-950 flex items-center gap-3 transition shadow-xs cursor-pointer`;
        if (badge) {
          badge.className = "w-6 h-6 rounded-lg bg-emerald-500 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs";
          badge.innerHTML = "✓";
        }
      } else if (opt.id === optId) {
        // La opción incorrecta seleccionada se resalta en tono ámbar
        pill.className = `choice-pill ${isLongOptions ? 'w-full px-5 py-3' : 'px-6 py-3'} rounded-2xl border-2 border-amber-400 bg-amber-50 font-bold text-amber-950 ring-2 ring-amber-300 flex items-center gap-3 transition shadow-xs cursor-pointer`;
        if (badge) {
          badge.className = "w-6 h-6 rounded-lg bg-amber-400 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0";
          badge.innerHTML = opt.id;
        }
      } else {
        // Otras opciones neutrales
        pill.className = `choice-pill ${isLongOptions ? 'w-full px-5 py-3' : 'px-6 py-3'} rounded-2xl border-2 border-slate-200 bg-white font-semibold text-slate-700 hover:border-slate-300 flex items-center gap-3 transition cursor-pointer`;
        if (badge) {
          badge.className = "w-6 h-6 rounded-lg bg-slate-100 border border-slate-300 text-slate-600 font-mono font-bold text-xs flex items-center justify-center shrink-0";
          badge.innerHTML = opt.id;
        }
      }
    });

    const feedbackArea = document.getElementById('predict-feedback-area');
    if (!feedbackArea) return;

    if (optionData.isCorrect) {
      // Clic en la correcta: mostrar estado de éxito y explicación si está activa
      feedbackArea.innerHTML = `
        <div id="predict-success-badge" class="flex items-center justify-center gap-2 py-2.5 px-5 bg-emerald-50 border border-emerald-200 text-brand-800 rounded-2xl font-bold text-sm shadow-xs animate-modal-pop">
          <svg class="w-5 h-5 text-brand-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          <span>¡Esta es la respuesta correcta!</span>
        </div>
        <div id="predict-why-card" class="${predictWhyVisible ? '' : 'hidden'} mt-3 p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 text-slate-800 text-left shadow-sm transition-all animate-modal-pop">
          <div class="flex items-start gap-3">
            <span class="text-xl shrink-0">💡</span>
            <div>
              <div class="font-bold text-xs uppercase tracking-wider text-emerald-800 mb-1">¿Por qué es la respuesta correcta?</div>
              <div class="text-xs sm:text-sm text-slate-700 leading-relaxed">${step.fullAnswerExplanation || '¡Excelente deducción lógica!'}</div>
            </div>
          </div>
        </div>
      `;
    } else {
      // Clic en una opción incorrecta: explicar por qué era errónea
      feedbackArea.innerHTML = `
        <div class="p-4 rounded-2xl border-2 border-amber-300 bg-amber-50/90 text-slate-800 text-left shadow-sm transition-all animate-modal-pop">
          <div class="flex items-start gap-3">
            <span class="text-xl shrink-0">🧐</span>
            <div>
              <div class="font-bold text-xs uppercase tracking-wider text-amber-800 mb-1">
                ¿Por qué la opción ${optionData.id} no es correcta?
              </div>
              <div class="text-xs sm:text-sm text-amber-950 leading-relaxed">
                ${optionData.whyIncorrect || step.correctionTip || 'Esta opción no corresponde a la lógica de ejecución del programa.'}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Actualizar recuadro de código si el paso tiene slot ___ (estilo Brilliant Screenshot 2)
    const playerId = 'pred_' + currentStepIndex;
    const slotEl = document.getElementById(`code-slot-${playerId}`);
    if (slotEl) {
      const insertText = optionData.slotText || optionData.codeSnippet || optionData.text;
      slotEl.className = "code-slot-box slot-filled animate-modal-pop px-2.5 py-0.5 text-xs font-bold font-mono";
      slotEl.textContent = insertText;
    }

    renderPredictApprovedActions();
    return;
  }

  // Aún no aprobado: selección estándar antes de comprobar
  document.querySelectorAll('#predict-options-row .choice-pill').forEach(btn => {
    btn.classList.remove('border-brand-500', 'bg-brand-50', 'text-brand-800', 'ring-2', 'ring-brand-300');
    btn.classList.add('border-slate-200', 'bg-white', 'text-slate-800');
  });

  const selectedBtn = document.getElementById(`pill-${optId}`);
  if (selectedBtn) {
    selectedBtn.classList.remove('border-slate-200', 'bg-white', 'text-slate-800');
    selectedBtn.classList.add('border-brand-500', 'bg-brand-50', 'text-brand-800', 'ring-2', 'ring-brand-300');
  }

  // Actualizar recuadro de código inmediatamente (estilo Brilliant Screenshot 2)
  const playerId = 'pred_' + currentStepIndex;
  const slotEl = document.getElementById(`code-slot-${playerId}`);
  if (slotEl) {
    const insertText = optionData.slotText || optionData.codeSnippet || optionData.text;
    slotEl.className = "code-slot-box slot-filled animate-modal-pop px-2.5 py-0.5 text-xs font-bold font-mono";
    slotEl.textContent = insertText;
  }

  const checkBtn = document.getElementById('predict-check-btn');
  if (checkBtn) {
    checkBtn.disabled = false;
    checkBtn.className = "btn-3d w-full max-w-sm bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base py-3 px-8 rounded-2xl shadow-brilliant-btn border-brand-700 transition cursor-pointer";
  }
}

function checkPredictSingleAnswer() {
  const step = currentLesson.steps[currentStepIndex];
  const optionData = step.options.find(o => o.id === selectedPredictOption);
  if (!optionData) return;

  const checkBtn = document.getElementById('predict-check-btn');
  const optionsRow = document.getElementById('predict-options-row');
  const playerId = 'pred_' + currentStepIndex;
  const hasCodePlayer = step.code && step.code.trim().length > 0 && codePlayerRegistry[playerId];

  // Si el código incluye el slot ___, recalcular la ejecución con la opción elegida por el estudiante
  if (hasCodePlayer && step.code && step.code.includes('___')) {
    const insertText = optionData.slotText || optionData.codeSnippet || optionData.text;
    const filledCode = step.code.replace(/___/g, insertText);
    const trace = tracePythonExecution(filledCode, optionData.expectedOutput || null);
    codePlayerRegistry[playerId].lineTrace = trace.lineTrace;
  }

  // 1. Mostrar estado de animación en el botón de comprobar y deshabilitar interacción temporal
  if (checkBtn) {
    checkBtn.disabled = true;
    checkBtn.innerHTML = `
      <span class="inline-flex items-center gap-2">
        <svg class="w-4 h-4 animate-spin text-white shrink-0" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <span>Ejecutando código...</span>
      </span>
    `;
    checkBtn.className = "btn-3d w-full max-w-sm bg-slate-800 text-slate-200 font-extrabold text-base py-3 px-8 rounded-2xl border-slate-900 cursor-wait transition";
  }

  if (optionsRow) {
    optionsRow.classList.add('pointer-events-none');
  }

  // 2. Callback cuando la animación del código finalice
  const onExecutionFinished = () => {
    if (optionsRow) {
      optionsRow.classList.remove('pointer-events-none');
    }

    const feedbackArea = document.getElementById('predict-feedback-area');
    const isLongOptions = step.options.some(opt => opt.text.length > 20);
    const questionKey = 'step_' + currentStepIndex;
    if (currentLessonStats) {
      currentLessonStats.questionsEvaluated.add(questionKey);
    }

    if (optionData.isCorrect) {
      predictStepPassed = true;
      predictWhyVisible = false;
      playSound('correct');
      triggerConfetti();

      // Marcar visualmente la correcta
      step.options.forEach(opt => {
        const pill = document.getElementById(`pill-${opt.id}`);
        const badge = document.getElementById(`pill-badge-${opt.id}`);
        if (!pill) return;

        if (opt.isCorrect) {
          pill.className = `choice-pill ${isLongOptions ? 'w-full px-5 py-3' : 'px-6 py-3'} rounded-2xl border-2 border-emerald-500 bg-emerald-50/80 font-bold text-emerald-950 flex items-center gap-3 transition shadow-xs cursor-pointer`;
          if (badge) {
            badge.className = "w-6 h-6 rounded-lg bg-emerald-500 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs";
            badge.innerHTML = "✓";
          }
        } else {
          pill.className = `choice-pill ${isLongOptions ? 'w-full px-5 py-3' : 'px-6 py-3'} rounded-2xl border-2 border-slate-200 bg-white font-semibold text-slate-700 hover:border-slate-300 flex items-center gap-3 transition cursor-pointer`;
          if (badge) {
            badge.className = "w-6 h-6 rounded-lg bg-slate-100 border border-slate-300 text-slate-600 font-mono font-bold text-xs flex items-center justify-center shrink-0";
            badge.innerHTML = opt.id;
          }
        }
      });

      // Feedback conciso y limpio
      feedbackArea.innerHTML = `
        <div id="predict-success-badge" class="flex items-center justify-center gap-2 py-2.5 px-5 bg-emerald-50 border border-emerald-200 text-brand-800 rounded-2xl font-bold text-sm shadow-xs animate-modal-pop">
          <svg class="w-5 h-5 text-brand-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          <span>¡Respuesta correcta!</span>
        </div>
        <div id="predict-why-card" class="hidden mt-3 p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 text-slate-800 text-left shadow-sm transition-all animate-modal-pop">
          <div class="flex items-start gap-3">
            <span class="text-xl shrink-0">💡</span>
            <div>
              <div class="font-bold text-xs uppercase tracking-wider text-emerald-800 mb-1">¿Por qué es la respuesta correcta?</div>
              <div class="text-xs sm:text-sm text-slate-700 leading-relaxed">${step.fullAnswerExplanation || '¡Excelente deducción lógica!'}</div>
            </div>
          </div>
        </div>
      `;

      // Botones estilo Brilliant: "¿Por qué?" + "Continuar ➔"
      renderPredictApprovedActions();

    } else {
      // Fallo: registrar error en estadísticas y mostrar explicación
      if (currentLessonStats) {
        currentLessonStats.questionsWrongAttempts[questionKey] = (currentLessonStats.questionsWrongAttempts[questionKey] || 0) + 1;
      }
      playSound('wrong');

      const wrongPill = document.getElementById(`pill-${optionData.id}`);
      if (wrongPill) {
        wrongPill.classList.remove('border-brand-500', 'bg-brand-50', 'text-brand-800', 'ring-brand-300');
        wrongPill.classList.add('border-rose-400', 'bg-rose-50', 'text-rose-950', 'ring-2', 'ring-rose-200');
      }

      feedbackArea.innerHTML = `
        <div class="p-4 rounded-2xl border-2 border-rose-300 bg-rose-50 text-slate-800 text-left shadow-sm transition-all animate-modal-pop">
          <div class="flex items-start gap-3">
            <span class="text-xl shrink-0">⚠️</span>
            <div>
              <div class="font-bold text-xs uppercase tracking-wider text-rose-800 mb-1">
                ¿Por qué la opción ${optionData.id} no es correcta?
              </div>
              <div class="text-xs sm:text-sm text-rose-950 leading-relaxed">
                ${optionData.whyIncorrect || step.correctionTip || 'Esta opción no corresponde a la ejecución producida.'}
              </div>
            </div>
          </div>
        </div>
      `;

      if (checkBtn) {
        checkBtn.textContent = "Intentar de nuevo";
        checkBtn.className = "btn-3d w-full max-w-sm bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base py-3 px-8 rounded-2xl border-amber-700 transition shadow-sm cursor-pointer";
        checkBtn.disabled = false;
        checkBtn.onclick = () => {
          feedbackArea.innerHTML = '';
          checkBtn.textContent = "Comprobar";
          checkBtn.className = "btn-3d w-full max-w-sm bg-slate-300 text-slate-500 font-extrabold text-base py-3 px-8 rounded-2xl border-slate-400 cursor-not-allowed transition";
          checkBtn.disabled = true;
          checkBtn.onclick = checkPredictSingleAnswer;
          selectedPredictOption = null;

          if (hasCodePlayer) {
            resetCodePlayerLocked(playerId);
          }

          const slotEl = document.getElementById(`code-slot-${playerId}`);
          if (slotEl) {
            slotEl.className = 'code-slot-box slot-empty px-2 py-0.5 text-xs font-bold font-mono select-none';
            slotEl.innerHTML = '<span class="blinking-cursor"></span>';
          }

          document.querySelectorAll('#predict-options-row .choice-pill').forEach(btn => {
            btn.classList.remove('border-rose-400', 'bg-rose-50', 'text-rose-950', 'ring-2', 'ring-rose-200');
            btn.classList.add('border-slate-200', 'bg-white', 'text-slate-800');
          });
        };
      }
    }
  };

  // 3. Ejecutar animación automática si hay reproductor de código
  if (hasCodePlayer) {
    runCodePlayerAutoAnimate(playerId, onExecutionFinished);
  } else {
    onExecutionFinished();
  }
}

function renderPredictApprovedActions() {
  const actionsContainer = document.getElementById('predict-actions-container');
  if (!actionsContainer) return;

  actionsContainer.innerHTML = `
    <div class="flex items-center justify-center gap-3 w-full max-w-md animate-modal-pop">
      <button id="predict-why-btn" onclick="togglePredictWhyExplanation()" class="bg-[#2a2d34] hover:bg-[#383d47] active:scale-95 text-white font-bold py-3.5 px-6 rounded-full shadow-md transition-all flex items-center justify-center gap-2 text-sm shrink-0 cursor-pointer">
        <svg class="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path stroke-width="2" stroke-linecap="round" d="M12 16v.01M12 8a2 2 0 0 1 2 2c0 1-1.5 1.5-1.5 2.5"/></svg>
        ¿Por qué?
      </button>
      <button id="predict-continue-btn" onclick="advanceNextStep()" class="flex-1 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-extrabold py-3.5 px-8 rounded-full shadow-brilliant-btn border-b-4 border-brand-700 transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer">
        Continuar ➔
      </button>
    </div>
  `;
}

function togglePredictWhyExplanation() {
  playSound('pop');
  predictWhyVisible = !predictWhyVisible;
  const whyCard = document.getElementById('predict-why-card');
  const step = currentLesson.steps[currentStepIndex];

  if (!whyCard) {
    const feedbackArea = document.getElementById('predict-feedback-area');
    if (feedbackArea) {
      feedbackArea.innerHTML = `
        <div id="predict-success-badge" class="flex items-center justify-center gap-2 py-2.5 px-5 bg-emerald-50 border border-emerald-200 text-brand-800 rounded-2xl font-bold text-sm shadow-xs animate-modal-pop">
          <svg class="w-5 h-5 text-brand-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          <span>¡Respuesta correcta!</span>
        </div>
        <div id="predict-why-card" class="mt-3 p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 text-slate-800 text-left shadow-sm transition-all animate-modal-pop">
          <div class="flex items-start gap-3">
            <span class="text-xl shrink-0">💡</span>
            <div>
              <div class="font-bold text-xs uppercase tracking-wider text-emerald-800 mb-1">¿Por qué es la respuesta correcta?</div>
              <div class="text-xs sm:text-sm text-slate-700 leading-relaxed">${step.fullAnswerExplanation || '¡Excelente deducción lógica!'}</div>
            </div>
          </div>
        </div>
      `;
      predictWhyVisible = true;
      return;
    }
  }

  if (whyCard) {
    if (predictWhyVisible) {
      whyCard.classList.remove('hidden');
    } else {
      whyCard.classList.add('hidden');
    }
  }
}

function unlockVisualizerContinue(text = "Continuar al editor ➔") {
  const btn = document.getElementById('visualizer-continue-btn');
  if (!btn || btn.dataset.unlocked === 'true') return;
  btn.dataset.unlocked = 'true';
  btn.disabled = false;
  btn.onclick = advanceNextStep;
  btn.className = "btn-3d w-full max-w-sm bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-extrabold text-base py-3.5 px-8 rounded-2xl shadow-brilliant-btn border-b-4 border-brand-700 transition cursor-pointer animate-modal-pop flex items-center justify-center gap-2";
  btn.innerHTML = text;
}

// 2. Laboratorio Interactivo
function renderPrintVisualizer(step, container) {
  container.innerHTML = `
    <div class="w-full max-w-xl flex flex-col items-center text-center">
      
      <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-brand-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
        <span>Laboratorio Interactivo</span>
      </div>

      <h2 class="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight break-words max-w-full mb-2">
        Experimenta con el separador sep
      </h2>
      <p class="text-slate-500 text-sm mb-6">
        Haz clic en los botones para cambiar el separador y ver la salida resultante:
      </p>

      <div class="w-full bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm mb-6 text-left">
        <label class="block text-xs font-bold text-slate-600 mb-2">Selecciona un separador (sep):</label>
        <div class="flex flex-wrap gap-2 mb-5" id="sep-buttons-group">
          <button onclick="updateSinglePrintSim('-', this)" class="sep-btn px-3 py-1.5 text-xs font-mono font-bold bg-white border border-slate-300 text-slate-700 rounded-xl hover:border-brand-500 transition cursor-pointer">- (guion)</button>
          <button onclick="updateSinglePrintSim(' | ', this)" class="sep-btn px-3 py-1.5 text-xs font-mono font-bold bg-white border border-slate-300 text-slate-700 rounded-xl hover:border-brand-500 transition cursor-pointer">| (barra)</button>
          <button onclick="updateSinglePrintSim('...', this)" class="sep-btn px-3 py-1.5 text-xs font-mono font-bold bg-white border border-slate-300 text-slate-700 rounded-xl hover:border-brand-500 transition cursor-pointer">... (puntos)</button>
          <button onclick="updateSinglePrintSim(' ', this)" class="sep-btn px-3 py-1.5 text-xs font-mono font-bold bg-white border border-slate-300 text-slate-700 rounded-xl hover:border-brand-500 transition cursor-pointer">espacio</button>
        </div>

        <div class="bg-slate-900 rounded-xl p-3.5 font-mono text-xs text-slate-300 mb-3 border border-slate-800">
          <div class="flex items-center justify-between text-slate-400 text-[10px] mb-1.5">
            <span># Código Python:</span>
            <span class="text-brand-400 font-bold">sep modificado en vivo</span>
          </div>
          <div id="single-sim-code" class="text-slate-200 font-semibold text-sm flex items-center flex-wrap gap-1.5 py-1">
            <span>print("A", "B", "C", sep=</span><span id="single-sim-slot" class="code-slot-box slot-emerald-empty px-2.5 py-0.5 text-xs min-w-[50px]"><span class="blinking-cursor cursor-emerald"></span></span><span>)</span>
          </div>
        </div>

        <div class="bg-[#11111b] rounded-xl p-3 font-mono text-sm border border-slate-800">
          <div class="text-[10px] text-slate-500 mb-1">SALIDA RESULTANTE:</div>
          <div id="single-sim-out" class="text-slate-400 italic text-xs flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>A B C (salida por defecto sin sep personalizado)</span>
          </div>
        </div>
      </div>

      <button id="visualizer-continue-btn" disabled class="w-full max-w-sm py-3.5 px-8 rounded-2xl font-extrabold text-base transition-all flex items-center justify-center gap-2 bg-slate-200 text-slate-400 border-2 border-slate-300 cursor-not-allowed shadow-none">
        <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span>Prueba un separador para continuar</span>
      </button>

    </div>
  `;
}

function updateSinglePrintSim(sep, btn) {
  playSound('step');
  
  if (btn) {
    document.querySelectorAll('#sep-buttons-group .sep-btn').forEach(b => {
      b.className = "sep-btn px-3 py-1.5 text-xs font-mono font-bold bg-white border border-slate-300 text-slate-700 rounded-xl hover:border-brand-500 transition cursor-pointer";
    });
    btn.className = "sep-btn px-3 py-1.5 text-xs font-mono font-bold border-2 border-brand-500 bg-brand-50 text-brand-800 rounded-xl transition shadow-xs cursor-pointer";
  }

  const slotEl = document.getElementById('single-sim-slot');
  const outEl = document.getElementById('single-sim-out');
  if (slotEl) {
    slotEl.className = "code-slot-box slot-emerald px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-300";
    slotEl.textContent = `"${sep}"`;
    slotEl.classList.remove('animate-modal-pop');
    void slotEl.offsetWidth;
    slotEl.classList.add('animate-modal-pop');
  }
  if (outEl) {
    outEl.className = "text-emerald-400 font-bold text-sm";
    outEl.textContent = ["A", "B", "C"].join(sep);
  }

  unlockVisualizerContinue("Continuar al editor ➔");
}

// 3. Visualizador de conversión
function renderInputVisualizer(step, container) {
  container.innerHTML = `
    <div class="w-full max-w-xl flex flex-col items-center text-center">
      
      <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-brand-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
        <span>Laboratorio Interactivo</span>
      </div>

      <h2 class="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight break-words max-w-full mb-2">
        Transforma texto en número con int()
      </h2>
      <p class="text-slate-500 text-sm mb-6">
        Haz clic en el botón para convertir el texto capturado por input() a entero:
      </p>

      <div class="w-full bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
        <div class="flex items-center justify-center gap-4 mb-4">
          <div class="bg-amber-50 border border-amber-200 p-3 rounded-xl text-center">
            <div class="text-[10px] uppercase font-bold text-amber-800">input() captura texto</div>
            <div class="font-mono font-bold text-lg text-amber-900">"25"</div>
          </div>
          
          <button onclick="transformSingleInput()" id="btn-input-transform" class="choice-pill px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-sm border border-brand-700 transition flex items-center gap-1.5">
            <span>int(</span><span id="single-input-btn-slot" class="code-slot-box slot-emerald">"25"</span><span>) ➔</span>
          </button>

          <div class="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-center">
            <div class="text-[10px] uppercase font-bold text-emerald-800" id="single-trans-type">Texto</div>
            <div class="font-mono font-bold text-lg text-emerald-700" id="single-trans-val">--</div>
          </div>
        </div>

        <p class="text-xs text-slate-500" id="single-trans-desc">
          Pulsa el botón para convertir el texto en número y habilitar la suma matemática.
        </p>
      </div>

      <button id="visualizer-continue-btn" disabled class="w-full max-w-sm py-3.5 px-8 rounded-2xl font-extrabold text-base transition-all flex items-center justify-center gap-2 bg-slate-200 text-slate-400 border-2 border-slate-300 cursor-not-allowed shadow-none">
        <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span>Ejecuta la conversión para continuar</span>
      </button>

    </div>
  `;
}

function transformSingleInput() {
  playSound('correct');
  const slot = document.getElementById('single-input-btn-slot');
  if (slot) {
    slot.classList.remove('animate-modal-pop');
    void slot.offsetWidth;
    slot.classList.add('animate-modal-pop');
  }
  document.getElementById('single-trans-type').textContent = "Entero";
  document.getElementById('single-trans-val').textContent = "25";
  document.getElementById('single-trans-desc').textContent = "¡Convertido con éxito! Ahora 25 + 5 = 30.";

  unlockVisualizerContinue("Continuar al editor ➔");
}

// 4. Visualizador de matemáticas
function renderMathVisualizer(step, container) {
  container.innerHTML = `
    <div class="w-full max-w-xl flex flex-col items-center text-center">
      
      <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-brand-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
        <span>Laboratorio Interactivo</span>
      </div>

      <h2 class="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight break-words max-w-full mb-2">
        La biblioteca math en acción
      </h2>
      <p class="text-slate-500 text-sm mb-6">
        Selecciona una función matemática para ver cómo se inserta y calcula en tiempo real:
      </p>

      <div class="w-full bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm mb-6 text-left">
        <div class="flex flex-wrap gap-2 mb-4 justify-center" id="single-math-buttons">
          <button id="btn-math-sqrt" onclick="runSingleMath('sqrt')" class="choice-pill px-3.5 py-2 text-xs font-mono font-bold bg-white border border-slate-300 text-slate-700 hover:border-brand-500 rounded-xl transition cursor-pointer">math.sqrt(49)</button>
          <button id="btn-math-ceil" onclick="runSingleMath('ceil')" class="choice-pill px-3.5 py-2 text-xs font-mono font-bold bg-white border border-slate-300 text-slate-700 hover:border-brand-500 rounded-xl transition cursor-pointer">math.ceil(4.1)</button>
          <button id="btn-math-floor" onclick="runSingleMath('floor')" class="choice-pill px-3.5 py-2 text-xs font-mono font-bold bg-white border border-slate-300 text-slate-700 hover:border-brand-500 rounded-xl transition cursor-pointer">math.floor(4.9)</button>
        </div>

        <div class="bg-slate-900 rounded-xl p-4 font-mono text-center text-white border border-slate-800">
          <div class="text-xs text-slate-400 mb-2 leading-relaxed" id="single-math-code">
            <span class="text-purple-400">import</span> <span class="text-cyan-300">math</span><br>
            <span class="text-cyan-300">math</span>.<span id="single-math-slot" class="code-slot-box slot-emerald-empty px-2.5 py-0.5 text-xs min-w-[65px]"><span class="blinking-cursor cursor-emerald"></span></span>
          </div>
          <div class="text-xs text-slate-400 italic mt-2" id="single-math-res">-- Selecciona una función arriba para calcular --</div>
        </div>
      </div>

      <button id="visualizer-continue-btn" disabled class="w-full max-w-sm py-3.5 px-8 rounded-2xl font-extrabold text-base transition-all flex items-center justify-center gap-2 bg-slate-200 text-slate-400 border-2 border-slate-300 cursor-not-allowed shadow-none">
        <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span>Selecciona una función para continuar</span>
      </button>

    </div>
  `;
}

function runSingleMath(fn) {
  playSound('step');
  const slotEl = document.getElementById('single-math-slot');
  const resEl = document.getElementById('single-math-res');
  const btns = ['sqrt', 'ceil', 'floor'];
  btns.forEach(b => {
    const btn = document.getElementById(`btn-math-${b}`);
    if (btn) {
      if (b === fn) {
        btn.className = "choice-pill px-3.5 py-2 text-xs font-mono font-bold bg-emerald-50 border-2 border-brand-500 text-brand-800 ring-2 ring-brand-300 rounded-xl transition";
      } else {
        btn.className = "choice-pill px-3.5 py-2 text-xs font-mono font-bold bg-white border border-slate-300 text-slate-700 hover:border-brand-500 rounded-xl transition";
      }
    }
  });

  if (slotEl && resEl) {
    slotEl.className = "code-slot-box slot-emerald px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-300";
    resEl.className = "text-2xl font-black text-emerald-400 mt-2";
    if (fn === 'sqrt') {
      slotEl.textContent = 'sqrt(49)';
      resEl.textContent = '➔ 7.0';
    } else if (fn === 'ceil') {
      slotEl.textContent = 'ceil(4.1)';
      resEl.textContent = '➔ 5';
    } else if (fn === 'floor') {
      slotEl.textContent = 'floor(4.9)';
      resEl.textContent = '➔ 4';
    }
    slotEl.classList.remove('animate-modal-pop');
    void slotEl.offsetWidth;
    slotEl.classList.add('animate-modal-pop');
  }

  unlockVisualizerContinue("Continuar al editor ➔");
}

// 5. Sandbox focalizado (Editor estilo VS Code completo, sin recortes ni scrollbar)
let currentGuidedStep = null;
let selectedGuidedOptionId = null;
let guidedStepCompleted = false;
let sandboxUserInputs = {};

function renderSandboxStep(step, container) {
  stopSandboxAnimation();
  currentGuidedStep = step;
  selectedGuidedOptionId = null;
  guidedStepCompleted = false;
  sandboxUserInputs = {};

  const isGuided = Boolean(step.options && step.options.length > 0);
  const starterCode = (step.starterCode || '').trim();
  const lines = starterCode.split('\n');
  const slotMarker = step.slotMarker || "___";

  let codeAreaHtml = '';
  if (isGuided) {
    const linesRowsHtml = lines.map((line, idx) => {
      let contentHtml = '';
      if (line.includes(slotMarker)) {
        const parts = line.split(slotMarker);
        const prefix = parts[0];
        const suffix = parts.slice(1).join(slotMarker);
        contentHtml = `${highlightPythonSyntax(prefix)}<span id="guided-code-slot" class="code-slot-box slot-empty px-2.5 py-0.5 text-xs font-bold font-mono select-none inline-flex items-center min-w-[50px]"><span class="blinking-cursor"></span></span>${highlightPythonSyntax(suffix)}`;
      } else {
        contentHtml = highlightPythonSyntax(line) || '&nbsp;';
      }
      return `
        <div id="sandbox-line-${idx}" class="code-exec-line flex items-center py-1 px-3 rounded-lg font-mono text-xs sm:text-sm leading-relaxed transition-colors duration-150">
          <span class="w-5 shrink-0 flex items-center justify-center font-bold text-white text-xs select-none" id="sandbox-arrow-${idx}"></span>
          <span class="w-6 shrink-0 text-slate-500 text-right pr-3 text-xs select-none">${idx + 1}</span>
          <div class="flex-1 whitespace-pre overflow-x-auto text-slate-200">${contentHtml}</div>
        </div>
      `;
    }).join('');

    codeAreaHtml = `
      <div class="p-3 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto space-y-0.5 bg-[#181825]" id="sandbox-editor-wrapper">
        ${linesRowsHtml}
      </div>
    `;
  } else {
    const lineNumbersHtml = lines.map((_, i) => `<div>${i + 1}</div>`).join('');
    const highlightedHtml = lines.map(l => highlightPythonSyntax(l)).join('\n');
    codeAreaHtml = `
      <div class="relative flex font-mono text-xs sm:text-sm leading-relaxed bg-[#181825]" id="sandbox-editor-wrapper">
        <div id="sandbox-line-numbers" class="select-none py-3.5 pl-3 pr-2.5 text-right text-slate-500 font-mono text-xs sm:text-sm border-r border-slate-800 bg-[#11111b] shrink-0 min-w-[2.75rem]">
          ${lineNumbersHtml}
        </div>
        <div class="relative flex-1 min-w-0">
          <pre id="sandbox-highlight-pre" aria-hidden="true" class="pointer-events-none absolute inset-0 p-3.5 font-mono text-xs sm:text-sm whitespace-pre select-none m-0 overflow-hidden text-slate-200">${highlightedHtml}\n </pre>
          <textarea id="single-sandbox-code" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off" class="relative z-10 w-full bg-transparent text-transparent caret-sky-400 p-3.5 font-mono text-xs sm:text-sm whitespace-pre focus:outline-none resize-none m-0 overflow-hidden block">${escapeHtml(starterCode)}</textarea>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="w-full max-w-2xl flex flex-col items-center text-center">
      
      ${step.partLabel ? `
        <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-brand-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
          <span>${step.partLabel}</span>
        </div>
      ` : ''}

      <h2 class="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight break-words max-w-full mb-2">
        ${formatRichText(step.title)}
      </h2>
      <p class="text-slate-500 text-xs sm:text-sm mb-4 max-w-lg leading-relaxed">
        ${formatRichText(step.instruction)}
      </p>

      <!-- Editor de Código estilo VS Code (completo, sin recortes ni scrollbar) -->
      <div id="sandbox-editor-container" class="w-full bg-[#181825] border-2 border-slate-700/60 rounded-2xl overflow-hidden shadow-lg mb-4 text-left">
        
        <!-- Header con pestaña de archivo main.py estilo VS Code -->
        <div class="bg-[#11111b] px-4 py-2 flex items-center justify-between border-b border-slate-800 text-xs font-mono">
          <div class="flex items-center gap-2">
            <span class="flex items-center gap-1.5 px-3 py-1 bg-[#181825] text-slate-200 font-semibold rounded-t-lg border-t border-x border-slate-700/80">
              <span class="text-amber-400 font-bold">py</span>
              <span>main.py</span>
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-slate-400 text-[11px] hidden sm:inline">${isGuided ? 'Práctica guiada interactiva' : 'Editor interactivo'}</span>
            <span class="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px] font-bold">● Python 3.10</span>
          </div>
        </div>

        ${codeAreaHtml}

        <!-- Terminal integrada inferior (Consola verde idéntica a Brilliant) -->
        <div class="bg-[#000000] border-t-2 border-[#10b981] p-3.5 font-mono text-xs text-left">
          <div class="text-[10px] text-emerald-500 font-extrabold uppercase tracking-wider mb-1.5 flex items-center justify-between border-b border-emerald-950/80 pb-1">
            <span class="flex items-center gap-1.5">
              <span>Salida en pantalla (Terminal)</span>
            </span>
            <div class="flex items-center gap-2">
              <span id="sandbox-term-status" class="text-emerald-500/70 font-normal">esperando ejecución</span>
              <span id="sandbox-term-indicator" class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
          </div>
          <div id="single-sandbox-term" class="text-[#34d399] min-h-[42px] whitespace-pre-wrap font-mono text-xs sm:text-sm font-semibold flex items-center leading-relaxed">
            <span class="text-slate-500 italic font-normal text-xs">
              ${isGuided ? 'Selecciona una opción y haz clic en «▶ Ejecutar código»...' : 'Presiona «▶ Ejecutar código» para probar tu solución...'}
            </span>
          </div>
        </div>
      </div>

      ${isGuided ? `
        <!-- Opciones de código para rellenar el slot estilo Brilliant -->
        <div class="w-full mb-4 text-left">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Elige la opción que completa el código:</span>
            <span class="text-[11px] text-brand-600 font-semibold font-sans hidden sm:inline">Haz clic en una opción</span>
          </div>
          <div class="${step.options.some(opt => (opt.label || opt.code || '').length > 18) ? 'flex flex-col gap-2.5 w-full' : 'grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full'}" id="guided-options-group">
            ${step.options.map(opt => `
              <button type="button" id="guided-opt-${opt.id}" onclick="selectGuidedOption('${opt.id}')"
                class="guided-option-btn group text-left px-4 py-3 rounded-2xl border-2 border-slate-200 hover:border-brand-400 bg-white hover:bg-emerald-50/40 shadow-sm transition-all flex items-center gap-3 cursor-pointer w-full">
                <span class="w-7 h-7 rounded-xl bg-slate-100 group-hover:bg-brand-100 text-slate-600 group-hover:text-brand-700 font-bold text-xs flex items-center justify-center border border-slate-300 group-hover:border-brand-300 shrink-0 font-mono opt-badge transition">
                  ${opt.id}
                </span>
                <code class="font-mono text-xs sm:text-sm text-slate-800 font-semibold opt-code break-words sm:break-normal text-left flex-1">
                  ${escapeHtml(opt.label || opt.code)}
                </code>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Tarjeta de feedback (éxito o error con explicación) -->
        <div id="guided-feedback-card" class="w-full mb-4 hidden"></div>
      ` : ''}

      <div class="w-full flex items-center justify-center gap-3" id="sandbox-action-buttons">
        ${isGuided ? `
          <button id="single-run-btn" onclick="executeGuidedSandbox()" disabled class="w-full max-w-sm bg-slate-200 text-slate-400 cursor-not-allowed font-extrabold text-base py-3 px-8 rounded-2xl border-2 border-slate-300 transition">
            Selecciona una opción primero
          </button>
        ` : `
          <button id="single-run-btn" onclick="executeSingleSandbox()" class="btn-3d w-full max-w-sm bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base py-3 px-8 rounded-2xl shadow-brilliant-btn border-brand-700 transition">
            Ejecutar código
          </button>
        `}
      </div>

    </div>
  `;

  if (!isGuided) {
    setupSandboxEditor();
  }
  initPyodide();
}

function selectGuidedOption(optId) {
  if (!currentGuidedStep || !currentGuidedStep.options) return;
  stopSandboxAnimation();

  selectedGuidedOptionId = optId;
  const opt = currentGuidedStep.options.find(o => o.id === optId);
  if (!opt) return;

  playSound('click');

  // Limpiar cualquier línea activa en el editor
  const totalLines = (currentGuidedStep.starterCode || '').split('\n').length;
  for (let i = 0; i < totalLines; i++) {
    const lineEl = document.getElementById(`sandbox-line-${i}`);
    const arrowEl = document.getElementById(`sandbox-arrow-${i}`);
    if (lineEl) lineEl.classList.remove('active');
    if (arrowEl) arrowEl.innerHTML = '';
  }

  // Actualizar estilos de los botones de opciones
  currentGuidedStep.options.forEach(o => {
    const btn = document.getElementById(`guided-opt-${o.id}`);
    if (!btn) return;
    const badge = btn.querySelector('.opt-badge');
    if (o.id === optId) {
      btn.className = "guided-option-btn text-left px-4 py-3 rounded-2xl border-2 border-brand-500 bg-brand-50 shadow-md ring-2 ring-brand-300 transition-all flex items-center gap-3 cursor-pointer w-full";
      if (badge) {
        badge.className = "w-7 h-7 rounded-xl bg-brand-500 text-white font-bold text-xs flex items-center justify-center border border-brand-600 shrink-0 font-mono opt-badge transition";
      }
    } else {
      btn.className = "guided-option-btn group text-left px-4 py-3 rounded-2xl border-2 border-slate-200 hover:border-brand-400 bg-white hover:bg-emerald-50/40 shadow-sm transition-all flex items-center gap-3 cursor-pointer w-full";
      if (badge) {
        badge.className = "w-7 h-7 rounded-xl bg-slate-100 group-hover:bg-brand-100 text-slate-600 group-hover:text-brand-700 font-bold text-xs flex items-center justify-center border border-slate-300 group-hover:border-brand-300 shrink-0 font-mono opt-badge transition";
      }
    }
  });

  // Rellenar el recuadro dentro del código con sintaxis Python resaltada
  const slotEl = document.getElementById('guided-code-slot');
  if (slotEl) {
    slotEl.className = "code-slot-box slot-filled animate-modal-pop px-2.5 py-0.5 text-xs font-bold font-mono inline-flex items-center";
    slotEl.innerHTML = highlightPythonSyntax(opt.code);
  }

  const feedbackCard = document.getElementById('guided-feedback-card');
  const actionContainer = document.getElementById('sandbox-action-buttons');

  // Si ya había completado el ejercicio exitosamente, permitir explorar por qué otras opciones eran incorrectas
  if (guidedStepCompleted) {
    if (feedbackCard) {
      if (opt.isCorrect) {
        feedbackCard.className = "w-full mb-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-left shadow-sm flex items-start gap-3 animate-slide-up";
        feedbackCard.innerHTML = `
          <span class="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-base flex items-center justify-center shrink-0 mt-0.5">✓</span>
          <div>
            <h4 class="font-extrabold text-emerald-900 text-sm mb-1">Opción correcta seleccionada</h4>
            <p class="text-xs sm:text-sm text-emerald-800 leading-relaxed">${escapeHtml(opt.feedback || "Esta es la instrucción adecuada para el programa.")}</p>
          </div>
        `;
      } else {
        feedbackCard.className = "w-full mb-4 bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-left shadow-sm flex items-start gap-3 animate-slide-up";
        feedbackCard.innerHTML = `
          <span class="w-7 h-7 rounded-full bg-amber-500 text-white font-bold text-base flex items-center justify-center shrink-0 mt-0.5">ℹ</span>
          <div>
            <h4 class="font-extrabold text-amber-900 text-sm mb-1">¿Por qué esta opción es incorrecta?</h4>
            <p class="text-xs sm:text-sm text-amber-800 leading-relaxed">${escapeHtml(opt.feedback || "Esta opción no cumple con la especificación del programa.")}</p>
          </div>
        `;
      }
      feedbackCard.classList.remove('hidden');
    }

    if (actionContainer) {
      actionContainer.innerHTML = `
        <button id="guided-finish-btn" onclick="advanceNextStep()" class="btn-3d w-full max-w-sm bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base py-3 px-8 rounded-2xl shadow-brilliant-btn border-brand-700 transition cursor-pointer">
          Finalizar lección ➔
        </button>
        <button id="single-run-btn" onclick="executeGuidedSandbox()" class="px-4 py-3 rounded-2xl border-2 border-slate-300 text-slate-700 hover:text-slate-900 font-bold hover:bg-slate-100 transition text-sm flex items-center gap-1.5 cursor-pointer">
          <span>▶</span> Probar en terminal
        </button>
      `;
    }
    return;
  }

  // Si aún no ha completado el ejercicio, habilitar el botón de Ejecutar código
  const runBtn = document.getElementById('single-run-btn');
  if (runBtn) {
    runBtn.disabled = false;
    runBtn.className = "btn-3d w-full max-w-sm bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base py-3 px-8 rounded-2xl shadow-brilliant-btn border-brand-700 transition cursor-pointer";
    runBtn.textContent = "▶ Ejecutar código";
    runBtn.onclick = executeGuidedSandbox;
  }
}

async function executeGuidedSandbox() {
  if (!currentGuidedStep || !selectedGuidedOptionId) return;
  const opt = currentGuidedStep.options.find(o => o.id === selectedGuidedOptionId);
  if (!opt) return;

  stopSandboxAnimation();
  ensureCodeVisible('sandbox-editor-container');

  const runBtn = document.getElementById('single-run-btn');
  const term = document.getElementById('single-sandbox-term');
  const statusEl = document.getElementById('sandbox-term-status');
  const indicator = document.getElementById('sandbox-term-indicator');
  const feedbackCard = document.getElementById('guided-feedback-card');

  if (runBtn) {
    runBtn.disabled = true;
    runBtn.textContent = "Ejecutando...";
    runBtn.className = "w-full max-w-sm bg-slate-200 text-slate-400 cursor-not-allowed font-extrabold text-base py-3 px-8 rounded-2xl border-2 border-slate-300 transition";
  }
  if (feedbackCard) feedbackCard.classList.add('hidden');

  const slotMarker = currentGuidedStep.slotMarker || "___";
  const fullCode = currentGuidedStep.starterCode.replace(slotMarker, opt.code);

  const { lines, lineTrace } = tracePythonExecution(fullCode, currentGuidedStep.expectedOutput, sandboxUserInputs);

  // Limpiar cualquier línea activa previa
  lines.forEach((_, i) => {
    const lineEl = document.getElementById(`sandbox-line-${i}`);
    const arrowEl = document.getElementById(`sandbox-arrow-${i}`);
    if (lineEl) lineEl.classList.remove('active');
    if (arrowEl) arrowEl.innerHTML = '';
  });

  if (statusEl) {
    statusEl.textContent = "iniciando...";
    statusEl.className = "text-amber-400 font-normal";
  }
  if (indicator) indicator.className = "w-2 h-2 rounded-full bg-amber-400 animate-ping";

  if (term) {
    term.className = "text-[#34d399] min-h-[42px] whitespace-pre-wrap font-mono text-xs sm:text-sm font-semibold flex items-center leading-relaxed";
    term.innerHTML = '<span class="text-slate-500 italic font-normal text-xs">Iniciando ejecución...</span>';
  }

  const stepDelay = window.FAST_ANIM ? 10 : 420;
  let currentIdx = -1;

  function stepSandbox() {
    currentIdx++;
    if (currentIdx < lines.length) {
      // Actualizar highlight de líneas
      lines.forEach((_, i) => {
        const lineEl = document.getElementById(`sandbox-line-${i}`);
        const arrowEl = document.getElementById(`sandbox-arrow-${i}`);
        if (lineEl && arrowEl) {
          if (i === currentIdx) {
            lineEl.classList.add('active');
            arrowEl.innerHTML = '<span class="text-white text-xs font-black animate-pulse">▶</span>';
          } else {
            lineEl.classList.remove('active');
            arrowEl.innerHTML = '';
          }
        }
      });

      const state = lineTrace[currentIdx];
      if (state && state.isInput && !state.isCompleted) {
        clearTimeout(sandboxAnimTimer);
        sandboxAnimTimer = null;
        if (statusEl) {
          statusEl.textContent = "esperando entrada de usuario...";
          statusEl.className = "text-amber-400 font-normal";
        }
        renderSandboxInputPrompt(currentIdx, state.prompt, opt, fullCode, lineTrace);
        return;
      }

      // Actualizar terminal con lo acumulado hasta esta línea
      if (term) {
        if (state && state.outputSoFar && state.outputSoFar.length > 0) {
          term.className = "text-[#34d399] min-h-[42px] whitespace-pre-wrap font-mono text-xs sm:text-sm font-semibold flex items-center leading-relaxed";
          term.innerHTML = `<div class="font-mono whitespace-pre-wrap font-semibold leading-relaxed">${escapeHtml(state.outputSoFar.join('\n'))}</div>`;
        } else {
          term.innerHTML = '<span class="text-slate-500 italic font-normal text-xs">(Línea en proceso, sin salida aún)</span>';
        }
      }

      if (statusEl) {
        statusEl.textContent = `línea ${currentIdx + 1}/${lines.length}...`;
      }

      playSound('step');
      sandboxAnimTimer = setTimeout(stepSandbox, stepDelay);
    } else {
      stopSandboxAnimation();

      // Limpiar flecha activa de la última línea
      const lastLineEl = document.getElementById(`sandbox-line-${lines.length - 1}`);
      const lastArrowEl = document.getElementById(`sandbox-arrow-${lines.length - 1}`);
      if (lastLineEl) lastLineEl.classList.remove('active');
      if (lastArrowEl) lastArrowEl.innerHTML = '';

      finishGuidedSandboxExecution(opt, lineTrace);
    }
  }

  sandboxAnimTimer = setTimeout(stepSandbox, window.FAST_ANIM ? 5 : 120);
}

function renderSandboxInputPrompt(lineIndex, promptText, opt, fullCode, lineTrace) {
  const term = document.getElementById('single-sandbox-term');
  if (!term) return;

  const prevLines = lineIndex > 0 && lineTrace[lineIndex - 1]?.outputSoFar
    ? lineTrace[lineIndex - 1].outputSoFar
    : [];
  const prevText = prevLines.join('\n');

  term.className = "text-[#34d399] min-h-[42px] whitespace-pre-wrap font-mono text-xs sm:text-sm font-semibold flex flex-col justify-center leading-relaxed";
  term.innerHTML = `
    <div class="text-[#34d399] font-mono whitespace-pre-wrap leading-relaxed w-full">
      ${prevText ? `<div>${escapeHtml(prevText)}</div>` : ''}
      <div class="flex flex-wrap items-center gap-2 mt-1 p-2 bg-[#052e16]/90 rounded-xl border border-emerald-500 shadow-md">
        <span class="text-emerald-300 font-bold text-xs sm:text-sm shrink-0">${escapeHtml(promptText || 'Entrada: ')}</span>
        <div class="flex items-center gap-1.5 flex-1 min-w-[140px]">
          <input id="sandbox-term-input-box" type="text" autocomplete="off" placeholder="Escribe aquí..." class="w-full bg-black text-amber-300 font-mono text-xs sm:text-sm px-2.5 py-1 rounded-lg border-2 border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 font-bold placeholder-slate-500" />
          <button id="sandbox-term-input-btn" onclick="handleSandboxInputSubmit(${lineIndex})" type="button" class="choice-pill px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-black text-xs rounded-lg transition shadow flex items-center gap-1 cursor-pointer shrink-0">
            <span>Enviar</span>
            <span>↵</span>
          </button>
        </div>
      </div>
    </div>
  `;

  if (window.FAST_ANIM) {
    setTimeout(() => handleSandboxInputSubmit(lineIndex), 5);
    return;
  }

  setTimeout(() => {
    const inputEl = document.getElementById('sandbox-term-input-box');
    if (inputEl) {
      inputEl.focus();
      inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          handleSandboxInputSubmit(lineIndex);
        }
      });
    }
  }, 40);
}

function handleSandboxInputSubmit(lineIndex) {
  if (!currentGuidedStep || !selectedGuidedOptionId) return;
  const opt = currentGuidedStep.options.find(o => o.id === selectedGuidedOptionId);
  if (!opt) return;

  const inputEl = document.getElementById('sandbox-term-input-box');
  const userVal = inputEl ? inputEl.value.trim() : "";
  const slotMarker = currentGuidedStep.slotMarker || "___";
  const fullCode = currentGuidedStep.starterCode.replace(slotMarker, opt.code);

  const defaultVal = fullCode.toLowerCase().includes('edad') ? "20" : "Sara";
  const finalVal = userVal.length > 0 ? userVal : defaultVal;

  playSound('click');

  if (!sandboxUserInputs) sandboxUserInputs = {};
  sandboxUserInputs[lineIndex] = finalVal;

  const { lines, lineTrace } = tracePythonExecution(fullCode, currentGuidedStep.expectedOutput, sandboxUserInputs);

  resumeSandboxAfterInput(lineIndex, opt, lines, lineTrace);
}

function resumeSandboxAfterInput(lineIndex, opt, lines, lineTrace) {
  const term = document.getElementById('single-sandbox-term');
  const statusEl = document.getElementById('sandbox-term-status');

  const state = lineTrace[lineIndex];
  if (term && state && state.outputSoFar) {
    term.className = "text-[#34d399] min-h-[42px] whitespace-pre-wrap font-mono text-xs sm:text-sm font-semibold flex items-center leading-relaxed";
    term.innerHTML = `<div class="font-mono whitespace-pre-wrap font-semibold leading-relaxed">${escapeHtml(state.outputSoFar.join('\n'))}</div>`;
  }

  const stepDelay = window.FAST_ANIM ? 10 : 420;
  let currentIdx = lineIndex;

  function stepSandboxCont() {
    currentIdx++;
    if (currentIdx < lines.length) {
      lines.forEach((_, i) => {
        const lineEl = document.getElementById(`sandbox-line-${i}`);
        const arrowEl = document.getElementById(`sandbox-arrow-${i}`);
        if (lineEl && arrowEl) {
          if (i === currentIdx) {
            lineEl.classList.add('active');
            arrowEl.innerHTML = '<span class="text-white text-xs font-black animate-pulse">▶</span>';
          } else {
            lineEl.classList.remove('active');
            arrowEl.innerHTML = '';
          }
        }
      });

      const st = lineTrace[currentIdx];
      if (st && st.isInput && !st.isCompleted) {
        clearTimeout(sandboxAnimTimer);
        sandboxAnimTimer = null;
        if (statusEl) {
          statusEl.textContent = "esperando entrada de usuario...";
          statusEl.className = "text-amber-400 font-normal";
        }
        renderSandboxInputPrompt(currentIdx, st.prompt, opt, lines.join('\n'), lineTrace);
        return;
      }

      if (term) {
        if (st && st.outputSoFar && st.outputSoFar.length > 0) {
          term.className = "text-[#34d399] min-h-[42px] whitespace-pre-wrap font-mono text-xs sm:text-sm font-semibold flex items-center leading-relaxed";
          term.innerHTML = `<div class="font-mono whitespace-pre-wrap font-semibold leading-relaxed">${escapeHtml(st.outputSoFar.join('\n'))}</div>`;
        } else {
          term.innerHTML = '<span class="text-slate-500 italic font-normal text-xs">(Línea en proceso, sin salida aún)</span>';
        }
      }

      if (statusEl) {
        statusEl.textContent = `línea ${currentIdx + 1}/${lines.length}...`;
      }

      playSound('step');
      sandboxAnimTimer = setTimeout(stepSandboxCont, stepDelay);
    } else {
      stopSandboxAnimation();
      const lastLineEl = document.getElementById(`sandbox-line-${lines.length - 1}`);
      const lastArrowEl = document.getElementById(`sandbox-arrow-${lines.length - 1}`);
      if (lastLineEl) lastLineEl.classList.remove('active');
      if (lastArrowEl) lastArrowEl.innerHTML = '';

      finishGuidedSandboxExecution(opt, lineTrace);
    }
  }

  sandboxAnimTimer = setTimeout(stepSandboxCont, stepDelay);
}

function finishGuidedSandboxExecution(opt, lineTrace) {
  const term = document.getElementById('single-sandbox-term');
  const statusEl = document.getElementById('sandbox-term-status');
  const indicator = document.getElementById('sandbox-term-indicator');
  const feedbackCard = document.getElementById('guided-feedback-card');
  const runBtn = document.getElementById('single-run-btn');

  const questionKey = 'step_' + currentStepIndex;
  if (currentLessonStats) {
    currentLessonStats.questionsEvaluated.add(questionKey);
  }

  const lastTrace = lineTrace && lineTrace.length > 0 ? lineTrace[lineTrace.length - 1] : null;
  const finalOutputLines = lastTrace?.outputSoFar || [];
  const hasError = finalOutputLines.some(l => l.startsWith('Error:'));

  if (term) {
    if (finalOutputLines.length > 0) {
      term.className = hasError ? "text-rose-400 min-h-[42px] whitespace-pre-wrap font-mono text-xs sm:text-sm font-semibold flex items-center leading-relaxed" : "text-[#34d399] min-h-[42px] whitespace-pre-wrap font-mono text-xs sm:text-sm font-semibold flex items-center leading-relaxed";
      term.innerHTML = `<div class="font-mono whitespace-pre-wrap font-semibold leading-relaxed">${escapeHtml(finalOutputLines.join('\n'))}</div>`;
    } else {
      term.className = "text-[#34d399] min-h-[42px] whitespace-pre-wrap font-mono text-xs sm:text-sm font-semibold flex items-center leading-relaxed";
      term.textContent = "(Ejecutado sin salida de texto)";
    }
  }

  if (opt.isCorrect && !hasError) {
    guidedStepCompleted = true;
    playSound('correct');
    triggerConfetti();

    if (statusEl) {
      statusEl.textContent = "✓ ejecutado con éxito";
      statusEl.className = "text-emerald-400 font-normal";
    }
    if (indicator) indicator.className = "w-2 h-2 rounded-full bg-emerald-400 animate-ping";

    if (feedbackCard) {
      feedbackCard.className = "w-full mb-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-left shadow-sm flex items-start gap-3 animate-slide-up";
      feedbackCard.innerHTML = `
        <span class="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-base flex items-center justify-center shrink-0 mt-0.5">✓</span>
        <div>
          <h4 class="font-extrabold text-emerald-900 text-sm mb-1">¡Código completado con éxito!</h4>
          <p class="text-xs sm:text-sm text-emerald-800 leading-relaxed">${escapeHtml(opt.feedback || "Has completado la práctica guiada correctamente.")}</p>
        </div>
      `;
      feedbackCard.classList.remove('hidden');
    }

    const actionContainer = document.getElementById('sandbox-action-buttons');
    if (actionContainer) {
      actionContainer.innerHTML = `
        <button id="guided-finish-btn" onclick="advanceNextStep()" class="btn-3d w-full max-w-sm bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base py-3 px-8 rounded-2xl shadow-brilliant-btn border-brand-700 transition animate-bounce-subtle cursor-pointer">
          Finalizar lección ➔
        </button>
        <button id="single-run-btn" onclick="executeGuidedSandbox()" class="px-4 py-3 rounded-2xl border-2 border-slate-300 text-slate-700 hover:text-slate-900 font-bold hover:bg-slate-100 transition text-sm flex items-center gap-1.5 cursor-pointer">
          <span>↺</span> Volver a ejecutar
        </button>
      `;
    }
  } else {
    if (currentLessonStats) {
      currentLessonStats.questionsWrongAttempts[questionKey] = (currentLessonStats.questionsWrongAttempts[questionKey] || 0) + 1;
    }
    playSound('wrong');

    if (statusEl) {
      statusEl.textContent = hasError ? "error en ejecución" : "✗ revisa la solución";
      statusEl.className = "text-rose-400 font-normal";
    }
    if (indicator) indicator.className = "w-2 h-2 rounded-full bg-rose-400";

    if (feedbackCard) {
      feedbackCard.className = "w-full mb-4 bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 text-left shadow-sm flex items-start gap-3 animate-slide-up";
      feedbackCard.innerHTML = `
        <span class="w-7 h-7 rounded-full bg-rose-500 text-white font-bold text-base flex items-center justify-center shrink-0 mt-0.5">✗</span>
        <div>
          <h4 class="font-extrabold text-rose-900 text-sm mb-1">${hasError ? 'Error al ejecutar esta opción' : 'Casi, pero no es la opción adecuada'}</h4>
          <p class="text-xs sm:text-sm text-rose-800 leading-relaxed">${escapeHtml(opt.feedback || "Selecciona otra opción de la lista para corregir el programa.")}</p>
        </div>
      `;
      feedbackCard.classList.remove('hidden');
    }

    if (runBtn) {
      runBtn.disabled = false;
      runBtn.className = "btn-3d w-full max-w-sm bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base py-3 px-8 rounded-2xl shadow-brilliant-btn border-brand-700 transition cursor-pointer";
      runBtn.textContent = "▶ Reintentar código";
      runBtn.onclick = executeGuidedSandbox;
    }
  }
}

function setupSandboxEditor() {
  const textarea = document.getElementById('single-sandbox-code');
  const pre = document.getElementById('sandbox-highlight-pre');
  const gutter = document.getElementById('sandbox-line-numbers');
  if (!textarea || !pre || !gutter) return;

  function sync() {
    const code = textarea.value;
    const lines = code.split('\n');
    gutter.innerHTML = lines.map((_, i) => `<div>${i + 1}</div>`).join('');
    pre.innerHTML = lines.map(l => highlightPythonSyntax(l)).join('\n') + '\n ';

    // Auto-ajustar altura para que NUNCA se recorte ni haya scrollbar
    textarea.style.height = 'auto';
    const computedHeight = Math.max(textarea.scrollHeight, lines.length * 26 + 32);
    textarea.style.height = computedHeight + 'px';
    pre.style.height = computedHeight + 'px';
  }

  textarea.addEventListener('input', sync);

  // Soporte para tecla Tab (4 espacios como en VS Code)
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 4;
      sync();
    }
  });

  // Ejecución inicial para fijar altura exacta sin scrollbar
  setTimeout(sync, 20);
}

async function executeSingleSandbox() {
  const textarea = document.getElementById('single-sandbox-code');
  const term = document.getElementById('single-sandbox-term');
  const statusEl = document.getElementById('sandbox-term-status');
  const runBtn = document.getElementById('single-run-btn');

  if (!textarea) return;

  ensureCodeVisible('sandbox-editor-container');
  playSound('step');
  runBtn.disabled = true;
  runBtn.textContent = "Ejecutando...";
  if (statusEl) {
    statusEl.textContent = "procesando...";
    statusEl.className = "text-amber-400 font-normal";
  }
  const singleIndicator = document.getElementById('sandbox-term-indicator');
  if (singleIndicator) singleIndicator.className = "w-2 h-2 rounded-full bg-amber-400 animate-ping";
  term.className = "text-amber-400 min-h-[42px] whitespace-pre-wrap font-mono text-xs sm:text-sm font-semibold flex items-center leading-relaxed";
  term.textContent = "Procesando código...";

  setTimeout(async () => {
    let captured = "";
    try {
      if (pyodideInstance) {
        pyodideInstance.setStdout({ batched: (str) => { captured += str + "\n"; } });
        pyodideInstance.setStderr({ batched: (str) => { captured += "Error: " + str + "\n"; } });
        await pyodideInstance.runPythonAsync(textarea.value);
      } else {
        captured = simulateSandbox(textarea.value);
      }

      term.className = "text-[#34d399] min-h-[42px] whitespace-pre-wrap font-mono text-xs sm:text-sm font-semibold flex items-center leading-relaxed";
      term.textContent = captured || "(Ejecutado sin salida de texto)";
      if (statusEl) {
        statusEl.textContent = "✓ ejecutado con éxito";
        statusEl.className = "text-emerald-400 font-normal";
      }
      if (singleIndicator) singleIndicator.className = "w-2 h-2 rounded-full bg-emerald-400 animate-ping";

      playSound('correct');
      triggerConfetti();

      runBtn.textContent = "Finalizar lección ➔";
      runBtn.className = "btn-3d w-full max-w-sm bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base py-3 px-8 rounded-2xl shadow-brilliant-btn border-brand-700 transition";
      runBtn.disabled = false;
      runBtn.onclick = advanceNextStep;

    } catch (err) {
      playSound('wrong');
      term.className = "text-rose-400 min-h-[42px] whitespace-pre-wrap font-mono text-xs sm:text-sm font-semibold flex items-center leading-relaxed";
      term.textContent = "Error: " + (err.message || err);
      if (statusEl) {
        statusEl.textContent = "error en ejecución";
        statusEl.className = "text-rose-400 font-normal";
      }
      if (singleIndicator) singleIndicator.className = "w-2 h-2 rounded-full bg-rose-400";
      runBtn.disabled = false;
      runBtn.textContent = "Ejecutar código";
    }
  }, 250);
}

function simulateSandbox(code) {
  const lines = code.split('\n');
  const scope = {};
  const math = {
    pi: Math.PI,
    sqrt: Math.sqrt,
    ceil: Math.ceil,
    floor: Math.floor
  };
  let out = [];

  for (let rawLine of lines) {
    const { code: codeWithoutComment } = splitCodeAndComment(rawLine);
    let line = codeWithoutComment.trim();
    if (!line || line.startsWith('import')) continue;

    const assignMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
    if (assignMatch) {
      const v = assignMatch[1];
      const val = assignMatch[2].trim();
      scope[v] = evaluateSafeExpr(val, scope, math);
      continue;
    }

    const pMatch = line.match(/^print\s*\((.*)\)$/);
    if (pMatch) {
      out.push(evaluateSafePrint(pMatch[1], scope, math));
    }
  }

  return out.length > 0 ? out.join('\n') : "(Ejecutado sin salida de texto)";
}

// 6. Pantalla de Victoria Focalizada
function renderLessonVictory() {
  const container = document.getElementById('lesson-content-area');

  if (!completedLessons.includes(currentLesson.id)) {
    completedLessons.push(currentLesson.id);
    currentUser.xp = (currentUser.xp || 0) + 50;
    localStorage.setItem('py101_completed_lessons', JSON.stringify(completedLessons));
    if (typeof syncProgressToServer === 'function') {
      syncProgressToServer();
    }
  }
  // Al completar la lección, reiniciar el progreso de pasos a 0 para que al repasar comience de nuevo
  saveLessonStep(currentLesson.id, 0);

  // Registrar y actualizar la racha semanal (cualquier lección completada activa/continúa la racha)
  recordLessonCompletionStreak();

  triggerGrandConfetti();
  playSound('victory');

  const week = CURRICULUM.weeks.find(w => w.id === currentLesson.weekId);
  const nextLesson = week?.lessons.find(l => l.number === currentLesson.number + 1);

  // Activar modal de feedback de lección terminada
  const victoryModal = document.getElementById('victory-lesson-modal');
  const victoryTitle = document.getElementById('victory-modal-title');
  const victoryXp = document.getElementById('victory-xp-counter');
  const nextBtn = document.getElementById('victory-next-btn');

  if (victoryTitle) {
    victoryTitle.textContent = `¡${currentLesson.shortTitle || currentLesson.title} superada!`;
  }

  if (nextBtn) {
    if (nextLesson) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.innerHTML = `Siguiente: ${nextLesson.shortTitle || nextLesson.title} ➔`;
    } else {
      nextBtn.style.display = 'none';
    }
  }

  // Calcular precisión real de la lección
  const totalQuestions = Math.max(1, currentLessonStats ? currentLessonStats.questionsEvaluated.size : 1);
  let totalWrong = 0;
  if (currentLessonStats) {
    Object.values(currentLessonStats.questionsWrongAttempts).forEach(w => {
      totalWrong += w;
    });
  }
  const finalPrecision = Math.max(10, Math.round((totalQuestions / (totalQuestions + totalWrong)) * 100));

  const victoryPrecision = document.getElementById('victory-precision-counter');
  if (victoryPrecision) {
    if (finalPrecision >= 90) {
      victoryPrecision.className = "text-xl font-black text-emerald-600";
    } else if (finalPrecision >= 70) {
      victoryPrecision.className = "text-xl font-black text-amber-500";
    } else {
      victoryPrecision.className = "text-xl font-black text-rose-500";
    }

    let p = 0;
    victoryPrecision.textContent = '0%';
    const pInterval = setInterval(() => {
      p += 5;
      if (p >= finalPrecision) {
        p = finalPrecision;
        clearInterval(pInterval);
      }
      victoryPrecision.textContent = `${p}%`;
    }, 25);
  }

  if (victoryXp) {
    let xp = 0;
    victoryXp.textContent = '+0 XP';
    const xpInterval = setInterval(() => {
      xp += 5;
      if (xp >= 50) {
        xp = 50;
        clearInterval(xpInterval);
      }
      victoryXp.textContent = `+${xp} XP`;
    }, 40);
  }

  const victoryStreak = document.getElementById('victory-streak-counter');
  if (victoryStreak) {
    const effStreak = getEffectiveWeeklyStreak();
    victoryStreak.textContent = `🔥 ${effStreak} ${effStreak === 1 ? 'sem' : 'sems'}`;
  }

  if (victoryModal) {
    victoryModal.classList.remove('hidden');
  }

  // Vista de fondo del reproductor
  container.innerHTML = `
    <div class="w-full max-w-md flex flex-col items-center text-center py-6">
      
      <div class="w-20 h-20 mx-auto mb-6 bg-emerald-50 border-2 border-emerald-200 rounded-full flex items-center justify-center text-3xl font-bold text-emerald-600 shadow-sm">
        ✓
      </div>

      <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        ¡Lección superada!
      </h1>
      <p class="text-slate-500 text-sm mb-6">
        Has completado: <strong class="text-slate-800">${currentLesson.title}</strong>.
      </p>

      <div class="grid grid-cols-3 gap-3 w-full mb-8">
        <div class="bg-white border-2 border-slate-200 rounded-2xl p-3">
          <div class="text-xl font-black text-amber-500">100%</div>
          <div class="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Precisión</div>
        </div>
        <div class="bg-white border-2 border-slate-200 rounded-2xl p-3">
          <div class="text-xl font-black text-brand-600">+50 XP</div>
          <div class="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Puntos XP</div>
        </div>
        <div class="bg-white border-2 border-slate-200 rounded-2xl p-3">
          <div class="text-xl font-black text-emerald-600">✓</div>
          <div class="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Completado</div>
        </div>
      </div>

      <div class="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
        <button onclick="backToDashboard()" class="w-full sm:w-auto px-6 py-3 rounded-2xl border-2 border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-sm transition">
          Volver al mapa
        </button>
        ${nextLesson ? `
          <button onclick="startLesson('${nextLesson.id}')" class="w-full sm:w-auto btn-3d bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm px-8 py-3 rounded-2xl shadow-brilliant-btn border-brand-700">
            Siguiente lección ➔
          </button>
        ` : ''}
      </div>

    </div>
  `;
}

function dismissVictoryModal(goToNext) {
  const victoryModal = document.getElementById('victory-lesson-modal');
  if (victoryModal) {
    victoryModal.classList.add('hidden');
  }

  if (goToNext) {
    const week = CURRICULUM.weeks.find(w => w.id === currentLesson.weekId);
    const nextLesson = week?.lessons.find(l => l.number === currentLesson.number + 1);
    if (nextLesson) {
      startLesson(nextLesson.id);
      return;
    }
  }

  backToDashboard();
}

function advanceNextStep() {
  playSound('step');
  currentStepIndex++;
  if (currentLesson) {
    saveLessonStep(currentLesson.id, currentStepIndex);
  }
  renderCurrentStep();
  scrollToLessonTop('smooth');
}

async function initPyodide() {
  if (pyodideInstance || isPyodideLoading) return;
  try {
    isPyodideLoading = true;
    if (window.loadPyodide) {
      pyodideInstance = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/"
      });
    }
  } catch (e) {
    console.warn("Pyodide aviso:", e);
  } finally {
    isPyodideLoading = false;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function openLessonDirect(lessonId, stepIndex = null, selectOpt = null, autoCheck = false) {
  let found = null;
  for (const week of CURRICULUM.weeks) {
    if (week.lessons) {
      found = week.lessons.find(l => l.id === lessonId);
      if (found) break;
    }
  }
  if (!found) return;

  currentLesson = found;
  if (!currentLessonStats || currentLessonStats.lessonId !== lessonId) {
    currentLessonStats = {
      lessonId: lessonId,
      questionsEvaluated: new Set(),
      questionsWrongAttempts: {}
    };
  }
  if (stepIndex !== null && stepIndex !== undefined && !isNaN(stepIndex)) {
    currentStepIndex = stepIndex;
  } else {
    const savedStep = getSavedLessonStep(lessonId);
    currentStepIndex = (savedStep >= 0 && savedStep < found.steps.length) ? savedStep : 0;
  }
  saveLessonStep(currentLesson.id, currentStepIndex);

  switchView('lesson');
  const headerTitleEl = document.getElementById('lesson-header-title');
  if (headerTitleEl) {
    headerTitleEl.textContent = currentLesson.shortTitle || currentLesson.title;
  }
  renderCurrentStep();
  scrollToLessonTop('instant');

  if (selectOpt) {
    if (typeof selectGuidedOption === 'function' && currentLesson.steps[currentStepIndex]?.type === 'code_sandbox') {
      selectGuidedOption(selectOpt);
      if (autoCheck) {
        if (window.FAST_ANIM) {
          executeGuidedSandbox();
        } else {
          setTimeout(() => {
            executeGuidedSandbox();
          }, 80);
        }
      }
    } else {
      selectPredictPill(selectOpt);
      if (autoCheck) {
        setTimeout(() => {
          checkPredictSingleAnswer();
        }, 50);
      }
    }
  }
}

// ==================== ATAJOS DE TECLADO GLOBALES ====================
function handleGlobalKeydown(e) {
  // 1. Ignorar si el usuario está enfocado en un campo de texto o editor libre
  const active = document.activeElement;
  const tag = active ? active.tagName.toUpperCase() : '';
  if (tag === 'INPUT' || tag === 'TEXTAREA' || active?.isContentEditable) {
    return;
  }

  // 2. Control de Modales (Enter / Espacio para confirmar, Esc para cerrar)
  const startModal = document.getElementById('start-lesson-modal');
  if (startModal && !startModal.classList.contains('hidden')) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dismissStartModal();
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      closeStartModalWithoutStarting();
      return;
    }
  }

  const victoryModal = document.getElementById('victory-lesson-modal');
  if (victoryModal && !victoryModal.classList.contains('hidden')) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dismissVictoryModal(true);
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      dismissVictoryModal(false);
      return;
    }
  }

  // 3. Si no estamos en la lección activa, no capturar otras teclas
  const viewLesson = document.getElementById('view-lesson');
  if (!viewLesson || viewLesson.classList.contains('hidden') || !currentLesson) {
    return;
  }

  // Tecla Escape: volver al mapa del curso
  if (e.key === 'Escape') {
    e.preventDefault();
    backToDashboard();
    return;
  }

  const step = currentLesson.steps ? currentLesson.steps[currentStepIndex] : null;
  if (!step) return;

  // 4. Atajos 1, 2, 3, 4 para seleccionar opciones de opción múltiple
  if (['1', '2', '3', '4'].includes(e.key)) {
    const optIdx = parseInt(e.key, 10) - 1;
    if (step.type === 'predict' && step.options && step.options[optIdx]) {
      e.preventDefault();
      selectPredictPill(step.options[optIdx].id);
      return;
    }
    if (step.type === 'code_sandbox' && step.options && step.options[optIdx]) {
      e.preventDefault();
      selectGuidedOption(step.options[optIdx].id);
      return;
    }
  }

  // 5. Flechas izquierda / derecha para reproductor de código o retroceder paso
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    // Verificar si hay un codePlayer activo e interactivo (desbloqueado)
    const activePlayerId = Object.keys(codePlayerRegistry).find(pid => {
      const p = codePlayerRegistry[pid];
      return p && !p.isLocked && document.getElementById(`code-lines-${pid}`);
    });

    if (activePlayerId) {
      e.preventDefault();
      if (e.key === 'ArrowLeft') {
        codePlayerPrevStep(activePlayerId);
      } else {
        codePlayerNextStep(activePlayerId);
      }
      return;
    }

    // Si no hay reproductor interactivo, ArrowLeft permite volver al paso anterior
    if (e.key === 'ArrowLeft' && currentStepIndex > 0) {
      e.preventDefault();
      goToPrevStep();
      return;
    }
  }

  // 6. Enter o Espacio para disparar el botón de acción principal disponible
  if (e.key === 'Enter' || e.key === ' ') {
    // 6.1 Continuar en predicción aprobada
    const predictContinueBtn = document.getElementById('predict-continue-btn');
    if (predictContinueBtn && !predictContinueBtn.disabled) {
      e.preventDefault();
      predictContinueBtn.click();
      return;
    }

    // 6.2 Finalizar lección en práctica guiada
    const guidedFinishBtn = document.getElementById('guided-finish-btn');
    if (guidedFinishBtn && !guidedFinishBtn.disabled) {
      e.preventDefault();
      guidedFinishBtn.click();
      return;
    }

    // 6.3 Comprobar predicción
    const predictCheckBtn = document.getElementById('predict-check-btn');
    if (predictCheckBtn && !predictCheckBtn.disabled) {
      e.preventDefault();
      predictCheckBtn.click();
      return;
    }

    // 6.4 Ejecutar código en sandbox
    const singleRunBtn = document.getElementById('single-run-btn');
    if (singleRunBtn && !singleRunBtn.disabled) {
      e.preventDefault();
      singleRunBtn.click();
      return;
    }

    // 6.5 Continuar en explicación
    const explContinueBtn = document.getElementById('explanation-continue-btn');
    if (explContinueBtn && !explContinueBtn.disabled) {
      e.preventDefault();
      explContinueBtn.click();
      return;
    }

    // 6.6 Continuar en visualizadores
    const visualizerContinueBtn = document.getElementById('visualizer-continue-btn');
    if (visualizerContinueBtn && !visualizerContinueBtn.disabled) {
      e.preventDefault();
      visualizerContinueBtn.click();
      return;
    }
  }
}

window.addEventListener('keydown', handleGlobalKeydown);

// ==================== GESTIÓN DE VISTAS Y AUTENTICACIÓN SOULSEEK ====================

function switchView(viewName) {
  const loginView = document.getElementById('view-login');
  const dashView = document.getElementById('view-dashboard');
  const lessonView = document.getElementById('view-lesson');

  if (loginView) {
    if (viewName === 'login') {
      loginView.classList.remove('hidden');
      loginView.style.display = 'flex';
    } else {
      loginView.classList.add('hidden');
      loginView.style.display = 'none';
    }
  }

  if (dashView) {
    if (viewName === 'dashboard') {
      dashView.classList.remove('hidden');
      dashView.style.display = 'flex';
    } else {
      dashView.classList.add('hidden');
      dashView.style.display = 'none';
    }
  }

  if (lessonView) {
    if (viewName === 'lesson') {
      lessonView.classList.remove('hidden');
      lessonView.style.display = 'flex';
    } else {
      lessonView.classList.add('hidden');
      lessonView.style.display = 'none';
    }
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
}

function isUserAuthenticated() {
  return !!currentUser.token;
}

function showAuthError(message) {
  const errorBanner = document.getElementById('auth-error-banner');
  const errorText = document.getElementById('auth-error-text');
  if (errorBanner) {
    if (errorText) errorText.textContent = message;
    errorBanner.style.display = 'flex';
    errorBanner.classList.remove('hidden');
  } else {
    alert(message);
  }
}

function hideAuthError() {
  const errorBanner = document.getElementById('auth-error-banner');
  if (errorBanner) {
    errorBanner.style.display = 'none';
    errorBanner.classList.add('hidden');
  }
}

function showLoginView(errorMessage = '') {
  switchView('login');
  
  if (errorMessage) {
    showAuthError(errorMessage);
  } else {
    hideAuthError();
  }

  setTimeout(() => {
    const emailInput = document.getElementById('auth-email-input');
    if (emailInput) emailInput.focus();
  }, 100);
}

function updateUserBadge(email) {
  const badgeEmail = document.getElementById('nav-user-email');
  if (badgeEmail) {
    const displayText = (email && email.includes('@')) ? email.split('@')[0] : (email || 'Estudiante');
    badgeEmail.textContent = displayText;
    badgeEmail.title = email ? `Conectado como ${email}` : 'Estudiante UNAL';
  }
}

let isAuthSubmitting = false;

async function handleAuthLogin(event) {
  if (event) {
    if (typeof event.preventDefault === 'function') event.preventDefault();
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }

  if (isAuthSubmitting) return false;

  const emailInput = document.getElementById('auth-email-input');
  const passInput = document.getElementById('auth-password-input');
  const submitBtn = document.getElementById('auth-submit-btn');
  const btnText = document.getElementById('auth-btn-text');

  const rawEmail = emailInput ? emailInput.value.trim() : '';
  const password = passInput ? passInput.value.trim() : '';

  hideAuthError();

  // 1. Validación estricta de correo institucional
  const email = rawEmail.toLowerCase();
  if (!email) {
    showAuthError('Por favor ingresa el correo de la universidad.');
    if (emailInput) emailInput.focus();
    return false;
  }

  // Validación estricta: el usuario debe ingresar sí o sí la extensión @unal.edu.co
  if (!email.endsWith('@unal.edu.co') || email.length <= 12) {
    showAuthError('Acceso institucional: Debes ingresar tu correo oficial con extensión @unal.edu.co');
    if (emailInput) emailInput.focus();
    return false;
  }

  // 2. Validación de contraseña
  if (!password) {
    showAuthError('Por favor ingresa una contraseña.');
    if (passInput) passInput.focus();
    return false;
  }

  if (password.length < 4) {
    showAuthError('La contraseña debe contener al menos 4 caracteres.');
    if (passInput) passInput.focus();
    return false;
  }

  isAuthSubmitting = true;
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75');
    submitBtn.style.cursor = 'wait';
  }
  if (btnText) btnText.textContent = 'Verificando con pyMinas...';

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    let data = {};
    try {
      data = await res.json();
    } catch (parseErr) {
      data = { error: 'Respuesta inválida del servidor (' + res.status + ')' };
    }

    if (!res.ok) {
      showAuthError(data.error || 'Error al validar credenciales.');
      if (passInput) passInput.focus();
      return false;
    }

    // Éxito en modelo Soulseek (login o nuevo registro automático)
    currentUser.token = data.token;
    currentUser.email = data.email;
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(AUTH_EMAIL_KEY, data.email);

    if (data.progress) {
      if (Array.isArray(data.progress.completedLessons)) {
        completedLessons = data.progress.completedLessons;
        localStorage.setItem('py101_completed_lessons', JSON.stringify(completedLessons));
      }
      if (data.progress.savedLessonSteps && typeof data.progress.savedLessonSteps === 'object') {
        savedLessonSteps = data.progress.savedLessonSteps;
        localStorage.setItem('py101_lesson_steps', JSON.stringify(savedLessonSteps));
      }
      if (typeof data.progress.xp === 'number') {
        currentUser.xp = data.progress.xp;
      }
      if (typeof data.progress.weeklyStreak === 'number') {
        currentUser.weeklyStreak = data.progress.weeklyStreak;
        localStorage.setItem('pyminas_weekly_streak', String(currentUser.weeklyStreak));
      }
      if (data.progress.lastActiveWeek) {
        currentUser.lastActiveWeek = data.progress.lastActiveWeek;
        localStorage.setItem('pyminas_last_active_week', currentUser.lastActiveWeek);
      }
    }

    updateStreakDisplay();
    updateUserBadge(data.email);
    switchView('dashboard');
    renderDashboard();
    checkAutoStartTour();

  } catch (err) {
    console.error('Error al conectar con la API de autenticación:', err);
    showAuthError('No se pudo conectar con el servidor pyMinas. Verifica tu conexión.');
  } finally {
    isAuthSubmitting = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-75');
      submitBtn.style.cursor = 'pointer';
    }
    if (btnText) btnText.textContent = 'Ingresar a pyMinas';
  }
  return false;
}

async function checkAuthSessionOnStartup() {
  const loginForm = document.getElementById('auth-login-form');
  if (!loginForm) return; // Si la página no incluye el formulario de auth (ej. test suite), no bloquear

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('skipauth') === 'true') {
    if (!currentUser.email) {
      currentUser.email = localStorage.getItem(AUTH_EMAIL_KEY) || 'saacevedom@unal.edu.co';
    }
    updateUserBadge(currentUser.email);
    updateStreakDisplay();
    switchView('dashboard');
    renderDashboard();
    checkAutoStartTour();
    return;
  }
  if (urlParams.has('authtoken')) {
    localStorage.setItem(AUTH_TOKEN_KEY, urlParams.get('authtoken'));
  }

  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const email = localStorage.getItem(AUTH_EMAIL_KEY);

  if (!token) {
    showLoginView();
    return;
  }

  currentUser.token = token;
  currentUser.email = email || '';

  try {
    const res = await fetch('/api/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_EMAIL_KEY);
      currentUser.token = '';
      currentUser.email = '';
      showLoginView('Tu sesión ha expirado. Por favor ingresa nuevamente con tu clave.');
      return;
    }

    const data = await res.json();
    currentUser.email = data.email;
    if (data.progress) {
      if (Array.isArray(data.progress.completedLessons)) {
        completedLessons = data.progress.completedLessons;
        localStorage.setItem('py101_completed_lessons', JSON.stringify(completedLessons));
      }
      if (data.progress.savedLessonSteps && typeof data.progress.savedLessonSteps === 'object') {
        savedLessonSteps = data.progress.savedLessonSteps;
        localStorage.setItem('py101_lesson_steps', JSON.stringify(savedLessonSteps));
      }
      if (typeof data.progress.xp === 'number') {
        currentUser.xp = data.progress.xp;
      }
      if (typeof data.progress.weeklyStreak === 'number') {
        currentUser.weeklyStreak = data.progress.weeklyStreak;
        localStorage.setItem('pyminas_weekly_streak', String(currentUser.weeklyStreak));
      }
      if (data.progress.lastActiveWeek) {
        currentUser.lastActiveWeek = data.progress.lastActiveWeek;
        localStorage.setItem('pyminas_last_active_week', currentUser.lastActiveWeek);
      }
    }

    updateStreakDisplay();
    updateUserBadge(data.email);
    switchView('dashboard');
    renderDashboard();
    checkAutoStartTour();

  } catch (err) {
    console.warn('Modo offline / API de auth no accesible, usando estado en caché:', err);
    if (currentUser.email) {
      updateStreakDisplay();
      updateUserBadge(currentUser.email);
      switchView('dashboard');
      renderDashboard();
      checkAutoStartTour();
    } else {
      showLoginView();
    }
  }
}

let syncTimeout = null;
function syncProgressToServer() {
  if (!currentUser || !currentUser.token) return;

  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async () => {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({
          progress: {
            completedLessons,
            savedLessonSteps,
            xp: currentUser.xp || 0,
            weeklyStreak: currentUser.weeklyStreak || 0,
            lastActiveWeek: currentUser.lastActiveWeek || ''
          }
        })
      });
    } catch (e) {
      console.warn('Error sincronizando progreso con el servidor pyMinas:', e);
    }
  }, 400);
}

async function logoutUser() {
  const token = currentUser.token;
  if (token) {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) {}
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_EMAIL_KEY);
  localStorage.removeItem('pyminas_weekly_streak');
  localStorage.removeItem('pyminas_last_active_week');
  currentUser.token = '';
  currentUser.email = '';
  currentUser.weeklyStreak = 0;
  currentUser.lastActiveWeek = '';
  updateStreakDisplay();
  updateUserBadge('Estudiante UNAL');
  showLoginView('Has cerrado sesión correctamente.');
}

/* ==========================================================================
   RECORRIDO INTERACTIVO SPOTLIGHT (GUIADO POR LA MASCOTA PYMINAS)
   ========================================================================== */

const TOUR_STEPS = [
  {
    targetId: 'course-intro-card',
    title: '¡Bienvenido a pyMinas! 🐍',
    text: '¡Hola! Soy tu guía en <strong>pyMinas</strong>, la plataforma de microaprendizaje para practicar tus habilidades de Python cada semana, siguiendo los temas de <strong>Fundamentos de Programación</strong> (Facultad de Minas - UNAL).',
    padding: 10,
    borderRadius: 24,
    placement: 'right'
  },
  {
    targetId: 'game-map-container',
    mobileTargetId: 'map-node-w1-l1',
    title: 'Niveles y Retos Temáticos 🗺️',
    text: '¡Estos son los niveles con cada uno de los temas! Cada nivel tiene ejercicios interactivos muy cortos. Mientras más preguntas correctas contestes al primer intento, ¡mayor será tu puntaje y precisión!',
    padding: 12,
    borderRadius: 24,
    placement: 'left'
  },
  {
    targetId: 'nav-streak-badge',
    title: 'Tu Racha Semanal 🔥',
    text: '¡Esta es tu racha! Realiza una clase cada semana para mantenerla encendida, compite sanamente con tus compañeros y sigue practicando sin perder el ritmo.',
    padding: 6,
    borderRadius: 9999,
    placement: 'bottom',
    mobilePlacement: 'under-header'
  },
  {
    targetId: 'nav-user-profile',
    title: 'Progreso y Credenciales 🎓',
    text: 'Tus avances van ligados a tu usuario y contraseña institucional (<em>@unal.edu.co</em>). ¡No los pierdas para continuar tu progreso desde cualquier computador o celular!',
    padding: 6,
    borderRadius: 9999,
    placement: 'bottom',
    mobilePlacement: 'under-header'
  }
];

let isTourActive = false;
let tourCurrentStep = 0;

function startInteractiveTour(force = false) {
  if (!force && localStorage.getItem('pyminas_tour_completed') === 'true') {
    return;
  }
  const overlay = document.getElementById('tour-spotlight-overlay');
  if (!overlay) return;

  isTourActive = true;
  tourCurrentStep = 0;
  document.body.style.overflow = 'hidden';
  if (window.scrollX > 0) {
    window.scrollTo({ left: 0, top: 0 });
  }

  const backdropCatcher = document.getElementById('tour-backdrop-catcher');
  if (backdropCatcher) {
    backdropCatcher.onclick = () => {
      nextTourStep();
    };
  }

  overlay.classList.remove('hidden');
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.opacity = '1';
  }, 20);

  window.addEventListener('resize', handleTourReposition);
  window.addEventListener('scroll', handleTourReposition, { passive: true });
  window.addEventListener('keydown', handleTourKeydown);

  renderTourStep(0);
}

function handleTourReposition() {
  if (!isTourActive) return;
  if (window.scrollX > 0) {
    window.scrollTo({ left: 0, top: window.scrollY });
  }
  updateSpotlightPosition();
}

function handleTourKeydown(e) {
  if (!isTourActive) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    dismissTour();
  } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
    e.preventDefault();
    nextTourStep();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prevTourStep();
  }
}

function renderTourStep(idx) {
  if (idx < 0 || idx >= TOUR_STEPS.length) {
    completeTour();
    return;
  }
  tourCurrentStep = idx;
  const step = TOUR_STEPS[idx];

  const badgeEl = document.getElementById('tour-step-badge');
  if (badgeEl) badgeEl.textContent = `Paso ${idx + 1} de ${TOUR_STEPS.length}`;

  const titleEl = document.getElementById('tour-step-title');
  if (titleEl) titleEl.textContent = step.title;

  const descEl = document.getElementById('tour-step-desc');
  if (descEl) descEl.innerHTML = step.text;

  // Dots de progreso
  const dotsContainer = document.getElementById('tour-dots-indicator');
  if (dotsContainer) {
    dotsContainer.innerHTML = TOUR_STEPS.map((_, i) => `
      <button onclick="goToTourStep(${i})" class="h-2 rounded-full transition-all cursor-pointer shrink-0 ${
        i === idx ? 'bg-emerald-600 w-5 sm:w-6' : i < idx ? 'bg-emerald-300 w-2' : 'bg-slate-200 hover:bg-slate-300 w-2'
      }" title="Ir al paso ${i + 1}"></button>
    `).join('');
  }

  // Botón Siguiente / Empezar
  const nextBtn = document.getElementById('tour-next-btn');
  const prevBtn = document.getElementById('tour-prev-btn');
  if (nextBtn) {
    if (idx === TOUR_STEPS.length - 1) {
      nextBtn.innerHTML = `<span>¡Empezar! 🚀</span>`;
      nextBtn.className = "px-3.5 sm:px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center gap-1.5 cursor-pointer shrink-0";
    } else {
      nextBtn.innerHTML = `<span>Siguiente</span><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>`;
      nextBtn.className = "px-3 sm:px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5 cursor-pointer shrink-0";
    }
  }

  if (prevBtn) {
    if (idx > 0) {
      prevBtn.classList.remove('hidden');
    } else {
      prevBtn.classList.add('hidden');
    }
  }

  const isMobile = window.innerWidth < 640;
  const targetId = (isMobile && step.mobileTargetId) ? step.mobileTargetId : step.targetId;
  const target = document.getElementById(targetId) || document.getElementById(step.targetId);

  if (target) {
    if (idx === 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setTimeout(updateSpotlightPosition, 260);
    } else if (idx === 1) {
      if (isMobile) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
      setTimeout(updateSpotlightPosition, 260);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setTimeout(updateSpotlightPosition, 260);
    }
  } else {
    updateSpotlightPosition();
  }

  playSound('step');
}

function nextTourStep() {
  if (!isTourActive) return;
  if (tourCurrentStep >= TOUR_STEPS.length - 1) {
    completeTour();
  } else {
    renderTourStep(tourCurrentStep + 1);
  }
}

function prevTourStep() {
  if (!isTourActive || tourCurrentStep <= 0) return;
  renderTourStep(tourCurrentStep - 1);
}

function goToTourStep(idx) {
  if (!isTourActive || idx < 0 || idx >= TOUR_STEPS.length) return;
  renderTourStep(idx);
}

function completeTour() {
  localStorage.setItem('pyminas_tour_completed', 'true');
  playSound('complete');
  triggerConfetti();
  dismissTourUI();
}

function dismissTour() {
  localStorage.setItem('pyminas_tour_completed', 'true');
  playSound('select');
  dismissTourUI();
}

function dismissTourUI() {
  isTourActive = false;
  document.body.style.overflow = '';
  if (window.scrollX > 0) {
    window.scrollTo({ left: 0, top: window.scrollY });
  }
  window.removeEventListener('resize', handleTourReposition);
  window.removeEventListener('scroll', handleTourReposition);
  window.removeEventListener('keydown', handleTourKeydown);

  const overlay = document.getElementById('tour-spotlight-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 280);
  }
}

function updateSpotlightPosition() {
  if (!isTourActive) return;
  const spotlightBox = document.getElementById('tour-spotlight-box');
  const dialog = document.getElementById('tour-mascot-dialog');
  if (!spotlightBox || !dialog || tourCurrentStep < 0 || tourCurrentStep >= TOUR_STEPS.length) return;

  const step = TOUR_STEPS[tourCurrentStep];
  const isMobile = window.innerWidth < 640;
  const targetId = (isMobile && step.mobileTargetId) ? step.mobileTargetId : step.targetId;
  const target = document.getElementById(targetId) || document.getElementById(step.targetId);
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const pad = step.padding !== undefined ? step.padding : 10;

  // Coordenadas fijas en viewport
  const boxTop = Math.max(4, rect.top - pad);
  const boxLeft = Math.max(4, rect.left - pad);
  const boxWidth = Math.min(window.innerWidth - boxLeft - 4, rect.width + pad * 2);
  const boxHeight = Math.min(window.innerHeight - boxTop - 4, rect.height + pad * 2);

  spotlightBox.style.top = `${boxTop}px`;
  spotlightBox.style.left = `${boxLeft}px`;
  spotlightBox.style.width = `${boxWidth}px`;
  spotlightBox.style.height = `${boxHeight}px`;
  spotlightBox.style.borderRadius = `${step.borderRadius || 20}px`;

  // Ubicación del diálogo flotante
  if (isMobile) {
    dialog.style.left = '12px';
    dialog.style.right = '12px';
    dialog.style.width = 'auto';
    dialog.style.maxWidth = '440px';
    dialog.style.margin = '0 auto';
    dialog.style.transform = 'none';

    if (step.mobilePlacement === 'under-header' || rect.top <= 64) {
      // Elemento en la barra superior -> anclar justo debajo del navbar
      dialog.style.top = '68px';
      dialog.style.bottom = 'auto';
    } else if (rect.top > window.innerHeight * 0.48) {
      // Objetivo en mitad inferior -> anclar arriba
      dialog.style.top = '68px';
      dialog.style.bottom = 'auto';
    } else {
      // Objetivo en mitad superior -> anclar abajo
      dialog.style.top = 'auto';
      dialog.style.bottom = '16px';
    }
  } else {
    dialog.style.width = '420px';
    dialog.style.maxWidth = '440px';
    dialog.style.margin = '0';
    dialog.style.transform = 'none';
    const dialogHeight = dialog.offsetHeight || 200;
    const dialogWidth = 420;

    let placed = false;

    if (step.placement === 'bottom' || (!step.placement && rect.bottom + dialogHeight + 24 <= window.innerHeight)) {
      if (rect.bottom + dialogHeight + 24 <= window.innerHeight) {
        dialog.style.top = `${rect.bottom + 14}px`;
        dialog.style.bottom = 'auto';
        let left = rect.left + (rect.width / 2) - (dialogWidth / 2);
        left = Math.max(16, Math.min(window.innerWidth - dialogWidth - 16, left));
        dialog.style.left = `${left}px`;
        dialog.style.right = 'auto';
        placed = true;
      }
    }

    if (!placed && (step.placement === 'top' || rect.top - dialogHeight - 24 >= 0)) {
      if (rect.top - dialogHeight - 24 >= 0) {
        dialog.style.top = `${rect.top - dialogHeight - 14}px`;
        dialog.style.bottom = 'auto';
        let left = rect.left + (rect.width / 2) - (dialogWidth / 2);
        left = Math.max(16, Math.min(window.innerWidth - dialogWidth - 16, left));
        dialog.style.left = `${left}px`;
        dialog.style.right = 'auto';
        placed = true;
      }
    }

    if (!placed && step.placement === 'right') {
      if (rect.right + dialogWidth + 24 <= window.innerWidth) {
        dialog.style.left = `${rect.right + 16}px`;
        dialog.style.right = 'auto';
        dialog.style.top = `${Math.max(16, Math.min(window.innerHeight - dialogHeight - 16, rect.top))}px`;
        dialog.style.bottom = 'auto';
        placed = true;
      }
    }

    if (!placed && step.placement === 'left') {
      if (rect.left >= dialogWidth + 20) {
        dialog.style.left = `${rect.left - dialogWidth - 20}px`;
        dialog.style.right = 'auto';
        dialog.style.top = `${Math.max(76, Math.min(window.innerHeight - dialogHeight - 16, rect.top + 20))}px`;
        dialog.style.bottom = 'auto';
        placed = true;
      }
    }

    if (!placed) {
      dialog.style.top = 'auto';
      dialog.style.bottom = '20px';
      dialog.style.left = '50%';
      dialog.style.right = 'auto';
      dialog.style.transform = 'translateX(-50%)';
    }
  }
}

function checkAutoStartTour() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('modal') || urlParams.get('victory') || urlParams.get('lesson')) {
    return;
  }
  const force = urlParams.get('tour') === 'true';
  const completed = localStorage.getItem('pyminas_tour_completed');
  if (force || completed !== 'true') {
    setTimeout(() => {
      startInteractiveTour(force);
    }, 450);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  updateStreakDisplay();
  renderDashboard();
  setTimeout(initPyodide, 800);
  checkAuthSessionOnStartup();

  const loginForm = document.getElementById('auth-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleAuthLogin(e);
    });
  }
  const loginSubmitBtn = document.getElementById('auth-submit-btn');
  if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleAuthLogin(e);
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('fast') === 'true') {
    window.FAST_ANIM = true;
  }
  const directModal = urlParams.get('modal');
  if (directModal) {
    startLesson(directModal);
  }
  const directVictory = urlParams.get('victory');
  if (directVictory) {
    const found = CURRICULUM.weeks.flatMap(w => w.lessons || []).find(l => l.id === directVictory);
    if (found) {
      currentLesson = found;
      currentLessonStats = {
        lessonId: directVictory,
        questionsEvaluated: new Set(['step_1', 'step_2', 'step_3']),
        questionsWrongAttempts: {}
      };
      if (urlParams.has('wrong')) {
        currentLessonStats.questionsWrongAttempts['step_1'] = parseInt(urlParams.get('wrong'), 10);
      }
      renderLessonVictory();
    }
  }
  const directLesson = urlParams.get('lesson');
  if (directLesson) {
    const directStep = urlParams.has('step') ? parseInt(urlParams.get('step'), 10) : null;
    const directSelect = urlParams.get('select');
    const autoCheck = urlParams.get('check') === 'true';
    openLessonDirect(directLesson, directStep, directSelect, autoCheck);
    if (urlParams.get('runplayer') === 'true') {
      Object.keys(codePlayerRegistry).forEach(pid => {
        const p = codePlayerRegistry[pid];
        if (p && p.lines) {
          codePlayerSetLine(pid, p.lines.length - 1);
        }
      });
    }
    if (urlParams.get('step0') === 'true') {
      Object.keys(codePlayerRegistry).forEach(pid => {
        codePlayerSetLine(pid, 0);
      });
    }
    if (urlParams.has('inputval')) {
      const ival = urlParams.get('inputval');
      Object.keys(codePlayerRegistry).forEach(pid => {
        const p = codePlayerRegistry[pid];
        if (p) {
          if (!p.userInputs) p.userInputs = {};
          p.userInputs[0] = ival;
          const newTrace = tracePythonExecution(p.code, p.expectedOutput, p.userInputs);
          p.lineTrace = newTrace.lineTrace;
          codePlayerSetLine(pid, p.lines.length - 1);
        }
      });
    }
    if (urlParams.get('runsandbox') === 'true') {
      selectGuidedOption('B');
      setTimeout(() => {
        executeGuidedSandbox();
      }, 60);
    }
  }
  if (urlParams.get('tour') === 'true') {
    const stepParam = urlParams.get('tour_step');
    const stepIdx = stepParam !== null ? parseInt(stepParam, 10) : 0;
    setTimeout(() => {
      startInteractiveTour(true);
      if (stepIdx > 0 && stepIdx < TOUR_STEPS.length) {
        goToTourStep(stepIdx);
      }
    }, 450);
  }
});

