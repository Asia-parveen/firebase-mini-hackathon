import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "./firebase.js";

const auth = getAuth();
const provider = new GoogleAuthProvider();

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("regpass");
let repeatPassword = document.getElementById("repeatPass");
let signupBtn = document.getElementById("signupBtn");
let googleBtn = document.getElementById("googleBtn");

signupBtn.addEventListener("click", async () => {
  console.log("Signup button clicked");

  // Validation for fields
  if (!firstName.value || firstName.value.length < 3 || firstName.value.length > 20) {
    return Swal.fire({
      title: "Invalid Input",
      text: "First name must be 3-20 characters long.",
      icon: "error",
    });
  }

  if (!lastName.value || lastName.value.length < 1 || lastName.value.length > 20) {
    return Swal.fire({
      title: "Invalid Input",
      text: "Last name must be 1-20 characters long.",
      icon: "error",
    });
  }

  if (!userEmail.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.value)) {
    return Swal.fire({
      title: "Invalid Email",
      text: "Please enter a valid email address.",
      icon: "error",
    });
  }

  if (!userPassword.value || userPassword.value.length < 8) {
    return Swal.fire({
      title: "Weak Password",
      text: "Password must be at least 8 characters long.",
      icon: "error",
    });
  }

  try {
    console.log("Attempting to create user...");
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail.value,
      userPassword.value
    );
    console.log("User created successfully:", userCredential);

    await Swal.fire({
      title: "Success!",
      text: "Account created successfully. Redirecting to login...",
      icon: "success",
      confirmButtonText: "OK",
    });

    // Clear input fields
    firstName.value = "";
    lastName.value = "";
    userEmail.value = "";
    userPassword.value = "";

    // Redirect to login page
    window.location.href = "login.html";
    console.log("Redirecting to login page...");
  } catch (error) {
    console.error("Error during signup:", error);

    let errorMessage = "Something went wrong. Please try again.";
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "This email is already in use.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email format.";
        break;
      case "auth/weak-password":
        errorMessage = "Password is too weak.";
        break;
      case "auth/network-request-failed":
        errorMessage = "Network error.";
        break;
      default:
        errorMessage = `Error: ${error.message}`;
        break;
    }

    Swal.fire("Error", errorMessage, "error");
  }
});


// Google Sign-In Button
googleBtn.addEventListener("click", () => {
  console.log("Google sign-in button clicked");

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Google Sign-In successful:", result.user);

      Swal.fire({
        icon: "success",
        title: "Sign-In Successful",
        text: `Welcome, ${result.user.displayName}! Redirecting to your profile...`,
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "login.html";
      });
    })
    .catch((error) => {
      console.error("Error during Google sign-in:", error);

      let message = "An unknown error occurred.";
      switch (error.code) {
        case "auth/popup-blocked":
          message = "Popup was blocked. Please allow popups.";
          break;
        case "auth/popup-closed-by-user":
          message = "You closed the popup. Try again.";
          break;
        case "auth/invalid-api-key":
          message = "Invalid API key.";
          break;
        case "auth/network-request-failed":
          message = "Network error.";
          break;
        case "auth/account-exists-with-different-credential":
          message = "An account exists with this email.";
          break;
        case "auth/operation-not-allowed":
          message = "Google Sign-In is not enabled.";
          break;
      }

      Swal.fire({
        icon: "error",
        title: "Sign-In Failed",
        text: message,
      });
    });
});



// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "./firebase.js";

// const auth = getAuth();
// const provider = new GoogleAuthProvider();
// let firstName = document.getElementById("firstName");
// let lastName = document.getElementById("lastName");
// let userEmail = document.getElementById("email");
// let userPassword = document.getElementById("regpass");
// let signupBtn = document.getElementById("signupBtn");
// let googleBtn = document.getElementById("googleBtn");

// signupBtn.addEventListener("click", async () => {
//   console.log("Sign-up button clicked");

//   if (!firstName.value || firstName.length < 3 || firstName.length > 3) {
//    Swal.fire({
//        title:"Invalid Input",
//       text: "First name must be 3-20 characters long.",
//       error:"error",
//   });
//   }
//   if (!lastName.value || lastName.length < 1 || lastName.length > 20) {
//     return Swal.fire({
//        title:"Invalid Input",
//        text:"Last name must be 1-20 characters long.",
//        error:"error",
//   });
//   }

//   if (userEmail.value.trim() === "" || userPassword.value.trim() === "") {
//     Swal.fire({
//       title: "Warning!",
//       text: "Please fill all fields",
//       icon: "warning",
//       confirmButtonText: "OK",
//     });
//     return;
//   }

//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       firstName.value,
//       lastName.value,
//       userEmail.value,
//       userPassword.value
//     );
//     console.log("User created:", userCredential);

//     await Swal.fire({
//       title: "Success!",
//       text: "Account created successfully",
//       icon: "success",
//       confirmButtonText: "OK",
//     });

//     firstName.value="";
//     lastName.value="";
//     userEmail.value = "";
//     userPassword.value = "";
//     location.href = "login.html";
//   } catch (error) {
//     const errorCode = error.code;
//     console.error("Error during sign-up:", error);

//     let errorMessage = "Something went wrong. Please try again.";
//     switch (errorCode) {
//       case "auth/email-already-in-use":
//         errorMessage = "This email is already in use.";
//         break;
//       case "auth/invalid-email":
//         errorMessage = "Invalid email format.";
//         break;
//       case "auth/weak-password":
//         errorMessage = "Password is too weak.";
//         break;
//       case "auth/network-request-failed":
//         errorMessage = "Network error.";
//         break;
//       default:
//         errorMessage = `Error: ${error.message}`;
//         break;
//     }

//     Swal.fire("Error", errorMessage, "error");

//     firstName.value="";
//     lastName.value="";
//     userEmail.value = "";
//     userPassword.value = "";
//   }
// });

// googleBtn.addEventListener("click", () => {
//   console.log("Google sign-in button clicked");

//   signInWithPopup(auth, provider)
//     .then((result) => {
//       console.log("Google Sign-In successful:", result.user);

//       Swal.fire({
//         icon: "success",
//         title: "Sign-In Successful",
//         text: `Welcome, ${result.user.displayName}! Redirecting to your profile...`,
//         timer: 2000,
//         showConfirmButton: false,
//       }).then(() => {
//         window.location.href = "profile.html";
//       });
//     })
//     .catch((error) => {
//       console.error("Error during Google sign-in:", error);

//       let message = "An unknown error occurred.";
//       switch (error.code) {
//         case "auth/popup-blocked":
//           message = "Popup was blocked. Please allow popups.";
//           break;
//         case "auth/popup-closed-by-user":
//           message = "You closed the popup. Try again.";
//           break;
//         case "auth/invalid-api-key":
//           message = "Invalid API key.";
//           break;
//         case "auth/network-request-failed":
//           message = "Network error.";
//           break;
//         case "auth/account-exists-with-different-credential":
//           message = "An account exists with this email.";
//           break;
//         case "auth/operation-not-allowed":
//           message = "Google Sign-In is not enabled.";
//           break;
//       }

//       Swal.fire({
//         icon: "error",
//         title: "Sign-In Failed",
//         text: message,
//       });
//     });
// });
