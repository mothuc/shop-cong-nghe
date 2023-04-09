import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
  preloadedState: loadFromLocalStorage(),
});

function saveToLocalStorage(state) {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem("reduxStore", serialState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("reduxStore");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import cartSlice from "./cartSlice";
// import formSlice from "./formSlice";

// async function saveToFirestore(state) {
//   try {
//     await setDoc(doc(db, "reduxStore", "state"), { state });
//   } catch (e) {
//     console.warn(e);
//   }
// }

// async function loadFromFirestore() {
//   try {
//     const docRef = doc(db, "reduxStore", "state");
//     const docSnap = await getDoc(docRef);
//     return docSnap.exists() ? docSnap.data().state : undefined;
//   } catch (e) {
//     console.warn(e);
//     return undefined;
//   }
// }

// const store = configureStore({
//   reducer: {
//     cart: cartSlice,
//     order: formSlice,
//   },
//   preloadedState: loadFromFirestore(),
// });

// store.subscribe(() => saveToFirestore(store.getState()));

// export default store;
