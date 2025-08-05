import express from 'express'
const app = express()
import { connectDB } from './db/connect'
import { notFound } from './middleware/not-found'
import { errorHandlerMiddleware } from './middleware/error-handler'
import authRoute from './routes/auth'
import protectedRoutes from './routes/protected'
import application from './routes/application'
import connectRoute from './routes/connect'
import job from './routes/job'
import dicussion from './routes/dicussion'
import event from './routes/event'
import message from './routes/message'
import freeRoute from './routes/free'
import helpRoute from './routes/help'
import dashboardRoute from './routes/dashboard'
import blogsRoute from './routes/blogs'
import morgan from 'morgan'
import cors from 'cors'
// import bodyParser from 'body-parser'

import dotenv from 'dotenv'
dotenv.config()

// Middleware for logging
app.use(morgan('dev'))
// Set the port from environment variable or default to 3000
// app.use(bodyParser.json());

const port = process.env.PORT || 3000;



const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
};

// If you want to restrict it, use:
app.use(cors(corsOptions));

// middleware
app.use(express.json())

// Routes
app.use('/api/user', authRoute);
app.use('/api/protected', protectedRoutes); 
app.use('/api/application',application)
app.use('/api/job', job)
app.use('/api/dicussion', dicussion)
app.use('/api/event', event)
app.use('/api/message', message)
app.use('/api/connect', connectRoute);
app.use('/api/free', freeRoute);
app.use('/api/help', helpRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/blog', blogsRoute);

// Error handling
app.use(notFound)
app.use(errorHandlerMiddleware)


const start = async () => {
    try {
        let result = await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server listening on port ${port } and  ${result}...`))
    } catch (err) {
        console.log(err);
    }
}

start()