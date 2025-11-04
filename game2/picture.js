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
}