// ==========================================
// PORTAL CENTRAL LOGIC CONTROLLER SYSTEM
// ==========================================

// 1. CORE SESSION AND PRELOAD CONFIGS
document.addEventListener("DOMContentLoaded", () => {
    initClock();
    initNavigation();
    initFormAutomation();
    loadTableData();
});

// Real-Time System Clock Counter
function initClock() {
    const clockElement = document.getElementById("digitalClock");
    setInterval(() => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        
        hours = hours % 12;
        hours = hours ? hours : 12; // Midnight configuration rule
        const formattedHours = String(hours).padStart(2, "0");
        
        if (clockElement) {
            clockElement.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
        }
    }, 1000);
}

// 2. PRIMARY ROUTING AND NAVIGATION FLOW
function initNavigation() {
    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll(".dashboard-section");

    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetSection = item.getAttribute("data-target");

            menuItems.forEach(i => i.classList.remove("active"));
            sections.forEach(s => s.style.display = "none");

            item.classList.add("active");
            document.getElementById(targetSection).style.display = "block";
        });
    });

    // Theme Mode Switcher
    document.getElementById("toggleModeBtn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const icon = document.body.classList.contains("light-mode") ? "<i class='fa fa-sun'></i> Light Mode" : "<i class='fa fa-moon'></i> Dark Mode";
        document.getElementById("toggleModeBtn").innerHTML = icon;
    });

    // Simple Authentication Portal Logic
    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const uID = document.getElementById("loginUser").value.trim();
        const pass = document.getElementById("loginPass").value;

        // Simple hardcoded admin credentials validation
        if (uID.toLowerCase() === "soumya" && pass === "admin") {
            document.getElementById("loginPage").style.display = "none";
            document.getElementById("dashboardPage").style.display = "flex";
            document.getElementById("sessionUser").textContent = "Soumya Sir (Admin)";
            showCustomGlassAlert("Authentication Sequence Approved. Secure Session Established.");
        } else {
            showCustomGlassAlert("Access Denied: Invalid Administrative Credentials.");
        }
    });

    // Logout Process
    document.getElementById("logoutBtn").addEventListener("click", () => {
        document.getElementById("dashboardPage").style.display = "none";
        document.getElementById("loginPage").style.display = "flex";
        document.getElementById("loginForm").reset();
    });
}

