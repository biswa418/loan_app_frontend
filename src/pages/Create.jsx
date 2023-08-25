import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UserForm } from '../components';

function getStepContent(step) {
    switch (step) {
        case 0:
            return <UserForm />;
        default:
            throw new Error('Unknown step');
    }
}

function handleCreate() {

}

export default function Create() {
    const [deactive, setDeactive] = React.useState(false);


    return (
        <>
            <UserForm heading={'Create a user'} subHeading={'Create'} />
        </>
    );
}