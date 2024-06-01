import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyBvuxp_KsLRqEIMVdtrKMFm5GARNV-cZr0",
  authDomain: "mern-blog-e81c3.firebaseapp.com",
  projectId: "mern-blog-e81c3",
  storageBucket: "mern-blog-e81c3.appspot.com",
  messagingSenderId: "319660421025",
  appId: "1:319660421025:web:f4d70f3bf05958a574a5e0"
};

export const app = initializeApp(firebaseConfig);