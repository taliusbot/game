const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let playerX = canvasWidth / 2 - 15;
let playerY = canvasHeight - 60;
let score = 0;

const tree = [
    { x: canvasWidth / 2 - 15, y: 0, side: 'left' },
    { x: canvasWidth / 2 - 15, y: 50, side: 'right' },
    { x: canvasWidth / 2 - 15, y: 100, side: 'left' },
];

function drawPlayer() {
    ctx.fillStyle = 'green';
    ctx.fillRect(playerX, playerY, 30, 50);
}

function drawTree() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(canvasWidth / 2 - 10, 0, 20, canvasHeight);
    
    ctx.fillStyle = 'darkgreen';
    tree.forEach(branch => {
        if (branch.side === 'left') {
            ctx.fillRect(branch.x - 30, branch.y, 30, 20);
        } else {
            ctx.fillRect(branch.x + 20, branch.y, 30, 20);
        }
    });
}

function moveBranches() {
    for (let i = tree.length - 1; i >= 0; i--) {
        tree[i].y += 5;
        if (tree[i].y > canvasHeight) {
            tree.pop();
            const side = Math.random() > 0.5 ? 'left' : 'right';
            tree.unshift({ x: canvasWidth / 2 - 15, y: 0, side });
        }
    }
}

function checkCollision() {
    if (tree[tree.length - 1].y + 20 > playerY &&
        ((tree[tree.length - 1].side === 'left' && playerX < canvasWidth / 2 - 15) ||
        (tree[tree.length - 1].side === 'right' && playerX > canvasWidth / 2 - 15))) {
        alert('Game Over! Score: ' + score);
        document.location.reload();
    }
}

function updateGame() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawTree();
    drawPlayer();
    moveBranches();
    checkCollision();
    score++;
    requestAnimationFrame(updateGame);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        playerX = canvasWidth / 2 - 45;
    } else if (e.key === 'ArrowRight') {
        playerX = canvasWidth / 2 + 15;
    }
});

updateGame();
