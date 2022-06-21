module.exports = {
    outdir: './dist',
    esbuild: {
        minify: false,
        target: 'es2015'
    },
    asserts: {
        baseUrl: 'src',
        outDir: './dist'
    }
}