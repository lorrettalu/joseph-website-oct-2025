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

}