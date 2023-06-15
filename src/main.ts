import { createApp } from "vue";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

const firebaseConfig = {
    apiKey: "AIzaSyC1xrZm0kL-KJjAVbnhzB1QxsFLPNCXxmw",
    authDomain: "onstage-quiz-1bdcb.firebaseapp.com",
    projectId: "onstage-quiz-1bdcb",
    storageBucket: "onstage-quiz-1bdcb.appspot.com",
    messagingSenderId: "1065654723018",
    appId: "1:1065654723018:web:5cdbf7f98d60e14c7f2f33"
};

const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);
