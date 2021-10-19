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

// Item.deleteMany({defaultItems}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted items");
//   }
// });

app.get("/", function(req, res) {

  Item.find({}, function(err, results) {
    if (results.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Inserted documents successfully");
        }
      });
      res.render("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: results
      });
    }
  });
});

app.post("/", function(req, res) {

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });
  item.save();

  res.redirect("/");
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: results
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
