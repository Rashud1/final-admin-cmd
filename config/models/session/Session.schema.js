import mongoose from "mongoose";



const SessionSchema = mongoose.Schema({
    pins: {
        type: Number,
        required: true,
    
    },
    email: {
        type: String,
        required: true,
        default: "",
        max: 50,
     },

    type: {
        type: String,
        default: "email",
        max: 50,
    }


}, {
    timestamp: true,
}
);

const session = mongoose.model("Session", SessionSchema) 
export default user;