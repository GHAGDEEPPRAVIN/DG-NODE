// Import the built-in os module
const os = require('os');


// Print operating system information such as platform, CPU architecture, and total memory using the os module.

console.log("Operating System Information:");
console.log(`Platform: ${os.platform()}`);           
console.log(`OS Type: ${os.type()}`);              
console.log(`Release: ${os.release()}`);          
console.log(`CPU Architecture: ${os.arch()}`);     
console.log(`CPU Cores: ${os.cpus().length}`);       
console.log(`Total Memory: ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`); 
console.log(`Free Memory: ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`);   
console.log(`Hostname: ${os.hostname()}`);
