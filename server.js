http = require('http')
var fs=require('fs')
var server=http.createServer((req,res)=>
{ 
    console.log("request made.....")
    console.log(req.method,req.url)
    req.url
    //use req.url to get requested router
    //index.html
    //about.html
    //484.html
    // switch(req.url)
    //case"/"->index.html
    //case"/about"->about.html
    //case default: ->404.html
    var path = './views/'

    switch(req.url){
        case "/":
            path = path + 'index.html'
            res.statusCode = 200//sucessful response
            break;

             case "/about":
                path = path + 'about.html'
                res.statusCode = 200//sucessful respond

                break;

                default:
                    path = path + '404.html'
                    res.statusCode = 404//not found
            
                    break;
    }
    //npm = node package manager
    //3rd party package


    
     fs.readFile(path, (error, data)=>{
     if(error){
        console.log(error.message)
        res.end(error.message)
     }
     res.end(data) 
     }) 
}) 
server.listen(4000,'localhost',()=>{}) 
console.log("listening on port 4000....")
