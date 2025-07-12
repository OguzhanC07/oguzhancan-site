let isInitialLoad = true;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const infoPanel = document.getElementById('infoPanel');
const panelTitle = document.getElementById('panelTitle');
const panelContent = document.getElementById('panelContent');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Virtual control buttons
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const jumpBtn = document.getElementById('jumpBtn');

// Game state
let gameState = {
    mario: {
        x: 100,
        y: 0,
        width: 60,
        height: 60,
        isJumping: false,
        jumpHeight: 0,
        maxJumpHeight: 80,
        worldX: 100, // Mario's position in the world
        panelAutoHideTimer: null
    },
    camera: {
        x: 0,
        y: 0
    },
    world: {
        width: 3000 // Total world width
    },
    currentSection: 0,
    blocks: [],
    coins: [],
    clouds: [],
    pipes: [],
    monsters: []
};

// Content sections that trigger based on Mario's position
const contentSections = [
    {
        position: 0,
        title: "Welcome!",
        content: `<p>Hello! I'm <strong>Oguzhan Can</strong>, a passionate developer ready to take on new challenges!</p>
                         <p>Move Mario to the right to start exploring my professional journey!</p>`
    },
    {
        position: 400,
        title: "👨‍💻 About Me",
        content: `<p><strong>Location:</strong> Mushroom Kingdom (Remote)</p>
                         <p><strong>Email:</strong><a href="mailto:hello@oguzhancan.com">hello@oguzhancan.com</a></p>
                         <p><strong>Experience:</strong> 4+ years in web development</p>
                         <p>I'm a passionate developer who loves creating interactive experiences and solving complex problems. Just like Mario collects coins, I collect new skills and technologies!</p>`
    },
    {
        position: 800,
        title: "🛠️ Skills & Technologies",
        content: `<h3>Microsoft</h3>
                        <div>
                            <span class="skill-tag">Microsoft Dynamics365 CRM</span>
                            <span class="skill-tag">Power Apps</span>
                            <span class="skill-tag">Power Platform</span>
                            <span class="skill-tag">Power Pages</span>
                            <span class="skill-tag">Power Automate</span>
                        </div>
                        <h3>Frontend</h3>
                         <div>
                            <span class="skill-tag">JavaScript</span>
                            <span class="skill-tag">CSS3</span>
                            <span class="skill-tag">HTML5</span>
                            <span class="skill-tag">Canvas</span>
                            </div>
                        <h3>Backend</h3>
                         <div>
                             <span class="skill-tag">MS SQL</span>
                             <span class="skill-tag">.Net</span>
                             <span class="skill-tag">PostgreSQL</span>
                         </div>
                         <h3>Tools & Others</h3>
                         <div>
                             <span class="skill-tag">Git</span>
                             <span class="skill-tag">JMeter</span>
                             <span class="skill-tag">CI/CD</span>
                             <span class="skill-tag">Selenium</span>
                             <span class="skill-tag">Docker</span>
                         </div>`
    },
    {
        position: 1200,
        title: "🚀 Featured Projects",
        content: `<div class="project-item">
                             <h3>🌟 Job 1</h3>
                             <p><strong>Tech:</strong> Ms Dynamics, .Net, MSSQL</p>
                             <p>Description 1</p>
                         </div>
                         <div class="project-item">
                             <h3>🎮 Job 2</h3>
                             <p><strong>Tech:</strong> JavaScript, Canvas, WebGL</p>
                             <p> Job2 description.</p>
                         </div>`
    },
    {
        position: 1600,
        title: "💼 Work Experience",
        content: `<div class="project-item">
                             <h3> Microsoft Dynamics Crm Developer</h3>
                             <p><strong>Omerd Business Solutions.(2022 - Present)</strong></p>
                             <p>Lead development of scalable applications, mentor junior developers, implement modern practices.</p>
                         </div>
                         <div class="project-item">
                             <h3>Junior Software Test Engineer</h3>
                             <p><strong>FileOrbis (2021 - 2022)</strong></p>
                             <p>I developed over 2,000 automated UI tests for the FileOrbis system using the .NET framework, also created load tests for fileorbis system.</p>
                         </div>`
    },
    {
        position: 2000,
        title: "🌟 Recent Projects",
        content: `<div class="project-item">
                             <h3> Recent project 1</h3>
                             <p><strong>Tech:</strong> Python, OpenAI API, Flask</p>
                             <p>Recent project 1 description</p>
                         </div>
                         <div class="project-item">
                             <h3> Recent project 2</h3>
                             <p><strong>Tech:</strong> React Native, Firebase</p>
                             <p> Recent project 2 description</p>
                         </div>`
    },
    {
        position: 2400,
        title: "📝 Blog & Writing",
        content: `<p><strong>Coming Soon!</strong> 🚧</p>
                         <p>I'm preparing awesome content about:</p>
                         <ul style="margin: 10px 0; padding-left: 20px;">
                             <li>Blog post 1</li>
                             <li>Blog Post 2</li>
                         </ul>`
    },
    {
        position: 2800,
        title: "🎯 Let's Connect!",
        content: `<p><strong>Ready to work together?</strong></p>
                         <p>I'm always excited to take on new challenges and collaborate on innovative projects!</p>
                         <p><strong>Contact:</strong><a href="mailto:hello@oguzhancan.com">hello@oguzhancan.com</a></p>
                         <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/oguzhan-can/"> /in/oguzhan-can/</a></p>
                         <p><strong>GitHub:</strong> <a href="https://github.com/OguzhanC07"> /OguzhanC07</a> </p>
                         <p>Thanks for exploring my journey! 🎮✨</p>`
    }
];

