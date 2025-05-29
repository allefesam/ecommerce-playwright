import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    video: 'on', // grava vídeo sempre que rodar o teste
    // outras configs que você já tiver, como navegador, viewport, etc
  },
});
