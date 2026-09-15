/* ═══════════════════════════════════════════════════════════════
   Bank — FortiManager 7.6 Administrator
   -----------------------------------------------------------------
   Domains match the official FortiManager 7.6 exam blueprint:
     1. Administration                    (15-25%)
     2. Device Manager                    (20-30%)
     3. Policy and Objects                (25-35%)
     4. Advanced Configuration            (10-20%)
     5. Troubleshooting                   (20-30%)

   Images live in  images/fmgr/  named by question number.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const C = {
    ADMIN:   'Administration',
    DEVICE:  'Device Manager',
    POLICY:  'Policy and Objects',
    ADV:     'Advanced Configuration',
    TROUBLE: 'Troubleshooting'
  };

  const QUESTIONS = [

    /* ═══════════════════════════════════════════════════════════
       ADMINISTRATION  (15-25%)
       ADOMs, admin profiles, workspace/workflow mode, backups,
       ADOM revisions, device organization, global database.
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FMGR-1', category:C.ADMIN, type:'single', image:null,
      text:'You want to let multiple administrators work in the same ADOM without creating configuration conflicts. What is the best and the most effective solution to apply?',
      choices:[
        'Configure RADIUS authentication to assign ADOM roles to each user.',
        'Enable workflow mode, which is the only way to prevent concurrent configuration conflicts.',
        'Assign administrators with JSON API access to the FortiManager.',
        'Activate workspace mode in the ADOM settings.'
      ],
      correct:[1],
      explanation:'Workflow mode is the only mode that enforces sequential editing, submission of changes as packages, and approval before installation — the strongest protection against concurrent configuration conflicts.'
    },
    {
      id:'FMGR-5', category:C.ADMIN, type:'single', image:null,
      text:'An administrator wants to configure and manage multiple objects in the FortiManager database and give access to other users who work in the same database. To stay in control of the changes made to firewall policies by other team members, the administrator needs a setup where all modifications go through a central check before they can be installed. How can the administrator create this setup?',
      choices:[
        'Enable the prompt asking the administrator to accept firewall policies changes before saving.',
        'Enable the workspace (for all ADOMs) to control all changes made by any administrator.',
        'Enable device lock and the advanced mode feature in the ADOM.',
        'Enable workflow mode and the ADOM lock feature.'
      ],
      correct:[3],
      explanation:'Workflow mode plus ADOM lock gives exactly the "central check before installation" behaviour the question describes.'
    },
    {
      id:'FMGR-12', category:C.ADMIN, type:'single', image:null,
      text:'What is the purpose of ADOM revisions?',
      choices:[
        'ADOM revisions find unused, duplicate, and unnecessary firewall policies and objects.',
        'ADOM revisions show specific changes in a policy package when it is installed.',
        'ADOM revisions compare previous snapshots of the Policy Package and ADOM-level objects with the device-level database.',
        'ADOM revisions save the current state of all policy packages and objects for an ADOM.'
      ],
      correct:[3],
      explanation:'An ADOM revision is a complete snapshot of the ADOM — every policy package and ADOM-level object at a point in time.'
    },
    {
      id:'FMGR-17', category:C.ADMIN, type:'single', image:null,
      text:'An administrator has a FortiGate-HQ device with VDOMs root, HR and Facilities, currently managed under the FortiManager ADOM-Site1. They try to move VDOM HR to the FortiManager ADOM-Site2, but it does not work. Why is the administrator not able to move FortiGate-HQ VDOM HR to FortiManager ADOM-Site2?',
      choices:[
        'The FortiGate-HQ must be managed under the FortiManager ADOM-root to allow moving its VDOMs to different ADOMs.',
        'The administrator must have full access in the device layer of FortiGate-HQ VDOM-root before they can move VDOMs to different ADOMs.',
        'FortiManager must be in ADOM normal mode, which does not allow VDOMs to be managed separately.',
        'The administrator must delete the FortiGate-HQ device from FortiManager and add it again using the Add Device wizard before moving the VDOM.'
      ],
      correct:[3],
      explanation:'Once a device is added in normal mode you cannot change it to split-ADOM. The only way is to remove the device, switch the ADOM to Advanced mode, and re-add it with "Split VDOMs" enabled.'
    },
    {
      id:'FMGR-20', category:C.ADMIN, type:'single', image:null,
      text:'Company policy dictates that any time a change is made to a policy package on FortiManager, an ADOM revision is created before the change is installed, and that revision is held for a minimum of 90 days. Over the past three months, each installed change has resulted in several unused policies and duplicate objects. The FortiManager administrator plans to upgrade the FortiGate devices and then upgrade the FortiManager ADOM from version 7.4 to 7.6. Which action can the administrator take to avoid slow ADOM upgrades?',
      choices:[
        'Check and repair the global configuration database before upgrading.',
        'Export firewall policies to Excel, delete them on the ADOM, then reimport them after upgrading the ADOM.',
        'Find unused firmware templates, then delete them before upgrading.',
        'Limit ADOM revisions before upgrading.'
      ],
      correct:[3],
      explanation:'Every ADOM revision is a snapshot that must be processed during the upgrade. Pruning revisions before the upgrade dramatically reduces upgrade time.'
    },
    {
      id:'FMGR-23', category:C.ADMIN, type:'single', image:null,
      text:'An administrator must create a policy and install it on a FortiGate device within an ADOM in backup mode. How can the administrator perform this task?',
      choices:[
        'Use the Install Wizard located on the device manager.',
        'Enable workflow mode to allow policy creation and approval.',
        'Make sure the ADOM and FortiGate firmware versions match and use the ADOM policy package.',
        'Use a FortiManager script to apply the configuration changes.'
      ],
      correct:[3],
      explanation:'In backup mode, policy packages do not push. The only way to make changes to a managed device is via the script feature.'
    },
    {
      id:'FMGR-28', category:C.ADMIN, type:'single', image:null,
      text:'After correcting a policy package configuration issue, you want to prevent administrators from repeating the mistake that caused the issue. Which FortiManager approach best meets this need?',
      choices:[
        'Configure a TCL script to run locally on FortiManager for each FortiGate.',
        'Restrict administrators with an administration profile from viewing the revision history to limit who can make changes.',
        'Enable the change note to require administrators to add a note whenever they change object configurations.',
        'Enable a workflow requiring approval before installing policy packages on any FortiGate.'
      ],
      correct:[3],
      explanation:'Workflow mode forces a formal review-and-approve process before any installation, directly preventing repeated mistakes.'
    },
    {
      id:'FMGR-29', category:C.ADMIN, type:'single', image:null,
      text:'A service provider administrator has assigned a global policy package to a managed customer ADOM named My_ADOM. The customer administrator has access only to My_ADOM. How can the customer administrator edit the global header policy of the global policy package?',
      choices:[
        'The customer administrator can edit the header policy by using workspace mode on the global ADOM.',
        'The customer administrator can edit the header policy by using workflow mode on the global ADOM and My_ADOM.',
        'The service provider administrator can unlock the global policy from the global ADOM to authorize changes to the customer administrator.',
        'The customer administrator cannot edit the global header policy; only the service provider administrator can make changes from the global ADOM.'
      ],
      correct:[3],
      explanation:'Global policy packages can only be edited from the global ADOM by administrators with access to it.'
    },
    {
      id:'FMGR-32', category:C.ADMIN, type:'multiple', image:'32',
      text:'Refer to the exhibit. FortiManager # config system global / (global) # set workspace-mode normal / (global) # end. What are two results from the configuration shown in the exhibit?',
      choices:[
        'Ungraceful closed sessions will keep the ADOM in a locked state until the administrator session times out.',
        'The administrator can lock policy blocks and FortiManager global ADOM.',
        'The same administrator can lock more than one ADOM at the same time.',
        'The administrator must have access to the ADOM to approve changes.'
      ],
      correct:[0,2],
      explanation:'With workspace-mode normal, an ungraceful session close leaves the ADOM locked until timeout, and a single administrator can lock multiple ADOMs simultaneously.'
    },
    {
      id:'FMGR-35', category:C.ADMIN, type:'single', image:'35',
      text:'Which output is displayed right after moving the ISFW device from one ADOM to another?',
      choices:['Option A','Option B','Option C','Option D'],
      correct:[2],
      explanation:'After moving a device to a new ADOM, the package status shows "never-installed" until it is installed from the new ADOM.'
    },
    {
      id:'FMGR-40', category:C.ADMIN, type:'multiple', image:'40',
      text:'Refer to the exhibit. Which two statements about the configuration shown in the exhibit are true?',
      choices:[
        'An administrator can lock the Local-FortiGate_root policy package.',
        'The administrator created a snapshot of the Remote-FortiGate policy package.',
        'The FortiManager ADOM workspace mode is set to normal.',
        'The FortiManager is in workflow mode.'
      ],
      correct:[0,2],
      explanation:'The presence of a lock icon on a policy package and the absence of workflow indicators confirm workspace-mode normal and lockable policy packages.'
    },
    {
      id:'FMGR-48', category:C.ADMIN, type:'multiple', image:'48',
      text:'Refer to the following configuration. FortiManager # config system global / (global) # set workspace-mode normal / (global) # end. What are two results from the configuration shown in the exhibit?',
      choices:[
        'The same administrator can lock more than one ADOM at the same time.',
        'Multiple administrators can lock and work on separate ADOMs at the same time.',
        'All changes must be approved before they can be installed on a device.',
        'Concurrent read-write access to an ADOM is disabled.'
      ],
      correct:[0,3],
      explanation:'In normal workspace mode, ADOMs are locked for exclusive write access, but one admin can still hold multiple locks at once.'
    },
    {
      id:'FMGR-55', category:C.ADMIN, type:'single', image:null,
      text:'A FortiManager administrator has moved a FortiGate device to a new ADOM, but they cannot see the policy or object configurations for that FortiGate. What should the administrator do to see the policy or object configurations?',
      choices:[
        'Use ADOM sync to restore the missing configurations.',
        'Use ADOM shared objects to restore all missing data.',
        'Reset the device and add it to the new ADOM again.',
        'Import the policy package manually using the Import Configuration wizard.'
      ],
      correct:[3],
      explanation:'Moving a device does not automatically carry over the policy package — it must be re-imported using the Import Configuration wizard.'
    },
    {
      id:'FMGR-57', category:C.ADMIN, type:'single', image:null,
      text:'An administrator upgrades FortiManager with workspace mode (per ADOM) enabled to the latest version but notices that the ADOM versions did not change. Why were the ADOMs not upgraded?',
      choices:[
        'A FortiManager process task is stuck and blocking the ADOM upgrade, so the administrator must fix it.',
        'A user had all ADOMs locked before the upgrade, which stopped them from being upgraded.',
        'FortiManager does not automatically upgrade ADOMs after a firmware upgrade.',
        'The administrator did not run the database integrity check before performing the upgrade.'
      ],
      correct:[2],
      explanation:'ADOMs are upgraded separately from the FortiManager firmware — you must trigger the ADOM upgrade manually after the firmware upgrade.'
    },
    {
      id:'FMGR-61', category:C.ADMIN, type:'multiple', image:null,
      text:'What are two outcomes of ADOM revisions?',
      choices:[
        'ADOM revisions can save the current state of all policy packages and objects for an ADOM.',
        'ADOM revisions do not increase the size of configuration backups.',
        'ADOM revisions can save the current state of the entire ADOM.',
        'ADOM revisions appear in the Install Policy & Package Settings section of the install wizard.'
      ],
      correct:[0,3],
      explanation:'An ADOM revision snapshots every policy package and object in the ADOM, and can be selected during installation to roll back.'
    },

    /* ═══════════════════════════════════════════════════════════
       DEVICE MANAGER  (20-30%)
       Device registration, scripts, revision history, device-level DB.
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FMGR-4', category:C.DEVICE, type:'single', image:'4',
      text:'Refer to the exhibits. An administrator needed to recover all the configurations related to the user, Support. The configurations were saved in configuration revision ID 9. The administrator reverted the configuration using the Configuration Revision History window and received the CLI output shown in the exhibit. What can you conclude from the CLI output?',
      choices:[
        'The revision diff shows that the wrong revision was selected for the revert.',
        'The FortiManager device list confirms the FortiGate was removed from the ADOM.',
        'The reverted configuration was applied successfully to the FortiGate.',
        'The policy package My_ADOM is in an "unknown" status, which indicates that the policy package has not been installed.'
      ],
      correct:[3],
      explanation:'The diagnose dvm device list output shows the policy package for My_ADOM in an "unknown" status — meaning the reverted device-level configuration has not yet been installed to the device.'
    },
    {
      id:'FMGR-6', category:C.DEVICE, type:'multiple', image:null,
      text:'When does FortiManager create a revision history? (Choose two answers)',
      choices:[
        'When FortiManager installs device-level changes on a managed device',
        'When changes to the device-level database are made on FortiManager',
        'When FortiManager is auto-updated with configuration changes made directly on a managed device',
        'When a provisioning template is assigned to a managed device on the device-level database'
      ],
      correct:[0,2],
      explanation:'Revision history entries are created when device-level changes are installed, when a FortiGate is added, when config is retrieved, and when a local change on the FortiGate causes an automatic update.'
    },
    {
      id:'FMGR-9', category:C.DEVICE, type:'single', image:null,
      text:'Which is recommended when you are managing a high volume of logs in your network?',
      choices:[
        'Store logs on FortiManager and use FortiView.',
        'Add and manage FortiAnalyzer from FortiManager.',
        'Enable advanced ADOM mode on FortiManager.',
        'Forward logs from FortiAnalyzer to FortiManager daily.'
      ],
      correct:[1],
      explanation:'FortiManager is not built to store high log volumes. Add and manage FortiAnalyzer from FortiManager so logs are stored and analysed on the right appliance.'
    },
    {
      id:'FMGR-11', category:C.DEVICE, type:'single', image:null,
      text:'What is the best explanation of how FortiManager helps with mass provisioning?',
      choices:[
        'It upgrades the OS of each FortiGate device.',
        'It provides local FortiGuard Distribution Server (FDS) services to the network.',
        'It uses templates to configure the same settings on many devices simultaneously.',
        'It sends email alerts when new devices connect.'
      ],
      correct:[2],
      explanation:'Templates are the mechanism FortiManager uses to apply the same configuration across many devices in one operation.'
    },
    {
      id:'FMGR-14', category:C.DEVICE, type:'single', image:'14',
      text:'Refer to the exhibit. Which operation can you perform with these parameters?',
      choices:[
        'You can add them to objects as custom attributes.',
        'You can export them to be used in other ADOMs.',
        'You can use them as variables in scripts.',
        'You can invoke them using the $ character.'
      ],
      correct:[2],
      explanation:'Meta fields become Jinja-style variables that can be referenced inside CLI scripts and templates to customise per-device values.'
    },
    {
      id:'FMGR-25', category:C.DEVICE, type:'multiple', image:'25',
      text:'Refer to the exhibit. Which two statements about the output are true?',
      choices:[
        'The latest revision history for the managed FortiGate does not match the device-level database.',
        'Configuration changes have been installed on FortiGate, updating policy and device-level database.',
        'The latest revision history for the managed FortiGate does match the FortiManager policy database.',
        'The system template default will override device-level database configurations.'
      ],
      correct:[0,2],
      explanation:'The STATUS line shows dev-db: not modified and conf: in sync — but a pending condition ("cond: pending") indicates a mismatch between the latest revision and the policy database.'
    },
    {
      id:'FMGR-31', category:C.DEVICE, type:'single', image:'31',
      text:'An administrator is copying a system template profile between ADOMs by running the following command: execute fmprofile export-profile ADOM 3547 /tmp/Backup_File output dump to file: [/tmp/Backup_File]. Where does this command export the system template profile from?',
      choices:[
        'FortiManager /tmp/Backup_File folder',
        'FortiManager ADOM policy database',
        'ADOM device database',
        'FortiManager configuration backup file'
      ],
      correct:[1],
      explanation:'The fmprofile export-profile command pulls the profile from the ADOM policy database.'
    },
    {
      id:'FMGR-33', category:C.DEVICE, type:'multiple', image:'33',
      text:'Refer to the exhibit. Which two results occur if you run the script using the Device Database option?',
      choices:[
        'The device Config Status is tagged as Modified.',
        'The script history shows the successful installation of the script on the Remote FortiGate.',
        'The successful execution of a script on the Device Database creates a new revision history.',
        'The administrator must install these changes on a managed device using the Install Wizard.'
      ],
      correct:[0,3],
      explanation:'Running the script against the device database marks the device as Modified, and the changes must then be pushed via the Install Wizard.'
    },
    {
      id:'FMGR-37', category:C.DEVICE, type:'single', image:null,
      text:'What allows FortiManager to run CLI scripts on FortiGate devices without prompting for SSH authentication each time?',
      choices:[
        'FortiGate devices using the legacy login method.',
        'The secure management tunnel between FortiManager and FortiGate devices.',
        'The script using the Remote FortiGate Directly (via CLI) option.',
        'The script on the FortiManager device database.'
      ],
      correct:[1],
      explanation:'Scripts flow through the FGFM (FortiGate-FortiManager) secure management tunnel, so no separate SSH authentication is required.'
    },
    {
      id:'FMGR-41', category:C.DEVICE, type:'multiple', image:null,
      text:'An administrator notices that CLI scripts are failing on some FortiGate devices because they use different FortiOS versions. Which two actions should the administrator take to fix the failing CLI scripts?',
      choices:[
        'Create separate ADOMs for each FortiOS version.',
        'Disable CLI scripts for devices using older firmware.',
        'Modify the CLI scripts to include conditional commands based on FortiOS version.',
        'Create version-specific CLI script groups and assign them to the appropriate devices.'
      ],
      correct:[0,3],
      explanation:'FortiManager best practice is one ADOM per FortiOS major version, with version-specific script groups assigned to the right devices.'
    },
    {
      id:'FMGR-49', category:C.DEVICE, type:'multiple', image:'49',
      text:'Refer to the exhibit. Which two actions will occur if you run the script using the Remote FortiGate Directly (via CLI) option?',
      choices:[
        'FortiManager will provide a preview of CLI commands before executing this script on a managed FortiGate.',
        'FortiManager will create a new revision history.',
        'FortiGate will auto-update the FortiManager device-level database.',
        'You will have to install these changes using the Install Wizard.'
      ],
      correct:[1,2],
      explanation:'Running a script directly on a FortiGate creates a new revision history on FortiManager and causes FortiManager to auto-update its device-level database with the new config.'
    },
    {
      id:'FMGR-51', category:C.DEVICE, type:'single', image:'51',
      text:'Refer to the exhibit. An administrator has assigned the default system template to install all devices with the FortiAnalyzer IP address 10.0.13.12. However, not all FortiGate devices can reach FortiAnalyzer using the default interface. Some devices may use the LAN interface, while others may use the WAN interface. How can the administrator change the source interface for FortiGate devices using the default system template?',
      choices:[
        'Use per-device dynamic object configurations at the ADOM level and apply them in the template.',
        'Configure a metadata variable at the ADOM level and use it in the template.',
        'Create a different system template for each FortiGate, if the configuration is different.',
        'Create a meta field on FortiManager system settings of type Device and use it in the template.'
      ],
      correct:[2],
      explanation:'When device-specific settings differ, the correct approach is one template per device (or per group of identical devices).'
    },
    {
      id:'FMGR-54', category:C.DEVICE, type:'single', image:null,
      text:'A FortiManager administrator opens the revision history and chooses to revert to a previous version. What will this action do to the current device configuration?',
      choices:[
        'It will trigger an unknown device-level database status, and the administrator will have to import a policy package to sync.',
        'It will trigger a conflict status if it is using any provisioning template, and the administrator will have to install changes.',
        'It will revert both configurations: device-level database and policy layer database.',
        'It will modify the device-level database.'
      ],
      correct:[2],
      explanation:'Reverting to a previous revision restores both the device-level database and the policy layer database to that snapshot.'
    },

    /* ═══════════════════════════════════════════════════════════
       POLICY AND OBJECTS  (25-35%)
       Policy packages, object management, install operations.
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FMGR-3', category:C.POLICY, type:'single', image:'3',
      text:'Refer to the exhibit. An administrator has created a firewall address object that is used in multiple policy packages for multiple FortiGate devices in an ADOM. After the installation operation is performed, which IP/netmask will be installed on Remote-Firewall [VDOM1] for the LAN firewall address object?',
      choices:[
        '21.21.2.5/255.255.255.255',
        '172.16.5.20/255.255.255.255',
        '172.16.5.0/255.255.255.0',
        '10.10.10.5/255.255.255.255'
      ],
      correct:[2],
      explanation:'Remote-Firewall[VDOM1] is not in the per-device mapping list (only the root VDOM is). So the default value of the address object — 172.16.5.0/255.255.255.0 — is installed.'
    },
    {
      id:'FMGR-7', category:C.POLICY, type:'single', image:null,
      text:'An administrator has assigned a global policy package to a new ADOM named ADOM1. What will happen if the administrator tries to create a new policy package in ADOM1?',
      choices:[
        'The administrator will be able to select the option to assign the global policy package to the new policy package.',
        'FortiManager will automatically assign the global policy package to the new policy package.',
        'FortiManager will automatically install policies on the policy package in ADOM1.',
        'The administrator will have to assign the global policy package from the global ADOM.'
      ],
      correct:[1],
      explanation:'When a global policy package is already assigned to an ADOM, every new policy package in that ADOM automatically inherits it.'
    },
    {
      id:'FMGR-13', category:C.POLICY, type:'multiple', image:'13',
      text:'Refer to the exhibit. An administrator assigned a new policy package to FortiGate HQ-NGFW-1. In the installation preview, they noticed some settings they did not modify and are unsure about the changes. Based on the exhibit, which two things will happen if they continue with the installation?',
      choices:[
        'FortiGate HQ-NGFW-1 can use FortiManager firmware templates to upgrade firmware and ratings.',
        'FortiGate HQ-NGFW-1 can contact the FortiManager acting as FortiGuard Distribution Server (FDS) to download FortiGuard updates.',
        'FortiGate HQ-NGFW-1 will use the root_CA3 certificate in firewall address objects or policies.',
        'FortiManager will install the CA certificate named root_CA3 to authenticate FortiGate-to-FortiManager communication protocol (FGFM) tunnel connections with FortiGate HQ-NGFW-1.'
      ],
      correct:[1,3],
      explanation:'The preview shows a system central-management server-list pointing at FortiManager as an FDS, and installing root_CA3 to authenticate the FGFM tunnel.'
    },
    {
      id:'FMGR-21', category:C.POLICY, type:'single', image:'21',
      text:'Refer to the exhibit. An administrator added a FortiGate device to FortiManager with the default object settings at the ADOM layer. What can you conclude from the import policy package process of the HQ-NGFW-1 device?',
      choices:[
        'The administrator must select Per-Platform for all interfaces to correctly detect all interfaces from HQ-NGFW-1.',
        'The administrator must manually create the port4 interface on the ADOM layer to avoid import policy errors.',
        'FortiManager will create LAN, port4, and port6 as normalized interfaces at the ADOM layer.',
        'FortiGate may not work as expected when the administrator does not import all objects.'
      ],
      correct:[2],
      explanation:'The interface mapping step shows LAN, port4 and port6 being normalized — FortiManager will create these normalized interface objects in the ADOM.'
    },
    {
      id:'FMGR-27', category:C.POLICY, type:'single', image:'27',
      text:'Refer to the exhibits. An administrator has been asked to install the same policies from a central policy package onto the BR1-FGT-1 firewall. The administrator added BR1-FGT-1 as a target in the central policy package installation. What should the administrator do when reinstalling the central policy package on the BR1-FGT-1 firewall?',
      choices:[
        'Assign only one policy package to the firewall because FortiManager does not allow more than one policy package assigned per device at the same time.',
        'Import the policy package to change the unknown status and synchronize the policy package.',
        'Use the install wizard to install the central policy package on the BR1-FGT-1 firewall.',
        'First resolve the modified status in the configuration and provisioning templates to allow a smooth installation.'
      ],
      correct:[2],
      explanation:'The install wizard is the correct mechanism to push the central policy package to the newly added target device.'
    },
    {
      id:'FMGR-34', category:C.POLICY, type:'single', image:'34',
      text:'What can you conclude, based on the configuration shown in the exhibit?',
      choices:[
        'The administrator needs to retrieve the Local-FortiGate configuration to sync with the Security Fabric group, Training.',
        'Policy sequence #1 will be installed on the internal segmentation firewall (ISFW) device root [NAT] and Trainer [NAT] VDMs.',
        'Policy sequence #3 must have devices or VDMs listed in the Install On column; otherwise, it will cause errors.',
        'The global policy package will be added to the top of the ISFW policy package.'
      ],
      correct:[2],
      explanation:'Policies with the "Install On" column set to "Installation Targets" — instead of a specific device — will fail to install. The column must list devices or VDMs.'
    },
    {
      id:'FMGR-38', category:C.POLICY, type:'single', image:null,
      text:'An administrator assigned the Training global policy package to the Branches policy package in ADOM1. Later, the administrator created a new policy package named Remotes on ADOM1. What should the administrator do to sync the Training global policy package with the Remotes policy package in ADOM1?',
      choices:[
        'Manually add and assign the Remotes policy package to the Training global policy package.',
        'Use the automatically install policies to ADOM devices method to sync from the Training global policy package to the Remotes policy package.',
        'Assign the Training global policy package to the Remotes policy package.',
        'Unassign the Training global policy package and reassign it to all policy packages within ADOM1.'
      ],
      correct:[2],
      explanation:'Each new policy package must have the global policy package explicitly assigned to it — the assignment is not automatic after creation.'
    },
    {
      id:'FMGR-39', category:C.POLICY, type:'single', image:null,
      text:'An administrator receives the import report after importing policies into the policy package layer. Based on the import report ("firewall profile-protocol-options", SKIPPED, "name=default, oid=3491, DUPLICATE"), how did FortiManager handle the profile-protocol-options object named default?',
      choices:[
        'FortiManager deleted the duplicate value from its database.',
        'FortiManager created a new service category in its database.',
        'FortiManager did not update its database with the value.',
        'FortiManager updated the duplicate value in the FortiGate database.'
      ],
      correct:[2],
      explanation:'A SKIPPED status with reason DUPLICATE means FortiManager detected an existing identical object and left its own copy untouched.'
    },
    {
      id:'FMGR-47', category:C.POLICY, type:'single', image:'47',
      text:'Refer to the exhibits. Which IP/netmask will be present in the LAN firewall address object on the Remote-Firewall?',
      choices:[
        '10.0.0.0/255.255.255.0',
        '172.16.0.0/255.255.255.0',
        '192.168.1.0/255.255.255.0',
        '172.16.10.0/255.255.255.0'
      ],
      correct:[0],
      explanation:'Remote-Firewall is not listed in the per-device mappings, so the default value 10.0.0.0/255.255.255.0 is used.'
    },
    {
      id:'FMGR-56', category:C.POLICY, type:'single', image:null,
      text:'An administrator sees that the policy package status of HQ-NGFW-1 is Never Installed. What can you conclude from this status?',
      choices:[
        'The policies have not yet been retrieved from the HQ-NGFW-1 device-level database of FortiManager.',
        'The policy package was never imported to the revision history after HQ-NGFW-1 was registered on FortiManager.',
        'The firewall policies were created or changed in the ADOM, and they need to be installed on the managed HQ-NGFW-1 for the first time.',
        'The firewall policies exist only in the HQ-NGFW-1 device-level database, and no policy package has been assigned to the firewall.'
      ],
      correct:[2],
      explanation:'"Never Installed" means the policy package has been created or modified in FortiManager but has not yet been pushed to the managed FortiGate.'
    },
    {
      id:'FMGR-59', category:C.POLICY, type:'multiple', image:null,
      text:'An administrator created a new global policy package that includes both header policies and footer policies. What two things must the administrator know before deploying the global policy package to ADOM2?',
      choices:[
        'They can promote ADOM2 objects to global objects.',
        'They can assign the global policy package to all or selected policy packages within ADOM2.',
        'They must install from the ADOM2 layer to FortiGate when using the Automatically install policies to ADOM devices option.',
        'They can synchronize policy packages by importing from the ADOM2 policy package into the global ADOM policy package.'
      ],
      correct:[0,1],
      explanation:'ADOM-level objects can be promoted to global objects, and the global policy package can be assigned to all or selected policy packages in the target ADOM.'
    },
    {
      id:'FMGR-62', category:C.POLICY, type:'single', image:null,
      text:'Which FortiGate configuration setting is part of an ADOM-level database on FortiManager?',
      choices:[
        'Security profiles',
        'Routing',
        'NSX-T service template',
        'SNMP'
      ],
      correct:[0],
      explanation:'Security profiles are ADOM-level objects because they are reusable across policy packages. Routing, SNMP and NSX-T are device-level settings.'
    },

    /* ═══════════════════════════════════════════════════════════
       ADVANCED CONFIGURATION  (10-20%)
       HA, FortiGuard services, global database, SD-WAN.
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FMGR-2', category:C.ADV, type:'single', image:'2',
      text:'Refer to the exhibit. If the monitored interface for the primary FortiManager device fails, what must you do to maintain high availability (HA)?',
      choices:[
        'The FortiManager HA failover is transparent to administrators and does not require any additional action.',
        'Manually promote one of the working secondary devices to the primary role, and reboot the original primary device to remove the peer IP address of the failed device.',
        'Reconfigure the primary device to remove the peer IP address of the failed device from its configuration.',
        'Check the integrity database of the primary device to force a secondary device to become the new primary with all active interfaces.'
      ],
      correct:[0],
      explanation:'With VRRP failover mode, HA failover is fully automatic and transparent. The secondary with the highest priority takes over the primary role without admin intervention.'
    },
    {
      id:'FMGR-15', category:C.ADV, type:'multiple', image:null,
      text:'Push updates are failing on a FortiGate device located behind a network address translation (NAT) device. Which two settings should the administrator check to correct this problem?',
      choices:[
        'Make sure the NAT device IP address and the correct ports are configured on FortiManager.',
        'Make sure FortiGuard updates and web service are enabled on the FortiGuard service interface.',
        'Make sure the virtual IP address and the correct ports are configured on the NAT device.',
        'Make sure the Bind to IP address option on the FortiGuard service interface is set to the virtual IP address from the NAT device.'
      ],
      correct:[0,2],
      explanation:'For push updates through NAT, FortiManager needs the NAT device\'s public IP and port, and the NAT device needs the VIP/port that forwards to FortiManager.'
    },
    {
      id:'FMGR-43', category:C.ADV, type:'single', image:null,
      text:'If one of the secondary FortiManager devices fails, which action must be performed to return the FortiManager HA manual mode to a working state?',
      choices:[
        'The FortiManager high availability (HA) state transition is transparent to administrators and does not require any reconfiguration.',
        'Run a sanity check on the failed device to make sure HA heartbeat packets are using TCP port 5199.',
        'Manually promote one of the working secondary devices to the primary role.',
        'Remove the peer IP of the failed device on the primary device.'
      ],
      correct:[3],
      explanation:'In manual HA mode, when a secondary fails the primary retains the stale peer entry. Removing the failed device\'s peer IP restores HA to a clean state.'
    },
    {
      id:'FMGR-44', category:C.ADV, type:'single', image:'44',
      text:'Refer to the exhibit. How does FortiManager get antivirus and IPS updates?',
      choices:[
        'It uses all URLs in the list that contain the fds host name.',
        'It gets updates from the server with IP address 10.0.1.50.',
        'It connects to all servers marked as FortiGuard Distribution Network through Internet (FDNI) sources.',
        'It connects to the public FortiGuard servers listed in the configuration.'
      ],
      correct:[1],
      explanation:'The diagnose fmpudate view-serverlist output shows Server Override Mode: Strict, meaning FortiManager uses only the CLI-configured FDS server (10.0.1.50) and ignores all default servers.'
    },
    {
      id:'FMGR-45', category:C.ADV, type:'single', image:'45',
      text:'Refer to the exhibit. What percentage of the available RAM is being used by the process in charge of downloading the web and email filter databases from the public FortiGuard servers?',
      choices:['1.5','3.1','4.1','2.9'],
      correct:[3],
      explanation:'Process 1464 fgdlink is the FortiGuard daemon that downloads web/email filter databases. Its %MEM column shows 2.9.'
    },
    {
      id:'FMGR-52', category:C.ADV, type:'single', image:'52',
      text:'Refer to the exhibit. Which statement about the environment shown in the exhibit is true?',
      choices:[
        'You must restart the secondary device if you promote it to primary.',
        'No FortiGuard packages have been synchronized between the cluster members.',
        'A failover will take place after five minutes without receiving heartbeat packets.',
        'FortiAnalyzer features are not enabled on this FortiManager device.'
      ],
      correct:[3],
      explanation:'The cluster status shows "Logging & Reporting" and FortiAnalyzer features are not enabled on either member of this FortiManager cluster.'
    },

    /* ═══════════════════════════════════════════════════════════
       TROUBLESHOOTING  (20-30%)
       Deployment scenarios, import/install failures, DB integrity.
       ═══════════════════════════════════════════════════════════ */
    {
      id:'FMGR-8', category:C.TROUBLE, type:'single', image:'8',
      text:'Refer to the exhibits. FortiGate HQ-NGFW-1 downloads and validates FortiGuard databases from FortiManager, which acts as a local FortiGuard Distribution Server (FDS) in a closed network. An administrator pushes a new firewall policy with an intrusion prevention system (IPS) profile from FortiManager to FortiGate HQ-NGFW-1. However, FortiGate does not recognize the new IPS signature from FortiManager. What is the most likely reason why FortiGate HQ-NGFW-1 does not recognize the new IPS signature?',
      choices:[
        'FortiGate must enable rating for the FortiManager IP address, 192.168.1.120, in server list 1.',
        'FortiManager and FortiGate have different IPS database versions.',
        'The administrator must enable IPv6 connections for FortiGuard services on FortiManager.',
        'The administrator must enable the fortiguard-anycast option to correctly download all signatures from the local FDS.'
      ],
      correct:[1],
      explanation:'When the FDS has a newer IPS database than the FortiGate, the pushed policy references signatures the FortiGate does not have. Both sides must be on the same database version.'
    },
    {
      id:'FMGR-10', category:C.TROUBLE, type:'single', image:null,
      text:'While attempting to push a NetFlow configuration script through the FortiManager policy package, an administrator encounters an error stating that an object is unrecognized in line 4. Starting log (Run on database) config vdom edit AGEUSR [line 4] > config sys interface [parameter(s) invalid. detail: object unrecognized] Failed to commit to DB. What must the administrator do to successfully apply the NetFlow configuration script and avoid the object unrecognized error?',
      choices:[
        'Make sure the user running the script has full access to the VDOM-AGEUSR.',
        'Run the script on the device database.',
        'Use metadata variables if they use VDOMs in the script.',
        'Create a normalized interface on the policy layer before running the script.'
      ],
      correct:[1],
      explanation:'"config sys interface" is a system-level configuration — it does not exist in the policy package schema. The script must run against the device database, not the policy package.'
    },
    {
      id:'FMGR-16', category:C.TROUBLE, type:'single', image:null,
      text:'The administrator uses FortiManager to push a CLI script using the Remote FortiGate Directly (via CLI) option to configure an IPsec VPN. However, when running the script, the administrator receives the following error: "config vpn ipsec phase2-interface [parameter(s) invalid. detail: object mismatch]". What must the administrator do to resolve the script error and successfully apply the IPsec configuration?',
      choices:[
        'Add the end command after finishing the IPsec phase1-interface configuration block.',
        'Use IPsec templates to deploy provisioning templates.',
        'Add a second config vpn ipsec phase2-interface block without linking it to phase1.',
        'Run the script using the policy package or ADOM database method.'
      ],
      correct:[0],
      explanation:'The phase1 block is missing its terminating "end" command, so the parser mistakes the phase2 block for part of phase1 and reports a mismatch.'
    },
    {
      id:'FMGR-18', category:C.TROUBLE, type:'single', image:'18',
      text:'Refer to the exhibits. An administrator must add a FortiGate device to FortiManager using the discovery process. FortiManager is operating behind a network address translation (NAT) device, and the administrator configured the FortiManager NATed IP address under the FortiManager system administration settings. What is the expected result during discovery?',
      choices:[
        'FortiManager sets both the 100.65.0.120 IP address and 10.0.13.120 IP address on FortiGate.',
        'FortiManager sets both the 100.65.0.120 IP address and 100.65.0.101 IP address on FortiGate.',
        'FortiManager sets the 100.65.0.101 IP address on FortiGate.',
        'FortiManager sets the 100.65.0.120 IP address on FortiGate.'
      ],
      correct:[3],
      explanation:'With mgmt-addr configured, the FortiManager advertises its NATed IP (100.65.0.120) to the FortiGate during discovery.'
    },
    {
      id:'FMGR-19', category:C.TROUBLE, type:'single', image:null,
      text:'An administrator configures a new BGP peer in the FortiManager device-level database of FortiGate. They reinstall the policy package to the managed FortiGate device without any errors. However, when the administrator logs in to FortiGate, they do not see the BGP configuration changes. What is the most likely reason why FortiManager did not push the BGP peer changes to FortiGate?',
      choices:[
        'The administrator must run a sanity check on FortiManager to make sure the database is not corrupted.',
        'FortiGate has a BGP template assigned on the FortiManager database.',
        'The administrator must use the Install Wizard and select Install device settings only to push BGP settings.',
        'The FortiGate firmware version is different from the FortiManager ADOM version.'
      ],
      correct:[2],
      explanation:'BGP is device-level configuration. It is only pushed when the install wizard installs device settings — the policy package install alone does not carry it.'
    },
    {
      id:'FMGR-22', category:C.TROUBLE, type:'single', image:'22',
      text:'Refer to the exhibits. An administrator runs the reload failure command diagnose test deploymanager reloadconf 262 on FortiManager. Why does the administrator receive an error message?',
      choices:[
        'The administrator must use the FortiGate name instead of the ID number.',
        'The administrator just recently added FortiGate HQ-NGFW as a model device.',
        'FortiManager requires the FortiGate serial number instead of the ID number.',
        'FortiManager does not support FortiOS version 7.0.'
      ],
      correct:[1],
      explanation:'HQ-NGFW is a model device — it has no real FortiGate behind it — so FortiManager cannot retrieve its configuration file. The connection state shows "unknown" throughout.'
    },
    {
      id:'FMGR-24', category:C.TROUBLE, type:'single', image:'24',
      text:'Refer to the exhibits. An administrator needs to push a FortiToken Mobile to assign it to HR_user in the HQ-NGFW-1. However, when installing the policy package, they receive an error message: "Mobile FortiToken FTFKMO84A9AC5C56D used by user local HR_user could not be found at device". Why is the administrator not able to install the FortiToken on the HQ-NGFW-1 firewall?',
      choices:[
        'The administrator must use a user local meta field to assign FortiToken.',
        'The administrator must use a valid FortiToken that exists on HQ-NGFW-1.',
        'The administrator must use a metadata variable to assign the same FortiToken to multiple users in FortiManager.',
        'The administrator must use per-device mapping to assign the FortiToken to HQ-NGFW-1.'
      ],
      correct:[1],
      explanation:'The FortiToken serial referenced in FortiManager does not exist on the target FortiGate. The token must be registered on HQ-NGFW-1 first.'
    },
    {
      id:'FMGR-26', category:C.TROUBLE, type:'single', image:'26',
      text:'Refer to the exhibits. An administrator must replace the source LAN interface in policy ID 2 on their FortiGateRugged-70F. However, when they try to install the policy package, they receive the error shown in the exhibit. What should the administrator do to resolve the error?',
      choices:[
        'Create a per-device mapping for the LAN interface.',
        'Use a metadata variable to dynamically assign an interface when this error occurs.',
        'Use the API to assign a system template interface for FortiGateRugged-70F model.',
        'Replace LAN with lan1, which is supported by FortiGateRugged-70F models.'
      ],
      correct:[0],
      explanation:'"Dynamic interface LAN mapping undefined for device HQ-NGFW-1" is resolved by creating a per-device mapping that binds the logical LAN interface to the device\'s physical interface.'
    },
    {
      id:'FMGR-30', category:C.TROUBLE, type:'single', image:'30',
      text:'Refer to the exhibit. What can you conclude from the downloaded import report?',
      choices:[
        'FortiManager does not support per-device mapping for firewall addresses.',
        'The administrator will see a new policy package named Remote-FortiGate_root in the FortiManager ADOM database.',
        'FortiManager will change the configuration of REMOTE_SUBNET to match the interface mapping coming in from Remote-FortiGate.',
        'As a result of this policy import process, FortiManager will create a new firewall address called REMOTE_SUBNET in the ADOM database.'
      ],
      correct:[1],
      explanation:'The import created a new policy package "Remote-FortiGate_root" in the ADOM even though two objects within it failed to import due to interface binding issues.'
    },
    {
      id:'FMGR-36', category:C.TROUBLE, type:'single', image:'36',
      text:'Refer to the exhibits. An administrator used the Configuration Revision History window to revert the FortiGate device configuration to revision ID 6. After running the reinstall policy package, the administrator noticed problems with the firewall policy — they could not see the unset comment on policy ID 1. Why did FortiManager not remove the comment from policy ID 1 when the administrator ran reinstall policy package?',
      choices:[
        'Because the administrator student must install the configuration changes to correctly see the expected results.',
        'Because the administrator must import the firewall policies to update the firewall policy package.',
        'Because every time the administrator uses the revert config file, they must use the Install Wizard instead of running the reinstall policy package.',
        'Because the administrator used the Revision Diff view, which shows what changed, not what will be installed.'
      ],
      correct:[1],
      explanation:'Reverting the config on the FortiGate does not automatically update FortiManager\'s policy package. The policy package must be re-imported from the device to reflect the reverted state.'
    },
    {
      id:'FMGR-42', category:C.TROUBLE, type:'single', image:'42',
      text:'Refer to the exhibits. An administrator ran the Install Wizard and selected to install both the policy package and device settings. Why can the administrator not install the policy package on HQ-NGFW-1?',
      choices:[
        'The administrator must change the Install on column from Installation Targets to HQ-NGFW-1.',
        'The administrator must replace the interface Port6 with port6.',
        'The administrator must use the admin user to install the policy package.',
        'The administrator must remove the policy block assigned to HQ-NGFW-1.'
      ],
      correct:[1],
      explanation:'Interface names are case-sensitive on FortiManager. "Port6" does not match the device\'s "port6", causing the install to fail.'
    },
    {
      id:'FMGR-46', category:C.TROUBLE, type:'single', image:'46',
      text:'Refer to the exhibits. An administrator added BR1-FGT-1 to FortiManager and started importing the policy package. During the process, they saw that they need to choose values from FortiGate or FortiManager. Which conclusion is most clearly supported by the exhibits?',
      choices:[
        'BR1-FGT-1 does not support the SSL/SSH profile with HTTPS on port 443.',
        'The administrator must match the FortiOS firmware version with the FortiManager ADOM firmware version to resolve the conflict status.',
        'The default Firewall Profile-Protocol-Options object is the only profile that does not significantly affect any configuration changes on either FortiManager or FortiGate.',
        'FortiManager has a different FortiGuard database compared to FortiGate BR1-FGT-1 for the QUIC protocol.'
      ],
      correct:[3],
      explanation:'The FW SSL-SSH-Profile conflict shows FortiGate allowing QUIC while FortiManager inspects it — a FortiGuard database version mismatch on the QUIC protocol.'
    },
    {
      id:'FMGR-50', category:C.TROUBLE, type:'single', image:null,
      text:'An administrator created a new ADOM named Training for FortiGate devices only. Then, the administrator added the root FortiGate device of a Security Fabric group to the Training ADOM. Which statement correctly describes the expected result for the downstream devices in the Security Fabric, given the actions taken by the administrator?',
      choices:[
        'The downstream devices are automatically authorized.',
        'The downstream devices will appear in the Managed FortiGate section of the root ADOM.',
        'The downstream devices show as unauthorized in the root ADOM.',
        'The downstream devices must be added using the Add Device wizard.'
      ],
      correct:[2],
      explanation:'Adding the fabric root does not auto-authorize downstream devices — they appear as "unauthorized" in FortiManager until manually approved.'
    },
    {
      id:'FMGR-53', category:C.TROUBLE, type:'single', image:'53',
      text:'Refer to the exhibit. What can you conclude from the failed installation log shown in the exhibit?',
      choices:[
        'Policy ID 2 is installed in the disabled state.',
        'Policy ID 2 will not be installed.',
        'Policy ID 2 is installed without a source address.',
        'Policy ID 2 is installed without the remote user student.'
      ],
      correct:[3],
      explanation:'The log shows "entry not found in datasource: student" for the firewall policy — the policy is installed but the user reference fails, so the remote user is dropped.'
    },
    {
      id:'FMGR-58', category:C.TROUBLE, type:'multiple', image:null,
      text:'What are two expected results when both FortiManager and FortiGate are behind network address translation (NAT) devices?',
      choices:[
        'FortiGate is discovered by FortiManager through the FortiGate NATed IP address.',
        'During discovery, the FortiManager NATed IP address is not set by default on FortiGate.',
        'FortiGate can announce itself to FortiManager only if the FortiManager non-NATed IP address is configured on FortiGate under central management.',
        'If the FortiGate-FortiManager communication protocol (FGFM) tunnel is torn down, FortiManager will try to reestablish the FGFM tunnel.'
      ],
      correct:[0,1],
      explanation:'Discovery works via the FortiGate NATed IP, but FortiManager\'s own NATed address must be manually configured — it is not advertised by default.'
    },
    {
      id:'FMGR-60', category:C.TROUBLE, type:'multiple', image:null,
      text:'Which two statements about the integrity of databases on FortiManager are correct?',
      choices:[
        'The diagnose cdb check adomintegrity command can correct issues related to locked devices.',
        'The diagnose dvm check-integrity command attempts to fix a corrupted file system.',
        'Scheduled backups run database integrity commands automatically.',
        'You should fix all database integrity issues before performing a script.',
        'Not following the correct upgrade path may cause inconsistencies in the databases.'
      ],
      correct:[2,4],
      explanation:'Scheduled backups run integrity checks automatically, and skipping the correct upgrade path is a common cause of database inconsistencies.'
    }

  ];

  window.ExamRegistry.setBank('fmgr', QUESTIONS);
})();
