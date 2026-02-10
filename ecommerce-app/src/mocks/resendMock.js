const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/api/users/:id/resend-verification/', (req, res) => {
  const userId = req.params.id;
  console.log(`Mock: resend verification requested for user ${userId}`);
  // Simulate sending email (in production you'd send an actual email)
  const auth = req.get('authorization') || 'no-auth';
  console.log('Authorization header:', auth);
  res.json({ success: true, message: 'Verification email sent (mock)' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Resend-mock running on http://localhost:${PORT}`));
