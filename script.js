// ========================================================
// CORE SYSTEM CENTRAL OPERATIONAL LOGIC MUX
// ========================================================

let calendarContextDate = new Date();
const BASE_UID_START = 24145008000; // Shuru hone wala auto increments point

document.addEventListener("DOMContentLoaded", function() {
  initCoreFrameworkRouters();
  initDataAutomationFields();
  renderDynamicCalendarRegistry(calendarContextDate);
  loadMemoryStorageNodes();
});

// 1. GATE CONTROL ROUTING CIRCUITS & HARD LOCK VALIDATIONS
function initCoreFrameworkRouters() {
  const wrapper = document.getElementById("mainAuthWrapper");
  const loginForm = document.getElementById("loginForm");
  const employeeEntryForm = document.getElementById("employeeEntryForm");
  const loginPanelContent = document.getElementById("loginPanelContent");
  const registerPanelContent = document.getElementById("registerPanelContent");
  const dashboardExtension = document.getElementById("dashboardExtension");

  // Authentication Submission Interlock Rules
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const uidInput = document.getElementById("loginIdentity").value.trim();
    const tokenInput = document.getElementById("loginToken").value.trim();

    if (!uidInput || !tokenInput) {
      triggerSystemOverlayAlert("error", "Missing Credentials", "Please fill in all security terminal input gates.");
      return;
    }

    // STRICT SYSTEM REQUIREMENT: Admin Credentials Match Verification
    if (uidInput === "TECHF24145004001" && tokenInput === "Soumya@7890") {
      triggerTimedLoader(5, "Verifying cryptographic environment hashes...", function() {
        triggerSystemOverlayAlert("success", "System Access Granted", "Terminal verified. Loading workspace logs...", function() {
          // Slide Transition Framework Shift
          wrapper.classList.add("shifted-layout");
          loginForm.classList.remove("active");
          employeeEntryForm.classList.add("active");
          loginPanelContent.classList.remove("active");
          registerPanelContent.classList.add("active");
          
          // Inject Active Extensions Layer Views
          dashboardExtension.style.display = "block";
        });
      });
    } else {
      triggerSystemOverlayAlert("error", "Breach Blocked", "Invalid core authorization codes.");
    }
  });

  // Structural UI Theme State Switcher
  document.getElementById("toggleModeBtn").addEventListener("click", function() {
    document.body.classList.toggle("light-mode");
  });

  // Teardown Active Session Loop
  document.getElementById("logoutBtn").addEventListener("click", function() {
    triggerTimedLoader(3, "Safely packaging session parameters...", function() {
      wrapper.classList.remove("shifted-layout");
      employeeEntryForm.classList.remove("active");
      loginForm.classList.add("active");
      registerPanelContent.classList.remove("active");
      loginPanelContent.classList.add("active");
      
      dashboardExtension.style.display = "none";
      loginForm.reset();
    });
  });
}

