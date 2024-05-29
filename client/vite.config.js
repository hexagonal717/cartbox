import {defineConfig} from 'vite'
import * as million from "million/compiler";
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [million.vite(), react()],
})
