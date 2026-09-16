/* ═══════════════════════════════════════════════════════════════
   Bank — FortiSIEM 7.6 Analyst
   -----------------------------------------------------------------
   Domains match the official FortiSIEM 7.6 exam blueprint:
     1. Analytics
     2. FortiEDR Security Settings and Policies
     3. Rules and Subpatterns
     4. Incidents, Notifications, and Remediation
     5. ML, UEBA, and ZTNA

   Images live in  images/fsiem/  named by question number.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const C = {
    ANALYTICS: 'Analytics',
    EDR:       'FortiEDR Security Settings and Policies',
    RULES:     'Rules and Subpatterns',
    INCIDENT:  'Incidents, Notifications, and Remediation',
    ML_UEBA:   'ML, UEBA, and ZTNA'
  };

  const QUESTIONS = [

    /* ═══════════════════════════════════════════════════════════
       ANALYTICS
       Build queries, group by, aggregation, CMDB & nested lookups
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FSIEM-1', category:C.ANALYTICS, type:'single', image:'1',
      text:'Refer to the exhibit. What is the Group: VPN Gateway value a reference to?',
      choices:[
        'A configuration management database (CMDB) device group',
        'A FortiSIEM rule folder',
        'A FortiSIEM watchlist',
        'A FortiGate address group'
      ],
      correct:[0],
      explanation:'The "Group:" prefix in the search filter refers to a CMDB device group — a logical grouping of devices defined in the FortiSIEM CMDB.'
    },
    {
      id:'FSIEM-3', category:C.ANALYTICS, type:'single', image:'3',
      text:'Refer to the exhibit. If you group these events by the Reporting Device, Reporting IP, and Application Category attributes, how many results will FortiSIEM display?',
      choices:['Six','Five','Three','Four'],
      correct:[1],
      explanation:'Grouping by the three attributes yields five distinct combinations across the six events — two events share the same values, giving five unique rows.'
    },
    {
      id:'FSIEM-15', category:C.ANALYTICS, type:'single', image:null,
      text:'You want to build a query that includes only events that contain a username. What is a valid analytics query that will perform this type of search?',
      choices:['User IS NOT NULL','User CONTAIN','User STARTS_WITH','User IS VALID'],
      correct:[0],
      explanation:'"IS NOT NULL" filters out events where the attribute has no value, returning only events that carry a username.'
    },
    {
      id:'FSIEM-21', category:C.ANALYTICS, type:'multiple', image:'21',
      text:'Refer to the exhibit. Which two lookup types can you reference as the subquery in a nested analytics query?',
      choices:['Event query','LDAP query','CMDB query','API query'],
      correct:[0,2],
      explanation:'Nested analytics queries can reference other event queries and CMDB queries as their subquery source.'
    },
    {
      id:'FSIEM-23', category:C.ANALYTICS, type:'single', image:'23',
      text:'Refer to the exhibit. FortiSIEM is receiving syslog events from a firewall. You are trying to search raw event logs for traffic from the last two hours that contain the keyword "UDP". However, you are getting no results from the search. Based on the filter shown in the exhibit, why are you getting no search results?',
      choices:[
        'You can perform raw event log searches using only an Event Keyword search.',
        'The AND operator in the Next column is the wrong operator for this type of search.',
        'You are using udp in the Value field, but you must use UDP.',
        'The = operator in the Operator column is the wrong operator for this type of search.'
      ],
      correct:[3],
      explanation:'Matching a substring inside the Raw Event Log requires the CONTAIN operator, not the equality operator (=).'
    },
    {
      id:'FSIEM-24', category:C.ANALYTICS, type:'single', image:'24',
      text:'Refer to the exhibit. Why are some of the fields highlighted in red?',
      choices:[
        'The Event Receive Time attribute is a valid choice to sort by.',
        'No Raw Event Log attribute information is available.',
        'Multiple unique values cannot be grouped.',
        'The attribute COUNT(Matched Events) is an invalid expression.'
      ],
      correct:[2],
      explanation:'FortiSIEM highlights attributes in red when they cannot be part of a Group By clause — for example attributes that may hold multiple unique values per event.'
    },
    {
      id:'FSIEM-27', category:C.ANALYTICS, type:'single', image:'27',
      text:'Refer to the exhibit. Which event type attribute value will the FortiSIEM parser save for this event?',
      choices:['PH_DEV_MON_SYS_UPTIME','PHL_INFO','phLog Detail','sysUpTime'],
      correct:[0],
      explanation:'The parser picks up the value between the first set of brackets in the raw message — PH_DEV_MON_SYS_UPTIME — as the event type.'
    },
    {
      id:'FSIEM-29', category:C.ANALYTICS, type:'single', image:'29',
      text:'Refer to the exhibits. Which information will this analytics search display?',
      choices:[
        'Failed machine login events with a source IP address of servers in the Device IP report',
        'Failed login events from all servers in the Server Inventory configuration management database (CMDB) report',
        'Failed login events from all servers defined in the CMDB',
        'All servers in the Logon Failure user group'
      ],
      correct:[1],
      explanation:'The nested query pulls the Device IP column from the Server Inventory report, and the outer query returns failed logon events whose destination IP is one of those servers.'
    },
    {
      id:'FSIEM-33', category:C.ANALYTICS, type:'single', image:'33',
      text:'Refer to the exhibit. Why is this search not producing any results?',
      choices:[
        'There is a nested query attribute type mismatch.',
        'You cannot reference both the User and Event Type attributes in the same analytics search.',
        'You did not use the configuration management database (CMDB) group search properly.',
        'You must set the Time Range to Real-time to identify login failures.',
        'You must set the Operator to = for both queries.'
      ],
      correct:[0],
      explanation:'The nested query returns a list of devices, but the outer query is trying to compare User against that list. That attribute type mismatch prevents the nested lookup from resolving.'
    },
    {
      id:'FSIEM-35', category:C.ANALYTICS, type:'single', image:null,
      text:'What is one difference between a lookup table and a watchlist?',
      choices:[
        'Watch list entries do not expire, lookup table entries have a defined lifetime.',
        'A lookup table requires a parser to be able to query and interpret the data, a watchlist does not require a parser.',
        'A lookup table can have multiple columns, and a watchlist only has one.',
        'A watchlist can be updated through an API, and a lookup table cannot.'
      ],
      correct:[2],
      explanation:'A lookup table is a multi-column table (like a CSV), while a watchlist is a single-column list of values such as IPs or hashes.'
    },
    {
      id:'FSIEM-50', category:C.ANALYTICS, type:'single', image:'50',
      text:'Refer to the exhibit. If you group these events by the User and Count attributes, how many unique results will FortiSIEM display?',
      choices:['Four','Six','Five','Three'],
      correct:[2],
      explanation:'Grouping by both User and Count yields five unique (User, Count) pairs across the six events.'
    },
    {
      id:'FSIEM-51', category:C.ANALYTICS, type:'single', image:null,
      text:'How can you use the configuration management database (CMDB) in an analytics search?',
      choices:[
        'Use device IP addresses defined in the CMDB to perform an nmap analytics scan.',
        'Match passwords defined in the CMDB to look for suspicious logins.',
        'Use devices defined in the CMDB as source IP addresses.',
        'Perform an AI-assisted analytics search using devices defined in the CMDB.'
      ],
      correct:[2],
      explanation:'CMDB device groups can be referenced as a source IP value in analytics searches, letting you filter events by the devices catalogued in the CMDB.'
    },
    {
      id:'FSIEM-54', category:C.ANALYTICS, type:'single', image:'54',
      text:'Refer to the exhibit. If you apply this Group By and Display Fields configuration to a list of network connections, which information will FortiSIEM display?',
      choices:[
        'A running count of connections, regardless of their source and destination.',
        'A list of connections ordered by the number of unique connections started by each unique source IP address.',
        'A list of connections between unique source and destination IP addresses.',
        'A list of connections ordered by the total amount of data sent between unique devices.'
      ],
      correct:[2],
      explanation:'Grouping by Source IP and Destination IP collapses all matching flows into one row per unique (source, destination) pair.'
    },
    {
      id:'FSIEM-55', category:C.ANALYTICS, type:'single', image:'55',
      text:'Refer to the exhibit. Which statement about the time range settings defined in the nested query is accurate?',
      choices:[
        'FortiSIEM will list source IP addresses found the last 10 minutes of events from each day in the Approved Devices report from the last 30 days.',
        'FortiSIEM will search in real time using 10 minute blocks for a source IP address that is not in the Approved Devices report from the last 30 days.',
        'FortiSIEM will search the last 30 days of events for a source IP address that is not in the Approved Devices report.',
        'FortiSIEM will search the last 10 minutes of events for a source IP address that is not in the Approved Devices report from the last 30 days.'
      ],
      correct:[3],
      explanation:'The outer query time range (10 minutes) governs which events are considered, while the nested time range (30 days) only determines how far back the CMDB lookup should search.'
    },
    {
      id:'FSIEM-62', category:C.ANALYTICS, type:'multiple', image:null,
      text:'Which two processes run analytical queries and must always be running to perform searches?',
      choices:['phAnomaly Master','phQueryWorker','phRuleWorker','phQueryMaster','phRuleMaster'],
      correct:[1,3],
      explanation:'Analytical searches are handled by the phQueryMaster (coordinator) and phQueryWorker (executor) processes.'
    },
    {
      id:'FSIEM-63', category:C.ANALYTICS, type:'single', image:'63',
      text:'Refer to the exhibit. Which value will the FortiSIEM parser use to populate the Application Name field?',
      choices:['Network.Service:SSL','Network Service','SSL','Network.Service'],
      correct:[2],
      explanation:'The parser maps the app field from the raw message (app="SSL") to the Application Name field, giving a value of "SSL".'
    },
    {
      id:'FSIEM-65', category:C.ANALYTICS, type:'single', image:'65',
      text:'Refer to the exhibit. You are investigating an issue with two destination IP addresses, but you are not getting any results from the search. Based on the filters shown in the exhibit, why is this search returning no results?',
      choices:[
        'You are using the wrong Boolean operator in the Next column.',
        'The two items are not grouped in parentheses ().',
        'You are using an invalid IP address in the Value column.',
        'You are using an incorrect entry in the Operator column.'
      ],
      correct:[0],
      explanation:'The two filters are joined with AND, which requires a single event to match both IPs simultaneously — impossible. OR is the correct Boolean.'
    },
    {
      id:'FSIEM-66', category:C.ANALYTICS, type:'single', image:'66',
      text:'Refer to the exhibit. Which statement about the nested query shown in the exhibit is true?',
      choices:[
        'The outer query could have also referenced the Protocol field from the inner query.',
        'The outer query should have used the operator CONTAINS when referencing the inner query.',
        'The outer query could have also referenced the Reporting IP address field from the inner query.',
        'The outer query could have referenced all the queried fields from the inner query.'
      ],
      correct:[2],
      explanation:'Nested queries expose attributes present in the inner query\'s result set — Reporting IP is available alongside Source IP.'
    },
    {
      id:'FSIEM-67', category:C.ANALYTICS, type:'single', image:'67',
      text:'Refer to the exhibit. If you group these events by the Reporting Device, Reporting IP, and Event Type attributes, how many unique results will FortiSIEM display?',
      choices:['Three','Zero','One','Six'],
      correct:[2],
      explanation:'All six events share the same Reporting Device (FW01), Reporting IP (10.1.1.1) and Event Type (Logon), so the group collapses to a single row.'
    },
    {
      id:'FSIEM-68', category:C.ANALYTICS, type:'single', image:null,
      text:'You want to build an event query that displays only events to higher-numbered destination ports (1024-65535). Which analytic search string is valid for this scenario?',
      choices:[
        'Destination TCP/UDP Port > 1024',
        'Destination TCP/UDP Port BETWEEN 1024-65535',
        'Destination TCP/UDP Port >= 1024 AND Destination TCP/UDP Port <= 65535',
        'Destination TCP/UDP Port = 1024 - 65535'
      ],
      correct:[2],
      explanation:'A range requires two comparisons joined by AND; no BETWEEN operator exists in FortiSIEM analytics.'
    },
    {
      id:'FSIEM-72', category:C.ANALYTICS, type:'single', image:'72',
      text:'Refer to the exhibit. If you group these events by the Reporting IP, Event Type, and User attributes, how many results will FortiSIEM display?',
      choices:['Two','Three','Six','Five'],
      correct:[1],
      explanation:'The six events collapse to three unique (Reporting IP, Event Type, User) combinations: Mike, Bob and Alice.'
    },
    {
      id:'FSIEM-73', category:C.ANALYTICS, type:'single', image:'73',
      text:'Refer to the exhibit. What does the Group: Windows value refer to?',
      choices:[
        'A Windows Active Directory (AD) user group',
        'A SOC analyst group',
        'A FortiSIEM user group',
        'A configuration management database (CMDB) device group'
      ],
      correct:[3],
      explanation:'"Group: Windows" refers to a CMDB device group named "Windows", not to an AD or FortiSIEM user group.'
    },
    {
      id:'FSIEM-75', category:C.ANALYTICS, type:'single', image:'75',
      text:'Refer to the exhibit. You are trying to generate an incident with a title that includes Source IP, Destination IP, User, and Destination TCP/UDP Port. You are unable to add Destination TCP/UDP Port as an incident attribute. Which change must you make?',
      choices:[
        'Select Destination TCP/UDP Port as a triggering attribute in the rule.',
        'Set Destination TCP/UDP Port as an aggregate item in the subpattern.',
        'Add Destination TCP/UDP Port as an event type.',
        'Remove the Destination IP event attribute.'
      ],
      correct:[1],
      explanation:'Attributes that should appear in the incident title must be added to the subpattern\'s aggregate or group-by list so they are carried through to the incident generator.'
    },

    /* ═══════════════════════════════════════════════════════════
       FORTIEDR SECURITY SETTINGS AND POLICIES
       (No questions from this bank yet — add them here following the
        same schema to activate this domain in the score report.)
       ═══════════════════════════════════════════════════════════ */

    /* ═══════════════════════════════════════════════════════════
       RULES AND SUBPATTERNS
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FSIEM-4', category:C.RULES, type:'single', image:null,
      text:'When selecting multiple rules at once on FortiSIEM, which actions can you perform?',
      choices:[
        'You can only change the severity of multiple rules at a time.',
        'You can change the severity, activate, or deactivate multiple rules at a time.',
        'You can view, edit, or activate only one rule at a time.',
        'You can only activate or deactivate multiple rules at a time.'
      ],
      correct:[1],
      explanation:'FortiSIEM supports bulk operations on selected rules: severity change, activation and deactivation all apply to the whole selection.'
    },
    {
      id:'FSIEM-8', category:C.RULES, type:'single', image:'8',
      text:'Refer to the exhibit. The rule is not generating an incident, but the search parameters are matching events in the Analytics tab. What is wrong with the rule conditions?',
      choices:[
        'The Destination Host Name value is not fully qualified.',
        'The Group By attributes are too restrictive.',
        'The Aggregate attribute is too restrictive.',
        'The Event Type refers to a CMDB lookup, but it should refer to an event lookup.'
      ],
      correct:[1],
      explanation:'Adding Destination IP and User to the Group By clause splits every event into its own bucket, so the COUNT aggregate never reaches the threshold. Reducing Group By to just the relevant field fixes it.'
    },
    {
      id:'FSIEM-10', category:C.RULES, type:'single', image:'10',
      text:'Refer to the exhibit. When the subpattern is matched, what does the time condition of 60 seconds mean?',
      choices:[
        'The rule will trigger remediation actions every 60 seconds when the subpattern is triggered.',
        'It is the time period over which the rule will aggregate and evaluate events.',
        'The rule engine will evaluate events every 60 seconds looking for the subpattern.',
        'The subpattern must be matched at least twice within 60 seconds to trigger this rule.'
      ],
      correct:[1],
      explanation:'The time window on the Define Condition step defines the aggregation window over which events are evaluated against the subpattern.'
    },
    {
      id:'FSIEM-16', category:C.RULES, type:'multiple', image:null,
      text:'Which three items are required to create an incident attribute to associate with an incident in a FortiSIEM rule?',
      choices:['Operator','Event attribute','Event type','Subpattern','Filter attribute'],
      correct:[1,3,4],
      explanation:'An incident attribute needs the event attribute to surface, the subpattern it belongs to, and the filter attribute used to look it up. The operator and event type are not part of that mapping.'
    },
    {
      id:'FSIEM-18', category:C.RULES, type:'single', image:'18',
      text:'Refer to the exhibit. If a user account is locked after five failed login attempts, how many times will this rule be triggered if three individual users all fail their login 10 times?',
      choices:['Three','One','Five','Fifteen'],
      correct:[0],
      explanation:'The rule groups by Reporting Device, Reporting IP and User, so each user is evaluated independently. Three users → three triggers.'
    },
    {
      id:'FSIEM-19', category:C.RULES, type:'single', image:null,
      text:'A rule that detects network connections to an SSH server is triggering constantly in response to background internet traffic and must be tuned. Which method is used to tune this rule and solve the issue?',
      choices:[
        'Increase the time window on the FortiSIEM rule.',
        'Update the Group By attribute to include only allowed host IP addresses.',
        'Block connections from unauthorized networks before they reach the server.',
        'Increase the COUNT (Matched Events) value in the subpattern.'
      ],
      correct:[3],
      explanation:'Raising the COUNT threshold prevents single background connection attempts from triggering the rule, filtering out the noise.'
    },
    {
      id:'FSIEM-20', category:C.RULES, type:'multiple', image:'20',
      text:'Refer to the exhibit. Which two items can be referenced in the incident details when this rule is triggered and creates an incident?',
      choices:['Domain Account Lockout','Reporting Device','User','Event Type','COUNT(Matched Events)'],
      correct:[1,2],
      explanation:'Only the attributes listed in the subpattern\'s Group By column become part of the incident details — here, Reporting Device and User.'
    },
    {
      id:'FSIEM-25', category:C.RULES, type:'multiple', image:null,
      text:'Which two categories can you map to the MITRE ATT&CK coverage tables on FortiSIEM?',
      choices:['Rules','Threats','CMDB Entries','Incidents','Procedures'],
      correct:[0,3],
      explanation:'FortiSIEM maps Rules and Incidents to MITRE ATT&CK tactics and techniques to compute coverage.'
    },
    {
      id:'FSIEM-30', category:C.RULES, type:'single', image:null,
      text:'An analyst wants to create a rule from a new analytic search they just performed. Which method is the most efficient way for you to create the rule?',
      choices:[
        'Make a new rule using the Create Rule option in the Actions menu.',
        'Manually re-create the analytics search in the rule configuration.',
        'Save the search as a template, and create a new rule from the template.',
        'Copy and paste the raw analytics search text into a rule subpattern.'
      ],
      correct:[0],
      explanation:'The Actions menu on the search results includes a Create Rule option that converts the current search directly into a rule.'
    },
    {
      id:'FSIEM-34', category:C.RULES, type:'single', image:null,
      text:'Rules on FortiSIEM are usually processed as events are collected (streaming). How can you create a rule to evaluate events over an 8-hour period?',
      choices:[
        'Configure a crontab process on the FortiSIEM supervisor.',
        'Configure a report to run the analytical query and run the report every 8 hours.',
        'Set the Evaluation Mode to Scheduled under the General tab.',
        'Configure a 28,000-second time window under the Define Conditions tab.'
      ],
      correct:[2],
      explanation:'Rules that need to run over long windows should use the Scheduled evaluation mode instead of streaming, so the engine queries the data on a schedule.'
    },
    {
      id:'FSIEM-40', category:C.RULES, type:'single', image:'40',
      text:'Refer to the exhibits. You are troubleshooting why the rule shown in the exhibit is generating incidents for successful Remote Desktop Protocol (RDP) connections with correct logins. It should only be triggering when a person fails a login three or more times to the target device when connecting with RDP. What is causing the rule to be triggered by correct login events?',
      choices:[
        'The subpattern relationship "RDP_Connection:User = Failed_Logon:User" never matches.',
        'The Boolean between the subpatterns is incorrect.',
        'The attribute types in the subpatterns do not match.',
        'The RDP login is different from the login used to access the target device.'
      ],
      correct:[2],
      explanation:'The subpatterns compare attributes of different data types (e.g. one is an IP address, one is a username), so the join condition never resolves the way the rule author intended.'
    },
    {
      id:'FSIEM-43', category:C.RULES, type:'single', image:null,
      text:'Which rule logic should you use to apply a user entity and behavior analytics (UEBA) tag to an event for a failed login incident by the account JSmith?',
      choices:[
        'User CONTAIN smith',
        'Username IS jsmith',
        'User = smith',
        'Username START WITH smith'
      ],
      correct:[1],
      explanation:'UEBA tags match on the Username attribute using the IS operator to hit the exact account, in this case jsmith.'
    },
    {
      id:'FSIEM-44', category:C.RULES, type:'multiple', image:null,
      text:'What are two required components in a rule?',
      choices:['Tag','Clear policy','Subpattern','Detection technology'],
      correct:[2,3],
      explanation:'Every FortiSIEM rule needs a subpattern to define what to match and a detection technology (event, flow, performance, etc.) that tells the engine what type of data to evaluate.'
    },
    {
      id:'FSIEM-45', category:C.RULES, type:'single', image:'45',
      text:'Refer to the exhibits. Three events are collected over 10 minutes from two servers: Server A and Server B. Based on the settings for the rule subpattern and a 10-minute condition window, how many incidents will the servers generate?',
      choices:[
        'Server A will generate one incident and Server B will not generate any incidents.',
        'Server A will not generate any incidents and Server B will not generate any incidents.',
        'Server A will generate three incidents and server B will generate one incident.',
        'Server A will generate one incident and Server B will generate one incident.'
      ],
      correct:[0],
      explanation:'The rule compares AVG(CPU Util) against the device\'s CMDB CPU Critical Threshold. Server A\'s samples cross its 90% threshold, Server B\'s do not cross its 70% threshold, so only Server A fires.'
    },
    {
      id:'FSIEM-46', category:C.RULES, type:'single', image:null,
      text:'You want to create a rule with multiple subpatterns but trigger an incident only if three different subpatterns are matched over a 24-hour period. Where must you define the time period that the rule uses to evaluate all the subpatterns?',
      choices:[
        'Define the time window in each individual subpattern.',
        'Define the time window under the General tab of the rule.',
        'Define the time window under the Define Condition tab of the rule.',
        'Define the time window in the Define Action section of the rule.'
      ],
      correct:[2],
      explanation:'The rule-wide evaluation window is set on the Define Condition step, which governs how all subpatterns are aggregated together.'
    },
    {
      id:'FSIEM-49', category:C.RULES, type:'single', image:'49',
      text:'Refer to the exhibits. You want the rule shown in the exhibit to trigger when three failed login attempts occur within 3 minutes. Which condition time window and aggregate values are correct for your objective?',
      choices:[
        'Time window 180 seconds, aggregate value 3',
        'Time window 180 seconds, aggregate value 2',
        'Time window 540 seconds, aggregate value 3',
        'Time window 60 seconds, aggregate value 3'
      ],
      correct:[1],
      explanation:'With COUNT(Matched Events) > 2, the third event in the window trips the rule, satisfying the "three failed attempts" requirement. 180 seconds is 3 minutes.'
    },
    {
      id:'FSIEM-53', category:C.RULES, type:'multiple', image:null,
      text:'Which two ways are rule tags used on FortiSIEM?',
      choices:['Event searches','Playbook filtering','Zero trust network access (ZTNA) enforcement on FortiClient EMS','Administrative user permissions'],
      correct:[0,1],
      explanation:'Rule tags are consumed by event searches and by playbook filters to select the relevant incidents.'
    },
    {
      id:'FSIEM-58', category:C.RULES, type:'single', image:null,
      text:'You are creating a rule to fill a gap in your organization\'s MITRE ATT&CK rule coverage matrix. How can you associate the rule with an appropriate tactics, techniques and procedures (TTP) category?',
      choices:[
        'Assign the TTP category to one of the incidents generated by the rule.',
        'Add the rule directly in the Rule Coverage matrix under the appropriate TTP section.',
        'Configure the appropriate TTP category in the Define Action section of the rule.',
        'Assign the TTP category in the aggregate section of the rule subpattern.'
      ],
      correct:[2],
      explanation:'The TTP category is configured on the Define Action step of the rule, which feeds the coverage matrix.'
    },
    {
      id:'FSIEM-61', category:C.RULES, type:'multiple', image:null,
      text:'A critical server is sending traffic that is triggering a high severity outbound intrusion prevention system (IPS) permitted IPS exploit rule. This traffic must be allowed. Which two items must you configure to prevent this server from triggering the incident?',
      choices:[
        'Modify the group by parameters to exclude the IP address.',
        'Modify the subpattern filter to exclude the IP address.',
        'Modify the aggregate count in the subpattern.',
        'Create a rule exception for the IP address.',
        'Change the time window on the rule conditions.'
      ],
      correct:[1,3],
      explanation:'Excluding the server\'s IP in the subpattern filter stops the event from matching, and a rule exception prevents the rule from firing for that specific asset.'
    },
    {
      id:'FSIEM-69', category:C.RULES, type:'single', image:'69',
      text:'Refer to the exhibit. What is this rule attempting to match?',
      choices:[
        'Failed VPN logon attempts from three or more different outside countries.',
        'Failed VPN logon events from a source outside the home country.',
        'Failed VPN logon attempts from three or more different sources inside the home country.',
        'Excessive VPN logon failures from a source inside the home country.'
      ],
      correct:[0],
      explanation:'The group-by and threshold combination is designed to catch distributed failed VPN logons — three or more distinct sources from outside the home country.'
    },
    {
      id:'FSIEM-71', category:C.RULES, type:'single', image:null,
      text:'Which statement about FortiSIEM performance threshold metrics is true?',
      choices:[
        'FortiSIEM has customizable global and individual device thresholds for performance metrics.',
        'FortiSIEM has hardcoded global and customizable individual device thresholds for performance metrics.',
        'FortiSIEM uses hardcoded global and device thresholds for all performance metrics.',
        'FortiSIEM uses only global thresholds for performance metrics.'
      ],
      correct:[0],
      explanation:'Thresholds are fully customizable at both the global level and the individual device (CMDB) level, letting you override the global value per asset.'
    },
    {
      id:'FSIEM-74', category:C.RULES, type:'multiple', image:'74',
      text:'Refer to the exhibits. Which two conditions will match this rule and subpatterns?',
      choices:[
        'A user connects to the wrong IP address for an RDP session five times with saved credentials.',
        'A user runs a brute force password cracker against an RDP server.',
        'A user using RDP over SSL VPN fails to log in to an application five times.',
        'A user fails twice to log in when connecting through Remote Desktop Protocol (RDP).'
      ],
      correct:[1,2],
      explanation:'The rule chains a successful RDP connection followed by multiple failed logons. Both brute-force attempts against RDP and repeated failures via RDP over SSL VPN match this pattern.'
    },
    {
      id:'FSIEM-76', category:C.RULES, type:'single', image:null,
      text:'Several new internal servers are generating incidents and must be excluded from several FortiSIEM rules. How must you tune rules to exclude several undiscovered devices from rules?',
      choices:[
        'Add them to a device group that is being filtered by the rules.',
        'Add the devices to a rule exclusion automation policy.',
        'Add their associated discovery credentials.',
        'Add them to the global exclusion list.'
      ],
      correct:[0],
      explanation:'Rules filter on CMDB device groups, so adding the new servers to an already-filtered group excludes them from every rule that references it.'
    },

    /* ═══════════════════════════════════════════════════════════
       INCIDENTS, NOTIFICATIONS, AND REMEDIATION
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FSIEM-2', category:C.INCIDENT, type:'single', image:'2',
      text:'Refer to the exhibit. If the Capture Variable step ingests the source IP address from an incident and the Block Source IP on FGT step blocks that source IP address on the configured firewall, what will happen when this playbook is executed?',
      choices:[
        'A single source IP address from the incident will be blocked on the first playbook connector.',
        'The same source IP address will be blocked on all three firewalls.',
        'Three different source IP addresses, depending on the network configuration of the firewalls, will be blocked.',
        'A different source IP address, depending on the organization, will be blocked on all three firewalls.'
      ],
      correct:[1],
      explanation:'The playbook captures one source IP, then the three parallel connectors apply the same block to all three FortiGate firewalls.'
    },
    {
      id:'FSIEM-7', category:C.INCIDENT, type:'single', image:null,
      text:'You want to reference the first source IP address from an incident in a playbook. Which option shows the correct Jinja syntax for using a variable for the source IP address in a FortiSIEM playbook?',
      choices:[
        'srcipAddr.records[0]',
        'record(srcipAddr)',
        'vars.input.records[0].srcipAddr',
        'srcipAddr(1)'
      ],
      correct:[2],
      explanation:'Playbooks expose the first incident record via the vars.input.records array, so the source IP is vars.input.records[0].srcipAddr.'
    },
    {
      id:'FSIEM-11', category:C.INCIDENT, type:'single', image:'11',
      text:'Refer to the exhibits. If a rule containing the automation policy shown in the exhibit is triggered, what will happen?',
      choices:[
        'Associated source IP addresses will be blocked on all FortiGate firewalls in the Banking organization.',
        'Associated source IP addresses will be blocked on all devices in the Banking organization.',
        'Associated source IP addresses will be blocked on all FortiGate firewalls.',
        'Associated source IP addresses will be blocked on two FortiGate firewalls.'
      ],
      correct:[3],
      explanation:'The remediation script targets two specific FortiGate devices (DevicesFortiGate508 and DevicesFortiGate400), so only those two firewalls receive the block.'
    },
    {
      id:'FSIEM-12', category:C.INCIDENT, type:'multiple', image:null,
      text:'Which two ways can an automation service playback be triggered?',
      choices:[
        'Manually, through an event in an analytics search',
        'Manually, through the incident details menu',
        'Automatically, when a dashboard threshold is reached',
        'Automatically, through an automation policy'
      ],
      correct:[1,3],
      explanation:'Playbooks can be run manually from an incident\'s details menu or triggered automatically by an automation policy matching the rule.'
    },
    {
      id:'FSIEM-14', category:C.INCIDENT, type:'single', image:null,
      text:'How does FortiSIEM update the incident details if the same rule triggers repeatedly?',
      choices:[
        'FortiSIEM updates the Incident Count value and Last Seen timestamp.',
        'FortiSIEM changes the incident status to Repeated, and updates the Last Seen timestamp.',
        'FortiSIEM generates a new incident each time the rule triggers and updates all the First Seen and Last Seen timestamps.',
        'FortiSIEM generates a new incident based on the Rule Frequency value, and updates the First Seen and Last Seen timestamps.'
      ],
      correct:[0],
      explanation:'Repeat triggers aggregate into the existing incident by incrementing Incident Count and updating the Last Seen timestamp.'
    },
    {
      id:'FSIEM-17', category:C.INCIDENT, type:'single', image:'17',
      text:'Refer to the exhibit. You want to create a dashboard like the one shown in the exhibit on your FortiSIEM device. Which item defines the data that these widgets display?',
      choices:[
        'FortiSIEM UEBA tags',
        'FortiSIEM reports',
        'FortiSIEM discovery rules',
        'FortiSIEM incidents'
      ],
      correct:[1],
      explanation:'Every dashboard widget is backed by an underlying FortiSIEM report that defines the query used to populate it.'
    },
    {
      id:'FSIEM-28', category:C.INCIDENT, type:'multiple', image:null,
      text:'How can an administrator restrict the application of an automation policy on FortiSIEM?',
      choices:[
        'Apply the automation policy to a specific Incident and Incident Groups',
        'Apply the automation policy to specific Rules and Rule Groups',
        'Apply the automation policy to specific Event Types',
        'Apply the automation policy to specific Organizations'
      ],
      correct:[1,3],
      explanation:'Automation policies are scoped by the rules or rule groups they bind to, and by the organizations they affect.'
    },
    {
      id:'FSIEM-36', category:C.INCIDENT, type:'multiple', image:'36',
      text:'Refer to the exhibit. Which two things happen when this automation policy triggers?',
      choices:[
        'No notification or remediation is performed.',
        'A remediation script is run.',
        'A clear notification is sent to the SOC manager dashboard.',
        'An email is sent to the defined email.'
      ],
      correct:[1,3],
      explanation:'The policy has both "Send Email/SMS/Webhook to the target users" and "Run Remediation/Script" enabled, so both fire.'
    },
    {
      id:'FSIEM-37', category:C.INCIDENT, type:'single', image:'37',
      text:'Refer to the exhibit. According to the automation policy configuration shown in the exhibit, what happens if an associated rule triggers?',
      choices:[
        'FortiSIEM runs the remediation script.',
        'FortiSIEM sends an email.',
        'FortiSIEM executes all the actions.',
        'FortiSIEM runs everything except the playbook, because the playbook and the remediation script perform similar functions.'
      ],
      correct:[2],
      explanation:'Every action checkbox that is available on this policy is ticked, so all enabled actions run when the rule triggers.'
    },
    {
      id:'FSIEM-38', category:C.INCIDENT, type:'multiple', image:'38',
      text:'Refer to the exhibit. Which two actions can you select in an automation policy to trigger an API call to block an IP address on a FortiGate?',
      choices:[
        'Open Remedy ticket using the configuration set in',
        'Send Email/SMS/Webhook to the target users',
        'Invoke an Integration Policy',
        'Run Remediation/Script',
        'Run Playbook on Incident Trigger'
      ],
      correct:[2,4],
      explanation:'Blocking an IP via API on FortiGate is achieved through an integration policy (which calls the Fortinet Security Fabric) or by running a playbook whose connector invokes the FortiGate API.'
    },
    {
      id:'FSIEM-39', category:C.INCIDENT, type:'single', image:'39',
      text:'Refer to the exhibit. Why would the two entries shown in the exhibit be included in an incident activity history?',
      choices:[
        'Multiple new incidents have occurred and has triggered the rule threshold.',
        'An analyst resolved and cleared the incident and the Do not notify when an incident is cleared by system option is not enabled in the automation policy.',
        'The system cleared the incident and is configured to Send Email/SMS/Webhook to the target users.',
        'An administrator has enabled the Notify on Incident Cleared option.'
      ],
      correct:[2],
      explanation:'The first entry shows the incident was auto-cleared by FortiSIEM, and the second shows an email was sent — so the automation policy had email notification and the "notify on system cleared" option active.'
    },
    {
      id:'FSIEM-47', category:C.INCIDENT, type:'single', image:null,
      text:'An analyst wants to run a remediation playbook when a user fails a VPN login five times from an external machine. Where do they associate the remediation playbook with the triggering rule?',
      choices:[
        'In an automation policy',
        'In the associated playbook under Remediation',
        'In the associated rule under Action',
        'In an incident policy'
      ],
      correct:[0],
      explanation:'Remediation playbooks are bound to rules through automation policies, not on the rule itself.'
    },
    {
      id:'FSIEM-56', category:C.INCIDENT, type:'multiple', image:null,
      text:'In an automation policy, which two methods can you use for notifications when an incident is triggered?',
      choices:['GUI pop-up window','Email','SNMP trap','Assigned FortiSIEM case'],
      correct:[1,3],
      explanation:'Automation policies can send email notifications and assign a FortiSIEM case to an analyst; SNMP trap and GUI pop-ups are not notification actions in a policy.'
    },
    {
      id:'FSIEM-57', category:C.INCIDENT, type:'single', image:null,
      text:'What are four incident status options on FortiSIEM?',
      choices:[
        'Active, cleared, false negative, false positive',
        'Active, auto cleared, cleared manually, system cleared',
        'Active, auto closed, closed manually, system closed',
        'Active, closed, cleared, resolved'
      ],
      correct:[1],
      explanation:'FortiSIEM uses Active, Auto Cleared, Cleared Manually and System Cleared as the four incident status values.'
    },
    {
      id:'FSIEM-70', category:C.INCIDENT, type:'multiple', image:null,
      text:'Which three steps can you reference multiple times in a playbook?',
      choices:['Decision','Automation Policy Trigger','Connector','Set Variable'],
      correct:[0,2,3],
      explanation:'Decision, Connector and Set Variable steps can be referenced from multiple branches of a playbook; the automation policy trigger is a single entry point.'
    },

    /* ═══════════════════════════════════════════════════════════
       ML, UEBA, AND ZTNA
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FSIEM-5', category:C.ML_UEBA, type:'multiple', image:null,
      text:'Which two settings must you configure to allow FortiSIEM to automatically apply tags to devices on FortiClient EMS?',
      choices:[
        'FortiSIEM API credentials defined on FortiClient EMS',
        'Zero trust network access (ZTNA) tags defined on FortiClient EMS',
        'Remediation scripts or playbooks',
        'FortiClient EMS API credentials defined on FortiSIEM'
      ],
      correct:[0,3],
      explanation:'Bidirectional credentials are required — FortiClient EMS needs FortiSIEM credentials to receive requests, and FortiSIEM needs FortiClient EMS credentials to send them.'
    },
    {
      id:'FSIEM-6', category:C.ML_UEBA, type:'single', image:null,
      text:'Which data collection method generates the most comprehensive information for FortiSIEM user entity and behavior analytics (UEBA) models?',
      choices:['Linux log','FortiSIEM Linux agent','Windows Sysmon','Windows UEBA agent'],
      correct:[3],
      explanation:'The Windows UEBA agent collects the richest telemetry — process, network, user, and registry activity — which produces the most complete UEBA training data.'
    },
    {
      id:'FSIEM-9', category:C.ML_UEBA, type:'single', image:'9',
      text:'Refer to the exhibit. The configuration for a machine learning (ML) dataset using anomaly detection is shown. If data for this model is generated every hour, how long must the FortiSIEM device be up before it can produce a valid training set?',
      choices:['10 hours','30 hours','24 hours','3 hours'],
      correct:[0],
      explanation:'The Windows parameter is set to 10, so FortiSIEM needs 10 data points — one per hour — to build a valid statistical baseline.'
    },
    {
      id:'FSIEM-13', category:C.ML_UEBA, type:'single', image:null,
      text:'Which running mode takes the most time to perform machine learning (ML) tasks?',
      choices:['Regression','Forecasting','Local auto','Clustering'],
      correct:[2],
      explanation:'Local auto evaluates multiple candidate algorithms and hyper-parameters, so it takes longer than a single fixed-mode run like Regression, Forecasting or Clustering.'
    },
    {
      id:'FSIEM-22', category:C.ML_UEBA, type:'single', image:'22',
      text:'Refer to the exhibit. You want to use a machine learning (ML) model to train data with the following characteristics shown in the exhibit. Which ML model is the best fit to match the data in the exhibit?',
      choices:['Anomaly detection','Elliptical envelope','Clustering','Forecasting'],
      correct:[2],
      explanation:'The scatter plot shows three clearly separated clusters of points. Clustering (KMeans) is designed exactly for this pattern.'
    },
    {
      id:'FSIEM-26', category:C.ML_UEBA, type:'single', image:'26',
      text:'Refer to the exhibit. What will happen when a device being analyzed by the machine learning (ML) configuration shown in the exhibit has a consistently high memory use?',
      choices:[
        'FortiSIEM will update the regression tables for memory use, and average sent and received bytes.',
        'FortiSIEM will update the model with a higher memory use average value.',
        'FortiSIEM will lower the CPU use trigger requirement for CPU use.',
        'FortiSIEM will trigger an incident for high memory use.'
      ],
      correct:[1],
      explanation:'Memory Util is one of the input features for predicting CPU Util. A consistently high memory value shifts the regression baseline, so FortiSIEM updates the model with the new average.'
    },
    {
      id:'FSIEM-31', category:C.ML_UEBA, type:'single', image:null,
      text:'You want FortiSIEM to automatically add three zero trust network access (ZTNA) tags to a device when that device triggers a custom rule. You want FortiSIEM to push these ZTNA tags to multiple FortiClient EMS servers in the organization. How can you accomplish this?',
      choices:[
        'Create a single playbook with multiple connectors, one for each FortiClient EMS.',
        'Create multiple automation policies, each one pushing a tag to a different FortiClient EMS server.',
        'Create multiple playbooks, one for each FortiClient EMS server, each with a connector for a ZTNA tag.',
        'Create a syslog connection from the FortiClient EMS servers to retrieve ZTNA tag information from FortiSIEM.'
      ],
      correct:[0],
      explanation:'One playbook can fan out to multiple FortiClient EMS connectors in parallel, pushing all three tags to every server.'
    },
    {
      id:'FSIEM-32', category:C.ML_UEBA, type:'single', image:'32',
      text:'Refer to the exhibit. An analyst wants to perform a KMeans machine learning (ML) job on this data. How many N clusters would be a good fit for the data?',
      choices:['Two','50','100','One'],
      correct:[0],
      explanation:'The scatter plot shows two clearly separated groupings of data points, so N=2 is the natural cluster count.'
    },
    {
      id:'FSIEM-41', category:C.ML_UEBA, type:'single', image:null,
      text:'You need a model that predicts a target field based on other fields in a dataset and then triggers an anomaly if the value does not match the prediction. Which machine learning (ML) algorithm will you use to build this type of model?',
      choices:['Regression','Forecasting','Classification','Anomaly detection'],
      correct:[0],
      explanation:'Regression predicts a continuous target value from input features; deviations from the prediction are flagged as anomalies.'
    },
    {
      id:'FSIEM-42', category:C.ML_UEBA, type:'single', image:null,
      text:'When using user and entity behavior analytics (UEBA) on FortiSIEM, what can you use to dynamically supply a list of suspicious IP addresses to FortiGate for blocking?',
      choices:[
        'The Fortinet Security Fabric',
        'Secure Copy Protocol (SCP)',
        'FortiSIEM watchlists',
        'FortiSIEM lookup tables'
      ],
      correct:[2],
      explanation:'UEBA writes suspicious IPs to a FortiSIEM watchlist, which is synced to FortiGate through the Security Fabric integration.'
    },
    {
      id:'FSIEM-48', category:C.ML_UEBA, type:'single', image:'48',
      text:'Refer to the exhibit. You are attempting to tune an anomaly detection machine learning (ML) job. The chart shows there are no anomalies detected, but you are not satisfied with the fit of the ML model. Which adjustment must you make to train the model and ensure a better fit?',
      choices:[
        'Decrease the Multiplier.',
        'Increase the number of Windows.',
        'Increase the Multiplier.',
        'Decrease the number of Windows.'
      ],
      correct:[0],
      explanation:'A lower Multiplier tightens the deviation band, which causes more points to fall outside it — producing anomalies where the current setting finds none.'
    },
    {
      id:'FSIEM-52', category:C.ML_UEBA, type:'single', image:'52',
      text:'Refer to the exhibit. An incorrect configuration is shown. Which setting must you change to successfully apply this configuration to FortiSIEM?',
      choices:[
        'Select the same values in the Fields to use for Prediction and Field to Predict sections.',
        'Set the Run Mode to ML.',
        'Set the Train factor to 70% or greater.',
        'Set the algorithm to Anomaly Detection.'
      ],
      correct:[2],
      explanation:'The Train factor is set to 30, which leaves too little data for training. It must be 70% or higher for a reliable model.'
    },
    {
      id:'FSIEM-59', category:C.ML_UEBA, type:'single', image:null,
      text:'When configuring machine learning (ML), in which step can you modify how the model fits the training data set?',
      choices:['Prepare Data','Train','Statistics','Design'],
      correct:[3],
      explanation:'The Design step is where algorithm parameters that control the fit — such as mode, multiplier and window size — are configured.'
    },
    {
      id:'FSIEM-60', category:C.ML_UEBA, type:'multiple', image:null,
      text:'Which three types of data can you use to train FortiSIEM machine learning (ML)?',
      choices:[
        'CSV files',
        'FortiSIEM analytical reports',
        'FortiSIEM ML job',
        'SQL database',
        'Configuration management database (CMDB)'
      ],
      correct:[0,1,2],
      explanation:'FortiSIEM can ingest CSVs, analytical report results and prior ML job outputs as training data sources.'
    },
    {
      id:'FSIEM-64', category:C.ML_UEBA, type:'multiple', image:null,
      text:'Which two types of information can FortiSIEM retrieve from FortiClient EMS through an external connection?',
      choices:[
        'Zero trust network access (ZTNA) tags',
        'Vulnerability scan events',
        'Device login credentials',
        'Devices with FortiSIEM agents'
      ],
      correct:[0,1],
      explanation:'The FortiClient EMS integration exposes ZTNA tags and vulnerability scan events to FortiSIEM.'
    },
    {
      id:'FSIEM-32', category:C.ML_UEBA, type:'single', image:'32',
      text:'Refer to the exhibit. An analyst wants to perform a KMeans machine learning (ML) job on this data. How many N clusters would be a good fit for the data?',
      choices:['Two','50','100','One'],
      correct:[0],
      explanation:'The scatter plot shows two clearly separated groupings of data points, so N=2 is the natural cluster count.'
    },
    {
      id:'FSIEM-38', category:C.INCIDENT, type:'multiple', image:'38',
      text:'Refer to the exhibit. Which two actions can you select in an automation policy to trigger an API call to block an IP address on a FortiGate?',
      choices:[
        'Open Remedy ticket using the configuration set in',
        'Send Email/SMS/Webhook to the target users',
        'Invoke an Integration Policy',
        'Run Remediation/Script',
        'Run Playbook on Incident Trigger'
      ],
      correct:[2,4],
      explanation:'Blocking an IP via API on FortiGate is achieved through an integration policy (which calls the Fortinet Security Fabric) or by running a playbook whose connector invokes the FortiGate API.'
    },
    {
      id:'FSIEM-40', category:C.RULES, type:'single', image:'40',
      text:'Refer to the exhibits. You are troubleshooting why the rule shown in the exhibit is generating incidents for successful Remote Desktop Protocol (RDP) connections with correct logins. It should only be triggering when a person fails a login three or more times to the target device when connecting with RDP. What is causing the rule to be triggered by correct login events?',
      choices:[
        'The subpattern relationship "RDP_Connection:User = Failed_Logon:User" never matches.',
        'The Boolean between the subpatterns is incorrect.',
        'The attribute types in the subpatterns do not match.',
        'The RDP login is different from the login used to access the target device.'
      ],
      correct:[2],
      explanation:'The subpatterns compare attributes of different data types (e.g. one is an IP address, one is a username), so the join condition never resolves the way the rule author intended.'
    }

  ];

  window.ExamRegistry.setBank('fsiem', QUESTIONS);
})();
