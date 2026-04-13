import mongoose from "mongoose";



// const initDb = async() => {
//     return new Promise((res, rej) => {
//         mongoose.connect(process.env.MONGO_UR, {}).then(() => {
//             console.log("Db connected successfully")
//             res("DB connected")
//         }).catch((err) => {
//             console.log(`connection error ${err}`)
//             rej(`connection error ${err}`)

//          })

//     }) 
// }








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

