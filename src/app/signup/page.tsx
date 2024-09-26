"use client"
import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import ImageToBase64 from '@/utils/ImageToBase64';
import uploadFile from '@/utils/uploadFileToCloudinary';
import backendApi from '../common/backendApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Image from 'next/image';

const Signup = () => {

    const router = useRouter()

    const navigateToLogin = () => router.push('/login')

    const [signUpData, setSignUpData] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        profilepic: ""
    })

    const [showPassword, setShowPsssword] = useState(false)

    const [showConfirmShowPassword, setConfirmShowPassword] = useState(false)

    const [uploadPhoto, setUploadPhoto] = useState<File | null>(null);

    const handleUploadProfileImg: (event: React.ChangeEvent<HTMLInputElement>) => void = async (e) => {

        if (e.target.files && e.target.files.length > 0) {

            const file = e.target.files[0];
            const uploadPhoto = await uploadFile(file);
            setUploadPhoto(file);

            let image64: string = "";
            if (file?.name) {
                image64 = await ImageToBase64(file) as string;
            }
            setSignUpData((prev) => ({ ...prev, profilepic: image64 && uploadPhoto?.url }));
            console.log("file", image64);
        }
    }

    const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        const { name, value } = e.target;
        setSignUpData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault()

        if (signUpData.password === signUpData.confirmpassword) {

            const respone = await fetch(backendApi.userSignup.url, {
                method: backendApi.userSignup.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(signUpData)
            })

            const responseData = await respone.json()

            if (responseData.success) {
                alert(responseData.message)
            }

            if (responseData.error) {
                alert(responseData.message)
            }

            setSignUpData({
                username: "",
                email: "",
                password: "",
                confirmpassword: "",
                profilepic: ""
            })

            navigateToLogin()
        }

        else {
            alert("passwords do not match")
        }
    }

    return (
        <>
            <div className="flex items-center justify-center h-[90vh]">

                <div className="container w-[300px] border flex justify-center shadow-md p-3 rounded bg-white">

                    <div className='flex flex-col justify-center items-center'>
                        <form action="" onSubmit={handleSubmit}>
                            <div>
                                <div className="w-14 h-14 mx-auto relative overflow-hidden rounded-full bg-white border-2 border-violet-800 shadow-md">
                                    <label>
                                        {
                                            signUpData.profilepic ?
                                                (
                                                    <div className="cursor-pointer text-center absolute w-full">
                                                       <Image src={signUpData.profilepic} width={80} height={80} alt="login_icon" />
                                                    </div>
                                                ) :
                                                (
                                                    <div className="flex justify-center items-center py-[15px] cursor-pointer">
                                                        <FaCamera className="text-violet-800" fontSize={25} />
                                                    </div>
                                                )
                                        }
                                        <input type='file' className='hidden' onChange={handleUploadProfileImg} />
                                    </label>
                                </div>
                                <div className="mt-1">
                                    {
                                        signUpData.profilepic ? ("") : (<p className="text-xs font-semibold text-center">upload pic</p>)
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 w-[270px] mt-3">
                                <div>
                                    <label htmlFor='username' className="text-sm font-semibold">Username:</label>
                                    <input className="border h-6 w-full rounded text-sm" type="text" name="username" id="username" required
                                        value={signUpData.username} onChange={handleChange} />
                                </div>

                                <div>
                                    <label htmlFor='email' className="text-sm font-semibold">Email:</label>
                                    <input className="border h-6 w-full rounded text-sm" type="email" name="email" id="email" required
                                        value={signUpData.email} onChange={handleChange} />
                                </div>

                                <div>
                                    <label htmlFor='password' className="text-sm font-semibold">Password:</label>
                                    <div className="relative">
                                        <input className="border h-6 w-full rounded text-sm" type={showPassword ? "text" : "password"} required
                                            name="password" id="password"
                                            value={signUpData.password} onChange={handleChange} />
                                        <span className="absolute top-1 right-0 px-2 cursor-pointer" onClick={() => setShowPsssword((prev) => !prev)} >
                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor='confirmpassword' className="text-sm font-semibold">Confirm Password:</label>
                                    <div className="relative">
                                        <input className="border h-6 w-full rounded text-sm" type={showConfirmShowPassword ? "text" : "password"} required
                                            name="confirmpassword" id="confirmpassword"
                                            value={signUpData.confirmpassword} onChange={handleChange} />
                                        <span className="absolute top-1 right-0 px-2 cursor-pointer" onClick={() => setConfirmShowPassword((prev) => !prev)} >
                                            {showConfirmShowPassword ? <FaEye /> : <FaEyeSlash />}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-6">
                                <button className="bg-violet-800 px-4 py-[5px] text-white rounded shadow-md">
                                    <p className="text-sm">Signup</p>
                                </button>
                            </div>

                        </form>

                        <div className="flex justify-center mt-5 font-semibold">
                            <p className="text-xs">Already have an Account ?
                                <Link href="/login"><span className="px-1 text-violet-800">Login</span></Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Signup