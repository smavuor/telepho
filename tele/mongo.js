const mongoose = require('mongoose')

// Replace with the URL of your own database. Do not store the password on GitHub!
const url = 'mongodb+srv://smavuor:********@cluster0-igxpu.mongodb.net/puhelinluettelo?retryWrites=true'

mongoose.connect(url, { useNewUrlParser: true })




const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: Number
})

const person = new Person({
  name: process.argv[2],
  number: process.argv[3],
  id: getRandomInt(95)
})

function getRandomInt(max) {
return (Math.floor(Math.random() * Math.floor(max))+5);
}

if (person.name===undefined || person.number===undefined ) {
  Person
    .find({})
    .then(result => {
      console.log('puhelinluettelo')
  result.forEach(person => {
    console.log(person.name + '---' + person.number)
  })
  mongoose.connection.close()
})
}
else {
person
  .save()
  .then(response => {
    console.log( "Lisataan henkilo " + person.name +' ja numero ' + person.number + ' puhelinluetteloon')
    mongoose.connection.close()
  })
  }
