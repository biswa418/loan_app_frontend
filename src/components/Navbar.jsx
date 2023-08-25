import { Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Navbar = () => {
    const [value, setValue] = React.useState(0);
    const nav = useNavigate();

    const handleChange = (event, newValue) => {

        if (newValue === 0) {
            nav('/');
        } else if (newValue === 1) {
            nav('/users');
        } else if (newValue === 2) {
            nav('/apps');
        } else if (newValue === 3) {
            nav('/couser');
        } else {
            nav('/audits');
        }

        setValue(newValue);
    };

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <nav className={`navbar text-3xl uppercase font-semibold p-4`}>
                <h1>
                    Loan Audit Application
                </h1>
            </nav>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Home" />
                <Tab label="Users" />
                <Tab label="Applications" />
                <Tab label="Co Users" />
                <Tab label="Audits" />
            </Tabs>
        </>
    )
}

export default Navbar