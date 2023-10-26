// vite.config.js
import { defineConfig } from "file:///C:/Users/Mohiu/practice/karsu-extension/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Mohiu/practice/karsu-extension/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [vue()],
  server: {
    port: 9090,
    proxy: {
      "/api/": {
        // target: 'http://172.16.21.100/',
        target: "https://stage2.karsu.ir/",
        changeOrigin: true,
        secure: false
      },
      "/Upload/": {
        // target: 'http://172.16.21.100/',
        target: "https://stage2.karsu.ir/",
        changeOrigin: true,
        secure: false
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxNb2hpdVxcXFxwcmFjdGljZVxcXFxrYXJzdS1leHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE1vaGl1XFxcXHByYWN0aWNlXFxcXGthcnN1LWV4dGVuc2lvblxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTW9oaXUvcHJhY3RpY2Uva2Fyc3UtZXh0ZW5zaW9uL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3Z1ZSgpXSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogOTA5MCxcbiAgICBwcm94eToge1xuICAgICAgJy9hcGkvJzoge1xuICAgICAgICAvLyB0YXJnZXQ6ICdodHRwOi8vMTcyLjE2LjIxLjEwMC8nLFxuICAgICAgICB0YXJnZXQ6ICdodHRwczovL3N0YWdlMi5rYXJzdS5pci8nLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgJy9VcGxvYWQvJzoge1xuICAgICAgICAvLyB0YXJnZXQ6ICdodHRwOi8vMTcyLjE2LjIxLjEwMC8nLFxuICAgICAgICB0YXJnZXQ6ICdodHRwczovL3N0YWdlMi5rYXJzdS5pci8nLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpVCxTQUFTLG9CQUFvQjtBQUM5VSxPQUFPLFNBQVM7QUFHaEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLElBQUksQ0FBQztBQUFBLEVBQ2YsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsU0FBUztBQUFBO0FBQUEsUUFFUCxRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsWUFBWTtBQUFBO0FBQUEsUUFFVixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
