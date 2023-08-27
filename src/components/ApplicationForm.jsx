import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { AppBar, Box, Button, Container, CssBaseline, FormControl, FormLabel, InputLabel, MenuItem, Paper, Select, Toolbar } from '@mui/material';
import axios from 'axios';
import { links } from '../utils';
import { toast } from 'react-hot-toast';

export default function ApplicationForm(props) {
    const { app, heading, subHeading } = props;
    const [formData, setFormData] = React.useState({
        ...app[0]
    });

    const [doc, setDoc] = React.useState({
        ...app?.documents
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const toggleChange = (e) => {
        const { name, value } = e.target;

        console.log(formData[name]);

        setFormData((prevState) => ({
            ...prevState,
            [name]: !prevState[name]
        }));
    }

    const handleDocChange = (e) => {
        const { name, value } = e.target;
        setDoc((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData?.application_id) {
            toast.error('Application ID is required');
            return;
        }

        const data = {
            ...formData
        }

        console.log(data.physical_nach_data.createdAt);

        // make the API call
        if (subHeading === 'Create') {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: links.createApp,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            };

            try {
                const reponse = await axios.request(config);
                toast.success('Application has been created successfully.');

            } catch (err) {
                toast.error(err?.response?.data?.message);
                // console.log('ere-----', err?.response);
            }

        } else if (subHeading === 'Update') {
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: links.updateApp,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            };

            try {
                const reponse = await axios.request(config);
                toast.success('Application has been updated successfully.');

            } catch (err) {
                toast.error(err?.response?.data?.message);
                console.log('ere-----', err?.response);
            }
        }
    };

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
                        {heading}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        {subHeading}
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        Application details
                    </Typography>


                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField name="application_id" label="Application ID" disabled fullWidth variant="standard"
                                value={formData?.application_id}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="agent_code" label="Agent Code" fullWidth variant="standard"
                                value={formData?.agent_code}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField required name="customer_id" label="Customer ID" fullWidth variant="standard"
                                value={formData?.customer_id}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="nbfc_id" label="nbfc ID" fullWidth variant="standard"
                                value={formData?.nbfc_id}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField required name="anchor_id" label="Anchor ID" fullWidth variant="standard"
                                value={formData?.anchor_id}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="nbfc_loan_id" label="nbfc Loan ID" fullWidth variant="standard"
                                value={formData?.nbfc_loan_id}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <TextField required name="oem_id" label="OEM ID" fullWidth variant="standard"
                                value={formData?.oem_id}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="application_start_date" label="Application Start date" fullWidth variant="standard"
                                value={formData?.application_start_date}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField name="business_id" label="Business id" fullWidth variant="standard"
                                value={formData?.business_id}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField name="bank_details_id" label="Bank details ID" fullWidth variant="standard"
                                value={formData?.bank_details_id}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="origin" label="Origin" fullWidth variant="standard"
                                value={formData?.origin}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField name="loan_type" label="Loan type" fullWidth variant="standard"
                                value={formData?.loan_type}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="loan_version" label="Loan version" fullWidth variant="standard"
                                value={formData?.loan_version}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField name="loan_amount" label="Loan amount" fullWidth variant="standard"
                                value={formData?.loan_amount}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="interest_amount" label="Interest amount" fullWidth variant="standard"
                                value={formData?.interest_amount}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="processing_charge" label="Processing charge" fullWidth variant="standard"
                                value={formData?.processing_charge}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField name="processing_charge_rate" label="Processing charge rate" fullWidth variant="standard"
                                value={formData?.processing_charge_rate}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="processing_fee_paid" checked={formData?.processing_fee_paid} onClick={toggleChange} />
                            <FormLabel>Processing fee paid</FormLabel>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField name="processing_fee_mode" label="Processing fee mode" fullWidth variant="standard"
                                value={formData?.processing_fee_mode}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField name="subvention_amount" label="Subvention amount" fullWidth variant="standard"
                                value={formData?.subvention_amount}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField name="hold_back_amount" label="Hold back amount" fullWidth variant="standard"
                                value={formData?.hold_back_amount}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="down_payment" label="Down payment" fullWidth variant="standard"
                                value={formData?.down_payment}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="installment_amount" label="Installment amount" fullWidth variant="standard"
                                value={formData?.installment_amount}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField name="discount_amount" label="Discount amount" fullWidth variant="standard"
                                value={formData?.discount_amount}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="disbursed_amount" label="Disbursed amount" fullWidth variant="standard"
                                value={formData?.disbursed_amount}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="total_repayment" label="Total repayment" fullWidth variant="standard"
                                value={formData?.total_repayment}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField name="gst_amount" label="GST amount" fullWidth variant="standard"
                                value={formData?.gst_amount}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="is_disbursed" checked={formData?.is_disbursed} onClick={toggleChange} />
                            <FormLabel>is Disbursed</FormLabel>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField name="disbursed_date" label="Disbursed date" fullWidth variant="standard"
                                value={formData?.disbursed_date}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="rejection_date" label="Rejection date" fullWidth variant="standard"
                                value={formData?.rejection_date}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="tenure_type" label="Tenure type" fullWidth variant="standard"
                                value={formData?.tenure_type}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField name="gps_charges" label="GPS Charges" fullWidth variant="standard"
                                value={formData?.gps_charges}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="tenure_value" label="Tenure value" fullWidth variant="standard"
                                value={formData?.tenure_value}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="tranch_tenure_type" label="Tranch tenure type" fullWidth variant="standard"
                                value={formData?.tranch_tenure_type}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField name="tranch_tenure_value" label="Tranch tenure type" fullWidth variant="standard"
                                value={formData?.tranch_tenure_value}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="no_installments" label="No installments" fullWidth variant="standard"
                                value={formData?.no_installments}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="principal_amount" label="Principal amount" fullWidth variant="standard"
                                value={formData?.principal_amount}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField name="payment_basis" label="Payment basis" fullWidth variant="standard"
                                value={formData?.payment_basis}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="monthly_interest_rate" label="Monthly interest rate" fullWidth variant="standard"
                                value={formData?.monthly_interest_rate}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="annual_interest_rate" label="Annual interest rate" fullWidth variant="standard"
                                value={formData?.annual_interest_rate}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Esign status */}
                        <Grid item xs={12} sx={{ mt: 5, mb: -2 }}>
                            <Typography variant="h6" gutterBottom>
                                Esign status
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mb: -2 }}>
                            <Typography className='text-xs text-slate-400' gutterBottom>
                                Customer
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name={`esign_status?.["customer"]?.['generated']`} checked={formData?.esign_status?.customer?.generated} onClick={toggleChange} />
                            <FormLabel>Customer esign generated</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name={`esign_status?.["customer"]?.["signed"]`} checked={formData?.esign_status?.customer?.signed} onClick={toggleChange} />
                            <FormLabel>Customer esign signed</FormLabel>
                        </Grid>

                        <Grid item xs={12} sx={{ mb: -2 }}>
                            <Typography className='text-xs text-slate-400' gutterBottom>
                                Co-Customer
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name={`esign_status?.["co_customer"]?.['generated']`} checked={formData?.esign_status?.customer?.generated} onClick={toggleChange} />
                            <FormLabel>Co-Customer esign generated</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name={`esign_status?.["co_customer"]?.['signed']`} checked={formData?.esign_status?.customer?.signed} onClick={toggleChange} />
                            <FormLabel>Co-Customer esign signed</FormLabel>
                        </Grid>

                        {/* Credit Engine */}
                        <Grid item xs={12} sm={12} sx={{ mt: 5, mb: -2 }}>
                            <Typography variant="h6" gutterBottom>
                                Credit Engine data
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField name={``} label="NTC Status" fullWidth variant="standard"
                                value={formData?.credit_engine?.details?.NTC_status}
                                onChange={handleChange}
                            />
                        </Grid>

                        <>
                            <Box sx={{ mx: "auto" }}>
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {subHeading}
                                </Button>
                            </Box>
                        </>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
}