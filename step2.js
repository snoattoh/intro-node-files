const util = require('util');
const fs = require('fs');
const axios = require('axios');

const argv = process.argv;
//const checkUrl = [".com", "http", "https"]


webCat = url => {
    axios.get(url).then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log(err.response);
    });
}

cat = path => {
    if(path.indexOf('//') == -1){ // or http:// ? or https:// ? i think // is more universal right? .com and .edu don't work? or just make a list of things to check...
        const readFile = util.promisify(fs.readFile)
        readFile(path,"utf8").then((data) => {
            // console.log("Success");
            console.log(`${data}`);
        }).catch((err) => {
            // console.log("Error");
            console.log(err);
        });
    }else{
        webCat(path);
    }
}

// console.log(argv);
cat(argv[2]);
