/* ═══════════════════════════════════════════════════════════════
   Fortinet Certification Exam Simulator — Engine
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const AUTOSAVE_INTERVAL_MS = 10000;
  const DEFAULT_EXAM_KEY     = 'fos';
  const LETTERS              = 'ABCDEFGH'.split('');

  const state = {
    examKey: DEFAULT_EXAM_KEY,
    exam: {
      questions: [],
      answers:   {},
      flags:     {},
      index:     0,
      remaining: 0,
      timerId:   null,
      startedAt: 0,
      submitted: false,
      config:    null
    },
    reviewFilter: 'all',
    lastAutosaveAt: 0
  };

  /* ── Helpers ───────────────────────────────────────────────── */
  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls)  n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const escapeHtml = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function formatHMS(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${sec}`;
  }
  function formatMMSS(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  }
  function relativeTime(ts) {
    if (!ts) return '';
    const mins = Math.round((Date.now() - ts) / 60000);
    if (mins < 1)  return 'just now';
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.round(mins / 60);
    if (hrs < 24)  return `${hrs} hr ago`;
    return `${Math.round(hrs / 24)} day(s) ago`;
  }

  function showScreen(id) {
    $$('.screen').forEach(s => s.classList.remove('active'));
    $('#' + id).classList.add('active');
    window.scrollTo(0, 0);
  }

  function currentExamConfig() {
    return window.ExamRegistry.get(state.examKey);
  }
  function examSnapshot() {
    return state.exam.config || currentExamConfig();
  }
  function getBank(exam) {
    return Array.isArray(exam && exam.bank) ? exam.bank : [];
  }

  /* ── Persistence ───────────────────────────────────────────── */
  function buildSnapshot() {
    const ex = state.exam;
    if (ex.submitted || !ex.questions.length || !ex.config) return null;
    return {
      examKey:   state.examKey,
      config:    ex.config,
      questions: ex.questions,
      answers:   ex.answers,
      flags:     ex.flags,
      index:     ex.index,
      remaining: ex.remaining,
      startedAt: ex.startedAt
    };
  }
  function autosave(force) {
    if (!window.ExamStorage || !window.ExamStorage.isAvailable()) return;
    if (state.exam.submitted) return;
    const now = Date.now();
    if (!force && (now - state.lastAutosaveAt) < AUTOSAVE_INTERVAL_MS) return;
    const snap = buildSnapshot();
    if (!snap) return;
    window.ExamStorage.saveInProgress(snap);
    state.lastAutosaveAt = now;
  }
  function clearCacheForExam() {
    if (window.ExamStorage) window.ExamStorage.clearInProgress();
    state.lastAutosaveAt = 0;
  }

  /* ── Exam picker ───────────────────────────────────────────── */
  function populateExamPicker() {
    const grid = $('#examGrid');
    if (!grid) return;
    grid.innerHTML = '';

    window.ExamRegistry.list().forEach(exam => {
      const bank  = getBank(exam);
      const ready = window.ExamRegistry.isReady(exam);

      const card = el('button', 'exam-card');
      card.type = 'button';
      card.dataset.key = exam.key;
      card.setAttribute('role', 'listitem');

      if (!ready) card.classList.add('offline');
      if (exam.key === state.examKey && ready) card.classList.add('selected');

      const delivered = Math.min(exam.totalQuestions, bank.length || exam.totalQuestions);
      const duration  = formatHMS(exam.durationSeconds).substring(0, 5);

      card.innerHTML = `
        <span class="exam-card-badge ${ready ? 'ready' : 'coming'}">
          ${ready ? 'Ready' : 'Coming Soon'}
        </span>
        <div class="exam-card-icon">${exam.icon || '🎓'}</div>
        <div class="exam-card-name">${escapeHtml(exam.name)}</div>
        <div class="exam-card-version">${escapeHtml(exam.version || exam.short)}</div>
        <div class="exam-card-desc">${escapeHtml(exam.blurb || '')}</div>
        <div class="exam-card-stats">
          <div class="exam-card-stat"><b>${delivered}</b><span>Questions</span></div>
          <div class="exam-card-stat"><b>${duration}</b><span>Duration</span></div>
          <div class="exam-card-stat"><b>${exam.passPercent}%</b><span>Pass</span></div>
        </div>`;

      if (ready) {
        card.addEventListener('click', () => {
          state.examKey = exam.key;
          $$('.exam-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          refreshExamMeta();
          if (window.ExamStorage) window.ExamStorage.savePrefs({ examKey: exam.key });
        });
      }

      grid.appendChild(card);
    });

    const current = window.ExamRegistry.get(state.examKey);
    if (!window.ExamRegistry.isReady(current)) {
      const firstReady = window.ExamRegistry.list().find(window.ExamRegistry.isReady);
      if (firstReady) state.examKey = firstReady.key;
    }
    refreshExamMeta();
  }

  function refreshExamMeta() {
    const exam = currentExamConfig();
    const bank = getBank(exam);
    const btn  = $('#btnStartExam');
    const info = $('#poolInfo');
    const body = $('#poolSummary');

    if (!exam || !bank.length) {
      if (info) info.hidden = true;
      if (btn) { btn.disabled = true; btn.textContent = 'Unavailable'; }
      return;
    }

    const cats = {};
    bank.forEach(q => { cats[q.category] = (cats[q.category] || 0) + 1; });
    const domainList = exam.domainOrder
      .filter(c => cats[c])
      .map(c => `${cats[c]} × ${c.split(' ')[0]}`)
      .join(' · ');

    const delivered = Math.min(exam.totalQuestions, bank.length);
    body.innerHTML =
      `<b>${escapeHtml(exam.name)}</b> — ${bank.length} questions in bank · ` +
      `${escapeHtml(domainList)}. <b>${delivered}</b> will be delivered in ` +
      `<b>${formatHMS(exam.durationSeconds).substring(0, 5)}</b> · ` +
      `pass mark <b>${exam.passPercent}%</b>.`;

    info.hidden = false;
    if (btn) {
      btn.disabled = false;
      btn.textContent = `Begin ${exam.short} Exam`;
    }
  }

  /* ── Last attempt ──────────────────────────────────────────── */
  function renderLastAttempt() {
    const node = $('#lastAttempt');
    if (!node) return;

    if (!window.ExamStorage || !window.ExamStorage.isAvailable()) {
      node.hidden = true;
      return;
    }
    const result = window.ExamStorage.loadResult();
    if (!result) { node.hidden = true; return; }

    const body = $('#lastAttemptBody');
    const cls  = result.passed ? 'la-pass' : 'la-fail';
    const word = result.passed ? 'Passed' : 'Failed';

    body.innerHTML =
      `<b>${escapeHtml(result.examShort || result.examName || '')}</b> · ` +
      `<span class="${cls}">${word}</span> ` +
      `<b>${result.score}%</b> (${result.correct}/${result.total}) · ` +
      `${relativeTime(result.finishedAt)}`;

    node.hidden = false;
  }

  /* ── Resume modal ──────────────────────────────────────────── */
  function offerResume(snapshot) {
    const cfg      = snapshot.config || {};
    const examName = cfg.name || 'Exam';
    const answered = Object.values(snapshot.answers || {})
      .filter(a => Array.isArray(a) && a.length).length;
    const total    = snapshot.questions.length;

    const modal = el('div', 'modal-backdrop');
    modal.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <h3>Resume Previous Attempt?</h3>
        <p>You have an unfinished <b>${escapeHtml(examName)}</b> exam saved on this browser.</p>
        <div class="resume-meta">
          <div><b>${answered}/${total}</b><span>Answered</span></div>
          <div><b>${formatHMS(snapshot.remaining || 0).substring(0, 5)}</b><span>Remaining</span></div>
          <div><b>${relativeTime(snapshot.savedAt)}</b><span>Saved</span></div>
        </div>
        <p class="resume-note">Your timer was paused when you left. Resuming continues from the exact second you stopped.</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" data-act="discard">Discard &amp; Start Fresh</button>
          <button class="btn btn-primary"   data-act="resume">Resume Exam</button>
        </div>
      </div>`;

    modal.addEventListener('click', e => {
      if (e.target === modal) return;
      const act = e.target.dataset.act;
      if (act === 'discard') {
        clearCacheForExam();
        modal.remove();
      } else if (act === 'resume') {
        modal.remove();
        restoreFromSnapshot(snapshot);
      }
    });
    document.body.appendChild(modal);
  }

  function restoreFromSnapshot(snap) {
    const exam = window.ExamRegistry.get(snap.examKey);
    if (!exam || !snap.questions || !snap.questions.length || !snap.config) {
      clearCacheForExam();
      return;
    }

    state.examKey = snap.examKey;
    state.exam.questions = snap.questions;
    state.exam.answers   = snap.answers   || {};
    state.exam.flags     = snap.flags     || {};
    state.exam.index     = Math.max(0, Math.min(snap.index || 0, snap.questions.length - 1));
    state.exam.remaining = Math.max(1, snap.remaining || snap.config.durationSeconds);
    state.exam.startedAt = snap.startedAt || Date.now();
    state.exam.submitted = false;
    state.exam.config    = snap.config;
    state.lastAutosaveAt = Date.now();

    $('#totalQNum').textContent    = snap.questions.length;
    $('#examTitleBar').textContent = snap.config.name;

    renderQuestion();
    showScreen('screen-exam');
    startTimer();
  }

  /* ── Question selection ────────────────────────────────────── */
  function buildExam(exam) {
    const bank = getBank(exam);
    if (!bank.length) return null;

    const byCat = {};
    exam.domainOrder.forEach(c => (byCat[c] = []));
    bank.forEach(q => {
      if (!byCat[q.category]) byCat[q.category] = [];
      byCat[q.category].push(q);
    });

    const presentCats = exam.domainOrder.filter(c => byCat[c] && byCat[c].length);
    const presentPool = presentCats.reduce((n, c) => n + byCat[c].length, 0);
    const target      = Math.min(exam.totalQuestions, bank.length);

    const quotas = {};
    let allocated = 0;
    presentCats.forEach(cat => {
      const share = (byCat[cat].length / presentPool) * target;
      quotas[cat] = Math.floor(share);
      allocated  += quotas[cat];
    });

    let leftover = target - allocated;
    const fractions = presentCats
      .map(cat => ({
        cat,
        frac: (byCat[cat].length / presentPool) * target - quotas[cat],
        available: byCat[cat].length - quotas[cat]
      }))
      .sort((a, b) => b.frac - a.frac || b.available - a.available);

    let guard = 0;
    while (leftover > 0 && guard++ < 1000) {
      let advanced = false;
      for (const f of fractions) {
        if (leftover <= 0) break;
        if (f.available > 0) { quotas[f.cat]++; f.available--; leftover--; advanced = true; }
      }
      if (!advanced) break;
    }

    const selected = [];
    presentCats.forEach(cat => {
      selected.push(...shuffle(byCat[cat]).slice(0, quotas[cat]));
    });

    if (selected.length < target) {
      const chosenIds = new Set(selected.map(q => q.id));
      for (const q of shuffle(bank)) {
        if (selected.length >= target) break;
        if (!chosenIds.has(q.id)) selected.push(q);
      }
    }

    return shuffle(selected).map(prepareQuestion);
  }

  function prepareQuestion(q) {
    const indexed = q.choices.map((text, i) => ({
      text,
      isCorrect: q.correct.includes(i)
    }));
    const shuffled = shuffle(indexed);
    return {
      id:          q.id,
      category:    q.category,
      type:        q.type,
      text:        q.text,
      image:       q.image || null,
      explanation: q.explanation,
      choices:     shuffled.map(c => c.text),
      correct:     shuffled.map((c, i) => c.isCorrect ? i : -1).filter(i => i >= 0)
    };
  }

  /* ── Timer ─────────────────────────────────────────────────── */
  function startTimer() {
    const display = $('#timerDisplay');
    const value   = $('#timerValue');

    const tick = () => {
      state.exam.remaining--;
      if (state.exam.remaining <= 0) {
        state.exam.remaining = 0;
        value.textContent = formatHMS(0);
        stopTimer();
        submitExam(true);
        return;
      }
      value.textContent = formatHMS(state.exam.remaining);
      display.classList.remove('warning', 'critical');
      if (state.exam.remaining <= 60)        display.classList.add('critical');
      else if (state.exam.remaining <= 600)  display.classList.add('warning');
      autosave(false);
    };

    value.textContent = formatHMS(state.exam.remaining);
    display.classList.remove('warning', 'critical');
    state.exam.timerId = setInterval(tick, 1000);
  }
  function stopTimer() {
    if (state.exam.timerId) clearInterval(state.exam.timerId);
    state.exam.timerId = null;
  }

  /* ── Render question ───────────────────────────────────────── */
  function renderQuestion() {
    const ex = state.exam;
    const q  = ex.questions[ex.index];
    if (!q) return;

    $('#currentQNum').textContent = ex.index + 1;
    $('#totalQNum').textContent   = ex.questions.length;
    $('#qId').textContent         = `Question ${ex.index + 1} of ${ex.questions.length}`;
    $('#qCategory').textContent   = q.category;
    $('#qType').textContent       = q.type === 'multiple' ? 'Multiple Answers' : 'Single Answer';
    $('#qText').textContent       = q.text;

    const fig = $('#qFigure');
    const img = $('#qImage');
    if (q.image) {
      const dir = examSnapshot().imageDir;
      img.onerror = () => { fig.hidden = true; };
      img.src = `${dir}/${q.image}.png`;
      img.alt = `Exhibit for question ${ex.index + 1}`;
      fig.hidden = false;
    } else {
      fig.hidden = true;
      img.onerror = null;
      img.removeAttribute('src');
    }

    renderChoices(q);

    $('#chkFlag').checked = !!ex.flags[q.id];
    $('#btnPrev').disabled = ex.index === 0;
    $('#btnNext').disabled = ex.index === ex.questions.length - 1;
    $('#btnNext').textContent = ex.index === ex.questions.length - 1 ? 'Last Question' : 'Next ›';

    renderPalette();
    updateStats();
    autosave(true);
  }

  /* ── Render choices ────────────────────────────────────────── */
  function renderChoices(q) {
    const list = $('#choiceList');
    list.innerHTML = '';

    const selected   = state.exam.answers[q.id] || [];
    const isMultiple = q.type === 'multiple';
    const role       = isMultiple ? 'checkbox' : 'radio';

    q.choices.forEach((choiceText, i) => {
      const isOn = selected.includes(i);

      const wrap = el('div', 'choice ' + role);
      if (isOn) wrap.classList.add('selected');

      wrap.setAttribute('role', role);
      wrap.setAttribute('aria-checked', isOn ? 'true' : 'false');
      wrap.setAttribute('tabindex', '0');
      wrap.dataset.index = i;

      wrap.appendChild(el('span', 'marker'));
      wrap.appendChild(el('span', 'letter', LETTERS[i] + '.'));
      wrap.appendChild(el('span', 'label', escapeHtml(choiceText)));

      const activate = () => toggleChoice(q, i, isMultiple);

      wrap.addEventListener('click', activate);
      wrap.addEventListener('keydown', e => {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
          e.preventDefault();
          activate();
        }
      });

      list.appendChild(wrap);
    });
  }

  function toggleChoice(q, index, isMultiple) {
    const cur = state.exam.answers[q.id] ? state.exam.answers[q.id].slice() : [];

    if (isMultiple) {
      const pos = cur.indexOf(index);
      if (pos >= 0) cur.splice(pos, 1);
      else          cur.push(index);
    } else {
      cur.length = 0;
      cur.push(index);
    }
    cur.sort((a, b) => a - b);
    state.exam.answers[q.id] = cur;

    $$('#choiceList .choice').forEach((node, i) => {
      const on = cur.includes(i);
      node.classList.toggle('selected', on);
      node.setAttribute('aria-checked', on ? 'true' : 'false');
    });

    renderPalette();
    updateStats();
    autosave(true);
  }

  /* ── Palette & stats ───────────────────────────────────────── */
  function renderPalette() {
    const ex  = state.exam;
    const pal = $('#palette');
    if (!pal) return;
    pal.innerHTML = '';

    ex.questions.forEach((q, i) => {
      const btn = el('button', 'pal-btn', String(i + 1));
      btn.type = 'button';
      if (ex.answers[q.id] && ex.answers[q.id].length) btn.classList.add('answered');
      if (ex.flags[q.id])  btn.classList.add('flagged');
      if (i === ex.index)  btn.classList.add('current');
      btn.setAttribute('aria-label', `Go to question ${i + 1}`);
      btn.addEventListener('click', () => {
        ex.index = i;
        renderQuestion();
      });
      pal.appendChild(btn);
    });

    /* Scroll the current question into view */
    requestAnimationFrame(() => {
      const cur = pal.querySelector('.pal-btn.current');
      if (cur) cur.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  }

  function updateStats() {
    const ex = state.exam;
    let answered = 0, flagged = 0;
    ex.questions.forEach(q => {
      if (ex.answers[q.id] && ex.answers[q.id].length) answered++;
      if (ex.flags[q.id]) flagged++;
    });
    const a = $('#statAnswered');
    const f = $('#statFlagged');
    const r = $('#statRemaining');
    if (a) a.textContent = answered;
    if (f) f.textContent = flagged;
    if (r) r.textContent = ex.questions.length - answered;
  }

  /* ── Quick-action jumps ───────────────────────────────────── */
  function jumpToNext(predicate, emptyMsg) {
    const ex = state.exam;
    const n  = ex.questions.length;
    const start = (ex.index + 1) % n;

    for (let k = 0; k < n; k++) {
      const idx = (start + k) % n;
      const q   = ex.questions[idx];
      if (predicate(q)) {
        ex.index = idx;
        renderQuestion();
        return true;
      }
    }
    flashNavMessage(emptyMsg);
    return false;
  }

  function goToNextUnanswered() {
    jumpToNext(
      q => {
        const a = state.exam.answers[q.id];
        return !a || !a.length;
      },
      'All questions are answered.'
    );
  }

  function goToNextFlagged() {
    jumpToNext(
      q => !!state.exam.flags[q.id],
      'No flagged questions.'
    );
  }

  let flashTimerId = null;
  function flashNavMessage(msg) {
    let box = $('#navFlash');
    if (!box) {
      box = el('div');
      box.id = 'navFlash';
      box.style.cssText =
        'font-size:11.5px;color:#7A5A10;background:#FFF4E0;' +
        'border-left:3px solid #F5A623;border-radius:4px;' +
        'padding:6px 10px;margin-top:6px;text-align:center;';
      const foot = $('.nav-panel-foot');
      if (foot) foot.appendChild(box);
    }
    box.textContent = msg;
    box.style.display = 'block';
    if (flashTimerId) clearTimeout(flashTimerId);
    flashTimerId = setTimeout(() => {
      if (box) box.style.display = 'none';
    }, 2200);
  }

  /* ── Submit ────────────────────────────────────────────────── */
  function confirmSubmit() {
    const ex = state.exam;
    let answered = 0, flagged = 0;
    ex.questions.forEach(q => {
      if (ex.answers[q.id] && ex.answers[q.id].length) answered++;
      if (ex.flags[q.id]) flagged++;
    });
    const unanswered = ex.questions.length - answered;

    const modal = el('div', 'modal-backdrop');
    modal.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <h3>Submit Examination?</h3>
        <p>Once submitted you will not be able to change your answers. Review your progress below.</p>
        <div class="modal-stats">
          <div class="modal-stat"><b>${answered}</b><span>Answered</span></div>
          <div class="modal-stat"><b>${unanswered}</b><span>Unanswered</span></div>
          <div class="modal-stat"><b>${flagged}</b><span>Flagged</span></div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary" data-act="cancel">Keep Working</button>
          <button class="btn btn-primary"   data-act="confirm">Submit Exam</button>
        </div>
      </div>`;

    modal.addEventListener('click', e => {
      if (e.target === modal || e.target.dataset.act === 'cancel') modal.remove();
      else if (e.target.dataset.act === 'confirm') {
        modal.remove();
        submitExam(false);
      }
    });
    document.body.appendChild(modal);
  }

  function submitExam(auto) {
    const ex = state.exam;
    if (ex.submitted) return;
    ex.submitted = true;
    stopTimer();

    const used = ex.config.durationSeconds - ex.remaining;
    renderScore(used);

    if (window.ExamStorage && window.ExamStorage.isAvailable()) {
      const total = ex.questions.length;
      let correct = 0;
      ex.questions.forEach(q => { if (gradeQuestion(q) === 'correct') correct++; });
      const pct = total ? Math.round((correct / total) * 100) : 0;
      window.ExamStorage.saveResult({
        examKey:    state.examKey,
        examName:   ex.config.name,
        examShort:  ex.config.short,
        score:      pct,
        correct,
        total,
        passed:     pct >= ex.config.passPercent,
        finishedAt: Date.now(),
        autoSubmitted: !!auto
      });
      window.ExamStorage.clearInProgress();
      renderLastAttempt();
    }

    showScreen('screen-score');
  }

  /* ── Scoring ───────────────────────────────────────────────── */
  function gradeQuestion(q) {
    const userAns    = (state.exam.answers[q.id] || []).slice().sort((a, b) => a - b);
    const correctAns = q.correct.slice().sort((a, b) => a - b);
    if (userAns.length === 0) return 'blank';
    if (userAns.length !== correctAns.length) return 'incorrect';
    return userAns.every((v, i) => v === correctAns[i]) ? 'correct' : 'incorrect';
  }

  function renderScore(secondsUsed) {
    const ex    = state.exam;
    const cfg   = examSnapshot();
    const total = ex.questions.length;

    let correct = 0, incorrect = 0, blank = 0;
    const perDomain = {};
    cfg.domainOrder.forEach(d => perDomain[d] = { total: 0, correct: 0, incorrect: 0, blank: 0 });

    ex.questions.forEach(q => {
      if (!perDomain[q.category]) {
        perDomain[q.category] = { total: 0, correct: 0, incorrect: 0, blank: 0 };
      }
      const v = gradeQuestion(q);
      perDomain[q.category].total++;
      if (v === 'correct')        { correct++;   perDomain[q.category].correct++; }
      else if (v === 'incorrect') { incorrect++; perDomain[q.category].incorrect++; }
      else                        { blank++;     perDomain[q.category].blank++; }
    });

    const pct    = total ? Math.round((correct / total) * 100) : 0;
    const passed = pct >= cfg.passPercent;

    const badge = $('#resultBadge');
    badge.textContent = passed ? 'PASS' : 'FAIL';
    badge.className   = 'result-badge ' + (passed ? 'pass' : 'fail');

    $('#scoreHeadline').textContent = passed ? 'Examination Passed' : 'Examination Not Passed';
    $('#scoreSubline').textContent  =
      `${cfg.name} · ${total} questions · Pass mark ${cfg.passPercent}% · Time used ${formatMMSS(secondsUsed)}`;
    $('#bigScore').textContent      = pct + '%';
    $('#passMarkLabel').textContent = cfg.passPercent + '%';

    $('#kpiCorrect').textContent    = correct;
    $('#kpiIncorrect').textContent  = incorrect;
    $('#kpiUnanswered').textContent = blank;
    $('#kpiTime').textContent       = formatMMSS(secondsUsed);

    const list = $('#domainList');
    list.innerHTML = '';
    cfg.domainOrder.forEach(cat => {
      const d = perDomain[cat];
      if (!d || !d.total) return;
      const cp = (d.correct   / d.total) * 100;
      const ip = (d.incorrect / d.total) * 100;
      const bp = (d.blank     / d.total) * 100;
      const pctCat = Math.round(cp);

      const row = el('div', 'domain-row');
      row.innerHTML = `
        <div class="domain-head">
          <span class="domain-name">${escapeHtml(cat)}</span>
          <span class="domain-score"><strong>${pctCat}%</strong> · ${d.correct}/${d.total} correct</span>
        </div>
        <div class="domain-bar">
          <div class="seg seg-correct"   style="width:${cp}%"></div>
          <div class="seg seg-incorrect" style="width:${ip}%"></div>
          <div class="seg seg-blank"     style="width:${bp}%"></div>
        </div>
        <div class="domain-foot">
          <i class="foot-correct">${d.correct} correct</i>
          <i class="foot-incorrect">${d.incorrect} incorrect</i>
          <i class="foot-blank">${d.blank} blank</i>
        </div>`;
      list.appendChild(row);
    });

    const map = $('#outcomeMap');
    map.innerHTML = '';
    ex.questions.forEach((q, i) => {
      const v = gradeQuestion(q);
      const node = el('div', 'oc oc-' + v, String(i + 1));
      const userStr = (state.exam.answers[q.id] || []).map(x => LETTERS[x]).join(', ') || '—';
      const corrStr = q.correct.map(x => LETTERS[x]).join(', ');
      node.title = `Q${i + 1} · ${v.toUpperCase()}\nYour answer: ${userStr}\nCorrect: ${corrStr}`;
      map.appendChild(node);
    });
  }

  /* ── Review ────────────────────────────────────────────────── */
  function renderReview() {
    const ex  = state.exam;
    const cfg = examSnapshot();
    const list    = $('#reviewList');
    const summary = $('#reviewSummary');
    list.innerHTML = '';

    let correct = 0, incorrect = 0, blank = 0, flagged = 0;
    ex.questions.forEach(q => {
      const v = gradeQuestion(q);
      if (v === 'correct') correct++;
      else if (v === 'incorrect') incorrect++;
      else blank++;
      if (ex.flags[q.id]) flagged++;
    });

    summary.innerHTML = `
      <span>Exam<strong>${escapeHtml(cfg.short)}</strong></span>
      <span>Total<strong>${ex.questions.length}</strong></span>
      <span>Correct<strong>${correct}</strong></span>
      <span>Incorrect<strong>${incorrect}</strong></span>
      <span>Blank<strong>${blank}</strong></span>
      <span>Flagged<strong>${flagged}</strong></span>`;

    const filter = state.reviewFilter;
    let rendered = 0;

    ex.questions.forEach((q, i) => {
      const v = gradeQuestion(q);
      if (filter === 'incorrect' && v !== 'incorrect') return;
      if (filter === 'correct'   && v !== 'correct')   return;
      if (filter === 'flagged'   && !ex.flags[q.id])   return;

      const userAns = state.exam.answers[q.id] || [];
      const card = el('article', 'rev-card rev-' + v);
      rendered++;

      const head = el('div', 'rev-head');
      head.innerHTML = `
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <span class="rev-num">Q${i + 1}</span>
          <span class="rev-cat">${escapeHtml(q.category)}</span>
          ${ex.flags[q.id] ? '<span class="rev-cat" style="background:#FFF4E0;border-color:#F0D9A8;color:#7A5A10">⚑ Flagged</span>' : ''}
        </div>
        <span class="rev-verdict verdict-${v}">${v}</span>`;
      card.appendChild(head);

      const body = el('div', 'rev-body');
      body.appendChild(el('div', 'rev-qtext', escapeHtml(q.text)));

      if (q.image) {
        const fig = el('figure', 'rev-figure');
        const img = el('img');
        img.onerror = () => fig.remove();
        img.src = `${cfg.imageDir}/${q.image}.png`;
        img.alt = 'Exhibit';
        fig.appendChild(img);
        body.appendChild(fig);
      }

      const choices = el('div', 'rev-choices');
      q.choices.forEach((text, idx) => {
        const isCorrect = q.correct.includes(idx);
        const isUser    = userAns.includes(idx);
        let cls = 'rev-choice';
        if (isCorrect)   cls += ' is-correct';
        else if (isUser) cls += ' is-user-wrong';

        const row = el('div', cls);
        row.innerHTML = `
          <span class="rc-letter">${LETTERS[idx]}.</span>
          <span style="flex:1">${escapeHtml(text)}</span>
          ${isCorrect              ? '<span class="rc-tag tag-correct">Correct</span>' : ''}
          ${(isUser && !isCorrect) ? '<span class="rc-tag tag-yours-wrong">Your answer</span>' : ''}
          ${(isUser &&  isCorrect) ? '<span class="rc-tag tag-yours">Your answer</span>' : ''}
        `;
        choices.appendChild(row);
      });
      body.appendChild(choices);

      const explain = el('div', 'rev-explain');
      explain.innerHTML = `<strong>Rationale:</strong> ${escapeHtml(q.explanation || 'No explanation provided.')}`;
      body.appendChild(explain);

      card.appendChild(body);
      list.appendChild(card);
    });

    if (!rendered) {
      list.appendChild(el('div', 'rev-empty',
        filter === 'all'
          ? 'No questions to display.'
          : `No questions match the “${filter}” filter.`));
    }
  }

  /* ── Init ──────────────────────────────────────────────────── */
  function init() {
    if (!window.ExamRegistry) {
      console.error('[ExamSim] ExamRegistry not loaded — check script order in index.html.');
      return;
    }

    if (window.ExamStorage && window.ExamStorage.isAvailable()) {
      const prefs = window.ExamStorage.loadPrefs();
      if (prefs && prefs.examKey && window.ExamRegistry.get(prefs.examKey)) {
        state.examKey = prefs.examKey;
      }
    }

    populateExamPicker();
    renderLastAttempt();

    if (window.ExamStorage && window.ExamStorage.isAvailable()) {
      const snap = window.ExamStorage.loadInProgress();
      if (snap) setTimeout(() => offerResume(snap), 250);
    }

    const clearBtn = $('#btnClearCache');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (!window.ExamStorage) return;
        if (!confirm('Clear all cached exam progress, preferences and last result?')) return;
        window.ExamStorage.clearAll();
        renderLastAttempt();
        state.examKey = DEFAULT_EXAM_KEY;
        populateExamPicker();
      });
    }

    $('#btnStartExam').addEventListener('click', () => {
      const cfg = currentExamConfig();
      if (!window.ExamRegistry.isReady(cfg)) return;

      const existing = window.ExamStorage && window.ExamStorage.loadInProgress();
      if (existing && existing.examKey === cfg.key) {
        if (!confirm('You already have an unfinished attempt for this exam. Starting a new one will discard it. Continue?')) return;
        clearCacheForExam();
      }

      const delivered = buildExam(cfg);
      if (!delivered || !delivered.length) return;

      state.exam.questions = delivered;
      state.exam.answers   = {};
      state.exam.flags     = {};
      state.exam.index     = 0;
      state.exam.remaining = cfg.durationSeconds;
      state.exam.submitted = false;
      state.exam.startedAt = Date.now();
      state.exam.config    = cfg;
      state.lastAutosaveAt = 0;

      $('#totalQNum').textContent    = delivered.length;
      $('#examTitleBar').textContent = cfg.name;

      renderQuestion();
      showScreen('screen-exam');
      startTimer();
      autosave(true);
    });

    $('#btnPrev').addEventListener('click', () => {
      if (state.exam.index > 0) { state.exam.index--; renderQuestion(); }
    });
    $('#btnNext').addEventListener('click', () => {
      if (state.exam.index < state.exam.questions.length - 1) {
        state.exam.index++; renderQuestion();
      }
    });

    $('#chkFlag').addEventListener('change', e => {
      const q = state.exam.questions[state.exam.index];
      if (!q) return;
      if (e.target.checked) state.exam.flags[q.id] = true;
      else                  delete state.exam.flags[q.id];
      renderPalette();
      updateStats();
      autosave(true);
    });

    /* Quick-action jumps inside the pinned panel */
    const btnNextUnanswered = $('#btnNextUnanswered');
    if (btnNextUnanswered) btnNextUnanswered.addEventListener('click', goToNextUnanswered);

    const btnNextFlagged = $('#btnNextFlagged');
    if (btnNextFlagged) btnNextFlagged.addEventListener('click', goToNextFlagged);

    const btnNavSubmit = $('#btnNavSubmit');
    if (btnNavSubmit) btnNavSubmit.addEventListener('click', confirmSubmit);

    $('#btnSubmitTop').addEventListener('click', confirmSubmit);

    $('#btnReviewAnswers').addEventListener('click', () => {
      state.reviewFilter = 'all';
      $$('.review-filters .chip').forEach(c =>
        c.classList.toggle('chip-active', c.dataset.filter === 'all'));
      renderReview();
      showScreen('screen-review');
    });
    $('#btnBackToScore').addEventListener('click', () => showScreen('screen-score'));

    const retake = () => {
      stopTimer();
      state.exam.submitted = false;
      clearCacheForExam();
      const cfg = currentExamConfig();
      $('#timerValue').textContent = formatHMS(cfg.durationSeconds);
      $('#timerDisplay').classList.remove('warning', 'critical');
      refreshExamMeta();
      renderLastAttempt();
      showScreen('screen-start');
    };
    $('#btnRetake').addEventListener('click', retake);
    $('#btnRetake2').addEventListener('click', retake);

    $$('.review-filters .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        $$('.review-filters .chip').forEach(c => c.classList.remove('chip-active'));
        chip.classList.add('chip-active');
        state.reviewFilter = chip.dataset.filter;
        renderReview();
      });
    });

    document.addEventListener('keydown', e => {
      if (!$('#screen-exam').classList.contains('active')) return;
      if (e.target.matches('input, textarea, select')) return;

      if (e.key === 'ArrowLeft')  $('#btnPrev').click();
      if (e.key === 'ArrowRight') $('#btnNext').click();
      if (e.key.toLowerCase() === 'f') {
        const cb = $('#chkFlag');
        cb.checked = !cb.checked;
        cb.dispatchEvent(new Event('change'));
      }
    });

    window.addEventListener('beforeunload', () => autosave(true));
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') autosave(true);
    });
  }

  window.ExamApp = { init };

  if (!document.getElementById('authGate')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }
})();