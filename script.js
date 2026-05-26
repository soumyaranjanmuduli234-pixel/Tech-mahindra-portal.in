/* ========================================================
   INTEGRATED GLASSMORPHISM DESK ENGINE - CORE SECURED SCRIPT
   ======================================================== */

// Base64 Encoded Credentials Vector (Admin Mask Gate Protection)
// 'YWRtaW4=' represents base64 encoded 'admin'
// 'YWRtaW4xMjM=' represents base64 encoded 'admin123'
const _authMatrixNode = 'YWRtaW4=';
const _tokenMatrixNode = 'YWRtaW4xMjM=';

let employeeDatabase = [];
let submittedTasks = [];
let authenticatedUser = null;

const navigationMasterMatrix = [
  { id: 'panel-home-base', label: 'Dashboard Control', icon: 'fa-th-large', visibleFor: ['admin', 'employee'] },
  { id: 'panel-employee-master', label: 'Employee Base Manager', icon: 'fa-users-cog', visibleFor: ['admin'] },
  { id: 'panel-live-desk', label: 'Live Desk Attendance', icon: 'fa-satellite-dish', visibleFor: ['admin'] },
  { id: 'panel-reports-desk', label: 'Operations & Submission Terminal', icon: 'fa-folder-open', visibleFor: ['admin', 'employee'] }
];

document.addEventListener("DOMContentLoaded", () => {
  initializeLiveSystemClockEngine();
  setupLoginFormListener();
  initializeAntiInspectSecurityShield(); // Run DevTools barricade protection layers
  
  document.getElementById('firstName').addEventListener('input', computeSystemCredentialsVector);
  document.getElementById('empMobileNo').addEventListener('input', computeSystemCredentialsVector);
});

/* ========================================================
   🛡️ ANTI-INSPECT & SECURE PERIMETER GUARD ENGINE
   ======================================================== */
function initializeAntiInspectSecurityShield() {
  // Disallow context menu right-clicks
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    triggerPremiumGlassToast("Security Policy: Right-Click inspect functions restricted.", "error-type");
  });

  // Intercept and smash DevTools execution hotkeys combinations
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
      activateSecurityDefenseBlur();
    }
  });

  // Self-repairing internal debugger heartbeat mechanism
  setInterval(() => {
    const startTime = performance.now();
    debugger; // Freezes thread loop execution if DevTools console panel layer sits active
    if (performance.now() - startTime > 100) {
      activateSecurityDefenseBlur();
    }
  }, 500);
}

function activateSecurityDefenseBlur() {
  document.body.classList.add("security-blur");
  triggerPremiumGlassToast("Security Matrix Infringement Detected! Controls Intercepted.", "error-type");
  setTimeout(() => {
    document.body.classList.remove("security-blur");
  }, 3500);
}

/* ========================================================
   SESSION AUTHENTICATION ENGINE DECK
   ======================================================== */
function setupLoginFormListener() {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const userIdInput = document.getElementById("loginIdentity").value.trim();
    const tokenInput = document.getElementById("loginToken").value.trim();
    
    // Decoding dynamic validation vectors at execution runtimes
    if (userIdInput === atob(_authMatrixNode) && tokenInput === atob(_tokenMatrixNode)) {
      executeAuthenticationSequence("admin", "System Administrator Control Node");
    } else {
      const matchedProfile = employeeDatabase.find(emp => emp.uid === userIdInput && emp.password === tokenInput);
      if (matchedProfile) {
        executeAuthenticationSequence("employee", `${matchedProfile.firstName} ${matchedProfile.lastName}`, matchedProfile);
      } else {
        triggerPremiumGlassToast("Authentication Fail: Credentials Matrix Error!", "error-type");
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
    triggerPremiumGlassToast(`Access Granted Session: Master ${role.toUpperCase()} Node Live.`, "success-type");
  }, 3000); // Synced perfectly with 3s progress bar transition duration
}

