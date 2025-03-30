const fs = require('fs');

fs.watch('./write.txt', (event, filename) => {
  console.log(event);
  if (filename) {
    console.log(filename);
  }
});

