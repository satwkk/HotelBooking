import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    desc: {
        type: String,
        required: false,
    },

    maxPeople: {
        type: Number,
        required: false,
    },

    roomNumbers: [{ number: Number, unavailableDates: {type: [Date]} }]
}, { timestamps: true } );

export default mongoose.model("Room", RoomSchema)