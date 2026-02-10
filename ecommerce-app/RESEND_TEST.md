Testing the resend-verification endpoint

Example curl commands and a tiny mock server to test the resend flow locally.

1) CURL (unauthenticated)

Replace `{USER_ID}` and `http://localhost:8000` with your backend URL if different.

```bash
# Simple POST to trigger resend verification (no auth)
curl -X POST http://localhost:8000/api/users/{USER_ID}/resend-verification/ -H "Content-Type: application/json"

# If your backend requires Authorization header (bearer token):
curl -X POST http://localhost:8000/api/users/{USER_ID}/resend-verification/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

2) Quick mock server (Node + Express)

This tiny mock responds to POST /api/users/:id/resend-verification/ and logs the "email sent" event to the console. Save as `src/mocks/resendMock.js` and run with `node src/mocks/resendMock.js`.

```js
// src/mocks/resendMock.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/api/users/:id/resend-verification/', (req, res) => {
  const userId = req.params.id;
  console.log(`Mock: resend verification requested for user ${userId}`);
  // Simulate sending email (in production you'd send an actual email)
  // Optionally check Authorization header
  const auth = req.get('authorization') || 'no-auth';
  console.log('Authorization header:', auth);

  // Return success payload
  res.json({ success: true, message: 'Verification email sent (mock)' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Resend-mock running on http://localhost:${PORT}`));
```

3) Run mock server

```bash
# from ecommerce-app/
node src/mocks/resendMock.js
```

4) Test with curl

```bash
curl -X POST http://localhost:8000/api/users/123/resend-verification/ -H "Content-Type: application/json"
```

This will return a JSON success response from the mock and print a line in the mock server console.

Notes

- If your real backend already sends verification emails during registration you may not need the resend endpoint on signup; the frontend calls `resendVerification` as a fallback to ensure the mail is sent.
- Adjust endpoint path if your backend uses a different URL (e.g. `/users/{id}/resend/`).
