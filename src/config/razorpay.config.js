import Razorpay from "razorpay";
import appConfig from "./app.config.js";

const razorpay = new Razorpay({
    key_id: appConfig.razorpay.key_id,
    key_secret: appConfig.razorpay.key_secret
});

export default razorpay;