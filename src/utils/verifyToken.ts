import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const verifyToken = async (req: NextRequest) => {

    try {
        const token = req.cookies.get("token")?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY!);
        return decodedToken.id;
    }

    catch (error: any) {
        return NextResponse.json({ message: error.message || error, success: false, error: true }, { status: 500 })
    }

}