import { Button, Container, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import { links } from '../utils';
import { Loader } from '../components';

const Audit = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [audits, setAudits] = useState([]);

    async function getAudits() {
        const res = await axios.get(links["audits"]);
        setAudits(res?.data?.audits);
        setLoading(false);
        console.log(audits);
    }

    useEffect(() => {
        getAudits();
    }, []);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <Container maxWidth="sm" sx={{ mt: 10 }}>
                <TextField
                    id="search"
                    type="search"
                    label="Search for an audit"
                    value={searchTerm}
                    onChange={handleChange}
                    sx={{ width: 550 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button>
                                    <SearchIcon />
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </Container>

            {
                loading ?
                    <div className='flex justify-center h-[40vh]'>
                        <Loader />
                    </div>

                    :

                    <div className='w-11/12 mx-auto mt-14'>
                        <h1 className='text-xl font-semibold mb-2 ml-2'>
                            LIST OF AUDITS
                        </h1>

                        <table className="table-auto w-full overflow-hidden border-2 gap-3 mb-10">
                            <thead>
                                <tr className='border-y-2'>
                                    <th className='font-semibold'>Updated at</th>
                                    <th className='font-semibold'>CustomerID</th>
                                    <th className='font-semibold'>Updates</th>
                                    <th className='font-semibold'>Parameters</th>
                                    <th className='font-semibold'>Changes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    audits.map((audit) => {
                                        return (
                                            <tr key={audit?._id} className='max-h-4 overflow-hidden'>
                                                <td className='text-center p-2 border-2'>
                                                    {audit?.updatedAt}
                                                </td>
                                                <td className='text-center border-2 p-2 hover:cursor-pointer hover:text-cyan-600' >
                                                    {audit?.user}
                                                </td>
                                                <td className='text-center border-2 p-2'>
                                                    {audit?.updates}
                                                </td>

                                                <td className='border-2 gap-2 p-2'>
                                                    {
                                                        audit?.changes?.map((change) => {
                                                            return (
                                                                <div key={change.field} className='mb-4 text-left'>
                                                                    <div className='border-b-2'>
                                                                        field
                                                                    </div>
                                                                    <div className='border-b-2'>
                                                                        oldValue
                                                                    </div>
                                                                    <div className=''>
                                                                        newValue
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </td>

                                                <td className='border-2 h-10 max-w-xs overflow-hidden whitespace-normal break-words'>
                                                    {
                                                        audit?.changes?.map((change) => {
                                                            return (
                                                                <div key={change.field} className='h-18 py-4 px-7 border-2 overflow-hidden hover:overflow-scroll'>
                                                                    <div className='text-left whitespace-normal break-words'>
                                                                        {change.field}
                                                                    </div>
                                                                    <div className='text-left whitespace-normal break-words my-2'>
                                                                        {JSON.stringify(change.oldValue)}
                                                                    </div>
                                                                    <div className='text-left whitespace-normal break-words'>
                                                                        {JSON.stringify(change.newValue)}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </td>
                                            </tr >
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div >
            }
        </>
    )
}

export default Audit