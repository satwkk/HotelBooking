import express from "express";
import { verifyAdmin, verifyUser } from '../utils/tokenVerification.js'
import { createRoom } from "../controllers/room.js";

const roomRouter = express.Router();

roomRouter.post('/:hotelid', verifyUser, createRoom);

export default roomRouter;