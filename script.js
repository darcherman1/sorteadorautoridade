// script.js - VERSÃO v5.0 (MULTI-PROXY + CORREÇÃO WEB)

const translations = {
    'pt': {
        appTitle: 'Ferramenta de Sorteio',
        loginSubtitle: 'Digite o(s) canal(is) para o sorteio.',
        kickChannel: 'Canal da Kick',
        twitchChannel: 'Canal da Twitch',
        connect: 'Conectar',
        connectedTo: 'Conectado a:',
        changeChannel: 'Trocar Canal',
        settings: 'Configurações',
        keyword: 'Palavra-chave (opcional):',
        allowDualEntry: 'Permitir entrada dupla (Kick + Twitch)',
        whoCanParticipate: 'Quem pode participar?',
        allowViewers: 'Viewers',
        allowSubs: 'Inscritos (Subs)',
        allowVips: 'VIPs',
        allowMods: 'Moderadores',
        timerDuration: 'Duração do Timer (segundos):',
        animation: 'Animação do Sorteio:',
        animScramble: 'Aleatório (letras)',
        animNone: 'Nenhuma',
        multipliers: 'Multiplicadores de Sorte',
        platform: 'Plataforma',
        botSettings: 'Configurações do Bot',
        enableTwitchBot: 'Ativar Bot da Twitch',
        botUsername: 'Nome de usuário do Bot (Twitch)',
        botUsernamePlaceholder: 'Nome do seu bot',
        botToken: 'Token OAuth do Bot (Twitch)',
        useAnnouncementAuto: 'Enviar Auto-Mensagens como Comunicado',
        announcementColor: 'Cor do Comunicado:',
        announcementScopeWarning: '⚠️ ATENÇÃO: Token requer escopo "moderator:manage:announcements".',
        colorPrimary: 'Padrão',
        colorBlue: 'Azul',
        colorGreen: 'Verde',
        colorOrange: 'Laranja',
        colorPurple: 'Roxo',
        startMessage: 'Mensagem de Início ({keyword})',
        announceMessage: 'Mensagem do Vencedor ({winner}, {platform}, {chance}%, {award})',
        defaultStartMessage: 'Um novo sorteio começou! Digite {keyword} para entrar!',
        defaultAnnounceMessage: 'Parabéns @{winner}, você ganhou {award} pela {platform} com {chance}% de chance! 🎉',
        enableKickBot: 'Ativar Bot da Kick (via Kicklet)',
        kickletApiToken: 'Token de API do Kicklet',
        kickStartMessage: 'Mensagem de Início (Kick) ({keyword})',
        kickAnnounceMessage: 'Mensagem do Vencedor (Kick) ({winner}, {platform}, {chance}%, {award})',
        defaultKickStartMessage: 'Um novo sorteio começou! Digite {keyword} para entrar!',
        defaultKickAnnounceMessage: 'Parabéns @{winner}, você ganhou {award} pela {platform} com {chance}% de chance! 🎉',
        kickletTokenTooltip: 'Pegue isso nas Configurações do SEU Perfil do Kicklet...',
        botTokenTooltip: 'Token OAuth com escopo para chat/anúncios.',
        saveSettings: 'Salvar Configurações',
        statusWaiting: 'Pressione "Iniciar Sorteio" para conectar.',
        statusConnected: 'Conectado! Aguardando entradas.',
        statusError: 'Erro de conexão.',
        startGiveaway: 'Iniciar Sorteio',
        participants: 'Participantes',
        drawWinner: 'Sortear Vencedor',
        drawAgain: 'Sortear Novamente',
        reset: 'Resetar',
        winners: 'Vencedores',
        alertNoParticipants: 'Não há participantes válidos!',
        alertNoChannel: 'Digite pelo menos um canal.',
        alertConnectFail: 'Falha na conexão:',
        alertSettingsSaved: 'Configurações salvas!',
        chatWaitingForMessage: 'Aguardando mensagem do vencedor...',
        pauseGiveaway: 'Parar Entradas',
        resumeGiveaway: 'Retomar Entradas',
        statusPaused: 'Entradas pausadas.',
        twitchClosedMessage: 'Mensagem "Parar Entradas" (Twitch)',
        kickClosedMessage: 'Mensagem "Parar Entradas" (Kick)',
        defaultTwitchClosedMessage: 'As entradas estão fechadas! Boa sorte.',
        defaultKickClosedMessage: 'As entradas estão fechadas! Boa sorte.',
        enableAwardsOverlay: 'Painel de Premiação',
        awardsDv: 'DV (Login)',
        awardsApiKey: 'Chave da API',
        awardsPanelTitle: 'Prêmios Atuais',
        awardsStatusLoading: 'Carregando...',
        awardsStatusError: 'Verifique credenciais.',
        awardsStatusApiError: 'Erro API.',
        awardsStatusNoAwards: 'Nenhum prêmio.',
        awardAnnounceMessageLabel: 'Mensagem de Anúncio de Prêmio ({award})',
        defaultAwardAnnounceMessage: 'Próximo sorteio: {award}!',
        enableModalSendMessage: 'Ativar Janela de Mensagens',
        defaultAwardFallback: 'o prêmio'
    }
};

