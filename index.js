const express = require('express')
const app = express()
const PORT = 6010
var bodyParser = require('body-parser')
const data = [

    {
        id: 1,
        name: "John Doe",
        email: "johndoe@gmail.com",
        address: "7 Agunbiade street, jakarta",
        phone: "08012345678"
    },
    {
        id: 2,
        name: "Ayodeji Ayorinde",
        email: "ayodejiayorinde@gmail.com",
        address: "11 Wonuola street, Akoka",
        phone: "09012345678"
    }
]


app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to my API"
    })
})



app.get('/user', (req, res) => {
    res.json({
        status: "success",
        message: "All users",
        data: data
    })
})

app.post('/user/add', (req, res) => {

    console.log("body: ", req.body)
    const {name, email, phone, address} = req.body
    if (!name || !email || !phone|| !address || email.indexOf('@') === -1){
        res.json({
            status: "error",
            message: "All fields are required"
        })
    }


    const tempData = {
        id: data.length +1,
        name,
        email,
        address,
        phone
    }
    data.push(tempData)
    res.json({
        status: "success",
        message: "Data created successfully",
        data : tempData
    })
  })

app.put('/user/update', (req, res) => {
    const {id, name, phone, email, address,} = req.body
    if (!name || !email || !phone|| !address || email.indexOf('@') === -1){
        res.json({
            status: "error",
            message: "All fields are required"
        })
    }
   const filteredData = data.filter(item => item.id === id)
//    const filteredDataObj = filteredData[0]
    filteredData[0].name = name
    filteredData[0].phone = phone
    filteredData[0].email = email
    filteredData[0].address = address

    res.json({
        status: "success",
        data : data
    })


})


app.delete('/user/delete', (req, res) => {
    
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
  })