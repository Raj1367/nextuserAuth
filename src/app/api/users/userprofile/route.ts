import connectDb from "@/database/config";
import userModel from "@/model/userModel";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server"

connectDb()

export const POST = async (req: NextRequest) => {

    try {
        const userId = await verifyToken(req);
        const user = await userModel.findById({ _id: userId }).select("-password");
        return NextResponse.json({ mesaaage: "User found successfully", data: user, success: true, error: false }, { status: 200 })
    }

    catch (error: any) {
        return NextResponse.json({ message: error.message || error, success: false, error: true }, { status: 500 })
    }

}