// Initialize canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Recalculate positions based on new canvas size
    initializeGameObjects();
}

function initializeGameObjects() {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const groundHeight = 100;

    // Reset ground Y position
    gameState.mario.y = canvasHeight - groundHeight - gameState.mario.height;

    // Create world objects across the wider world
    gameState.blocks = [];
    gameState.coins = [];
    gameState.clouds = [];
    gameState.pipes = [];
    gameState.monsters = [];

    // Distribute blocks across the world
    for (let i = 0; i < 8; i++) {
        gameState.blocks.push({
            x: 300 + (i * 350),
            y: canvasHeight - groundHeight - (150 + Math.random() * 100),
            width: 80,
            height: 80,
            type: 'info'
        });
    }

    // Distribute coins across the world
    for (let i = 0; i < 15; i++) {
        gameState.coins.push({
            x: 200 + (i * 180),
            y: canvasHeight - groundHeight - (200 + Math.random() * 150),
            width: 30,
            height: 30,
            rotation: 0,
            collected: false
        });
    }

    // Create clouds across the world
    for (let i = 0; i < 12; i++) {
        gameState.clouds.push({
            x: 100 + (i * 250),
            y: 60 + Math.random() * 100,
            width: 100 + Math.random() * 50,
            height: 60 + Math.random() * 20,
            floatOffset: Math.random() * Math.PI * 2
        });
    }

    // Create pipes with monsters
    const pipePositions = [600, 1000, 1400, 1800, 2200, 2600];
    pipePositions.forEach((pos, index) => {
        gameState.pipes.push({
            x: pos,
            y: canvasHeight - groundHeight - 120,
            width: 60,
            height: 120
        });

        // Add monster near each pipe
        gameState.monsters.push({
            x: pos + 80,
            y: canvasHeight - groundHeight - 50,
            width: 40,
            height: 50,
            direction: 1,
            speed: 1,
            originalX: pos + 80,
            patrolRange: 100,
            animationOffset: index * 0.5
        });
    });
}

