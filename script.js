function loadGame(game) {
    // Hide everything except nav
    document.querySelectorAll('body > *:not(.nav)').forEach(el => {
        el.style.display = 'none';
    });
    
    // Create back button
    let backButton = document.createElement('div');
    backButton.className = 'back-button';
    backButton.innerHTML = '<button onclick="location.reload()">Back to Games</button>';
    document.body.appendChild(backButton);
    
    if (game === 'celeste') {
        // Create options container for Celeste
        let optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        document.body.appendChild(optionsContainer);
        
        // Add title
        let title = document.createElement('h2');
        title.innerText = 'Select Celeste Version';
        optionsContainer.appendChild(title);
        
        // Create option cards
        let regularOption = document.createElement('div');
        regularOption.className = 'game-option';
        regularOption.innerHTML = `
            <h3>Regular Version</h3>
            <p>Original version of Celeste (Note: Chapter 6 has a known bug)</p>
            <button onclick="loadGameVersion('celeste', 'regular')">Play</button>
        `;
        optionsContainer.appendChild(regularOption);
        
        let modOption = document.createElement('div');
        modOption.className = 'game-option';
        modOption.innerHTML = `
            <h3>Modded Version (Bug Fixed)</h3>
            <p>Includes fixes for Chapter 6 bug and mod support</p>
            <button onclick="loadGameVersion('celeste', 'modded')">Play</button>
            <div class="download-note">Download required files: <a href="https://www.dropbox.com/scl/fo/l326q1deof3cs4lhne2f9/ADxfYp-agB7cihPbvi9fQ7A?rlkey=di5w3m6pzjrexav3vfkkqr603&st=62ae1kv8&dl=0" target="_blank">Dropbox Link</a></div>
        `;
        optionsContainer.appendChild(modOption);
    } else if (game === 'undertale') {
        // Create warning overlay for save files
        createSaveWarning('undertale');
    } else if (game === 'pizzatower') {
        // Create warning overlay for save files
        createSaveWarning('pizzatower');
    } else if (game === 'oneshot') {
        // Create fullscreen container immediately for OneShot
        let fullscreenContainer = document.createElement('div');
        fullscreenContainer.className = 'fullscreen-container';
        document.body.appendChild(fullscreenContainer);
        
        // Create back button
        let backButton = document.createElement('div');
        backButton.className = 'back-button';
        backButton.innerHTML = '<button onclick="location.reload()">Back to Games</button>';
        document.body.appendChild(backButton);
        
        // Create and append iframe for OneShot
        let embed = document.createElement('iframe');
        embed.src = "https://ynoproject.net/oneshot/";
        embed.className = 'fullscreen-game';
        embed.setAttribute('allowfullscreen', 'true');
        embed.setAttribute('allow', 'fullscreen');
        fullscreenContainer.appendChild(embed);
    } else if (game === 'terraria') {
        // Create overlay container
        let overlay = document.createElement('div');
        overlay.className = 'save-warning-overlay';
        document.body.appendChild(overlay);
        
        // Create warning box
        let warningBox = document.createElement('div');
        warningBox.className = 'save-warning-box';
        overlay.appendChild(warningBox);
        
        // Add warning title
        let title = document.createElement('h2');
        title.innerText = 'Terraria Required Files';
        warningBox.appendChild(title);
        
        // Add warning message
        let message = document.createElement('p');
        message.innerHTML = 'Before playing Terraria, you need to download the Content files:<br><br>' +
                          '<div style="text-align:center;margin:15px 0;">' +
                          '<a href="https://www.dropbox.com/scl/fi/obp7xq486memjtz4dmfns/Content.zip?rlkey=z3nqqf0vcn1eml4ten8qnmfeb&st=i1t5a0kb&dl=0" target="_blank" style="text-decoration:none;">' +
                          '<button class="Btn">' +
                          '<svg class="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>' +
                          '<span class="icon2"></span>' +
                          '<span class="tooltip">Download</span>' +
                          '</button>' +
                          '</a></div><br>' +
                          '2. Unzip the folder';
        warningBox.appendChild(message);
        
        // Store the current time when opening Terraria
        let lastOpenTime = new Date().getTime();
        
        // Add proceed button
        let proceedButton = document.createElement('button');
        proceedButton.innerText = 'Continue to Game';
        proceedButton.className = 'proceed-button';
        proceedButton.onclick = function() {
            // Store data for detecting return
            sessionStorage.setItem('terrariaOpened', 'true');
            sessionStorage.setItem('terrariaOpenTime', lastOpenTime);
            
            // Open Terraria in a new tab
            window.open('https://terraria-wasm.replit.app/', '_blank');
            
            // Remove the overlay
            overlay.remove();
            
            // Create notification that will appear when they return
            let notification = document.createElement('div');
            notification.className = 'game-notification';
            notification.innerHTML = 'Terraria has opened in a new tab.<br>' +
                                    'If the game didn\'t open, please check your popup blocker and try again.';
            document.body.appendChild(notification);
            
            // Remove notification after 5 seconds
            setTimeout(function() {
                notification.style.opacity = '0';
                setTimeout(function() {
                    notification.remove();
                }, 500);
            }, 5000);
        };
        warningBox.appendChild(proceedButton);
    }
}

