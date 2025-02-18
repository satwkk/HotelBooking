import express from "express";
import { createHotel, deleteHotel, getHotel, updateHotel, getHotels } from "../controllers/hotel.js";
import { verifyAdmin } from '../utils/tokenVerification.js'

const router = express.Router();

router.post('/', verifyAdmin, createHotel);
router.put('/:id', verifyAdmin, updateHotel);
router.delete('/:id', verifyAdmin, deleteHotel);
router.get('/:id', getHotel);
router.get('/', getHotels);

export default router;