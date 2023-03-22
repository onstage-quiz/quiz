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
    apiKey: "AIzaSyDpoKXDRXPjS2EzhenExlVHiSdRDK3qdV8",
    authDomain: "onstage-quiz.firebaseapp.com",
    projectId: "onstage-quiz",
    storageBucket: "onstage-quiz.appspot.com",
    messagingSenderId: "115919689976",
    appId: "1:115919689976:web:d257a7d4feaceb5b8dc30d",
    measurementId: "G-N9WVPH2GW3"
};

const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);
