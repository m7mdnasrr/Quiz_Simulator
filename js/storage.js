/* ═══════════════════════════════════════════════════════════════
   ExamStorage  —  namespaced localStorage wrapper
   -----------------------------------------------------------------
   • Silently degrades if localStorage is unavailable (private
     browsing, disabled storage, quota exceeded).
   • Every read/write is JSON and try/catch-guarded, so a bad payload
     never crashes the app — it just returns null.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const PREFIX          = 'fn-exam-sim:v1:';
  const KEY_IN_PROGRESS = PREFIX + 'in-progress';
  const KEY_LAST_RESULT = PREFIX + 'last-result';
  const KEY_PREFS       = PREFIX + 'prefs';

  let available = false;
  try {
    const probe = '__fn_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    available = true;
  } catch (_) { available = false; }

  function readJSON(key) {
    if (!available) return null;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  }
  function writeJSON(key, value) {
    if (!available) return false;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_) { return false; }
  }
  function remove(key) {
    if (!available) return;
    try { window.localStorage.removeItem(key); } catch (_) {}
  }

  window.ExamStorage = {
    isAvailable() { return available; },

    saveInProgress(snapshot) {
      if (!snapshot) return remove(KEY_IN_PROGRESS);
      writeJSON(KEY_IN_PROGRESS, { savedAt: Date.now(), ...snapshot });
    },
    loadInProgress() {
      const data = readJSON(KEY_IN_PROGRESS);
      if (!data || !Array.isArray(data.questions) || !data.questions.length) return null;
      if (data.savedAt && (Date.now() - data.savedAt) > 30 * 24 * 60 * 60 * 1000) {
        remove(KEY_IN_PROGRESS);
        return null;
      }
      return data;
    },
    clearInProgress() { remove(KEY_IN_PROGRESS); },

    saveResult(result) { writeJSON(KEY_LAST_RESULT, result); },
    loadResult()       { return readJSON(KEY_LAST_RESULT); },
    clearResult()      { remove(KEY_LAST_RESULT); },

    savePrefs(prefs)   { writeJSON(KEY_PREFS, prefs || {}); },
    loadPrefs()        { return readJSON(KEY_PREFS) || {}; },
    clearPrefs()       { remove(KEY_PREFS); },

    clearAll() {
      remove(KEY_IN_PROGRESS);
      remove(KEY_LAST_RESULT);
      remove(KEY_PREFS);
    }
  };
})();