const express = require('express');
var methodOverride = require('method-override');
const app = express();

const path = require('path');
const port = 8080;
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set('view engine','views');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

//DATA:
let data = [{id:uuidv4() ,author:"Author1",content:"lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor"},
    {id:uuidv4() ,author:"Author2",content:"lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor."},
    {id:uuidv4() ,author:"Author3",content:"lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor."},
    {id:uuidv4() ,author:"Author4",content:"lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor."}
];

app.get("/posts",(req,res,next)=>{
    res.render('posts.ejs',{data});
});
app.get("/posts/new",(req,res,next)=>{
    res.render('new_posts.ejs');
});
app.post('/posts',(req,res,next)=>{
    const {author,content} = req.body;
    data.push({id:uuidv4(),author,content});
    console.log(data);
    res.redirect('/posts');
});

app.get('/posts/:id',(req,res,next)=>{
    const {id} = req.params;
    console.log(req.params);
    const post = data.find((p)=> p.id === id);
    console.log(post);
    res.render('show.ejs',{post});
});

app.get('/posts/:id/edit',(req,res,next)=>{
    const {id} = req.params;
    console.log(req.params);
    const post = data.find((p)=> p.id === id);
    res.render('edit.ejs',{post});
});
app.patch('/posts/:id',(req,res,next)=>{
    const {id} = req.params;
    const newcontent = req.body.content;
    const post = data.find((p)=> p.id === id);
    post.content = newcontent;
    console.log(post);
    res.redirect('/posts');
});

app.delete('/posts/:id',(req,res,next)=>{
    const id = req.params.id;
    const posts = data.filter((p)=> p.id !== id);
    data = posts;
    res.redirect('/posts');
});


app.listen(port,(req,res)=>{
    console.log(`Server running on port ${port}`);
});

