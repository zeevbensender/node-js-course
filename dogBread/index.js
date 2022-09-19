const fs = require('fs');
const superagent = require('superagent');

const readFilePromice = fileName => {
    return new Promise((resolve, reject) => {
        console.log("About to read the file " + fileName)
        fs.readFile(fileName, (err, data) => {
            if(err)reject("failed to read the file :(");
            resolve(data);
        })
    })
}

const writeFilePromice = (file, message) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, message, err => {
            if(err) reject("failed to write file");
            resolve("success");
        });
    })
}

const getDogPic = async () => {
    try{
        const data = await readFilePromice(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
        const res1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const promises = await Promise.all([res1, res2, res3]);
        const imgs = promises.map(pr => pr.body.message);
        console.log(imgs);
        writeFilePromice('dog-img.txt', imgs.join('\n'));
        console.log('Random dog image saved to the file!');
    }catch(err) {
        console.log(err);  
        throw(err);  
    }
    return "success";
}

(async () => {
    try{
        await getDogPic();
        console.log("Finished successfully");
    }catch(err) {
        console.log("ERROR!!!");
    }
})();
