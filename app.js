//import express
const express = require('express')
const mongoose = require('mongoose')
const Post = require('./model/post')
const upload = require('express-fileupload')


const app = express()//similar to=> Express app= new Express();


var dbURL = 'mongodb+srv://sbk47240:samikshya321@cluster0.owwcze2.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connection  to db successful');
        app.listen(4000, () => {
            console.log('listening on 4000')
        })
    })
    .catch((error) => {
        console.log('db connection failed', error);
    })

app.set('view engine', 'ejs')

//middleware
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true })) //tp retrive data from POST request

app.use(express.json())

app.use(upload())

//homepage
app.get('/', (req, res) => {
    var title = 'BRHSS-HOME'
        // var posts = [{
        //         title: 'this is my first post',
        //         category: 'node js',
        //         date: '2022, July 11',
        //     },
        //     {
        //         title: 'hello world',
        //         category: 'node js',
        //         date: '2022, July 11',
        //     },
        //     {
        //         title: 'This is my second post',
        //         category: 'node js',
        //         date: '2022, July 11',
        //     },
        //     {
        //         title: 'This is my third post',
        //         category: 'node js',
        //         date: '2022, July 11',
        //     },
        //     {
        //         title: 'This is my fourth post',
        //         category: 'node js',
        //         date: '2022, July 11',
        //     },
        //     {
        //         title: 'This is my fifth post',
        //         category: 'node js',
        //         date: '2022, July 11',
        //     }
        // ]

    Post.find()
        .then((result) => {
            console.log(result)
            res.render('index', { title, posts: result })
        })
        .catch((error) => {
            console.log(error)
            res.end(error, error.message)
        })

})
//search
app.get('/search', (req,res)=>{
    let searchQuery=req.query.q
    let title='Search Results'
    console.log(req.query.q)
    
    Post.find({ $text : { $search: searchQuery}})
    .then((result)=>{   
        res.render('search', {title,posts:result})
    })
    .catch((error)=>{
        res.render(error.message)
     })
    })
    





//for signup
// app.get('/sign-up', (req, res) => {
//     let title = 'BRHSS sign-up'
//     res.render('signup', { title })
// })

//create-post
app.get('/posts/create', (req, res) => {
    let title = 'BRHSS-create post'
    res.render('create-post', { title })
})

//store new post(POST)
app.post('/posts', (req, res) => {

    if (req.files) {
        let file = req.files.image
        let fileName = 'brss_' + file.name
        let fileURL = '/uploads/' + fileName
        let fileUploadPath = './public' + fileURL

        console.log('Image file url:', fileURL)
        file.mv(fileUploadPath, (err) => {
            if (err)
                res.end(err.message)
            else {
                console.log('Image uploaded successfully')
                const post = new Post(req.body)
                post.image = fileURL
                post.save()
                    .then((result) => {
                        console.log('Successfully saved')
                        res.redirect('/')
                    })
                    .catch((error) => {
                        console.log('Cannot save post to mongodb', error.message);
                    })
            }

        })
    }


})

//show single post(GET)
app.get('/posts/:id', (req, res) => {
    title = 'Post-details'

    let postId = req.params.id
    console.log(postId)
        //retrive single post from mongodb
    Post.findById(postId)
        .then((result) => {
            res.render('post-details', { title, post: result })
        })
        .catch((error) => {
            res.end(error.message)
        })



})

//delete post(DELETE)
app.delete('/posts/:id', (req, res) => {
    // console.log(req.url);
    // console.log('delete request received');
    let postId = req.params.id
    Post.findByIdAndDelete(postId)
        .then((result) => {
            res.json({
                message: 'Successfully deleted post',
                redirect: "/"
            })
        })
        .catch((error) => {
            res.end(error.message)
        })
})

//open edit form(GET)
app.get('/posts/:id/edit', (req, res) => {
    let title = 'Update-post'

    let postId = req.params.id

    Post.findById(postId)
        .then((result) => {
            console.log(result);
            res.render('update-post', { title, post: result })
        })
        .catch((error) => {
            res.end(error.message)
        })


})

//update post(PUT)
app.put('/posts/:id', (req, res) => {

    let postId = req.params.id
    let post = req.body

    Post.findByIdAndUpdate(postId, post)
        .then((result) => {
            res.json({
                message: 'Successfully updated',
                redirect: '/posts/' + postId
            })
        })
        .catch((error) => {
            res.status(500).end(error.message)
        })
})

//signup user[POST]
app.post('/sign-up', (res, req) => {

})


// app.get('/about', (req, res) => {
//     res.end('Request for about page')
// })

// app.use((req, res) => {
//     res.status(400).end('404 not found')
// })
