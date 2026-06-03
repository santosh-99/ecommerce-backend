import mongoose from "mongoose";




const initDb = async() => {
    try{
      const result =  await mongoose.connect(process.env.MONGO_URI, {
            // userNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log("Connected using mongodb")
        return result;

    }catch(err) {
        console.log(`connection err${err}`)
        throw err;

    }
}

export default initDb;

