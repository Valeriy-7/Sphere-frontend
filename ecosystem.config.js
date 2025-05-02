module.exports = {
  apps: [
    {
      name: 'sphere-frontend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3009,
      },
    },
  ],
};
