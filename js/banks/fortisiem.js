/* ═══════════════════════════════════════════════════════════════
   Bank — FortiSIEM 7.6 Analyst  (Coming Soon)
   -----------------------------------------------------------------
   Add questions following the schema documented in
   js/banks/fortios.js.  As soon as this array has at least one
   entry, the FortiSIEM card on the start screen flips from
   "Coming Soon" to "Ready" automatically.

   Categories must match the FortiSIEM domainOrder defined in
   js/registry.js — see that file for the exact strings.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const QUESTIONS = [

    /* Example — uncomment and expand when you build this bank.
    {
      id:'FSIEM-1',
      category:'Analytics & Rules',
      type:'single',
      image:null,
      text:'…question stem…',
      choices:['A','B','C','D'],
      correct:[0],
      explanation:'…why the answer is right…'
    }
    */

  ];

  window.ExamRegistry.setBank('fsiem', QUESTIONS);
})();