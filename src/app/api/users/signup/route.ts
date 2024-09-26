import connectDb from "@/database/config";
import userModel from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { sendEmail } from "@/utils/mailer";

connectDb()

export const POST = async (req: NextRequest) => {

    try {

        const reqBody = await req.json()

        const { username, email, password } = reqBody


        if (!username) {
            return NextResponse.json({ message: "please provide username", success: false, error: true }, { status: 400 })
        }


        if (!email) {
            return NextResponse.json({ message: "please provide email", success: false, error: true }, { status: 400 })
        }


        if (!password) {
            return NextResponse.json({ message: "please provide password", success: false, error: true }, { status: 400 })
        }

        // validation
        console.log(reqBody);

        const user = await userModel.findOne({ email })

        if (user) {
            return NextResponse.json({ message: "User already exits", success: false, error: true }, { status: 400 })
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const payload = new userModel({
            ...reqBody,
            password: hashedPassword
        })

        const savedUser = await payload.save()
        console.log(savedUser);

        //send verification email

        await sendEmail({ email: savedUser.email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            error: false,
            data: savedUser
        }, { status: 200 })

    }

    catch (error: any) {
        return NextResponse.json({ message: error.message || error, success: false, error: true }, { status: 500 })
    }
}

