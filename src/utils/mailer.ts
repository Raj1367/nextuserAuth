import userModel from "@/model/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs"


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        const htmlForVerifyToken = `<p>Click <a href="${process.env.FRONT_END_URL}/verifyemail?token=${hashedToken}">here</a> 
        to verify your email or copy paste the link in your browser <br> 
        ${process.env.FRONT_END_URL}/verifyemail?token=${hashedToken}</p>`

        const htmlForForgotPassword = `<p>Click <a href="${process.env.FRONT_END_URL}/forgotpasword?token=${hashedToken}">here</a> 
        to reset your password or copy paste the link in your browser <br> 
        ${process.env.FRONT_END_URL}/forgotpasword?token=${hashedToken}</p>`


        if (emailType === "VERIFY") {
            await userModel.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        }

        else {
            await userModel.findByIdAndUpdate(userId, { forgotpasswordToken: hashedToken, forgotpasswordTokenExpiry: Date.now() + 3600000 })
        }

        // const transporter = nodemailer.createTransport({
        //     host: "sandbox.smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //         user: "dcd7bde6473603",
        //         pass: "0c126d53e47178"
        //     }
        // });

        // const mailOptions = ({
        //     from: "raj@mhatre.ai",
        //     to: email,
        //     subject: emailType === "VERIFY" ? "please velify your email" : "rest your password",
        //     html: emailType === "VERIFY" ? htmlForVerifyToken : htmlForForgotPassword
        // });

         const transporter = nodemailer.createTransport({
           service:"gmail",
           host:"smtp.gamil.com",
            port: 587,
            auth: {
                user: process.env.USER_EMAIL,
                pass:process.env.USER_PASSWORD
            }
        });

        const mailOptions = ({
            from: "crazytime0001@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "please velify your email" : "rest your password",
            html: emailType === "VERIFY" ? htmlForVerifyToken : htmlForForgotPassword
        });



        const mailResponse = await transporter.sendMail(mailOptions)

        return mailResponse

    }

    catch (error: any) {
        throw new Error(error.message)
    }
}