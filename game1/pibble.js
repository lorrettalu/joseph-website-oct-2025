let pibbleSketch = function(p) {

    // Visual Assets
    let pibble;
    let sponge;
    let rag;

    // Sound Assets
    let washSound;
    let yaySound;
    let cleanSound;

    // Game Variables
    let gameState = "wash";
    let progress = 0;
    let spongePos;
    let ragPos;
    let draggingSponge = false;
    let draggingRag = false;
    let canvasW = 500;
    let canvasH = 500;

    p.preload = function() {
        pibble = p.loadImage("pibble pictures/pibble.png");
        sponge = p.loadImage("pibble pictures/sponge.png");
        rag = p.loadImage("pibble pictures/rag.png");
        washSound = p.loadSound("soundfx/pibble_wash.mp3");
        yaySound = p.loadSound("soundfx/pibble_yay.mp3");
        cleanSound = p.loadSound("soundfx/pibble_clean.mp3");
    };

    p.setup = function() {
        let canvas = p.createCanvas(canvasW, canvasH);
        canvas.parent("game1-container");
        p.imageMode(p.CENTER);
        p.textAlign(p.CENTER, p.CENTER);
        spongePos = p.createVector(440, 50);
        ragPos = p.createVector(440, 140);
    };

    p.draw = function() {
        p.background(230, 255, 230);
        p.image(pibble, p.width / 2, p.height / 2, 250, 250);
        p.image(rag, ragPos.x, ragPos.y, 100, 100);
        p.image(sponge, spongePos.x, spongePos.y, 100, 100);

        // Main Game States
        if (gameState == "wash") {
            handleScrubbing("sponge");
        } else if (gameState == "clean") {
            handleScrubbing("rag");
        }

        // Text Feedback
        if (gameState == "wash") {
            p.push();
            p.fill(70);
            p.textSize(22);
            p.text("wash mah belly!", p.width / 2, p.height - 25);
        }
        if (gameState == "yay") {
            p.text("yaaayyyyyyy", p.width / 2, p.height - 25);
        }
        if (gameState == "clean") {
            p.text("clean mah belly!", p.width / 2, p.height - 25);
        }
        if (gameState == "done") {
            p.text("i'm very happy!", p.width / 2, p.height - 25);
            p.pop();
        }

        // Progress Bar
        if (gameState == "wash" || gameState == "clean") {
            p.push();
            p.fill(255);
            p.rect(p.width / 2 - 100, 20, 200, 15, 10);
            p.fill(120, 200, 120);
            p.rect(p.width / 2 - 100, 20, p.map(progress, 0, 100, 0, 200), 15, 10);
            p.pop();
        }

    };

    function handleScrubbing(tool) {
        let toolPos = (tool == "sponge") ? spongePos : ragPos;
        let dragging = (tool == "sponge") ? draggingSponge : draggingRag;

        if (dragging && p.dist(toolPos.x, toolPos.y, p.width / 2, p.height / 2 - 20) < 120) {
            progress += 0.8;
        }

        if (progress >= 100 && gameState === "wash") {
            washSound.stop();
            progress = 0;
            gameState = "yay";
            yaySound.play();
            setTimeout(() => {
                gameState = "clean";
                cleanSound.loop();
            }, 2000);
        } else if (progress >= 100 && gameState === "clean") {
            progress= 0;
            gameState = "done";
            yaySound.play();
            cleanSound.stop();

            document.getElementById("nextGameBtn").style.display = "inline-block";
        }

    }

    p.mousePressed = function() {
        if (p.dist(p.mouseX, p.mouseY, spongePos.x, spongePos.y) < 50) {
            draggingSponge = true;
        }
        if (gameState === "wash" && p.dist(p.mouseX, p.mouseY, spongePos.x, spongePos.y) < 50) {
            washSound.play();
        }
        if (p.dist(p.mouseX, p.mouseY, ragPos.x, ragPos.y) < 50) {
            draggingRag = true;
        }
    };

    p.mouseDragged = function() {
        if (draggingSponge) {
            spongePos.x = p.mouseX;
            spongePos.y = p.mouseY;
        }
        if (draggingRag) {
            ragPos.x = p.mouseX;
            ragPos.y = p.mouseY;
        }
    };

    p.mouseReleased = function() {
        draggingSponge = false;
        draggingRag = false;

        if (gameState === "wash") {
            spongePos.set(440, 50);
        }

        if (gameState === "clean") {
            ragPos.set(440, 140, 100, 100);
        }
    };
}

new p5(pibbleSketch);