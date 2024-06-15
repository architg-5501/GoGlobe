"use client";
import React, { useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/router';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: '', type: '' });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            if (login) {
                res = await axios.post('/api/user/login', { email, password });
            } else {
                res = await axios.post('/api/user/register', { name, email, password });
            }

            if (res && res.data) {
                Cookies.set('user', res.data.token, { expires: 7 });

                setToast({
                    visible: true,
                    message: login ? 'Login successful!' : 'Signup successful!',
                    type: 'success'
                });

                setTimeout(() => {
                    setToast({ ...toast, visible: false });
                    router.back();
                }, 2000);
            }
        } catch (error) {
            setToast({
                visible: true,
                message: error.response ? error.response.data : error.message,
                type: 'danger'
            });

            setTimeout(() => {
                setToast({ ...toast, visible: false });
            }, 3000);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-700 p-4">
            <div className="container max-w-md mx-auto bg-white p-8 rounded shadow">
                <h1 className='text-center text-2xl text-black font-bold mb-4'>Enter Your Details</h1>
                <h2 className="text-2xl font-bold mb-4">{login ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    {!login && (
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                required
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        {login ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    {login ? (
                        <p className="text-black font-semibold">
                            Don't have an account?{' '}
                            <button
                                className="text-blue-500 hover:underline font-semibold"
                                onClick={() => setLogin(false)}
                            >
                                Sign Up
                            </button>
                        </p>
                    ) : (
                        <p className="text-black font-semibold">
                            Already have an account?{' '}
                            <button
                                className="text-blue-500 hover:underline font-semibold"
                                onClick={() => setLogin(true)}
                            >
                                Login
                            </button>
                        </p>
                    )}
                </div>
            </div>

            {/* Toast Notifications */}
            {toast.visible && (
                <div
                    id={`toast-${toast.type}`}
                    className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed top-5 left-1/2 transform -translate-x-1/2`}
                    role="alert"
                >
                    <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${toast.type === 'success' ? 'green' : 'red'}-500 bg-${toast.type === 'success' ? 'green' : 'red'}-100 rounded-lg dark:bg-${toast.type === 'success' ? 'green' : 'red'}-800 dark:text-${toast.type === 'success' ? 'green' : 'red'}-200`}>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d={toast.type === 'success' ? "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" : "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"} />
                        </svg>
                        <span className="sr-only">{toast.type === 'success' ? 'Check icon' : 'Error icon'}</span>
                    </div>
                    <div className="ms-3 text-sm font-normal">{toast.message}</div>
                    <button
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        data-dismiss-target={`#toast-${toast.type}`}
                        aria-label="Close"
                        onClick={() => setToast({ ...toast, visible: false })}
                    >
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default SignupPage;
