const cron = require('node-cron');

cron.schedule('* * * * *', () => {
  console.log('hi')
  logtime();
});