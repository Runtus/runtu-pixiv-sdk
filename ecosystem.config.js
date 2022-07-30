module.exports = {
  apps: [
    {
      cwd: './',
      kill_timeout: 10000,
      name: 'server',
      namespace: "pixiv",
      script: "./node_modules/.bin/ts-node",
      "args": "-T -r tsconfig-paths/register ./src/index.ts",
      wait_ready: true,
      watch: false,
      // watch: ['server'],
      ignore_watch: ['node_modules'],
      watch_options: {
        "usePolling": true
      }
    }
  ]
};
