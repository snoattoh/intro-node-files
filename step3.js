const util = require('util');
const fs = require('fs');
const axios = require('axios');

const argv = process.argv;
//const checkUrl = [".com", "http", "https"]


const webCat = async url => {
    return axios.get(url).then((res) => {
        return res.data
    }).catch((err) => {
        return err.response;
    });
}

const cat = async path => {
    if(path == '--out'){
        const writeFile = util.promisify(fs.writeFile)
        let result = await cat(argv[4]); 
        writeFile(argv[3], result, "utf8").then((err) =>{
            if(err){
                return err;
            }  
            console.log(`no output, but ${argv[3]} contains contents of ${argv[4]}`);
        });
    }else if(path.indexOf('//') == -1){ // or http:// ? or https:// ? i think // is more universal right? .com and .edu don't work? or just make a list of things to check...
        const readFile = util.promisify(fs.readFile)
        return readFile(path,"utf8").then((data) => {
            return `${data}`;
        }).catch((err) => {
            return err;
        });
    }else{
        return webCat(path);
    }
}

// console.log(argv);
async function go(){
    result = await cat(argv[2]);
    if(result != undefined) console.log(result)
} 
go();

