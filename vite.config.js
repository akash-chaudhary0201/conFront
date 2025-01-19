import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "SOME_SPECIFIC_WARNING_CODE") return;
        warn(warning);
      },
    },
  },
});
