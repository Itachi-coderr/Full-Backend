// require("dotenv").config({path: "./env"})

import connectDB from "./db/db.js";
import dotenv from "dotenv";

dotenv.config({ path: "./env" });



connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("MONGO DB Connection Failed !!!", err);    
})











// import express from "express"
// const app = express()

// ( async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on("Error", (error) => {
//         console.log("Error: ", error);
//         throw error;
//     })

//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`)
//     })

//   } catch (error) {
//     console.error("Error: ", error)
//     throw error;
//   }
// })()