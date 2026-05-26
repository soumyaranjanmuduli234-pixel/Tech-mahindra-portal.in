/* ========================================================
   INTEGRATED GLASSMORPHISM DESK ENGINE - CORE SECURED ARCHITECTURE
   ======================================================== */

// Base64 Obfuscated Credentials Protection Shield Matrices
const _authMatrixNode = 'YWRtaW4='; // admin
const _tokenMatrixNode = 'YWRtaW4xMjM='; // admin123

// Core Database Array Infrastructure
let employeeDatabase = [];
let submittedTasks = [];
let authenticatedUser = null;
let securityThreatCounter = 0;
let isCurrentThemeLight = false;

const navigationMasterMatrix = [
  { id: 'panel-home-base', label: 'Dashboard Control', icon: 'fa-th-large', visibleFor: ['admin', 'employee'] },
  { id: 'panel-employee-master', label: 'Employee Base Manager', icon: 'fa-users-cog', visibleFor: ['admin'] },
  { id: 'panel-live-desk', label: 'Live Desk Attendance', icon: 'fa-satellite-dish', visibleFor: ['admin'] },
  { id: 'panel-reports-desk', label: 'Operations & Submission Terminal', icon: 'fa-folder-open', visibleFor: ['admin', 'employee'] }
];

document.addEventListener("DOMContentLoaded", () => {
  initializeLiveSystemClockEngine();
  setupLoginFormListener();
  initializeAntiInspectSecurityShield(); // DevTools protection active
  updateAnalyticsCounterWidgets();
  
  document.getElementById('firstName').addEventListener('input', computeSystemCredentialsVector);
  document.getElementById('empMobileNo').addEventListener('input', computeSystemCredentialsVector);
});

/* ========================================================
   🛡️ ADVANCED BRUTE-FORCE PROTECTION & SECURE ANTI-INSPECT ENGINE
   ======================================================== */
function initializeAntiInspectSecurityShield() {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    logSecurityIntegrityEvent("WARNING: Unauthorized Right-Click context menu request intercepted.", "warn-log");
    triggerPremiumGlassToast("Security Policy: Inspect options restricted.", "error-type");
  });

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
      logSecurityIntegrityEvent(`CRITICAL: Hotkey combo '${e.key}' block activation triggered.`, "danger-log");
      activateSecurityDefenseBlur();
    }
  });

  setInterval(() => {
    const startTime = performance.now();
    debugger;
    if (performance.now() - startTime > 100) {
      logSecurityIntegrityEvent("CRITICAL: Console injection debugger trap activated.", "danger-log");
      activateSecurityDefenseBlur();
    }
  }, 600);
}

function activateSecurityDefenseBlur() {
  document.body.classList.add("security-blur");
  triggerPremiumGlassToast("Security Matrix Infringement Detected! Controls Intercepted.", "error-type");
  setTimeout(() => document.body.classList.remove("security-blur"), 3500);
}

function logSecurityIntegrityEvent(message, classificationClass) {
  const consoleLogBox = document.getElementById("systemSecurityLogConsole");
  if (!consoleLogBox) return;
  
  const timestamp = new Date().toLocaleTimeString();
  const logRow = document.createElement("div");
  logRow.className = `log-line ${classificationClass}`;
  logRow.textContent = `[${timestamp}] ${message}`;
  
  consoleLogBox.appendChild(logRow);
  consoleLogBox.scrollTop = consoleLogBox.scrollHeight;
}

/* ========================================================
   🌓 FUTURISTIC CORE THEME TOGGLE ROUTINE
   ======================================================== */
function toggleSystemThemeMode() {
  isCurrentThemeLight = !isCurrentThemeLight;
  const toggleBtn = document.getElementById("systemThemeToggleBtn");
  
  if (isCurrentThemeLight) {
    document.body.classList.add("light-core-active");
    toggleBtn.innerHTML = `<i class="fa fa-sun"></i> <span>Light Cyber Active</span>`;
    triggerPremiumGlassToast("Switched to Light Cyber Core Layout.", "success-type");
  } else {
    document.body.classList.remove("light-core-active");
    toggleBtn.innerHTML = `<i class="fa fa-moon"></i> <span>Dark Core Live</span>`;
    triggerPremiumGlassToast("Switched to Dark Core Layout.", "success-type");
  }
}

