// 1. DATA STORES ENGINE (LOCALSTORAGE CORE MATRIX)
let employeeDatabase = JSON.parse(localStorage.getItem("employees")) || [];
let communicationPackets = JSON.parse(localStorage.getItem("portalMessages")) || [];
let activeSessionProfile = null;

// HARDCODED SECURE ADMIN CONSOLE ACCESS IDENTITIES
const ROOT_ADMIN_UID = "TECH4145004001";
const ROOT_ADMIN_TOKEN = "Soumya@7890";

// 2. AUTH MODULE PROCESSORS
function validatePortalAccess() {
    const idField = document.getElementById("loginId");
    const passField = document.getElementById("loginPass");
    const errorLog = document.getElementById("loginErrorFrame");

    const inputUid = idField.value.trim();
    const inputToken = passField.value.trim();

    if (!inputUid || !inputToken) {
        errorLog.textContent = "Security Breach: Missing Node Validation Fields.";
        return;
    }

    // CHECK A: Identity evaluates to Master Controller Array
    if (inputUid === ROOT_ADMIN_UID && inputToken === ROOT_ADMIN_TOKEN) {
        activeSessionProfile = {
            id: ROOT_ADMIN_UID,
            name: "Soumya Sir (Admin)",
            role: "Root System Controller",
            isAdmin: true
        };
        bootInternalPortal();
        return;
    }

    // CHECK B: Identity evaluates to Local Data Storage Arrays
    const linkedEmployee = employeeDatabase.find(emp => emp.id === inputUid && emp.pass === inputToken);
    if (linkedEmployee) {
        activeSessionProfile = {
            id: linkedEmployee.id,
            name: linkedEmployee.name,
            role: "Authorized Operator",
            isAdmin: false
        };
        bootInternalPortal();
    } else {
        errorLog.textContent = "ACCESS DENIED: INVALID PRIVILEGE PROFILE TOKEN.";
    }
}

function bootInternalPortal() {
    // Hide Auth Interface
    document.getElementById("login-gate").classList.add("hidden");
    document.getElementById("portal-dashboard").classList.remove("hidden");
    
    // Clear Input Errors and buffers
    document.getElementById("loginId").value = '';
    document.getElementById("loginPass").value = '';
    document.getElementById("loginErrorFrame").textContent = '';

    // Print Identity metadata inside status bar
    document.getElementById("session-user-display").textContent = `${activeSessionProfile.name} [${activeSessionProfile.role}]`;

    // Privilege Masking Configuration Loops
    const adminNodes = document.querySelectorAll(".admin-core");
    adminNodes.forEach(node => {
        if (activeSessionProfile.isAdmin) {
            node.classList.remove("hidden");
        } else {
            node.classList.add("hidden");
        }
    });

    const msgNode = document.getElementById("employee-message-node");
    if (activeSessionProfile.isAdmin) {
        msgNode.classList.add("hidden"); // Admin panel consumes stream directly
    } else {
        msgNode.classList.remove("hidden");
    }

    // Initialize subsystems pools
    generateLiveCalendar();
    syncWorkforceNodesTable();
    syncInboundMessageQueue();
    switchTab('home');
}

