// ========================================================
// RE-ARCHITECTURED CENTRAL OPERATIONS DATA DESK (WITH LOCALSTORAGE)
// ========================================================

const BASE_UID_START = 24145008000;

// 🔥 SYSTEM SESSIONS CACHE METRIC STORES (LOADS PERMANENTLY FROM BROWSER STORAGE)
let employeeDatabase = JSON.parse(localStorage.getItem("techM_employees")) || [];
let workSubmissions = JSON.parse(localStorage.getItem("techM_tasks")) || [];
let activeSessionUser = { role: "Guest", name: "User", uid: "" };

document.addEventListener("DOMContentLoaded", function() {
  initSystemClockDaemon();
  initLoginVerificationGate();
  initAutoCredentialGenerator();
  evaluateReportLockoutGate();
  
  setInterval(evaluateReportLockoutGate, 10000);
});

// CLOCK & DYNAMIC CALENDAR DAEMON CONSOLE
function initSystemClockDaemon() {
  setInterval(() => {
    const timeObject = new Date();
    const clockElement = document.getElementById("live-system-clock");
    if(clockElement) {
      clockElement.innerText = timeObject.toLocaleTimeString('en-US', { hour12: true });
    }
    const calendarElement = document.getElementById("live-calendar-date");
    if(calendarElement) {
      const formattingOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      calendarElement.innerText = timeObject.toLocaleDateString('en-US', formattingOptions);
    }
  }, 1000);
}

// MODERN GLASSMORPHISM FLOATING NOTIFICATION BANNER FUNCTION
function dispatchGlassToast(message, type = "success") {
  const toastBox = document.getElementById("glassToastBox");
  if(!toastBox) return;

  const toastElement = document.createElement("div");
  toastElement.className = `glass-toast-notification ${type}-type`;
  
  const alertIcon = type === "success" ? "fa-check-circle" : "fa-exclamation-triangle";
  toastElement.innerHTML = `<i class="fa ${alertIcon}"></i> <span>${message}</span>`;
  
  toastBox.appendChild(toastElement);

  // Auto-Dismiss after exactly 4 seconds
  setTimeout(() => {
    toastElement.style.animation = "slideToastIn 0.3s ease reverse forwards";
    setTimeout(() => { toastElement.remove(); }, 300);
  }, 4000);
}

// MOBILE SIDEBAR COLLAPSED DRAWER ACTION TOGGLER
function toggleMobileSidebarMenu() {
  const drawer = document.getElementById("mainSidebarDrawer");
  if(drawer) drawer.classList.toggle("mobile-drawer-open");
}

// 10-SECOND GLOBAL TRANSITION LOADER FUNCTION
function runTransitionAnimation(callbackPipeline) {
  const loaderOverlay = document.getElementById("globalPageLoader");
  if (!loaderOverlay) {
    if(callbackPipeline) callbackPipeline();
    return;
  }
  
  loaderOverlay.style.display = "flex";
  const barFill = loaderOverlay.querySelector(".live-progress-fill");
  if(barFill) {
    barFill.style.animation = 'none';
    barFill.offsetHeight; // Trigger reflow
    barFill.style.animation = 'loadProgressFill 10s linear forwards';
  }

  setTimeout(() => {
    loaderOverlay.style.display = "none";
    if(callbackPipeline) callbackPipeline();
  }, 10000); // Strict 10-Second Wait Threshold Limit
}

// SECURE PROFILE GATE VERIFICATION PROCESSOR
function initLoginVerificationGate() {
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const uidInput = document.getElementById("loginIdentity").value.trim();
    const passwordInput = document.getElementById("loginToken").value.trim();

    if (uidInput === "TECHF24145004001" && passwordInput === "Soumya@7890") {
      runTransitionAnimation(() => {
        activeSessionUser = { role: "Admin", name: "Soumyaranjan (Admin)", uid: "TECHF24145004001" };
        launchWorkspaceDashboard();
        dispatchGlassToast("Welcome Master System Controller. Connection established.", "success");
      });
    } else {
      const matchingEmp = employeeDatabase.find(emp => emp.uid === uidInput && emp.password === passwordInput);
      if(matchingEmp) {
        runTransitionAnimation(() => {
          activeSessionUser = { role: "Employee", name: matchingEmp.name, uid: matchingEmp.uid, data: matchingEmp };
          launchWorkspaceDashboard();
          dispatchGlassToast(`Welcome Back, ${matchingEmp.name}. Operational session authorized.`, "success");
        });
      } else {
        dispatchGlassToast("Access Terminated: Invalid User ID or Password.", "error");
      }
    }
  });
}