// 2. COMPREHENSIVE AUTOMATION FIELD LOGIC ENGINE
function initDataAutomationFields() {
  const fName = document.getElementById("firstName");
  const outputUID = document.getElementById("generatedUID");
  const outputPass = document.getElementById("generatedPassword");

  // Live Auto UID Calculation and Smart Password Creation Loop
  function calculateSequentialAutoCredentials() {
    const rawFirstStr = fName.value.trim();
    
    if (rawFirstStr) {
      // Step A: Determine dynamic auto sequence code base
      let currentPool = JSON.parse(localStorage.getItem("portalUsers") || "[]");
      let nextIncrementIndex = currentPool.length;
      let calculatedUIDNumber = BASE_UID_START + nextIncrementIndex;
      outputUID.value = `TECHF${calculatedUIDNumber}`;

      // Step B: Sanitize first letter to uppercase for formatting style
      let formattedCapitalName = rawFirstStr.charAt(0).toUpperCase() + rawFirstStr.slice(1);
      
      // Step C: Generate exactly 8 unique numerical values
      let randomEightDigits = "";
      for (let i = 0; i < 8; i++) {
        randomEightDigits += Math.floor(Math.random() * 10);
      }
      outputPass.value = `${formattedCapitalName}@${randomEightDigits}`;
    } else {
      outputUID.value = "";
      outputPass.value = "";
    }
  }

  fName.addEventListener("input", calculateSequentialAutoCredentials);

  // Form Captures & Memory Storage Layer Rules
  document.getElementById("employeeEntryForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const aadhaarInput = document.getElementById("empAadhaar").value.trim();
    const emailInput = document.getElementById("empEmail").value.trim();
    const fatherInput = document.getElementById("fatherName").value.trim();
    const motherInput = document.getElementById("motherName").value.trim();
    const fMobileInput = document.getElementById("fatherMobile").value.trim();
    const mMobileInput = document.getElementById("motherMobile").value.trim();

    // Field Strict Validation Checks
    if (!fName.value.trim() || !aadhaarInput || !emailInput || !fatherInput || !motherInput || !fMobileInput || !mMobileInput) {
      triggerSystemOverlayAlert("error", "Required Input Missing", "Please execute all configuration fields securely.");
      return;
    }
    if (aadhaarInput.length !== 12) {
      triggerSystemOverlayAlert("error", "Identity Scope Error", "Aadhaar parameter must match exactly 12 numeric configurations.");
      return;
    }

    const compiledUserPayload = {
      uid: outputUID.value,
      name: `${fName.value.trim()} ${document.getElementById("middleName").value.trim()} ${document.getElementById("lastName").value.trim()}`,
      aadhaar: aadhaarInput,
      email: emailInput,
      father: fatherInput,
      mother: motherInput,
      fatherMobile: fMobileInput,
      motherMobile: mMobileInput,
      scope: `${document.getElementById("empBlock").value.trim()}, ${document.getElementById("empDistrict").value.trim()} (${document.getElementById("empState").value.trim()})`,
      tokenPass: outputPass.value
    };

    let datasets = JSON.parse(localStorage.getItem("portalUsers") || "[]");
    datasets.push(compiledUserPayload);
    localStorage.setItem("portalUsers", JSON.stringify(datasets));

    document.getElementById("employeeEntryForm").reset();
    outputUID.value = ""; outputPass.value = "";
    
    loadMemoryStorageNodes();
    triggerSystemOverlayAlert("success", "Packet Logged Successfully", "Operational details map cached under admin directory tree rules.");
  });

  // Global Core Registry Purger Button
  document.getElementById("clearAllUsersBtn").addEventListener("click", function() {
    if (confirm("Execute master structural wipe-out of all nodes?")) {
      localStorage.removeItem("portalUsers");
      loadMemoryStorageNodes();
      triggerSystemOverlayAlert("success", "Memory Spaces Flushed", "Clean tracking registers initialized.");
    }
  });

  // Test Sample Data Injection Engine (Reflected with New Schemas)
  document.getElementById("injectSampleBtn").addEventListener("click", function() {
    const vectors = [
      { 
        uid: "TECHF24145008000", name: "Sonali Panda", aadhaar: "123456789012", email: "sonali@mahindra.com",
        father: "Ramesh Panda", mother: "Gita Panda", fatherMobile: "9876543210", motherMobile: "9123456780",
        scope: "Jatni, Khordha (Odisha)", tokenPass: "Sonali@48291054" 
      }
    ];
    localStorage.setItem("portalUsers", JSON.stringify(vectors));
    loadMemoryStorageNodes();
    triggerSystemOverlayAlert("success", "Sample Injection Complete", "Mock arrays mapped securely.");
  });

  document.getElementById("manualPresentBtn").addEventListener("click", function() {
    triggerSystemOverlayAlert("success", "Override Active", "Communication loops configured for automated present status.");
  });

  // UPGRADED COMPILING DUMP REPORT ENGINE PRINTER (All Fields Mapped Cleanly)
  document.getElementById("printReportBtn").addEventListener("click", function() {
    const records = JSON.parse(localStorage.getItem("portalUsers") || "[]");
    if (records.length === 0) {
      triggerSystemOverlayAlert("error", "Print Execution Terminated", "No data available in local database registry memory maps.");
      return;
    }

    let framePrint = window.open("", "_blank");
    let htmlRows = records.map(item => `
      <tr>
        <td><strong>${item.uid}</strong></td>
        <td>${item.name}</td>
        <td>Aadhaar: ${item.aadhaar}<br>Email: ${item.email}</td>
        <td>F: ${item.father} (${item.fatherMobile})<br>M: ${item.mother} (${item.motherMobile})</td>
        <td>${item.scope}</td>
        <td style="font-family: monospace; font-weight:bold; color:#1db8c7;">${item.tokenPass}</td>
      </tr>
    `).join("");

    framePrint.document.write(`
      <html>
        <head>
          <title>Tech Mahindra Portal - Operations Report Sheet</title>
          <style>
            body { font-family: monospace; padding: 25px; color: #111; line-height: 1.4; }
            h2 { border-bottom: 2px solid #000; padding-bottom: 6px; margin-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { border: 1px solid #333; padding: 10px; font-size: 11px; text-align: left; vertical-align: top; }
            th { background: #f0f0f0; text-transform: uppercase; }
            .meta-info { font-size: 11px; margin-bottom: 15px; color: #444; }
          </style>
        </head>
        <body>
          <h2>MASTER WORKFORCE OVERVIEW & CREDENTIALS REPORT DUMP</h2>
          <div class="meta-info">System Compiled Stamp: ${new Date().toLocaleString()} | Security Level: Admin Authorization Level 1</div>
          <table>
            <thead>
              <tr>
                <th>UID Code</th>
                <th>Employee Identity</th>
                <th>Verification Params</th>
                <th>Parentage & Contact Channels</th>
                <th>Geographic Boundary Context</th>
                <th>Active Pass Token</th>
              </tr>
            </thead>
            <tbody>${htmlRows}</tbody>
          </table>
          <script>window.print();</script>
        </body>
      </html>
    `);
    framePrint.document.close();
  });
}

