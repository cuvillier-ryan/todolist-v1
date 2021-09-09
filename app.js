const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to  your todolist"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit the delete an item."
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Inserted documents successfully");
  }
});

// Item.deleteMany({defaultItems}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted items");
//   }
// });

app.get("/", function(req, res) {

  res.render("list", {
    listTitle: "Today",
    newListItems: items
  });
});

app.post("/", function(req, res) {

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.post("/work", function(req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
  console.log("Success!");
});
