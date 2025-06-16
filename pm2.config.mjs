export default {
  apps: [
    {
      name: "otisoft-upload",
      script: "build/index.js",
      instances: 2,
      exec_mode: "cluster",
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        // eslint-disable-next-line no-undef
        PORT: process.env.PORT,
      },
      error_file: "logs/error.log",
      out_file: "logs/output.log",
      time: true,
      merge_logs: true,
    },
  ],
};
