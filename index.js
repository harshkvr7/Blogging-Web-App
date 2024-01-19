import express from "express";
import bodyparser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"))

var blogs = [];

app.get("/", (req, res) => {
    res.render("home.ejs", {
        "blog_list": blogs,
        "time_date": timeanddate()
    })
})

app.get("/add", (req, res) => {
    res.render("create.ejs");
})

function timeanddate() {
    var date = new Date();
    var day = date.getDay();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var month_num = date.getMonth();
    var year = date.getFullYear();
    var month = '';

    switch (month_num) {
        case 0:
            month = 'Jan';
            break;
        case 1:
            month = 'Feb';
            break;
        case 2:
            month = 'Mar';
            break;
        case 3:
            month = 'Apr';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'Jun';
            break;
        case 6:
            month = 'Jul';
            break;
        case 7:
            month = 'Aug';
            break;
        case 8:
            month = 'Sep';
            break;
        case 9:
            month = 'Oct';
            break;
        case 10:
            month = 'Nov';
            break;
        case 11:
            month = 'Dec';
            break;

        default:
            break;
    }

    return hour + ":" + minute + " " + day + " " + month + " " + year;
}



app.post("/add-blog", (req, res) => {

    var time_date = timeanddate();
    console.log(time_date);
    blogs.push({ "content": req.body["content"] });
    console.log(blogs);
    res.redirect("/")
})

app.get("/remove-blog/:index", (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < blogs.length) {
        blogs.splice(index, 1);
    }
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
})