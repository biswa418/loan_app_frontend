import { Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
        } else {
            nav('/couser')
        }

        setValue(newValue);
    };

    return (
        <>
            <nav className={`navbar text-3xl uppercase font-semibold p-4`}>
                <h1>
                    Loan Application
                </h1>
            </nav>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Home" />
                <Tab label="Users" />
                <Tab label="Applications" />
                <Tab label="Co Users" />
            </Tabs>
        </>
    )
}

export default Navbar