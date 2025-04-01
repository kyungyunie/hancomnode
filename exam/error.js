process.on('uncaughtException', (err) => {
  console.error(log = {
    time: new Date().toLocaleString(),
    name: err.name,
    message: err.message,
    stack: err.stack,
    process:{
        pid: process.pid,
        uptime: process.uptime()
    }
  });
});

setInterval(() => {
  throw new Error('서버를고장내주마!!!');
}, 1000);