function loadGameVersion(game, version) {
    // Remove options container
    document.querySelector('.options-container').remove();
    
    // Create fullscreen container
    let fullscreenContainer = document.createElement('div');
    fullscreenContainer.className = 'fullscreen-container';
    document.body.appendChild(fullscreenContainer);
    
    // Create and append iframe for the game
    let embed = document.createElement('iframe');
    
    if (game === 'celeste') {
        if (version === 'regular') {
            embed.src = "http://poynomialhelp.myftp.biz/";
        } else if (version === 'modded') {
            embed.src = "https://celeste.r58playz.dev/";
        }
    }
    
    embed.className = 'fullscreen-game';
    fullscreenContainer.appendChild(embed);
}

function navigate(page) {
    window.location.href = page;
}

function createSaveWarning(gameType) {
    // Create overlay container
    let overlay = document.createElement('div');
    overlay.className = 'save-warning-overlay';
    document.body.appendChild(overlay);
    
    // Create warning box
    let warningBox = document.createElement('div');
    warningBox.className = 'save-warning-box';
    overlay.appendChild(warningBox);
    
    // Add warning title
    let title = document.createElement('h2');
    title.innerText = 'Important: Save File Information';
    warningBox.appendChild(title);
    
    // Add warning message
    let message = document.createElement('p');
    message.innerHTML = 'Game saves are stored in your browser cache.<br><br>DO NOT clear your cache or restart your browser if you want to keep your progress.<br><br>We are working on implementing persistent save files.';
    warningBox.appendChild(message);
    
    // Add proceed button
    let proceedButton = document.createElement('button');
    proceedButton.innerText = 'Proceed';
    proceedButton.className = 'proceed-button';
    proceedButton.onclick = function() {
        // Remove the overlay
        overlay.remove();
        
        // Load the appropriate game
        loadGameAfterWarning(gameType);
    };
    warningBox.appendChild(proceedButton);
}

function loadGameAfterWarning(gameType) {
    // Create fullscreen container
    let fullscreenContainer = document.createElement('div');
    fullscreenContainer.className = 'fullscreen-container';
    document.body.appendChild(fullscreenContainer);
    
    // Create back button
    let backButton = document.createElement('div');
    backButton.className = 'back-button';
    backButton.innerHTML = '<button onclick="location.reload()">Back to Games</button>';
    document.body.appendChild(backButton);
    
    // Create and append iframe for the game
    let embed = document.createElement('iframe');
    
    if (gameType === 'undertale') {
        embed.src = "https://www.autistici.org/burnedprojects/UNDERTALE/";
    } else if (gameType === 'pizzatower') {
        embed.src = "https://www.autistici.org/burnedprojects/NoiseUpdate/";
    }
    
    embed.className = 'fullscreen-game';
    embed.setAttribute('allowfullscreen', 'true');
    embed.setAttribute('allow', 'fullscreen');
    fullscreenContainer.appendChild(embed);
}
