import mongoose from "mongoose";

const connectDb = async () => {

    try {
        mongoose.connect(process.env.MONGODB_URI!)

        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("connected to database")
        })

        connection.on("error", (error) => {
            console.log("error connecting to database", error)
            process.exit()
        })
    }

    catch (error) {
        console.log("something wehnt wrong in connecting to DB")
    }
}

export default connectDb
