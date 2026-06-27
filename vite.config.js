import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // ១. បន្ថែមជួរនេះ

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ២. បន្ថែមជួរនេះបញ្ចូលទៅក្នុង plugins array
  ],
})