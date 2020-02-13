const express = require('express')
const Datastore = require('nedb-promise')

const users = new Datastore({ filename: 'users.db', autoload: true })

const app = express()

app.use(express.json())


app.get('/users', async(req, res) => {

    const responsiveJSON = await users.find({})
    res.json({ "responsiveJSON": responsiveJSON })

})


app.get('/users/:id', async(req, res) => {
    const documents = await users.findOne({ _id: req.params.id })
    res.json(documents)
})

app.post('/users', async(req, res) => {
    const newUser = {
        name: {
            title: req.body.title,
            first: req.body.first,
            last: req.body.last,
        },
        email: req.body.email,
        nat: req.body.nat
    }
    const documents = await users.insert(newUser);
    res.json(documents)

})

app.patch('/users/:id', async(req, res) => {

    const documents = await users.update({ _id: req.params.id }, { $set: { "name.title": req.body.title, "name.first": req.body.first, "name.last": req.body.last, "email": req.body.email, "nat": req.body.nat } })
    res.json(documents)
})

app.delete('/users/:id', async(req, res) => {
    const doc = await users.remove({ _id: req.params.id })
    res.json(doc)
})


app.listen(8080, () => console.log("Servern IS up and going"))