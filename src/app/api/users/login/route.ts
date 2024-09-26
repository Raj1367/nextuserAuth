import connectDb from "@/database/config";
import userModel from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connectDb()

export const POST = async (req: NextRequest) => {

    try {
        const reqBody = await req.json()
        const { email, password } = reqBody
        console.log(reqBody)

        const user = await userModel.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: "User does not exits", success: false, error: true }, { status: 400 })
        }

        const validatePassword = await bcrypt.compare(password, user.password)

        if (!validatePassword) {
            return NextResponse.json({ message: "passwords do not match", success: false, error: true }, { status: 400 })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET_KEY!, { expiresIn: "12h" })

        const response = NextResponse.json({ message: "login successsfully", success: true, error: false })

        response.cookies.set("token", token, { httpOnly: true, })

        console.log("token", token)

        return response
    }

    catch (error: any) {
        return NextResponse.json({ message: error.message || error, success: false, error: true }, { status: 500 })
    }
}


