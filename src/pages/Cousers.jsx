import { Button, Container, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import { links } from '../utils';
import { Loader, UserForm } from '../components';
import { toast } from 'react-hot-toast';


const CoUsers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [singleUser, setUser] = useState({});
    const [loadForm, setLoadForm] = useState(false);

    async function getUsers() {
        const res = await axios.get(links["users"]);
        setUsers(res?.data?.users);
        setLoading(false);

        return res?.data?.users;
    }

    async function getUser(id) {
        const res = await axios.get(`${links["user"]}${id}`);
        setUser(res?.data?.user);

        return res?.data?.user;
    }

    useEffect(() => {
        getUsers();
    }, []);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    async function handleClick(e) {
        const user_here = await getUser(e.target.value);

        if (user_here) {
            setLoadForm(true);
        } else {
            toast.error('No user found');
        }
    }

    async function handleSubmit(e) {
        if (searchTerm) {
            const user_here = await getUser(searchTerm);

            if (user_here) {
                setLoadForm(true);
                toast.success('Found user');
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
                <UserForm user={singleUser} heading={'Update a user'} subHeading={'Update'} />
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
                    label="Search for a user"
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
                            LIST OF USERS
                        </h1>

                        <table className="table-auto w-full border-2 gap-3">
                            <thead className='border-y-2'>
                                <tr>
                                    <th className='font-semibold border-r-2'>Origin</th>
                                    <th className='font-semibold border-r-2'>CustomerID</th>
                                    <th className='font-semibold border-r-2'>Name</th>
                                    <th className='font-semibold'>DOB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user) => {
                                        return (
                                            <tr key={user?.customer_id} className='border-b-2'>
                                                <td className='text-center'>
                                                    {user?.origin}
                                                </td>
                                                <td className='text-center hover:cursor-pointer hover:text-cyan-600' >
                                                    <button value={user?.customer_id} onClick={(e) => handleClick(e)}>
                                                        {user?.customer_id}
                                                    </button>
                                                </td>
                                                <td className='text-center'>
                                                    {user?.pan_details?.name}
                                                </td>
                                                <td className='text-center'>
                                                    {user?.dob}
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