// vite.config.ts
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import reactJsx from "vite-react-jsx";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [reactRefresh(), reactJsx()],
  resolve: {
    alias: {
      "#components": path.resolve("/home/yggdrasil/projects/OSRG/website2.0", "/src/components"),
      "#utils": path.resolve("/home/yggdrasil/projects/OSRG/website2.0", "/src/utils")
    }
  },
  esbuild: {
    exclude: ["**/*.stories.@(js|jsx|ts|tsx)"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3RSZWZyZXNoIGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXJlZnJlc2gnXG5pbXBvcnQgcmVhY3RKc3ggZnJvbSAndml0ZS1yZWFjdC1qc3gnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0UmVmcmVzaCgpLCAgcmVhY3RKc3goKSxdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICcjY29tcG9uZW50cyc6IHBhdGgucmVzb2x2ZShcIi9ob21lL3lnZ2RyYXNpbC9wcm9qZWN0cy9PU1JHL3dlYnNpdGUyLjBcIiwgJy9zcmMvY29tcG9uZW50cycpLFxuICAgICAgJyN1dGlscyc6IHBhdGgucmVzb2x2ZShcIi9ob21lL3lnZ2RyYXNpbC9wcm9qZWN0cy9PU1JHL3dlYnNpdGUyLjBcIiwgJy9zcmMvdXRpbHMnKSxcbiAgICB9LFxuICB9LFxuICBlc2J1aWxkOiB7XG4gICAgZXhjbHVkZTogWycqKi8qLnN0b3JpZXMuQChqc3xqc3h8dHN8dHN4KSddLFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxnQkFBaUI7QUFBQSxFQUMzQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxlQUFlLEtBQUssUUFBUSw0Q0FBNEM7QUFBQSxNQUN4RSxVQUFVLEtBQUssUUFBUSw0Q0FBNEM7QUFBQTtBQUFBO0FBQUEsRUFHdkUsU0FBUztBQUFBLElBQ1AsU0FBUyxDQUFDO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K
