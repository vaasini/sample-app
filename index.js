const express = require('express');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { apiKeyAuth } = require('./middleware/auth');
const { requestLogger } = require('./middleware/logger');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/users', apiKeyAuth, usersRouter);
app.use('/api/products', apiKeyAuth, productsRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
