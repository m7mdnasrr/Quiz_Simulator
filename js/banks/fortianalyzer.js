/* ═══════════════════════════════════════════════════════════════
   Bank — FortiAnalyzer 7.6 Analyst
   -----------------------------------------------------------------
   Schema is identical to the FortiOS bank. Categories must match
   the FortiAnalyzer domainOrder defined in registry.js.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const C = {
    LOG:      'Log Management & Analysis',
    INCIDENT: 'Incidents & Events',
    PLAYBOOK: 'Playbooks & Automation',
    REPORT:   'Reports & Templates',
    SOC:      'SOC & Threat Hunting',
    FABRIC:   'Fabric & Connectors',
    SYSTEM:   'System Configuration'
  };

  const QUESTIONS = [

    /* ═══════════════════════════════════════════════════════════
       LOG MANAGEMENT & ANALYSIS
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FAZ-1', category:C.LOG, type:'single', image:null,
      text:'When there are no matching parsers for a device log, what does FortiAnalyzer do?',
      choices:[
        'Drops the log',
        'Applies the generic SYSLOG parser',
        "Stores the log but doesn't normalize it",
        'Archives the log for future analysis'
      ],
      correct:[1],
      explanation:'If no device-specific parser matches, FortiAnalyzer falls back to the generic SYSLOG parser so the log can still be indexed and searched.'
    },
    {
      id:'FAZ-5', category:C.LOG, type:'single', image:'5',
      text:'Refer to the exhibit. FortiAnalyzer # diagnose fortilogd lograte last 5 seconds: 0.2, last 30 seconds: 3.3, last 60 seconds: 1.7 | FortiAnalyzer # diagnose fortilogd msgrate last 5 seconds: 0.4, last 30 seconds: 0.8, last 60 seconds: 0.4. What can you conclude about the output?',
      choices:[
        'Both messages and logs are almost finished indexing.',
        'There are more traffic logs than event logs.',
        'The message rate being higher than the log rate is not normal.',
        'The output is ADOM specific.'
      ],
      correct:[2],
      explanation:'The log rate (rate at which logs are being inserted) should normally exceed the message rate (rate at which syslog messages arrive). Seeing msgrate > lograte indicates a problem with log insertion.'
    },
    {
      id:'FAZ-8', category:C.LOG, type:'single', image:'8',
      text:'Refer to the exhibit. Client-1 is trying to access the internet for web browsing. All FortiGate devices in the topology are part of a Security Fabric with logging to FortiAnalyzer configured. All firewall policies have logging enabled. All web filter profiles are configured to log only violations. Which statement about the logging behavior for this specific traffic flow is true?',
      choices:[
        'Both FGT-A and FGT-B will create traffic logs.',
        'FGT-A will create all traffic logs except for security logs.',
        'FGT-A will create logs for web filter events only if FGT-B did not already detect a violation.',
        'FGT-A will see the MAC address of FGT-B in the packets and know it does not need to log this flow.'
      ],
      correct:[0],
      explanation:'Each FortiGate independently generates traffic logs for flows that pass through it. FGT-B (no NAT, web filter) and FGT-A (NAT + web filter) both log the traffic. Web filter violations are logged only when a violation occurs.'
    },
    {
      id:'FAZ-9', category:C.LOG, type:'multiple', image:'9',
      text:'Refer to the exhibit. Which two observations can you make after reviewing this log entry?',
      choices:[
        'This is a normalized log.',
        'This is a formatted view of the log.',
        'This is the original log that FortiAnalyzer received from FortiGate.',
        'This log is in a raw log format.'
      ],
      correct:[0,2],
      explanation:'The log shows both normalized fields and the original raw log content — normalised by the parser AND the original log as received from FortiGate.'
    },
    {
      id:'FAZ-15', category:C.LOG, type:'multiple', image:null,
      text:'You must find a specific security event log in the FortiAnalyzer logs displayed in FortiView, but so far, you have been unsuccessful. Which two tasks should you perform to investigate why you are having this issue?',
      choices:[
        'Rebuild the SQL database and check FortiView.',
        'Review the ADOM data policy.',
        'Check logs in Log Browse.',
        'Disable FortiView using the CLI and then enable it again.'
      ],
      correct:[1,2],
      explanation:'First verify the ADOM data policy to confirm the log type is allowed into that ADOM, then check the raw logs in Log Browse to see whether the event actually arrived.'
    },
    {
      id:'FAZ-16', category:C.LOG, type:'single', image:null,
      text:'In your role as an analyst, you frequently search the log view using the same parameters. Instead of defining the same search filters repeatedly, what can you do to save time?',
      choices:[
        'Configure a chart template and apply it to device groups.',
        'Configure a report template.',
        'Configure a custom view.',
        'Configure a custom dashboard.'
      ],
      correct:[2],
      explanation:'A custom view saves a reusable set of filters and columns that can be applied instantly on subsequent log searches.'
    },
    {
      id:'FAZ-19', category:C.LOG, type:'single', image:'19',
      text:'Refer to the exhibit. FAS # diagnose log device. What can you conclude from this output?',
      choices:[
        'ADOM1 has 300 MB of disk space remaining.',
        'The allocated disk quota to ADOM1 is 3 GB.',
        'Archive logs are using more space than analytic logs.',
        'There is no disk quota allocated to quarantining files.'
      ],
      correct:[1],
      explanation:'The output shows the ADOM1 quota allocation is 3 GB (analytics + archive combined).'
    },
    {
      id:'FAZ-20', category:C.LOG, type:'multiple', image:null,
      text:'Which two statements about local logs on FortiAnalyzer are true?',
      choices:[
        'Playbook logs for all ADOMs are in the root ADOM.',
        'Application control logs are ADOM specific.',
        'Local logs are not displayed in FortiView.',
        'Event logs are available in the root ADOM.'
      ],
      correct:[1,3],
      explanation:'Application control logs are stored in the ADOM where the device is registered, and event logs are surfaced in the root ADOM. Playbook logs are ADOM-specific, and local logs are visible in FortiView.'
    },
    {
      id:'FAZ-21', category:C.LOG, type:'single', image:'21',
      text:'Refer to the exhibit. Insert Rate vs Receive Rate - Last 1 Hour. What does the data point at 21:20 indicate?',
      choices:[
        'The fortilog daemon is ahead in indexing by one log.',
        'FortiAnalyzer is indexing logs faster than logs are being received.',
        'The log insert lag time is high.',
        'The sqlplugin daemon is behind in receiving logs by one log.'
      ],
      correct:[1],
      explanation:'When the insert rate line is above the receive rate line at a given point, FortiAnalyzer is inserting logs into the database faster than new logs arrive — meaning it has caught up.'
    },
    {
      id:'FAZ-22', category:C.LOG, type:'single', image:null,
      text:'What is the purpose of running the command diagnose sql status sqlreportd?',
      choices:[
        'To display the SQL query connections and hcache status.',
        'To list the current running SQL processes.',
        'To view a list of current reports that are running.',
        'To identify the configuration status of all configured reports.'
      ],
      correct:[0],
      explanation:'diagnose sql status sqlreportd shows SQL query connections and the hcache (report cache) status used by the report daemon.'
    },
    {
      id:'FAZ-25', category:C.LOG, type:'multiple', image:'25',
      text:'Refer to the exhibit. Which two conclusions can you make about these search results?',
      choices:[
        'The logs have been parsed by FortiGate log parser.',
        'They can be downloaded to a CSV file.',
        'They were searched using text mode.',
        'They are sortable by columns and customizable.'
      ],
      correct:[1,2],
      explanation:'The displayed output is a raw text-mode search view and its results can be exported to CSV.'
    },
    {
      id:'FAZ-26', category:C.LOG, type:'single', image:null,
      text:'What is the purpose of running the command diagnose sql status sqlplugin?',
      choices:[
        'To list the current running SQL processes.',
        'To identify the database log insertion status.',
        'To view the amount of time between log received and log inserted into the database.',
        'To display the SQL query connections and hcache status.'
      ],
      correct:[1],
      explanation:'diagnose sql status sqlplugin reports the SQL plugin (insertion pipeline) status — i.e., whether logs are being inserted into the database correctly.'
    },
    {
      id:'FAZ-33', category:C.LOG, type:'single', image:null,
      text:'Which statement describes archive logs on FortiAnalyzer?',
      choices:[
        'Logs received from other FortiAnalyzer devices.',
        'Logs that are parsed and normalized by FortiAnalyzer and available in the log view.',
        'Logs compressed and saved in files with the .gz extension.',
        'Logs that are indexed and stored in the SQL database.'
      ],
      correct:[2],
      explanation:'Archive logs are the raw logs stored on disk as .gz files. Analytic logs are the parsed/normalised ones in the SQL database.'
    },
    {
      id:'FAZ-36', category:C.LOG, type:'single', image:'36',
      text:'Refer to the exhibit. Client-1 is trying to access the internet for web browsing. All FortiGate devices in the topology are part of a Security Fabric with logging to FortiAnalyzer configured. All firewall policies have logging enabled. All web filter profiles are configured to log only violations. Which statement about the logging behavior for this specific traffic flow is true?',
      choices:[
        'FGT-B will see the MAC address of FGT-A as the destination and notifies FGT-A to log this flow.',
        'FGT-B will create traffic logs and will create web filter logs if it detects a violation.',
        'Only FGT-B will create traffic logs.',
        'Only FGT-A will create web filter logs if it detects a violation.'
      ],
      correct:[0],
      explanation:'FortiGate uses the Security Fabric root to correlate forwarded traffic — FGT-B recognises FGT-A as a fabric peer by MAC and does not duplicate logging.'
    },
    {
      id:'FAZ-39', category:C.LOG, type:'multiple', image:null,
      text:'Which three types of logs does FortiAnalyzer collect from FortiGate devices for normalization?',
      choices:['Security','Firewall','Traffic','System','Event'],
      correct:[0,2,4],
      explanation:'FortiAnalyzer normalises Security, Traffic and Event logs from FortiGate. Firewall and System are not part of the normalisation set.'
    },
    {
      id:'FAZ-41', category:C.LOG, type:'single', image:null,
      text:'You are tasked with finding logs corresponding to a suspected attack on your network. You must use an interface where all identified threats within your timeframe are listed and organized. You must also be able to quickly export the information to a PDF file. Where can you go to accomplish this task?',
      choices:[
        'FortiAnalyzer Dashboards',
        'FortiView',
        'Incident',
        'Log View'
      ],
      correct:[1],
      explanation:'FortiView presents identified threats in an organised drill-down view with built-in PDF export.'
    },
    {
      id:'FAZ-44', category:C.LOG, type:'single', image:'44',
      text:'Refer to the exhibit. Which statement about the displayed threats is correct?',
      choices:[
        'FortiAnalyzer has logged only three types of IPS attacks.',
        'Malware attacks should be prioritized over IPS attacks.',
        'A cross-site scripting (XSS) attack occurred on a DNS server.',
        'A SQL injection attack occurred on an application.'
      ],
      correct:[3],
      explanation:'The FortiView Top Threats view identifies a SQL injection attempt against an application, matching the evidence shown in the exhibit.'
    },
    {
      id:'FAZ-51', category:C.LOG, type:'single', image:'51',
      text:'Refer to the exhibit. Client-1 is trying to access the internet for web browsing. All FortiGate devices in the topology are part of a Security Fabric with logging to FortiAnalyzer configured. All firewall policies have logging enabled. All web filter profiles are configured to log only violations and the same web filter profile is being used in both FortiGate devices. Which statement about the logging behavior for this specific traffic flow is true?',
      choices:[
        'FGT-B will create traffic logs and will create web filter logs if it detects a violation.',
        'FGT-B will see the MAC address of FGT-A as the destination and notifies FGT-A to log this flow.',
        'FGT-B will create all traffic logs except for security logs.',
        'Only FGT-A will create web filter logs if it detects a violation.'
      ],
      correct:[0],
      explanation:'FGT-B creates traffic logs for all matching flows and additionally creates web filter logs whenever a violation occurs.'
    },
    {
      id:'FAZ-53', category:C.LOG, type:'single', image:'53',
      text:'Refer to the exhibit. Insert Rate vs Receive Rate. What does the data point at 12:20 indicate?',
      choices:[
        'FortiAnalyzer is using its cache to avoid dropping logs.',
        'The log insert lag time is increasing.',
        'The sqlplugin service is caught up with new logs.',
        'The log insert lag time is high.'
      ],
      correct:[1],
      explanation:'A falling insert rate relative to receive rate at 12:20 indicates the insert lag is growing — FortiAnalyzer is falling behind on database insertion.'
    },
    {
      id:'FAZ-54', category:C.LOG, type:'single', image:null,
      text:'In firmware version 7.6, how does on-premises FortiAnalyzer store logs?',
      choices:[
        'Uses ClickHouse database',
        'Uses MySQL database',
        'Uses Postgres SQL database',
        'Uses ElasticSearch database'
      ],
      correct:[0],
      explanation:'FortiAnalyzer 7.6 uses the ClickHouse columnar database engine for analytic log storage.'
    },
    {
      id:'FAZ-56', category:C.LOG, type:'single', image:'56',
      text:'Refer to the exhibit. What conclusion can you draw from the exhibit?',
      choices:[
        'Social networking websites are being allowed.',
        'Unrated websites are being blocked.',
        'These are application control logs from FortiGate.',
        'This is a custom view that was set by the analyst.'
      ],
      correct:[0],
      explanation:'The log shows Social Networking category entries with the action "passthrough", meaning those websites are being allowed.'
    },
    {
      id:'FAZ-66', category:C.LOG, type:'single', image:'66',
      text:'Refer to the exhibit. Laptop1 is used by several administrators to manage FortiAnalyzer. You want to configure a generic text filter that matches all attempts to log in to the web interface generated by any user other than "admin", and coming from Laptop1. Which filter will achieve the intended outcome?',
      choices:[
        'operation-login & performed_on == "GUI(192.168.1.100)" & user!=admin',
        'operation-login & dstip == 192.168.1.210 & user!=admin',
        'operation-login & performed_on == "GUI (192.168.1.210)" & user!=admin',
        'operation-login & scrip192.168.1.100 & dstip192.168.1.210 & user == admin'
      ],
      correct:[0],
      explanation:'The correct field is "performed_on" with the client\'s source IP (Laptop1 = 192.168.1.100), and user != admin excludes the admin account.'
    },
    {
      id:'FAZ-67', category:C.LOG, type:'single', image:'67',
      text:'Refer to the exhibit. FAZ # diagnose fortilogd lograte ... What can you conclude about the output? (lograte ~130, msgrate ~1.6)',
      choices:[
        'The log rate being higher than the message rate is normal.',
        'The low indexing values require investigation.',
        'There are more event logs than traffic logs.',
        'The output is ADOM specific.'
      ],
      correct:[0],
      explanation:'A healthy FortiAnalyzer shows lograte much higher than msgrate, because lograte counts insertions of all log types while msgrate counts incoming syslog messages.'
    },

    /* ═══════════════════════════════════════════════════════════
       INCIDENTS & EVENTS
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FAZ-3', category:C.INCIDENT, type:'multiple', image:null,
      text:'Which two parameters does FortiAnalyzer use to identify an indicator of compromise (IOC)?',
      choices:['IP address','URL','Policy ID','Application category'],
      correct:[0,1],
      explanation:'FortiAnalyzer IOC detection uses IP addresses, URLs, domains and hostnames. Policy ID and application category are not IOC parameters.'
    },
    {
      id:'FAZ-10', category:C.INCIDENT, type:'multiple', image:null,
      text:'What are the two methods you can use to send notifications when an event is generated by an event handler?',
      choices:[
        'Send SNMP trap.',
        'Send an alert through the FortiGuard server.',
        'Send an alert through Fabric connectors.',
        'Send SMS notification.'
      ],
      correct:[0,2],
      explanation:'Event handlers can send SNMP traps or notifications through Fabric connectors. SMS and FortiGuard alerts are not direct event-handler outputs.'
    },
    {
      id:'FAZ-12', category:C.INCIDENT, type:'single', image:null,
      text:'How does FortiAnalyzer block indicators?',
      choices:[
        'It uses an automation script to update FortiGate with the block list.',
        'It uses a FortiManager connector to send the block list.',
        'It uses a FortiClient EMS connector to send the block list.',
        'It uses a webhook to allow FortiGate to send the block list.'
      ],
      correct:[1],
      explanation:'FortiAnalyzer uses the FortiManager connector to push indicator block lists to managed FortiGates.'
    },
    {
      id:'FAZ-23', category:C.INCIDENT, type:'single', image:null,
      text:'When managing incidents on FortiAnalyzer, which fact must an analyst be aware of?',
      choices:[
        'A playbook can be run from the Incidents page.',
        'Indicators found on the Incidents page can be enriched only from the Indicators page.',
        'Incidents must be acknowledged before they can be analyzed.',
        'The status of the incident is always linked to the status of the attached event.'
      ],
      correct:[0],
      explanation:'An analyst can trigger a playbook directly from the Incidents page, which is the primary automated remediation workflow.'
    },
    {
      id:'FAZ-29', category:C.INCIDENT, type:'multiple', image:null,
      text:'Which three types of indicators can FortiAnalyzer identify?',
      choices:['Email address','URL','Host name','Domain','IP address'],
      correct:[1,3,4],
      explanation:'FortiAnalyzer identifies URL, domain and IP address indicators. Email addresses and hostnames are not IOC types recognised by the built-in engine.'
    },
    {
      id:'FAZ-30', category:C.INCIDENT, type:'multiple', image:null,
      text:'Which three types of traffic does the safeguarding event handler scan?',
      choices:['VoIP','Application','DNS','Web','Email'],
      correct:[1,3,4],
      explanation:'The safeguarding event handler scans Application, Web and Email traffic. VoIP and DNS are not part of its scope.'
    },
    {
      id:'FAZ-40', category:C.INCIDENT, type:'single', image:null,
      text:'Which statement about sending notifications with incident updates is true?',
      choices:[
        'All connectors used for sending notifications must share the same notification settings.',
        'Notifications can be sent only when an incident is created or deleted.',
        'You must configure an output profile to send notifications by email.',
        'Each incident can send notifications to multiple external platforms.'
      ],
      correct:[3],
      explanation:'Incidents can notify multiple external platforms simultaneously; connectors retain their own independent settings.'
    },
    {
      id:'FAZ-43', category:C.INCIDENT, type:'single', image:null,
      text:'As part of your analysis, you discover that a Medium severity level incident is fully remediated. You change the incident status to Closed: Remediated. How will FortiAnalyzer handle this incident?',
      choices:[
        'The incident severity will be nullified.',
        'The incident will be deleted from the incident queue.',
        'The Incidents dashboards will be updated.',
        'The corresponding event will be marked as Mitigated.'
      ],
      correct:[2],
      explanation:'Closing the incident updates the Incidents dashboard metrics — the incident remains in the queue but its status changes.'
    },
    {
      id:'FAZ-45', category:C.INCIDENT, type:'single', image:'45',
      text:'Refer to the exhibit. Which statement about the displayed event is correct?',
      choices:[
        'An incident was created from this event.',
        'The risk source is isolated.',
        'The security risk was escalated.',
        'The security event risk is considered open.'
      ],
      correct:[3],
      explanation:'The event status is "Unhandled", which means the security event risk is still considered open until it is handled.'
    },
    {
      id:'FAZ-55', category:C.INCIDENT, type:'multiple', image:null,
      text:'Which two statements regarding the outbreak detection service are true?',
      choices:[
        'It automatically downloads new log parsers and reports.',
        'It automatically downloads new event handlers and reports.',
        'An additional license is required.',
        'New downloads need to be accepted by system administrators.'
      ],
      correct:[1,2],
      explanation:'Outbreak detection downloads new event handlers and reports automatically and requires an additional license. No admin approval is required.'
    },
    {
      id:'FAZ-59', category:C.INCIDENT, type:'single', image:null,
      text:'Which statement about sending notifications with incident updates is true?',
      choices:[
        'Notifications can be sent only when an incident is created or deleted.',
        'You must configure an output profile to send notifications by email.',
        'Each incident can send notifications to a single external platform.',
        'Each connector used can have different notification settings.'
      ],
      correct:[3],
      explanation:'Each connector can maintain its own independent notification settings — they do not have to match across connectors.'
    },
    {
      id:'FAZ-63', category:C.INCIDENT, type:'single', image:null,
      text:'What is the purpose of using data selectors when configuring event handlers?',
      choices:[
        "They apply their filter criteria to the entire event handler so that you don't have to configure the same criteria in the individual rules.",
        'They filter the types of logs that FortiAnalyzer can accept from registered devices.',
        'They download new filters that can be used in event handlers.',
        'They are common filters that can be applied simultaneously to all event handlers.'
      ],
      correct:[0],
      explanation:'Data selectors apply a shared filter across the entire event handler, avoiding duplication of criteria across individual rules.'
    },
    {
      id:'FAZ-65', category:C.INCIDENT, type:'single', image:'65',
      text:'Refer to the exhibit. Which statement about the displayed event is correct?',
      choices:[
        'The security risk was dropped.',
        'The risk source is isolated.',
        'The security risk was blocked.',
        'The security event risk is from an application control log.'
      ],
      correct:[2],
      explanation:'The event status is "Mitigated" and the action shown is "blocked", meaning the security risk was blocked.'
    },
    {
      id:'FAZ-70', category:C.INCIDENT, type:'single', image:null,
      text:'What happens when the indicator of compromise (IOC) engine on FortiAnalyzer finds web logs that match blocklisted IP addresses?',
      choices:[
        'A new Infected entry is added for the corresponding endpoint under Compromised Hosts.',
        'FortiAnalyzer runs a default playbook in the background that creates an incident alerting analysts.',
        'The detection engine classifies those logs as Suspicious.',
        'The endpoint is marked as Compromised and, optionally, can be quarantined.'
      ],
      correct:[0],
      explanation:'When the IOC engine finds a match, a new "Infected" entry is created for that endpoint under the Compromised Hosts view.'
    },
    {
      id:'FAZ-72', category:C.INCIDENT, type:'single', image:null,
      text:'As part of your analysis, you discover that an incident is a false positive. You change the incident status to Closed: False Positive. Which statement about your update is true?',
      choices:[
        'The corresponding event will be marked as Contained.',
        'The incident will be deleted.',
        'The audit history log will be updated.',
        'The incident number will be updated.'
      ],
      correct:[2],
      explanation:'Every incident status change is recorded in the audit history log; the incident itself is not deleted and its number does not change.'
    },

    /* ═══════════════════════════════════════════════════════════
       PLAYBOOKS & AUTOMATION
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FAZ-2', category:C.PLAYBOOK, type:'single', image:'2',
      text:'Refer to the exhibits. Assume these are all the events that exist on FortiAnalyzer. How many events will be added to the incident created after running this playbook?',
      choices:[
        'Four events will be added.',
        'Six events will be added.',
        'Seven events will be added.',
        'No events will be added.'
      ],
      correct:[0],
      explanation:'The Get Events filter matches "Match All Conditions" (Severity >= High AND Event Type = Web Filter AND Tag = Malware). Four events in the monitor meet all three conditions.'
    },
    {
      id:'FAZ-7', category:C.PLAYBOOK, type:'single', image:null,
      text:'You created a playbook on FortiAnalyzer that uses a FortiOS connector. When you configure FortiGate, which type of trigger must you use so that the actions in an automation stitch are available in the FortiOS connector?',
      choices:[
        'FortiAnalyzer Event Handler',
        'Incoming webhook',
        'Fabric Connector event',
        'IP ban'
      ],
      correct:[1],
      explanation:'FortiGate must use the "Incoming webhook" trigger so its automation stitch actions can be called from FortiAnalyzer\'s FortiOS connector.'
    },
    {
      id:'FAZ-13', category:C.PLAYBOOK, type:'single', image:null,
      text:'Which statement about automation connectors on FortiAnalyzer is true?',
      choices:[
        'An ADOM with the Fabric type comes with multiple connectors configured.',
        'The playbook module must be enabled before external connectors are displayed.',
        'The actions available with FortiOS connectors are determined by automation rules configured on FortiGate.',
        'The local connector comes online once you have a playbook task referencing it.'
      ],
      correct:[2],
      explanation:'The FortiOS connector exposes actions defined by the automation stitches/rules configured on the managed FortiGate.'
    },
    {
      id:'FAZ-17', category:C.PLAYBOOK, type:'single', image:'17',
      text:'Refer to the exhibit. What is the analyst trying to create?',
      choices:[
        'A trigger variable to use in a playbook',
        'A report in a playbook',
        'An output variable to use in a playbook',
        'A SOC report in a playbook'
      ],
      correct:[2],
      explanation:'The playbook task uses "Attach Data to Incident" with an attachment value of ${generate_incident_report.report_uuid} — an output variable from a previous task.'
    },
    {
      id:'FAZ-31', category:C.PLAYBOOK, type:'single', image:null,
      text:'You are trying to configure a task in the playbook editor to run a report. However, when you try to select the desired report, you do not see it listed. What is the reason?',
      choices:[
        'The report template needs to be switched to one that is available for playbooks.',
        'The report does not have auto-cache and extended log filtering enabled.',
        'The playbook is currently running and the report will be available after it is finished.',
        'You must create a trigger to run the report first.'
      ],
      correct:[1],
      explanation:'For a report to be selectable inside a playbook task, it must have auto-cache enabled and use extended log filtering.'
    },
    {
      id:'FAZ-35', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'Which three modules does FortiAnalyzer automatically download content from with a valid SOC Automation service license?',
      choices:['Report templates','Dashboards','Event handlers','Active Connectors','Playbooks','Incident templates'],
      correct:[0,2,4],
      explanation:'The SOC Automation service downloads report templates, event handlers and playbooks. Dashboards, connectors and incident templates are not part of the automatic feed.'
    },
    {
      id:'FAZ-49', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'Which two statements about playbook execution are true?',
      choices:[
        'FortiAnalyzer will commit changes made by a Failed playbook.',
        'The Playbook Monitor provides troubleshooting logs.',
        'If the playbook status is Failed, all individual tasks in the playbook will fail.',
        'You can run the default debugging playbook to investigate playbook errors.'
      ],
      correct:[0,1],
      explanation:'Changes committed before failure are retained, and the Playbook Monitor surfaces troubleshooting logs. A failed playbook may still have successful tasks.'
    },
    {
      id:'FAZ-57', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'Which two statements about exporting and importing playbooks are true?',
      choices:[
        'You can import a playbook even if there is another one with the same name in the destination.',
        'You can export only one playbook at a time.',
        'A playbook that was disabled when it was exported will be disabled when it is imported.',
        'Playbooks can be imported to a different FortiAnalyzer device, but only if the connectors already exist.'
      ],
      correct:[0,2],
      explanation:'Duplicate names are allowed on import and the enabled/disabled state is preserved. Multiple playbooks can be exported, and missing connectors are created automatically.'
    },
    {
      id:'FAZ-58', category:C.PLAYBOOK, type:'single', image:null,
      text:'What is the purpose of trigger variables?',
      choices:[
        'To display statistics about the playbook runtime',
        'To use information from the trigger to filter the action in a task',
        'To provide the trigger information to make the playbook start running',
        'To store the start times of playbooks with On_Schedule triggers'
      ],
      correct:[1],
      explanation:'Trigger variables extract data from the triggering event (e.g. incident_id) so it can be passed into downstream tasks as filter input.'
    },
    {
      id:'FAZ-62', category:C.PLAYBOOK, type:'single', image:null,
      text:'Why must you wait for several minutes before you run a playbook that you just created?',
      choices:[
        'FortiAnalyzer needs that time to parse the new playbook.',
        'FortiAnalyzer needs that time to back up the current playbooks.',
        'FortiAnalyzer needs that time to ensure there are no other playbooks running.',
        'FortiAnalyzer needs that time to debug the new playbook.'
      ],
      correct:[0],
      explanation:'A newly created playbook must first be parsed by the FortiAnalyzer playbook engine before it can be executed.'
    },
    {
      id:'FAZ-64', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'Which two statements about playbook execution are true?',
      choices:[
        'FortiAnalyzer will not commit changes made by a Failed playbook.',
        'You can run the default debugging playbook to investigate playbook errors.',
        'Even if the playbook status is Failed, individual tasks may have succeeded.',
        'The Playbook Monitor provides troubleshooting logs.'
      ],
      correct:[2,3],
      explanation:'A Failed playbook status does not mean every task failed — some may have succeeded. The Playbook Monitor provides the troubleshooting logs.'
    },

    /* ═══════════════════════════════════════════════════════════
       REPORTS & TEMPLATES
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FAZ-6', category:C.REPORT, type:'multiple', image:null,
      text:'An analyst needs to move reports between two ADOMs. Which two statements are true?',
      choices:[
        'All charts and datasets associated with the report will be imported together.',
        'The ADOMs must be compatible types.',
        'The date and time will be appended to the original report name to avoid conflicts.',
        'The reports must be converted into templates first.'
      ],
      correct:[0,1],
      explanation:'Imported reports bring their associated charts/datasets with them, and the source and destination ADOMs must be compatible.'
    },
    {
      id:'FAZ-11', category:C.REPORT, type:'single', image:'11',
      text:'Refer to the exhibit. What is the purpose of using the Chart Builder feature on FortiAnalyzer?',
      choices:[
        'To add a new chart under FortiView to be used in new reports',
        'To build a chart automatically based on the top 100 log entries',
        'To add charts to generate reports directly in the current ADOM',
        'To build a dataset and chart based on the filtered search results'
      ],
      correct:[3],
      explanation:'Chart Builder creates a dataset and matching chart directly from the current filtered log search results.'
    },
    {
      id:'FAZ-14', category:C.REPORT, type:'multiple', image:null,
      text:'After generating a report, you notice that the information you were expecting to see is not included in that report. However, you confirm that the logs are there. Which two actions must you perform?',
      choices:[
        'Increase the report utilization quota.',
        'Enable auto-cache.',
        'Check the time frame covered by the report.',
        'Test the dataset.'
      ],
      correct:[2,3],
      explanation:'Check that the report\'s time frame actually covers the period of interest, and test the underlying dataset to verify it returns the expected rows.'
    },
    {
      id:'FAZ-18', category:C.REPORT, type:'single', image:'18',
      text:'Refer to the exhibit. A FortiAnalyzer analyst is customizing a SQL query to use in a report. Which SQL query should the analyst run to get the expected results?',
      choices:[
        "SELECT scrip AS \"Source IP\", dstport AS \"Destination Port\" ORDER BY dstport DESC GROUP BY scrip, dstport FROM log WHERE filter AND scrip ='10.0.1.10'",
        "SELECT scrip AS \"Source IP\", dstport AS \"Destination Port\" FROM log WHERE filter AND scrip ='10.0.1.10' GROUP BY scrip, dstport ORDER BY dstport DESC",
        "SELECT scrip AS \"Source IP\", dstport AS \"Destination Port\" FROM log WHERE filter AND Source IPI='10.0.1.10' GROUP BY scrip, dstport ORDER BY dstport DESC",
        "SELECT scrip AS \"Source IP\", dstport AS \"Destination Port\" FROM log WHERE filter AND scrip ='10.0.1.10' ORDER BY dstport GROUP BY scrip, dstport DESC"
      ],
      correct:[1],
      explanation:'The clause order is SELECT … FROM … WHERE … GROUP BY … ORDER BY. Option B uses this order correctly.'
    },
    {
      id:'FAZ-28', category:C.REPORT, type:'multiple', image:null,
      text:'What are two effects of enabling auto-cache in a FortiAnalyzer report?',
      choices:[
        'The report generation time is reduced.',
        'FortiAnalyzer local cache is used to store generated reports.',
        'The size of newly generated reports is optimized to conserve disk space.',
        'The hcache data is updated automatically when new logs are received.'
      ],
      correct:[0,3],
      explanation:'Auto-cache re-uses cached dataset results and refreshes the hcache as new logs arrive, reducing report generation time.'
    },
    {
      id:'FAZ-32', category:C.REPORT, type:'single', image:null,
      text:'Which operation can you use SQL SELECT queries for?',
      choices:[
        'To display the database schema',
        'To purge log entries from the database',
        'To insert new data into an existing table',
        'To alter tables in the database'
      ],
      correct:[0],
      explanation:'SELECT queries read data (including schema introspection); they do not modify the database.'
    },
    {
      id:'FAZ-37', category:C.REPORT, type:'single', image:null,
      text:'An administrator on your team has configured multiple reports to run periodically. Management has requested that all new generated reports be sent to a company email inbox for accessibility. The mail server has already been configured on FortiAnalyzer. Which item must you configure on FortiAnalyzer so that emails are sent when the reports are generated?',
      choices:[
        'Configure the email notifications section under the report calendar.',
        'Configure a new data policy for log uploads to email.',
        'Enable an output profile on the reports.',
        'Enable the option to email all reports under the mail server.'
      ],
      correct:[2],
      explanation:'An output profile on the report determines its delivery destination (email, SFTP, etc.).'
    },
    {
      id:'FAZ-47', category:C.REPORT, type:'single', image:null,
      text:'Which statement about exporting items in Report Definitions is true?',
      choices:[
        'Template exports do not contain associated charts and datasets.',
        'Templates can be exported.',
        'Chart exports do not contain associated datasets.',
        'Datasets can be exported.'
      ],
      correct:[0],
      explanation:'Exporting a template does not automatically include its associated charts and datasets — those must be exported separately.'
    },
    {
      id:'FAZ-48', category:C.REPORT, type:'multiple', image:null,
      text:'Which two modules can be imported and exported between ADOMs on FortiAnalyzer?',
      choices:['Templates','Datasets','Reports','Charts'],
      correct:[2,3],
      explanation:'Reports and charts can be exported/imported between ADOMs. Templates and datasets are handled separately.'
    },
    {
      id:'FAZ-50', category:C.REPORT, type:'single', image:'50',
      text:'Refer to the exhibit. An analyst is trying to create a dataset to pull all gambling websites that were visited by end users. Which SQL query on FortiAnalyzer will give the result shown in the exhibit?',
      choices:[
        "select scrip as \"SourceIP\", dstip as \"DestIP\", url from $log where catdesc = 'Dating'",
        "select scrip as \"SourceIP\", dstip as \"DestIP\", url from 'Gambling' where catdesc = $log",
        "select scrip as \"SourceIP\", dstip as \"DestIP\", url from $log where catdesc = 'Gambling'",
        "select scrip as \"SourceIP\", dstip as \"DestIPv6\", url from $log where catdesc = 'Gambling'"
      ],
      correct:[2],
      explanation:'The correct syntax is: select … from $log where catdesc = \'Gambling\'. Only option C matches.'
    },
    {
      id:'FAZ-52', category:C.REPORT, type:'single', image:null,
      text:'Which statement correctly describes one difference between templates and reports?',
      choices:[
        'Templates can be cloned, but reports cannot be cloned.',
        'Templates do not include advanced report settings, but reports do.',
        'Reports support macros but templates do not.',
        'Reports can be moved between ADOMs but templates cannot.'
      ],
      correct:[1],
      explanation:'Templates are simplified definitions; reports carry the full advanced settings including scheduling, output profile and language options.'
    },
    {
      id:'FAZ-68', category:C.REPORT, type:'single', image:null,
      text:'When working with datasets, which SQL query is in the correct order to query the database on FortiAnalyzer?',
      choices:[
        "SELECT devid FROM $log WHERE 'user'='USER1' GROUP BY devid",
        "SELECT FROM $log WHERE 'user'='USER1' GROUP BY devid",
        "SELECT devid WHERE 'user'='USER1' FROM $log GROUP BY devid",
        "SELECT FROM $log WHERE devid 'user'='USER1' GROUP BY devid"
      ],
      correct:[0],
      explanation:'SELECT column FROM table WHERE … GROUP BY … is the required clause order.'
    },
    {
      id:'FAZ-69', category:C.REPORT, type:'multiple', image:null,
      text:'You discover that a few reports are taking a long time to generate. Which two steps can you take to troubleshoot?',
      choices:[
        'Remove old reports from the hcache.',
        'Review the report diagnostics.',
        'Disable auto-cache and run the reports again.',
        'Increase the ADOM reports quota.'
      ],
      correct:[1,2],
      explanation:'Review report diagnostics for errors and try running with auto-cache disabled to isolate caching issues.'
    },

    /* ═══════════════════════════════════════════════════════════
       SOC & THREAT HUNTING
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FAZ-27', category:C.SOC, type:'single', image:'27',
      text:'Refer to the exhibit. The playbook shown in the exhibit requires fine-tuning. A task needs to be configured to run a report on the updated asset list that the FortiAnalyzer receives from the FortiClient EMS. Which SOC role is responsible for making this change?',
      choices:['Threat hunter','Incident responder','SOC engineer','Security analyst'],
      correct:[2],
      explanation:'The SOC engineer is responsible for building and maintaining the automation (playbooks, connectors, parsers).'
    },
    {
      id:'FAZ-34', category:C.SOC, type:'multiple', image:null,
      text:'Which two actions should you take to view compromised hosts on FortiAnalyzer?',
      choices:[
        'Subscribe to the Outbreak Detection Service so that the FortiAnalyzer has the latest event handlers.',
        'Subscribe FortiAnalyzer to FortiGuard to keep its local threat database up to date.',
        'Enable web filtering in firewall policies on FortiGate devices, and make sure the FortiGate logs are sent to FortiAnalyzer.',
        'Enable device detection on FortiGate devices that are sending logs to FortiAnalyzer.'
      ],
      correct:[1,2],
      explanation:'Compromised-host detection requires the FortiGuard threat database plus web-filter logging from the managed FortiGates.'
    },
    {
      id:'FAZ-38', category:C.SOC, type:'single', image:'38',
      text:'Refer to the exhibits. The event shown in the exhibit has been escalated to an incident. Which SOC role is responsible for handling the escalated incident?',
      choices:['SOC engineer','Security analyst','Incident responder','Threat hunter'],
      correct:[2],
      explanation:'Once an event is escalated to an incident, the incident responder is responsible for handling it.'
    },
    {
      id:'FAZ-42', category:C.SOC, type:'single', image:null,
      text:'An analyst is using FortiAI on FortiAnalyzer to simplify certain tasks but is worried about exceeding the monthly token limit. Which query will take the fewest FortiAI tokens?',
      choices:[
        'Show logs for 192.168.1.10 (past week)',
        'Show all logs from the past week',
        'Can you show me all the log entries for the endpoint 192.168.1.10?',
        'Show logs for 192.168.1.10'
      ],
      correct:[0],
      explanation:'Option A scopes both the source IP and a bounded time range, which produces the smallest query and result set, using the fewest tokens.'
    },
    {
      id:'FAZ-46', category:C.SOC, type:'multiple', image:null,
      text:'Which three tasks can be performed on FortiAnalyzer using FortiAI?',
      choices:[
        'Configure SD-WAN overlay using FortiAI.',
        'Perform threat hunting.',
        'Perform incident investigation and response.',
        'Configure site-to-site VPN using FortiAI.',
        'Identify potential impacts and recommend remediation.'
      ],
      correct:[1,2,4],
      explanation:'FortiAI is a security analyst assistant — it helps with threat hunting, incident investigation/response, and impact analysis. It does not configure network infrastructure.'
    },
    {
      id:'FAZ-60', category:C.SOC, type:'single', image:null,
      text:'Which FortiAnalyzer feature allows you to use a proactive approach when managing your network security?',
      choices:[
        'Outbreak alert services',
        'Incidents dashboard',
        'Threat hunting',
        'FortiView Monitor'
      ],
      correct:[2],
      explanation:'Threat hunting is a proactive practice of searching for undetected threats across logs and events.'
    },
    {
      id:'FAZ-73', category:C.SOC, type:'single', image:'73',
      text:'Refer to the exhibit. An analyst is using FortiView to look at the top threats recorded by FortiAnalyzer in the last 2 hours. What can the analyst conclude from the exhibit?',
      choices:[
        'There are cross-site scripting (XSS) attacks on an Apache web server.',
        'The attacks that have CVE IDs attached require priority attention.',
        'Only IPS threats constitute genuine threats.',
        'There are no critical level threats.'
      ],
      correct:[0],
      explanation:'The FortiView Top Threats list shows "Apache.Expect.Header.XSS" — a cross-site scripting attack against Apache web servers.'
    },

    /* ═══════════════════════════════════════════════════════════
       FABRIC & CONNECTORS
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FAZ-4', category:C.FABRIC, type:'multiple', image:null,
      text:'In a FortiAnalyzer Fabric deployment, which three modules from Fabric members are available for analysis on the supervisor?',
      choices:['Playbooks','Indicators','Logs','Events','Reports'],
      correct:[2,3,4],
      explanation:'Supervisor sees Logs, Events and Reports from members. Playbooks and Indicators remain local to each member.'
    },
    {
      id:'FAZ-24', category:C.FABRIC, type:'single', image:'24',
      text:'Refer to the exhibit. What does the orange status indicator on the FortiGuard Connector indicate?',
      choices:[
        'The connection is unknown.',
        'The connection is successful.',
        'The connection is down.',
        'The connection is disconnected.'
      ],
      correct:[0],
      explanation:'Orange indicates an unknown connection state — FortiAnalyzer has not yet determined whether the connector is up or down.'
    },
    {
      id:'FAZ-71', category:C.FABRIC, type:'multiple', image:null,
      text:'Which two statements about FortiAnalyzer Fabric deployments are true?',
      choices:[
        'Supervisors can be in high availability (HA) for redundancy purposes only.',
        'Fabric members can operate in analyzer mode only.',
        'Fabric members do not forward their logs to the supervisor.',
        'Supervisors and members must be in the same time zone.'
      ],
      correct:[1,2],
      explanation:'Fabric members operate in analyzer mode and keep their own log storage — they do not forward logs to the supervisor.'
    },

    /* ═══════════════════════════════════════════════════════════
       SYSTEM CONFIGURATION
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FAZ-61', category:C.SYSTEM, type:'single', image:null,
      text:'What should you always do after erasing the FortiAnalyzer configuration on flash?',
      choices:[
        'Perform a system backup',
        'Run the execute reset all-settings command',
        'Run the execute reboot command',
        'Run the execute format disk command'
      ],
      correct:[2],
      explanation:'After erasing the flash configuration, a reboot is required to bring the system up in its factory-default state.'
    }

  ];

  window.ExamRegistry.setBank('faz', QUESTIONS);
})();