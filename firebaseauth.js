import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyByECWZi0yn6tbkPTABRAv4NlEjisQz3EM",
  authDomain: "software-c044b.firebaseapp.com",
  projectId: "software-c044b",
  storageBucket: "software-c044b.firebasestorage.app",
  messagingSenderId: "641724524236",
  appId: "1:641724524236:web:c8a300f49ad92561578469"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// عرض رسالة
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// ===== إنشاء حساب =====
const signUp = document.getElementById("submitSignUp");
signUp?.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById("rEmail").value.trim();
  const password = document.getElementById("rPassword").value;
  const firstName = document.getElementById("fName").value.trim();
  const lastName = document.getElementById("lName").value.trim();

  try {
    const hashedPassword = await dcodeIO.bcrypt.hash(password, 10);

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email,
      firstName,
      lastName,
      password: hashedPassword
    });

    showMessage("Account Created Successfully", "signUpMessage");
    window.location.href = "index.html";
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === "auth/email-already-in-use") {
      showMessage("Email Address Already Exists !!!", "signUpMessage");
    } else {
      showMessage("Unable to create User", "signUpMessage");
      console.error("SignUp Error:", error); // علشان تتابعين الخطأ الحقيقي
    }
  }
});

// ===== تسجيل الدخول =====
const signIn = document.getElementById("submitSignIn");
signIn?.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const docRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(docRef);

    if (userDoc.exists()) {
      const savedHash = userDoc.data().password;
      const match = await dcodeIO.bcrypt.compare(password, savedHash);

      if (match) {
        showMessage("Login successful", "signInMessage");
        localStorage.setItem("loggedInUserId", user.uid);
        window.location.href = "homepage.html";
      } else {
        showMessage("Invalid password", "signInMessage");
      }
    } else {
      showMessage("User data not found", "signInMessage");
    }
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === "auth/invalid-credential") {
      showMessage("Incorrect Email or Password", "signInMessage");
    } else {
      showMessage("Login failed: " + error.message, "signInMessage");
      console.error("SignIn Error:", error); // علشان يوضح لك المشكلة بالتفصيل
    }
  }
});