// 3. CORE ACTIVE REGISTRY TRACKS CALENDAR COMPONENT
function renderDynamicCalendarRegistry(date) {
  const container = document.getElementById("calendarDays");
  const headline = document.getElementById("monthYearTitle");
  if (!container) return;

  container.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();

  const nameArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  headline.textContent = `${nameArray[month]} ${year}`;

  const startIndex = new Date(year, month, 1).getDay();
  const targetDaysCount = new Date(year, month + 1, 0).getDate();
  const paddingLastCount = new Date(year, month, 0).getDate();

  for (let i = startIndex; i > 0; i--) {
    const div = document.createElement("div");
    div.style.opacity = "0.25";
    div.textContent = paddingLastCount - i + 1;
    container.appendChild(div);
  }

  const calendarMatchToday = new Date();
  for (let i = 1; i <= targetDaysCount; i++) {
    const div = document.createElement("div");
    div.textContent = i;
    if (i === calendarMatchToday.getDate() && month === calendarMatchToday.getMonth() && year === calendarMatchToday.getFullYear()) {
      div.className = "today";
    }
    container.appendChild(div);
  }
}

document.getElementById("prevMonth")?.addEventListener("click", () => { calendarContextDate.setMonth(calendarContextDate.getMonth() - 1); renderDynamicCalendarRegistry(calendarContextDate); });
document.getElementById("nextMonth")?.addEventListener("click", () => { calendarContextDate.setMonth(calendarContextDate.getMonth() + 1); renderDynamicCalendarRegistry(calendarContextDate); });

// 4. DATATABLE MEMORY BUFFER LIFTER (Renders New Deep-Fields on Interface)
function loadMemoryStorageNodes() {
  const board = document.getElementById("employeeTableBody");
  const nodes = JSON.parse(localStorage.getItem("portalUsers") || "[]");
  if (!board) return;

  if (nodes.length === 0) {
    board.innerHTML = `<tr><td colspan="7" style="text-align:center; color: var(--muted); padding:20px;">Scanning registries... Empty matrix space.</td></tr>`;
    return;
  }

  board.innerHTML = "";
  nodes.forEach(u => {
    const elementRow = document.createElement("tr");
    elementRow.innerHTML = `
      <td style="color: #62ebf7; font-weight: 600;">${u.uid}</td>
      <td><strong>${u.name}</strong></td>
      <td><span style="font-size:11px; opacity:0.85;">ID: ${u.aadhaar}</span><br><span style="font-size:11px; color: var(--cyan-2);">${u.email}</span></td>
      <td>
        <div style="font-size:11px; line-height: 1.3;">
          <span>F: ${u.father} (${u.fatherMobile})</span><br>
          <span>M: ${u.mother} (${u.motherMobile})</span>
        </div>
      </td>
      <td><span style="font-size:11px;">${u.scope}</span></td>
      <td style="font-family: monospace; font-weight: bold; color: #4cd964; font-size:12px;">${u.tokenPass}</td>
      <td><button class="delete-node-btn" onclick="purgeTargetIdentity('${u.uid}')">✖ Purge</button></td>
    `;
    board.appendChild(elementRow);
  });
}

window.purgeTargetIdentity = function(uid) {
  let nodes = JSON.parse(localStorage.getItem("portalUsers") || "[]");
  nodes = nodes.filter(n => n.uid !== uid);
  localStorage.setItem("portalUsers", JSON.stringify(nodes));
  loadMemoryStorageNodes();
  triggerSystemOverlayAlert("success", "Node Disconnected", "Target registry loop has been safely severed from memory logs.");
};

// 5. DIALOG POPUPS OVERLAYS LIFECYCLE (Original Protected UI Animations Elements)
let alertCloseHook = null;
function triggerSystemOverlayAlert(type, title, message, cb) {
  const overlay = document.getElementById("customAlertOverlay");
  const icon = document.getElementById("customAlertIcon");
  
  document.getElementById("customAlertTitle").textContent = title;
  document.getElementById("customAlertMessage").textContent = message;
  alertCloseHook = typeof cb === 'function' ? cb : null;

  if (type === 'error') {
    icon.textContent = '!';
    icon.classList.add('error');
  } else {
    icon.textContent = '✓';
    icon.classList.remove('error');
  }
  overlay.classList.add("show");
}

document.getElementById("customAlertBtn").addEventListener("click", function() {
  document.getElementById("customAlertOverlay").classList.remove("show");
  if (alertCloseHook) { const temp = alertCloseHook; alertCloseHook = null; temp(); }
});

function triggerTimedLoader(sec, msg, onDone) {
  const overlay = document.getElementById("loadingOverlay");
  document.getElementById("loadingMessage").textContent = msg;
  document.getElementById("loadingTime").textContent = `Processing for ${sec} seconds`;
  overlay.classList.add("show");

  setTimeout(() => {
    overlay.classList.remove("show");
    if (typeof onDone === 'function') onDone();
  }, sec * 1000);
}