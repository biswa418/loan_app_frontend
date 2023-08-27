import { Button, Container, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import { links } from '../utils';
import { ApplicationForm, Loader } from '../components';
import { toast } from 'react-hot-toast';


const Applications = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [apps, setApps] = useState([]);
    const [singleApp, setApp] = useState({});
    const [loadForm, setLoadForm] = useState(false);

    async function getApps() {
        const res = await axios.get(links["apps"]);
        setApps(res?.data?.apps);
        setLoading(false);

        return res?.data?.apps;
    }

    async function getApp(id) {
        const res = await axios.get(`${links["apps"]}${id}`);
        setApp(res?.data?.app);

        return res?.data?.app;
    }

    useEffect(() => {
        getApps();
    }, []);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    async function handleClick(e) {
        const user_here = await getApp(e.target.value);

        if (user_here) {
            setLoadForm(true);
            toast.success('Found Application');
        } else {
            toast.error('No user found');
        }
    }

    async function handleSubmit(e) {
        if (searchTerm) {
            const user_here = await getApp(searchTerm);

            if (user_here) {
                setLoadForm(true);
                toast.success('Found Application');
                return;
            }

            toast.error('No user found');
        } else {
            toast.error('Type something to search');
        }
    }

    if (loadForm) {
        return (
            <>
                <ApplicationForm app={singleApp} heading={'Update an Application'} subHeading={'Update'} />
            </>
        )
    }

    if (loading) {
        return (
            <div className='flex justify-center h-[80vh]'>
                <Loader />
            </div>
        )
    }

    return (
        <>
            <Container maxWidth="sm" sx={{ mt: 10 }}>
                <TextField
                    id="search"
                    type="search"
                    label="Search for an application"
                    value={searchTerm}
                    onChange={handleChange}
                    onPaste={handleChange}
                    sx={{ width: 550 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button value={searchTerm} onClick={handleSubmit}>
                                    <SearchIcon />
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </Container>

            {
                loading ? <Loader /> :

                    <div className='w-11/12 mx-auto mt-14'>
                        <h1 className='text-xl font-semibold mb-2 ml-2'>
                            LIST OF APPLICATIONS
                        </h1>

                        <table className="table-auto w-full border-2 gap-3">
                            <thead className='border-y-2'>
                                <tr>
                                    <th className='font-semibold border-r-2'>Application Date</th>
                                    <th className='font-semibold border-r-2'>Application ID</th>
                                    <th className='font-semibold border-r-2'>Customer ID</th>
                                    <th className='font-semibold'>Creation Stage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    apps.map((sinApp) => {
                                        return (
                                            <tr key={sinApp?.application_id} className='border-b-2'>
                                                <td className='text-center'>
                                                    {sinApp?.application_start_date}
                                                </td>
                                                <td className='text-center hover:cursor-pointer hover:text-cyan-600' >
                                                    <button value={sinApp?.application_id} onClick={(e) => handleClick(e)}>
                                                        {sinApp?.application_id}
                                                    </button>
                                                </td>
                                                <td className='text-center'>
                                                    {sinApp?.customer_id}
                                                </td>
                                                <td className='text-center'>
                                                    {sinApp?.creation_stage}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </>
    )
}

export default Applications