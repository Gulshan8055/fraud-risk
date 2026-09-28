import express from "express";
import scoreTransaction from "../controllers/transaction.controller.js";
const router = express.Router();

router.post("/score-transaction", scoreTransaction);

export default router;
