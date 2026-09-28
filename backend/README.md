#  Fraud Risk API

A simple REST API built with Node.js and Express for evaluating
transaction fraud risk.

This project was created as part of the  backend assessment
## Tech Stack
- Node.js
- Express
- Jest
- Supertest

## Project Structure


shieldwer-fraud-risk-api/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── controllers/
│   │   └── transaction.controller.js
│   ├── routes/
│   │   └── transaction.routes.js
│   ├── services/
│   │   └── fraud.service.js
│   └── validators/
│       └── transaction.validator.js
├── tests/
│   └── transaction.test.js
├── .gitignore
├── package.json
└── README.md

POST /score-transaction

{
  "amount": 15000,
  "country": "IN",
  "device_new": true,
  "transactions_last_hour": 4
}
response ------
{
  "risk_level": "high",
  "flags": [
    "amount_gt_10000_and_new_device",
    "more_than_3_transactions_last_hour"
  ]
}