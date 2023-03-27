const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const { users } = require("./state");

app.use(express.json());

/* BEGIN - create routes here */

// GET /users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET /users/:id
app.get("/users/:id", (req, res) => {
  res.json(users.find((user) => user._id === parseInt(req.params.id)));
});

// POST /users
app.post("/users", (req, res) => {
  users.push({
    _id: users.length + 1,
    ...req.body,
  });
  res.json({ _id: users.length + 1, ...req.body });
});

// PUT /users/:id
app.put("/users/:id", (req, res) => {
  const userID = parseInt(req.params.id);
  const newUser = users.find((user) => user._id === userID);
  if (newUser) {
    const putUpdateUser = req.body;
    Object.assign(newUser, putUpdateUser);
    res.json(putUpdateUser);
  }
});

// DELETE /users/:id
app.delete("/users/:id", (req, res) => {
  const deleteUser = users.findIndex(
    (user) => user._id === parseInt(req.params.id)
  );
  if (deleteUser >= 0) {
    users.splice(deleteUser, 1);
  }
  res.json(users);
});
/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