// LAUNCH OR INTERLINK ACTIVE MENUS BASED ON LEVEL
function launchWorkspaceDashboard() {
  document.getElementById("authGate").style.display = "none";
  document.getElementById("workspaceContainer").style.display = "grid";
  
  document.getElementById("userWelcomeMessage").innerText = `Welcome Back, ${activeSessionUser.name}`;
  
  setupRoleBasedNavigationMenu();
  renderEmployeeMatrix();
  renderAttendanceVectors();
  updateAdminTaskViewGrid(); // Ensures previous submissions load on login
  
  if(activeSessionUser.role === "Employee") {
    document.getElementById("task-uid").value = activeSessionUser.uid;
    document.getElementById("task-name").value = activeSessionUser.name;
    document.getElementById("task-email").value = activeSessionUser.data.email;
  }
  
  document.querySelectorAll(".workspace-panel").forEach(p => p.classList.remove("active"));
  document.getElementById("panel-home-base").classList.add("active");
}

// DYNAMIC LINK ALLOCATION BY USER ROLE DEFINITION
function setupRoleBasedNavigationMenu() {
  const menuContainer = document.getElementById("sidebarNavMenu");
  menuContainer.innerHTML = "";

  menuContainer.innerHTML += `<button class="nav-link-item active" onclick="navigatePanelGate('panel-home-base', this)"><i class="fa fa-home"></i> Command Center</button>`;

  if(activeSessionUser.role === "Admin") {
    menuContainer.innerHTML += `
      <button class="nav-link-item nav-btn-glow" id="btn-nav-employee" onclick="navigatePanelGate('panel-employee-master', this)"><i class="fa fa-user-friends"></i> New Employee Login</button>
      <button class="nav-link-item" onclick="navigatePanelGate('panel-live-desk', this)"><i class="fa fa-table"></i> Attendance Matrix</button>
      <button class="nav-link-item" onclick="navigatePanelGate('panel-reports-desk', this)"><i class="fa fa-file-alt"></i> Shift Report Engine</button>
    `;
    document.getElementById("adminReportSection").style.display = "block";
    document.getElementById("adminTasksSection").style.display = "block";
    document.getElementById("employeeSubmitSection").style.display = "none";
  } else {
    menuContainer.innerHTML += `<button class="nav-link-item nav-btn-glow" onclick="navigatePanelGate('panel-reports-desk', this)"><i class="fa fa-edit"></i> Submit Daily Tasks</button>`;
    document.getElementById("adminReportSection").style.display = "none";
    document.getElementById("adminTasksSection").style.display = "none";
    document.getElementById("employeeSubmitSection").style.display = "block";
  }
}

// TRANSITION INTERCEPTION GATE FOR NAVIGATION ACTIONS
function navigatePanelGate(panelId, elementTarget) {
  // Collapse Mobile menu layout after link tap
  const drawer = document.getElementById("mainSidebarDrawer");
  if(drawer) drawer.classList.remove("mobile-drawer-open");

  runTransitionAnimation(() => {
    document.querySelectorAll(".workspace-panel").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".nav-link-item").forEach(btn => btn.classList.remove("active"));
    
    document.getElementById(panelId).classList.add("active");
    elementTarget.classList.add("active");
  });
}

function toggleFormDrawer(visible) {
  document.getElementById("formDrawer").style.display = visible ? "block" : "none";
}

