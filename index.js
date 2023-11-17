import express from "express"
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var postList = [];
var postIndex = 0;

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    var post = {
        title: req.body.title,
        content: req.body.content,
        id: postIndex,
    };
    postList.push(post);
    postIndex++;
    res.redirect("/posts");
});

app.post("/")

app.post("/modify", (req, res) => {
    var postId = req.body.postId;
    res.render("update.ejs", {post: postList[postId]});
});

app.post("/modification", (req, res) => {
    var indexOfPost = req.body.postId;
    postList[indexOfPost].title = req.body.title;
    postList[indexOfPost].content = req.body.content;
    res.redirect("/posts");
});

app.get("/posts", (req, res) => {
    res.render("index.ejs", {
        posts: postList,
        postIndex: postIndex,
    });
})

app.post("/delete", (req, res) => {
    var deletedPostId = req.body.postId
    postList.splice(deletedPostId, 1);
    for (let j = deletedPostId; j < postIndex; j++) {
        if (postList[j]) {
            postList[j].id--;
            console.log("Deleted post ID:", postList[j].id);
        }
    } 
    postIndex--;
    console.log(postList);
    res.redirect("/posts");
});

app.post("/create", (req, res) => {
    res.render("create.ejs");
});


app.listen(port, () => {
    console.log(`app running on port ${port}`);
});