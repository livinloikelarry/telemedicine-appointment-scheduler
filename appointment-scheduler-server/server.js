const express = require("express");
const cors = require("cors");
// const { PORT } = require("./config");
const morgan = require("morgan"); // logger that will allow us to log activity

const app = express(); // new instance of express application to store in app variable

// parse incoming requests with JSON payloads
app.use(cors); // enables cross orgin resource sharing for all origins that may not be on this port
app.use(express.json());
// log requests info
const PORT = process.env.PORT || 3001;
app.use(morgan("tiny"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:` + PORT);
});