/* ========================================================
   📊 INTERACTIVE REAL-TIME COUNTER ENGINE
   ======================================================== */
function updateAnalyticsCounterWidgets() {
  const presentCount = employeeDatabase.filter(e => e.attendanceStatus === "Present").length;
  const pendingTasks = submittedTasks.filter(t => !t.audited).length;
  
  document.getElementById("statTotalWorkforce").textContent = String(employeeDatabase.length).padStart(2, '0');
  document.getElementById("statActiveNodes").textContent = String(presentCount).padStart(2, '0');
  document.getElementById("statPendingBatches").textContent = String(pendingTasks).padStart(2, '0');
}

/* ========================================================
   SESSION REGISTRATION & LOGIN GATE CONTROL
   ======================================================== */
function setupLoginFormListener() {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const userIdInput = document.getElementById("loginIdentity").value.trim();
    const tokenInput = document.getElementById("loginToken").value.trim();
    
    if (userIdInput === atob(_authMatrixNode) && tokenInput === atob(_tokenMatrixNode)) {
      securityThreatCounter = 0; // Reset threshold
      executeAuthenticationSequence("admin", "System Administrator Control Node");
    } else {
      const matchedProfile = employeeDatabase.find(emp => emp.uid === userIdInput && emp.password === tokenInput);
      if (matchedProfile) {
        securityThreatCounter = 0;
        executeAuthenticationSequence("employee", `${matchedProfile.firstName} ${matchedProfile.lastName}`, matchedProfile);
      } else {
        securityThreatCounter++;
        if (securityThreatCounter >= 3) {
          triggerPremiumGlassToast("BRUTE FORCE ALERT: Access blocked for safety parameters.", "error-type");
          document.getElementById("loginForm").querySelector("button").setAttribute("disabled", "true");
          setTimeout(() => {
            document.getElementById("loginForm").querySelector("button").removeAttribute("disabled");
            securityThreatCounter = 0;
          }, 30000); // 30 seconds login freeze window lockout simulation
        } else {
          triggerPremiumGlassToast(`Authentication Failed. Attempt ${securityThreatCounter}/3.`, "error-type");
        }
      }
    }
  });
}

function executeAuthenticationSequence(role, displayIdentity, profileReference = null) {
  const loader = document.getElementById("globalPageLoader");
  loader.style.display = "flex";
  
  setTimeout(() => {
    loader.style.display = "none";
    document.getElementById("authGate").style.display = "none";
    document.getElementById("workspaceContainer").style.display = "grid";
    
    authenticatedUser = { role: role, name: displayIdentity, data: profileReference };
    document.getElementById("userWelcomeMessage").textContent = `Welcome Back, ${displayIdentity}!`;
    
    generateDynamicWorkspaceSidebarNavigation();
    configureInterfaceLayoutDeskPanels();
    updateAnalyticsCounterWidgets();
    
    if(role === 'admin') {
      logSecurityIntegrityEvent(`SYSTEM: Admin terminal initialized safely by node authority.`, "success-log");
    }
    triggerPremiumGlassToast(`Access Granted Session: Master ${role.toUpperCase()} Node Live.`, "success-type");
  }, 3000);
}

function terminateSession() {
  if(authenticatedUser && authenticatedUser.role === 'admin') {
    logSecurityIntegrityEvent("SYSTEM: Admin session terminated via user log request.", "warn-log");
  }
  authenticatedUser = null;
  document.getElementById("workspaceContainer").style.display = "none";
  document.getElementById("authGate").style.display = "flex";
  document.getElementById("loginForm").reset();
  triggerPremiumGlassToast("Session Terminated Safely. Control Desk Locked.", "error-type");
}

/* ========================================================
   DYNAMIC SIDEBAR ROUTER SYSTEM
   ======================================================== */
