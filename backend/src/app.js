import express from "express";
import transactionRoutes from "./router/transaction.router";
const app = express();

app.use(express.json());

app.use("/", transactionRoutes);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON",
    });
  }

  next(err);
});
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

export default app;
