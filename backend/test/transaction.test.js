const request = require("supertest");
const app = require("../src/app");

describe("POST /score-transaction", () => {
  test("should return low risk when no rules are triggered", async () => {
    const response = await request(app).post("/score-transaction").send({
      amount: 5000,
      country: "IN",
      device_new: false,
      transactions_last_hour: 2,
    });

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      risk_level: "low",
      flags: [],
    });
  });

  test("should return high risk when two rules are triggered", async () => {
    const response = await request(app).post("/score-transaction").send({
      amount: 15000,
      country: "IN",
      device_new: true,
      transactions_last_hour: 4,
    });

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      risk_level: "high",
      flags: [
        "amount_gt_10000_and_new_device",
        "more_than_3_transactions_last_hour",
      ],
    });
  });

  test("should return medium risk when country is outside IN", async () => {
    const response = await request(app).post("/score-transaction").send({
      amount: 5000,
      country: "US",
      device_new: false,
      transactions_last_hour: 2,
    });

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      risk_level: "medium",
      flags: ["country_not_IN"],
    });
  });

  test("should reject negative amount", async () => {
    const response = await request(app).post("/score-transaction").send({
      amount: -100,
      country: "IN",
      device_new: false,
      transactions_last_hour: 2,
    });

    expect(response.statusCode).toBe(400);

    expect(response.body.error).toBe("Validation failed");

    expect(response.body.details).toContain("amount cannot be negative");
  });

  test("should reject missing required fields", async () => {
    const response = await request(app).post("/score-transaction").send({
      amount: 5000,
    });

    expect(response.statusCode).toBe(400);

    expect(response.body.error).toBe("Validation failed");

    expect(response.body.details).toEqual(
      expect.arrayContaining([
        "country is required",
        "device_new is required",
        "transactions_last_hour is required",
      ]),
    );
  });
});
