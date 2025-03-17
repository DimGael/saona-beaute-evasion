import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
    if (command === 'serve') {
        return {
            plugins: [
                {
                    name: 'html-watch',
                    configureServer(server) {
                        const publicPath = path.resolve(__dirname, 'public');

                        server.watcher.add(publicPath);
                        server.watcher.on('change', (filePath) => {
                            if (filePath.endsWith('.html')) {
                                server.ws.send({ type: 'full-reload' });
                            }
                        });
                    }
                }
            ]
        }
    }
});
