function calculateRisk(transaction) {
  const flags = [];

  // If amount > INR 10,000 AND device is new
  if (transaction.amount > 10000 && transaction.device_new === true) {
    flags.push("amount_gt_10000_and_new_device");
  }

  // If more than 3 transactions occurred in the last hour
  if (transaction.transactions_last_hour > 3) {
    flags.push("more_than_3_transactions_last_hour");
  }

  // If country is anything other than IN
  if (transaction.country.toUpperCase() !== "IN") {
    flags.push("country_not_IN");
  }

  let risk_level;

  if (flags.length === 0) {
    risk_level = "low";
  } else if (flags.length === 1) {
    risk_level = "medium";
  } else {
    risk_level = "high";
  }

  return {
    risk_level,
    flags,
  };
}
export default calculateRisk;