function generateDynamicWorkspaceSidebarNavigation() {
  const container = document.getElementById("sidebarNavMenu");
  container.innerHTML = "";
  
  navigationMasterMatrix.forEach((menu) => {
    if (menu.visibleFor.includes(authenticatedUser.role)) {
      const btn = document.createElement("button");
      btn.className = `nav-link-item ${menu.id === 'panel-home-base' ? 'active' : ''}`;
      btn.innerHTML = `<i class="fa ${menu.icon}"></i> ${menu.label}`;
      btn.onclick = () => routeWorkspaceActiveViewportPanel(menu.id, btn);
      container.appendChild(btn);
    }
  });
}

function routeWorkspaceActiveViewportPanel(panelId, clickElementTarget) {
  document.querySelectorAll(".nav-link-item").forEach(lnk => lnk.classList.remove("active"));
  clickElementTarget.classList.add("active");
  
  document.querySelectorAll(".workspace-panel").forEach(panel => panel.classList.remove("active"));
  document.getElementById(panelId).classList.add("active");
  
  document.getElementById("mainSidebarDrawer").classList.remove("mobile-drawer-open");
}

function configureInterfaceLayoutDeskPanels() {
  const adminReportDesk = document.getElementById("adminReportSection");
  const employeeSubmitDesk = document.getElementById("employeeSubmitSection");
  const adminTaskMatrixArea = document.getElementById("adminTasksSection");
  const integrityLogsArea = document.getElementById("securityThreatTerminalSection");
  
  if (authenticatedUser.role === "admin") {
    adminReportDesk.style.display = "block";
    adminTaskMatrixArea.style.display = "block";
    integrityLogsArea.style.display = "block";
    employeeSubmitDesk.style.display = "none";
    evaluateShiftReportDownloadPrivilege();
  } else {
    adminReportDesk.style.display = "none";
    adminTaskMatrixArea.style.display = "none";
    integrityLogsArea.style.display = "none";
    employeeSubmitDesk.style.display = "block";
    
    document.getElementById("task-uid").value = authenticatedUser.data.uid;
    document.getElementById("task-name").value = `${authenticatedUser.data.firstName} ${authenticatedUser.data.lastName}`;
    document.getElementById("task-email").value = authenticatedUser.data.empEmail;
  }
}

function toggleMobileSidebarMenu() {
  document.getElementById("mainSidebarDrawer").classList.toggle("mobile-drawer-open");
}

/* ========================================================
   EMPLOYEE REGISTRATION SYSTEM INTERFACES
   ======================================================== */
function toggleFormDrawer(visibilityState) {
  const drawer = document.getElementById("formDrawer");
  drawer.style.display = visibilityState ? "block" : "none";
  if(!visibilityState) document.getElementById("employeeEntryForm").reset();
}

function computeSystemCredentialsVector() {
  const fName = document.getElementById('firstName').value.trim();
  const mobile = document.getElementById('empMobileNo').value.trim();
  
  if(fName.length >= 2 && mobile.length >= 4) {
    const rawUidString = "TM-" + fName.substring(0,3).toUpperCase() + mobile.substring(mobile.length - 4);
    const generatedPassStr = "Pass@" + mobile.substring(0,4);
    
    document.getElementById("generatedUID").value = rawUidString;
    document.getElementById("generatedPassword").value = generatedPassStr;
  } else {
    document.getElementById("generatedUID").value = "";
    document.getElementById("generatedPassword").value = "";
  }
}

// 🗂️ BASE64 VISUAL FILE HANDLING AND PROCESSING INTERFACES
let capturedPhotoBase64 = "";
let capturedCvBase64 = "";

