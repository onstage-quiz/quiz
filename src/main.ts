import { firebaseConfig } from "@/firebase_config";
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

const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);
