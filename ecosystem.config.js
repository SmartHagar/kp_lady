/** @format */

module.exports = {
  apps: [
    {
      name: "lady",
      script: "npm run start",
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      port: 3008,
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