function registerNewEmployee(event) {
  event.preventDefault();
  
  const uid = document.getElementById("generatedUID").value;
  const pass = document.getElementById("generatedPassword").value;
  
  const photoInput = document.getElementById("empImageFile").files[0];
  const cvInput = document.getElementById("empCvFile").files[0];

  const processEmployeeCreation = (photoBase64, cvBase64) => {
    const newProfile = {
      uid: uid, password: pass,
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      empMobileNo: document.getElementById("empMobileNo").value.trim(),
      empEmail: document.getElementById("empEmail").value.trim(),
      hrName: document.getElementById("hrName").value.trim(),
      hrMobile: document.getElementById("hrMobile").value.trim(),
      empState: document.getElementById("empState").value.trim(),
      empDistrict: document.getElementById("empDistrict").value.trim(),
      photoData: photoBase64 || null,
      cvData: cvBase64 || null,
      photoName: photoInput?.name || "image.png",
      cvName: cvInput?.name || "No CV attached",
      attendanceStatus: Math.random() > 0.3 ? "Present" : "Absent"
    };
    
    employeeDatabase.push(newProfile);
    logSecurityIntegrityEvent(`SYSTEM: Registered new workforce identity code ${uid}.`, "success-log");
    refreshEmployeeDataMatrixSpace();
    synchronizeAttendanceDashboardWidgets();
    updateAnalyticsCounterWidgets();
    if (authenticatedUser.role === 'admin') evaluateShiftReportDownloadPrivilege();
    
    toggleFormDrawer(false);
    triggerPremiumGlassToast(`Profile Registration Complete: ${uid}`, "success-type");
  };

  // Convert files to base64 synchronously via Promise blocks
  const readAsDataURL = (file) => {
    if (!file) return Promise.resolve("");
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  Promise.all([readAsDataURL(photoInput), readAsDataURL(cvInput)]).then(([photoB64, cvB64]) => {
    processEmployeeCreation(photoB64, cvB64);
  });
}

function refreshEmployeeDataMatrixSpace() {
  const container = document.getElementById("employee-matrix-space");
  container.innerHTML = "";
  
  employeeDatabase.forEach((emp) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong style="color:var(--accent-blue); font-family:'JetBrains Mono';">${emp.uid}</strong></td>
      <td>
        <div class="employee-row-profile">
          <img src="${emp.photoData ? emp.photoData : 'https://via.placeholder.com/44'}" alt="Avatar">
          <div>
            <div><strong>${emp.firstName}</strong></div>
            <div style="font-size:0.78rem; color:var(--text-dim);"><i class="fa fa-phone"></i> ${emp.empMobileNo}</div>
          </div>
        </div>
      </td>
      <td>
        <div style="font-size:0.85rem;"><span style="color:var(--text-dim);">Aadhaar:</span> [Protected Profile Matrix]</div>
        <div style="font-size:0.85rem;"><span style="color:var(--text-dim);">Mail:</span> ${emp.empEmail}</div>
      </td>
      <td>
        <div><strong>${emp.hrName}</strong></div>
        <div style="font-size:0.78rem; color:var(--text-dim);"><i class="fa fa-phone"></i> ${emp.hrMobile}</div>
      </td>
      <td>
        <div style="font-size:0.8rem; color:var(--accent-green); cursor:pointer;" onclick="launchFilePreviewModal('${emp.uid}', 'photo')"><i class="fa fa-image"></i> Preview Image</div>
        <div style="font-size:0.8rem; color:var(--accent-purple); cursor:pointer;" onclick="launchFilePreviewModal('${emp.uid}', 'cv')"><i class="fa fa-file-pdf"></i> View CV Document</div>
      </td>
      <td>
        <button class="nav-btn-glow" style="padding:6px 12px; font-size:0.78rem;" onclick="generateSingleEmployeeIdCardPdf('${emp.uid}')">
          <i class="fa fa-id-card"></i> ID PDF
        </button>
      </td>
    `;
    container.appendChild(tr);
  });
}

/* ========================================================
   🗂️ REAL-TIME FILE PREVIEW MODAL LOGIC LAYER
   ======================================================== */
function launchFilePreviewModal(uid, documentClass) {
  const emp = employeeDatabase.find(e => e.uid === uid);
  if(!emp) return;

  const modal = document.getElementById("filePreviewModal");
  const title = document.getElementById("modalPreviewTitle");
  const body = document.getElementById("modalPreviewBody");
  
  body.innerHTML = "";
  modal.style.display = "flex";

  if (documentClass === 'photo') {
    title.textContent = `Image Attachment Preview: ${emp.uid}`;
    body.innerHTML = emp.photoData ? `<img src="${emp.photoData}" class="preview-modal-avatar"><h4>File Name: ${emp.photoName}</h4>` : `<p>No upload matrix reference found.</p>`;
  } else {
    title.textContent = `CV File Attachment Meta: ${emp.uid}`;
    body.innerHTML = `<i class="fa fa-file-invoice preview-file-icon-massive"></i><h4>Document Name: ${emp.cvName}</h4><p style="color:var(--text-dim); margin-top:5px;">File Reference Map Stream Loaded (Base64 Binary Safe Mode)</p>`;
  }
}

function closeFilePreviewModal() {
  document.getElementById("filePreviewModal").style.display = "none";
}

/* ========================================================
   ATTENDANCE & TASK VERIFICATION ACTION NODE
   ======================================================== */
function synchronizeAttendanceDashboardWidgets() {
  const presentBox = document.getElementById("present-live-box");
  const absentBox = document.getElementById("absent-live-box");
  
  presentBox.innerHTML = ""; absentBox.innerHTML = "";
  
  employeeDatabase.forEach(emp => {
    const node = document.createElement("div");
    node.style.cssText = "background:rgba(255,255,255,0.02); padding:12px; border-radius:8px; border:1px solid var(--border-line); display:flex; justify-content:space-between; align-items:center;";
    
    if (emp.attendanceStatus === "Present") {
      node.innerHTML = `<div><strong>${emp.firstName}</strong><br><span style="font-size:0.78rem; color:var(--text-dim); font-family:'JetBrains Mono';">${emp.uid}</span></div>
                        <span style="color:var(--accent-green); font-size:0.8rem; font-weight:bold;"><i class="fa fa-check-circle"></i> IN</span>`;
      presentBox.appendChild(node);
    } else {
      node.innerHTML = `<div><strong>${emp.firstName}</strong><br><span style="font-size:0.78rem; color:var(--text-dim); font-family:'JetBrains Mono';">${emp.uid}</span></div>
                        <span style="color:var(--accent-red); font-size:0.8rem; font-weight:bold;"><i class="fa fa-times-circle"></i> OUT</span>`;
      absentBox.appendChild(node);
    }
  });
}

function commitTaskVector(event) {
  event.preventDefault();
  
  const idValue = Math.random().toString(36).substring(2, 7).toUpperCase();
  const newTaskLog = {
    taskId: idValue,
    uid: document.getElementById("task-uid").value,
    name: document.getElementById("task-name").value,
    heading: document.getElementById("task-heading").value.trim(),
    progress: document.getElementById("task-progress").value,
    time: new Date().toLocaleTimeString(),
    audited: false,
    status: "Pending Check"
  };
  
  submittedTasks.push(newTaskLog);
  refreshIncomingSubmittedWorkLogsTable();
  updateAnalyticsCounterWidgets();
  
  document.getElementById("task-transmission-form").reset();
  configureInterfaceLayoutDeskPanels();
  triggerPremiumGlassToast("Task transmitted safely to validation rows.", "success-type");
}

function refreshIncomingSubmittedWorkLogsTable() {
  const container = document.getElementById("admin-task-matrix-rows");
  container.innerHTML = "";
  
  submittedTasks.forEach(task => {
    const tr = document.createElement("tr");
    let interfaceActionCellHtml = "";

    if (task.status === "Approved") {
      interfaceActionCellHtml = `<span class="badge-verified-glow"><i class="fa fa-shield-alt"></i> Approved</span>`;
    } else if (task.status === "Flagged") {
      interfaceActionCellHtml = `<span style="color:var(--accent-red); font-weight:bold;"><i class="fa fa-ban"></i> Error Flagged</span>`;
    } else {
      interfaceActionCellHtml = `
        <button class="action-btn-mini approve-style" onclick="auditProcessTaskAction('${task.taskId}', 'Approved')"><i class="fa fa-check"></i> Approve</button>
        <button class="action-btn-mini flag-style" onclick="auditProcessTaskAction('${task.taskId}', 'Flagged')"><i class="fa fa-flag"></i> Flag</button>
      `;
    }

    tr.innerHTML = `
      <td><span style="color:var(--accent-blue); font-family:'JetBrains Mono'; font-weight:bold;">${task.uid}</span></td>
      <td><strong>${task.name}</strong></td>
      <td>${task.heading}</td>
      <td><span style="padding:4px 10px; background:rgba(0,242,254,0.05); border:1px solid var(--accent-blue); border-radius:20px; color:var(--accent-blue); font-size:0.8rem;">${task.progress}</span></td>
      <td><span style="font-family:'JetBrains Mono'; font-size:0.85rem; color:var(--text-dim);">${task.time}</span></td>
      <td>${interfaceActionCellHtml}</td>
    `;
    container.appendChild(tr);
  });
}

// 🗂️ TASK ACTION WORKFLOW MANAGER (APPROVE/REJECT ROUTINES)
function auditProcessTaskAction(taskId, finalVerdict) {
  const targetTask = submittedTasks.find(t => t.taskId === taskId);
  if (!targetTask) return;

  targetTask.status = finalVerdict;
  targetTask.audited = true;
  
  logSecurityIntegrityEvent(`AUDIT: Data record payload row [${taskId}] marked as ${finalVerdict.toUpperCase()}.`, "warn-log");
  refreshIncomingSubmittedWorkLogsTable();
  updateAnalyticsCounterWidgets();
  triggerPremiumGlassToast(`Task Verification Log Processed: ${finalVerdict}`, "success-type");
}

function evaluateShiftReportDownloadPrivilege() {
  const triggerBtn = document.getElementById("download-summary-gate");
  if(employeeDatabase.length > 0) {
    triggerBtn.removeAttribute("disabled");
  } else {
    triggerBtn.setAttribute("disabled", "true");
  }
}

/* ========================================================
   PDF COMPILATION PLUGINS (jsPDF Engine Integration)
   ======================================================== */
function generateSingleEmployeeIdCardPdf(uid) {
  const emp = employeeDatabase.find(e => e.uid === uid);
  if(!emp) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a6" });

  doc.setFillColor(6, 11, 19); doc.rect(0, 0, 105, 148, "F");
  doc.setFillColor(11, 19, 34); doc.roundedRect(5, 5, 95, 138, 5, 5, "F");
  doc.setDrawColor(0, 242, 254); doc.setLineWidth(0.5); doc.roundedRect(5, 5, 95, 138, 5, 5, "S");

  doc.setTextColor(255, 255, 255); doc.setFont("Helvetica", "bold"); doc.setFontSize(14);
  doc.text("TECH MAHINDRA OPS", 52.5, 18, { align: "center" });
  doc.setTextColor(0, 242, 254); doc.setFontSize(9); doc.text("OFFICIAL ACCESS SECURITY MATRIX CARD", 52.5, 23, { align: "center" });

  doc.setFillColor(19, 31, 52); doc.rect(37.5, 32, 30, 30, "F");
  doc.setDrawColor(0, 245, 160); doc.rect(37.5, 32, 30, 30, "S");
  doc.setTextColor(0, 245, 160); doc.setFontSize(22); doc.text(emp.firstName[0], 52.5, 52, { align: "center" });

  doc.setTextColor(255, 255, 255); doc.setFontSize(12); doc.text(`${emp.firstName}`, 52.5, 72, { align: "center" });
  doc.setTextColor(100, 116, 139); doc.setFontSize(9); doc.text(`System UID: ${emp.uid}`, 52.5, 77, { align: "center" });

  doc.setDrawColor(255, 255, 255); doc.setGState(new doc.GState({ opacity: 0.06 })); doc.line(10, 84, 95, 84);
  doc.setGState(new doc.GState({ opacity: 1.0 }));

  doc.setFont("Helvetica", "normal"); doc.setTextColor(100, 116, 139); doc.setFontSize(8);
  doc.text("Mobile No:", 12, 92); doc.text("Email ID:", 12, 98);
  doc.text("State Domain:", 12, 104); doc.text("District:", 12, 110);
  doc.text("HR Node:", 12, 116); doc.text("Security Verify:", 12, 122);

  doc.setTextColor(255, 255, 255); doc.setFont("Helvetica", "bold");
  doc.text(emp.empMobileNo, 36, 92); doc.text(emp.empEmail, 36, 98);
  doc.text(emp.empState, 36, 104); doc.text(emp.empDistrict, 36, 110);
  doc.text(emp.hrName, 36, 116);
  doc.setTextColor(0, 245, 160); doc.text("VERIFIED COMPLIANCE SECURE", 36, 122);

  doc.setFillColor(19, 31, 52); doc.rect(5, 133, 95, 10, "F");
  doc.setTextColor(100, 116, 139); doc.setFont("Courier", "normal"); doc.setFontSize(7);
  doc.text("AUTH VECTOR SIGNATURE TOKEN VERIFY KEY REQUIRED ON TERMINAL SHIFTS", 52.5, 139, { align: "center" });

  doc.save(`ID_Card_${emp.uid}.pdf`);
  triggerPremiumGlassToast(`Exported Identity Card: ${emp.uid}`, "success-type");
}

function triggerShiftReportExport() {
  if (employeeDatabase.length === 0) return;
  
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  doc.setFont("Helvetica", "bold"); doc.setFontSize(18);
  doc.text("TECH MAHINDRA DATA OPERATIONS MASTER REPORT SHEET", 20, 20);
  doc.setFontSize(10); doc.setFont("Helvetica", "normal"); doc.setTextColor(100, 116, 139);
  doc.text(`Compilation Date Stamp Vector: ${new Date().toLocaleDateString()} | Shift Tracking Log`, 20, 26);
  
  doc.setLineWidth(0.2); doc.line(20, 32, 190, 32);
  
  let layoutVerticalOffsetTracker = 42;
  doc.setFont("Helvetica", "bold"); doc.setTextColor(0, 0, 0);
  doc.text("UID", 20, layoutVerticalOffsetTracker);
  doc.text("Employee Name", 45, layoutVerticalOffsetTracker);
  doc.text("Email", 95, layoutVerticalOffsetTracker);
  doc.text("HR Node", 145, layoutVerticalOffsetTracker);
  doc.text("Attendance", 175, layoutVerticalOffsetTracker);
  
  doc.line(20, layoutVerticalOffsetTracker + 2, 190, layoutVerticalOffsetTracker + 2);
  layoutVerticalOffsetTracker += 10;
  
  doc.setFont("Helvetica", "normal");
  employeeDatabase.forEach(emp => {
    doc.text(emp.uid, 20, layoutVerticalOffsetTracker);
    doc.text(`${emp.firstName}`, 45, layoutVerticalOffsetTracker);
    doc.text(emp.empEmail, 95, layoutVerticalOffsetTracker);
    doc.text(emp.hrName, 145, layoutVerticalOffsetTracker);
    doc.text(emp.attendanceStatus, 175, layoutVerticalOffsetTracker);
    layoutVerticalOffsetTracker += 8;
  });
  
  doc.save("Shift_Attendance_Report_Operations.pdf");
  triggerPremiumGlassToast("Master Operations Metrics Report Generated.", "success-type");
}

/* ========================================================
   SYSTEM WATCH ENGINE CLOCKS & ALERTS
   ======================================================== */
function initializeLiveSystemClockEngine() {
  setInterval(() => {
    const calendarInstance = new Date();
    document.getElementById("live-system-clock").textContent = calendarInstance.toLocaleTimeString();
    
    const optionSchemes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("live-calendar-date").textContent = calendarInstance.toLocaleDateString("en-US", optionSchemes);
  }, 1000);
}

function triggerPremiumGlassToast(messageContent, messageTypeClass) {
  const container = document.getElementById("glassToastBox");
  const toast = document.createElement("div");
  
  toast.className = `glass-toast-notification ${messageTypeClass}`;
  const iconMarkup = messageTypeClass === 'success-type' ? 'fa-check-circle' : 'fa-exclamation-triangle';
  
  toast.innerHTML = `<i class="fa ${iconMarkup}"></i> <span>${messageContent}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = "slideToastIn 0.3s linear reverse forwards";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}