const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const {setupWebsocket} = require("./websocket")
const routes = require("./routes");

const app = express();

const server = http.Server(app);

setupWebsocket(server)

mongoose.connect("mongodb+srv://omnistack10:1ENMhFYXaj2R1ShC@cluster0-khap6.mongodb.net/omnistack?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
app.use(cors())
app.use(express.json());
app.use(routes);

server.listen(3333);
