let pictureSketch = function(p) {

    // Visual Assets
    const images = [
        "joseph pictures/20220615_165224.JPG",
        "joseph pictures/Image-1.JPG",
        "joseph pictures/IMG_1212.png",
        "joseph pictures/IMG_1362.png",
        "joseph pictures/IMG_1961.jpg",
        "joseph pictures/IMG_2465.png",
        "joseph pictures/IMG_4478.png",
        "joseph pictures/IMG_5124.png",
        "joseph pictures/IMG_5783.png",
        "joseph pictures/IMG_5835.png",
        "joseph pictures/IMG_5996.png",
        "joseph pictures/IMG_6422.png",
        "joseph pictures/IMG_6426.png",
        "joseph pictures/IMG_6752.JPG",
        "joseph pictures/IMG_6766.png",
        "joseph pictures/IMG_6767.png",
        "joseph pictures/IMG_6851.png",
        "joseph pictures/IMG_6943.png",
        "joseph pictures/IMG_7279.png",
        "joseph pictures/IMG_7390.png",
        "joseph pictures/IMG_7558.png",
        "joseph pictures/IMG_7661.png",
        "joseph pictures/IMG_7766.png",
        "joseph pictures/IMG_7798.png",
        "joseph pictures/IMG_8039.png",
        "joseph pictures/IMG_8317.png",
        "joseph pictures/IMG_8458.png",
        "joseph pictures/IMG_8674.png",
        "joseph pictures/IMG_8675.png"
    ];

    // Picture Answers
    const answers = [
        ["norco", "pumpkin rock"],
        ["irvine", "hello kitty", "hello kitty cafe", "cafe"],
        ["macy's", "victoria gardens", "rancho cucamonga"],
        ["park", "providence ranch", "providence ranch park", "eastvale"],
        ["bathroom", "mcdonalds", "mcdonald's", "mcdonalds bathroom", "mcdonald's bathroom"],
        ["victoria gardens", "h&m", "rancho cucamonga"],
        ["santa anita", "h&m"],
        ["iv", "isla vista", "pumpkin patch", "isla vista pumpkin patch", "iv pumpkin patch"],
        ["manzanita", "dorm", "manzi", "manzi bathroom", "manzanita bathroom", "manzi bathrooms", "manzanita bathrooms", "bathroom"],
        ["manzanita", "dorm", "manzi"],
        ["sb", "beach", "santa barbara", "ucsb"],
        ["sb", "santa barbara", "manzanita", "manzi", "ucsb"],
        ["girvetz", "girvetz hall"],
        ["chica state beach", "chica", "chica state"],
        ["sb", "santa barbara", "sb botanical garden", "santa barbara botanical garden", "botanical gardens", "garden", "gardens", "sb botanical gardens", "santa barbara botanical gardens"],
        ["sb", "santa barbara", "sb botanical garden", "santa barbara botanical garden", "botanical gardens", "garden", "gardens", "sb botanical gardens", "santa barbara botanical gardens"],
        ["santa ynez", "sy"],
        ["iv", "isla vista", "pumpkin patch", "isla vista pumpkin patch", "iv pumpkin patch"],
        ["goleta butterfly grove", "butterfly", "butterfly grove"],
        ["ucsb", "north hall"],
        ["ucsb", "campbell hall"],
        ["santa ynez", "sy"],
        ["buena park", "medieval times"],
        ["buena park", "medieval times"],
        ["student health", "shs"],
        ["lizard's mouth", "lizards mouth"],
        ["sb", "santa barbara", "beach", "ucsb"],
        ["sb", "santa barbara", "beach", "ucsb"],
        ["sb", "santa barbara", "beach", "ucsb"] 
    ];

    // Music Playlist
    let playlist = [];
    let currentTrackIndex = 0;
    let playing = false;

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

    p.preload = function() {
        el_dorado = p.loadSound("music/Zach Bryan - El Dorado.mp3");
        pink_skies = p.loadSound("music/Zach Bryan - Pink Skies.mp3");
        ticking = p.loadSound("music/Zach Bryan - Ticking.mp3");
        tourniquet = p.loadSound("music/Zach Bryan - Tourniquet.mp3");

        playlist = [el_dorado, pink_skies, ticking, tourniquet];

        loadG2Level(idx);
    };

    p.setup = function() {
        let cnv = p.createCanvas(canvasW, canvasH);
        cnv.parent("game2-canvas");
        p.imageMode(p.CENTER);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(16);

        const form = document.getElementById("g2-form");
        const input = document.getElementById("g2-input");
        const nextBtn = document.getElementById("g2-next");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            submitG2Guess(input.value);
        });

        nextBtn.addEventListener("click", () => {
            if (idx === g2_total - 1) {
                switchSection("game2", "mini3");
                return;
            }
            goToNextG2Level();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && reveal === true) {
                e.preventDefault();
                goToNextG2Level();
            }
        });

        loadG2Level(idx);
        updateG2LevelLabel();
    };

    p.draw = function() {
        p.background(0, 255);

        if (!img) {
            p.fill(80);
            p.text("loading image...", p.width/2, p.height/2);
            return;
        }

        drawImageContain(img, p.width, p.height);

        if (!reveal) {
            p.noStroke();

            let overlay = p.createGraphics(p.width, p.height);
            overlay.clear();
            overlay.fill(0, 255);
            overlay.rect(0, 0, p.width, p.height);

            overlay.erase();
            overlay.circle(p.constrain(p.mouseX, 0, p.width), p.constrain(p.mouseY, 0, p.height), flashRadius * 2);
            overlay.noErase();

            p.image(overlay, p.width/2, p.height/2, p.width, p.height);

        } else {
            drawImageContain(img, p.width, p.height);
        }

    };

    function loadG2Level(idx) {
        reveal = false;
        const imgPath = images[idx];
        img = null;

        p.loadImage(imgPath, (gimg) => {
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

            if (!playing) startGame2Music();
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
            nextBtn.textContent = "Continue";
            nextBtn.style.display = "inline-block";
            nextBtn.style.visibility = "none";
        }
    }

    function drawImageContain(gimg, boxW, boxH) {
        const iw = gimg.width;
        const ih = gimg.height;
        const scale = Math.min(boxW / iw, boxH / ih);
        const w = iw * scale;
        const h = ih * scale;
        p.image(gimg, boxW/2, boxH/2, w, h);
    }

    function startGame2Music() {
        if (playing) return;
        playing = true;

        currentTrackIndex = 0;

        playNextTrack();
    }

    function playNextTrack() {
        playlist.forEach(track => track.stop());

        let track = playlist[currentTrackIndex];

        if (currentTrackIndex === playlist.length - 1) {
            currentTrackIndex = 0;
        } else {
            track.play();

            track.onended(() => {
                currentTrackIndex++;
                playNextTrack();
            });
        }
    }

};

new p5(pictureSketch);