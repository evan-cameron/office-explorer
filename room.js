const player = document.getElementById('player');
const room = document.getElementById('room');
const computerDesk = document.getElementById('table-computer');
const menuState = document.getElementById('menu-state');
let menuMode = false;
let menuLevel = 0;
let currentPath = [];
let currentMenuItems = [];
let selectedItemIndex = -1;


// Set initial player position in front of computer desk
const playerStartX = computerDesk.offsetLeft + (computerDesk.offsetWidth / 2) - 10;
const playerStartY = computerDesk.offsetTop + computerDesk.offsetHeight + 30;
let playerX = playerStartX;
let playerY = playerStartY;

player.style.left = `${playerX}px`;
player.style.top = `${playerY}px`;

const speed = 2.8; // Reduced speed
const keys = {};

let currentSubItems = [];



const menuData = {
    fridge: {
        items: [
            { 
                name: "Film Stock",
                description: "Various 16mm film stocks for analog film projects",
                items: [
                    { name: "Kodak Vision3 500T", tag: "FILM-500T-01" },
                    { name: "Kodak Vision3 250D", tag: "FILM-250D-01" },
                    { name: "Kodak Double-X B&W", tag: "FILM-BW-01" }
                ]
            }
        ]
    },
    stands: {
        items: [
            { 
                name: "C-Stands",
                description: "Heavy duty C-stands with various grip heads",
                items: [
                    { name: "Matthews C-Stand Kit", tag: "CS-MTW-01" },
                    { name: "Avenger C-Stand", tag: "CS-AVG-02" }
                ]
            },
            { 
                name: "Light Stands",
                description: "Various light stands for lighting equipment",
                items: [
                    { name: "Matthews Baby Stand", tag: "LS-MTW-01" },
                    { name: "Impact Heavy Duty Stand", tag: "LS-IMP-01" }
                ]
            }
        ]
    },
    tripods: {
        items: [
            { 
                name: "Cinema Tripods",
                description: "Professional cinema tripods for heavy camera packages",
                items: [
                    { name: "O'Connor 2575D", tag: "TR-OC-01" },
                    { name: "Sachtler Video 20", tag: "TR-SC-01" }
                ]
            }
        ]
    },
    corner1: {
        items: [
            { 
                name: "Photography Tripods",
                description: "Lightweight tripods for photography and small video cameras",
                items: [
                    { name: "Manfrotto 055", tag: "TR-MF-01" },
                    { name: "Gitzo Series 3", tag: "TR-GZ-01" }
                ]
            },
            { 
                name: "Video Tripods",
                description: "Mid-weight video tripods with fluid heads",
                items: [
                    { name: "Manfrotto 504", tag: "TR-MF-02" },
                    { name: "Miller DS20", tag: "TR-ML-01" }
                ]
            }
        ]
    },
    right1: {
        items: [
            { name: "G95 Batteries" },
            { name: "NP Batteries" },
            { name: "E6 Batteries" },
            { name: "A6300 Batteries" },
            { name: "S5 / GH5 Batteries"},
            { name: "AA Batteries"} ,
            { name: "AAA Batteries"} ,
            { name: "USB C Cable"} ,
            { name: "USB Micro Cable"},
            { name: "handles"}, 
            { name: "magic arm accesories"},
            { name: "card readers"},
            { name: "external hard drives"},
            { name: "adapters"}
        ]
    },
    right2: {
        items: [
            { name: "Strike Tape" },
            { name: "Medical Tape" },
            { name: "16mm Film" },
            { name: "Digital Video" },
            { name: "Audio Casette"},
        ]
    },
    top3: {
        items: [
            { name: "Lumix G95 4/3 Mirrorless Camera"},
            { name: "Lumix G7 4/3 Mirrorless Camera" },
            { name: "Sony 630 Mirrorless Camera"},
            { name: "Lens Adapters"},
            { name: "Zoom Lenses"},
            { name: "Prime Lenses"},
            { name: "Video Mics"},
            { name: "Lav Mics"},
            { name: "On-Camera Lights"},
            { name: "GoPro"}, 
            { name: "Osmo Gimbals"} 
        ]
    },
    top2: {
        items: [
            { name: "Lumix S5 Full-Frame Mirrorless" },
            { name: "Sony 4k Documentary Camera"}, 
            { name: "Red Gemini" },
            { name: "Red Scarlet" },
            { name: "Red Komodo" },
            { name: "Audio Casette"},
            { name: "Shogun Flame Monitor"},
            { name: "LCD Monitor"},
        ]
    },
    proTripods: {
        items: [
            {name: "Manfrotto 514 head + 70 Miller Legs v1" },
            {name: "Manfrotto 514 head + 70 Miller Legs v2" },
            {name: "" },
            {name: "" },
        ]
    },
    top1: {
        items: [
            { name: "Bolexes" },
            { name: "16mm Film"},
            { name: "Gimbals" },
            { name: "V-Mount Batteries" },
            { name: "Drones" },
        ]
    },
    left1: {
        items: [
            { name: "Sony EX2 DV Camera" },
            { name: "Sony DV Camera"},
            { name: "Panasonic DV Camera"},
            { name: "Canon T2i dSLR" },
            { name: "Canon T3i dSLR" },
            { name: "Canon T5i dSLR" },
            { name: "Canon 60d dSLR" },
            { name: "Canon E8 Batteries"},
            { name: "Epson Projector" },
            { name: "Panasonic Projector" },
            { name: "Projector Screen"},
            { name: "Slider"},
        ]
    },
    bottom1: {
        items: [
            { name: "Deity Theos Radio Mics" },
            { name: "Deity Shotgun Mic Intro"},
            { name: "Deity Shotgun Mic Pro" },
            { name: "Sound Devices MixPre-6" },
            { name: "Sound Devices MixPre-10" },
            { name: "Senheiser ME66 Shotgun Mic" },
            { name: "Berhinger Cardior Mic" },
            { name: "Rode Cardiod Mic"},
            { name: "Sony Lav Mics (Wired)" },
            { name: "Sony Radio Lav Mic"}, 
            { name: "Sony Wireless Adapter"},
            { name: "Sure SM58 + Sure SM57" },
            { name: "XLR Cables"},
            { name: "Boom Poles"},
        ]
    },
    cornerbox: {
        items: [
            { name: "Lightweight Video Tripod" },
            { name: "Manfrotto 290 Video Tripod" },
            { name: "Manfrotto Compact Action Tripod" },
            { name: "Manfrotto 502 Tripod Kit" },
            { name: "Velbon Plastic Tripod" },
            { name: "Neewer Video Tripod" }
        ]
    },

  
};

