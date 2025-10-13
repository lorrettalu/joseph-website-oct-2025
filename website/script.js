// script.js
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

  // pre-computed hash for "mySecret123"
  const correctHash = "e2b9fbb8e25a6376a40e013cf9c8a6b8a1d195b1f0219f1a833d3b77ec79e7a9";

  if (enteredHash === correctHash) {
    window.location.href = "main.html"; // or reveal hidden section
  } else {
    alert("Incorrect password!");
  }
}