(function () {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    let messages = JSON.parse(localStorage.getItem("portalMessages")) || [];
    let globalBroadcast = localStorage.getItem("globalBroadcast") || "Welcome to Tech Mahindra Command Center.";
    let currentSessionUser = null;
    let adminBypassActive = false;

    // Credentials Mask
    const _0x4a21 = "VEVDSDQxNDUwMDQwMDE="; // Admin UID
    const _0x91b2 = "U291bXlhQDc4OTA=";     // Admin Pass

    const getCreds = (t) => atob(t);

    // 10-Second Mandatory Loading Protocol
    window.initiateSecureLogin = function () {
        const id = document.getElementById("loginId").value.trim();
        const pass = document.getElementById("loginPass").value.trim();
        
        if(!id || !pass) { alert("Access Identity Required."); return; }

        document.getElementById("loadingMatrix").classList.remove("hidden");
        const statusText = document.getElementById("loadingStatus");
        
        const phases = [
            "Authenticating Bio-metric Node...",
            "Encrypting Quantum Tunnel...",
            "Syncing workforce telemetry...",
            "Finalizing Security Handshake..."
        ];

        let p = 0;
        const interval = setInterval(() => {
            statusText.innerText = phases[p++];
            if(p >= phases.length) clearInterval(interval);
        }, 2500);

        setTimeout(() => processLogin(id, pass), 10000);
    };

    function processLogin(id, pass) {
        document.getElementById("loadingMatrix").classList.add("hidden");
        
        if (id === getCreds(_0x4a21) && pass === getCreds(_0x91b2)) {
            currentSessionUser = { id, name: "Admin Soumya", role: "Root Controller", isAdmin: true };
            openDashboard();
        } else {
            let user = employees.find(e => e.id === id && e.pass === pass);
            if (user) {
                currentSessionUser = { ...user, isAdmin: false };
                openDashboard();
            } else {
                document.getElementById("loginMsg").innerText = "UNAUTHORIZED ACCESS ATTEMPT DETECTED.";
            }
        }
    }

    function openDashboard() {
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");
        
        document.querySelectorAll(".admin-only").forEach(el => {
            currentSessionUser.isAdmin ? el.classList.remove("hidden") : el.classList.add("hidden");
        });

        showPage('home');
        renderClock();
    }

    // High-End Home Interface
    function renderHome() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        document.getElementById("homePage").innerHTML = `
            <div class="home-grid">
                <div class="glass-card clock-box">
                    <h2 class="clock-display" id="liveTime">00:00:00</h2>
                    <p class="neon-text">${now.toLocaleDateString(undefined, options)}</p>
                </div>
                <div class="glass-card broadcast-box cyber-glow">
                    <h3 class="neon-text">📡 CORE BROADCAST</h3>
                    <p style="font-size: 1.2rem; margin-top: 15px; line-height: 1.6;">${globalBroadcast}</p>
                </div>
                <div class="glass-card">
                    <h3 class="neon-text">⚡ SYSTEM WINDOWS</h3>
                    <div style="margin-top: 15px; line-height: 2;">
                        <p>🔹 FIRST HALF: 09:30 - 10:30 AM</p>
                        <p>🔹 SECOND HALF: 02:30 - 03:30 PM</p>
                        <p>🔹 CHECKOUT: 06:30 PM ONWARDS</p>
                    </div>
                </div>
                <div class="glass-card">
                    <h3 class="neon-text">🛡️ OPERATIONAL STATUS</h3>
                    <p style="margin-top: 15px;">User: ${currentSessionUser.name}</p>
                    <p>Status: <span style="color: #00f2ff;">ACTIVE NODE</span></p>
                </div>
            </div>
        `;
    }

    // Messaging Logic
    window.sendMessage = function() {
        const text = document.getElementById("msgContent").value.trim();
        if(!text) return;
        
        const newMsg = {
            sender: currentSessionUser.name,
            uid: currentSessionUser.id,
            content: text,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };

        messages.push(newMsg);
        localStorage.setItem("portalMessages", JSON.stringify(messages));
        document.getElementById("msgContent").value = "";
        alert("Transmission sent successfully.");
    };

    function renderMessages() {
        const stream = document.getElementById("messageStream");
        stream.innerHTML = "";
        messages.slice().reverse().forEach(m => {
            stream.innerHTML += `
                <div class="msg-card">
                    <p><b class="neon-text">${m.sender}</b> (${m.uid})</p>
                    <p style="margin: 10px 0;">${m.content}</p>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">${m.date} | ${m.time}</p>
                </div>
            `;
        });
    }

    // Standard Controls
    window.showPage = function(page, event) {
        document.querySelectorAll(".dashboard-page").forEach(p => p.classList.add("hidden"));
        document.getElementById(page + "Page").classList.remove("hidden");
        
        if(event) {
            document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
            event.target.classList.add("active");
        }

        if(page === 'home') renderHome();
        if(page === 'messenger' && currentSessionUser.isAdmin) {
            document.getElementById("employeeMsgBox").classList.add("hidden");
            document.getElementById("adminMsgBox").classList.remove("hidden");
            renderMessages();
        }
    };

    window.toggleTheme = () => document.body.classList.toggle("light");
    window.logout = () => location.reload();

    function renderClock() {
        setInterval(() => {
            const clock = document.getElementById("liveTime");
            if(clock) clock.innerText = new Date().toLocaleTimeString();
        }, 1000);
    }

})();