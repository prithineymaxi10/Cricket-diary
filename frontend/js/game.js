/**
 * Cricket Doodle - A timing-based cricket mini-game.
 * Balls approach from the right in one of four styles (Fast, Swing, Spin,
 * Yorker) - press Space, tap the Swing button, or tap the canvas right as
 * the ball reaches the batsman to score runs. Swinging early or missing
 * the window is harmless (no ball, no penalty); only letting a ball go
 * all the way past without swinging costs a wicket. Miss three balls and
 * it's game over. Entirely self-contained, no backend required.
 */

const cricketGame = (() => {
    const STORAGE_BEST_KEY = 'cricketDiaryGameBestScore';
    const MAX_WICKETS = 3;
    const BALLS_PER_OVER = 6;

    const BOWLERS = ['J. Archer', 'J. Bumrah', 'M. Starc', 'S. Broad', 'R. Ashwin', 'A. Rashid'];

    const COMMENTARY = {
        six: ['That has sailed into the stands!', 'Enormous hit!', 'Out of the ground!', 'What a strike!'],
        four: ['Cracking shot, races to the fence!', 'Timed to perfection!', 'Beautifully placed!'],
        small: ['Good running between the wickets.', 'Nudged away for a single.', 'Worked it into the gap.'],
        missed: ['Beaten all ends up — bowled!', 'Missed it completely — clean bowled!', "Didn't pick the line — bowled!"]
    };

    // Generous, genuinely playable timing windows (in pixels from the
    // batsman) plus a distinct look and travel pattern per ball type.
    const BALL_TYPES = {
        fast: { label: 'FAST', color: '#B22222', speed: 2.8, perfect: 16, good: 30, ok: 46, trajectory: 'straight' },
        swing: { label: 'SWING', color: '#2d8659', speed: 2.3, perfect: 20, good: 36, ok: 54, trajectory: 'swing' },
        spin: { label: 'SPIN', color: '#D4A574', speed: 1.7, perfect: 22, good: 40, ok: 60, trajectory: 'spin' },
        yorker: { label: 'YORKER', color: '#5c1a1a', speed: 3.3, perfect: 13, good: 24, ok: 36, trajectory: 'straight' }
    };
    const BALL_WEIGHTS = [['fast', 0.4], ['swing', 0.28], ['spin', 0.24], ['yorker', 0.08]];

    let canvas, ctx;
    let animationId = null;
    let running = false;
    let initialized = false;

    let score = 0, wickets = 0, best = 0, fours = 0, sixes = 0;
    let ballsFaced = 0, oversBowled = 0, ballsThisOver = 0;
    let currentBowler = '';

    const GROUND_Y_RATIO = 0.78;
    const BATSMAN_X_RATIO = 0.16;

    let balls = [];
    let particles = [];
    let lastSpawn = 0;
    let spawnInterval = 1700; // ms, gradually decreases as the innings goes on
    let batSwingTimer = 0;
    let flashMessage = null;
    let flashColor = '#1B6B4F';
    let flashTimer = 0;
    let announceTimer = 0;
    let announceLabel = '';
    let announceColor = '#000';

    function init() {
        if (initialized) {
            draw();
            return;
        }
        initialized = true;

        canvas = document.getElementById('game-canvas');
        ctx = canvas.getContext('2d');

        best = parseInt(localStorage.getItem(STORAGE_BEST_KEY) || '0', 10);
        document.getElementById('game-best').textContent = best;

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && running) {
                e.preventDefault();
                swing();
            }
        });

        canvas.addEventListener('click', () => {
            if (running) swing();
        });

        drawIdleScreen();
    }

    function pickBallType() {
        const roll = Math.random();
        let cumulative = 0;
        for (const [type, weight] of BALL_WEIGHTS) {
            cumulative += weight;
            if (roll <= cumulative) return type;
        }
        return 'fast';
    }

    // ===== Game lifecycle =====

    function start() {
        if (!canvas) init();

        score = 0; wickets = 0; fours = 0; sixes = 0;
        ballsFaced = 0; oversBowled = 0; ballsThisOver = 0;
        currentBowler = BOWLERS[Math.floor(Math.random() * BOWLERS.length)];
        balls = [];
        particles = [];
        spawnInterval = 1700;
        lastSpawn = performance.now();
        flashMessage = null;
        running = true;

        updateHud();
        const commentaryEl = document.getElementById('game-commentary');
        if (commentaryEl) commentaryEl.textContent = `${currentBowler} is running in to bowl. Good luck!`;
        document.getElementById('game-start-btn').textContent = 'Restart';

        if (animationId) cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(loop);
    }

    function loop(timestamp) {
        if (!running) return;
        update(timestamp);
        if (!running) return; // the innings just ended mid-update; gameOver() already drew the final screen
        draw();
        animationId = requestAnimationFrame(loop);
    }

    function update(timestamp) {
        if (timestamp - lastSpawn > spawnInterval) {
            spawnBall();
            lastSpawn = timestamp;
            spawnInterval = Math.max(950, 1700 - ballsFaced * 18);
        }

        const batsmanX = canvas.width * BATSMAN_X_RATIO;
        const groundY = canvas.height * GROUND_Y_RATIO;

        balls.forEach(ball => {
            if (ball.resolved) return;

            ball.x -= ball.speed;

            const def = BALL_TYPES[ball.type];
            const progress = 1 - Math.max(0, Math.min(1, (ball.x - batsmanX) / ball.travelDistance));
            const baseY = groundY - 10;
            if (def.trajectory === 'swing') {
                ball.y = baseY - Math.sin(progress * Math.PI) * 9;
            } else if (def.trajectory === 'spin') {
                ball.y = baseY - Math.sin(Math.min(progress * 1.3, 1) * Math.PI) * 14;
            } else {
                ball.y = baseY;
            }

            // Ball has passed the batsman without being hit -> missed
            if (ball.x < batsmanX - def.ok) {
                ball.resolved = true;
                ball.missed = true;
                registerMiss();
            }
        });

        balls = balls.filter(ball => !ball.resolved || ball.flyingOff);

        balls.forEach(ball => {
            if (ball.flyingOff) {
                ball.x += ball.vx;
                ball.y += ball.vy;
                ball.vy += 0.25;
            }
        });
        balls = balls.filter(ball => ball.x < canvas.width + 60 && ball.y < canvas.height + 60);

        if (batSwingTimer > 0) batSwingTimer--;
        if (flashTimer > 0) {
            flashTimer--;
            if (flashTimer === 0) flashMessage = null;
        }
        if (announceTimer > 0) announceTimer--;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15;
            p.life--;
        });
        particles = particles.filter(p => p.life > 0);
    }

    function spawnBall() {
        const type = pickBallType();
        const def = BALL_TYPES[type];
        const groundY = canvas.height * GROUND_Y_RATIO;
        const batsmanX = canvas.width * BATSMAN_X_RATIO;
        const startX = canvas.width + 20;

        balls.push({
            type,
            x: startX,
            y: groundY - 10,
            speed: def.speed + Math.random() * 0.5,
            travelDistance: startX - batsmanX,
            resolved: false,
            missed: false,
            flyingOff: false,
            vx: 0,
            vy: 0
        });

        announceLabel = def.label;
        announceColor = def.color;
        announceTimer = 40;
    }

    function swing() {
        if (!running) return;

        batSwingTimer = 12;
        const batsmanX = canvas.width * BATSMAN_X_RATIO;

        // Find the closest unresolved ball within its own type's hit window
        let target = null;
        let bestDistance = Infinity;
        balls.forEach(b => {
            if (b.resolved) return;
            const def = BALL_TYPES[b.type];
            const distance = Math.abs(b.x - batsmanX);
            if (distance <= def.ok && distance < bestDistance) {
                target = b;
                bestDistance = distance;
            }
        });

        if (target) {
            const def = BALL_TYPES[target.type];
            target.resolved = true;
            target.flyingOff = true;

            let runs;
            if (bestDistance <= def.perfect) runs = 6;
            else if (bestDistance <= def.good) runs = 4;
            else runs = Math.random() > 0.5 ? 2 : 1;

            target.vx = 6 + runs * 1.3;
            target.vy = -4 - runs * 0.6;

            score += runs;
            if (runs === 6) sixes++;
            if (runs === 4) fours++;
            ballsFaced++;
            advanceOverCount();
            updateHud();

            const bucket = runs === 6 ? 'six' : runs === 4 ? 'four' : 'small';
            showFlash(runs === 6 ? 'SIX!' : runs === 4 ? 'FOUR!' : `+${runs}`, '#1B6B4F');
            showCommentary(bucket);
            spawnHitParticles(batsmanX, canvas.height * GROUND_Y_RATIO - 10);
        }
        // Swinging with no ball in range - whether too early or just an
        // air shot - is harmless. Only a fully missed delivery costs a
        // wicket, which keeps the timing forgiving and genuinely playable.
    }

    function registerMiss() {
        wickets++;
        ballsFaced++;
        advanceOverCount();
        updateHud();
        showFlash('MISSED!', '#b3261e');
        showCommentary('missed');

        if (wickets >= MAX_WICKETS) {
            gameOver();
        }
    }

    function advanceOverCount() {
        ballsThisOver++;
        if (ballsThisOver >= BALLS_PER_OVER) {
            ballsThisOver = 0;
            oversBowled++;
            currentBowler = BOWLERS[Math.floor(Math.random() * BOWLERS.length)];
        }
    }

    function showFlash(text, color) {
        flashMessage = text;
        flashColor = color;
        flashTimer = 40;
    }

    function showCommentary(bucket) {
        const lines = COMMENTARY[bucket];
        if (!lines) return;
        const line = lines[Math.floor(Math.random() * lines.length)];
        const el = document.getElementById('game-commentary');
        if (el) el.textContent = line;
    }

    function spawnHitParticles(x, y) {
        for (let i = 0; i < 10; i++) {
            particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 6,
                vy: -Math.random() * 5,
                life: 25 + Math.random() * 10,
                color: Math.random() > 0.5 ? '#D4A574' : '#1B6B4F'
            });
        }
    }

    function gameOver() {
        running = false;
        if (animationId) cancelAnimationFrame(animationId);

        if (score > best) {
            best = score;
            localStorage.setItem(STORAGE_BEST_KEY, String(best));
            document.getElementById('game-best').textContent = best;
        }

        draw();
        drawGameOverOverlay();
        document.getElementById('game-start-btn').textContent = 'Play Again';
    }

    function updateHud() {
        document.getElementById('game-score').textContent = score;
        document.getElementById('game-wickets').textContent = `${wickets}/${MAX_WICKETS}`;
        const oversEl = document.getElementById('game-overs');
        if (oversEl) oversEl.textContent = `${oversBowled}.${ballsThisOver}`;
        const boundariesEl = document.getElementById('game-boundaries');
        if (boundariesEl) boundariesEl.textContent = `${fours}x4, ${sixes}x6`;
    }

    // ===== Rendering =====

    function draw() {
        if (!ctx) return;
        const w = canvas.width, h = canvas.height;
        const groundY = h * GROUND_Y_RATIO;
        const batsmanX = w * BATSMAN_X_RATIO;

        const skyGradient = ctx.createLinearGradient(0, 0, 0, groundY);
        skyGradient.addColorStop(0, '#e8f4ec');
        skyGradient.addColorStop(1, '#f9f8f6');
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, w, groundY);

        ctx.fillStyle = '#c9a876';
        ctx.fillRect(0, groundY, w, h - groundY);
        ctx.fillStyle = '#1B6B4F';
        ctx.fillRect(0, groundY, w, 4);

        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.fillRect(batsmanX - 10, groundY, w * 0.55, h - groundY);

        drawBatsman(batsmanX, groundY);

        balls.forEach(ball => {
            const def = BALL_TYPES[ball.type];
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, 7, 0, Math.PI * 2);
            ctx.fillStyle = def.color;
            ctx.fill();
            ctx.strokeStyle = 'rgba(0,0,0,0.35)';
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        particles.forEach(p => {
            ctx.globalAlpha = Math.max(p.life / 30, 0);
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, 4, 4);
            ctx.globalAlpha = 1;
        });

        // Hit zone indicator
        ctx.strokeStyle = 'rgba(27,107,79,0.3)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(batsmanX, groundY - 60);
        ctx.lineTo(batsmanX, groundY + 4);
        ctx.stroke();
        ctx.setLineDash([]);

        // Ball type announcement
        if (announceTimer > 0) {
            ctx.globalAlpha = Math.min(announceTimer / 20, 1);
            ctx.fillStyle = announceColor;
            ctx.font = 'bold 18px Playfair Display, serif';
            ctx.textAlign = 'right';
            ctx.fillText(announceLabel, w - 20, 36);
            ctx.globalAlpha = 1;
        }

        // Bowler banner
        ctx.fillStyle = '#0f3a2a';
        ctx.font = '13px Inter, sans-serif';
        ctx.textAlign = 'left';
        if (currentBowler) {
            ctx.fillText(`Bowling: ${currentBowler}`, 16, 24);
        }

        if (flashMessage) {
            ctx.globalAlpha = Math.min(flashTimer / 20, 1);
            ctx.fillStyle = flashColor;
            ctx.font = 'bold 28px Playfair Display, serif';
            ctx.textAlign = 'center';
            ctx.fillText(flashMessage, batsmanX + 60, groundY - 80);
            ctx.globalAlpha = 1;
        }
    }

    function drawBatsman(x, groundY) {
        const swinging = batSwingTimer > 0;

        ctx.fillStyle = '#0f3a2a';
        ctx.fillRect(x - 8, groundY - 55, 16, 35);

        ctx.beginPath();
        ctx.arc(x, groundY - 62, 9, 0, Math.PI * 2);
        ctx.fillStyle = '#e8b98a';
        ctx.fill();

        ctx.strokeStyle = '#0f3a2a';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(x - 5, groundY - 20);
        ctx.lineTo(x - 8, groundY);
        ctx.moveTo(x + 5, groundY - 20);
        ctx.lineTo(x + 8, groundY);
        ctx.stroke();

        ctx.save();
        ctx.translate(x + 8, groundY - 40);
        ctx.rotate(swinging ? -0.9 : 0.35);
        ctx.fillStyle = '#D4A574';
        ctx.fillRect(-3, 0, 8, 34);
        ctx.fillStyle = '#8a6a3f';
        ctx.fillRect(-3, 30, 8, 8);
        ctx.restore();
    }

    function drawIdleScreen() {
        const w = canvas.width, h = canvas.height;
        ctx.fillStyle = '#f9f8f6';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#0f3a2a';
        ctx.font = 'bold 22px Playfair Display, serif';
        ctx.textAlign = 'center';
        ctx.fillText('Press "Start Game" to play', w / 2, h / 2 - 12);
        ctx.font = '14px Inter, sans-serif';
        ctx.fillStyle = '#555';
        ctx.fillText('Space, tap, or click to swing — watch for Fast, Swing, Spin & Yorker deliveries', w / 2, h / 2 + 16);
    }

    function drawGameOverOverlay() {
        const w = canvas.width, h = canvas.height;
        ctx.fillStyle = 'rgba(15, 58, 42, 0.85)';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#D4A574';
        ctx.font = 'bold 30px Playfair Display, serif';
        ctx.textAlign = 'center';
        ctx.fillText("YOU'RE OUT!", w / 2, h / 2 - 28);

        ctx.fillStyle = '#ffffff';
        ctx.font = '18px Inter, sans-serif';
        ctx.fillText(`${score} runs off ${ballsFaced} balls`, w / 2, h / 2);
        ctx.font = '15px Inter, sans-serif';
        ctx.fillText(`${fours} fours, ${sixes} sixes  •  Best: ${best}`, w / 2, h / 2 + 26);
        ctx.font = '13px Inter, sans-serif';
        ctx.fillText('Click "Play Again" to try and beat your best', w / 2, h / 2 + 52);
    }

    return { init, start, swing };
})();
