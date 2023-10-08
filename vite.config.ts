import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	build: {
		outDir: 'build'
		// assetsDir: "src/assets"
	},
	base: '',
	server: {
		watch: {
			usePolling: true
		},
		host: true, // Need for docker container port mapping
		strictPort: true
		// port: 5173
	}
});
