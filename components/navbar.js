"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
const Navbar = () => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const user = Cookies.get('user');
        if (user) {
            setAuth(true);
        }
    }, []);
    const router = useRouter();
    const handleLogout = () => {
        Cookies.remove("user");
        setAuth(false);
        router.push("/");
    };

    return (
        <div className='w-full flex-row ring-2'>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GoGlobe</span>
                    </Link>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        {auth ? (
                            <h3 className="text-sm text-gray-500 dark:text-white hover:underline cursor-pointer" onClick={handleLogout}>
                                Logout
                            </h3>
                        ) : (
                            <Link href="/booking/signup" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">
                                SignUp/Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Navbar;
