import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';


import empRouter from "./Routes/EmpRoutes.js"



//Get .env file

dotenv.config();



//App Config

const app = express();




//Database 

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });



  //Middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));



//API Endpoints


app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});



app.use('/api/emp', empRouter);




//Listener


const port = process.env.PORT || 5000;

app.listen(port, () => {

    console.log(`Connected on ${port}`);
    
});