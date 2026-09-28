function validateTransaction(data) {
  const errors = [];

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return ["Request body must be a JSON object"];
  }

  const requiredFields = [
    "amount",
    "country",
    "device_new",
    "transactions_last_hour",
  ];

  for (const field of requiredFields) {
    if (!(field in data)) {
      errors.push(`${field} is required`);
    }
  }

  if ("amount" in data) {
    if (typeof data.amount !== "number" || !Number.isFinite(data.amount)) {
      errors.push("amount must be a valid number");
    } else if (data.amount < 0) {
      errors.push("amount cannot be negative");
    }
  }

  if ("country" in data) {
    if (typeof data.country !== "string" || data.country.trim().length !== 2) {
      errors.push("country must be a 2-letter string");
    }
  }

  if ("device_new" in data) {
    if (typeof data.device_new !== "boolean") {
      errors.push("device_new must be a boolean");
    }
  }

  if ("transactions_last_hour" in data) {
    if (
      typeof data.transactions_last_hour !== "number" ||
      !Number.isInteger(data.transactions_last_hour)
    ) {
      errors.push("transactions_last_hour must be an integer");
    } else if (data.transactions_last_hour < 0) {
      errors.push("transactions_last_hour cannot be negative");
    }
  }

  return errors;
}

export default validateTransaction;
