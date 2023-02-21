/// <reference types="vitest" />
import { defineConfig } from 'vite'
import path from 'path'



import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirnamenew = path.dirname(__filename)

const projectRoot = path.resolve(__dirnamenew)


export default defineConfig({
    resolve: {
        alias: [{
            find: "@src",
            replacement: path.resolve(projectRoot, "src")
        }]
    },
    test: {
        reporters: "basic",
        watch: false,
    }
})