// AUTO CREDENTIALS BUILDER
function initAutoCredentialGenerator() {
  const firstInput = document.getElementById("firstName");
  if (!firstInput) return;
  
  firstInput.addEventListener("input", function() {
    const nameVal = firstInput.value.trim();
    if(nameVal) {
      let numericIndex = BASE_UID_START + employeeDatabase.length;
      document.getElementById("generatedUID").value = `TECHF${numericIndex}`;
      
      let formattedText = nameVal.charAt(0).toUpperCase() + nameVal.slice(1);
      let numericStringCode = "";
      for (let i = 0; i < 4; i++) { numericStringCode += Math.floor(Math.random() * 10); }
      document.getElementById("generatedPassword").value = `${formattedText}@${numericStringCode}`;
    } else {
      document.getElementById("generatedUID").value = "";
      document.getElementById("generatedPassword").value = "";
    }
  });
}

// RENDER EMPLOYEES EXCEL DIRECTORY REGISTER 
function renderEmployeeMatrix() {
  const containerRows = document.getElementById("employee-matrix-space");
  if (!containerRows) return;
  containerRows.innerHTML = "";

  if(employeeDatabase.length === 0) {
    containerRows.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-dim);">No operational staff profiles configured yet.</td></tr>`;
    return;
  }

  employeeDatabase.forEach(emp => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="font-family:'JetBrains Mono'; font-weight:bold; color:var(--accent-blue);">${emp.uid}</td>
      <td>
        <div class="employee-row-profile">
          <img src="${emp.image}" alt="User Element">
          <div>
            <strong>${emp.name}</strong>
            <span style="display:block; font-size:0.75rem; color:var(--accent-green); font-weight:600;">Mob: ${emp.mobile}</span>
          </div>
        </div>
      </td>
      <td>
        <span style="display:block; font-size:0.85rem;">Aadhaar: ${emp.aadhaar}</span>
        <span style="display:block; font-size:0.8rem; color:var(--accent-blue);">${emp.email}</span>
      </td>
      <td>
        <span style="display:block; font-size:0.85rem;">HR: ${emp.hrName}</span>
        <span style="display:block; font-size:0.8rem; color:var(--text-dim);">Mob: ${emp.hrMobile}</span>
      </td>
      <td>
        <span style="display:block; font-size:0.75rem; color:var(--accent-blue);">📸 Profile Active</span>
        <span style="display:block; font-size:0.75rem; color:var(--text-dim);">📄 CV: ${emp.cvName}</span>
      </td>
      <td>
        <button class="nav-btn-glow" style="padding:6px 12px; font-size:0.75rem;" onclick="generatePremiumProfilePDF('${emp.uid}')"><i class="fa fa-download"></i> Profile PDF</button>
      </td>
    `;
    containerRows.appendChild(row);
  });
}

// FORM DATA INTAKE SUBMISSION PIPE WITH BASE64 PROFILE TRANSLATION
function registerNewEmployee(e) {
  e.preventDefault();

  const imgFile = document.getElementById("empImageFile").files[0];
  const cvFile = document.getElementById("empCvFile").files[0];

  if(!imgFile) {
    dispatchGlassToast("Profile photograph attachment is mandatory!", "error");
    return;
  }

  const fileParser = new FileReader();
  fileParser.readAsDataURL(imgFile);
  fileParser.onload = function() {
    const imageStringBase64 = fileParser.result;

    const addedEmployeeObj = {
      uid: document.getElementById("generatedUID").value,
      password: document.getElementById("generatedPassword").value,
      name: `${document.getElementById("firstName").value.trim()} ${document.getElementById("middleName").value.trim()} ${document.getElementById("lastName").value.trim()}`,
      mobile: document.getElementById("empMobileNo").value.trim(),
      aadhaar: document.getElementById("empAadhaar").value.trim(),
      email: document.getElementById("empEmail").value.trim(),
      father: document.getElementById("fatherName").value.trim(),
      mother: document.getElementById("motherName").value.trim(),
      fMobile: document.getElementById("fatherMobile").value.trim(),
      mMobile: document.getElementById("motherMobile").value.trim(),
      scope: `${document.getElementById("empBlock").value.trim()}, ${document.getElementById("empDistrict").value.trim()} (${document.getElementById("empState").value.trim()})`,
      hrName: document.getElementById("hrName").value.trim(),
      hrMobile: document.getElementById("hrMobile").value.trim(),
      image: imageStringBase64,
      cvName: cvFile ? cvFile.name : "Not Provided",
      status: "Absent",
      checkInTime: "-",
      checkOutTime: "-"
    };

    employeeDatabase.push(addedEmployeeObj);
    
    // 🔥 PUSH DATA TO HARD LOCALSTORAGE DRIVES
    localStorage.setItem("techM_employees", JSON.stringify(employeeDatabase));

    document.getElementById("employeeEntryForm").reset();
    toggleFormDrawer(false);
    renderEmployeeMatrix();
    renderAttendanceVectors();
    dispatchGlassToast(`Record saved successfully for ID: ${addedEmployeeObj.uid}`, "success");
  };
}

// LIVE ATTENDANCE RENDERING LIST
function renderAttendanceVectors() {
  const presentBox = document.getElementById("present-live-box");
  const absentBox = document.getElementById("absent-live-box");
  if(!presentBox || !absentBox) return;

  presentBox.innerHTML = "";
  absentBox.innerHTML = "";

  if(employeeDatabase.length === 0) {
    absentBox.innerHTML = `<p style="padding:15px; color:var(--text-dim); font-size:0.85rem;">No employees added to database registers yet.</p>`;
    return;
  }

  employeeDatabase.forEach(emp => {
    const itemCard = document.createElement("div");
    itemCard.className = "employee-row-profile";
    itemCard.style.justifyContent = "space-between";
    itemCard.style.padding = "12px";
    itemCard.style.background = "rgba(255,255,255,0.01)";
    itemCard.style.borderRadius = "8px";
    itemCard.style.border = "1px solid rgba(255,255,255,0.02)";

    let internalProfileContent = `
      <div style="display:flex; align-items:center; gap:12px;">
        <img src="${emp.image}" alt="User Element">
        <div>
          <strong style="display:block; font-size:0.9rem;">${emp.name}</strong>
          <span style="font-size:0.75rem; color:var(--text-dim); font-family:'JetBrains Mono';">${emp.uid} | Mob: ${emp.mobile}</span>
        </div>
      </div>
    `;

    if (emp.status === "Present") {
      itemCard.innerHTML = `${internalProfileContent} <span style="color:var(--accent-green); font-size:0.78rem; font-weight:700; padding-right:5px;">ONLINE [${emp.checkInTime}]</span>`;
      presentBox.appendChild(itemCard);
    } else {
      itemCard.innerHTML = `
        ${internalProfileContent}
        <button class="nav-btn-glow" style="border-color:var(--accent-red); color:var(--accent-red); padding:5px 12px; font-size:0.75rem; box-shadow:none;" onclick="triggerManualAttendanceOverride('${emp.uid}')">Mark Present</button>
      `;
      absentBox.appendChild(itemCard);
    }
  });
}

function triggerManualAttendanceOverride(uid) {
  const targetedObj = employeeDatabase.find(e => e.uid === uid);
  if(targetedObj) {
    targetedObj.status = "Present";
    targetedObj.checkInTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    
    // 🔥 SYNC ATTENDANCE CHANGES INTO SECURE STORAGE KEYS
    localStorage.setItem("techM_employees", JSON.stringify(employeeDatabase));
    
    renderAttendanceVectors();
    dispatchGlassToast(`Attendance verified for ${targetedObj.name}.`, "success");
  }
}

// SHIFT REPORT EXTRACTION LOCK TIME CONTROL WINDOWS
function evaluateReportLockoutGate() {
  const gateButton = document.getElementById("download-summary-gate");
  if(!gateButton) return;

  const currentSystemTime = new Date();
  const lockoutTarget = new Date();
  lockoutTarget.setHours(18, 30, 0);

  if(currentSystemTime >= lockoutTarget) {
    gateButton.disabled = false;
    gateButton.innerText = "Download Attendance Sheet PDF (Active)";
    gateButton.style.borderColor = "var(--accent-green)";
    gateButton.style.color = "var(--accent-green)";
  } else {
    gateButton.disabled = true;
    gateButton.innerText = "Download Attendance Sheet PDF (Locked till 06:30 PM)";
  }
}

// SYSTEM TASK DATA CONTROL INTERACTION HANDLERS
function commitTaskVector(e) {
  e.preventDefault();
  const payload = {
    uid: document.getElementById("task-uid").value,
    name: document.getElementById("task-name").value,
    email: document.getElementById("task-email").value,
    heading: document.getElementById("task-heading").value,
    progress: document.getElementById("task-progress").value,
    timestamp: new Date().toLocaleTimeString()
  };
  
  workSubmissions.push(payload);
  
  // 🔥 SAVE TASKS MATRIX PERMANENTLY
  localStorage.setItem("techM_tasks", JSON.stringify(workSubmissions));
  
  updateAdminTaskViewGrid();
  dispatchGlassToast("Your data entry task sheet log has been synchronized.", "success");
  document.getElementById("task-transmission-form").reset();
  
  document.getElementById("task-uid").value = activeSessionUser.uid;
  document.getElementById("task-name").value = activeSessionUser.name;
  document.getElementById("task-email").value = activeSessionUser.data.email;
}

function updateAdminTaskViewGrid() {
  const targetSpace = document.getElementById("admin-task-matrix-rows");
  if(!targetSpace) return;
  targetSpace.innerHTML = "";

  workSubmissions.forEach(task => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="font-family:'JetBrains Mono'; color:var(--accent-blue);">${task.uid}</td>
      <td><strong>${task.name}</strong></td>
      <td>${task.heading}</td>
      <td style="color:var(--accent-green); font-weight:600;">${task.progress}</td>
      <td>${task.timestamp}</td>
    `;
    targetSpace.appendChild(row);
  });
}

