const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Allow Cross Origin Requests
app.use(cors());

mongoose.connect(
	"mongodb+srv://mehedi:mehedi@mehedi-mw5jy.mongodb.net/test?retryWrites=true&w=majority",
	{ useUnifiedTopology: true, useNewUrlParser: true },
	() => console.log("MongoDB Database Connected")
);

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