function updateMenuState() {
    menuState.textContent = menuMode ? "Menu Mode" : "Room Mode";
    menuState.style.backgroundColor = menuMode ? "rgba(0, 100, 0, 0.8)" : "rgba(0, 0, 0, 0.8)";
}

function navigateMenu(direction) {
if (direction === 'forward') {
const currentItem = menuLevel === 0 ? 
    currentMenuItems[selectedItemIndex] : 
    currentMenuItems[selectedItemIndex]?.items?.[selectedItemIndex];

if (currentItem?.items && menuLevel < 2) {
    menuLevel++;
    currentPath.push(currentItem.name);
    
    if (menuLevel === 1) {
        currentSubItems = currentItem.items;
    }
    
    selectedItemIndex = 0;
    renderCurrentLevel();
}
} else if (direction === 'back') {
if (menuLevel > 0) {
    menuLevel--;
    currentPath.pop();
    selectedItemIndex = 0;
    renderCurrentLevel();
} else {
    toggleMenuMode();
}
}
}

function renderCurrentLevel() {
let html = '';

// Show breadcrumb navigation
if (currentPath.length > 0) {
html += `<div class="breadcrumb">${currentPath.join(" > ")}</div>`;
}

// Determine which items to display based on menu level
let itemsToDisplay = [];
if (menuLevel === 0) {
itemsToDisplay = currentMenuItems;
} else if (menuLevel === 1) {
itemsToDisplay = currentMenuItems[selectedItemIndex]?.items || [];
} else if (menuLevel === 2) {
// Display detailed view of selected item
const selectedItem = currentMenuItems[selectedItemIndex]?.items?.[selectedItemIndex];
if (selectedItem) {
    html += `
        <div class="equipment-details">
            <h2>${selectedItem.name}</h2>
            ${selectedItem.description ? `<p>${selectedItem.description}</p>` : ''}
            ${selectedItem.tag ? `<p>Equipment Tag: ${selectedItem.tag}</p>` : ''}
        </div>
    `;
}
}

// If not in detailed view, show list of items
if (menuLevel < 2) {
html += `
    <ul class="equipment-list">
        ${itemsToDisplay.map((item, index) => `
            <li class="${index === selectedItemIndex ? 'selected' : ''}" 
                data-index="${index}">
                ${item.name}
                ${item.items ? ' ▶' : ''}
            </li>
        `).join('')}
    </ul>
`;
}

document.getElementById('current-menu').innerHTML = html;
}