function terminateSession() {
  authenticatedUser = null;
  document.getElementById("workspaceContainer").style.display = "none";
  document.getElementById("authGate").style.display = "flex";
  document.getElementById("loginForm").reset();
  triggerPremiumGlassToast("Session Terminated Safely. Control Desk Locked.", "error-type");
}

/* ========================================================
   DYNAMIC SIDEBAR NAVIGATION AND DESK LAYOUT ROUTER
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
  
  if (authenticatedUser.role === "admin") {
    adminReportDesk.style.display = "block";
    adminTaskMatrixArea.style.display = "block";
    employeeSubmitDesk.style.display = "none";
    evaluateShiftReportDownloadPrivilege();
  } else {
    adminReportDesk.style.display = "none";
    adminTaskMatrixArea.style.display = "none";
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
   EMPLOYEE SUBSYSTEM BASE REGISTRATION MANAGEMENT
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

function registerNewEmployee(event) {
  event.preventDefault();
  
  const uid = document.getElementById("generatedUID").value;
  const pass = document.getElementById("generatedPassword").value;
  
  const newProfile = {
    uid: uid,
    password: pass,
    firstName: document.getElementById("firstName").value.trim(),
    middleName: document.getElementById("middleName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    empMobileNo: document.getElementById("empMobileNo").value.trim(),
    empAadhaar: document.getElementById("empAadhaar").value.trim(),
    empEmail: document.getElementById("empEmail").value.trim(),
    fatherName: document.getElementById("fatherName").value.trim(),
    motherName: document.getElementById("motherName").value.trim(),
    fatherMobile: document.getElementById("fatherMobile").value.trim(),
    motherMobile: document.getElementById("motherMobile").value.trim(),
    empState: document.getElementById("empState").value.trim(),
    empDistrict: document.getElementById("empDistrict").value.trim(),
    empBlock: document.getElementById("empBlock").value.trim(),
    empPostOffice: document.getElementById("empPostOffice").value.trim(),
    empPinCode: document.getElementById("empPinCode").value,
    hrName: document.getElementById("hrName").value.trim(),
    hrMobile: document.getElementById("hrMobile").value.trim(),
    photoFileName: document.getElementById("empImageFile").files[0]?.name || "default.png",
    cvFileName: document.getElementById("empCvFile").files[0]?.name || "No CV Provided",
    attendanceStatus: Math.random() > 0.3 ? "Present" : "Absent"
  };
  
  employeeDatabase.push(newProfile);
  refreshEmployeeDataMatrixSpace();
  synchronizeAttendanceDashboardWidgets();
  if (authenticatedUser.role === 'admin') evaluateShiftReportDownloadPrivilege();
  
  toggleFormDrawer(false);
  triggerPremiumGlassToast(`Profile Registration Complete: Saved Entry ${uid}`, "success-type");
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
          <img src="https://via.placeholder.com/48/0b1322/00f2fe?text=${emp.firstName[0]}" alt="Avatar">
          <div>
            <div><strong>${emp.firstName} ${emp.lastName}</strong></div>
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
        <div style="font-size:0.8rem; color:var(--accent-green); cursor:pointer;"><i class="fa fa-image"></i> ${emp.photoFileName}</div>
        <div style="font-size:0.8rem; color:var(--text-dim);"><i class="fa fa-file-pdf"></i> ${emp.cvFileName}</div>
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
   ATTENDANCE & LIVE WORKFLOW DISPATCH REGISTERS
   ======================================================== */
