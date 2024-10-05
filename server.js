const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Use an in-memory object to store data instead of db.json
let inMemoryDb = {
  posts: []
};

server.use(middlewares);

server.use(jsonServer.bodyParser);

// Handle GET requests
server.get("/posts", (req, res) => {
  res.json(inMemoryDb.posts);
});

// Handle POST requests
server.post("/posts", (req, res) => {
  inMemoryDb.posts.push(req.body);
  res.json(req.body);
});

// Handle PUT requests
server.put("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const postIndex = inMemoryDb.posts.findIndex(post => post.id === id);
  if (postIndex >= 0) {
    inMemoryDb.posts[postIndex] = req.body;
    res.json(req.body);
  } else {
    res.status(404).send("Post not found");
  }
});

// Listen to the port
server.listen(3000, () => {
  console.log("JSON Server is running with in-memory data");
});