// 3. TAB ENGINE AND DESK ROUTER LAYERS
function switchTab(tabId) {
    // Escalate security barrier block lines
    if ((tabId === 'employees' || tabId === 'admin-panel') && !activeSessionProfile.isAdmin) {
        alert("Privilege Escalation Intercepted: Root Admin required.");
        return;
    }

    document.querySelectorAll('.dashboard-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));

    const targetSection = document.getElementById(`tab-${tabId}`);
    const targetMenu = document.getElementById(`menu-${tabId}`);
    
    if (targetSection) targetSection.classList.add('active');
    if (targetMenu) targetMenu.classList.add('active');

    // Tab-specific data hot reload
    if (tabId === 'admin-panel') syncInboundMessageQueue();
    if (tabId === 'employees') syncWorkforceNodesTable();
}

// 4. CHRONO DYNAMIC MATRIX LOOP SYSTEM
function runDigitalClockEngine() {
    const clock = document.getElementById('digital-clock');
    if (!clock) return;

    const now = new Date();
    let hours = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    const meridian = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    clock.textContent = `${String(hours).padStart(2, '0')}:${mins}:${secs} ${meridian}`;
}
setInterval(runDigitalClockEngine, 1000);

// 5. CALENDAR GENERATION PIPELINE MODULES
function generateLiveCalendar() {
    const textFrame = document.getElementById('calendar-month-year');
    const gridFrame = document.getElementById('calendar-days');
    if (!gridFrame) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    textFrame.textContent = `${months[month]} ${year}`;

    const startDayIndex = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    gridFrame.innerHTML = '';

    for (let i = 0; i < startDayIndex; i++) {
        gridFrame.appendChild(document.createElement('div'));
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
        const cell = document.createElement('div');
        cell.textContent = day;
        if (day === today) cell.classList.add('today');
        gridFrame.appendChild(cell);
    }
}

// 6. MESSENGER STREAM PROCESSING CONSOLES
function transmitMessage() {
    const textGroup = document.getElementById('msg-text');
    const msgContent = textGroup.value.trim();

    if (!msgContent) {
        alert("Transmission Error: Broadcast packet buffer cannot be null.");
        return;
    }

    const now = new Date();
    const newPacket = {
        timestamp: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
        senderName: activeSessionProfile.name,
        senderUid: activeSessionProfile.id,
        payload: msgContent
    };

    communicationPackets.push(newPacket);
    localStorage.setItem("portalMessages", JSON.stringify(communicationPackets));
    
    textGroup.value = '';
    alert("Data Packet Ingestion Successful: Message sent to Admin Console Node.");
}

function syncInboundMessageQueue() {
    const streamContainer = document.getElementById('admin-message-stream');
    if (!streamContainer) return;

    streamContainer.innerHTML = '';

    if (communicationPackets.length === 0) {
        streamContainer.innerHTML = `
            <tr id="no-msg-placeholder">
                <td colspan="4" style="text-align: center; color: var(--text-dim);">No inbound data packets found in current queue.</td>
            </tr>`;
        return;
    }

    communicationPackets.slice().reverse().forEach(packet => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="color: var(--accent-glow); font-weight: bold;">${packet.timestamp}</td>
            <td>${packet.senderName}</td>
            <td style="color: var(--text-dim); font-family: monospace;">${packet.senderUid}</td>
            <td style="word-break: break-all;">${packet.payload}</td>
        `;
        streamContainer.appendChild(row);
    });
}

// 7. WORKFORCE PROVISIONING REGISTRY MANAGEMENT SYSTEMS
function registerNewEmployeeNode() {
    const nameInp = document.getElementById("regName");
    const idInp = document.getElementById("regId");
    const passInp = document.getElementById("regPass");

    const empName = nameInp.value.trim();
    const empId = idInp.value.trim();
    const empPass = passInp.value.trim();

    if (!empName || !empId || !empPass) {
        alert("Provision Error: Field validations incomplete.");
        return;
    }

    // Unique Constraint Validation Intercept
    const checkDuplicate = employeeDatabase.some(emp => emp.id === empId);
    if (checkDuplicate || empId === ROOT_ADMIN_UID) {
        alert("Node Conflict: Unique Target ID signature signature collision detected.");
        return;
    }

    const newEmployee = { id: empId, name: empName, pass: empPass };
    employeeDatabase.push(newEmployee);
    localStorage.setItem("employees", JSON.stringify(employeeDatabase));

    nameInp.value = '';
    idInp.value = '';
    passInp.value = '';

    alert(`Node [${empId}] committed to local engine memory configurations pool successfully.`);
    syncWorkforceNodesTable();
}

function syncWorkforceNodesTable() {
    const tbody = document.getElementById("workforce-table-body");
    if (!tbody) return;

    tbody.innerHTML = '';

    if (employeeDatabase.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-dim);">No active workforce records mapped in memory tree structure.</td></tr>`;
        return;
    }

    employeeDatabase.forEach((emp, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="font-family: monospace; color: var(--accent-glow);">${emp.id}</td>
            <td><strong>${emp.name}</strong></td>
            <td style="font-family: monospace; color: var(--text-dim);">••••••••</td>
            <td><button class="btn-row-delete" onclick="deprovisionNode(${index})">DEPROVISION</button></td>
        `;
        tbody.appendChild(row);
    });
}

function deprovisionNode(index) {
    if (confirm(`Deprovision Operation Warning: Delete record connection index [${employeeDatabase[index].id}] permanently?`)) {
        employeeDatabase.splice(index, 1);
        localStorage.setItem("employees", JSON.stringify(employeeDatabase));
        syncWorkforceNodesTable();
    }
}

function purgeEntireWorkforceDatabase() {
    if (confirm("CRITICAL PURGE COMMAND: Flush entire local database memory allocations? This action cannot be reversed.")) {
        employeeDatabase = [];
        communicationPackets = [];
        localStorage.removeItem("employees");
        localStorage.removeItem("portalMessages");
        syncWorkforceNodesTable();
        syncInboundMessageQueue();
        alert("Data array nodes dropped successfully. All registries are cleared.");
    }
}

function seedMockWorkforceData() {
    if (employeeDatabase.length > 0) {
        alert("Abort Command: Sample data ingestion requires empty structure registry files.");
        return;
    }
    const samples = [
        { id: "TECH1001", name: "Amit Kumar Sharma", pass: "Amit@123" },
        { id: "TECH1002", name: "Priyanka Mohanty", pass: "Pri@456" },
        { id: "TECH1003", name: "Rajesh Kumar Rout", pass: "Raj@789" }
    ];
    employeeDatabase = samples;
    localStorage.setItem("employees", JSON.stringify(employeeDatabase));
    syncWorkforceNodesTable();
    alert("Sample dataset profiles compiled down to active structures registers.");
}

// 8. ENVIRONMENTAL MODE OVERRIDES & LOGOUT NODE CLOSURES
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const icon = document.querySelector('.btn-toggle i');
    icon.className = document.body.classList.contains('light-theme') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

function shutdownSession() {
    activeSessionProfile = null;
    document.getElementById("portal-dashboard").classList.add("hidden");
    document.getElementById("login-gate").classList.remove("hidden");
}