//file system
const fs = require('fs') //
fs.readFile('./docs/data.txt',(error,data)=>{
    if(error){
    console.log(error)
    return
    }
    console.log(data.toString())
})
//write file to storage.
fs.writeFile('./docs/example.txt','This is written from node js.',()=>{
    console.log('success..')
})




//var { user } = require('./students')
//object deserialization
//console.log(user)




//var xyz = require('./students')
//console.log(xyz)

//console.log(xyz)