// 3. EMPLOYEE CREATION & SYSTEM ID/PASS GENERATION AUTOMATION
function initFormAutomation() {
    const fNameInput = document.getElementById("firstName");
    const lNameInput = document.getElementById("lastName");
    const uidOutput = document.getElementById("generatedUID");
    const passOutput = document.getElementById("generatedPassword");

    function processCredentialsEngine() {
        const first = fNameInput.value.trim().toLowerCase();
        const last = lNameInput.value.trim().toLowerCase();

        if (first) {
            // Rule logic: matching naming sequence + unique randomized seed
            const randomID = Math.floor(1000 + Math.random() * 9000);
            uidOutput.value = `techm-${first}${last ? last[0] : ""}-${randomID}`;

            // Token Character Sequence Creator
            const pool = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$";
            let secureToken = "";
            for (let i = 0; i < 8; i++) {
                secureToken += pool.charAt(Math.floor(Math.random() * pool.length));
            }
            passOutput.value = secureToken;
        } else {
            uidOutput.value = "";
            passOutput.value = "";
        }
    }

    fNameInput.addEventListener("input", processCredentialsEngine);
    lNameInput.addEventListener("input", processCredentialsEngine);

    // Form submission inside Database Model Arrays
    document.getElementById("employeeForm").addEventListener("submit", (e) => {
        e.preventDefault();
        
        const newRecord = {
            uid: uidOutput.value,
            fullName: `${fNameInput.value.trim()} ${document.getElementById("middleName").value.trim()} ${lNameInput.value.trim()}`,
            location: `${document.getElementById("empBlock").value.trim()}, ${document.getElementById("empDistrict").value.trim()} (${document.getElementById("empState").value.trim()})`,
            token: passOutput.value
        };

        let localArray = JSON.parse(localStorage.getItem("portalUsers") || "[]");
        localArray.push(newRecord);
        localStorage.setItem("portalUsers", JSON.stringify(localArray));

        document.getElementById("employeeForm").reset();
        uidOutput.value = "";
        passOutput.value = "";
        
        loadTableData();
        showCustomGlassAlert("Success: Employee mapped and committed to Data Registry.");
    });

    // ❌ DELETE ALL DATA BUTTON TRIGGER
    document.getElementById("clearAllUsersBtn").addEventListener("click", () => {
        if(confirm("Are you absolutely sure you want to clear all user records?")) {
            localStorage.removeItem("portalUsers");
            loadTableData();
            showCustomGlassAlert("System Database Purged Successfully.");
        }
    });

    // SAMPLE AUTOMATION INJECT DATA ARRAYS
    document.getElementById("injectSampleBtn").addEventListener("click", () => {
        const sampleRecords = [
            { uid: "techm-sudhansu-4948", fullName: "Sudhansu Prida", location: "Banapur, Khordha (Odisha)", token: "xP9#kL2a" },
            { uid: "techm-soumya-7721", fullName: "Soumya Ranjan", location: "Jatni, Khordha (Odisha)", token: "vM4$qR8e" }
        ];
        localStorage.setItem("portalUsers", JSON.stringify(sampleRecords));
        loadTableData();
        showCustomGlassAlert("Sample Corps Data Injected into Framework Grid Matrix.");
    });

    // RE-ADDED LOGIC: Manual Presence Trigger Alert Engine
    document.getElementById("manualPresentBtn").addEventListener("click", () => {
        showCustomGlassAlert("ADMIN OVERRIDE: Manual Attendance Logging Interface has been forcefully Enabled.");
    });
}

// 4. RENDERING STORAGE TABLES DATA ENGINE
function loadTableData() {
    const tableBody = document.getElementById("employeeTableBody");
    const localArray = JSON.parse(localStorage.getItem("portalUsers") || "[]");

    if (!tableBody) return;

    if (localArray.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center dimmed">No active workforce records mapped in memory tree structure.</td></tr>`;
        return;
    }

    tableBody.innerHTML = "";
    localArray.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="color: #00f2fe; font-weight: bold;">${user.uid}</td>
            <td>${user.fullName}</td>
            <td>${user.location}</td>
            <td class="dimmed" style="font-family: monospace;">••••••••</td>
            <td><button class="action-btn-link danger-text" onclick="deleteIndividualUser('${user.uid}')"><i class="fa fa-user-minus"></i> Remove</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Global scope delete helper mapping
window.deleteIndividualUser = function(uid) {
    let localArray = JSON.parse(localStorage.getItem("portalUsers") || "[]");
    localArray = localArray.filter(u => u.uid !== uid);
    localStorage.setItem("portalUsers", JSON.stringify(localArray));
    loadTableData();
    showCustomGlassAlert(`Node ${uid} has been detached.`);
};

// 5. THE CUSTOM GLASSMORPHISM POPUP REFACTOR ALERT
function showCustomGlassAlert(msg) {
    const overlay = document.createElement("div");
    overlay.className = "glass-alert-overlay";
    
    overlay.innerHTML = `
        <div class="glass-alert-card">
            <h3 style="color: #00f2fe; font-size:15px; margin-bottom: 12px; font-weight:800;"><i class="fa fa-info-circle"></i> PORTAL MESSAGE</h3>
            <p style="color: #ffffff; font-size: 13px; line-height: 1.5;">${msg}</p>
            <button class="glass-alert-btn" id="closeGlassAlertBtn">OK, CONFIRM</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    document.getElementById("closeGlassAlertBtn").addEventListener("click", () => {
        overlay.remove();
    });
}