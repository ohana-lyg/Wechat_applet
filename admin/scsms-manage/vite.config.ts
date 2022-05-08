import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/style/main.scss";',
      },
    },
  },
  // 配置别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  //启动服务配置
  server: {
    port: 8000,
    open: true,
    https: false,
    proxy: {},
  },
});