// Drawing functions
function drawGround() {
    const groundHeight = 100;
    const groundY = canvas.height - groundHeight;

    // Ground gradient
    const gradient = ctx.createLinearGradient(0, groundY, 0, canvas.height);
    gradient.addColorStop(0, '#4CAF50');
    gradient.addColorStop(1, '#45a049');

    ctx.fillStyle = gradient;
    ctx.fillRect(-gameState.camera.x, groundY, gameState.world.width, groundHeight);

    // Ground texture
    ctx.fillStyle = '#45a049';
    for (let x = -gameState.camera.x; x < gameState.world.width; x += 40) {
        for (let y = groundY; y < canvas.height; y += 40) {
            ctx.beginPath();
            ctx.arc(x + 20, y + 20, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function drawMario() {
    const mario = gameState.mario;
    const x = mario.x;
    const y = mario.y - mario.jumpHeight;

    // Mario body (red)
    ctx.fillStyle = '#FF6B6B';
    ctx.beginPath();
    ctx.ellipse(x + 30, y + 20, 30, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mario hat (brown)
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.ellipse(x + 30, y + 15, 20, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mario face (peach)
    ctx.fillStyle = '#FFE4B5';
    ctx.beginPath();
    ctx.arc(x + 30, y + 25, 10, 0, Math.PI * 2);
    ctx.fill();

    // Mario overalls (blue)
    ctx.fillStyle = '#4169E1';
    ctx.fillRect(x + 20, y + 35, 20, 25);

    // Mario legs (brown)
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x + 15, y + 50, 8, 10);
    ctx.fillRect(x + 37, y + 50, 8, 10);
}

function drawBlocks() {
    gameState.blocks.forEach(block => {
        const x = block.x - gameState.camera.x;
        if (x > -100 && x < canvas.width + 100) {
            // Block shadow
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.fillRect(x + 5, block.y + 5, block.width, block.height);

            // Block main
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(x, block.y, block.width, block.height);

            // Block border
            ctx.strokeStyle = '#FFA500';
            ctx.lineWidth = 4;
            ctx.strokeRect(x, block.y, block.width, block.height);

            // Block text
            ctx.fillStyle = '#8B4513';
            ctx.font = 'bold 24px Courier New';
            ctx.textAlign = 'center';
            ctx.fillText('?', x + block.width / 2, block.y + block.height / 2 + 8);
        }
    });
}

function drawCoins() {
    gameState.coins.forEach(coin => {
        if (!coin.collected) {
            const x = coin.x - gameState.camera.x;
            if (x > -50 && x < canvas.width + 50) {
                coin.rotation += 0.1;

                ctx.save();
                ctx.translate(x + coin.width / 2, coin.y + coin.height / 2);
                ctx.rotate(coin.rotation);

                // Coin main
                ctx.fillStyle = '#FFD700';
                ctx.beginPath();
                ctx.ellipse(0, 0, coin.width / 2, coin.height / 2, 0, 0, Math.PI * 2);
                ctx.fill();

                // Coin border
                ctx.strokeStyle = '#FFA500';
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.restore();
            }
        }
    });
}

function drawClouds() {
    gameState.clouds.forEach(cloud => {
        const x = cloud.x - gameState.camera.x;
        if (x > -200 && x < canvas.width + 200) {
            cloud.floatOffset += 0.02;
            const floatY = cloud.y + Math.sin(cloud.floatOffset) * 10;

            ctx.fillStyle = 'white';
            ctx.shadowColor = 'rgba(0,0,0,0.1)';
            ctx.shadowBlur = 5;

            // Cloud main body
            ctx.beginPath();
            ctx.arc(x + cloud.width / 2, floatY + cloud.height / 2, cloud.width / 3, 0, Math.PI * 2);
            ctx.fill();

            // Cloud puffs
            ctx.beginPath();
            ctx.arc(x + cloud.width / 4, floatY + cloud.height / 2, cloud.width / 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x + (cloud.width * 3) / 4, floatY + cloud.height / 2, cloud.width / 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowBlur = 0;
        }
    });
}

function drawPipes() {
    gameState.pipes.forEach(pipe => {
        const x = pipe.x - gameState.camera.x;
        if (x > -100 && x < canvas.width + 100) {
            // Pipe shadow
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.fillRect(x + 5, pipe.y + 5, pipe.width, pipe.height);

            // Pipe main
            ctx.fillStyle = '#4CAF50';
            ctx.fillRect(x, pipe.y, pipe.width, pipe.height);

            // Pipe border
            ctx.strokeStyle = '#45a049';
            ctx.lineWidth = 3;
            ctx.strokeRect(x, pipe.y, pipe.width, pipe.height);

            // Pipe top
            ctx.fillStyle = '#4CAF50';
            ctx.fillRect(x - 5, pipe.y - 10, pipe.width + 10, 20);
            ctx.strokeRect(x - 5, pipe.y - 10, pipe.width + 10, 20);
        }
    });
}

function drawMonsters() {
    gameState.monsters.forEach(monster => {
        // Update monster position
        monster.x += monster.direction * monster.speed;

        // Check patrol boundaries
        if (monster.x <= monster.originalX - monster.patrolRange ||
            monster.x >= monster.originalX + monster.patrolRange) {
            monster.direction *= -1;
        }

        const x = monster.x - gameState.camera.x;
        if (x > -100 && x < canvas.width + 100) {
            monster.animationOffset += 0.1;

            // Monster body (dark red)
            ctx.fillStyle = '#8B0000';
            ctx.beginPath();
            ctx.ellipse(x + monster.width / 2, monster.y + monster.height / 2,
                monster.width / 2, monster.height / 2, 0, 0, Math.PI * 2);
            ctx.fill();

            // Monster spikes
            ctx.fillStyle = '#FF0000';
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(x + 10 + i * 10, monster.y);
                ctx.lineTo(x + 15 + i * 10, monster.y - 8);
                ctx.lineTo(x + 20 + i * 10, monster.y);
                ctx.closePath();
                ctx.fill();
            }

            // Monster eyes
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(x + 12, monster.y + 15, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 28, monster.y + 15, 4, 0, Math.PI * 2);
            ctx.fill();

            // Monster pupils
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(x + 12 + Math.sin(monster.animationOffset) * 2, monster.y + 15, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 28 + Math.sin(monster.animationOffset) * 2, monster.y + 15, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

function drawSky() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateCamera() {
    // Keep Mario centered, but don't go past world boundaries
    gameState.camera.x = Math.max(0, Math.min(
        gameState.world.width - canvas.width,
        gameState.mario.worldX - canvas.width / 2
    ));
}

function updateContent() {
    // Find current section based on Mario's world position
    let currentSection = 0;
    for (let i = contentSections.length - 1; i >= 0; i--) {
        if (gameState.mario.worldX >= contentSections[i].position) {
            currentSection = i;
            break;
        }
    }

    // Update content if section changed
    if (currentSection !== gameState.currentSection || isInitialLoad === true) {
        gameState.currentSection = currentSection;
        panelTitle.innerHTML = contentSections[currentSection].title;
        panelContent.innerHTML = contentSections[currentSection].content;

        // Show panel
        infoPanel.classList.add('active');

        // Clear existing timer
        if (gameState.panelAutoHideTimer) {
            clearTimeout(gameState.panelAutoHideTimer);
        }

        // Hide panel after 5 seconds
        gameState.panelAutoHideTimer = setTimeout(() => {
            infoPanel.classList.remove('active');
        }, 5000);
        // // Hide panel after 5 seconds
        // setTimeout(() => {
        //     infoPanel.classList.remove('active');
        // }, 5000);
    }

    // Update progress bar
    const progress = (gameState.mario.worldX / gameState.world.width) * 100;
    progressFill.style.width = progress + '%';

    if (progress < 10) progressText.textContent = 'Start Journey';
    else if (progress < 30) progressText.textContent = 'Getting Started';
    else if (progress < 50) progressText.textContent = 'Learning More';
    else if (progress < 70) progressText.textContent = 'Exploring Projects';
    else if (progress < 90) progressText.textContent = 'Almost Done';
    else progressText.textContent = 'Journey Complete!';
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update camera
    updateCamera();

    // Update content
    updateContent();

    // Draw everything
    drawSky();
    drawClouds();
    drawGround();
    drawPipes();
    //drawBlocks();
    drawCoins();
    drawMonsters();
    drawMario();

    // Handle jumping
    if (gameState.mario.isJumping) {
        gameState.mario.jumpHeight += 8;
        if (gameState.mario.jumpHeight >= gameState.mario.maxJumpHeight) {
            gameState.mario.isJumping = false;
        }
    } else if (gameState.mario.jumpHeight > 0) {
        gameState.mario.jumpHeight -= 8;
        if (gameState.mario.jumpHeight <= 0) {
            gameState.mario.jumpHeight = 0;
        }
    }

    if (isInitialLoad === true) {
        isInitialLoad = false;
    }
    requestAnimationFrame(gameLoop);
}

// Event handlers
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        gameState.mario.worldX = Math.max(0, gameState.mario.worldX - 40);
        gameState.mario.x = Math.max(50, gameState.mario.x - 40);
    } else if (e.key === 'ArrowRight') {
        gameState.mario.worldX = Math.min(gameState.world.width - gameState.mario.width, gameState.mario.worldX + 40);
        gameState.mario.x = Math.min(canvas.width - gameState.mario.width - 50, gameState.mario.x + 40);
    } else if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        jump();
    }
});

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check coin clicks
    gameState.coins.forEach(coin => {
        const coinScreenX = coin.x - gameState.camera.x;
        if (!coin.collected && x >= coinScreenX && x <= coinScreenX + coin.width &&
            y >= coin.y && y <= coin.y + coin.height) {
            coin.collected = true;
        }
    });

    // Move Mario to clicked position
    const targetWorldX = x + gameState.camera.x;
    const targetScreenX = x;

    gameState.mario.worldX = Math.max(0, Math.min(gameState.world.width - gameState.mario.width, targetWorldX));
    gameState.mario.x = Math.max(50, Math.min(canvas.width - gameState.mario.width - 50, targetScreenX));
});

leftBtn.addEventListener('click', () => {
    gameState.mario.worldX = Math.max(0, gameState.mario.worldX - 40);
    gameState.mario.x = Math.max(50, gameState.mario.x - 40);
});

rightBtn.addEventListener('click', () => {
    gameState.mario.worldX = Math.min(gameState.world.width - gameState.mario.width, gameState.mario.worldX + 40);
    gameState.mario.x = Math.min(canvas.width - gameState.mario.width - 50, gameState.mario.x + 40);
});

jumpBtn.addEventListener('click', () => {
    jump();
});

// Info panel click to reopen
infoPanel.addEventListener('click', (e) => {
    e.stopPropagation();
    infoPanel.classList.add('active');

    // Clear existing timer
    if (gameState.panelAutoHideTimer) {
        clearTimeout(gameState.panelAutoHideTimer);
    }

    // Set new timer
    gameState.panelAutoHideTimer = setTimeout(() => {
        infoPanel.classList.remove('active');
    }, 5000);
});

function jump() {
    if (!gameState.mario.isJumping && gameState.mario.jumpHeight === 0) {
        gameState.mario.isJumping = true;
    }
}

// Initialize
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
gameLoop();