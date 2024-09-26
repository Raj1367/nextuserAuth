"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post(`https://nextuserauth.netlify.app/api/users/verifyemail`, { token })
            setVerified(true);
        }

        catch (error: any) {
            setError(true);
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">

            <div className="flex flex-col gap-2">
                <h1 className="text-4xl text-center">Verify Email</h1>
                <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
            </div>

            <div>

                {verified && (
                    <div className="mt-4 flex flex-col gap-3">
                        <h2 className="text-2xl">Email Verified</h2>
                        <Link href="/userprofile">got back to profile</Link>
                    </div>
                )}

                {error && (
                    <div>
                        <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    </div>
                )}
            </div>


        </div>
    )
}
