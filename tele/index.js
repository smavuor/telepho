const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
const mongoose = require('mongoose')

// Replace with the URL of your own database. Do not store the password on GitHub!
const url = 'mongodb+srv://smavuor:SALASANA@cluster0-igxpu.mongodb.net/puhelinluettelo?retryWrites=true'

mongoose.connect(url, { useNewUrlParser: true })

const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: Number
})

const formatPerson = (person) => {
  const formattedPerson = {...person._doc, id: person._id}
  delete formattedPerson._id
  delete formattedPerson.__v

  return formattedPerson
  }


    function getRandomInt(max) {
  return (Math.floor(Math.random() * Math.floor(max))+5);
}

  function tarkastaNimi(uusiNimi){
    for (var i = 0; i < persons.length; i++) {
      if(uusiNimi===persons[i].name){
      return true}
    }
    {return false}
  }

    app.post('/api/persons', (request, response) => {
      const body = request.body
      console.log(body.name)
  if (body.name.length <= 2  || body.number.length <= 3) {
    return response.status(400).json({error: 'name or number missing'})
    .catch(error => {
  console.log(error)
})
}

  const person = new Person({
    name: body.name,
    number: body.number,

  })

  person
    .save()
    .then(savedPerson => {
      response.json(formatPerson(savedPerson))
    })
  })
console.log('9')


    app.get('/api/persons', (req, res) => {
      console.log('1')
        Person
          .find({}, {__v: 0})
          .then(persons => {
            res.json(persons.map(formatPerson))
            console.log('2')
          })
    })

    app.delete('/api/persons/:id', (request, response) => {
    console.log('4')
      Person
        .findByIdAndDelete(request.params.id)
        .then(result => {
          response.status(204).end()
        })
            console.log('5')
    })



    app.get('/api/persons/:id', (request, response) => {
          console.log('6')
      Person
      .findById(request.params.id)
      .then(person => {
    response.json(formatPerson(person))
  })
      .catch(error => {
      console.log(error)
      response.status(404).end()
    })
})

    const PORT = process.env.PORT || 3002
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
