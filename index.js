require('dotenv').config();

const express = require('express');
const router = require('./routes');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const globalErrorHandler = require('./utils/globalError');

app.use(cors());

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/v1', router);

// ~~~~~~~~~~~~~~ Unhandled Route ~~~~~~~~~~~~~~
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find route ${req.originalUrl}`, 404));
});

// ~~~~~~~~~~~~~~ Error Handler Middleware ~~~~~~~~~~~~~~
app.use(globalErrorHandler);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
