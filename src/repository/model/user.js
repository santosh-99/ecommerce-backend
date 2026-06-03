import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"]
    },
    email:{
        type: String, 
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email address"]
    },
    password: {
        type: String, 
        required:[true, "Password is required"]
    }, 
    type: {
        type: String, 
        default: "customer",  
        enum:{
            values: ["admin", "seller", "customer"],
            message: "{VALUE} is not a supported user type"
        }
    }

}, 
{timestamps: true}
)

const userModel = mongoose.model('user', userSchema);
export default userModel;