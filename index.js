import express from "express";
import bodyParser  from "body-parser";
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

let posts = [];

function Post(title, content) {
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
}

function addPost(title, content) {
    let post = new Post(title, content);
    posts.unshift(post);
}

function deletePost(index) {
    posts.splice(index, 1);
}

function editPost(index, title, content) {
    posts[index] = new Post(title, content);
}

app.get("/", (req, res) => {
    res.render("home.ejs", {posts: posts});
});

app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {postId: index, title: post.title, content: post.content});
});

app.post("/delete", (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {postId: index, title: post.title, content: post.content});
});

app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/save", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    
    addPost(title, content);
    res.redirect("/");
});


app.listen(port, () => {
    console.log(`server running on Port ${port}`)
})



