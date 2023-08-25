import { Card, CardMedia } from '@mui/material'
import React from 'react'
import { FaDochub, FaUserCircle, FaUserEdit } from 'react-icons/fa';

const Home = () => {
    return (
        <>
            <div className='w-10/12 mx-auto md:flex justify-around items-center md:p-20'>


                <div className='md:w-1/3 w-8/12 mx-auto'>
                    <img src="/wallet.png" />
                    {/* <a className='text-gray-200 text-xs' href="https://storyset.com/online">Online illustrations by Storyset</a> */}
                </div>

                <div className='md:flex flex-col justify-center ml-3 text-center'>
                    <h1 className='text-4xl font-bold text-slate-700 uppercase tracking-tight'>
                        CRUD a Loan Application
                    </h1>

                    <p className='text-slate-400'>
                        Navigate through the application and track changes.
                    </p>

                    <div className='flex mt-5 justify-between'>
                        <Card className='w-1/4 h-28 items-center flex flex-col'>
                            <FaUserCircle className='h-full text-4xl text-purple-500' />
                            User
                        </Card>
                        <Card className='w-1/4 text-sm items-center flex flex-col'>
                            <FaUserEdit className='h-full text-4xl text-purple-500' />
                            Co-User
                        </Card>
                        <Card className='w-1/4 text-sm items-center flex flex-col'>
                            <FaDochub className='h-full text-4xl text-purple-500' />
                            Application
                        </Card>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home