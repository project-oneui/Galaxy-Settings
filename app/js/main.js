const fs = require('fs')
const path = require('path');
const os = require('os');

const folderPath = path.join(os.homedir(), 'AppData', 'Local', 'Samsung-Widgets');

var packageJson = require('../../package.json');

function openSubMenu(menuID) {
    const subMenu = document.querySelector('subMenu');

    subMenu.style.opacity = '0';

    setTimeout(() => {
        const menuPath = path.join(__dirname, '..', 'settings', menuID);
        const menuData = fs.readFileSync(menuPath + "\\main.html", 'utf8');

        const scriptPath = menuPath + '\\script.js';

        if (fs.existsSync(scriptPath) && !scriptPath.includes('main.js')) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = scriptPath;

            document.head.appendChild(script);
        }

        if (fs.existsSync(menuPath + "\\styles.css")) {
            var styleSheet = document.createElement("style")
            styleSheet.innerText = fs.readFileSync(menuPath + "\\styles.css")
            document.head.appendChild(styleSheet)
        }

        subMenu.innerHTML = menuData;

        subMenu.style.opacity = '1';
    }, 200);
}

function deleteScript(scriptSource) {
    const scriptPath = path.join(__dirname, '..', 'settings', scriptSource, 'script.js');

    var scriptTags = document.head.querySelectorAll('script');

    scriptTags.forEach(function (scriptTag) {
        var src = scriptTag.getAttribute('src');

        if (src === scriptPath) {
            scriptTag.parentNode.removeChild(scriptTag);
        }
    });
}

function openModal() {
    const backdrop = document.getElementById('backdrop');
    const infoModal = document.getElementById('info-modal');
    if (infoModal.style.opacity == "0" && backdrop.style.opacity == "0") {
        disableScrolling()
        infoModal.style.opacity = "1";
        backdrop.style.opacity = "1";
        backdrop.style.zIndex = "4";
        infoModal.style.zIndex = "5";
    } else {
        enableScrolling()
        infoModal.style.opacity = "0";
        backdrop.style.opacity = "0";
        setTimeout(() => {
            backdrop.style.zIndex = "-3";
            infoModal.style.zIndex = "-3";
        }, 200);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('version').innerHTML = `Version ${packageJson.version}`
    openSubMenu('samsung-widgets')
    const backdrop = document.getElementById('backdrop');
    const infoModal = document.getElementById('info-modal');

    backdrop.style.opacity = "0";
    infoModal.style.opacity = "0";
});



function disableScrolling() {
    window.scrollTo(0,0)
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () { window.scrollTo(x, y); };
}

function enableScrolling() {
    window.onscroll = function () { };
}
