const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router({}); // Use an empty object for in-memory storage
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});

module.exports = server;
