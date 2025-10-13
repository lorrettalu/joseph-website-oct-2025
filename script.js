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
      document.getElementById("main").style.display = "block";
      document.getElementById("main").style.opacity = 1;
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

// --- EVENT LISTENERS ---
window.addEventListener("DOMContentLoaded", () => {
  // When clicking the button
  document.getElementById("enterBtn").addEventListener("click", checkPassword);

  // When pressing Enter inside the password box
  document.getElementById("password").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      checkPassword();
    }
  });
});