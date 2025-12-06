function getTitleLabel() {
    const labels = [
        'Deobfuscated Edition',
        'Hamburgers!',
        'Flashless Version',
        'Shoutouts to Simpleflips',
        'Jim',
        'Jacksepticeye, please come back..',
        'Did you get the fat lady or the old man?',
        'Happy 12th of July! If it.. actually is 12th of July..'
    ];

    return labels[Math.floor(Math.random() * labels.length)];
}


function addScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
    return new Promise((resolve) => script.onload = resolve);
}

async function loadGame() {
    const parameters = new URLSearchParams(location.search);
    const getUrlParameter = (key) => parameters.get(key);

    window.HW_SETTINGS = {
        siteURL: './',
        corsProxy: localStorage.getItem("proxy") || 'https://corsproxy.io/?url=',
        pathPrefix: '',
        titleLabel: getTitleLabel(),
        titleLabelX: 645,
        titleLabelY: 250,
        titleLabelRotation: 0,
        titleLabelSize: 20,
        titleLabelColor: 0xfdfd65,
        resolutionZoomIncreaseRatio: 0.5,
        tesselation: 'tess2',
        replay_id: getUrlParameter('replay_id'),
        level_id: getUrlParameter('level_id')
    };


    await addScript(`./pixi.js`);
    await addScript(`./dependencies.js`);
    await addScript(`./happywheels.js`);
}

loadGame();

// Resize handling to maintain aspect ratio
function resizeGame() {
    const holder = document.getElementById('og-game-holder');
    if (!holder) return;
    const canvas = holder.querySelector('canvas');
    if (!canvas) {
        // Canvas not yet created; retry after a short delay
        setTimeout(resizeGame, 100);
        return;
    }
    const ORIGINAL_WIDTH = 1024; // assumed original game width
    const ORIGINAL_HEIGHT = 768; // assumed original game height
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scale = Math.min(w / ORIGINAL_WIDTH, h / ORIGINAL_HEIGHT);
    canvas.style.width = `${ORIGINAL_WIDTH * scale}px`;
    canvas.style.height = `${ORIGINAL_HEIGHT * scale}px`;
    // Ensure holder fills the window and centers content
    holder.style.display = 'flex';
    holder.style.alignItems = 'center';
    holder.style.justifyContent = 'center';
    holder.style.width = '100%';
    holder.style.height = '100%';
}
window.addEventListener('resize', resizeGame);
// Initial call
resizeGame();
