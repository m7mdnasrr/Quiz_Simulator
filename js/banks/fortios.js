/* ═══════════════════════════════════════════════════════════════
   Bank — FortiOS 7.6 Administrator
   -----------------------------------------------------------------
   Schema (every question object):
     {
       id:          "FOS-Qn",               // unique string
       category:    "<one of domainOrder>", // must match registry.js
       type:        "single" | "multiple",
       image:       "44" | null,            // → images/44.png
       text:        "…question stem…",
       choices:     ["A","B","C","D"],
       correct:     [ 2 ],                  // indices into `choices`
       explanation: "Why the answer is right."
     }
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const C = {
    DEPLOY:  'Deployment and System Configuration',
    POLICY:  'Firewall Policies and Authentication',
    CONTENT: 'Content Inspection',
    ROUTING: 'Routing',
    VPN:     'VPN'
  };

  const QUESTIONS = [

    /* ═══════════════════════════════════════════════════════════
       DEPLOYMENT AND SYSTEM CONFIGURATION
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FOS-Q6', category:C.DEPLOY, type:'single', image:'6',
      text:'Refer to the exhibit. The NOC team connects to the FortiGate GUI with the NOC_Access admin profile. They request that their GUI sessions do not disconnect too early during inactivity. What must the administrator configure to answer this specific request from the NOC team?',
      choices:[
        'Move NOC_Access to the top of the list to ensure all profile settings take effect.',
        'Increase the idle-timeout value of the Override Idle Timeout parameter in the NOC_Access admin profile.',
        'Ensure that all NOC Access users are assigned the super_admin role to guarantee access.',
        'Increase the admittance value under config system accprofile NOC_Access.'
      ],
      correct:[1],
      explanation:'Admin profiles expose an "Override Idle Timeout" setting. Raising it extends the GUI inactivity window for members of that profile without touching the global admintimeout value.'
    },
    {
      id:'FOS-Q7', category:C.DEPLOY, type:'multiple', image:'7',
      text:'Refer to the exhibit. Based on this partial configuration, what are the two possible outcomes when FortiGate enters conserve mode?',
      choices:[
        'Administrators cannot change the configuration.',
        'FortiGate skips quarantine actions.',
        'Administrators must restart FortiGate to allow new sessions.',
        'FortiGate drops new sessions requiring inspection.'
      ],
      correct:[0,1],
      explanation:'With av-failopen one-shot and ips fail-open enable, when memory crosses the extreme threshold FortiGate stops accepting configuration changes and bypasses quarantine/blocking actions, but it still forwards traffic.'
    },
    {
      id:'FOS-Q8', category:C.DEPLOY, type:'single', image:null,
      text:'What is the primary FortiGate election process when the HA override setting is enabled?',
      choices:[
        'Connected monitored ports > Priority > HA uptime > FortiGate serial number',
        'Connected monitored ports > Priority > System uptime > FortiGate serial number',
        'Connected monitored ports > HA uptime > Priority > FortiGate serial number',
        'Connected monitored ports > System uptime > Priority > FortiGate serial number'
      ],
      correct:[0],
      explanation:'With override enabled, the election is deterministic: monitored ports first, then priority, then HA uptime (age in the cluster), then serial number as a final tiebreaker.'
    },
    {
      id:'FOS-Q15', category:C.DEPLOY, type:'multiple', image:null,
      text:'Which two statements describe characteristics of automation stitches?',
      choices:[
        'Actions involve only devices included in the Security Fabric.',
        'An automation stitch can have multiple triggers.',
        'Multiple actions can run in parallel.',
        'Triggers can involve external connectors.'
      ],
      correct:[2,3],
      explanation:'A stitch pairs triggers with actions. Multiple actions can execute in parallel, and triggers may be sourced from external connectors (e.g. FortiGuard, webhooks). A stitch uses one trigger, and actions can target fabric and non-fabric devices.'
    },
    {
      id:'FOS-Q17', category:C.DEPLOY, type:'multiple', image:null,
      text:'Which two statements are true about an HA cluster?',
      choices:[
        'An HA cluster cannot have both in-band and out-of-band management interfaces at the same time.',
        'Link failover triggers a failover if the administrator sets the interface down on the primary device.',
        'When sniffing the heartbeat interface, the administrator must see the IP address 169.254.0.2.',
        'HA incremental synchronization includes FIB entries and IPsec SAs.'
      ],
      correct:[1,3],
      explanation:'Taking a monitored interface down triggers failover. Incremental HA sync carries runtime state including FIB entries and IPsec SAs. Both in-band and out-of-band management can coexist, and 169.254.0.1 is the primary\'s heartbeat address.'
    },
    {
      id:'FOS-Q29', category:C.DEPLOY, type:'multiple', image:null,
      text:'Which two statements are correct when FortiGate enters conserve mode?',
      choices:[
        'FortiGate continues to run critical security actions, such as quarantine.',
        'FortiGate refuses to accept configuration changes.',
        'FortiGate halts complete system operation and requires a reboot to regain available resources.',
        'FortiGate continues to transmit packets without IPS inspection when the fail-open global setting in IPS is enabled.'
      ],
      correct:[1,3],
      explanation:'In conserve mode FortiGate blocks config changes and, when IPS fail-open is enabled, forwards traffic uninspected. Critical actions like quarantine are also skipped, and a reboot is not required to exit conserve mode.'
    },
    {
      id:'FOS-Q33', category:C.DEPLOY, type:'single', image:'33',
      text:'Refer to the exhibits. An administrator has observed the performance status outputs on an HA cluster for 55 seconds. Which FortiGate is the primary?',
      choices:[
        'HQ-NGFW-2 with the parameter memory-failover-threshold setting',
        'HQ-NGFW-2 with the parameter priority setting',
        'HQ-NGFW-1 with the parameter memory-failover-flip-timeout setting',
        'HQ-NGFW-1 with the parameter override setting'
      ],
      correct:[0],
      explanation:'HQ-NGFW-2 shows the higher memory consumption that crosses the configured memory-failover-threshold, which is what determines the active primary in this memory-based failover scenario.'
    },
    {
      id:'FOS-Q41', category:C.DEPLOY, type:'multiple', image:'41',
      text:'Refer to the exhibits. The exhibits show the system performance output and default configuration of high memory usage thresholds on a FortiGate device. Based on the system performance output, what are the two possible outcomes?',
      choices:[
        'FortiGate has entered conserve mode.',
        'Administrators can access FortiGate only through the console port.',
        'Administrators can change the configuration.',
        'FortiGate drops new sessions.'
      ],
      correct:[0,3],
      explanation:'Memory usage is above the red threshold, so FortiGate enters conserve mode and begins dropping new sessions that require inspection. Configuration changes are refused, and console-only access is not a conserve-mode behaviour.'
    },
    {
      id:'FOS-Q42', category:C.DEPLOY, type:'single', image:'42',
      text:'Refer to the exhibits. Based on the current HA status, an administrator updates the override and priority parameters on HQ-NGFW-1 and HQ-NGFW-2 as shown in the exhibit. What would be the expected outcome in the HA cluster?',
      choices:[
        'HQ-NGFW-1 will synchronize the override disable setting with HQ-NGFW-2.',
        'HQ-NGFW-2 will take over as the primary because it has the override enable setting and higher priority than HQ-NGFW-1.',
        'HQ-NGFW-1 will remain the primary because HQ-NGFW-2 has lower priority.',
        'The HA cluster will become out of sync because the override setting must match on all HA members.'
      ],
      correct:[1],
      explanation:'With override enabled on HQ-NGFW-2 and a higher priority value, it forces a re-election and becomes primary; the override setting does not need to match across members.'
    },
    {
      id:'FOS-Q43', category:C.DEPLOY, type:'multiple', image:'43',
      text:'Refer to the exhibits. An administrator wants to add HQ-ISFW-2 in the Security Fabric. HQ-ISFW-2 is in the same subnet as HQ-ISFW. After configuring the Security Fabric settings on HQ-ISFW-2, the status stays Pending. What can be the two possible reasons?',
      choices:[
        'Upstream FortiGate IP must be set to 10.0.11.254.',
        'SAML Single Sign-On must be set to Manual.',
        'HQ-ISFW-2 must be authorized on HQ-ISFW.',
        'Management IP must be set to 10.0.13.254.'
      ],
      correct:[0,2],
      explanation:'The upstream FortiGate IP is pointing at the wrong address (should be 10.0.11.254, the HQ-ISFW interface), and the downstream device must be explicitly authorized on the upstream FortiGate.'
    },
    {
      id:'FOS-Q49', category:C.DEPLOY, type:'single', image:'49',
      text:'Refer to the exhibits. An administrator creates a new address object on the root FortiGate (HQ-NGFW-1) in the Security Fabric. After synchronization, this object is not available on the downstream FortiGate (HQ-ISFW). What must the administrator do to synchronize the address object?',
      choices:[
        'Change the csf setting on HQ-ISFW (downstream) to set configuration-sync local.',
        'Change the csf setting on HQ-ISFW (downstream) to set saml-configuration-sync default.',
        'Change the csf setting on HQ-NGFW-1 (root) to set fabric-object-unification default.',
        'Change the csf setting on both devices to set downstream-access enable.'
      ],
      correct:[2],
      explanation:'Fabric object unification must be set to "default" on the root FortiGate so address objects are propagated to downstream fabric members.'
    },
    {
      id:'FOS-Q51', category:C.DEPLOY, type:'multiple', image:null,
      text:'What are two characteristics of HA cluster heartbeat IP addresses in a FortiGate device?',
      choices:[
        'Heartbeat interfaces have virtual IP addresses that are manually assigned.',
        'Heartbeat IP addresses are used to distinguish between cluster members.',
        'The heartbeat interface of the primary device in the cluster is always assigned IP address 169.254.0.1.',
        'A change in the heartbeat IP address happens when a FortiGate device joins or leaves the cluster.'
      ],
      correct:[1,3],
      explanation:'The 169.254.0.x heartbeat range is auto-assigned, differentiates members, and changes when a device joins or leaves. IPs are not manually assigned, and 169.254.0.1 is the primary\'s address but not a fixed guarantee.'
    },
    {
      id:'FOS-Q63', category:C.DEPLOY, type:'multiple', image:null,
      text:'An administrator wants to form an HA cluster using the FGCP protocol. Which two requirements must the administrator ensure both members fulfill?',
      choices:[
        'They must have the same HA group ID.',
        'They must have the heartbeat interfaces in the same subnet.',
        'They must have the same number of configured VDoms.',
        'They must have the same hard drive configuration.'
      ],
      correct:[0,3],
      explanation:'FGCP requires matching group-id and matching hardware/drive configuration. Heartbeat interfaces must be directly connected but not on the same subnet, and VDoms are synchronized automatically.'
    },
    {
      id:'FOS-Q64', category:C.DEPLOY, type:'single', image:null,
      text:'FortiGate is integrated with FortiAnalyzer and FortiManager. When creating a firewall policy, which attribute must an administrator include to enhance functionality and enable log recording on FortiAnalyzer and FortiManager?',
      choices:[
        'Policy ID',
        'Log ID',
        'Universally Unique Identifier',
        'Sequence ID'
      ],
      correct:[2],
      explanation:'The policy UUID uniquely identifies a policy across FortiGate, FortiManager and FortiAnalyzer, enabling consistent log correlation and object tracking.'
    },
    {
      id:'FOS-Q71', category:C.DEPLOY, type:'single', image:null,
      text:'An administrator configures FortiGuard servers as DNS servers on FortiGate using default settings. What is true about the DNS connection to a FortiGuard server?',
      choices:[
        'It uses DNS over TLS.',
        'It uses DNS over HTTPS.',
        'It uses UDP 8888.',
        'It uses UDP 53.'
      ],
      correct:[0],
      explanation:'By default FortiGate uses DNS over TLS (DoT) on port 853 to reach FortiGuard DNS servers.'
    },
    {
      id:'FOS-Q73', category:C.DEPLOY, type:'single', image:'73',
      text:'Refer to the exhibits. An administrator configured both members of an HA cluster at the same time. After one week of monitoring, the administrator wants to verify the HA failover performance. How can the administrator force a failover?',
      choices:[
        'The administrator must reset the HA uptime on HQ-NGFW-1.',
        'The administrator must set the parameter override to enable on HQ-NGFW-2.',
        'The administrator must increase the HA priority on HQ-NGFW-2.',
        'The administrator must set the monitored port to down on HQ-NGFW-1.'
      ],
      correct:[3],
      explanation:'Bringing down a monitored interface on the primary is the cleanest way to force a controlled failover and verify failover performance.'
    },
    {
      id:'FOS-Q77', category:C.DEPLOY, type:'multiple', image:null,
      text:'Which two statements about the Security Fabric rating are true?',
      choices:[
        'A license is required to obtain an executive summary in the Security Rating section.',
        'The root FortiGate provides executive summaries of all the FortiGate devices in the Security Fabric.',
        'The Security Posture category provides PCI compliance results.',
        'Security Rating Insights are available only in the Security Rating page.'
      ],
      correct:[1,2],
      explanation:'The root FortiGate aggregates executive summaries for the fabric, and the Security Posture category reports PCI compliance results. A license is not required for the executive summary, and Insights appear in other pages too.'
    },
    {
      id:'FOS-Q79', category:C.DEPLOY, type:'multiple', image:'79',
      text:'Which two statements about the FortiGuard connection are true? (exhibit shows diagnose debug rating output)',
      choices:[
        'FortiGate is using the default port for FortiGuard communication.',
        'FortiGate identified the FortiGuard Server using DNS lookup.',
        'The weight increases as the number of failed packets rises.',
        'You can configure unreliable protocols to communicate with FortiGuard Server.'
      ],
      correct:[2,3],
      explanation:'The debug rating output shows a weight value that increases with failures, and unreliable protocols (UDP) can be selected for FortiGuard communication. The output shows port 8888, and the server was statically configured rather than discovered via DNS.'
    },
    {
      id:'FOS-Q82', category:C.DEPLOY, type:'single', image:null,
      text:'An administrator wants to address shadow IT visibility challenges and prevent users from sending sensitive files outside the organization without proper approval. Which FortiSASE method should the administrator implement to achieve these goals?',
      choices:[
        'Secure SD-WAN access (SSD-WAN)',
        'Secure private access (SPA)',
        'Secure SaaS access (SSA)',
        'Secure internet access (SIA)'
      ],
      correct:[2],
      explanation:'Secure SaaS access (SSA) provides inline CASB-style visibility and control for SaaS/shadow-IT traffic, including DLP for sensitive file uploads.'
    },
    {
      id:'FOS-Q83', category:C.DEPLOY, type:'single', image:null,
      text:'You are configuring FortiAnalyzer on FortiGate. Which step must you take to connect FortiAnalyzer to FortiGate?',
      choices:[
        'Verify the FortiAnalyzer serial number.',
        'Authorize FortiGate on FortiAnalyzer.',
        'Enable disk logging on FortiGate.',
        'Configure UDP port 514 on FortiGate.'
      ],
      correct:[1],
      explanation:'The FortiGate device must be authorized on the FortiAnalyzer before log forwarding is accepted.'
    },
    {
      id:'FOS-Q84', category:C.DEPLOY, type:'single', image:'84',
      text:'Refer to the exhibit. You deployed a FortiGate Cloud-Native Firewall (CNF) in AWS for FortiGate CNF policy enforcement for EC2 instance traffic. Which path does the EC2 traffic take from the EC2 instance to the internet?',
      choices:[
        'EC2 instance → Internet gateway (IGW) → gateway load balancer (GWLB) → FortiGate CNF → internet',
        'EC2 instance → GWLB endpoint (GWLBe) → FortiGate CNF → IGW → internet',
        'EC2 instance → FortiGate CNF → GWLB → GWLBe → IGW → internet',
        'EC2 instance → GWLBe → FortiGate CNF → GWLBe → IGW → internet'
      ],
      correct:[3],
      explanation:'Traffic from the EC2 instance hits the GWLBe, is redirected to the FortiGate CNF VPC for inspection, returns to the GWLBe, and egresses via the IGW.'
    },
    {
      id:'FOS-Q85', category:C.DEPLOY, type:'single', image:null,
      text:'You are onboarding an agentless, secure web gateway (SWG) endpoint for secure internet access (SIA). What will happen to the user\'s non-web traffic?',
      choices:[
        'All the non-web traffic will bypass FortiSASE.',
        'The endpoint will use split tunneling to redirect non-web traffic to FortiSASE.',
        'FortiSASE will use Firewall-as-a-Service (FWaaS) to redirect non-web traffic.',
        'FortiSASE will use SWG to redirect non-web traffic to FortiExtender.'
      ],
      correct:[0],
      explanation:'An agentless SWG endpoint only redirects web (HTTP/HTTPS) traffic. Non-web traffic bypasses FortiSASE entirely.'
    },
    {
      id:'FOS-Q88', category:C.DEPLOY, type:'single', image:'88',
      text:'Refer to the exhibit. A partial cloud topology is shown. You deployed a FortiGate Cloud-Native Firewall (CNF) in AWS. During the deployment, which components must the FortiGate CNF create to handle traffic from the EC2 instance?',
      choices:[
        'The gateway load balancer endpoint (GWLE) in the customer virtual private cloud (VPC).',
        'The GWLB, GWLE, and the internet gateway (IGW) in the customer VPC.',
        'The CNF VPC, customer VPC, and GWLB.',
        'The customer VPC and GWLE.'
      ],
      correct:[0],
      explanation:'FortiGate CNF creates a GWLB endpoint (GWLBe) inside the customer VPC to attract traffic from the EC2 instances.'
    },
    {
      id:'FOS-Q90', category:C.DEPLOY, type:'multiple', image:null,
      text:'Which two components are part of the secure internet access (SIA) agent-based mode on FortiSASE?',
      choices:[
        'VPN policies',
        'FortiSASE Firewall-as-a-Service (FWaaS)',
        'The proxy auto-configuration (PAC) file',
        'FortiExtender'
      ],
      correct:[0,1],
      explanation:'Agent-based SIA uses VPN policies to onboard endpoints and FWaaS to enforce non-web policy on those endpoints. PAC files and FortiExtender belong to other connectivity modes.'
    },
    {
      id:'FOS-Q92', category:C.DEPLOY, type:'single', image:null,
      text:'Which statement correctly describes Fortinet Security Intelligence Access (SIA)?',
      choices:[
        'It provides URL filtering based on static local categories only.',
        'It uses FortiGuard threat intelligence to dynamically block malicious destinations.',
        'It encrypts traffic between FortiGate and FortiAnalyzer.',
        'It is used to authenticate users through FortiAuthenticator.'
      ],
      correct:[1],
      explanation:'SIA leverages FortiGuard threat intelligence to dynamically block malicious destinations in real time, beyond static local categories.'
    },
    {
      id:'FOS-Q93', category:C.DEPLOY, type:'single', image:null,
      text:'What is the primary goal of Fortinet Secure Access Service Edge (SASE)?',
      choices:[
        'To replace on-premises firewalls with standalone cloud firewalls.',
        'To provide secure connectivity and security services from the cloud for remote users.',
        'To manage FortiGate devices using FortiManager.',
        'To analyze logs and events using FortiAnalyzer.'
      ],
      correct:[1],
      explanation:'SASE converges networking and security services in the cloud to deliver secure connectivity and policy enforcement for remote and branch users.'
    },
    {
      id:'FOS-Q94', category:C.DEPLOY, type:'single', image:null,
      text:'When configuring the connection between FortiGate and FortiAnalyzer, which option indicates that reliable traffic is enabled?',
      choices:[
        'The connection status shows a green check icon.',
        'The interface status is set to up.',
        'A padlock icon appears in the connection settings.',
        'The logging mode is set to real-time.'
      ],
      correct:[2],
      explanation:'A padlock icon in the FortiAnalyzer connection settings indicates that reliable (OFTP over TLS) logging is enabled.'
    },
    {
      id:'FOS-Q95', category:C.DEPLOY, type:'single', image:'95',
      text:'An administrator wants to form an HA cluster using the FGCP protocol. Both FortiGate devices are configured with the set override enable command. Arrange the criteria in the order in which the FGCP protocol uses them to elect the primary FortiGate.',
      choices:[
        '1: Connected monitored ports, 2: Priority, 3: HA uptime, 4: FortiGate serial number',
        '1: Connected monitored ports, 2: HA uptime, 3: Priority, 4: FortiGate serial number',
        '1: Priority, 2: Connected monitored ports, 3: HA uptime, 4: FortiGate serial number',
        '1: HA uptime, 2: Priority, 3: Connected monitored ports, 4: FortiGate serial number'
      ],
      correct:[0],
      explanation:'With override enabled, FGCP compares monitored ports, then priority, then HA uptime, then serial number.'
    },
    {
      id:'FOS-Q96', category:C.DEPLOY, type:'single', image:'96',
      text:'The FortiGate device HQ-NGFW-1 with the IP address 10.0.13.254 sends logs to the FortiAnalyzer device with the IP address 10.0.13.125. The administrator wants to verify that reliable logging is enabled on HQ-NGFW-1. Which exhibit helps with the verification?',
      choices:['Image A','Image B','Image C','Image D'],
      correct:[3],
      explanation:'The FortiAnalyzer device-manager view showing the padlock indicator (Image D) confirms reliable logging is active.'
    },
    {
      id:'FOS-DQ1', category:C.DEPLOY, type:'single', image:null,
      text:'An administrator wants to form an HA cluster using the FGCP protocol. Both FortiGate devices are configured with the set override disable command. Arrange the criteria in the order in which the FGCP protocol uses them to elect the primary FortiGate.',
      choices:[
        '1: Connected monitored ports, 2: Priority, 3: HA uptime, 4: FortiGate serial number',
        '1: Connected monitored ports, 2: HA uptime, 3: Priority, 4: FortiGate serial number',
        '1: Priority, 2: Connected monitored ports, 3: HA uptime, 4: FortiGate serial number',
        '1: HA uptime, 2: Priority, 3: Connected monitored ports, 4: FortiGate serial number'
      ],
      correct:[1],
      explanation:'With override disabled, HA uptime takes precedence over priority: monitored ports → HA uptime → priority → serial number.'
    },

    /* ═══════════════════════════════════════════════════════════
       FIREWALL POLICIES AND AUTHENTICATION
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FOS-Q3', category:C.POLICY, type:'single', image:null,
      text:'You have created a web filter profile named restrict_media-profile with a daily category usage quota. When you are adding the profile to the firewall policy, the restrict_media-profile is not listed in the available web profile drop-down. What could be the reason?',
      choices:[
        'The firewall policy is in no-inspection mode instead of deep-inspection.',
        'The inspection mode in the firewall policy is not matching the web filter profile feature set.',
        'The web filter profile is already referenced in another firewall policy.',
        'The naming convention used in the web filter profile is restricting it in the firewall policy.'
      ],
      correct:[1],
      explanation:'A web filter profile built with a flow-based feature set will only appear on policies set to flow-based inspection; a proxy-based profile will only appear on proxy-based policies.'
    },
    {
      id:'FOS-Q10', category:C.POLICY, type:'single', image:null,
      text:'A FortiGate firewall policy is configured with active authentication; however, the user cannot authenticate when accessing a website. Which protocol must FortiGate allow even though the user cannot authenticate?',
      choices:['LDAP','TACACS+','Kerberos','DNS'],
      correct:[3],
      explanation:'DNS must be permitted in the policy so the captive portal and the user\'s browser can resolve the FortiGate authentication FQDN.'
    },
    {
      id:'FOS-Q11', category:C.POLICY, type:'single', image:'11',
      text:'Refer to the exhibit, which shows a partial configuration from the remote authentication server. Why does the FortiGate administrator need this configuration?',
      choices:[
        'To authenticate only the Training user group.',
        'To set up a RADIUS server Secret.',
        'To authenticate and match the Training OU on the RADIUS server.',
        'To authenticate Any FortiGate user groups.'
      ],
      correct:[0],
      explanation:'The Fortinet-Group-Name = Training attribute maps the RADIUS-authenticated user into the matching FortiGate user group, scoping authentication to that group.'
    },
    {
      id:'FOS-Q21', category:C.POLICY, type:'single', image:null,
      text:'A new administrator is configuring FSSO authentication on FortiGate using DC Agent Mode. Which step is NOT part of the expected process?',
      choices:[
        'The DC agent sends login event data directly to FortiGate.',
        'The user logs into the Windows domain.',
        'The collector agent forwards login event data to FortiGate.',
        'FortiGate determines user identity based on the IP address in the FSSO list.'
      ],
      correct:[0],
      explanation:'In DC Agent Mode, the DC agent forwards events to the collector agent, which then relays them to FortiGate. The DC agent never talks to FortiGate directly.'
    },
    {
      id:'FOS-Q22', category:C.POLICY, type:'single', image:null,
      text:'A network administrator is reviewing firewall policies in both Interface Pair View and By Sequence View. The policies appear in a different order in each view. Why is the policy order different in these two views?',
      choices:[
        'Policies in Interface Pair View are prioritized by security levels, while By Sequence View strictly follows the administrator\'s manual ordering.',
        'By Sequence View groups policies based on rule priority, while Interface Pair View always follows the order of traffic logs.',
        'The firewall dynamically reorders policies in Interface Pair View based on recent traffic patterns, but By Sequence View remains static.',
        'Interface Pair View sorts policies based on matching interfaces, while By Sequence View shows the actual processing order of rules.'
      ],
      correct:[3],
      explanation:'Interface Pair View is a convenience grouping by matching interface pairs; By Sequence View shows the true top-to-bottom evaluation order used by FortiOS.'
    },
    {
      id:'FOS-Q26', category:C.POLICY, type:'single', image:null,
      text:'Refer to the exhibit. FortiGate has two separate firewall policies for Sales and Engineering to access the same web server with the same security profiles. Which action must the administrator perform to consolidate the two policies into one?',
      choices:[
        'Create an Aggregate interface that includes port1 and port2 to create a single firewall policy.',
        'Select port1 and port2 subnets in a single firewall policy.',
        'Replace port1 and port2 with the any interface in a single firewall policy.',
        'Enable Multiple Interface Policies to select port1 and port2 in the same firewall policy.'
      ],
      correct:[3],
      explanation:'Multiple Interface Policies allows a single policy to reference more than one incoming interface, consolidating the Sales and Engineering policies without losing interface-level precision.'
    },
    {
      id:'FOS-Q28', category:C.POLICY, type:'multiple', image:null,
      text:'When configuring firewall policies, which of the following is true regarding the policy ID?',
      choices:[
        'It is mandatory to provide a policy ID while creating a firewall policy regardless of GUI or CLI.',
        'A firewall policy ID identifies the order of policy execution in firewall policies.',
        'You can create a policy in CLI with policy ID 0.',
        'A policy ID cannot be edited once a policy is created.'
      ],
      correct:[2,3],
      explanation:'CLI accepts policy ID 0 (auto-assigned next free ID is common in GUI), and once created the ID is immutable. Policy order is set by sequence, not by the ID value.'
    },
    {
      id:'FOS-Q30', category:C.POLICY, type:'single', image:null,
      text:'An administrator suspects that the Collector Agent is not forwarding login events to FortiGate. What is the most effective troubleshooting step?',
      choices:[
        'Verify if DC agent is enabled on the FortiGate.',
        'Restart the domain controller to refresh authentication services.',
        'Verify if FortiGate is set to use LDAP authentication instead of FSSO.',
        'Check if TCP port 8000 is open between the collector agent and FortiGate.'
      ],
      correct:[3],
      explanation:'The collector agent communicates with FortiGate over TCP 8000 by default. Verifying that port is open is the most direct check.'
    },
    {
      id:'FOS-Q32', category:C.POLICY, type:'multiple', image:'32',
      text:'Refer to the exhibits. Two PCs, PC1 and PC2, are connected behind FortiGate and can access the internet successfully. However, when the administrator adds a third PC to the network (PC3), the PC cannot connect to the internet. Which two configuration options can the administrator use to fix the connectivity issue for PC3?',
      choices:[
        'In the system settings, set Multiple Interface Policies to enable.',
        'In the IP pool configuration, set endip to 100.65.0.112.',
        'In the firewall policy, set match-vip to enable using CLI.',
        'In the IP pool configuration, set type to overload.'
      ],
      correct:[1,3],
      explanation:'The one-to-one IP pool only has two addresses for three hosts. Either expand the endip range or change the pool type to overload so multiple hosts share one address via PAT.'
    },
    {
      id:'FOS-Q34', category:C.POLICY, type:'single', image:null,
      text:'Which statement correctly describes NetAPI polling mode for the FSSO collector agent?',
      choices:[
        'The collector agent uses a Windows API to query DCs for user logins.',
        'NetAPI polling can increase bandwidth usage in large networks.',
        'The NetSession Enum function is used to track user logouts.',
        'The collector agent must search Windows application event logs.'
      ],
      correct:[2],
      explanation:'NetAPI polling uses the NetSessionEnum function to enumerate sessions and detect logouts, which is its primary mechanism.'
    },
    {
      id:'FOS-Q35', category:C.POLICY, type:'single', image:null,
      text:'You have configured the FortiGate device for FSSO. A user is successful in logging in to Windows, but their access to the internet is denied. What should the administrator check first?',
      choices:[
        'Whether the user is assigned to the correct AD group.',
        'The FortiGate firewall policy settings for SSL decryption.',
        'The FortiGate FSSO active users list for the user\'s IP address.',
        'The Windows event viewer for failed login attempts.'
      ],
      correct:[2],
      explanation:'The FSSO active users list is the fastest way to confirm whether FortiGate has learned the user\'s identity and IP binding.'
    },
    {
      id:'FOS-Q39', category:C.POLICY, type:'single', image:'39',
      text:'Refer to the exhibits. The WAN (port2) interface has the IP address 100.65.0.101/24 and the LAN (port4) interface has 10.0.11.254/24. Which IP address will be used to source NAT (SNAT) the traffic, if the user on HQ-PC-1 (10.0.11.50) pings the IP address of BR-FGT (100.65.1.111)?',
      choices:['100.65.0.101','100.65.0.49','100.65.0.99','100.65.0.149'],
      correct:[2],
      explanation:'The PING traffic policy is set to use SNAT-Remote1, which is the 100.65.0.99 overload pool.'
    },
    {
      id:'FOS-Q40', category:C.POLICY, type:'single', image:'40',
      text:'Refer to the exhibits. An administrator created a Deny policy with default settings to deny Webserver access for Remote-User2. The policy should work such that Remote-User1 must be able to access the Webserver while preventing Remote-User2 from accessing the Webserver. Which additional configuration can the administrator add to a deny firewall policy, beyond the default behavior, to block Remote-User2 from accessing the Webserver?',
      choices:[
        'Disable match-vip in the Allow_access policy.',
        'Configure a One-to-One IP Pool object in a new policy.',
        'Set the Destination address as Webserver in the Deny policy.',
        'Set the Destination address as Deny_IP in the Allow_access policy.'
      ],
      correct:[2],
      explanation:'Because the Allow policy uses a VIP, the Deny policy must also reference the Webserver VIP as the destination for the deny to match the translated traffic.'
    },
    {
      id:'FOS-Q48', category:C.POLICY, type:'single', image:'48',
      text:'Refer to the exhibit, which contains a RADIUS server configuration. An administrator added a configuration for a new RADIUS server. While configuring, the administrator enabled Include in every user group. What is the impact of enabling Include in every user group in a RADIUS configuration?',
      choices:[
        'This option places the RADIUS server, and all users who can authenticate against that server, into every FortiGate user group.',
        'This option places the RADIUS server, and all users who can authenticate against that server, into every RADIUS group.',
        'This option places all users into every RADIUS user group, including groups that are used for the LDAP server on FortiGate.',
        'This option places all FortiGate users and groups required to authenticate into the RADIUS server, which, in this case, is FortiAuthenticator.'
      ],
      correct:[0],
      explanation:'"Include in every user group" makes the RADIUS server and its authenticating users members of every FortiGate user group, useful for guest or blanket access.'
    },
    {
      id:'FOS-Q54', category:C.POLICY, type:'single', image:'54',
      text:'Refer to the exhibit, which shows a firewall policy to enable active authentication. When attempting to access an external website using an active authentication method, the user is not presented with a login prompt. What is the most likely reason for this situation?',
      choices:[
        'The Service DNS is required in the firewall policy.',
        'The Remote-users group must be set up correctly in the FSSO configuration.',
        'No matching user account exists for this user.',
        'The Remote-users group is not added to the Destination.'
      ],
      correct:[0],
      explanation:'Without DNS in the allowed services, the browser cannot resolve the FortiGate captive-portal FQDN and never receives the login prompt.'
    },
    {
      id:'FOS-Q59', category:C.POLICY, type:'single', image:null,
      text:'An administrator configured a FortiGate device to act as a collector for agentless polling mode. What must the administrator add to the FortiGate device to retrieve AD user group information?',
      choices:['TACACS server','LDAP server','RADIUS server','Keycloak server'],
      correct:[1],
      explanation:'Agentless polling requires an LDAP server object so FortiGate can query AD for user and group membership.'
    },
    {
      id:'FOS-Q60', category:C.POLICY, type:'multiple', image:null,
      text:'What are two features of FortiGate FSSO agentless polling mode?',
      choices:[
        'FortiGate directs the collector agent to use a remote LDAP server.',
        'FortiGate uses the SMB protocol to read the event viewer logs from the DCs.',
        'FortiGate does not support workstation check.',
        'FortiGate uses the AD server as the collector agent.'
      ],
      correct:[1,2],
      explanation:'In agentless mode FortiGate reads event logs from DCs over SMB and does not perform workstation checks; no external collector agent is involved.'
    },
    {
      id:'FOS-Q68', category:C.POLICY, type:'single', image:'68',
      text:'Refer to the exhibits. The WAN (port2) interface has IP 100.65.0.101/24, the LAN (port4) has 10.0.11.254/24. If the host 100.65.1.111 sends a TCP SYN packet on port 443 to 100.65.0.200, what will the source address, destination address, and destination port of the packet be at the time FortiGate forwards the packet to the destination?',
      choices:[
        '10.0.11.254, 10.0.15.50, and 4443',
        '100.65.1.111, 10.0.11.50, and 443',
        '10.0.11.254, 100.65.0.200, and 443',
        '100.65.1.111, 10.0.11.50, and 4443'
      ],
      correct:[3],
      explanation:'The VIP uses one-to-one port mapping (443 → 4443). Source IP is preserved because the policy does not enable NAT; the destination becomes 10.0.11.50 and the port is mapped to 4443.'
    },
    {
      id:'FOS-Q69', category:C.POLICY, type:'single', image:'69',
      text:'Refer to the exhibits. The WAN (port2) interface has IP 100.65.0.101/24, the LAN (port4) has 10.0.11.254/24. The first firewall policy has NAT enabled using the IP pool. The second policy is configured with a VIP as the destination address. Which IP address will be used to SNAT the internet traffic coming from a workstation with IP 10.0.11.50?',
      choices:['100.65.0.101','100.65.0.200','100.65.0.102','10.0.11.254'],
      correct:[2],
      explanation:'The outbound policy uses the IP Pool (100.65.0.102–100.65.0.102) in overload mode, so SNAT uses 100.65.0.102.'
    },
    {
      id:'FOS-Q72', category:C.POLICY, type:'multiple', image:null,
      text:'What are two features of collector agent advanced mode?',
      choices:[
        'Advanced mode supports nested or inherited groups.',
        'In advanced mode, security profiles can be applied only to user groups, not individual users.',
        'In advanced mode, FortiGate can be configured as an LDAP client and group filters can be configured on FortiGate.',
        'Advanced mode uses the Windows convention NetBios: Domain\\Username.'
      ],
      correct:[0,2],
      explanation:'Advanced mode supports nested/inherited AD groups and lets FortiGate act as an LDAP client with group filters. Security profiles can still target individual users.'
    },
    {
      id:'FOS-Q78', category:C.POLICY, type:'multiple', image:null,
      text:'An administrator has configured the following settings: config system settings / set ses-denied-traffic enable / end / config system global / set block-session-timer 30 / end. What are the two results of this configuration?',
      choices:[
        'Denied users are blocked for 30 minutes.',
        'A session for denied traffic is created.',
        'Session helpers are disabled for denied traffic.',
        'The number of logs generated by denied traffic is reduced.'
      ],
      correct:[1,3],
      explanation:'ses-denied-traffic creates a session entry for denied traffic, and the block-session-timer consolidates repeat denials into one log entry, reducing log volume.'
    },
    {
      id:'FOS-Q97', category:C.POLICY, type:'multiple', image:null,
      text:'Which three methods are used by the collector agent for AD polling?',
      choices:['NetAPI','WMI','WinSecLog','DNS reverse lookup','FSSO REST API'],
      correct:[0,1,2],
      explanation:'The FSSO collector agent polls AD using NetAPI, WMI and WinSecLog. DNS reverse lookup and the FSSO REST API are not polling methods.'
    },

    /* ═══════════════════════════════════════════════════════════
       CONTENT INSPECTION
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FOS-Q4', category:C.CONTENT, type:'single', image:'4',
      text:'Refer to the exhibit. As an administrator you have created an IPS profile, but it is not performing as expected. While testing you got the output as shown in the exhibit. What could be the possible reason of the diagnose output shown in the exhibit?',
      choices:[
        'There is no firewall policy configured with an IPS security profile.',
        'FortiGate entered into IPS fail open state.',
        'Administrator entered the command diagnose test application ipsmonitor 5.',
        'Administrator entered the command diagnose test application ipsmonitor 99.'
      ],
      correct:[0],
      explanation:'The ipsmonitor output shows no active inspection sessions, which indicates no firewall policy is actually using an IPS profile.'
    },
    {
      id:'FOS-Q5', category:C.CONTENT, type:'multiple', image:'5',
      text:'Refer to the exhibit. The predefined deep-inspection and custom deep-inspection profiles exclude some web categories from SSL inspection, as shown in the exhibit. For which two reasons are these web categories exempted?',
      choices:[
        'The FortiGate temporary certificate denies the browser\'s access to websites that use HTTP Strict Transport Security.',
        'These websites are in an allowlist of reputable domain names maintained by FortiGuard.',
        'The resource utilization is optimized because these websites are in the trusted domain list on FortiGate.',
        'The legal regulation aims to prioritize user privacy and protect sensitive information for these websites.'
      ],
      correct:[0,3],
      explanation:'Sites using HSTS pinning break when intercepted by a temporary certificate, and regulations around finance/health require privacy protection — both are reasons for exemption.'
    },
    {
      id:'FOS-Q9', category:C.CONTENT, type:'single', image:null,
      text:'An administrator wanted to configure an IPS sensor to block traffic that triggers a signature a set number of times during a specific time period. How can the administrator achieve the objective?',
      choices:[
        'Use IPS group signatures, set rate-mode 60.',
        'Use IPS packet logging option with a periodical filter option.',
        'Use IPS filter, rate-mode periodical option.',
        'Use IPS signatures, rate-mode periodical option.'
      ],
      correct:[3],
      explanation:'The per-signature rate-mode periodical option lets you set a threshold and a time period during which repeated triggers cause a block.'
    },
    {
      id:'FOS-Q13', category:C.CONTENT, type:'multiple', image:null,
      text:'Which three statements explain a flow-based antivirus profile?',
      choices:[
        'FortiGate buffers the whole file but transmits to the client at the same time.',
        'Flow-based inspection uses a hybrid of the scanning modes available in proxy-based inspection.',
        'If a virus is detected, the last packet is delivered to the client.',
        'Flow-based inspection optimizes performance compared to proxy-based inspection.',
        'The IPS engine handles the process as a standalone.'
      ],
      correct:[0,1,3],
      explanation:'Flow-based AV buffers the file while streaming it, combines aspects of proxy modes, and is faster than proxy-based inspection. On detection, delivery is stopped before the last packet.'
    },
    {
      id:'FOS-Q14', category:C.CONTENT, type:'single', image:'14',
      text:'Refer to the exhibit. An administrator has configured an Application Override for the ABC.Com application signature and set the Action to Allow. This application control profile is then applied to a firewall policy that is scanning all outbound traffic. Logging is enabled in the firewall policy. To test the configuration, the administrator accessed the ABC.Com web site several times. Why are there no logs generated under security logs for ABC.Com?',
      choices:[
        'The ABC.Com Type is set as Application instead of Filter.',
        'The ABC.Com is configured under application profile, which must be configured as a web filter profile.',
        'The ABC.Com Action is set to Allow.',
        'The ABC.Com is hitting the category Excessive-Bandwidth.'
      ],
      correct:[2],
      explanation:'Application overrides set to Allow do not generate security log entries; only Monitor and Block generate them.'
    },
    {
      id:'FOS-Q18', category:C.CONTENT, type:'multiple', image:null,
      text:'A network administrator enabled antivirus and selected an SSL inspection profile on a firewall policy. When downloading an EICAR test file through HTTP, FortiGate detects the virus and blocks the file. When downloading the same file through HTTPS, FortiGate does not detect the virus and does not block the file, allowing it to be downloaded. The administrator confirms that the traffic matches the configured firewall policy. What are two reasons for the failed virus detection by FortiGate?',
      choices:[
        'The selected SSL Inspection profile has certificate inspection enabled.',
        'The website is exempted from SSL inspection.',
        'The EICAR test file exceeds the protocol options oversize limit.',
        'The browser does not trust the FortiGate self-signed CA certificate.'
      ],
      correct:[0,1],
      explanation:'Certificate-inspection only inspects the handshake, not the payload, and if the site is exempted from SSL inspection the content is never decrypted. Both prevent AV from seeing the file.'
    },
    {
      id:'FOS-Q20', category:C.CONTENT, type:'single', image:'20',
      text:'Refer to the exhibit. What would be the impact of these settings on the Server certificate SNI check configuration on FortiGate?',
      choices:[
        'FortiGate will accept and use the CN in the server certificate for URL filtering if the SNI does not match the CN or SAN fields.',
        'FortiGate will accept the connection with a warning if the SNI does not match the CN or SAN fields.',
        'FortiGate will close the connection if the SNI does not match the CN or SAN fields.',
        'FortiGate will close the connection if the SNI does not match the CN and SAN fields.'
      ],
      correct:[2],
      explanation:'With strict SNI checking enabled, FortiGate terminates the connection when the SNI does not match the CN or SAN fields of the server certificate.'
    },
    {
      id:'FOS-Q27', category:C.CONTENT, type:'single', image:null,
      text:'You have configured an application control profile, set peer-to-peer traffic to Block under the Categories tab, and applied it to the firewall policy. However, your peer-to-peer traffic on known ports is passing through the FortiGate without being blocked. What FortiGate settings should you check to resolve this issue?',
      choices:[
        'FortiGuard category ratings',
        'Application and Filter Overrides',
        'Network Protocol Enforcement',
        'Replacement Messages for UDP-based Applications'
      ],
      correct:[2],
      explanation:'Network Protocol Enforcement must be enabled for FortiGate to block P2P traffic detected on its known ports.'
    },
    {
      id:'FOS-Q37', category:C.CONTENT, type:'single', image:'37',
      text:'Refer to the exhibits. An administrator configured the Web Filter Profile to block access to all social networking sites except Facebook. However, when users try to access facebook.com, they are redirected to a FortiGuard web filtering block page. Based on the exhibits, which configuration change must the administrator make to allow Facebook while blocking all other social networking sites?',
      choices:[
        'Change the Feature set of Web Filter Profile as Proxy-based.',
        'Change the type as Simple in the Static URL Filter section.',
        'Set the Action as Exempt for www.facebook.com in the Static URL Filter.',
        'Set the Social Networking action as warning in the FortiGuard Category Based Filter.'
      ],
      correct:[2],
      explanation:'An Exempt entry for www.facebook.com in the static URL filter overrides the category block for that specific URL while leaving the category block in place.'
    },
    {
      id:'FOS-Q38', category:C.CONTENT, type:'single', image:'38',
      text:'Refer to the exhibit. You are asked to implement an antivirus profile for files downloaded through FTP, HTTP, and HTTPS. While testing, you are successful with HTTP and FTP protocols, but FortiGate does not block the file download over HTTPS. What could be the cause?',
      choices:[
        'Web filter is not enabled on the firewall policy to complement the antivirus profile.',
        'The feature set in the antivirus profile is not set to Flow-based.',
        'The SSL inspection mode in the firewall policy is not deep content inspection.',
        'The action on the firewall policy is not set to deny.'
      ],
      correct:[2],
      explanation:'HTTPS payload can only be scanned when the policy\'s SSL inspection profile performs deep content inspection (full inspection), not certificate inspection.'
    },
    {
      id:'FOS-Q44', category:C.CONTENT, type:'multiple', image:'44',
      text:'Refer to the exhibit. The exhibit shows the FortiGuard Category Based Filter section of a corporate web filter profile. An administrator must block access to download.com, which belongs to the Freeware and Software Downloads category. The administrator must also allow other websites in the same category. What are two solutions for satisfying the requirement?',
      choices:[
        'Configure a static URL filter entry for download.com with Type and Action set to Wildcard and Block, respectively.',
        'Configure a web override rating for download.com and select Malicious Websites as the subcategory.',
        'Configure a separate firewall policy with action Deny and an FQDN address object for *.download.com as destination address.',
        'Set the Freeware and Software Downloads category Action to Warning.'
      ],
      correct:[0,1],
      explanation:'Either a wildcard static URL filter entry blocking download.com, or a web rating override that reclassifies download.com into a blocked category, achieves the goal without blocking the rest of the category.'
    },
    {
      id:'FOS-Q46', category:C.CONTENT, type:'multiple', image:'46',
      text:'Refer to the exhibits. You have implemented the application sensor and the corresponding firewall policy as shown in the exhibits. You cannot access any of the Google applications, but you are able to access www.fortinet.com. Which two actions would you take to resolve the issue?',
      choices:[
        'Add Google.com to the URL category in the security profile.',
        'Change the Inspection mode to Flow-based.',
        'Set the action for Google in the Application and Filter Overrides section to Allow.',
        'Move up Google in the Application and Filter Overrides section to set its priority to 1.',
        'Set SSL inspection to deep-content inspection.'
      ],
      correct:[1,4],
      explanation:'The policy is currently proxy-based, which conflicts with the flow-based application sensor, and Google requires full SSL inspection so the application signature can be identified.'
    },
    {
      id:'FOS-Q47', category:C.CONTENT, type:'multiple', image:'47',
      text:'Refer to the exhibits. You have implemented the application sensor and the corresponding firewall policy as shown in the exhibits. Which two factors can you observe from these configurations?',
      choices:[
        'YouTube search is allowed based on the Google Application and Filter override settings.',
        'Facebook access is allowed but you cannot play Facebook videos based on Video/Audio category filter settings.',
        'Facebook access is blocked based on the category filter settings.',
        'YouTube access is blocked based on Excessive-Bandwidth Application and Filter override settings.'
      ],
      correct:[0,2],
      explanation:'The Google override is set to Monitor, which allows YouTube search traffic, and the Social Media category is blocked, which blocks Facebook.'
    },
    {
      id:'FOS-Q53', category:C.CONTENT, type:'multiple', image:null,
      text:'When FortiGate performs SSL/SSH full inspection, you can decide how it should react when it detects an invalid certificate. Which three actions are valid actions that FortiGate can perform when it detects an invalid certificate?',
      choices:['Allow','Trust & Allow','Allow & Warning','Block','Block & Warning'],
      correct:[0,1,3],
      explanation:'The three valid invalid-certificate actions are Allow, Trust & Allow, and Block.'
    },
    {
      id:'FOS-Q57', category:C.CONTENT, type:'single', image:'57',
      text:'Refer to the exhibit. Why is the Antivirus scan switch grayed out when you are creating a new antivirus profile for FTP?',
      choices:[
        'None of the inspected protocols are active in this profile.',
        'FortiGate with less than 2 GB RAM does not support the Antivirus scan feature.',
        'Antivirus scan is disabled under System Feature visibility.',
        'The Feature Set for the profile is flow-based but it must be Proxy-based.'
      ],
      correct:[0],
      explanation:'The scan toggle stays disabled until at least one inspected protocol is enabled in the profile.'
    },
    {
      id:'FOS-Q61', category:C.CONTENT, type:'single', image:null,
      text:'A network administrator has enabled full SSL inspection and web filtering on FortiGate. When visiting any HTTPS websites, the browser reports certificate warning errors. When visiting HTTP websites, the browser does not report errors. What is the reason for the certificate warning errors?',
      choices:[
        'The matching firewall policy is set to proxy inspection mode.',
        'The certificate used by FortiGate for SSL inspection does not contain the required certificate extensions.',
        'The full SSL inspection feature does not have a valid license.',
        'The browser does not trust the certificate used by FortiGate for SSL inspection.'
      ],
      correct:[3],
      explanation:'Full SSL inspection re-signs server certificates with the FortiGate CA. If that CA is not trusted by the browser, HTTPS sites show certificate warnings.'
    },
    {
      id:'FOS-Q66', category:C.CONTENT, type:'single', image:null,
      text:'An administrator manages a FortiGate model that supports NTurbo. How does NTurbo acceleration enhance antivirus performance?',
      choices:[
        'For proxy-based inspection, NTurbo offloads traffic to the content processor.',
        'For flow-based inspection, NTurbo establishes a dedicated data path to redirect traffic between the IPS engine and FortiGate ingress and egress interfaces.',
        'For proxy-based inspection, NTurbo buffers the whole file and then sends it to the antivirus engine.',
        'For flow-based inspection, NTurbo creates two inspection sessions on the FortiGate device.'
      ],
      correct:[1],
      explanation:'NTurbo is a flow-based acceleration path that connects the IPS engine directly between ingress and egress interfaces.'
    },
    {
      id:'FOS-Q67', category:C.CONTENT, type:'single', image:'67',
      text:'Refer to the exhibit. Review the intrusion prevention system (IPS) profile signature settings shown in the exhibit. What can you conclude about the signature when adding the FTP Login Failed signature to the IPS Sensor profile?',
      choices:[
        'The signature setting includes a group of other signatures.',
        'FortiGate stores a local copy of the packet that matches the signature.',
        'FortiGate allows this low-severity signature packet and creates a log.',
        'The signature setting uses a custom rating threshold.'
      ],
      correct:[1],
      explanation:'Packet logging is enabled on the signature, so FortiGate captures the matching packet payload for later analysis.'
    },
    {
      id:'FOS-Q74', category:C.CONTENT, type:'single', image:'74',
      text:'Refer to the exhibit. What can you conclude from the log shown in the exhibit? (logdesc="IPS session scan paused" action="drop" msg="IPS session scan, enter fail open mode")',
      choices:[
        'The IPS scan is paused by the IPS diagnostic command with bypass mode option 5.',
        'The IPS socket buffer is full and the IPS engine needs more memory to create new sessions.',
        'The IPS session scan is paused and reevaluating the packet because of a dirty flag.',
        'The IPS socket buffer is full and the IPS engine cannot decode a packet.'
      ],
      correct:[1],
      explanation:'The fail-open entry is triggered when the IPS socket buffer fills up because of memory pressure, causing the IPS engine to skip inspection.'
    },
    {
      id:'FOS-Q75', category:C.CONTENT, type:'single', image:'75',
      text:'Refer to the exhibits. You have implemented the application sensor and the corresponding firewall policy as shown in the exhibits. You cannot access any of the Google applications, but you are able to access www.fortinet.com. What would you do to resolve this issue?',
      choices:[
        'Change the Inspection mode to Proxy-based.',
        'Set SSL inspection to deep-content-inspection.',
        'Move up Google in the Application and Filter Overrides section to set its priority to 1.',
        'Add Google.com to the URL category in the security profile.'
      ],
      correct:[1],
      explanation:'Google traffic is HTTPS-only, so deep content inspection is required to identify the Google application signature.'
    },
    {
      id:'FOS-Q76', category:C.CONTENT, type:'single', image:'76',
      text:'Refer to the exhibits. A web filter profile configuration and firewall policy configuration are shown. You are trying to access www.facebook.com, but you are redirected to a FortiGuard web filtering block page. Based on the exhibits, what is the possible cause of the issue?',
      choices:[
        'The web filter profile feature set is configured incorrectly.',
        'The web rating override configuration is incorrect.',
        'The firewall policy inspection mode is incorrect.',
        'For www.facebook.com, the URL filter action is incorrect.'
      ],
      correct:[1],
      explanation:'The block page shows the category as Malicious Websites, which indicates a web rating override has reclassified Facebook into the wrong category.'
    },
    {
      id:'FOS-Q80', category:C.CONTENT, type:'single', image:'80',
      text:'Refer to the exhibits. The exhibits show the application sensor configuration and the Excessive-Bandwidth and Apple filter details. Based on the configuration, what will happen to Apple FaceTime if there are only a few calls originating or incoming?',
      choices:[
        'Apple FaceTime will be allowed, based on the Video/Audio category configuration.',
        'Apple FaceTime will be blocked, based on the Excessive-Bandwidth filter configuration.',
        'Apple FaceTime will be allowed, based on the Apple filter configuration.',
        'Apple FaceTime will be allowed only if the Apple filter in Application and Filter Overrides is set to Allow.'
      ],
      correct:[1],
      explanation:'FaceTime is matched by the Excessive-Bandwidth filter which is set to Block, so the call is blocked regardless of the Apple monitor filter.'
    },
    {
      id:'FOS-Q81', category:C.CONTENT, type:'multiple', image:'81',
      text:'How can the administrator view the log messages shown in the exhibit? (date=2025-09-03 ... type="utm" subtype="app-ctrl" level="warning" action="block" ...)',
      choices:[
        'Filtering by Policy UUID and Application Name in the log entry.',
        'By right-clicking the implicit deny policy.',
        'Through FortiGate CLI command diagnose log test.',
        'Through the Security event log page.'
      ],
      correct:[0,3],
      explanation:'Security event logs in the GUI support filtering by policy UUID and application name, which is the natural way to find these entries.'
    },
    {
      id:'FOS-Q89', category:C.CONTENT, type:'multiple', image:'89',
      text:'Refer to the exhibit. Which two ways can you view the log messages shown in the exhibit?',
      choices:[
        'In the Forward Traffic section.',
        'By right-clicking the implicit deny policy.',
        'Using the FortiGate CLI command diagnose log test.',
        'By filtering by policy universally unique identifier (UUID) and application name in the log entry.'
      ],
      correct:[0,3],
      explanation:'These UTM app-ctrl logs are visible in the Forward Traffic section and can be filtered by policy UUID and application name.'
    },
    {
      id:'FOS-Q99', category:C.CONTENT, type:'single', image:'99',
      text:'Refer to the exhibit to view the firewall policy. Why would the firewall policy not block a well-known virus, for example EICAR?',
      choices:[
        'The action on the firewall policy is not set to DENY.',
        'Web filter is not enabled, so the firewall policy does not complement the antivirus profile.',
        'The firewall policy is not configured in proxy-based inspection mode.',
        'The firewall policy does not apply deep content inspection.'
      ],
      correct:[3],
      explanation:'The policy uses certificate-inspection, so HTTPS payloads are never decrypted and the antivirus engine cannot see the EICAR test file.'
    },
    {
      id:'FOS-Q100', category:C.CONTENT, type:'single', image:'100',
      text:'Refer to the exhibits. You have implemented the application sensor and the corresponding firewall policy as shown in the exhibits. You cannot access any of the Google applications, but you are able to access www.fortinet.com. What would you do to resolve this issue?',
      choices:[
        'Set the action for Excessive-Bandwidth in the Application and Filter Overrides section to Allow.',
        'Move up Google in the Application and Filter Overrides section to set its priority to 1.',
        'Add Google.com to the URL category in the security profile.',
        'Set the action for Google in the Application and Filter Overrides section to Monitor.'
      ],
      correct:[3],
      explanation:'Setting the Google override action to Monitor allows the Google applications through while still logging them.'
    },
    {
      id:'FOS-Q102', category:C.CONTENT, type:'multiple', image:'102',
      text:'Refer to the exhibits. You have implemented the application sensor and the corresponding firewall policy as shown in the exhibits. You can access the Gmail chat application, but there is no log generated under security logs. Which two actions would you take to resolve the issue?',
      choices:[
        'Set SSL inspection to deep-inspection.',
        'Move up Google in the Application and Filter Overrides section to set its priority to 1.',
        'Add Google.com to the URL category in the security profile.',
        'Change the Inspection mode to Flow-based.',
        'Set the action for Gmail Chat in the Application and Filter Overrides section to Monitor.'
      ],
      correct:[0,4],
      explanation:'Gmail is HTTPS, so deep inspection is required to see the application, and the override must be set to Monitor (not Allow) for security log entries to be generated.'
    },

    /* ═══════════════════════════════════════════════════════════
       ROUTING
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FOS-Q2', category:C.ROUTING, type:'multiple', image:null,
      text:'Which two statements about equal-cost multi-path (ECMP) configuration on FortiGate are true?',
      choices:[
        'If SD-WAN is enabled, you control the load balancing algorithm with the parameter load-balance-mode.',
        'If SD-WAN is disabled, you can configure the parameter v4-ecmp-mode to volume-based.',
        'If SD-WAN is enabled, you can configure routes with unequal distance and priority values to be part of ECMP.',
        'If SD-WAN is disabled, you configure the load balancing algorithm in config system settings.'
      ],
      correct:[0,3],
      explanation:'With SD-WAN enabled, load-balance-mode controls the algorithm; with SD-WAN disabled, the algorithm is set under config system settings. ECMP members must share distance and priority.'
    },
    {
      id:'FOS-Q12', category:C.ROUTING, type:'single', image:'12',
      text:'Refer to the exhibit. Based on the exhibit, which statement is true?',
      choices:[
        'The Underlay zone is the zone by default.',
        'The Underlay zone contains no member.',
        'port2 and port3 are not assigned to a zone.',
        'The virtual wan-link and overlay zones can be deleted.'
      ],
      correct:[1],
      explanation:'The SD-WAN zone list shows Underlay as an empty zone with no members assigned.'
    },
    {
      id:'FOS-Q16', category:C.ROUTING, type:'multiple', image:null,
      text:'Which three statements about SD-WAN performance SLAs are true?',
      choices:[
        'They rely on session loss and jitter.',
        'They can be measured actively or passively.',
        'They are applied in an SD-WAN rule lowest cost strategy.',
        'They monitor the state of the FortiGate device.',
        'All the SLA targets can be configured.'
      ],
      correct:[1,2,4],
      explanation:'SD-WAN SLAs can be active or passive, are used by the lowest-cost strategy to select members, and all SLA targets (latency, jitter, packet loss) are configurable. They measure link quality, not device state.'
    },
    {
      id:'FOS-Q19', category:C.ROUTING, type:'single', image:'19',
      text:'You have configured the commands below on a FortiGate: config system settings / set strict-src-check enable / end, then config system interface / edit port1 / set src-check disable / next / end. What would be the impact of this configuration on FortiGate?',
      choices:[
        'FortiGate will enable strict RPF on all its interfaces and port1 will be enabled for asymmetric routing.',
        'FortiGate will enable strict RPF on all its interfaces and port1 will be exempted from RPF checks.',
        'Port1 will be enabled with flexible RPF, and all other interfaces will be enabled for strict RPF.',
        'The global configuration will take precedence and FortiGate will enable strict RPF on all interfaces.'
      ],
      correct:[1],
      explanation:'strict-src-check enable turns on strict RPF globally, and the per-interface src-check disable exempts port1 from RPF so asymmetric routing can work there.'
    },
    {
      id:'FOS-Q23', category:C.ROUTING, type:'single', image:'23',
      text:'Refer to the exhibit. An administrator has created a new firewall address to use as the destination for a static route. Why is the administrator not able to select the new address in the Destination field of the new static route?',
      choices:[
        'In the new static route, the administrator must select Named Address.',
        'In the new firewall address, the FQDN address must first be resolved.',
        'In the new static route, the administrator must first set the interface to port2.',
        'In the new firewall address, Routing configuration must be enabled.'
      ],
      correct:[3],
      explanation:'An address object is only selectable as a static route destination when the "Routing configuration" toggle is enabled on the object.'
    },
    {
      id:'FOS-Q24', category:C.ROUTING, type:'multiple', image:null,
      text:'FortiGate is operating in NAT mode and has two physical interfaces connected to the LAN and DMZ networks respectively. Which two statements about the requirements of connected physical interfaces on FortiGate are true?',
      choices:[
        'Both interfaces must have the interface role assigned.',
        'Both interfaces must have directly connected routes on the routing table.',
        'Both interfaces must have DHCP enabled and interfaces set to LAN and DMZ roles assigned.',
        'Both interfaces must have IP addresses assigned.'
      ],
      correct:[1,3],
      explanation:'A connected interface in NAT mode needs an IP address and creates a directly connected route automatically. Roles and DHCP are optional.'
    },
    {
      id:'FOS-Q25', category:C.ROUTING, type:'single', image:null,
      text:'When configuring a FortiGate in a multi-WAN setup, why would an administrator enable session preservation on an interface?',
      choices:[
        'To allow the FortiGate to dynamically change interfaces for all active sessions when a WAN link fails.',
        'To make sure all sessions without source NAT enabled always use the primary WAN link.',
        'To improve security by forcing users to authenticate again when the WAN link changes.',
        'To ensure that existing SSL VPN connections remain on the same interface even if route changes occur.'
      ],
      correct:[3],
      explanation:'Session preservation keeps established sessions (notably SSL VPN tunnels) pinned to their original interface when routing changes, preventing disconnects.'
    },
    {
      id:'FOS-Q36', category:C.ROUTING, type:'multiple', image:null,
      text:'What are three key routing principles in SD-WAN?',
      choices:[
        'By default, SD-WAN rules are skipped if the included SD-WAN members do not have a valid route to the destination.',
        'SD-WAN rules have precedence over any other type of routes.',
        'Regular policy routes have precedence over SD-WAN rules.',
        'By default, SD-WAN rules are skipped if only one route to the destination is available.',
        'By default, SD-WAN rules are skipped if the best route to the destination is not an SD-WAN member.'
      ],
      correct:[0,2,4],
      explanation:'SD-WAN rules require a valid route on their members, they are subordinate to policy routes, and they are skipped when the best route is not an SD-WAN member.'
    },
    {
      id:'FOS-Q52', category:C.ROUTING, type:'multiple', image:'52',
      text:'Refer to the exhibit showing a debug flow output. Which two conclusions can you make from the debug flow output?',
      choices:[
        'The default gateway is configured on port2.',
        'The RPF check fails.',
        'The debug flow is for UDP traffic.',
        'The matching firewall policy denies the traffic.'
      ],
      correct:[0,3],
      explanation:'The "find a route" line shows gw=0.0.0.0 via port2 (default route on port2), and the final "Denied by forward policy check (policy 2)" confirms the matching policy denies the traffic.'
    },
    {
      id:'FOS-Q55', category:C.ROUTING, type:'single', image:'55',
      text:'Refer to the exhibit. Why did the FortiGate device drop the packet? (Packet trace output shows proto=1 ICMP and "Denied by forward policy check (policy 0)")',
      choices:[
        'It matched the default implicit firewall policy.',
        'It matched an explicitly configured firewall policy with the action DENY.',
        'It cannot reach the next-hop IP.',
        'It failed the RPF check.'
      ],
      correct:[0],
      explanation:'Policy 0 is the implicit deny policy that drops any traffic not matched by a configured firewall policy.'
    },
    {
      id:'FOS-Q56', category:C.ROUTING, type:'multiple', image:'56',
      text:'Refer to the exhibit, which shows a routing table. An administrator wants to create a new static route so the traffic to the subnet 172.20.1.0/24 is routed through port2 only. What are the two criteria that the administrator can use to achieve this objective?',
      choices:[
        'The new static route must have the distance set to 9.',
        'The existing static route through port3 must have the distance set to 11.',
        'The new static route must have the priority set to 3.',
        'The new static route must have the metric set to 1.'
      ],
      correct:[0,1],
      explanation:'Static route selection prefers lower distance, then lower priority. Setting the new route\'s distance to 9 (beating the existing distance 10) or raising the existing route\'s distance to 11 makes port2 preferred.'
    },
    {
      id:'FOS-Q65', category:C.ROUTING, type:'single', image:'65',
      text:'Refer to the exhibit. The administrator configured SD-WAN rules and set the FortiGate traffic log page to display SD-WAN-specific columns: SD-WAN Quality and SD-WAN Rule Name. FortiGate allows the traffic according to policy ID 1 placed at the top. Despite these settings, the traffic logs do not show the name of the SD-WAN rule used to steer those traffic flows. What could be the reason?',
      choices:[
        'SD-WAN rule names do not appear immediately. The administrator must refresh the page.',
        'There is no application control profile applied to the firewall policy.',
        'FortiGate load balanced the traffic according to the implicit SD-WAN rule.',
        'Destinations in the SD-WAN rules are configured for each application, but feature visibility is not enabled.'
      ],
      correct:[2],
      explanation:'When traffic is load-balanced by the implicit SD-WAN rule (not a user-defined rule), no rule name is available to log.'
    },
    {
      id:'FOS-Q70', category:C.ROUTING, type:'multiple', image:'70',
      text:'Based on the routing table shown in the exhibit, which two statements are true? (0.0.0.0/0 via 100.65.0.254 port2, 10.10.10.0/24 via 100.66.0.254 port3, 10.0.13.0/24 via 10.0.13.125 port6)',
      choices:[
        'A packet with the source IP address 10.100.110.10 arriving on port3 is allowed if strict RPF is disabled.',
        'A packet with the source IP address 10.100.110.10 arriving on port2 is allowed if strict RPF is enabled.',
        'A packet with the source IP address 10.0.13.10 arriving on port2 is allowed if strict RPF is disabled.',
        'A packet with the source IP address 10.10.10.10 arriving on port2 is allowed if strict RPF is enabled.'
      ],
      correct:[1,2],
      explanation:'Strict RPF requires the reverse path to the source to use the same interface. 10.100.110.10 arrives via the default route on port2 (valid), and with RPF disabled any interface works.'
    },

    /* ═══════════════════════════════════════════════════════════
       VPN
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FOS-Q1', category:C.VPN, type:'single', image:null,
      text:'An administrator wants to configure dead peer detection (DPD) on IPsec VPN for detecting dead tunnels. The requirement is that FortiGate sends DPD probes only when there is no inbound traffic. Which DPD mode on FortiGate meets this requirement?',
      choices:['Enabled','On Idle','Disabled','On Demand'],
      correct:[3],
      explanation:'On Demand sends DPD probes only when there is outbound traffic and no inbound traffic from the peer, matching the requirement.'
    },
    {
      id:'FOS-Q31', category:C.VPN, type:'multiple', image:'31',
      text:'Refer to the exhibit. A network administrator is troubleshooting an IPsec tunnel between two FortiGate devices. The administrator has determined that phase 1 status is up, but phase 2 fails to come up. Based on the phase 2 configuration shown in the exhibit, which two configuration changes will bring phase 2 up?',
      choices:[
        'On BR1-FGT, set Seconds to 43200.',
        'On HQ-NGFW, enable Diffie-Hellman Group 2.',
        'On BR1-FGT, set Remote Address to 10.0.11.0/255.255.255.0.',
        'On HQ-NGFW, set Encryption to AES256.'
      ],
      correct:[2,3],
      explanation:'The remote address on BR1-FGT points at the HQ local subnet (which is reversed) and the HQ encryption must match BR1\'s AES256. Both must be corrected for phase 2 to establish.'
    },
    {
      id:'FOS-Q45', category:C.VPN, type:'multiple', image:null,
      text:'You are encountering connectivity problems caused by intermediate devices blocking IPsec traffic. In which two ways can you effectively resolve the problem?',
      choices:[
        'You can use SSL VPN tunnel mode to prevent problems with blocked ESP and UDP ports (500 or 4500).',
        'You can turn on fragmentation to fix large certificate negotiation problems.',
        'You can configure a hub-and-spoke topology with SSL VPN tunnels to bypass blocked UDP ports.',
        'You should use the protocol IKEv2.'
      ],
      correct:[0,1],
      explanation:'SSL VPN tunnel mode avoids ESP/UDP blocking entirely, and enabling fragmentation works around MTU issues during IKE negotiation.'
    },
    {
      id:'FOS-Q58', category:C.VPN, type:'multiple', image:null,
      text:'An administrator has configured a dialup IPsec VPN on FortiGate with add-route enabled. However, the static route is not showing in the routing table. Which two statements about this scenario are correct?',
      choices:[
        'The administrator must enable a dynamic routing protocol on the dialup interface.',
        'The administrator must use a policy route instead of a static route for add-route to work properly.',
        'The administrator must ensure phase 2 is successfully established.',
        'The administrator must define the remote network correctly in the phase 2 selectors.'
      ],
      correct:[2,3],
      explanation:'add-route only installs the route once phase 2 is up, and the remote network must be correctly defined in the phase 2 selectors for the route to be created.'
    },
    {
      id:'FOS-Q62', category:C.VPN, type:'multiple', image:null,
      text:'A network administrator wants to set up redundant IPsec VPN tunnels on FortiGate by using two IPsec VPN tunnels and static routes. All traffic must be routed through the primary tunnel when both tunnels are up. The secondary tunnel must be used only if the primary tunnel goes down. In addition, FortiGate should be able to detect a dead tunnel to speed up tunnel failover. Which two key configuration changes must the administrator make on FortiGate to meet the requirements?',
      choices:[
        'In the phase1-interface, enable npu-offload to detect a dead tunnel.',
        'Configure a lower distance on the static route for the primary tunnel, and a higher distance on the static route for the secondary tunnel.',
        'Enable Dead Peer Detection.',
        'Use the VPN wizard to create an IPsec template for a redundant IPsec VPN tunnel.'
      ],
      correct:[1,2],
      explanation:'Static route distance provides the primary/secondary preference, and DPD detects a dead peer so failover can happen quickly.'
    },
    {
      id:'FOS-Q86', category:C.VPN, type:'multiple', image:null,
      text:'Which two features of IPsec IKEv1 authentication are supported by FortiGate?',
      choices:[
        'Extended authentication (XAuth) to request the remote peer to provide a username and password.',
        'No certificate is required on the remote peer when you set the certificate signature as the authentication method.',
        'Extended authentication (XAuth) for faster authentication because fewer packets are exchanged.',
        'Pre-shared key and certificate signature as authentication methods.'
      ],
      correct:[0,3],
      explanation:'FortiGate IKEv1 supports XAuth for additional user authentication and both pre-shared key and certificate signature methods.'
    },
    {
      id:'FOS-Q87', category:C.VPN, type:'single', image:null,
      text:'How does FortiExtender connect to FortiSASE in a site-based, remote internet access method?',
      choices:[
        'FortiExtender uses the proxy auto-configuration (PAC) file and an explicit web proxy to connect.',
        'FortiExtender first connects to a FortiGate LAN extension through a secure web gateway (SWG).',
        'FortiExtender establishes a secure SSL connection using FortiClient.',
        'FortiExtender uses a Virtual Extensible LAN (VXLAN)-over-IPsec connection.'
      ],
      correct:[3],
      explanation:'FortiExtender establishes a VXLAN-over-IPsec tunnel to FortiSASE for the site-based remote internet access deployment.'
    },
    {
      id:'FOS-Q91', category:C.VPN, type:'single', image:null,
      text:'There are multiple dialup IPsec VPNs configured in aggressive mode on the HQ FortiGate. The requirement is to connect dial-up users to their respective department VPN tunnels. Which phase 1 setting can you configure to match the user to the tunnel?',
      choices:['Peer ID','Local Gateway','Dead Peer Detection','IKE Mode Config'],
      correct:[0],
      explanation:'Peer ID (the peer ID / remote gateway ID) is used in aggressive mode to distinguish dial-up clients and match them to the correct tunnel.'
    },
    {
      id:'FOS-Q98', category:C.VPN, type:'single', image:null,
      text:'A network administrator is configuring an IPsec VPN tunnel for a sales employee travelling abroad. Which IPsec Wizard template must the administrator apply?',
      choices:['Site to Site','Hub-and-Spoke','Dial up User','Remote Access'],
      correct:[3],
      explanation:'The Remote Access wizard template is designed for travelling users connecting via FortiClient.'
    },
    {
      id:'FOS-Q101', category:C.VPN, type:'multiple', image:'101',
      text:'Refer to the exhibit. A network administrator is troubleshooting an IPsec tunnel between two FortiGate devices. The administrator has determined that phase 1 failed to come up. Based on the phase 1 configuration and the diagram shown in the exhibit, which two configuration changes can the administrator make to bring phase 1 up?',
      choices:[
        'On HQ-NGFW, set IKE mode to Main (ID protection).',
        'On both FortiGate devices, set Dead Peer Detection to On Demand.',
        'On BR1-FGT, set port2 to Interface.',
        'On HQ-NGFW, disable Diffie-Hellman group 2.'
      ],
      correct:[0,2],
      explanation:'HQ is in aggressive mode while Remote is in main mode — they must match (main is preferred). Also, the remote gateway interface must be set correctly on BR1-FGT.'
    }

  ];

  window.ExamRegistry.setBank('fos', QUESTIONS);
})();