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

function preload() {
    pibble = loadImage("pibble pictures/pibble.png");
    sponge = loadImage("pibble pictures/sponge.png");
    rag = loadImage("pibble pictures/rag.png");
    washSound = loadSound("soundfx/pibble_wash.mp3");
    yaySound = loadSound("soundfx/pibble_yay.mp3");
    cleanSound = loadSound("soundfx/pibble_clean.mp3");
}

function setup() {
    let canvas = createCanvas(500, 500);
    canvas.parent("game1-container");
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    spongePos = createVector(440, 50);
    ragPos = createVector(440, 140);
}

function draw() {
    background(230, 255, 230);
    image(pibble, width / 2, height / 2, 250, 250);
    image(sponge, 440, 50, 100, 100);
    image(rag, 440, 140, 100, 100);

    // Main Game States
    if (gameState == "wash") {
        handleScrubbing("sponge");
    } else if (gameState == "clean") {
        handleScrubbing("rag");
    }

    // Text Feedback
    if (gameState == "yay") {
        push();
        fill(70);
        textSize(22);
        text("yaaayyyyyyy", width / 2, height - 25);
    }
    if (gameState == "done") {
        text("All done!", width / 2, height - 25);
        pop();
    }

    // Progress Bar
    if (gameState == "wash" || gameState == "clean") {
        push();
        fill(255);
        rect(width / 2 - 100, 20, 200, 15, 10);
        fill(120, 200, 120);
        rect(width / 2 - 100, 20, map(progress, 0, 100, 0, 200), 15, 10);
    }

}

function handleScrubbing(tool) {
    let toolPos = (tool == "sponge") ? spongePos : ragPos;
    let dragging = (tool == "sponge") ? draggingSponge : draggingRag;

    if (dragging && dist(toolPos.x, toolPos.y, width / 2, height / 2 - 20) < 120) {
        progress += 0.8;
    }

    if (progress >= 100 && gameState === "wash") {
        progress = 0;
        gameState = "yay";
        yaySound.play();
        setTimeout(() => {
            gameState == "clean";
            cleanSound.play();
        }, 2000);
    } else if (progress >= 100 && gameState === "clean") {
        progress= 0;
        gameState == "done";
        yaySound.play();
    }

}

function mousePressed() {
    if (gameState === "wash" && dist(mouseX, mouseY, spongePos.x, spongePos.y) < 50) {
        draggingSponge = true;
    }
}