function terminateSession() {
  activeSessionUser = { role: "Guest", name: "User", uid: "" };
  document.getElementById("workspaceContainer").style.display = "none";
  document.getElementById("authGate").style.display = "flex";
  document.getElementById("loginForm").reset();
  dispatchGlassToast("Session terminated safely.", "success");
}

// INDIVIDUAL EMPLOYEE SHEET COMPILING AND PACKAGING DYNAMIC PDF ENGINE
function generatePremiumProfilePDF(uid) {
  const emp = employeeDatabase.find(e => e.uid === uid);
  if(!emp) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFillColor(11, 19, 34); doc.rect(0, 0, 210, 45, 'F');
  doc.setFont("Helvetica", "bold"); doc.setFontSize(18); doc.setTextColor(0, 242, 254);
  doc.text("OPERATIONS MEMBER FILE OVERVIEW RECORD", 14, 22);
  doc.setFontSize(9); doc.setFont("Helvetica", "normal"); doc.setTextColor(100, 116, 139);
  doc.text(`System Data Entry Verification Log: ${new Date().toLocaleString()}`, 14, 34);

  const brandingLogo = new Image();
  brandingLogo.src = 'logo.png';
  brandingLogo.onload = function() {
    doc.addImage(brandingLogo, 'PNG', 165, 8, 32, 16);
    processTemplateLayout();
  };
  brandingLogo.onerror = function() { processTemplateLayout(); };

  function processTemplateLayout() {
    doc.setDrawColor(0, 242, 254); doc.setLineWidth(0.6); doc.line(14, 45, 196, 45);
    doc.setTextColor(20, 30, 45); doc.setFontSize(11);
    let currentY = 60;

    doc.setFont("Helvetica", "bold"); doc.text("Employee Access UID:", 14, currentY);
    doc.setFont("Helvetica", "normal"); doc.text(`${emp.uid}`, 65, currentY);
    currentY += 10;
    doc.setFont("Helvetica", "bold"); doc.text("Full Account Identity:", 14, currentY);
    doc.setFont("Helvetica", "normal"); doc.text(`${emp.name}`, 65, currentY);
    currentY += 10;
    doc.setFont("Helvetica", "bold"); doc.text("Personal Mobile Number:", 14, currentY);
    doc.setFont("Helvetica", "normal"); doc.text(`${emp.mobile}`, 65, currentY);
    currentY += 10;
    doc.setFont("Helvetica", "bold"); doc.text("Aadhaar Registry Identity:", 14, currentY);
    doc.setFont("Helvetica", "normal"); doc.text(`${emp.aadhaar}`, 65, currentY);
    currentY += 10;
    doc.setFont("Helvetica", "bold"); doc.text("System Communication Email:", 14, currentY);
    doc.setFont("Helvetica", "normal"); doc.text(`${emp.email}`, 65, currentY);
    currentY += 10;
    doc.setFont("Helvetica", "bold"); doc.text("Father's Name Base:", 14, currentY);
    doc.setFont("Helvetica", "normal"); doc.text(`${emp.father} (Contact: ${emp.fMobile})`, 65, currentY);
    currentY += 10;
    doc.setFont("Helvetica", "bold"); doc.text("Mother's Name Base:", 14, currentY);
    doc.setFont("Helvetica", "normal"); doc.text(`${emp.mother} (Contact: ${emp.mMobile})`, 65, currentY);
    currentY += 10;
    doc.setFont("Helvetica", "bold"); doc.text("Assigned Manager HR:", 14, currentY);
    doc.setFont("Helvetica", "normal"); doc.text(`${emp.hrName} (Contact: ${emp.hrMobile})`, 65, currentY);
    currentY += 15;

    doc.setDrawColor(226, 232, 240); doc.line(14, currentY, 196, currentY); currentY += 10;

    if(emp.image) {
      doc.setFont("Helvetica", "bold"); doc.text("Profile Photographic Registration Proof:", 14, currentY);
      doc.addImage(emp.image, 'PNG', 14, currentY + 5, 40, 40);
    }
    doc.save(`${emp.uid}_Corporate_Profile.pdf`);
  }
}

