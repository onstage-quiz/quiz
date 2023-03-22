import { fileURLToPath, URL } from "node:url";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        basicSsl(),
        VitePWA({
            registerType: "autoUpdate",
            injectRegister: "auto",
            workbox: {
                cleanupOutdatedCaches: true,
                globPatterns: ["**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}"]
            },
            includeAssets: ["/favicon.png"],
            manifest: {
                name: "Test Project",
                short_name: "Test",
                theme_color: "#ffffff",
                background_color: "#ffffff",
                display: "standalone",
                icons: [
                    {
                        src: "icon-192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "/icon-512.png",
                        sizes: "512x512",
                        type: "image/png"
                    },
                    {
                        src: "icon-512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable"
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    }
});
