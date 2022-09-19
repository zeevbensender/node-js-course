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
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);
        writeFilePromice('dog-img.txt', res.body.message);
        console.log('Random dog image saved to the file!');
    }catch(err) {
        console.log(err);    
    }
}

getDogPic();

// readFilePromice(`${__dirname}/dog.txt`).then(data => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
// }).then(res => {
//     console.log(res.body.message);
//     return writeFilePromice('dog-img.txt', res.body.message)
// }).then(() => {
//     console.log('Random dog image saved to the file!');
// }).catch(err => {
//     console.log(err.message);
// });
