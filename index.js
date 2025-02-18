import express from 'express';
import dotEnv from 'dotenv'
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import hotelRoute from './routes/hotels.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js';
import roomRouter from './routes/room.js';

dotEnv.config();

const app = express();

// middleware
app.use(cookieParser());
app.use(express.json());

const dbConnect = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongoose.");
    } catch (error) {
        throw error;
    }
};

app.use('/api/auth', authRoute);
app.use('/api/hotel', hotelRoute);
app.use('/api/room', roomRouter);
app.use('/api/user', userRouter);

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMsg = err.message || "Something went wrong";
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: err.stack,
    });
});

app.listen(8000, () => {
    dbConnect();
    console.log("Connected to backend");
});
