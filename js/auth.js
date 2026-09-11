/* ═══════════════════════════════════════════════════════════════
   AuthGate  —  minimal access code gate
   -----------------------------------------------------------------
   NOTE: Client-side only. Deters casual visitors, not determined
   attackers. For real protection use your host's password feature.

   To change the code, edit ACCESS_CODE below (case-insensitive).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────
     CONFIG
     ───────────────────────────────────────────────────────── */
  const ACCESS_CODE     = 'FORTI2025';
  const SESSION_KEY     = 'gate:ok';
  const MAX_ATTEMPTS    = 5;
  const LOCKOUT_SECONDS = 30;

  /* ─────────────────────────────────────────────────────────
     State
     ───────────────────────────────────────────────────────── */
  let attempts    = 0;
  let lockedUntil = 0;
  let lockTimerId = null;

  /* ─────────────────────────────────────────────────────────
     Session
     ───────────────────────────────────────────────────────── */
  function isAuthed() {
    try { return sessionStorage.getItem(SESSION_KEY) === '1'; }
    catch (_) { return false; }
  }
  function setAuthed() {
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (_) {}
  }

  /* ─────────────────────────────────────────────────────────
     DOM
     ───────────────────────────────────────────────────────── */
  let gate, form, input, button, errorEl;
  let lockMsg;

  function clearError() {
    if (!errorEl) return;
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
    if (input) input.classList.remove('invalid');
  }
  function showError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.classList.add('visible');
    input.classList.add('invalid');
    input.classList.remove('shake');
    void input.offsetWidth;
    input.classList.add('shake');
  }
  function setBusy(busy) {
    if (button) button.disabled = busy;
    if (input)  input.disabled  = busy;
    if (button) button.textContent = busy ? '…' : 'Enter';
  }

  function startLockout() {
    let remaining = LOCKOUT_SECONDS;
    setBusy(true);
    lockMsg.hidden = false;

    const tick = () => {
      if (remaining <= 0) {
        clearInterval(lockTimerId);
        lockTimerId = null;
        lockedUntil = 0;
        attempts    = 0;
        lockMsg.hidden = true;
        setBusy(false);
        input.focus();
        return;
      }
      lockMsg.textContent = `Try again in ${remaining}s`;
      remaining--;
    };
    tick();
    lockTimerId = setInterval(tick, 1000);
  }

  /* ─────────────────────────────────────────────────────────
     Attempt
     ───────────────────────────────────────────────────────── */
  function attempt() {
    if (lockedUntil > Date.now()) return;

    const entered = String(input.value || '').trim();
    if (!entered) { showError('Enter the access code'); input.focus(); return; }

    setBusy(true);
    clearError();

    setTimeout(() => {
      if (entered.toUpperCase() === ACCESS_CODE.toUpperCase()) {
        setAuthed();
        unlock();
      } else {
        attempts++;
        setBusy(false);

        if (attempts >= MAX_ATTEMPTS) {
          lockedUntil = Date.now() + LOCKOUT_SECONDS * 1000;
          startLockout();
        } else {
          const left = MAX_ATTEMPTS - attempts;
          showError(`Incorrect · ${left} attempt${left === 1 ? '' : 's'} left`);
          input.value = '';
          input.focus();
        }
      }
    }, 250);
  }

  /* ─────────────────────────────────────────────────────────
     Unlock → hand off to the app
     ───────────────────────────────────────────────────────── */
  function unlock() {
    gate.classList.add('closing');

    setTimeout(() => {
      gate.style.display = 'none';

      const appRoot = document.getElementById('appRoot');
      if (appRoot) appRoot.hidden = false;

      /* Start the simulator */
      if (window.ExamApp && typeof window.ExamApp.init === 'function') {
        try {
          window.ExamApp.init();
        } catch (err) {
          console.error('[AuthGate] ExamApp.init failed:', err);
        }
      } else {
        console.error('[AuthGate] window.ExamApp.init is unavailable.');
      }
    }, 280);
  }

  /* ─────────────────────────────────────────────────────────
     Init
     ───────────────────────────────────────────────────────── */
  function init() {
    gate     = document.getElementById('authGate');
    form     = document.getElementById('authForm');
    input    = document.getElementById('authCode');
    button   = document.getElementById('authSubmit');
    errorEl  = document.getElementById('authError');

    if (!gate || !form || !input) {
      /* Auth UI missing → start the app anyway */
      const appRoot = document.getElementById('appRoot');
      if (appRoot) appRoot.hidden = false;
      if (window.ExamApp && typeof window.ExamApp.init === 'function') {
        window.ExamApp.init();
      }
      return;
    }

    /* Create a lockout message slot if it doesn't exist */
    lockMsg = document.getElementById('authLockout');
    if (!lockMsg) {
      lockMsg = document.createElement('div');
      lockMsg.id = 'authLockout';
      lockMsg.className = 'auth-lockout';
      lockMsg.hidden = true;
      form.appendChild(lockMsg);
    }

    /* Already authenticated this session → skip the gate */
    if (isAuthed()) {
      gate.style.display = 'none';
      const appRoot = document.getElementById('appRoot');
      if (appRoot) appRoot.hidden = false;
      if (window.ExamApp && typeof window.ExamApp.init === 'function') {
        window.ExamApp.init();
      }
      return;
    }

    /* Wire events */
    form.addEventListener('submit', e => {
      e.preventDefault();
      attempt();
    });

    input.addEventListener('input', clearError);

    /* Focus the field once painted */
    requestAnimationFrame(() => input.focus());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Public API — call window.AuthGate.logout() to force re-lock */
  window.AuthGate = {
    isAuthed,
    logout() {
      try { sessionStorage.removeItem(SESSION_KEY); } catch (_) {}
      location.reload();
    }
  };
})();