function updateInfoPanel(menuId, showItems = false) {
    if (!menuData[menuId]) return;
    
    const trigger = document.querySelector(`[data-menu="${menuId}"]`);
    const categoryName = trigger.getAttribute('data-category');
    document.querySelector('.category-name').textContent = categoryName;
    
    if (showItems) {
        currentMenuItems = menuData[menuId].items;
        renderCurrentLevel();
    }
}
    let html = '';
     // Show breadcrumb navigation
     if (currentPath.length > 0) {
        html += `<div class="breadcrumb">
            ${currentPath.join(" > ")}
        </div>`;
    }
     // If we're showing item details
     if (menuLevel === 2) {
        const item = currentMenuItems[selectedItemIndex];
        html += `
            <div class="equipment-details">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                ${item.specs ? `
                    <h3>Specifications:</h3>
                    <ul>
                        ${Object.entries(item.specs).map(([key, value]) => 
                            `<li>${key}: ${value}</li>`
                        ).join('')}
                    </ul>
                ` : ''}
                ${item.tag ? `<p>Equipment Tag: ${item.tag}</p>` : ''}
            </div>
        `;
    } else {
        // Show list of items
        html += `
            <ul class="equipment-list">
                ${currentMenuItems.map((item, index) => `
                    <li class="${index === selectedItemIndex ? 'selected' : ''}" 
                        data-index="${index}">
                        ${item.name}
                    </li>
                `).join('')}
            </ul>
        `;
    }
    
    document.getElementById('current-menu').innerHTML = html;


function toggleMenuMode(menuId) {
    menuMode = !menuMode;
    if (menuMode) {
        updateInfoPanel(menuId, true);
    } else {
        selectedItemIndex = -1;
        currentMenuItems = [];
        document.getElementById('current-menu').innerHTML = '';
    }
}

function toggleMenuMode(menuId) {
menuMode = !menuMode;
menuLevel = menuMode ? 0 : 0;
currentPath = [];
updateMenuState();

if (menuMode) {
updateInfoPanel(menuId, true);
selectedItemIndex = 0;
} else {
selectedItemIndex = -1;
currentMenuItems = [];
currentSubItems = [];
document.getElementById('current-menu').innerHTML = '';
}
}

function checkMenuInteraction() {
    if (menuMode) return;
    
    const menuTriggers = document.querySelectorAll('.menu-trigger');
    const playerRect = player.getBoundingClientRect();
    
    menuTriggers.forEach(trigger => {
        const rect = trigger.getBoundingClientRect();
        const distance = Math.hypot(
            (rect.left + rect.width/2) - (playerRect.left + playerRect.width/2),
            (rect.top + rect.height/2) - (playerRect.top + playerRect.height/2)
        );

        if (distance < 50) {
            const menuId = trigger.getAttribute('data-menu');
            toggleMenuMode(menuId);
        }
    });
}


