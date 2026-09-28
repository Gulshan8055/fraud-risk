import validateTransaction from "../validators/transaction.validator";
import calculateRisk from "../services/fraud.service";
function scoreTransaction(req, res) {
  const errors = validateTransaction(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors,
    });
  }

  const result = calculateRisk(req.body);

  return res.status(200).json(result);
}

export default scoreTransaction;
