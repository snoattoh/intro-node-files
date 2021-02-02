const util = require('util');
const fs = require('fs');

const argv = process.argv;

cat = path => {
    const readFile = util.promisify(fs.readFile)
    readFile(path,"utf8").then((data) => {
        // console.log("Success");
        console.log(`${data}`);
    }).catch((err) => {
        // console.log("Error");
        console.log(err);
    });
    



}
// console.log(argv);
cat(argv[2]);
