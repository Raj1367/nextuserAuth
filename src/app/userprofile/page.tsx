"use client"
import React, { useEffect, useState } from 'react'
import backendApi from '../common/backendApi';
import { useRouter } from 'next/navigation'
import { FaUserCircle } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';

const UserProfile = () => {

    const router = useRouter()
    const navigateToUserProfile = () => router.push('/userprofile')
    const navigateToLogin = () => router.push('/login')

    const [data, setData] = useState({
        username: "",
        email: "",
        profilepic: "",
        isVerified: "",
        isAdmin: "",
        verifyToken: ""
    })

    const [loading, setLoading] = useState(false)

    const handleUserProfile = async () => {

        setLoading(true)

        const response = await fetch(backendApi.userInfo.url, {
            method: backendApi.userInfo.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()

        setData(responseData.data)
        console.log(responseData.data)

        setLoading(false)

        if (responseData.success) {
            navigateToUserProfile()
        }

        if (responseData.error) {
            alert(responseData.message)
            navigateToLogin()
        }
    }

    useEffect(() => {
        handleUserProfile()
    }, [])


    const handleLogout = async () => {

        const response = await fetch(backendApi.userLogout.url, {
            method: backendApi.userLogout.method,
            credentials: 'include'
        })

        const responseData = await response.json()

        if (responseData.success) {
            alert(responseData.message)
            navigateToLogin()
        }

        if (responseData.error) {
            alert(responseData.message)
        }

    }

    return (
        <div>
            {

                loading ? (

                    <div className='flex flex-col justify-center items-center h-[100vh] gap-2'>
                        <div className="loader"></div>
                        <p>Loading...</p>
                    </div>
                )

                    : (

                        <div>

                            <div className='flex flex-col items-center justify-center h-[90vh]'>

                                <div className="my-8">
                                    <h1 className="text-xl uppercase font-semibold">welcome user</h1>
                                </div>

                                <div className="w-auto container border rounded shadow-md">

                                    <div className="my-5 px-3">

                                        <div className="w-16 h-16 mx-auto relative overflow-hidden rounded-full bg-white border-2 border-violet-800 shadow-md">
                                            <label>
                                                {
                                                    data.profilepic ?
                                                        (
                                                            <div className="cursor-pointer text-center absolute">
                                                                <Image src={data.profilepic} width={80} height={80} alt="login_icon" />
                                                            </div>
                                                        ) :
                                                        (
                                                            <div className="flex justify-center items-center py-[15px] cursor-pointer">
                                                                <FaUserCircle className="text-violet-800" fontSize={30} />
                                                            </div>
                                                        )
                                                }
                                            </label>
                                        </div>

                                        <div className="mt-6 mb-6 flex justify-start  flex-col gap-5 px-4">

                                            <div className="flex justify-start items-center gap-1">
                                                <label className="font-semibold text-violet-800">Name:</label>
                                                <p>{data.username}</p>
                                            </div>

                                            <div className="flex justify-start items-center gap-1">
                                                <label className="font-semibold text-violet-800">Email:</label>
                                                <p>{data.email}</p>
                                            </div>

                                            <div className="flex justify-start items-center gap-3">
                                                <div className="flex gap-1">
                                                    <label className="font-semibold text-violet-800">User Verified:</label>
                                                    <p>{data.isVerified ? "verified" : "not-verified"}</p>
                                                </div>
                                                <div>
                                                    {!data.isVerified && (<Link href={`${process.env.FRONT_END_URL}/verifyemail?token=${data.verifyToken}`}><p className="text-blue-500 text-sm" >verify now</p></Link>)}
                                                </div>
                                            </div>

                                            <div className="flex justify-start items-center gap-1">
                                                <label className="font-semibold text-violet-800">User Type:</label>
                                                <p>{data.isAdmin ? "Admin" : "General"}</p>
                                            </div>

                                        </div>

                                        <div className="flex justify-center items-center mt-8 mb-7 gap-4">
                                            <button onClick={handleLogout} className="bg-violet-800 w-20 h-8 rounded text-sm text-white shadow-md">Logout</button>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                    )
            }
        </div>
    )
}

export default UserProfile
