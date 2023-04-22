const express = require('express');
const app = require('./app');
const cors = require('cors');
app.use(cors());
app.use(express.json());

const config = require('./utils/config');
const logger = require('./utils/logger');

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