function synchronizeAttendanceDashboardWidgets() {
  const presentBox = document.getElementById("present-live-box");
  const absentBox = document.getElementById("absent-live-box");
  
  presentBox.innerHTML = "";
  absentBox.innerHTML = "";
  
  employeeDatabase.forEach(emp => {
    const node = document.createElement("div");
    node.style.cssText = "background:rgba(255,255,255,0.02); padding:12px; border-radius:8px; border:1px solid var(--border-line); display:flex; justify-content:space-between; align-items:center;";
    
    if (emp.attendanceStatus === "Present") {
      node.innerHTML = `<div><strong>${emp.firstName} ${emp.lastName}</strong><br><span style="font-size:0.78rem; color:var(--text-dim); font-family:'JetBrains Mono';">${emp.uid}</span></div>
                        <span style="color:var(--accent-green); font-size:0.8rem; font-weight:bold;"><i class="fa fa-check-circle"></i> IN</span>`;
      presentBox.appendChild(node);
    } else {
      node.innerHTML = `<div><strong>${emp.firstName} ${emp.lastName}</strong><br><span style="font-size:0.78rem; color:var(--text-dim); font-family:'JetBrains Mono';">${emp.uid}</span></div>
                        <span style="color:var(--accent-red); font-size:0.8rem; font-weight:bold;"><i class="fa fa-times-circle"></i> OUT</span>`;
      absentBox.appendChild(node);
    }
  });
}

function commitTaskVector(event) {
  event.preventDefault();
  
  const newTaskLog = {
    uid: document.getElementById("task-uid").value,
    name: document.getElementById("task-name").value,
    heading: document.getElementById("task-heading").value.trim(),
    progress: document.getElementById("task-progress").value,
    time: new Date().toLocaleTimeString()
  };
  
  submittedTasks.push(newTaskLog);
  refreshIncomingSubmittedWorkLogsTable();
  
  document.getElementById("task-transmission-form").reset();
  configureInterfaceLayoutDeskPanels();
  triggerPremiumGlassToast("Work Progress Task Transmitted to Admin Terminal Desk Vector.", "success-type");
}

function refreshIncomingSubmittedWorkLogsTable() {
  const container = document.getElementById("admin-task-matrix-rows");
  container.innerHTML = "";
  
  submittedTasks.forEach(task => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span style="color:var(--accent-blue); font-family:'JetBrains Mono'; font-weight:bold;">${task.uid}</span></td>
      <td><strong>${task.name}</strong></td>
      <td>${task.heading}</td>
      <td><span style="padding:4px 10px; background:rgba(0,242,254,0.05); border:1px solid var(--accent-blue); border-radius:20px; color:var(--accent-blue); font-size:0.8rem;">${task.progress}</span></td>
      <td><span style="font-family:'JetBrains Mono'; font-size:0.85rem; color:var(--text-dim);">${task.time}</span></td>
    `;
    container.appendChild(tr);
  });
}

function evaluateShiftReportDownloadPrivilege() {
  const triggerBtn = document.getElementById("download-summary-gate");
  if(employeeDatabase.length > 0) {
    triggerBtn.removeAttribute("disabled");
    triggerBtn.innerHTML = `<i class="fa fa-file-download"></i> Download Attendance Sheet PDF`;
  } else {
    triggerBtn.setAttribute("disabled", "true");
    triggerBtn.innerHTML = `<i class="fa fa-file-download"></i> Download Attendance Sheet PDF (Locked)`;
  }
}

/* ========================================================
   PDF REPORT GENERATION INFRASTRUCTURE (jsPDF Integration)
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

  doc.setTextColor(255, 255, 255); doc.setFontSize(12); doc.text(`${emp.firstName} ${emp.lastName}`, 52.5, 72, { align: "center" });
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
  triggerPremiumGlassToast(`Exported Identity Card Document: ${emp.uid}`, "success-type");
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
    doc.text(`${emp.firstName} ${emp.lastName}`, 45, layoutVerticalOffsetTracker);
    doc.text(emp.empEmail, 95, layoutVerticalOffsetTracker);
    doc.text(emp.hrName, 145, layoutVerticalOffsetTracker);
    doc.text(emp.attendanceStatus, 175, layoutVerticalOffsetTracker);
    layoutVerticalOffsetTracker += 8;
  });
  
  doc.save("Shift_Attendance_Report_Operations.pdf");
  triggerPremiumGlassToast("Master Operations Metrics Report Generated.", "success-type");
}

/* ========================================================
   SYSTEM WATCH INTERFACE CLOCK & TOAST NOTIFICATION UTILITIES
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