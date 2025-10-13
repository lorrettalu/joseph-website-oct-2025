// Encrypt and check the password
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

async function checkPassword() {
  const input = document.getElementById("password").value;
  const enteredHash = await hashPassword(input);

  // precomputed hash for password
  const correctHash = "9cae87f9878a5376bb82125bbac3649973741c6a06bdd248a40b258e70263c0d";

  if (enteredHash === correctHash) {
    // Fade transition
    document.getElementById("login").style.opacity = 0;
    setTimeout(() => {
      document.getElementById("login").style.display = "none";
      document.getElementById("instructions").style.display = "block";
      document.getElementById("instructions").style.opacity = 1;
    }, 500);
  } else {
    const inputBox = document.getElementById("password");

    // Add shake class
    inputBox.classList.add("shake");

    // Remove the class after animation ends (so it can play again next time)
    setTimeout(() => {
      inputBox.classList.remove("shake");
    }, 400);

    // Optionally, clear the input box
    inputBox.value = "";
  }

  console.log("Entered hash:", enteredHash);
  console.log("Expected hash:", correctHash);
}

// --- SECTION SWITCHER ---
function switchSection(hideId, showId) {
  const hideEl = document.getElementById(hideId);
  const showEl = document.getElementById(showId);
  hideEl.style.opacity = 0;
  setTimeout(() => {
    hideEl.style.display = "none";
    showEl.style.display = "block";
    setTimeout(() => showEl.style.opacity = 1, 50);
  }, 400);
}

// --- EVENT LISTENERS ---
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("enterBtn").addEventListener("click", checkPassword);

  document.getElementById("password").addEventListener("keydown", e => {
    if (e.key === "Enter") checkPassword();
  });

  document.getElementById("continueBtn").addEventListener("click", () => {
    switchSection("instructions", "game1");
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    switchSection("game1", "game2");
  });

  document.getElementById("restartBtn").addEventListener("click", () => {
    switchSection("game2", "login");
  });
});