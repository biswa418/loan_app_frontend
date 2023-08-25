import { Button, Container, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";

const Applications = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <Container maxWidth="sm" sx={{ mt: 10 }}>
                <TextField
                    id="search"
                    type="search"
                    label="Search for an application"
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
        </>
    )
}

export default Applications