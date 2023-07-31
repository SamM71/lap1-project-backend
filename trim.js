// Used to trim JSON File https://gist.githubusercontent.com/amitjambusaria/b9adebcb4f256eae3dfa64dc9f1cc2ef/raw/6431d72439c8399b05d2b8e9d51153e5dee7ad3b/countries.json
// File could be removed from final product but might be useful in the future

const fs = require('fs')

const countries = require("./countries.json")

function trimJSON(json, propertiesToRemove) {
  propertiesToRemove.forEach((propertyName) => {
    delete json[propertyName];
  });
}

countries.forEach(country => {
  trimJSON(country, ['code', 'region', 'currency', 'language', 'flag']);
})

const data = JSON.stringify(countries)

fs.writeFile('output.json', data, (err) => {
    if (err) throw err;
})