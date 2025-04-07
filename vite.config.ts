import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    dts({
    beforeWriteFile: (filePath, content) => ({
      filePath: filePath.replace('path/to/file.d.ts', 'index.d.ts'),
      content,
    }),
  })],
})
