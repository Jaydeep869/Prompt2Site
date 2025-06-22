import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("google-login").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).catch((err) => {
    console.error("Google login error:", err);
    alert("Failed to login with Google.");
  });
});

document.getElementById("anon-login").addEventListener("click", () => {
  signInAnonymously(auth).catch((err) => {
    console.error("Anonymous login error:", err);
    alert("Failed to login anonymously.");
  });
});

document.getElementById("logout").addEventListener("click", () => {
  signOut(auth).catch((err) => {
    console.error("Logout error:", err);
    alert("Failed to logout.");
  });
});

onAuthStateChanged(auth, async (user) => {
  const status = document.getElementById("status");
  const googleBtn = document.getElementById("google-login");
  const anonBtn = document.getElementById("anon-login");
  const logoutBtn = document.getElementById("logout");

  if (user) {
    const name = user.displayName || "Guest";
    const token = await user.getIdToken();

    localStorage.setItem("uid", user.uid);
    localStorage.setItem("token", token);

    status.textContent = `${name}`;
    googleBtn.classList.add("hide");
    anonBtn.classList.add("hide");
    logoutBtn.classList.remove("hide");

    if (typeof window.loadHistory === "function") {
      window.loadHistory();
    }
  } else {
    status.textContent = "";
    localStorage.removeItem("uid");
    localStorage.removeItem("token");

    googleBtn.classList.remove("hide");
    anonBtn.classList.remove("hide");
    logoutBtn.classList.add("hide");
  }
});
