const fs = require('fs');
const superagent = require('superagent');

const readFilePromice = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
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

readFilePromice(`${__dirname}/dog.txt`).then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
}).then(res => {
    console.log(res.body.message);
    return writeFilePromice('dog-img.txt', res.body.message)
}).then(() => {
    console.log('Random dog image saved to the file!');
}).catch(err => {
    console.log(err.message);
});