let currentLang = 'pt';
function setLanguage(lang) {
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.dataset.langKey;
        if (translations['pt'][key] && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
            el.textContent = translations['pt'][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // --- SELETORES ---
    const loginScreen = document.getElementById('login-screen');
    const mainScreen = document.getElementById('main-screen');
    const connectButton = document.getElementById('connect-button');
    const kickChannelInput = document.getElementById('kick-channel-input');
    const twitchChannelInput = document.getElementById('twitch-channel-input');
    const connectedKickChannel = document.getElementById('connected-kick-channel');
    const connectedTwitchChannel = document.getElementById('connected-twitch-channel');
    
    const mainTimerDisplay = document.getElementById('main-timer-display');
    const mainWinnerBox = document.getElementById('main-winner-box');
    const mainWinnerChat = document.getElementById('main-winner-chat');
    
    // Painel Flutuante
    const floatingPanel = document.getElementById('floating-message-panel');
    const floatingPanelHeader = document.getElementById('floating-panel-header');
    const closeFloatingPanelBtn = document.getElementById('close-floating-panel');
    const floatingMessageInput = document.getElementById('floating-message-input');
    const floatingSendGlobalBtn = document.getElementById('floating-send-global');
    const floatingSendAwardBtn = document.getElementById('floating-send-award');
    const enableFloatingPanelCheckbox = document.getElementById('enable-floating-panel-checkbox');

    // Configs
    const openSettingsBtn = document.getElementById('open-settings-button');
    const closeSettingsBtn = document.getElementById('close-settings-button');
    const settingsOverlay = document.getElementById('settings-overlay');
    const changeChannelBtn = document.getElementById('change-channel-button');
    
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    const keywordInput = document.getElementById('keyword-input');
    const allowMultiPlatformCheckbox = document.getElementById('allow-multi-platform-checkbox');
    const winnerTimerDurationInput = document.getElementById('winner-timer-duration-input');
    const animationSelect = document.getElementById('animation-select');
    
    const allowViewersCheckbox = document.getElementById('allow-viewers-checkbox');
    const allowSubsCheckbox = document.getElementById('allow-subs-checkbox');
    const allowVipsCheckbox = document.getElementById('allow-vips-checkbox');
    const allowModsCheckbox = document.getElementById('allow-mods-checkbox');
    
    const kickSubMultiplier = document.getElementById('kick-sub-multiplier');
    const kickVipMultiplier = document.getElementById('kick-vip-multiplier');
    const twitchSubMultiplier = document.getElementById('twitch-sub-multiplier');
    const twitchVipMultiplier = document.getElementById('twitch-vip-multiplier');
    
    // Visual Inputs
    const appWidthSlider = document.getElementById('app-width-slider');
    const stageWidthSlider = document.getElementById('stage-width-slider');
    const sideWidthSlider = document.getElementById('side-width-slider');
    
    // Palco Inputs
    const winnerFontSizeSlider = document.getElementById('winner-font-size-slider');
    const winnerNameColorPicker = document.getElementById('winner-name-color-picker');
    const timerFontSizeSlider = document.getElementById('timer-font-size-slider');
    const timerColorPicker = document.getElementById('timer-color-picker');
    const stageBgPicker = document.getElementById('stage-bg-picker');
    
    // Tag Inputs
    const subBgPicker = document.getElementById('sub-bg-picker');
    const subTextPicker = document.getElementById('sub-text-picker');
    const vipBgPicker = document.getElementById('vip-bg-picker');
    const vipTextPicker = document.getElementById('vip-text-picker');

    const primaryColorPicker = document.getElementById('primary-color-picker');
    const cardTagPicker = document.getElementById('card-tag-picker');
    const scrollbarPicker = document.getElementById('scrollbar-picker');
    const appBgPicker = document.getElementById('app-bg-picker');
    const pauseBtnPicker = document.getElementById('pause-btn-picker');
    const resetBtnPicker = document.getElementById('reset-btn-picker');
    const listTitleColorPicker = document.getElementById('list-title-color-picker');
    const listTitleSizeSlider = document.getElementById('list-title-size-slider');
    const listContentColorPicker = document.getElementById('list-content-color-picker');
    const listContentSizeSlider = document.getElementById('list-content-size-slider');
    const resetVisualButton = document.getElementById('reset-visual-button');

    // Bots & Awards
    const enableTwitchBotCheckbox = document.getElementById('enable-twitch-bot-checkbox');
    const twitchBotUsernameInput = document.getElementById('twitch-bot-username-input');
    const twitchBotOauthInput = document.getElementById('twitch-bot-oauth-input');
    const twitchUseAnnouncementCheckbox = document.getElementById('twitch-use-announcement-checkbox');
    const twitchAnnouncementColorSelect = document.getElementById('twitch-announcement-color-select');
    const startMessageInput = document.getElementById('start-message-input');
    const announcementMessageInput = document.getElementById('announcement-message-input');
    const twitchClosedMessageInput = document.getElementById('twitch-closed-message-input');
    
    const enableKickBotCheckbox = document.getElementById('enable-kick-bot-checkbox');
    const kickletApiTokenInput = document.getElementById('kicklet-api-token-input');
    const kickStartMessageInput = document.getElementById('kick-start-message-input');
    const kickAnnounceMessageInput = document.getElementById('kick-announcement-message-input');
    const kickClosedMessageInput = document.getElementById('kick-closed-message-input');
    
    const enableAwardsOverlayCheckbox = document.getElementById('enable-awards-overlay-checkbox');
    const awardsDvInput = document.getElementById('awards-dv-input');
    const awardsApiKeyInput = document.getElementById('awards-api-key-input');
    const awardAnnounceMessageInput = document.getElementById('award-announce-message-input');
    const awardsListContainer = document.getElementById('awards-list-container');
    const awardsStatusMessage = document.getElementById('awards-status-message');
    
    const startGiveawayButton = document.getElementById('start-giveaway-button');
    const drawButton = document.getElementById('draw-button');
    const pauseGiveawayButton = document.getElementById('pause-giveaway-button');
    const resetButton = document.getElementById('reset-button');
    const saveSettingsButton = document.getElementById('save-settings-button');
    
    const participantList = document.getElementById('participant-list');
    const participantCount = document.getElementById('participant-count');
    const winnersList = document.getElementById('winners-list');
    const winnersCount = document.getElementById('winners-count');
    
    const statusMessage = document.getElementById('status-message');
    const tooltipPopup = document.getElementById('tooltip-popup-container');
    
    // Estado
    let kickChannel = null, twitchChannel = null;
    let kickChatroomId = null;
    let kickWs = null, twitchClient = null;
    let isGiveawayRunning = false;
    let participants = new Map();
    let allEntries = [];
    let winners = [];
    let winningUsernames = new Set();
    let winnerCountdownInterval = null;
    let currentMonitoredWinnerId = null;
    let currentMonitoredChatbox = null;
    let hasWinnerResponded = false;
    let awardsApiTimer = null;
    let isAwardsLoading = false;
    let lastValidAwards = [];
    let awardsApiAttempts = 0;
    let awardsUsingProxy = false;
    let twitchClientId = null, twitchBroadcasterId = null, twitchBotId = null;

    // --- UI HELPERS ---
    function showScreen(screen) {
        loginScreen.style.display = 'none'; mainScreen.style.display = 'none';
        if (screen === 'login') loginScreen.style.display = 'flex';
        if (screen === 'main') mainScreen.style.display = 'flex';
    }
    function toggleSettings(show) { settingsOverlay.style.display = show ? 'flex' : 'none'; }
    function showAlert(langKey, ...args) {
        let message = translations['pt'][langKey];
        if (args.length > 0) message = `${message} ${args.join(' ')}`;
        alert(message);
    }

    // --- FUNÇÕES CHAVE (RESET, UI) ---
    function resetGiveawayState() { 
        participants.clear(); 
        allEntries = []; 
        updateParticipantListUI(); 
    }

    function fullReset() {
        resetGiveawayState(); 
        winners = []; 
        winningUsernames.clear(); 
        updateWinnersListUI();
        isGiveawayRunning = false;
        mainTimerDisplay.textContent = "--";
        mainWinnerBox.innerHTML = '<span class="placeholder-text">Aguardando...</span>';
        mainWinnerChat.innerHTML = '<p style="color: #666; font-style: italic;">As mensagens do vencedor aparecerão aqui...</p>';
        if (winnerCountdownInterval) clearInterval(winnerCountdownInterval);
        drawButton.textContent = translations['pt'].drawWinner;
        statusMessage.textContent = translations['pt'].statusWaiting;
        statusMessage.className = 'status-waiting';
        startGiveawayButton.disabled = false;
        pauseGiveawayButton.disabled = true;
        pauseGiveawayButton.classList.remove('paused');
        pauseGiveawayButton.textContent = translations['pt'].pauseGiveaway;
    }

    // --- FLOATING PANEL ---
    function setupFloatingPanel() {
        closeFloatingPanelBtn.onclick = () => {
            floatingPanel.style.display = 'none';
            if(enableFloatingPanelCheckbox) enableFloatingPanelCheckbox.checked = false;
        };
        if(enableFloatingPanelCheckbox) {
            enableFloatingPanelCheckbox.onchange = (e) => {
                floatingPanel.style.display = e.target.checked ? 'flex' : 'none';
            };
        }
        let isDragging = false, currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;
        floatingPanelHeader.addEventListener("mousedown", dragStart);
        document.addEventListener("mouseup", dragEnd);
        document.addEventListener("mousemove", drag);
        function dragStart(e) {
            initialX = e.clientX - xOffset; initialY = e.clientY - yOffset;
            if (e.target === floatingPanelHeader || e.target.parentNode === floatingPanelHeader) isDragging = true;
        }
        function dragEnd(e) { initialX = currentX; initialY = currentY; isDragging = false; }
        function drag(e) {
            if (isDragging) {
                e.preventDefault(); currentX = e.clientX - initialX; currentY = e.clientY - initialY;
                xOffset = currentX; yOffset = currentY;
                floatingPanel.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`;
            }
        }
        floatingSendGlobalBtn.onclick = () => {
            const msg = floatingMessageInput.value;
            sendTwitchMessage(msg, twitchUseAnnouncementCheckbox.checked, twitchAnnouncementColorSelect.value);
            sendKickletMessage(msg);
        };
        floatingSendAwardBtn.onclick = () => {
            const premio = floatingMessageInput.value.trim() || "o prêmio"; 
            const fraseFixa = "Próximo sorteio: {award}!"; 
            const msgFinal = fraseFixa.replace('{award}', premio);
            sendTwitchMessage(msgFinal, twitchUseAnnouncementCheckbox.checked, twitchAnnouncementColorSelect.value);
            sendKickletMessage(msgFinal);
        };
    }

    // --- VISUAL CONTROLS ---
    function setupTabs() {
        tabButtons.forEach(btn => {
            btn.onclick = () => {
                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active'); document.getElementById(btn.dataset.tab).classList.add('active');
            };
        });
    }
    function setupVisualControls() {
        const root = document.documentElement;

        appWidthSlider.oninput = (e) => root.style.setProperty('--app-max-width', e.target.value + 'px');
        stageWidthSlider.oninput = (e) => root.style.setProperty('--stage-flex', e.target.value);
        sideWidthSlider.oninput = (e) => root.style.setProperty('--side-flex', e.target.value);
        
        winnerFontSizeSlider.oninput = (e) => root.style.setProperty('--winner-name-size', e.target.value + 'rem');
        winnerNameColorPicker.oninput = (e) => root.style.setProperty('--winner-name-color', e.target.value);
        timerFontSizeSlider.oninput = (e) => root.style.setProperty('--timer-size', e.target.value + 'rem');
        timerColorPicker.oninput = (e) => root.style.setProperty('--timer-color', e.target.value);
        stageBgPicker.oninput = (e) => root.style.setProperty('--stage-bg', e.target.value);

        // Tags
        subBgPicker.oninput = (e) => root.style.setProperty('--sub-bg', e.target.value);
        subTextPicker.oninput = (e) => root.style.setProperty('--sub-text', e.target.value);
        vipBgPicker.oninput = (e) => root.style.setProperty('--vip-bg', e.target.value);
        vipTextPicker.oninput = (e) => root.style.setProperty('--vip-text', e.target.value);

        primaryColorPicker.oninput = (e) => root.style.setProperty('--primary-color', e.target.value);
        cardTagPicker.oninput = (e) => root.style.setProperty('--card-tag-color', e.target.value);
        scrollbarPicker.oninput = (e) => root.style.setProperty('--scrollbar-color', e.target.value);
        appBgPicker.oninput = (e) => root.style.setProperty('--panel-bg-color', e.target.value);

        pauseBtnPicker.oninput = (e) => root.style.setProperty('--pause-btn-bg', e.target.value);
        resetBtnPicker.oninput = (e) => root.style.setProperty('--reset-btn-bg', e.target.value);
        listTitleColorPicker.oninput = (e) => root.style.setProperty('--list-header-color', e.target.value);
        listTitleSizeSlider.oninput = (e) => root.style.setProperty('--list-header-size', e.target.value + 'rem');
        listContentColorPicker.oninput = (e) => root.style.setProperty('--list-content-color', e.target.value);
        listContentSizeSlider.oninput = (e) => root.style.setProperty('--list-content-size', e.target.value + 'rem');

        resetVisualButton.onclick = () => {
            // Reset to defaults
            appWidthSlider.value = 1520; stageWidthSlider.value = 2; sideWidthSlider.value = 1;
            winnerFontSizeSlider.value = 3.5; winnerNameColorPicker.value = '#53fc18';
            timerFontSizeSlider.value = 5; timerColorPicker.value = '#ffffff';
            subBgPicker.value = '#53fc18'; subTextPicker.value = '#000000';
            vipBgPicker.value = '#ae70ff'; vipTextPicker.value = '#000000';
            
            primaryColorPicker.value = '#53fc18'; cardTagPicker.value = '#ffd100';
            scrollbarPicker.value = '#53fc18'; stageBgPicker.value = '#151515'; appBgPicker.value = '#27282c';
            pauseBtnPicker.value = '#f39c12'; resetBtnPicker.value = '#e9113c';
            listTitleColorPicker.value = '#f0f1f1'; listContentColorPicker.value = '#f0f1f1';
            listTitleSizeSlider.value = 1.1; listContentSizeSlider.value = 0.95;
            
            // Apply
            root.style.setProperty('--app-max-width', '95rem'); root.style.setProperty('--stage-flex', 2);
            root.style.setProperty('--side-flex', 1); root.style.setProperty('--primary-color', '#53fc18');
            root.style.setProperty('--winner-name-size', '3.5rem'); root.style.setProperty('--winner-name-color', '#53fc18');
            root.style.setProperty('--timer-size', '5rem'); root.style.setProperty('--timer-color', '#ffffff');
            root.style.setProperty('--sub-bg', '#53fc18'); root.style.setProperty('--sub-text', '#000000');
            root.style.setProperty('--vip-bg', '#ae70ff'); root.style.setProperty('--vip-text', '#000000');
            root.style.setProperty('--card-tag-color', '#ffd100'); root.style.setProperty('--scrollbar-color', '#53fc18');
            root.style.setProperty('--stage-bg', '#151515'); root.style.setProperty('--panel-bg-color', '#27282c');
            root.style.setProperty('--pause-btn-bg', '#f39c12'); root.style.setProperty('--reset-btn-bg', '#e9113c');
            root.style.setProperty('--list-header-color', '#f0f1f1'); root.style.setProperty('--list-header-size', '1.1rem');
            root.style.setProperty('--list-content-color', '#f0f1f1'); root.style.setProperty('--list-content-size', '0.95rem');
        };
    }

    // --- CONEXÃO MULTI-PROXY (CORREÇÃO FUNDAMENTAL) ---
    async function handleConnect() {
        const k = kickChannelInput.value.trim().toLowerCase();
        const t = twitchChannelInput.value.trim().toLowerCase();
        if (!k && !t) { showAlert('alertNoChannel'); return; }
        connectButton.disabled = true; connectButton.textContent = 'Conectando...';
        try {
            if (k) {
                // TENTA 2 PROXIES DIFERENTES SE UM FALHAR
                let chatroomId = null;
                const url = `https://kick.com/api/v1/channels/${k}`;
                
                // TENTATIVA 1: AllOrigins Raw (Melhor para HTML local)
                try {
                    const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
                    if(res.ok) {
                        const data = await res.json();
                        if(data && data.chatroom) chatroomId = data.chatroom.id;
                    }
                } catch(e) { console.log("Proxy 1 falhou, tentando 2..."); }

                // TENTATIVA 2: Corsproxy (Fallback)
                if(!chatroomId) {
                    try {
                        const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
                        if(res.ok) {
                            const data = await res.json();
                            if(data && data.chatroom) chatroomId = data.chatroom.id;
                        }
                    } catch(e) { console.log("Proxy 2 falhou."); }
                }

                if (chatroomId) {
                    kickChatroomId = chatroomId;
                    kickChannel = k;
                    connectedKickChannel.textContent = k;
                    connectedKickChannel.classList.add('platform-kick');
                    connectedKickChannel.style.display = 'inline-block';
                } else {
                    throw new Error('Não foi possível obter o ID da sala Kick. Tente novamente.');
                }
            } else { connectedKickChannel.style.display = 'none'; }

            if (t) {
                twitchChannel = t;
                connectedTwitchChannel.textContent = t;
                connectedTwitchChannel.classList.add('platform-twitch');
                connectedTwitchChannel.style.display = 'inline-block';
            } else { connectedTwitchChannel.style.display = 'none'; }

            loadSettings();
            showScreen('main');
        } catch (e) { showAlert('alertConnectFail', e.message); } 
        finally { connectButton.disabled = false; connectButton.textContent = translations['pt'].connect; }
    }

    // --- HELPER BOTS ---
    async function validateTwitchTokenAndGetIds() {
        const token = twitchBotOauthInput.value.trim().replace('oauth:', '');
        if (!token || !twitchChannel || !enableTwitchBotCheckbox.checked) return;
        try {
            const v = await fetch('https://id.twitch.tv/oauth2/validate', { headers: { 'Authorization': `OAuth ${token}` } });
            if (!v.ok) throw new Error('Token');
            const d = await v.json(); twitchClientId = d.client_id; twitchBotId = d.user_id;
            const u = await fetch(`https://api.twitch.tv/helix/users?login=${twitchChannel}`, { headers: { 'Client-Id': twitchClientId, 'Authorization': `Bearer ${token}` } });
            if (u.ok) { const ud = await u.json(); if (ud.data?.[0]) twitchBroadcasterId = ud.data[0].id; }
        } catch (e) { console.error(e); }
    }
    function sendTwitchChat(msg) { if (twitchClient && twitchClient.readyState() === 'OPEN') twitchClient.say(twitchChannel, msg).catch(console.error); }
    async function sendTwitchAnnouncement(msg, color='primary') {
        const cleanToken = twitchBotOauthInput.value.trim().replace('oauth:', '');
        if (!cleanToken || !twitchClientId || !twitchBroadcasterId || !twitchBotId) return sendTwitchChat(msg);
        try { await fetch(`https://api.twitch.tv/helix/chat/announcements?broadcaster_id=${twitchBroadcasterId}&moderator_id=${twitchBotId}`, { method: 'POST', headers: { 'Client-Id': twitchClientId, 'Authorization': `Bearer ${cleanToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg, color: color }) }); } catch { sendTwitchChat(msg); }
    }
    function sendTwitchMessage(msg, force, color) { if (force) sendTwitchAnnouncement(msg, color); else sendTwitchChat(msg); }
    async function sendKickletMessage(msg) {
        const token = kickletApiTokenInput.value.trim();
        if (!enableKickBotCheckbox.checked || !token) return;
        try { await fetch('https://kicklet.app/api/kick/message', { method: 'POST', headers: { 'Authorization': `apitoken ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ content: msg }) }); } catch (e) { console.error(e); }
    }
    function sendTwitchClosedMessage() { sendTwitchMessage(twitchClosedMessageInput.value, twitchUseAnnouncementCheckbox.checked, twitchAnnouncementColorSelect.value); }
    function sendKickClosedMessage() { sendKickletMessage(kickClosedMessageInput.value); }
    function isUserAllowed(userStatus) {
        if (userStatus.isMod) return allowModsCheckbox.checked;
        if (userStatus.isVip) return allowVipsCheckbox.checked;
        if (userStatus.isSub) return allowSubsCheckbox.checked;
        return allowViewersCheckbox.checked;
    }

    // --- START/PAUSE ---
    async function handleStartGiveaway() {
        if (!kickChannel && !twitchChannel) return;
        if(!isGiveawayRunning) resetGiveawayState();
        isGiveawayRunning = true;
        startGiveawayButton.disabled = true; pauseGiveawayButton.disabled = false;
        pauseGiveawayButton.classList.remove('paused');
        statusMessage.textContent = translations['pt'].statusConnected; statusMessage.className = 'status-connected';
        if (twitchChannel) {
            if (enableTwitchBotCheckbox.checked) await validateTwitchTokenAndGetIds();
            connectToTwitch();
            if (enableTwitchBotCheckbox.checked) {
                const msg = startMessageInput.value.replace('{keyword}', keywordInput.value.trim() || 'msg');
                sendTwitchMessage(msg, twitchUseAnnouncementCheckbox.checked, twitchAnnouncementColorSelect.value);
            }
        }
        if (kickChannel) {
            connectToKick();
            if (enableKickBotCheckbox.checked) {
                const msg = kickStartMessageInput.value.replace('{keyword}', keywordInput.value.trim() || 'msg');
                sendKickletMessage(msg);
            }
        }
    }
    function handlePauseGiveaway() {
        isGiveawayRunning = !isGiveawayRunning;
        if (isGiveawayRunning) {
            pauseGiveawayButton.textContent = translations['pt'].pauseGiveaway; pauseGiveawayButton.classList.remove('paused'); statusMessage.textContent = translations['pt'].statusConnected; statusMessage.className = 'status-connected';
        } else {
            pauseGiveawayButton.textContent = translations['pt'].resumeGiveaway; pauseGiveawayButton.classList.add('paused'); statusMessage.textContent = translations['pt'].statusPaused; statusMessage.className = 'status-waiting'; sendTwitchClosedMessage(); sendKickClosedMessage();
        }
    }

    // --- KICK WS ---
    function connectToKick() {
        if (kickWs) { try { kickWs.close(); } catch(e){} }
        kickWs = new WebSocket('wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0&flash=false');
        kickWs.onopen = () => { console.log('Kick OK'); kickWs.send(JSON.stringify({ event: 'pusher:subscribe', data: { auth: '', channel: `chatrooms.${kickChatroomId}.v2` } })); };
        kickWs.onmessage = (event) => {
            const parsed = JSON.parse(event.data);
            if (parsed.event === 'pusher:ping') { kickWs.send(JSON.stringify({ event: 'pusher:pong', data: {} })); return; }
            if (parsed.event === 'App\\Events\\ChatMessageEvent') handleKickMessage(JSON.parse(parsed.data));
        };
        kickWs.onclose = () => { console.log('Kick Reconnecting...'); if(kickChannel) setTimeout(connectToKick, 5000); };
    }
    function handleKickMessage(msgData) {
        const user = msgData.sender; if (!user) return;
        const uniqueId = `kick-${user.username}`;
        if (currentMonitoredWinnerId === uniqueId && currentMonitoredChatbox) {
            appendMessageToWinnerChat(msgData.content.trim(), currentMonitoredChatbox);
            if (winnerCountdownInterval) clearInterval(winnerCountdownInterval);
        }
        if (!isGiveawayRunning) return;
        if (winningUsernames.has(user.username.toLowerCase())) return;
        const key = keywordInput.value.trim().toLowerCase();
        if (key !== '' && msgData.content.trim().toLowerCase() !== key) return;
        const b = user.identity?.badges || [];
        const isMod = b.some(x => x.type === 'moderator' || x.type === 'broadcaster');
        const isSub = b.some(x => x.type === 'subscriber' || x.type === 'founder');
        const isVip = b.some(x => x.type?.toLowerCase() === 'vip');
        if (isUserAllowed({ isMod, isSub, isVip })) addParticipant(user.username, 'kick', { isSub, isVip });
    }

    // --- TWITCH WS ---
    function connectToTwitch() {
        if (twitchClient) { try { twitchClient.disconnect(); } catch(e){} }
        twitchClient = new tmi.Client({ connection: { secure: true, reconnect: true }, channels: [twitchChannel] });
        twitchClient.on('message', (ch, user, msg, self) => { if (!self) handleTwitchMessage(user, msg); });
        twitchClient.connect().catch(e => { console.error('Twitch Err', e); setTimeout(connectToTwitch, 5000); });
    }
    function handleTwitchMessage(userstate, message) {
        const user = userstate['display-name'];
        const uniqueId = `twitch-${user}`;
        if (currentMonitoredWinnerId === uniqueId && currentMonitoredChatbox) {
            appendMessageToWinnerChat(message.trim(), currentMonitoredChatbox);
            if (winnerCountdownInterval) clearInterval(winnerCountdownInterval);
        }
        if (!isGiveawayRunning) return;
        if (winningUsernames.has(user.toLowerCase())) return;
        const key = keywordInput.value.trim().toLowerCase();
        if (key !== '' && message.trim().toLowerCase() !== key) return;
        const isMod = userstate.mod || userstate.badges?.broadcaster;
        const isSub = userstate.subscriber || userstate.badges?.founder === '0';
        const isVip = !!userstate.vip;
        if (isUserAllowed({ isMod, isSub, isVip })) addParticipant(user, 'twitch', { isSub, isVip });
    }

    function addParticipant(username, platform, status) {
        const uniqueId = `${platform}-${username}`;
        if (participants.has(uniqueId)) return;
        if (!allowMultiPlatformCheckbox.checked) {
            if (Array.from(participants.values()).some(p => p.username.toLowerCase() === username.toLowerCase())) return;
        }
        let entries = 1; let tags = [];
        const subMult = platform === 'kick' ? kickSubMultiplier.value : twitchSubMultiplier.value;
        const vipMult = platform === 'kick' ? kickVipMultiplier.value : twitchVipMultiplier.value;
        if (status.isSub) { entries = Math.max(entries, parseInt(subMult)); tags.push({text: 'SUB', class: 'sub'}); }
        if (status.isVip) { entries = Math.max(entries, parseInt(vipMult)); tags.push({text: 'VIP', class: 'vip'}); }
        participants.set(uniqueId, { username, platform, entries, tags, hasWon: false, isExcluded: false });
        updateParticipantListUI();
    }
    function updateParticipantListUI() {
        participantList.innerHTML = ''; allEntries = [];
        participants.forEach((p, id) => {
            const li = document.createElement('li'); li.dataset.uniqueId = id;
            li.innerHTML = `<img class="platform-icon" src="${p.platform === 'kick' ? 'https://kick.com/favicon.ico' : 'https://www.twitch.tv/favicon.ico'}"> <span class="winner-name-span">${p.username}</span>`;
            const tagsDiv = document.createElement('div'); tagsDiv.className = 'status-tags-container';
            p.tags.forEach(t => { const s = document.createElement('span'); s.className = `status-tag ${t.class}`; s.textContent = t.text; tagsDiv.appendChild(s); });
            li.appendChild(tagsDiv);
            if(p.hasWon) { li.classList.add('participant-winner-style'); li.title = "Já ganhou"; }
            if(p.isExcluded) { li.classList.add('participant-excluded'); li.title = "Excluído"; }
            li.onclick = () => toggleParticipantExclusion(id);
            participantList.prepend(li);
            if (!p.hasWon && !p.isExcluded) { for(let i=0; i<p.entries; i++) allEntries.push(id); }
        });
        participantCount.textContent = participants.size; drawButton.disabled = allEntries.length === 0;
    }
    function toggleParticipantExclusion(id) { const p = participants.get(id); if (p) { p.isExcluded = !p.isExcluded; updateParticipantListUI(); } }
    function appendMessageToWinnerChat(message, chatBox) {
        if (!hasWinnerResponded) { chatBox.innerHTML = ''; chatBox.classList.remove('no-messages'); hasWinnerResponded = true; }
        const p = document.createElement('p'); p.textContent = message; chatBox.appendChild(p); chatBox.scrollTop = chatBox.scrollHeight;
    }

    function drawWinner() {
        updateParticipantListUI();
        if (allEntries.length === 0) { showAlert('alertNoParticipants'); return; }
        drawButton.disabled = true;
        const winnerId = allEntries[Math.floor(Math.random() * allEntries.length)];
        const winnerObj = participants.get(winnerId);
        if (!winnerObj) { updateParticipantListUI(); return; }
        const chance = ((winnerObj.entries / allEntries.length) * 100).toFixed(1);
        runMainScreenAnimation(winnerObj.username, winnerId, winnerObj.platform, chance, winnerObj.tags);
    }
    function runMainScreenAnimation(name, id, platform, chance, tags) {
        if (winnerCountdownInterval) clearInterval(winnerCountdownInterval);
        mainWinnerChat.innerHTML = ''; mainWinnerChat.classList.remove('no-messages'); mainWinnerBox.innerHTML = '';
        const iconEl = document.createElement('img'); iconEl.className = 'modal-platform-icon';
        iconEl.src = platform === 'kick' ? 'https://kick.com/favicon.ico' : 'https://www.twitch.tv/favicon.ico';
        iconEl.style.display = 'none';
        const nameEl = document.createElement('h1'); nameEl.className = 'winner-name'; nameEl.textContent = '';
        const tagsContainer = document.createElement('span'); tagsContainer.style.display = 'none';
        if(tags) tags.forEach(t => { const s = document.createElement('span'); s.className = `status-tag ${t.class}`; s.textContent = t.text; tagsContainer.appendChild(s); });
        mainWinnerBox.append(iconEl, nameEl, tagsContainer);
        currentMonitoredWinnerId = id; currentMonitoredChatbox = mainWinnerChat; hasWinnerResponded = false;
        const waitingP = document.createElement('p'); waitingP.textContent = translations['pt'].chatWaitingForMessage;
        waitingP.style.opacity = '0.7'; mainWinnerChat.appendChild(waitingP);
        const duration = parseInt(winnerTimerDurationInput.value) || 30;
        const finalize = () => {
            nameEl.textContent = name; iconEl.style.display = 'inline-block'; tagsContainer.style.display = 'inline-block';
            drawButton.disabled = false; drawButton.textContent = translations['pt'].drawAgain;
            let prize = floatingMessageInput && floatingMessageInput.value.trim() ? floatingMessageInput.value : translations['pt'].defaultAwardFallback;
            let msg = announcementMessageInput.value.replace('{winner}', name).replace('{platform}', platform).replace('{chance}', chance).replace('{award}', prize);
            sendTwitchMessage(msg, twitchUseAnnouncementCheckbox.checked, twitchAnnouncementColorSelect.value);
            if(kickChannel) sendKickletMessage(msg);
            if (duration > 0) {
                let t = duration; mainTimerDisplay.textContent = t; mainTimerDisplay.style.color = '#fff';
                winnerCountdownInterval = setInterval(() => {
                    t--; mainTimerDisplay.textContent = t;
                    if (t <= 10) mainTimerDisplay.style.color = '#e74c3c';
                    if (t <= 0) { clearInterval(winnerCountdownInterval); mainTimerDisplay.textContent = "00"; }
                }, 1000);
            } else mainTimerDisplay.textContent = "--";
            winners.push({name, date: new Date().toLocaleTimeString(), platform, tags});
            winningUsernames.add(name.toLowerCase());
            if (participants.get(id)) participants.get(id).hasWon = true;
            updateParticipantListUI(); updateWinnersListUI();
        };
        if (animationSelect.value === 'char-scramble') {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'; let frame = 0;
            const interval = setInterval(() => {
                let out = ''; let done = true;
                for(let i=0; i<name.length; i++) { const p = Math.min(frame / (40 + i*2), 1); if(p<1) done=false; out += (Math.random() < p) ? name[i] : chars[Math.floor(Math.random()*chars.length)]; }
                nameEl.textContent = out; if(done) { clearInterval(interval); finalize(); } frame++;
            }, 30);
        } else finalize();
    }
    function updateWinnersListUI() {
        if (!winnersList) return; winnersList.innerHTML = '';
        winners.forEach(w => {
            const li = document.createElement('li');
            let th = ''; if(w.tags) w.tags.forEach(t => { th += `<span class="status-tag ${t.class}" style="margin-left:5px;">${t.text}</span>`; });
            li.innerHTML = `<img class="platform-icon" src="${w.platform === 'kick' ? 'https://kick.com/favicon.ico' : 'https://www.twitch.tv/favicon.ico'}"> <span class="winner-name-span">${w.name} ${th}</span> <span class="winner-date-span">${w.date}</span>`;
            winnersList.prepend(li);
        });
        if (winnersCount) winnersCount.textContent = winners.length;
    }

    function renderAwards(awards) {
        if (!Array.isArray(awards) || awards.length === 0) { if (lastValidAwards.length === 0) { awardsListContainer.innerHTML = `<div class="empty">${translations['pt'].awardsStatusNoAwards}</div>`; awardsStatusMessage.style.display = 'none'; } return; }
        if (JSON.stringify(lastValidAwards) === JSON.stringify(awards)) return;
        lastValidAwards = [...awards]; awardsListContainer.innerHTML = ''; awardsStatusMessage.style.display = 'none';
        awards.forEach(award => {
            const card = document.createElement('div'); card.className = 'award-card';
            card.onclick = () => {
                const pName = award.name || 'Prêmio'; if(floatingMessageInput) floatingMessageInput.value = pName;
                const msg = (awardAnnounceMessageInput.value || translations['pt'].defaultAwardAnnounceMessage).replace('{award}', pName);
                const isAnn = twitchUseAnnouncementCheckbox && twitchUseAnnouncementCheckbox.checked;
                const col = twitchAnnouncementColorSelect ? twitchAnnouncementColorSelect.value : 'primary';
                sendTwitchMessage(msg, isAnn, col); sendKickletMessage(msg);
            };
            const tag = document.createElement('div'); tag.className = 'award-card__tag';
            const title = document.createElement('div'); title.className = 'award-card__title'; title.textContent = award.name || '—';
            card.append(tag, title); awardsListContainer.appendChild(card);
        });
    }
    async function fetchAwards() {
        const dv = awardsDvInput.value.trim(); const key = awardsApiKeyInput.value.trim();
        if (!dv || !key) { awardsListContainer.innerHTML = `<div class="error">${translations['pt'].awardsStatusError}</div>`; awardsStatusMessage.style.display = 'none'; return; }
        if (isAwardsLoading) return; isAwardsLoading = true; awardsApiAttempts++;
        const url = `https://megamu.net/dvapi.php?dv=${encodeURIComponent(dv)}&key=${encodeURIComponent(key)}&action=getawards&_=${Date.now()}`;
        // PROXY BACKUP SYSTEM
        let target = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        if (awardsUsingProxy || awardsApiAttempts > 1) target = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        if (lastValidAwards.length === 0) awardsListContainer.innerHTML = `<div class="empty">${translations['pt'].awardsStatusLoading}</div>`; awardsStatusMessage.style.display = 'none';
        try {
            const r = await fetch(target); if (!r.ok) throw new Error('HTTP');
            let d = await r.json(); 
            if (d && (d.result === 1 || d.awards)) renderAwards(d.awards || []);
            else if (lastValidAwards.length === 0) awardsListContainer.innerHTML = `<div class="empty">${translations['pt'].awardsStatusNoAwards}</div>`;
        } catch (e) {
            if (awardsApiAttempts === 1) { isAwardsLoading = false; fetchAwards(); return; }
            if (lastValidAwards.length === 0) awardsListContainer.innerHTML = `<div class="error">${translations['pt'].awardsStatusApiError}</div>`;
        } finally { isAwardsLoading = false; }
    }
    function startAwardsMonitor() { lastValidAwards = []; awardsApiAttempts = 0; awardsUsingProxy = false; fetchAwards(); if(awardsApiTimer) clearInterval(awardsApiTimer); awardsApiTimer = setInterval(() => { awardsApiAttempts = 0; fetchAwards(); }, 3000); }

    function saveSettings() {
        const root = document.documentElement;
        const settings = {
            kickChannel: kickChannelInput.value, twitchChannel: twitchChannelInput.value,
            kickSubMultiplier: kickSubMultiplier.value, kickVipMultiplier: kickVipMultiplier.value,
            twitchSubMultiplier: twitchSubMultiplier.value, twitchVipMultiplier: twitchVipMultiplier.value,
            timerDuration: winnerTimerDurationInput.value, keyword: keywordInput.value,
            enableTwitchBot: enableTwitchBotCheckbox.checked, twitchBotUsername: twitchBotUsernameInput.value,
            twitchBotOauth: twitchBotOauthInput.value, twitchUseAnnouncement: twitchUseAnnouncementCheckbox.checked,
            twitchAnnouncementColor: twitchAnnouncementColorSelect.value, startMessage: startMessageInput.value,
            announcementMessage: announcementMessageInput.value, twitchClosedMessage: twitchClosedMessageInput.value,
            enableKickBot: enableKickBotCheckbox.checked, kickletApiToken: kickletApiTokenInput.value,
            kickStartMessage: kickStartMessageInput.value, kickAnnounceMessage: kickAnnounceMessageInput.value,
            kickClosedMessage: kickClosedMessageInput.value, enableAwardsOverlay: enableAwardsOverlayCheckbox.checked,
            awardsDv: awardsDvInput.value, awardsApiKey: awardsApiKeyInput.value,
            awardAnnounceMessage: awardAnnounceMessageInput.value, allowViewers: allowViewersCheckbox.checked,
            allowSubs: allowSubsCheckbox.checked, allowVips: allowVipsCheckbox.checked,
            allowMods: allowModsCheckbox.checked, enableFloatingPanel: enableFloatingPanelCheckbox ? enableFloatingPanelCheckbox.checked : false,
            visual: {
                appMaxWidth: root.style.getPropertyValue('--app-max-width') || '95rem',
                stageFlex: root.style.getPropertyValue('--stage-flex') || 2,
                sideFlex: root.style.getPropertyValue('--side-flex') || 1,
                winnerNameSize: root.style.getPropertyValue('--winner-name-size') || '3.5rem',
                winnerNameColor: root.style.getPropertyValue('--winner-name-color') || '#53fc18',
                timerSize: root.style.getPropertyValue('--timer-size') || '5rem',
                timerColor: root.style.getPropertyValue('--timer-color') || '#ffffff',
                subBg: root.style.getPropertyValue('--sub-bg') || '#53fc18',
                subText: root.style.getPropertyValue('--sub-text') || '#000000',
                vipBg: root.style.getPropertyValue('--vip-bg') || '#ae70ff',
                vipText: root.style.getPropertyValue('--vip-text') || '#000000',
                primaryColor: root.style.getPropertyValue('--primary-color') || '#53fc18',
                cardTagColor: root.style.getPropertyValue('--card-tag-color') || '#ffd100',
                scrollbarColor: root.style.getPropertyValue('--scrollbar-color') || '#53fc18',
                stageBg: root.style.getPropertyValue('--stage-bg') || '#151515',
                appBg: root.style.getPropertyValue('--panel-bg-color') || '#27282c',
                pauseBtnBg: root.style.getPropertyValue('--pause-btn-bg') || '#f39c12',
                resetBtnBg: root.style.getPropertyValue('--reset-btn-bg') || '#e9113c',
                listHeaderColor: root.style.getPropertyValue('--list-header-color') || '#f0f1f1',
                listHeaderSize: root.style.getPropertyValue('--list-header-size') || '1.1rem',
                listContentColor: root.style.getPropertyValue('--list-content-color') || '#f0f1f1',
                listContentSize: root.style.getPropertyValue('--list-content-size') || '0.95rem'
            }
        };
        localStorage.setItem('giveawayToolSettings', JSON.stringify(settings));
    }
    function loadSettings() {
        const s = JSON.parse(localStorage.getItem('giveawayToolSettings'));
        if (s) {
            kickChannelInput.value = s.kickChannel || ''; twitchChannelInput.value = s.twitchChannel || '';
            kickSubMultiplier.value = s.kickSubMultiplier || 2; twitchSubMultiplier.value = s.twitchSubMultiplier || 2;
            keywordInput.value = s.keyword || ''; winnerTimerDurationInput.value = s.timerDuration || 30;
            enableTwitchBotCheckbox.checked = s.enableTwitchBot || false; twitchBotUsernameInput.value = s.twitchBotUsername || '';
            twitchBotOauthInput.value = s.twitchBotOauth || ''; twitchUseAnnouncementCheckbox.checked = s.twitchUseAnnouncement || false;
            twitchAnnouncementColorSelect.value = s.twitchAnnouncementColor || 'primary'; startMessageInput.value = s.startMessage || translations['pt'].defaultStartMessage;
            announcementMessageInput.value = s.announcementMessage || translations['pt'].defaultAnnounceMessage;
            twitchClosedMessageInput.value = s.twitchClosedMessage || translations['pt'].defaultTwitchClosedMessage;
            enableKickBotCheckbox.checked = s.enableKickBot || false; kickletApiTokenInput.value = s.kickletApiToken || '';
            kickStartMessageInput.value = s.kickStartMessage || translations['pt'].defaultKickStartMessage;
            kickAnnounceMessageInput.value = s.kickAnnounceMessage || translations['pt'].defaultKickAnnounceMessage;
            kickClosedMessageInput.value = s.kickClosedMessage || translations['pt'].defaultKickClosedMessage;
            enableAwardsOverlayCheckbox.checked = s.enableAwardsOverlay || false; awardsDvInput.value = s.awardsDv || '';
            awardsApiKeyInput.value = s.awardsApiKey || ''; awardAnnounceMessageInput.value = s.awardAnnounceMessage || translations['pt'].defaultAwardAnnounceMessage;
            if(enableFloatingPanelCheckbox) enableFloatingPanelCheckbox.checked = s.enableFloatingPanel || false;
            if(s.visual) {
                const root = document.documentElement;
                if(s.visual.appMaxWidth) root.style.setProperty('--app-max-width', s.visual.appMaxWidth);
                root.style.setProperty('--stage-flex', s.visual.stageFlex);
                if(s.visual.sideFlex) root.style.setProperty('--side-flex', s.visual.sideFlex);
                if(s.visual.winnerNameSize) root.style.setProperty('--winner-name-size', s.visual.winnerNameSize);
                if(s.visual.winnerNameColor) root.style.setProperty('--winner-name-color', s.visual.winnerNameColor);
                if(s.visual.timerSize) root.style.setProperty('--timer-size', s.visual.timerSize);
                if(s.visual.timerColor) root.style.setProperty('--timer-color', s.visual.timerColor);
                if(s.visual.subBg) root.style.setProperty('--sub-bg', s.visual.subBg);
                if(s.visual.subText) root.style.setProperty('--sub-text', s.visual.subText);
                if(s.visual.vipBg) root.style.setProperty('--vip-bg', s.visual.vipBg);
                if(s.visual.vipText) root.style.setProperty('--vip-text', s.visual.vipText);
                root.style.setProperty('--primary-color', s.visual.primaryColor);
                if(s.visual.cardTagColor) root.style.setProperty('--card-tag-color', s.visual.cardTagColor);
                if(s.visual.scrollbarColor) root.style.setProperty('--scrollbar-color', s.visual.scrollbarColor);
                root.style.setProperty('--stage-bg', s.visual.stageBg);
                root.style.setProperty('--panel-bg-color', s.visual.appBg);
                if(s.visual.pauseBtnBg) root.style.setProperty('--pause-btn-bg', s.visual.pauseBtnBg);
                if(s.visual.resetBtnBg) root.style.setProperty('--reset-btn-bg', s.visual.resetBtnBg);
                if(s.visual.listHeaderColor) root.style.setProperty('--list-header-color', s.visual.listHeaderColor);
                if(s.visual.listHeaderSize) root.style.setProperty('--list-header-size', s.visual.listHeaderSize);
                if(s.visual.listContentColor) root.style.setProperty('--list-content-color', s.visual.listContentColor);
                if(s.visual.listContentSize) root.style.setProperty('--list-content-size', s.visual.listContentSize);
                
                if(appWidthSlider) appWidthSlider.value = parseFloat(s.visual.appMaxWidth) || 1520;
                stageWidthSlider.value = s.visual.stageFlex;
                if(sideWidthSlider) sideWidthSlider.value = s.visual.sideFlex || 1;
                if(winnerFontSizeSlider) winnerFontSizeSlider.value = parseFloat(s.visual.winnerNameSize) || 3.5;
                if(winnerNameColorPicker) winnerNameColorPicker.value = s.visual.winnerNameColor || '#53fc18';
                if(timerFontSizeSlider) timerFontSizeSlider.value = parseFloat(s.visual.timerSize) || 5;
                if(timerColorPicker) timerColorPicker.value = s.visual.timerColor || '#ffffff';
                if(subBgPicker) subBgPicker.value = s.visual.subBg || '#53fc18';
                if(subTextPicker) subTextPicker.value = s.visual.subText || '#000000';
                if(vipBgPicker) vipBgPicker.value = s.visual.vipBg || '#ae70ff';
                if(vipTextPicker) vipTextPicker.value = s.visual.vipText || '#000000';
                primaryColorPicker.value = s.visual.primaryColor;
                if(cardTagPicker) cardTagPicker.value = s.visual.cardTagColor || '#ffd100';
                if(scrollbarPicker) scrollbarPicker.value = s.visual.scrollbarColor || '#53fc18';
                stageBgPicker.value = s.visual.stageBg;
                appBgPicker.value = s.visual.appBg;
                if(pauseBtnPicker) pauseBtnPicker.value = s.visual.pauseBtnBg || '#f39c12';
                if(resetBtnPicker) resetBtnPicker.value = s.visual.resetBtnBg || '#e9113c';
                if(listTitleColorPicker) listTitleColorPicker.value = s.visual.listHeaderColor || '#f0f1f1';
                if(listTitleSizeSlider) listTitleSizeSlider.value = parseFloat(s.visual.listHeaderSize) || 1.1;
                if(listContentColorPicker) listContentColorPicker.value = s.visual.listContentColor || '#f0f1f1';
                if(listContentSizeSlider) listContentSizeSlider.value = parseFloat(s.visual.listContentSize) || 0.95;
            }
            if(s.enableAwardsOverlay) startAwardsMonitor();
        } else {
            startMessageInput.value = translations['pt'].defaultStartMessage;
        }
    }
    function init() {
        setLanguage('pt'); loadSettings(); setupTabs(); setupVisualControls(); setupFloatingPanel();
        openSettingsBtn.onclick = () => toggleSettings(true); closeSettingsBtn.onclick = () => toggleSettings(false);
        changeChannelBtn.onclick = () => { fullReset(); toggleSettings(false); showScreen('login'); };
        connectButton.onclick = handleConnect; startGiveawayButton.onclick = handleStartGiveaway;
        drawButton.onclick = drawWinner; pauseGiveawayButton.onclick = handlePauseGiveaway;
        resetButton.onclick = fullReset; saveSettingsButton.onclick = () => { saveSettings(); showAlert('alertSettingsSaved'); toggleSettings(false); };
        twitchUseAnnouncementCheckbox.onclick = (e) => { if(e.target.checked) alert(translations['pt'].announcementScopeWarning); };
        enableAwardsOverlayCheckbox.onchange = (e) => { if(e.target.checked) startAwardsMonitor(); else if(awardsApiTimer) clearInterval(awardsApiTimer); };
        document.querySelectorAll('.tooltip-trigger').forEach(b => {
            b.onclick = (e) => {
                e.stopPropagation(); tooltipPopup.innerHTML = translations['pt'][b.dataset.tooltipKey];
                const r = b.getBoundingClientRect(); tooltipPopup.style.top = (r.top + window.scrollY + 20) + 'px';
                tooltipPopup.style.left = r.left + 'px'; tooltipPopup.style.opacity = 1; tooltipPopup.style.visibility = 'visible';
            }
        });
        document.onclick = (e) => { if(!e.target.closest('.tooltip-trigger')) { tooltipPopup.style.opacity=0; tooltipPopup.style.visibility='hidden'; } };
    }
    init();
});