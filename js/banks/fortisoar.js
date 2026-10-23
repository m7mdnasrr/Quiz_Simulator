/* ═══════════════════════════════════════════════════════════════
   Bank — FortiSOAR 7.6 Administrator (NSE 7 · Security Operations)
   -----------------------------------------------------------------
   Domains match the official exam blueprint:
     1. Incident Response
     2. Playbooks & Automation
     3. Threat Hunting
     4. Threat Hunting & Analytics
     5. Integration & Connectors
     6. Architecture & Administration

   Images live in  images/fortisoar/  named by question number.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const C = {
    INCIDENT: 'Incident Response',
    PLAYBOOK: 'Playbooks & Automation',
    HUNTING:  'Threat Hunting',
    ANALYTICS:'Threat Hunting & Analytics',
    INTEGRATION:'Integration & Connectors',
    ARCH:     'Architecture & Administration'
  };

  const QUESTIONS = [

    /* ── THREAT HUNTING ─────────────────────────────────────── */
    {
      id:'SOAR-1', category:C.HUNTING, type:'multiple', image:null,
      text:'Review the incident report: An attacker identified employee names, roles, and email patterns from public press releases, which were then used to craft tailored emails. The emails were directed to recipients to review an attached agenda using a link hosted off the corporate domain. Which two MITRE ATT&CK tactics best fit this report?',
      choices:['Reconnaissance','Discovery','Initial Access','Defense Evasion'],
      correct:[0,2],
      explanation:'Gathering names/emails from public sources is Reconnaissance. Sending tailored phishing emails to gain entry is Initial Access.'
    },
    {
      id:'SOAR-2', category:C.HUNTING, type:'multiple', image:null,
      text:'Which three are threat hunting activities?',
      choices:[
        'Enrich records with threat intelligence.',
        'Automate workflows.',
        'Generate a hypothesis.',
        'Perform packet analysis.',
        'Tune correlation rules.'
      ],
      correct:[0,2,3],
      explanation:'Threat hunting involves hypothesis generation, data analysis (like packet analysis), and threat intelligence enrichment. Tuning rules and automating workflows are operational/SOC tasks, not proactive hunting.'
    },
    {
      id:'SOAR-6', category:C.HUNTING, type:'multiple', image:null,
      text:'Based on the Pyramid of Pain model, which two statements accurately describe the value of an indicator and how difficult it is for an adversary to change?',
      choices:[
        'IP addresses are easy because adversaries can spoof them or move them to new resources.',
        'Tactics, techniques, and procedures are hard because adversaries must adapt their methods.',
        'Artifacts are easy because adversaries can alter file paths or registry keys.',
        'Tools are easy because often, multiple alternatives exist.'
      ],
      correct:[0,1],
      explanation:'At the bottom of the pyramid, IP addresses are trivial for attackers to change. At the top, TTPs are very hard to change because they define the adversary\'s core behavior.'
    },
    {
      id:'SOAR-10', category:C.HUNTING, type:'single', image:'10',
      text:'Refer to the exhibit. Which method most effectively reduces the attack surface of this organization?',
      choices:[
        'Forward all firewall logs to the security information and event management (SIEM) system.',
        'Enable deep inspection on firewall policies.',
        'Implement macrosegmentation.',
        'Remove unused devices.'
      ],
      correct:[2],
      explanation:'Macrosegmentation (breaking the network into smaller segments) limits lateral movement and reduces the attack surface more effectively than removing devices or enabling logging.'
    },
    {
      id:'SOAR-15', category:C.HUNTING, type:'multiple', image:null,
      text:'Review the incident report: Packet captures show a host maintaining periodic TLS sessions that imitate normal HTTPS traffic but run on TCP 8443 to a single external host. An analyst flags the traffic as potential command-and-control. During the same period, the host issues frequent DNS queries with oversized TXT payloads to an attacker-controlled domain, transferring staged files. Which two MITRE ATT&CK techniques best describe this activity?',
      choices:[
        'Non-Standard Port',
        'Exploitation of Remote Services',
        'Exfiltration Over Alternative Protocol',
        'Hide Artifacts'
      ],
      correct:[0,2],
      explanation:'Running traffic on TCP 8443 is Non-Standard Port. Using DNS TXT records to transfer data is Exfiltration Over Alternative Protocol.'
    },
    {
      id:'SOAR-19', category:C.HUNTING, type:'single', image:null,
      text:'A partner organization recently had sensitive data exfiltrated by a well-known adversary group. You are tasked with threat hunting to see if your organization is also affected. Which action must you take first?',
      choices:[
        'Use a packet analyzer to capture and review all traffic flows on critical devices.',
        'Use threat intelligence to enrich the IP addresses of all destinations.',
        'Review the tactics, techniques, and procedures of the adversary.',
        'Review historical logs to establish a baseline for normal bandwidth usage.'
      ],
      correct:[2],
      explanation:'Before hunting, you must understand what you are looking for. Reviewing the adversary\'s TTPs provides the hypothesis needed to search effectively.'
    },
    {
      id:'SOAR-28', category:C.HUNTING, type:'single', image:'28',
      text:'Refer to the exhibit. A compromised PC establishes an SSH connection to an engineering build server, which then relays HTTPS traffic to reach servers that would otherwise have blocked access from the LAN. Which technique is used for this attack?',
      choices:[
        'Port knocking',
        'Protocol tunneling',
        'Exfiltration over C2 channel',
        'Man-in-the-middle (MITM)'
      ],
      correct:[1],
      explanation:'SSH port forwarding (tunneling) is used to bypass network restrictions and relay traffic.'
    },
    {
      id:'SOAR-40', category:C.HUNTING, type:'single', image:'40',
      text:'Refer to the exhibit. A compromised PC establishes an SSH connection to an engineering build server, which then relays HTTPS traffic to reach servers that would otherwise have blocked access from the LAN. Assume the LAN to Engineering and Engineering to IT network flows are allowed by design. Which action best mitigates this specific threat?',
      choices:[
        'Enforce SSH version 2 across the organization.',
        'Reject incoming non-standard port HTTPS traffic to the IT servers.',
        'Enable SSL/SSH deep inspection on the firewall.',
        'Disable SSH port forwarding on the build server.'
      ],
      correct:[3],
      explanation:'Since the traffic is legitimate by design, stopping the abuse means disabling the tunneling capability (port forwarding) on the intermediate host.'
    },
    {
      id:'SOAR-43', category:C.HUNTING, type:'single', image:null,
      text:'A partner organization recently suffered a distributed denial of service (DDoS) attack, but the adversary\'s identity and TTPs remain unknown. Your SOC has not received any relevant threat intelligence from the partner organization, but you are asked to determine whether similar activity could be happening in your environment. Which threat hunting action should you perform first?',
      choices:[
        'Configure SIEM rules to alert when inbound traffic exceeds baseline thresholds.',
        'Use a packet analyzer to capture and review all traffic flows on critical devices.',
        'Develop a hunting hypothesis based on how DDoS can be executed against your network.',
        'Use threat intelligence to enrich the IP addresses of all external source IP addresses.'
      ],
      correct:[2],
      explanation:'Without TTPs or IOCs, you must formulate a hypothesis based on general DDoS mechanics to guide your search.'
    },
    {
      id:'SOAR-49', category:C.HUNTING, type:'multiple', image:null,
      text:'Which two statements best reflect the relationship between threat hunting and incident response in a mature SOC?',
      choices:[
        'Incident response relies on existing detection.',
        'Threat hunting proactively looks for potential or missed threats.',
        'Threat hunting and incident response should operate in isolation to avoid bias.',
        'Threat hunting begins after incident response is completed.'
      ],
      correct:[0,1],
      explanation:'Incident response is reactive (relies on alerts), while threat hunting is proactive (looks for missed threats). They work together iteratively.'
    },
    {
      id:'SOAR-52', category:C.HUNTING, type:'multiple', image:null,
      text:'Review the incident report: A fake HR login page was sent to several employees through email. The page copied the company\'s branding and captured usernames and passwords. The attacker later used the stolen credentials to sign in through the company\'s web VPN. Which two MITRE ATT&CK tactics best characterize this report?',
      choices:['Initial Access','Command and Control','Credential Access','Defense Evasion'],
      correct:[0,2],
      explanation:'The phishing email provides Initial Access, and the fake page harvesting passwords is Credential Access.'
    },
    {
      id:'SOAR-63', category:C.HUNTING, type:'multiple', image:null,
      text:'An analyst prioritizes blocking IP addresses and domains from every phishing campaign. Based on the Pyramid of Pain model, which two statements accurately describe this approach?',
      choices:[
        'It helps identify strategic weaknesses in adversary infrastructure.',
        'It imposes a high operational cost on adversaries when their attacks are detected.',
        'It focuses on observable network indicators rather than underlying attack methods.',
        'It relies on blocking indicators that adversaries can easily replace or rotate.'
      ],
      correct:[2,3],
      explanation:'IPs and domains are low-level indicators. They are easy to change, forcing the defender into a reactive loop rather than targeting the TTPs.'
    },
    {
      id:'SOAR-68', category:C.HUNTING, type:'multiple', image:null,
      text:'Review the incident report: Shortly after being compromised, an infected host collected its own network configuration and connection details, then began sending low volume connection attempts to multiple internal addresses to identify responding hosts. Which two MITRE ATT&CK techniques best describe this activity?',
      choices:['System Network Connections Discovery','Network Sniffing','Lateral Movement','Active Scanning'],
      correct:[0,3],
      explanation:'Collecting local configs is Discovery. Sending connection attempts to identify live hosts is Active Scanning.'
    },
    {
      id:'SOAR-74', category:C.HUNTING, type:'multiple', image:null,
      text:'An analyst is reviewing the MITRE ATT&CK matrix in FortiNDR. Which two statements about the matrix are correct?',
      choices:[
        'The matrix column headers represent MITRE ATT&CK tactics.',
        'The tiles under each column represent the associated techniques.',
        'A gray bar identifies a technique with a critical active detection.',
        'Secondary techniques always represent behavior directly observed in network traffic.'
      ],
      correct:[0,1],
      explanation:'The matrix is organized by Tactics as columns and Techniques as tiles.'
    },

    /* ── PLAYBOOKS & AUTOMATION ─────────────────────────────── */
    {
      id:'SOAR-5', category:C.PLAYBOOK, type:'single', image:null,
      text:'When you use a manual trigger to save user input as a variable, what is the correct Jinja expression to reference the variable?',
      choices:[
        '{{ vars.input.params.<variable_name> }}',
        '{{ globalVars.<variable_name> }}',
        '{{ vars.item.<variable_name> }}',
        '{{ vars.steps.<variable_name> }}'
      ],
      correct:[0],
      explanation:'Manual triggers save user input parameters under `vars.input.params`.'
    },
    {
      id:'SOAR-7', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'Which three statements describe the process of mapping data to a parameter in a referenced playbook step?',
      choices:[
        'Step 3: Map data to the parameter in the Referenced playbook step in the parent playbook.',
        'You define the parameter in the referenced playbook.',
        'You pass the parameter from the parent playbook.',
        'No option D'
      ],
      correct:[0,1,2],
      explanation:'Referenced playbooks accept parameters defined within them, mapped from the parent playbook.'
    },
    {
      id:'SOAR-11', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'Refer to the exhibit. You configured a playbook named False Positive Close, and want to run it to verify if it works. However, when you click Execute and search for the playbook, you do not see it listed. Which two reasons could be the cause of the problem?',
      choices:[
        'The playbook must first be published using the Application Editor.',
        'Another instance of the playbook is currently executing.',
        'The Alerts module is not among the list of modules the playbook can execute on.',
        'The manual trigger is configured to require record input to run.'
      ],
      correct:[2,3],
      explanation:'If the playbook is bound to specific modules (like Incidents) but you are trying to run it on Alerts, it won\'t show. Also, if the trigger requires records and none are selected, it may not be available.'
    },
    {
      id:'SOAR-12', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'What are three capabilities of the built-in FortiSOAR Jinja editor?',
      choices:[
        'It renders output by combining Jinja expressions and JSON input.',
        'It checks the validity of a Jinja expression.',
        'It creates new records in bulk.',
        'It loads the environment JSON of a recently executed playbook.'
      ],
      correct:[0,1,3],
      explanation:'The Jinja editor is a testing tool. It does not create records; it renders output, validates syntax, and can load previous execution data.'
    },
    {
      id:'SOAR-16', category:C.PLAYBOOK, type:'single', image:'16',
      text:'Refer to the exhibit. You created a threat hunting playbook to perform a search query using the FortiSIEM connector. However, when you run the playbook, you do not see any output. What is the most likely cause?',
      choices:[
        'Confirm that the event logs matching your criteria exist on FortiSIEM.',
        'Check the documentation for the input and output for the action.',
        'Configure a Set Variable step to save the output.',
        'Confirm that the FortiSIEM connector is up.'
      ],
      correct:[0],
      explanation:'The exhibit shows the query returned `totalCount: 0`. The playbook is working, but there is no matching data in FortiSIEM.'
    },
    {
      id:'SOAR-17', category:C.PLAYBOOK, type:'single', image:'17',
      text:'Refer to the exhibit. You want to create a playbook on FortiSOAR that allows you to: 1. Manually input a range of IP addresses. 2. Use the connector action to retrieve a list of devices from FortiSIEM within that range. 3. For each returned result, create an asset record. Which combination and order of step operations fulfills the requirements with the fewest required playbook steps?',
      choices:[
        '1) On create trigger, 2) Connector action, 3) Code snippet, 4) Create record',
        '1) Manual trigger, 2) Set variable, 3) Connector action, 4) Create record, 5) Update record',
        '1) Manual trigger, 2) Connector action, 3) Create record',
        '1) Connector action, 2) Create record, 3) Update record'
      ],
      correct:[2],
      explanation:'The connector action automatically loops over the returned list of devices and creates the records, so you don\'t need a separate loop or code snippet step.'
    },
    {
      id:'SOAR-18', category:C.PLAYBOOK, type:'multiple', image:'18',
      text:'Using the default data ingestion wizard in FortiSOAR, place the incident handling workflow from FortiSIEM to FortiSOAR in the correct sequence.',
      choices:[
        'Step 1: FortiSIEM event log',
        'Step 2: FortiSIEM Incident',
        'Step 3: FortiSOAR alert',
        'Step 4: FortiSOAR Incident'
      ],
      correct:[0,1,2,3],
      explanation:'The standard flow is: Event log (raw data) -> SIEM Incident -> SOAR Alert -> SOAR Incident.'
    },
    {
      id:'SOAR-21', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'Which three statements accurately describe step utilities in a playbook step?',
      choices:[
        'The Timeout step utility sets a maximum execution time for the step and terminates playbook execution if exceeded.',
        'The Loop step utility can only be used once in each playbook step.',
        'The Variables step utility stores the output of the step directly in the step itself.',
        'The Condition step utility behavior changes depending on if a loop exists for that step.'
      ],
      correct:[1,2,3],
      explanation:'Loop, Variables, and Condition utilities have specific behaviors. For example, a Condition step inside a loop evaluates per iteration.'
    },
    {
      id:'SOAR-26', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'You want to automate a workflow on FortiSOAR so that whenever an incident with critical severity is moved to the containment phase, it is automatically reassigned to an L3 analyst as the incident lead. Which two steps will accomplish this task?',
      choices:[
        'Create an On Update trigger with trigger conditions that match the containment phase and critical severity.',
        'Create an Update Record step to set the incident lead.',
        'Create a Condition step to check the incident phase and update the incident lead.',
        'Create a Find Record step to find matching incidents.',
        'Set the playbook schedule to run persistently.'
      ],
      correct:[0,1],
      explanation:'The trigger fires the playbook when the condition is met, and the Update Record step modifies the incident lead.'
    },
    {
      id:'SOAR-29', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'You are trying to create a playbook that creates a manual task showing a list of public IPv6 addresses. You were successful in extracting all IP addresses from a previous action into a variable called ip_list, which contains both private and public IPv4 and IPv6 addresses. You must now filter the results to display only public IPv6 addresses. Which two Jinja expressions can accomplish this task?',
      choices:[
        "{{vars.ip_list | ipv6addr('public')}}",
        "{{vars.ip_list | ipaddr('public') | ipv6}}",
        "{{vars.ip_list | ipaddr('private') | ipv6}}",
        "{{vars.ip_list | ipv6 | ipaddr('public')}}"
      ],
      correct:[1,3],
      explanation:'The `ipaddr` filter with `public` can be chained with `ipv6`, or `ipv6` can be chained with `ipaddr("public")`.'
    },
    {
      id:'SOAR-33', category:C.PLAYBOOK, type:'single', image:null,
      text:'You created a new playbook and executed it as a test. However, it failed to run. You want to investigate, but you do not see details about the error. What is the reason for the lack of details?',
      choices:[
        'The playbook logging level must be debug.',
        'The user that executed the playbook does not have the necessary permissions.',
        'The Ignore Error option is enabled.',
        'The connector is deactivated.'
      ],
      correct:[0],
      explanation:'To see detailed step-by-step execution logs, you must set the logging level to DEBUG.'
    },
    {
      id:'SOAR-34', category:C.PLAYBOOK, type:'multiple', image:'34',
      text:'Refer to the exhibit. What is the correct Jinja expression to filter the results to show only the MD5 hash values?',
      choices:[
        'vars.artifacts',
        'json_query',
        '("data.results[?type == \'FileHash-MD5\']")',
        'value'
      ],
      correct:[0,1,2,3],
      explanation:'The full Jinja expression is `{{ vars.artifacts | json_query("data.results[?type == \'FileHash-MD5\']") | value }}`.'
    },
    {
      id:'SOAR-37', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'When configuring an Ingest Bulk Feed playbook step, which two restrictions must you consider?',
      choices:[
        'It cannot use step output from a connector action.',
        'It is slower than the Create Record step.',
        'It will not trigger On Create triggers.',
        'It will not trigger On Update triggers.'
      ],
      correct:[2,3],
      explanation:'Bulk ingestion bypasses the standard record lifecycle to improve performance, meaning workflows tied to On Create/Update will not fire.'
    },
    {
      id:'SOAR-41', category:C.PLAYBOOK, type:'single', image:null,
      text:'You created a war room and want to run a connector action to look up the reputation of a domain. Then, you need to save the output for your team to review. However, there is a lot of output, and you want to limit the amount of information attached to the war room. How do you accomplish this?',
      choices:[
        'From the returned output, select only the output keys you want.',
        'Apply a workspace filter to show only relevant fields.',
        'Use the Investigate tab to map only the fields you want.',
        'Lower the playbook logging level before executing the connector.'
      ],
      correct:[0],
      explanation:'When executing a manual action in a war room, you can select specific JSON keys from the output to attach as evidence.'
    },
    {
      id:'SOAR-42', category:C.PLAYBOOK, type:'single', image:'42',
      text:'Refer to the exhibit. The global playbook logging level is set to DEBUG. What is the primary risk of leaving this setting enabled?',
      choices:[
        'Incomplete logs because the DEBUG level does not include WARN and ERROR logs.',
        'Disabled per-playbook logging because the global DEBUG level cannot be overridden.',
        'Reduced ability to trace playbook steps because the DEBUG level skips step outputs.',
        'Excessive log volume and execution overhead across all playbooks, which can impact performance and storage.'
      ],
      correct:[3],
      explanation:'DEBUG logs everything. Leaving it on globally creates massive log files and slows down execution.'
    },
    {
      id:'SOAR-47', category:C.PLAYBOOK, type:'single', image:'47',
      text:'Refer to the exhibit. You want to create a playbook on FortiSOAR that allows you to: 1. Manually input an IP address. 2. Use the connector action to retrieve a device from FortiSIEM with that IP address. 3. Ask the SOC manager to review the information. 4. If the manager approves, an asset record is created. Which combination and order of step operations fulfills the requirements with the fewest required playbook steps?',
      choices:[
        '1) Manual trigger, 2) Connector action, 3) Approval, 4) Create Record',
        '1) Connector action, 2) Approval, 3) Create record, 4) Update record',
        '1) Manual trigger, 2) Set Variable, 3) Connector action, 4) Set Variable, 5) Approval, 6) Create record',
        '1) On Create trigger, 2) Connector action, 3) Manual Task, 4) Create record'
      ],
      correct:[0],
      explanation:'A manual trigger handles the input, the connector fetches data, Approval blocks execution, and Create Record finishes the job.'
    },
    {
      id:'SOAR-50', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'You configured a new module named Users. Next, you want to configure a playbook that creates users from ingested data. When new records are created, you want to ensure that duplicate users do not overwrite existing user records and their fields. However, you also want the playbook to continue running even if duplicates are encountered. Which two actions fulfill the requirements?',
      choices:[
        'Use the Stop the create process option in the Create Record step.',
        'Ensure the Users module has record uniqueness conditions configured.',
        'Configure the Execution Mode to run in parallel.',
        'Use the Do not create new record (keep existing intact) option in the Create Record step.'
      ],
      correct:[1,3],
      explanation:'The module needs uniqueness defined so SOAR knows what a duplicate is. The Create Record step should be set to ignore and keep existing.'
    },
    {
      id:'SOAR-53', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'You wish to use FortiAI to help you design playbooks. Which two configurations on FortiSOAR are required?',
      choices:[
        'Train the FortiSOAR machine learning engine.',
        'Install and configure the OpenAI connector.',
        'Grant CRUD permissions to the Playbook user.',
        'Install the FortiAI solution pack and run the configuration wizard.'
      ],
      correct:[1,3],
      explanation:'FortiAI leverages an LLM (OpenAI connector) and requires the FortiAI solution pack to function.'
    },
    {
      id:'SOAR-54', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'Which two statements accurately describe the Custom API Endpoint playbook trigger?',
      choices:[
        'It supports token-based, basic, and no authentication.',
        'One custom API endpoint can trigger multiple playbooks at the same time.',
        'It supports HTTP POST, GET, and PUT methods.',
        'An external system can initiate a playbook using an arbitrary endpoint on FortiSOAR.'
      ],
      correct:[0,3],
      explanation:'Custom API endpoints allow external systems to trigger playbooks over HTTP, and support basic/token/no auth.'
    },
    {
      id:'SOAR-58', category:C.PLAYBOOK, type:'multiple', image:'58',
      text:'Refer to the exhibit. What is the correct order of Jinja expressions to filter the results to show only the IP address values?',
      choices:[
        'slot 1 ---> vars.artifacts.results.data',
        'slot 2 ---> json_query',
        'slot 3 ---> ("[?type==\'IP Address\']")',
        'slot 4 ---> value'
      ],
      correct:[0,1,2,3],
      explanation:'The full expression is `{{ vars.artifacts.results.data | json_query("[?type==\'IP Address\']") | value }}`.'
    },
    {
      id:'SOAR-61', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'A FortiSOAR playbook includes a Wait step that is configured to pause execution after initiating a reputation lookup on an indicator. Which two configurations of the Wait step are valid?',
      choices:[
        'The playbook resumes when a specified amount of time has elapsed.',
        'The playbook resumes when the indicator record is updated.',
        'The Wait step can retry a specific step in the playbook at scheduled intervals until it succeeds.',
        'The Wait step, during the AWAITING state, can execute child playbooks.'
      ],
      correct:[0,1],
      explanation:'Wait steps pause for a duration or until a specific record condition changes.'
    },
    {
      id:'SOAR-62', category:C.PLAYBOOK, type:'single', image:null,
      text:'You are trying to create a playbook that uses source data from ingestion to populate the description field of a task. You were successful in saving the source data to a variable called ingestion_data. Now, you must parse the results and extract a list of indicators. Which Jinja expression can accomplish this task?',
      choices:[
        "{{vars.ingestion_data | json_query(\"[?type := 'IOC']\")}}",
        "{{vars.ingestion_data | to_nice_json | ipaddr | hwaddr | email | hash }}",
        "{{vars.ingestion_data | type_debug }}",
        "{{vars.ingestion_data | extract_artifacts }}"
      ],
      correct:[3],
      explanation:'`extract_artifacts` is the built-in filter designed to parse text and pull out indicators.'
    },
    {
      id:'SOAR-65', category:C.PLAYBOOK, type:'single', image:null,
      text:'A very long FortiSOAR playbook failed at step 30 because of an intermittent networking issue, which has now been resolved. You want to finish executing the playbook without repeating earlier steps or losing prior context. Which action should you take?',
      choices:[
        'Use mock input for step 30 and re-run the playbook.',
        'Use the Load ENV JSON option in the Jinja Editor and then render the output.',
        'Use the Rerun From Last Failed Step option from the executed playbook logs.',
        'Add a connector from the trigger to step 30 directly and re-run the playbook.'
      ],
      correct:[2],
      explanation:'FortiSOAR allows you to resume a failed playbook run from the exact step that failed.'
    },
    {
      id:'SOAR-67', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'You want to automate a workflow on FortiSOAR so that whenever an incident is moved to the aftermath phase, it is automatically set to status resolved and assigned to a purple team specialist as incident lead to write an incident report. In addition, a manual task, assigned to the same specialist, will be created so they are aware of the pending work. Which three steps will accomplish this task?',
      choices:[
        'Create a Find Record step to find matching incidents.',
        'Create a Condition step to assign both the incident and task to the specialist.',
        'Create a Manual Task step to assign the task to the specialist.',
        'Create an Update Record step to set the incident lead.',
        'Create an On Update trigger with a trigger condition that matches the aftermath phase.'
      ],
      correct:[2,3,4],
      explanation:'Use an On Update trigger, an Update Record step for the incident, and a Manual Task step for the task.'
    },
    {
      id:'SOAR-69', category:C.PLAYBOOK, type:'single', image:null,
      text:'When you use a loop to iterate through a list of items in a FortiSOAR playbook, what is the correct Jinja expression to reference the variable in each iteration?',
      choices:[
        '{{vars.input.params.<variable_name>}}',
        '{{vars.steps.<variable_name>}}',
        '{{globalVars.<variable_name>}}',
        '{{vars.item.<variable_name>}}'
      ],
      correct:[3],
      explanation:'Inside a loop, the current item is accessed via `vars.item`.'
    },
    {
      id:'SOAR-71', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'A FortiSOAR administrator creates a playbook with a manual trigger. The administrator selects several incident records before executing the playbook. Which two statements are correct?',
      choices:[
        'The selected records are accessible using {{vars.input.records}}.',
        'The records array contains one object for each selected incident record.',
        'The selected records are accessible using {{globalVars.records}}.',
        'A manual trigger can process only one selected record per execution.'
      ],
      correct:[0,1],
      explanation:'Manual triggers pass the selected records as an array under `vars.input.records`.'
    },
    {
      id:'SOAR-72', category:C.PLAYBOOK, type:'multiple', image:null,
      text:'An administrator uses a Set Variable step in a FortiSOAR playbook. Which two statements about the variable are correct?',
      choices:[
        'The variable can be referenced by the remaining steps in the playbook.',
        'The variable automatically becomes a system-wide global variable.',
        'Multiple variables can be created by using Set Variable steps.',
        'The variable is available only to steps that executed before it was defined.'
      ],
      correct:[0,2],
      explanation:'Variables created are scoped to the playbook run and are available downstream to all subsequent steps.'
    },

    /* ── THREAT HUNTING & ANALYTICS ─────────────────────────── */
    {
      id:'SOAR-8', category:C.ANALYTICS, type:'multiple', image:null,
      text:'Which three factors does the FortiSIEM rules engine use to determine the count when it evaluates the aggregate condition COUNT (Matched Events) on a specific subpattern?',
      choices:['Group By attributes','Data source','Time window','Search filter','Incident action'],
      correct:[0,2,3],
      explanation:'The count is constrained by the filter (what events), the time window (when), and the Group By (how they are bucketed).'
    },
    {
      id:'SOAR-9', category:C.ANALYTICS, type:'multiple', image:'9',
      text:'Refer to the exhibit. You are trying to find traffic flows to destinations that are in Europe or Asia, for hosts in the local LAN segment. However, the query returns no results. Which three mistakes can you see in the query shown in the exhibit?',
      choices:[
        'The null value cannot be used with the IS NOT operator.',
        'The time range must be Absolute for queries that use configuration management database (CMDB) groups.',
        'There are missing parentheses between the first row (Group: Europe) and the second row (Group: Asia).',
        'The Source IP row operator must be BETWEEN 10.0.0.0, 10.200.200.254.',
        'The logical operator for the first row (Group: Europe) must be OR.'
      ],
      correct:[2,3,4],
      explanation:'The logic is mixing AND/OR without grouping (parentheses). Source IP needs the `IN` or `BETWEEN` operator for the subnet, and the Europe/Asia groups need an OR between them.'
    },
    {
      id:'SOAR-23', category:C.ANALYTICS, type:'single', image:'23',
      text:'Which operator correctly matches the requirement: Attribute: Event Type, Value: Group: Logon Success?',
      choices:['CONTAIN','IN','HAS','IS'],
      correct:[1],
      explanation:'To match a value against a CMDB Group (which is a list), you must use the `IN` operator.'
    },
    {
      id:'SOAR-25', category:C.ANALYTICS, type:'multiple', image:null,
      text:'Which two statements accurately describe the process to create a new rule from a search using FortiSIEM analytics?',
      choices:[
        'Raw event logs cannot be used for incident rule creation.',
        'The incident action is automatically configured based on the event type.',
        'All search filter rows are added into a single subpattern.',
        'The default aggregate condition will always be COUNT (Matched Events) = 1.'
      ],
      correct:[2,3],
      explanation:'When converting a search to a rule, all filters are placed in one subpattern, and the default aggregate count is set to 1.'
    },
    {
      id:'SOAR-32', category:C.ANALYTICS, type:'multiple', image:'32',
      text:'Refer to the exhibit. What are the two mistakes in the incident subpattern rule configuration?',
      choices:[
        'The subpattern is missing a time window definition.',
        'The aggregate operator is incorrect.',
        'The Group By attributes conflict with each other.',
        'The mandatory Event Type attribute is missing.'
      ],
      correct:[1,3],
      explanation:'The aggregate operator is `<` (less than) instead of `>=`, and the mandatory Event Type attribute is missing from the filter.'
    },
    {
      id:'SOAR-35', category:C.ANALYTICS, type:'multiple', image:'35',
      text:'Refer to the exhibit. Based on the configuration shown in the exhibit, what are two misconfigurations?',
      choices:[
        'The subpattern relationships between FailedLogin and FailedLogin2 should be removed.',
        'A logical operator is missing in the SuccessLogin subpattern to evaluate the subpattern relationships.',
        'The SuccessLogin subpattern is not correlated with any FailedLogin or FailedLogin2 attributes.',
        'The time window should be lowered from 900 seconds to reduce false positives.'
      ],
      correct:[0,2],
      explanation:'There is no need to correlate FailedLogin to FailedLogin2. Also, SuccessLogin is floating without a relationship to the failed logins.'
    },
    {
      id:'SOAR-38', category:C.ANALYTICS, type:'single', image:null,
      text:'You are using FortiSIEM analytics to reference the configuration management database (CMDB) event type categories. Attribute: Event Type, Value: Group: Logon Success. Which operator should you use?',
      choices:['CONTAIN','IN','HAS','IS'],
      correct:[1],
      explanation:'The `IN` operator is used when checking if an attribute is contained within a Group.'
    },
    {
      id:'SOAR-39', category:C.ANALYTICS, type:'multiple', image:'39',
      text:'You are searching for permitted traffic to public destination IP addresses outside of North America. Which three steps do you need to use to configure the Group By and Display Fields window to show only aggregated results?',
      choices:[
        'Add the Count (Matched Events) attribute row.',
        'Remove the Event Receive Time attribute row.',
        'Add the SUM (Matched Events) attribute row.',
        'Remove the Raw Event Log attribute row.',
        'Sort the Destination IP attribute row by descending order.'
      ],
      correct:[0,1,3],
      explanation:'To get meaningful aggregates, you must remove high-cardinality fields (like Time and Raw Log) and add the Count.'
    },
    {
      id:'SOAR-44', category:C.ANALYTICS, type:'multiple', image:null,
      text:'You are configuring a new FortiSIEM rule to trigger incidents based on receiving a number of either Fortigate-Traffic-Violation OR Fortigate-Traffic-Denied event types. You decided to create two separate subpatterns and correlate them using the OR operator. Which two benefits does this approach provide?',
      choices:[
        'Each subpattern can use a different time window condition.',
        'Each subpattern can use a different aggregate condition.',
        'Each subpattern can trigger its own notification policy.',
        'Each subpattern can use a different group by condition.'
      ],
      correct:[1,3],
      explanation:'Separate subpatterns allow for granular control over how events are counted and grouped before they are correlated.'
    },
    {
      id:'SOAR-45', category:C.ANALYTICS, type:'single', image:null,
      text:'Refer to this partial incident output: Condition: if this Pattern occurs within any 1800-second time window... Which conclusion can you make about this incident?',
      choices:[
        'It was triggered by a baseline profile incident rule.',
        'It was triggered from a FortiAI machine learning rule.',
        'It was triggered by a correlation rule.',
        'It was triggered by a lookup table.'
      ],
      correct:[2],
      explanation:'The text "if this Pattern occurs within any 1800-second time window" is the syntax of a standard correlation rule condition.'
    },
    {
      id:'SOAR-48', category:C.ANALYTICS, type:'single', image:'48',
      text:'Refer to the exhibit. You want to configure a FortiSIEM rule that triggers when a FortiMail device reports at least 100 recipient verification failures for different email accounts in the domain acmecorp.net. What would you add or modify to accomplish this task?',
      choices:[
        'Change the aggregate to COUNT (Distinct Mail Receiver) = 100.',
        'Add a filter for Mail Receiver >= 100.',
        'Change the status attribute filter from Status CONTAIN FAIL to Status CUSTOM EXPRESSION FAIL >= 100.',
        'Add a filter for Mail Receiver CONTAIN acmecorp.net.'
      ],
      correct:[0],
      explanation:'To count *different* users, you must use the `Distinct` keyword in the aggregate function.'
    },
    {
      id:'SOAR-56', category:C.ANALYTICS, type:'multiple', image:null,
      text:'You need to create a nested query in FortiSIEM that satisfies the following conditions: 1. Find all devices discovered by any FortiSIEM Windows Agent. 2. From those devices, identify those that have generated Windows Login Failure events. Which two query components should be used for this nested query?',
      choices:['Outer Event Query','Outer CMDB Query','Inner CMDB Query','Inner Event Query'],
      correct:[1,3],
      explanation:'The outer query looks at the logs (Event Query), and the inner query pulls the device list (CMDB Query).'
    },
    {
      id:'SOAR-57', category:C.ANALYTICS, type:'multiple', image:null,
      text:'You want to trigger an incident when multiple failed logins from the same host are followed by a successful login on that same host within 15 minutes. The rule must correlate all events by source IP address and user. Which three configurations achieve this goal?',
      choices:[
        'Ensure both subpatterns have the same aggregate condition.',
        'Define a time window condition for each subpattern.',
        'Configure two subpatterns—one for failed logins and one for the successful login.',
        'Apply sequential logic using a FOLLOWED_BY operator between the two subpatterns.',
        'Define the subpattern relationships and constraints.'
      ],
      correct:[2,3,4],
      explanation:'You need two subpatterns, a sequential `FOLLOWED_BY` logic, and relationships tying the source IP/user together.'
    },
    {
      id:'SOAR-66', category:C.ANALYTICS, type:'multiple', image:null,
      text:'You created a subpattern to detect at least five failed login attempts from any single user and source IP address to the same network device. However, it is creating more incidents than you had anticipated. What are the two mistakes in the incident subpattern rule configuration?',
      choices:[
        'The aggregate condition is too restrictive.',
        'The Group By attributes is missing the User field.',
        'The mandatory Event Parser Name attribute is missing.',
        'The Group By attributes is missing the Source IP field.'
      ],
      correct:[1,3],
      explanation:'Without grouping by User and Source IP, the rule counts all failures globally instead of separating them per attacker.'
    },

    /* ── INCIDENT RESPONSE ──────────────────────────────────── */
    {
      id:'SOAR-3', category:C.INCIDENT, type:'single', image:'3',
      text:'Refer to the exhibit. How do you add a piece of evidence to the Action Logs Marked As Evidence area?',
      choices:[
        'By tagging output or a workspace comment with the keyword Evidence',
        'By linking an indicator to the war room',
        'By creating an evidence collection task and attaching a file',
        'By executing a playbook with the Save Execution Logs option enabled'
      ],
      correct:[0],
      explanation:'Adding the tag "Evidence" to a log or comment in the war room moves it to the evidence section.'
    },
    {
      id:'SOAR-4', category:C.INCIDENT, type:'multiple', image:'4',
      text:'Refer to the exhibits. Assume that the traffic flows are identical, except for the destination IP address. There is only one FortiGate in network address translation (NAT) mode in this environment. Based on the exhibits, which two conclusions can you make about this FortiSIEM incident?',
      choices:[
        'The client 10.200.3.219 is conducting active reconnaissance.',
        'FortiGate is not routing the packets to the destination hosts.',
        'The destination hosts are not responding.',
        'FortiGate is blocking the return flows.'
      ],
      correct:[0,2],
      explanation:'The logs show connections timing out (rcvdpkt=0). The client is scanning (active recon), and the lack of packets indicates the destination hosts are not responding.'
    },
    {
      id:'SOAR-13', category:C.INCIDENT, type:'single', image:'13',
      text:'Refer to the exhibit. You are investigating an open incident and want to add records from the Tickets module, a custom module, to the visual correlation widget. Assume there are already linked ticket records to the incident. How do you accomplish this?',
      choices:[
        'Ingest ticket records through a custom connector.',
        'Tag ticket records with the incident ID.',
        'Edit the incident template and add the Tickets module to the graph.',
        'Define more module relationships under Correlation Settings.'
      ],
      correct:[3],
      explanation:'The visual correlation graph shows related records based on the module relationships defined in Correlation Settings.'
    },
    {
      id:'SOAR-14', category:C.INCIDENT, type:'single', image:null,
      text:'Refer to the exhibits. How is the investigation and remediation output generated on FortiSIEM?',
      choices:[
        'By exporting an incident',
        'By running an incident report',
        'By using FortiAI to summarize the incident',
        'By viewing the Context tab of an incident'
      ],
      correct:[2],
      explanation:'The exhibit shows a structured, AI-generated summary and remediation plan, which is the hallmark of FortiAI.'
    },
    {
      id:'SOAR-31', category:C.INCIDENT, type:'multiple', image:null,
      text:'Which two phases are part of the FortiSOAR incident handling process but are not phases in the NIST 800-61 revision 2 model?',
      choices:['Preparation','Confirmation','Detection','Identification'],
      correct:[1,3],
      explanation:'FortiSOAR adds Confirmation and Identification as distinct steps before full analysis.'
    },
    {
      id:'SOAR-36', category:C.INCIDENT, type:'single', image:null,
      text:'You configured a queue called L1 Analysts, and generated shifts to cover morning, evenings, and overnight shifts, with two members. However, you noticed that all members of the queue are assigned ingested alerts in a round-robin fashion, instead of only users who are currently on shift. What is the problem?',
      choices:[
        'Shift-based assignment is disabled.',
        'The shift lead needs to disable automatic shift handover.',
        'The Queueable option is disabled for the alerts module.',
        'The queue rules conflict with the user assignment rules.'
      ],
      correct:[0],
      explanation:'You must explicitly enable Shift-based assignment in the queue configuration for SOAR to respect the shifts.'
    },
    {
      id:'SOAR-46', category:C.INCIDENT, type:'single', image:'46',
      text:'Refer to the exhibit. You are investigating an open incident and want to add records from the Tickets module, a custom module, to the visual correlation widget. How do you accomplish this?',
      choices:[
        'Ingest ticket records through a custom connector.',
        'Edit the incident template and add the Tickets module to the graph.',
        'Define more module relationships under Correlation Settings.',
        'Tag ticket records with the incident ID.'
      ],
      correct:[2],
      explanation:'Same as Q13. The graph relies on relationships defined in Correlation Settings.'
    },
    {
      id:'SOAR-64', category:C.INCIDENT, type:'single', image:null,
      text:'You suspect your organization has been a victim of numerous incidents carried out by the same threat actor. Which option allows you to group the incidents and track them?',
      choices:[
        'Add a common tag to correlate them.',
        'Mark one incident as the parent and run a playbook to close the child incidents.',
        'Select those incidents and use the Merge function.',
        'Create a campaign and link related records to it.'
      ],
      correct:[3],
      explanation:'FortiSOAR campaigns are designed to group related incidents and track a threat actor over time.'
    },
    {
      id:'SOAR-70', category:C.INCIDENT, type:'multiple', image:null,
      text:'An incident response team is using a FortiSOAR war room to investigate a security incident. Which two statements about the war room tabs are correct?',
      choices:[
        'The Investigate tab contains the artifacts and evidence associated with the incident.',
        'The Timeline tab displays the chronological history of activities performed in the war room.',
        'The Communication tab is used to configure connector credentials.',
        'The Task Management tab displays only closed incidents from the same campaign.'
      ],
      correct:[0,1],
      explanation:'Investigate holds artifacts/evidence, and Timeline shows the history. Connector creds are in settings, and Task Management shows tasks, not closed incidents.'
    },

    /* ── INTEGRATION & CONNECTORS ───────────────────────────── */
    {
      id:'SOAR-20', category:C.INTEGRATION, type:'multiple', image:'20',
      text:'Refer to the exhibit. You must configure the FortiGate connector to allow FortiSOAR to perform actions on a firewall. However, the connection fails. Which two configurations are required?',
      choices:[
        'Trusted hosts must be enabled and the FortiSOAR IP address must be permitted.',
        'The VDOM name must be specified, or set to VDOM_1, if VDOMs are not enabled on FortiGate.',
        'HTTPS must be enabled on the FortiGate interface that FortiSOAR will communicate with.',
        'An API administrator must be created on FortiGate with the appropriate profile, along with a generated API key to configure on the connector.'
      ],
      correct:[2,3],
      explanation:'You need HTTPS enabled on the interface and an API admin/user with a generated key.'
    },
    {
      id:'SOAR-27', category:C.INTEGRATION, type:'multiple', image:'27',
      text:'Refer to the exhibits. You configured the FortiSIEM connector on FortiSOAR. However, when you try to save the configuration, you see an error: "status code: 401, error: Invalid credentials were provided Or Request Not authorized". Which two configurations are the cause?',
      choices:[
        'The organization should be Super.',
        'The Visibility option must be set to Public.',
        'FortiSOAR cannot reach FortiSIEM.',
        'The user credentials do not match FortiSIEM.'
      ],
      correct:[0,3],
      explanation:'A 401 means auth failed. The user/pass is wrong, or the user is not in the correct Organization (Super).'
    },
    {
      id:'SOAR-59', category:C.INTEGRATION, type:'multiple', image:'59',
      text:'Refer to the exhibits. You configured the FortiGate connector on FortiSOAR. You want to allow FortiSOAR (10.200.200.160) to perform actions on FortiGate (172.16.200.1). However, the connection attempt fails. Assume that the FortiGate connector is configured correctly on the FortiSOAR side. Which two configurations are required on FortiGate?',
      choices:[
        'FortiSOAR IP address must be added under Trusted Hosts.',
        'The FortiGate interface role must be set to Custom API Endpoint.',
        'The administrator profile must have System read and write permissions.',
        'HTTPS must be enabled on the FortiGate interface that FortiSOAR will communicate with.'
      ],
      correct:[2,3],
      explanation:'The API profile needs System read/write access, and the interface needs HTTPS enabled.'
    },

    /* ── ARCHITECTURE & ADMINISTRATION ──────────────────────── */
    {
      id:'SOAR-24', category:C.ARCH, type:'multiple', image:null,
      text:'You are designing a FortiSOAR hybrid multi-tenant deployment. The architecture must support remote tenant execution and automation inside segmented networks. Which three elements are true for this design?',
      choices:[
        'The secure message exchange must be a dedicated instance instead of an embedded one.',
        'The FortiSOAR master cluster can host shared tenants, with strict data isolation between them.',
        'Each tenant or agent has a dedicated, access-controlled space on a secure message exchange for message routing.',
        'FortiSOAR tenant nodes or agents use TCP port 5671 to communicate with a secure message exchange.',
        'FortiSOAR agents are deployed on the master cluster to improve high availability (HA) performance.'
      ],
      correct:[1,2,3],
      explanation:'Shared tenancy works with isolation, agents connect via MQ over port 5671, and each gets a dedicated space on the message exchange.'
    },
    {
      id:'SOAR-30', category:C.ARCH, type:'multiple', image:'30',
      text:'Match the FortiSIEM device type to its description.',
      choices:[
        'Agent -> Collects endpoint logs and system changes',
        'Collector -> Offloads log collection and performance monitoring at remote sites',
        'Supervisor -> Acts as the central management node, hosting the UI, CMDB, dashboards, and reports',
        'Worker -> Executes real-time event correlation, analytics, and historical searches to handle processing load'
      ],
      correct:[0,1,2,3],
      explanation:'Agent = endpoint, Collector = remote site log collection, Supervisor = management, Worker = heavy compute/analytics.'
    },
    {
      id:'SOAR-51', category:C.ARCH, type:'single', image:null,
      text:'You want to use the queue and shift management feature to automatically assign newly created low priority tasks to members of the L1 queue. However, you are unable to add the Tasks module to the Module Types list. What is the problem?',
      choices:[
        'The Queueable option is disabled for the Tasks module.',
        'There is a higher priority queue for the Tasks module.',
        'The Tasks module is not supported by queue and shift management.',
        'Shift-based assignment is disabled.'
      ],
      correct:[0],
      explanation:'You must enable the "Queueable" flag on the module configuration before it can be used in a queue.'
    },
    {
      id:'SOAR-55', category:C.ARCH, type:'single', image:null,
      text:'A large enterprise FortiSIEM deployment is experiencing delays in log correlation and analytics. Which architectural adjustment is most appropriate?',
      choices:[
        'Limit the number of rules using streaming mode.',
        'Add more workers.',
        'Add more collectors.',
        'Increase supervisor CPU and memory.'
      ],
      correct:[1],
      explanation:'Workers handle real-time correlation and analytics. Adding workers distributes the processing load.'
    },
    {
      id:'SOAR-60', category:C.ARCH, type:'multiple', image:'60',
      text:'Match the FortiSOAR architecture element to its description.',
      choices:[
        'Shared Tenancy -> One FortiSOAR instance is shared by multiple tenants.',
        'Secure Message Exchange -> This creates a secure channel used for distributed tenants and agent communication.',
        'Distributed Tenancy -> Each tenant operates an independent FortiSOAR instance with its own database and configuration.',
        'Agent -> This enables remote automation by executing playbook actions in segmented or isolated networks.'
      ],
      correct:[0,1,2,3],
      explanation:'Shared = same instance, Distributed = separate instances, Secure Message Exchange = communication bus, Agent = remote executor.'
    },
    {
      id:'SOAR-73', category:C.ARCH, type:'multiple', image:null,
      text:'A FortiSOAR administrator is configuring access to playbooks. Which two statements about playbook permissions and ownership are correct?',
      choices:[
        'A user requires the Execute permission on the Playbooks module to run a playbook.',
        'New playbooks are public by default.',
        'Private playbooks are visible to all users with Read permission.',
        'Exporting a private playbook preserves its private status and ownership assignments.'
      ],
      correct:[0,1],
      explanation:'To run a playbook you need Execute permission. When created, playbooks are public unless explicitly made private.'
    }

  ];

  window.ExamRegistry.setBank('fortisoar', QUESTIONS);
})();