document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    if (e.key === ' ') {
        checkMenuInteraction();
        e.preventDefault();
    }
    
    if (e.key === 'Escape' && menuMode) {
        toggleMenuMode();
    }
    
    if (menuMode) {
        if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') selectMenuItem('up');
        if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') selectMenuItem('down');
        e.preventDefault();
    }
});


document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function selectMenuItem(direction) {
    if (!menuMode || currentMenuItems.length === 0) return;
    
    const items = document.querySelectorAll('.equipment-list li');
    items[selectedItemIndex].classList.remove('selected');
    
    if (direction === 'up') selectedItemIndex = (selectedItemIndex - 1 + items.length) % items.length;
    if (direction === 'down') selectedItemIndex = (selectedItemIndex + 1) % items.length;
    
    items[selectedItemIndex].classList.add('selected');
    items[selectedItemIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function selectMenuItem(direction) {
if (!menuMode || currentMenuItems.length === 0) return;

const items = document.querySelectorAll('.equipment-list li');
if (items.length === 0) return;

// Remove current selection
if (selectedItemIndex >= 0 && selectedItemIndex < items.length) {
items[selectedItemIndex].classList.remove('selected');
}

// Update selection index
if (direction === 'up') {
selectedItemIndex = (selectedItemIndex - 1 + items.length) % items.length;
} else if (direction === 'down') {
selectedItemIndex = (selectedItemIndex + 1) % items.length;
}

// Apply new selection
items[selectedItemIndex].classList.add('selected');
items[selectedItemIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });

// If we're in a submenu, update the current item's details
if (menuLevel === 1) {
const selectedItem = currentMenuItems[selectedItemIndex];
if (selectedItem && selectedItem.items) {
    currentSubItems = selectedItem.items;
}
}
}   

// function update() {
//     if (!menuMode) {
//         if (keys['ArrowLeft'] || keys['a'] || keys['A']) playerX -= speed;
//         if (keys['ArrowRight'] || keys['d'] || keys['D']) playerX += speed;
//         if (keys['ArrowUp'] || keys['w'] || keys['W']) playerY -= speed;
//         if (keys['ArrowDown'] || keys['s'] || keys['S']) playerY += speed;

//         playerX = Math.max(0, Math.min(room.offsetWidth - player.offsetWidth, playerX));
//         playerY = Math.max(0, Math.min(room.offsetHeight - player.offsetHeight, playerY));

//         player.style.left = `${playerX}px`;
//         player.style.top = `${playerY}px`;

//         const menuTriggers = document.querySelectorAll('.menu-trigger');
//         let nearMenu = false;
        
//         menuTriggers.forEach(trigger => {
//             const rect = trigger.getBoundingClientRect();
//             const playerRect = player.getBoundingClientRect();
//             const distance = Math.hypot(
//                 (rect.left + rect.width/2) - (playerRect.left + playerRect.width/2),
//                 (rect.top + rect.height/2) - (playerRect.top + playerRect.height/2)
//             );

//             if (distance < 50) {
//                 nearMenu = true;
//                 const menuId = trigger.getAttribute('data-menu');
//                 updateInfoPanel(menuId);
//             }
//         });

//         if (!nearMenu) {
//             document.querySelector('.category-name').textContent = '';
//             document.getElementById('current-menu').innerHTML = '';
//         }
//     }

//     requestAnimationFrame(update);
// }

// Update player movement constraints to use window boundaries
function update() {
    if (!menuMode) {
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) playerX -= speed;
        if (keys['ArrowRight'] || keys['d'] || keys['D']) playerX += speed;
        if (keys['ArrowUp'] || keys['w'] || keys['W']) playerY -= speed;
        if (keys['ArrowDown'] || keys['s'] || keys['S']) playerY += speed;

        // Use window dimensions instead of room dimensions for boundaries
        const maxWidth = window.innerWidth - player.offsetWidth - 40; // Account for padding
        const maxHeight = window.innerHeight - player.offsetHeight - 40;

        playerX = Math.max(0, Math.min(maxWidth, playerX));
        playerY = Math.max(0, Math.min(maxHeight, playerY));

        player.style.left = `${playerX}px`;
        player.style.top = `${playerY}px`;

        const menuTriggers = document.querySelectorAll('.menu-trigger');
        let nearMenu = false;
        
        menuTriggers.forEach(trigger => {
            const rect = trigger.getBoundingClientRect();
            const playerRect = player.getBoundingClientRect();
            const distance = Math.hypot(
                (rect.left + rect.width/2) - (playerRect.left + playerRect.width/2),
                (rect.top + rect.height/2) - (playerRect.top + playerRect.height/2)
            );

            if (distance < 50) {
                nearMenu = true;
                const menuId = trigger.getAttribute('data-menu');
                updateInfoPanel(menuId);
            }
        });

        if (!nearMenu) {
            document.querySelector('.category-name').textContent = '';
            document.getElementById('current-menu').innerHTML = '';
        }
    }

    requestAnimationFrame(update);
}

