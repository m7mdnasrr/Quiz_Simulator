/* ═══════════════════════════════════════════════════════════════
   ExamRegistry
   -----------------------------------------------------------------
   The single source of truth for exam metadata. Banks self-register
   via ExamRegistry.setBank(key, [ ...questions ]) from their own
   js/banks/<exam>.js file.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────
     EXAM DEFINITIONS
     ─────────────────────────────────────────────────────────
     To add a new exam in the future:
       1. Create js/banks/<exam>.js
       2. Add a metadata entry here with the same key
       3. Add a <script> tag for the bank in index.html
     Nothing else needs to change.
     ───────────────────────────────────────────────────────── */
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
      imageDir:        'images/fortios',
      totalQuestions:  50,
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
      totalQuestions:  35,
      durationSeconds: 65 * 60,
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
        'Deployment & System Configuration',
        'ADOMs & Administrative Domains',
        'Device Manager',
        'Policy & Objects',
        'SD-WAN Manager',
        'VPN Manager',
        'Provisioning & Scripts',
        'Security Fabric & Integrations'
      ],
      imageDir:        'images-fmgr',
      totalQuestions:  45,
      durationSeconds: 90 * 60,
      passPercent:     80,
      available:       true,        // reserved; bank stub means card shows "Coming Soon"
      bank:            []
    },

    fsiem: {
      key:        'fsiem',
      name:       'FortiSIEM 7.6 Analyst',
      short:      'FortiSIEM 7.6',
      version:    'NSE 6 · SIEM',
      icon:       '🔎',
      blurb:      'Event correlation, CMDB, analytics, rules and incident response.',
      domainOrder:[
        'Deployment & Architecture',
        'Data Collection & Parsers',
        'CMDB & Discovery',
        'Analytics & Rules',
        'Incidents & Remediation',
        'Reports & Dashboards',
        'Integrations & Fabric'
      ],
      imageDir:        'images-fsiem',
      totalQuestions:  45,
      durationSeconds: 90 * 60,
      passPercent:     80,
      available:       true,        // reserved; bank stub means card shows "Coming Soon"
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