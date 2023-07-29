const express = require("express");
const morgan = require("morgan");
const { PORT } = require("./config");
const authRoutes = require("./routes/auth");
const security = require("./middleware/security");

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(security.extractUserFromJwt);

// set routes!
app.use("/auth", authRoutes);
app.use();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/** Handle 404 errors -- this matches everything
 * if the endpoint that the user sends a request to does not match any of our endpoints in our app
 * this middleware will be called
 */
app.use((req, res, next) => {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
