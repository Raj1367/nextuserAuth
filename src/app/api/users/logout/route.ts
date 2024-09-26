import connectDb from "@/database/config";
import { NextRequest, NextResponse } from "next/server"


connectDb()

export const GET = async (req: NextRequest) => {

    try {

        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true,
            error:false
        })

        response.cookies.set("token", "", { httpOnly: true, secure: true })

        return response

    }

    catch (error: any) {
        return NextResponse.json({ message:error.message || error, success:false,error:true }, { status: 500 })
    }
}