// MASTER ATTENDANCE LOG EXTRACTION DYNAMIC PDF REPORT WITH FULL METRICS
function triggerShiftReportExport() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFillColor(11, 19, 34); doc.rect(0, 0, 210, 42, 'F');
  doc.setFont("Helvetica", "bold"); doc.setFontSize(16); doc.setTextColor(0, 242, 254);
  doc.text("SHIFT PERFORMANCE LOG & DAILY OPERATIONS REPORT", 14, 22);

  const brandingLogo = new Image();
  brandingLogo.src = 'logo.png';
  brandingLogo.onload = function() {
    doc.addImage(brandingLogo, 'PNG', 165, 8, 32, 16);
    compileTableMetrics();
  };
  brandingLogo.onerror = function() { compileTableMetrics(); };

  function compileTableMetrics() {
    doc.setTextColor(0,0,0); doc.setFontSize(10);
    let structuralY = 55;
    
    doc.setFont("Helvetica", "bold");
    doc.text("User ID", 14, structuralY); doc.text("Employee Identity (Mobile)", 55, structuralY); doc.text("Check-In Time", 125, structuralY); doc.text("Shift Status", 165, structuralY);
    doc.setDrawColor(0,0,0); doc.line(14, structuralY+2, 196, structuralY+2);
    
    structuralY += 10;
    doc.setFont("Helvetica", "normal");
    
    if(employeeDatabase.length === 0) {
      doc.text("No active employee metrics loaded inside directory registers.", 14, structuralY);
      structuralY += 10;
    } else {
      employeeDatabase.forEach(e => {
        doc.text(`${e.uid}`, 14, structuralY); doc.text(`${e.name} (${e.mobile})`, 55, structuralY); doc.text(`${e.checkInTime}`, 125, structuralY); doc.text(`${e.status}`, 165, structuralY);
        structuralY += 10;
      });
    }

    structuralY += 10;
    doc.setFont("Helvetica", "bold"); doc.setFontSize(12); doc.text("Daily Work Task Submissions Logs", 14, structuralY);
    doc.line(14, structuralY+2, 196, structuralY+2); structuralY += 10;

    doc.setFontSize(9); doc.setFont("Helvetica", "normal");
    if(workSubmissions.length === 0) {
      doc.text("No active task sheets submitted into system data channels for this operation cycle.", 14, structuralY);
    } else {
      workSubmissions.forEach(t => {
        doc.text(`[${t.uid}] ${t.name} -> Sheet: ${t.heading} [Completion Progress Vector: ${t.progress}]`, 14, structuralY);
        structuralY += 8;
      });
    }
    doc.save(`Operations_Shift_Attendance_Report.pdf`);
  }
}