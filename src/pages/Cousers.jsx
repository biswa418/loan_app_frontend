import { Button, Container, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import { links } from '../utils';
import { CoUserForm, Loader, UserForm } from '../components';
import { toast } from 'react-hot-toast';


const CoUsers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [cousers, setcoUsers] = useState([]);
    const [singlecoUser, setcoUser] = useState({});
    const [loadForm, setLoadForm] = useState(false);

    async function getcoUsers() {
        const res = await axios.get(links["cousers"]);
        setcoUsers(res?.data?.cousers);
        setLoading(false);

        return res?.data?.cousers;
    }

    async function getcoUser(id) {
        const res = await axios.get(`${links["cousers"]}/${id}`);
        setcoUser(res?.data?.couser);
        toast.success('Found Co-User.');


        return res?.data?.couser;
    }

    useEffect(() => {
        getcoUsers();
    }, []);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    async function handleClick(e) {
        const user_here = await getcoUser(e.target.value);

        if (user_here) {
            setLoadForm(true);
        } else {
            toast.error('No co-user found');
        }
    }

    async function handleSubmit(e) {
        if (searchTerm) {
            console.log(searchTerm);
            const user_here = await getcoUser(searchTerm);

            console.log(user_here);

            if (user_here) {
                setLoadForm(true);
                toast.success('Found co-user');
                return;
            }

            toast.error('No co-user found');
        } else {
            toast.error('Type something to search');
        }
    }

    if (loadForm) {
        return (
            <>
                <CoUserForm couser={singlecoUser} heading={'Update a co-user'} subHeading={'Update'} />
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
                    label="Search for a co-user"
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
                            LIST OF CO-USERS
                        </h1>

                        <table className="table-auto w-full border-2 gap-3">
                            <thead className='border-y-2'>
                                <tr>
                                    <th className='font-semibold border-r-2'>Customer ID</th>
                                    <th className='font-semibold border-r-2'>Application ID</th>
                                    <th className='font-semibold border-r-2'>Name</th>
                                    <th className='font-semibold'>DOB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cousers.map((couser) => {
                                        return (
                                            <tr key={couser?.customer_id} className='border-b-2'>
                                                <td className='text-center'>
                                                    {couser?.customer_id}
                                                </td>
                                                <td className='text-center hover:cursor-pointer hover:text-cyan-600' >
                                                    <button value={couser?.application_id} onClick={(e) => handleClick(e)}>
                                                        {couser?.application_id}
                                                    </button>
                                                </td>
                                                <td className='text-center'>
                                                    {couser?.pan_details?.name}
                                                </td>
                                                <td className='text-center'>
                                                    {couser?.dob}
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

export default CoUsers