// Add mouse event listeners to menu triggers
document.querySelectorAll('.menu-trigger').forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
        const menuId = trigger.getAttribute('data-menu');
        updateInfoPanel(menuId, true);
    });
});

// Modify the existing updateInfoPanel function to handle detailed item view
function updateInfoPanel(menuId, showItems = false) {
    if (!menuData[menuId]) return;
    
    const trigger = document.querySelector(`[data-menu="${menuId}"]`);
    const categoryName = trigger.getAttribute('data-category');
    document.querySelector('.category-name').textContent = categoryName;
    
    if (showItems) {
        let html = '';
        const items = menuData[menuId].items;
        
        html += `<ul class="equipment-list">`;
        items.forEach((item, index) => {
            html += `
                <li class="equipment-item" data-index="${index}">
                    <div class="item-header">
                        ${item.name}
                        ${item.items ? '<span class="expand-icon">▶</span>' : ''}
                    </div>
                    ${item.items ? `
                        <div class="item-details hidden">
                            <ul>
                                ${item.items.map((subItem, subIndex) => `
                                    <li class="sub-item" data-index="${subIndex}">
                                        <div class="sub-item-header">
                                            ${subItem.name}
                                        </div>
                                        <div class="sub-item-details hidden">
                                            ${subItem.description || ''}
                                            ${subItem.tag ? `<div>Tag: ${subItem.tag}</div>` : ''}
                                            <button class="add-item-btn" data-item='${JSON.stringify(subItem)}'>
                                                Add to Selection
                                            </button>
                                        </div>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </li>
            `;
        });
        html += '</ul>';
        
        document.getElementById('current-menu').innerHTML = html;

           // Add click handlers for expandable items
           document.querySelectorAll('.equipment-item').forEach(item => {
            item.querySelector('.item-header')?.addEventListener('click', () => {
                const details = item.querySelector('.item-details');
                if (details) {
                    details.classList.toggle('hidden');
                    const icon = item.querySelector('.expand-icon');
                    if (icon) {
                        icon.textContent = details.classList.contains('hidden') ? '▶' : '▼';
                    }
                }
            });
        });
        
        // Add click handlers for sub-items
        document.querySelectorAll('.sub-item-header').forEach(header => {
            header.addEventListener('click', () => {
                const details = header.nextElementSibling;
                if (details) {
                    details.classList.toggle('hidden');
                }
            });
        });
        
        // Add handlers for Add buttons
        document.querySelectorAll('.add-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemData = JSON.parse(e.target.dataset.item);
                addToRectangle(itemData);
            });
        });
    }
}


// add items to the rectangle
function addToRectangle(item) {
    const rectangle = document.getElementById('rectangle');
    const itemElement = document.createElement('div');
    itemElement.className = 'selected-item';
    itemElement.textContent = item.name;
    rectangle.appendChild(itemElement);
}



update();