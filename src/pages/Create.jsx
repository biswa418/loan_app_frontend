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
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Create a user
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Create
                    </Typography>

                    <UserForm />
                </Paper>
            </Container>
        </>
    );
}