module.exports = {
  apps: [
    {
      name: 'pdf-generator',
      script: './index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: './logs/pdf-generator-error.log',
      out_file: './logs/pdf-generator-out.log',
      log_file: './logs/pdf-generator-combined.log',
      time: true
    },
    {
      name: 'webhook-handler',
      script: './webhook-handler.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
        PDF_GENERATOR_URL: 'http://localhost:3001',
        KIT_WEBHOOK_SECRET: process.env.KIT_WEBHOOK_SECRET || 'default-secret'
      },
      error_file: './logs/webhook-handler-error.log',
      out_file: './logs/webhook-handler-out.log',
      log_file: './logs/webhook-handler-combined.log',
      time: true
    }
  ]
};