const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRouter = require("./routes/auth.routes");
const eventRouter = require('./routes/event.routes');
const applicationRouter = require("./routes/application.routes");
const authCheck = require('./middlewares/authenticate.middleware');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
     res.send("Welcome to Playo API Home page...")
})

// AUTHENTICATE USER
app.use('/auth', authRouter);

// VALIDATE AUTHENTICATION OF THE USER
app.use(authCheck);

app.use('/event', eventRouter);
app.use('/application', applicationRouter);

// ! Wrong URL-Endpoint
app.use('/', (req, res) => {
     res.status(404).send({ message: 'Invalid URL-endpoint!' });
})


app.listen(process.env.PORT ?? 8080, async () => {
     try {
          console.log(`✅ Server started at : http://localhost:${process.env.PORT ?? 8080}`);
          console.log('⏳ Database connecting...')
          await connectDB;
          console.log('✅ Database Connected')
     } catch (error) {
          console.log('❌ error:', error.message);
     }
})