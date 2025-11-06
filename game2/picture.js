// Visual Assets
const images = [
    "joseph pictures/20220615_165224.JPG",
    "joseph pictures/Image-1.JPG",
    "joseph pictures/IMG_1212.JPG",
    "joseph pictures/IMG_1362.JPG",
    "joseph pictures/IMG_1961.jpg",
    "joseph pictures/IMG_2465.JPG",
    "joseph pictures/IMG_4478.JPG",
    "joseph pictures/IMG_5124.JPG",
    "joseph pictures/IMG_5783.JPG",
    "joseph pictures/IMG_5835.JPG",
    "joseph pictures/IMG_5996.JPG",
    "joseph pictures/IMG_6422.JPG",
    "joseph pictures/IMG_6426.JPG",
    "joseph pictures/IMG_6752.JPG",
    "joseph pictures/IMG_6766.JPG",
    "joseph pictures/IMG_6767.JPG",
    "joseph pictures/IMG_6851.JPG",
    "joseph pictures/IMG_6943.JPG",
    "joseph pictures/IMG_7279.JPG",
    "joseph pictures/IMG_7390 2.JPG",
    "joseph pictures/IMG_7558.JPG",
    "joseph pictures/IMG_7661.JPG",
    "joseph pictures/IMG_7766.JPG",
    "joseph pictures/IMG_7798.JPG",
    "joseph pictures/IMG_8039.JPG",
    "joseph pictures/IMG_8137.JPG",
    "joseph pictures/IMG_8458.JPG",
    "joseph pictures/IMG_8674.JPG",
    "joseph pictures/IMG_8675.JPG"
];

// Picture Answers
const answers = [
    ["norco", "pumpkin rock"],
    ["irvine", "hello kitty", "hello kitty cafe", "cafe"],
    ["macy's", "victoria gardens", "rancho cucamonga"],
    ["park", "providence ranch", "providence ranch park", "eastvale"],
    ["bathroom", "mcdonalds", "mcdonald's"],
    ["victoria gardens", "h&m", "rancho cucamonga"],
    ["santa anita", "h&m"],
    ["iv", "isla vista", "pumpkin patch", "isla vista pumpkin patch", "iv pumpkin patch"],
    ["manzanita", "dorm", "manzi"],
    ["manzanita", "dorm", "manzi"],
    ["sb", "beach", "santa barbara", "ucsb"],
    ["sb", "santa barbara", "manzanita", "manzi", "ucsb"],
    ["girvetz", "girvetz hall"],
    ["chica state beach", "chica", "chica state"],
    ["sb", "santa barbara", "sb botanical garden", "santa barbara botanical garden", "botanical gardens", "garden", "gardens", "sb botanical gardens", "santa barbara botanical gardens"],
    ["sb", "santa barbara", "sb botanical garden", "santa barbara botanical garden", "botanical gardens", "garden", "gardens", "sb botanical gardens", "santa barbara botanical gardens"],
    ["santa ynez"],
    ["iv", "isla vista", "pumpkin patch", "isla vista pumpkin patch", "iv pumpkin patch"],
    ["goleta butterfly grove", "butterfly", "butterfly grove"],
    ["ucsb", "north hall"],
    ["ucsb", "campbell hall"],
    ["santa ynez"],
    ["buena park", "medieval times"],
    ["buena park", "medieval times"],
    ["student health"],
    ["lizard's mouth", "lizards mouth"],
    ["sb", "santa barbara", "beach", "ucsb"],
    ["sb", "santa barbara", "beach", "ucsb"],
    ["sb", "santa barbara", "beach", "ucsb"] 
];

// Sound Assets
let el_dorado;
let pink_skies;
let ticking;
let tourniquet;

// Game Variables
const g2_total = images.length;
let img;
let idx = 0;
let reveal = false;
let canvasW = 640;
let canvasH = 400;
let flashRadius = 90;

function preload() {
    el_dorado = loadSound("music/Zach Bryan - El Dorado.mp3");
    pink_skies = loadSound("music/Zach Bryan - Pink Skies.mp3");
    ticking = loadSound("music/Zach Bryan - Ticking.mp3");
    tourniquet = loadSound("music/Zach Bryan - Tourniquet.mp3");

    loadG2Level(idx);
}

function setup() {
    const cnv = createCanvas(canvasW, canvasH);
    cnv.parent("game2-canvas");
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(16);

    const form = document.getElementById("g2-form");
    const input = document.getElementById("g2-input");
    const nextBtn = document.getElementById("g2-next");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        submitG2Guess(input.value);
    });

    nextBtn.addEventListener("click", () => {
        goToNextG2Level();
    });

    loadG2Level(idx);
    updateG2LevelLabel();
}

function draw() {
    background(0, 255);

    if (!img) {
        fill(80);
        text("loading image...", width/2, height/2);
        return;
    }

    drawImageContain(img, width, height);

    if (!reveal) {
        noStroke();

        let overlay = createGraphics(width, height);
        overlay.clear();
        overlay.fill(0, 255);
        overlay.rect(0, 0, width, height);

        overlay.erase();
        overlay.circle(constrain(mouseX, 0, width), constrain(mouseY, 0, height), flashRadius * 2);
        overlay.noErase();

        image(overlay, width/2, height/2, width, height);

    } else {
        drawImageContain(img, width, height);
    }

}

function loadG2Level(idx) {
    reveal = false;
    const imgPath = images[idx];
    img = null;

    loadImage(imgPath, (gimg) => {
        img = gimg;
    });

    const feedback = document.getElementById("g2-feedback");
    const success = document.getElementById("g2-success");
    const nextBtn = document.getElementById("g2-next");
    const input = document.getElementById("g2-input");

    feedback.style.visiblity = "hidden";
    success.style.display = "none";
    nextBtn.style.display = "none";
    input.value = "";
    input.focus();
}

function updateG2LevelLabel() {
    const label = document.getElementById("g2-level");
    label.textContent = `Level ${idx + 1} of ${g2_total}`;
}

function normalizeAnswer(s) {
    return s
        .toLowerCase()
        .trim()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .replace(/\s+/g, " ");
}

function submitG2Guess(raw) {
    const feedback = document.getElementById("g2-feedback");
    const success = document.getElementById("g2-success");
    const nextBtn = document.getElementById("g2-next");

    const guess = normalizeAnswer(raw);
    if (!guess) {
        feedback.textContent = "Please enter a guess.";
        feedback.style.visibility = "visible";
        return;
    }

    const answerss = (answers[idx] || []).map(normalizeAnswer);

    const correct = answerss.some(a => a === guess);

    if (correct) {
        reveal = true;
        feedback.style.visibility = "hidden";
        success.style.display = "block";
        nextBtn.style.display = "inline-block";
    } else {
        feedback.textContent = "Incorrect, try again.";
        feedback.style.visibility = "visible";
    }
} 

function goToNextG2Level() {
    if (idx < g2_total - 1) {
        idx += 1;
        updateG2LevelLabel();
        loadG2Level(idx);
    } else {
        const success = document.getElementById("g2-success");
        const nextBtn = document.getElementById("g2-next");
        success.textContent = "All levels complete!";
        nextBtn.style.visibility = "none";
    }
}

function drawImageContain(gimg, boxW, boxH) {
    const iw = gimg.width;
    const ih = gimg.height;
    const scale = Math.min(boxW / iw, boxH / ih);
    const w = iw * scale;
    const h = ih * scale;
    image(gimg, boxW/2, boxH/2, w, h);
}