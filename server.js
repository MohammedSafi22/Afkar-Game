const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
dotenv.config({ path:'config.env' })
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware')
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const gameRoute = require('./routes/gameRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const avarageRoute = require('./routes/averageRoute');
 

dbConnection();

const app = express();
app.use(cors(corOptions));
app.use(express.json())

var corOptions = {
  origin: '*'
}
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
    console.log(`mode:${process.env.NODE_ENV}`);
}

app.use('/api/categories',categoryRoute);
app.use('/api/games',gameRoute);
app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/Avarage',avarageRoute);
app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
  });

  app.use(globalError);

  const PORT = process.env.PORT || 8000;
  const server = app.listen(PORT, () => {
    console.log(`App running running on port ${PORT}`);
  });
  
  // Handle rejection outside express
  process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(() => {
      console.error(`Shutting down....`);
      process.exit(1);
    });
  });