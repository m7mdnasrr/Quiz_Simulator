/* ═══════════════════════════════════════════════════════════════
   ExamRegistry
   -----------------------------------------------------------------
   The single source of truth for exam metadata. Banks self-register
   via ExamRegistry.setBank(key, [ ...questions ]) from their own
   js/banks/<exam>.js file.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const EXAMS = {

    fos: {
      key:        'fos',
      name:       'FortiOS 7.6 Administrator',
      short:      'FortiOS 7.6',
      version:    'NSE 4 · FortiOS 7.6 Administrator',
      icon:       '🛡',
      blurb:      'Firewall policies, security profiles, routing and VPN on FortiGate.',
      domainOrder:[
        'Deployment and System Configuration',
        'Firewall Policies and Authentication',
        'Content Inspection',
        'Routing',
        'VPN'
      ],
      imageDir:        'images/FortiOS',
      totalQuestions:  150,
      durationSeconds: 115 * 60,
      passPercent:     80,
      available:       true,
      bank:            []
    },

    faz: {
      key:        'faz',
      name:       'FortiAnalyzer 7.6 Analyst',
      short:      'FortiAnalyzer 7.6',
      version:    'NSE 5 · Analyst',
      icon:       '📊',
      blurb:      'Log analysis, event handling, playbooks, reports and SOC workflows.',
      domainOrder:[
        'Log Management & Analysis',
        'Incidents & Events',
        'Playbooks & Automation',
        'Reports & Templates',
        'SOC & Threat Hunting',
        'Fabric & Connectors',
        'System Configuration'
      ],
      imageDir:        'images/faz',
      totalQuestions:  135,
      durationSeconds: 65 * 60,
      passPercent:     80,
      available:       true,
      bank:            []
    },

    fsiem: {
      key:        'fsiem',
      name:       'FortiSIEM 7.4 Analyst',
      short:      'FortiSIEM 7.4',
      version:    'NSE 6 · FortiSIEM',
      icon:       '🔎',
      blurb:      'Event correlation, CMDB, analytics, rules and incident response.',
      domainOrder:[
        'Analytics',
        'FortiEDR Security Settings and Policies',
        'Rules and Subpatterns',
        'Incidents, Notifications, and Remediation',
        'ML, UEBA, and ZTNA'
      ],
      imageDir:        'images/fsiem',
      totalQuestions:  40,
      durationSeconds: 70 * 60,
      passPercent:     80,
      available:       true,
      bank:            []
    },

    fmgr: {
      key:        'fmgr',
      name:       'FortiManager 7.6 Administrator',
      short:      'FortiManager 7.6',
      version:    'NSE 6 · Central Management',
      icon:       '⚙',
      blurb:      'Centralized device management, ADOMs, provisioning and SD-WAN.',
      domainOrder:[
        'Administration',
        'Device Manager',
        'Policy and Objects',
        'Advanced Configuration',
        'Troubleshooting'
      ],
      imageDir:        'images/fmgr',
      totalQuestions:  145,
      durationSeconds: 90 * 60,
      passPercent:     80,
      available:       true,
      bank:            []
    }

  };

  /* Detect the "Coming Soon" state for a card when its bank is empty. */
  function isReady(exam) {
    return exam.available && Array.isArray(exam.bank) && exam.bank.length > 0;
  }

  window.ExamRegistry = {
    /** Return a shallow copy so external code can iterate safely. */
    list() { return Object.values(EXAMS).map(e => ({ ...e })); },

    /** Get exam metadata by key (never returns undefined). */
    get(key) { return EXAMS[key] || EXAMS.fos; },

    /** Direct reference — used internally by app.js for live reads. */
    get raw() { return EXAMS; },

    /** Called by each bank file after it defines its questions array. */
    setBank(key, questions) {
      if (!EXAMS[key]) {
        console.warn(`[ExamRegistry] Unknown exam key "${key}" — bank ignored.`);
        return;
      }
      if (!Array.isArray(questions)) {
        console.warn(`[ExamRegistry] Bank for "${key}" is not an array.`);
        return;
      }
      EXAMS[key].bank = questions;
    },

    isReady
  };
})();
