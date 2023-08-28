import { Card, CardMedia } from '@mui/material'
import React, { Suspense, useEffect, useState } from 'react'
import { FaDochub, FaUserCircle, FaUserEdit } from 'react-icons/fa';
import { Loader } from '../components';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className='flex justify-center h-[80vh]'>
                <Loader />
            </div>
        )
    }

    return (
        <>
            <div className='w-10/12 mx-auto md:flex justify-around items-center md:p-20'>


                <div className='md:w-1/3 w-8/12 mx-auto'>
                    <Suspense fallback={<Loader />}>
                        <img src="/wallet.png" />
                    </Suspense>
                    {/* <a className='text-gray-200 text-xs' href="https://storyset.com/online">Online illustrations by Storyset</a> */}
                </div>

                <div className='md:flex flex-col justify-center ml-3 text-center'>
                    <h1 className='text-4xl font-bold text-slate-700 uppercase tracking-tight'>
                        CRUD a Loan Application
                    </h1>

                    <p className='text-slate-400'>
                        Navigate through the application and track changes.
                    </p>

                    <div className='flex mt-8 justify-between'>
                        <Card className='w-1/4 h-28 pb-2 items-center flex flex-col' >
                            <a href='/users/create' className='h-1/2 w-1/4 mt-4 '>
                                <FaUserCircle className='h-full text-4xl text-purple-500' />
                                <h2 className='text-sm whitespace-nowrap'>
                                    User
                                </h2>
                            </a>
                        </Card>
                        <Card className='w-1/4 h-28 pb-2 items-center justify-center flex flex-col'>
                            <a href='/couser/create' className='h-1/2 mb-5 ml-1'>
                                <FaUserEdit className='h-full text-4xl mx-auto text-purple-500' />
                                <h2 className='text-sm whitespace-nowrap'>
                                    Co-User
                                </h2>
                            </a>
                        </Card>
                        <Card className='w-1/4 h-28 pb-2 items-center justify-center flex flex-col'>
                            <a href='/apps/create' className='h-1/2 mb-5 ml-1'>
                                <FaDochub className='h-full text-4xl mx-auto text-purple-500' />
                                <h2 className='text-sm whitespace-nowrap'>
                                    Application
                                </h2>
                            </a>
                        </Card>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home