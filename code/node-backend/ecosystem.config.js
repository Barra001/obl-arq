module.exports = {
  apps: [
    {
      name: "main-app",
      cwd: "main-app",
      script: "./main-app/dist/index.js",
      args: "start",
      instances: "1",
      exec_mode: "cluster",
    },
  ],
};
