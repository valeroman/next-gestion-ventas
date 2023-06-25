'use client';

import Link from "next/link";
import { redirect } from "next/navigation";

export default function LoginPage() {

    return (

        <div className='bg-white h-screen w-screen flex justify-center items-center'>
            <div className="px-6 py-3 rounded border w-64">
                <div className="flex flex-col items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h2 className="text-2xl font-bold">Login</h2>
                </div>
                <form action="#" method="POST">
                    <div className="flex flex-col my-2">
                        <label className="text-xs text-gray-400">Username</label>
                        <div className="text-xs text-red-400 flex justify-between items-center">
                            <span>
                                <b>Error: </b>
                                wrong username !
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <input
                            className="border rounded px-3 py-1 mt-2"
                            type="text"
                            // value="John"
                            // onChange={() => {}}
                            />
                    </div>
                    <div className="flex flex-col my-2">
                        <label className="text-xs text-gray-400">Password</label>
                        <input 
                            className="border rounded px-3 py-1 mt-2" 
                            type="password" 
                            // value="password" 
                        />
                    </div>
                    <Link href={'/dashboard/ventas'}>
                        <div className="flex flex-col items-center justify-center my-3">
                            
                                <button
                                    // onClick={ () => onClickButton() } 
                                    className="my-3 py-1 w-full rounded bg-blue-600 text-blue-200">
                                    Submit
                                </button>
                            
                            <p className="text-xs text-gray-500">
                                Forgot password ?
                                <a href="#" className="font-bold text-gray-700">Click here</a>
                                to reset your password.
                            </p>
                        </div>
                    </Link>
                </form>
            </div>
        </div>
    );
}