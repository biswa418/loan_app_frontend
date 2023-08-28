import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { AppBar, Box, Button, Container, CssBaseline, FormControl, FormLabel, InputLabel, MenuItem, Paper, Select, Toolbar } from '@mui/material';
import axios from 'axios';
import { links } from '../utils';
import { toast } from 'react-hot-toast';

export default function CoUserForm(props) {
    const { couser, heading, subHeading } = props;
    const [formData, setFormData] = React.useState({
        application_id: couser?.application_id ?? '',
        origin: couser?.origin ?? '',
        country_code: couser?.country_code ?? '',
        gender: couser?.gender ?? '',
        email_id: couser?.email_id ?? '',
        dob: couser?.dob ?? '',
        customer_type: couser?.customer_type ?? '',

        pan_number: couser?.pan_details?.number ?? '',
        pan_type: couser?.pan_details.pan_type ?? '',
        pan_name: couser?.pan_details?.name ?? '',
        pan_father_name: couser?.pan_details?.father_name ?? '',
        pan_masked_aadhar: couser?.pan_details?.masked_aadhaar ?? '',
        pan_aadhar_linked: couser?.pan_details?.pan_aadhaar_linked ?? false,
        pan_aadhaar_matched: couser?.pan_details?.pan_aadhaar_matched ?? false,
        pan_dob: couser?.pan_details?.dob ?? '',

        // residential_address: "" ?? '',
        isAadhaarAddressSame: couser?.residential_address?.is_aadhaar_address_same ?? false,
        address: couser?.residential_address?.address ?? '',
        pincode: couser?.residential_address?.pincode ?? '',
        propertyOwned: couser?.residential_address?.property_owned ?? false,
        city: couser?.residential_address?.city ?? '',
        district: couser?.residential_address?.district ?? '',
        state: couser?.residential_address?.state ?? '',

        //aadhar
        verificationType: couser?.aadhaar_details?.verification_type ?? '',
        aadhaarName: couser?.aadhaar_details?.name ?? '',
        aadhaarAddress: couser?.aadhaar_details?.address ?? '',
        aadharGender: couser?.aadhaar_details?.gender ?? '',
        aadhar_id: couser?.aadhaar_details?.id_number ?? '',

        // aadhar address -- more nested
        aadhar_add_address: couser?.aadhaar_details?.address_information?.address ?? '',
        aadhar_add_pincode: couser?.aadhaar_details?.address_information?.pincode ?? '',
        aadhar_add_state: couser?.aadhaar_details?.address_information?.state ?? '',
        aadhar_add_city: couser?.aadhaar_details?.address_information?.city ?? '',
        aadhar_add_district: couser?.aadhaar_details?.address_information?.district ?? '',

        //not nested -- aadhar
        UID: couser?.aadhaar_details?.UID ?? '',
        ageBand: couser?.aadhaar_details?.age_band ?? '',
        maskedMobileNumber: couser?.aadhaar_details?.masked_mobile_number ?? '',
        isAadhaarAddressOwned: couser?.aadhaar_details?.is_aadhaar_address_owned ?? false,
        aadhar_father_name: couser?.aadhaar_details?.father_name ?? '',
        aadhaarMobileMatched: couser?.aadhaar_details?.aadhaar_mobile_matched ?? false,

        // out of aadhar
        isPanUploaded: couser?.is_pan_uploaded ?? false,
        relation_with_borrower: couser?.relation_with_borrower ?? '',
        income: couser?.income ?? '',

        //credit engine
        ce_age: couser?.credit_engine?.details?.age ?? '',
        ce_age_status: couser?.credit_engine?.details?.age_status ?? '',
        ce_crif_pull: couser?.credit_engine?.details?.crif_pull ?? '',
        ce_crif_score: couser?.credit_engine?.details?.crif_score ?? '',

        //other details
        other_remark: couser?.other_details?.remark ?? '',

        // normal
        creationStage: couser?.creation_stage ?? '',
        onboardingDate: couser?.onboarding_date ?? '',
        customerId: couser?.customer_id ?? '',
        mobile_number: couser?.mobile_number ?? '',
    });

    const [doc, setDoc] = React.useState({
        //documents -> aadhar back
        aadhar_back_name: couser?.documents?.aadhaar_back?.name ?? '',
        aadhar_back_category: couser?.documents?.aadhaar_back?.category ?? '',
        aadhar_back_fileLink: couser?.documents?.aadhaar_back?.fileLink ?? '',
        aadhar_back_uploadStatus: couser?.documents?.aadhaar_back?.uploadStatus ?? false,
        aadhar_back_uploadDateMS: couser?.documents?.aadhaar_back?.uploadedDateMS ?? '',
        aadhar_back_error: couser?.documents?.aadhaar_back?.error ?? '',
        aadhar_back_isApproved: couser?.documents?.aadhaar_back?.isApproved ?? false,
        aadhar_back_meta_page_document: couser?.documents?.aadhaar_back?.meta_page_document ?? false,
        aadhar_back_completed: couser?.documents?.aadhaar_back?.completed ?? '',
        aadhar_back_page: couser?.documents?.aadhaar_back?.page ?? '',
        aadhar_back_uploadedFrom: couser?.documents?.aadhaar_back?.uploadedFrom ?? '',

        // documents -> aadhaar front
        aadhar_front_name: couser?.documents?.aadhaar_front?.name ?? '',
        aadhar_front_category: couser?.documents?.aadhaar_front?.category ?? '',
        aadhar_front_fileLink: couser?.documents?.aadhaar_front?.fileLink ?? '',
        aadhar_front_uploadStatus: couser?.documents?.aadhaar_front?.uploadStatus ?? false,
        aadhar_front_uploadDateMS: couser?.documents?.aadhaar_front?.uploadedDateMS ?? '',
        aadhar_front_error: couser?.documents?.aadhaar_front?.error ?? '',
        aadhar_front_isApproved: couser?.documents?.aadhaar_front?.isApproved ?? false,
        aadhar_front_meta_page_document: couser?.documents?.aadhaar_front?.meta_page_document ?? false,
        aadhar_front_completed: couser?.documents?.aadhaar_front?.completed ?? '',
        aadhar_front_page: couser?.documents?.aadhaar_front?.page ?? '',
        aadhar_front_uploadedFrom: couser?.documents?.aadhaar_front?.uploadedFrom ?? '',

        // pan
        pan_name: couser?.documents?.pan?.name ?? '',
        pan_category: couser?.documents?.pan?.category ?? '',
        pan_fileLink: couser?.documents?.pan?.fileLink ?? '',
        pan_uploadStatus: couser?.documents?.pan?.uploadStatus ?? false,
        pan_uploadDateMS: couser?.documents?.pan?.uploadedDateMS ?? '',
        pan_error: couser?.documents?.pan?.error ?? '',
        pan_isApproved: couser?.documents?.pan?.isApproved ?? false,
        pan_meta_page_document: couser?.documents?.pan?.meta_page_document ?? false,
        pan_completed: couser?.documents?.pan?.completed ?? '',
        pan_page: couser?.documents?.pan?.page ?? '',
        pan_uploadedFrom: couser?.documents?.pan?.uploadedFrom ?? '',

        // customer photo
        customer_name: couser?.documents?.co_customer_photo?.[0]?.name ?? '',
        customer_category: couser?.documents?.co_customer_photo?.[0]?.category ?? '',
        customer_fileLink: couser?.documents?.co_customer_photo?.[0]?.fileLink ?? '',
        customer_uploadStatus: couser?.documents?.co_customer_photo?.[0]?.uploadStatus ?? false,
        customer_uploadDateMS: couser?.documents?.co_customer_photo?.[0]?.uploadedDateMS ?? '',
        customer_error: couser?.documents?.co_customer_photo?.[0]?.error ?? '',
        customer_isApproved: couser?.documents?.co_customer_photo?.[0]?.isApproved ?? false,
        customer_meta_page_document: couser?.documents?.co_customer_photo?.[0]?.meta_page_document ?? false,
        customer_completed: couser?.documents?.co_customer_photo?.[0]?.completed ?? '',
        customer_page: couser?.documents?.co_customer_photo?.[0]?.page ?? '',
        customer_uploadedFrom: couser?.documents?.co_customer_photo?.[0]?.uploadedFrom ?? '',
        customer_rejection_reason: couser?.documents?.co_customer_photo?.[0]?.rejectionReason ?? '',
        ...couser
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
        if (!formData.customerId) {
            toast.error('Customer ID is required');
            return;
        }

        const data = {
            ...couser,
            application_id: formData.application_id,
            origin: formData.origin,
            country_code: formData.country_code,
            gender: formData.gender,
            email_id: formData.email_id === '' ? null : formData.email_id,
            dob: formData.dob,
            customer_type: formData.customer_type,
            pan_details: {
                pan_type: formData.pan_type,
                number: formData.pan_number,
                name: formData.pan_name,
                father_name: formData.pan_father_name === '' ? null : formData.pan_father_name,
                masked_aadhaar: formData.pan_masked_aadhar,
                pan_aadhaar_linked: formData.pan_aadhar_linked,
                pan_aadhaar_matched: formData.pan_aadhaar_matched,
                date_of_birth: formData.pan_dob === '' ? null : formData.pan_dob,
            },
            residential_address: {
                address: formData.address,
                pincode: formData.pincode,
                state: formData.state,
                city: formData.city,
                district: formData.district,
            },
            property_owned: formData?.propertyOwned ?? null,
            creation_stage: formData?.creationStage,
            aadhaar_details: {
                verification_type: formData.verificationType,
                is_aadhaar_address_owned: formData.isAadhaarAddressOwned,
                name: formData.aadhaarName,
                address: formData.aadhaarAddress,
                gender: formData.aadharGender,
                father_name: formData.aadhar_father_name === '' ? null : formData.aadhar_father_name,
                id_number: formData.aadhar_id,
                address_information: {
                    address: formData.aadhar_add_address,
                    pincode: formData.aadhar_add_pincode === '' ? null : formData.aadhar_add_pincode,
                    state: formData.aadhar_add_state,
                    city: formData.aadhar_add_city,
                    district: formData.aadhar_add_district,
                },
                UID: formData.UID,
                age_band: formData.ageBand,
                masked_mobile_number: formData.maskedMobileNumber,
                aadhaar_mobile_matched: formData.aadhaarMobileMatched
            },
            relation_with_borrower: formData.relation_with_borrower,
            income: formData.income === '' ? null : formData.income,
            education: formData?.education ?? null,
            credit_engine: {
                ...couser?.credit_engine,
                details: {
                    ...couser?.credit_engine?.details,
                    NTC_status: couser?.credit_engine?.details?.NTC_status,
                    aadhaar_distance: couser?.credit_engine?.details?.aadhaar_distance,
                    aadhaar_master_address: couser?.credit_engine?.details?.aadhaar_master_address,
                    age: formData?.ce_age,
                    age_status: formData?.ce_age_status,
                    crif_pull: formData?.ce_crif_pull,
                    crif_score: formData?.ce_crif_score,
                },
            },
            other_details: {
                remark: formData.other_remark === '' ? null : formData.other_remark,
            },
            sms_verified: formData.sms_verified,
            onboarding_date: new Date(formData.onboardingDate),
            customer_id: formData.customerId,
            documents: {
                ...couser?.documents,
                aadhaar_front: {
                    name: doc.aadhar_front_name,
                    category: doc.aadhar_front_category,
                    fileLink: doc.aadhar_front_fileLink,
                    uploadStatus: doc.aadhar_front_uploadStatus,
                    uploadedDateMS: Number(doc.aadhar_front_uploadDateMS),
                    error: doc.aadhar_front_error === '' ? null : aadhar_front_error,
                    isApproved: doc.aadhar_front_isApproved,
                    meta_page_document: doc.aadhar_front_meta_page_document,
                    completed: doc.aadhar_front_completed === '' ? null : doc.aadhar_front_completed,
                    page: doc.aadhar_front_page === '' ? null : doc.aadhar_front_page,
                    uploadedFrom: doc.aadhar_front_uploadedFrom
                },
                aadhaar_back: {
                    name: doc.aadhar_back_name,
                    category: doc.aadhar_back_category,
                    fileLink: doc.aadhar_back_fileLink,
                    uploadStatus: doc.aadhar_back_uploadStatus,
                    uploadedDateMS: Number(doc.aadhar_back_uploadDateMS),
                    error: doc.aadhar_back_error === '' ? null : doc.aadhar_back_error,
                    isApproved: doc.aadhar_back_isApproved,
                    meta_page_document: doc.aadhar_back_meta_page_document,
                    completed: doc.aadhar_back_completed === '' ? null : doc.aadhar_back_completed,
                    page: doc.aadhar_back_page === '' ? null : doc.aadhar_back_page,
                    uploadedFrom: doc.aadhar_back_uploadedFrom
                },
                pan: {
                    name: doc.pan_name,
                    category: doc.pan_category,
                    fileLink: doc.pan_fileLink,
                    uploadStatus: doc.pan_uploadStatus,
                    uploadedDateMS: Number(doc.pan_uploadDateMS),
                    error: doc.pan_error === '' ? null : doc.pan_error,
                    isApproved: doc.pan_isApproved,
                    meta_page_document: doc.pan_meta_page_document,
                    completed: doc.pan_completed === '' ? null : doc.pan_completed,
                    page: doc.pan_page === '' ? null : doc.pan_page,
                    uploadedFrom: doc.pan_uploadedFrom
                },
                co_customer_photo: [
                    {
                        name: doc.co_customer_name,
                        category: doc.co_customer_category,
                        fileLink: doc.co_customer_fileLink,
                        uploadStatus: doc.co_customer_uploadStatus,
                        uploadedDateMS: Number(doc.co_customer_uploadDateMS),
                        error: doc.customer_error === "" ? null : doc.co_customer_error,
                        isApproved: doc.co_customer_isApproved,
                        meta_page_document: doc.co_customer_meta_page_document,
                        completed: doc.co_customer_completed === "" ? null : doc.customer_completed,
                        page: doc.co_customer_page === "" ? null : doc.customer_page,
                        uploadedFrom: doc.co_customer_uploadedFrom,
                        rejectionReason: doc.co_customer_rejection_reason
                    }
                ]
            },
            mobile_number: formData.mobile_number === '' ? null : Number(formData.mobile_number)
        }

        // make the API call
        if (subHeading === 'Create') {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: links.createcoUser,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            };

            try {
                const reponse = await axios.request(config);
                toast.success('coUser has been created successfully.');

            } catch (err) {
                toast.error(err?.response?.data?.message);
            }

        } else if (subHeading === 'Update') {
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: links.updatecoUser,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            };

            try {
                const reponse = await axios.request(config);
                toast.success('coUser has been updated successfully.');

            } catch (err) {
                toast.error(err?.response?.data?.message);
                // console.log('ere-----', err?.response);
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
                <Toolbar className='flex justify-between'>
                    <Typography variant="h6" color="inherit" noWrap>
                        {heading}
                    </Typography>

                    <Typography variant="h6" color="purple" noWrap>
                        <a href='/' className='text-md'>
                            back
                        </a>
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        {subHeading}
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        couser details
                    </Typography>


                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField name="customerId" label="Customer ID" disabled={subHeading === 'Update' ? true : false} fullWidth variant="standard"
                                value={formData.customerId}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="application_id" label="Application ID" disabled={subHeading === 'Update' ? true : false} fullWidth variant="standard"
                                value={formData.application_id}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="origin" label="Origin" fullWidth variant="standard"
                                value={formData.origin}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField required name="customer_type" label="Customer type" fullWidth variant="standard"
                                value={formData.customer_type}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <TextField required name="country_code" label="Country code" fullWidth variant="standard"
                                value={formData.country_code}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Gender</InputLabel>
                                <Select labelId="Gender" value={formData.gender}
                                    label="Gender"
                                    name="gender"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={''} disabled>Choose an option</MenuItem>
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                    <MenuItem value={"Others"}>Others</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField name="email_id" label="Email id" fullWidth variant="standard"
                                value={formData.email_id}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField name="dob" label="DOB" fullWidth variant="standard"
                                value={formData.dob}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* PAN CARD */}
                        <Grid item xs={12} sm={12} sx={{ mt: 5, mb: -2 }}>
                            <Typography variant="h6" gutterBottom>
                                PAN Card details
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField required name="pan_type" label="PAN Type" fullWidth variant="standard"
                                value={formData.pan_type}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required name="pan_number" label="PAN Number" fullWidth variant="standard"
                                value={formData.pan_number}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required name="pan_name" label="Name on PAN" fullWidth variant="standard"
                                value={formData.pan_name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="pan_father_name" label="Father's Name" fullWidth variant="standard"
                                value={formData.pan_father_name}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="pan_aadhar_linked" checked={formData.pan_aadhar_linked} onClick={toggleChange} />
                            <FormLabel>PAN Aadhar Linked</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="pan_aadhaar_matched" checked={formData.pan_aadhaar_matched} onClick={toggleChange} />
                            <FormLabel>PAN Aadhar Matched</FormLabel>
                        </Grid>
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField name="pan_dob" label="DOB" fullWidth variant="standard"
                                value={formData.pan_dob}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Permanent Address */}
                        <Grid item xs={12} sx={{ mt: 5, mb: -2 }}>
                            <Typography variant="h6" gutterBottom>
                                Residential Address
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField required name="address" label="Address" fullWidth variant="standard"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="isAadhaarAddressSame" checked={formData.isAadhaarAddressSame} onClick={toggleChange} />
                            <FormLabel>Same as Aadhar</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="propertyOwned" checked={formData.propertyOwned} onClick={toggleChange} />
                            <FormLabel>Property owned</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField required name="pincode" label="Pincode" fullWidth variant="standard"
                                value={formData.pincode}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField required name="city" label="City" fullWidth variant="standard"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField required name="district" label="District" fullWidth variant="standard"
                                value={formData.district}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField required name="state" label="State" fullWidth variant="standard"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Aadhar */}
                        <Grid item xs={12} sx={{ mt: 5, mb: -2 }}>
                            <Typography variant="h6" gutterBottom>
                                Aadhar Details
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField required name="verificationType" label="Verification Type" fullWidth variant="standard"
                                value={formData.verificationType}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="aadhaarName" label="Aadhaar Name" fullWidth variant="standard"
                                value={formData.aadhaarName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required name="aadhaarAddress" label="Aadhar Address" fullWidth variant="standard"
                                value={formData.aadhaarAddress}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Gender</InputLabel>
                                <Select labelId="AadharGender" value={formData.aadharGender}
                                    label="Gender"
                                    name="aadharGender"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={''} disabled>Choose an option</MenuItem>
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                    <MenuItem value={"Others"}>Others</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="aadhar_id" label="Aadhar ID" fullWidth variant="standard"
                                value={formData.aadhar_id}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* address aadhar */}
                        <Grid item xs={12} sx={{ mt: 2, mb: -3 }}>
                            <Typography variant="h6" sx={{ fontSize: "1rem" }} gutterBottom>
                                Aadhar address Details
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField required name="aadhar_add_address" label="Address Type" fullWidth variant="standard"
                                value={formData.aadhar_add_address}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="aadhar_add_pincode" label="PIN Code" fullWidth variant="standard"
                                value={formData.aadhar_add_pincode}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="aadhar_add_city" label="City" fullWidth variant="standard"
                                value={formData.aadhar_add_city}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="aadhar_add_district" label="District" fullWidth variant="standard"
                                value={formData.aadhar_add_district}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="aadhar_add_state" label="State" fullWidth variant="standard"
                                value={formData.aadhar_add_state}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField required name="UID" label="UID" fullWidth variant="standard"
                                value={formData.UID}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="ageBand" label="Age Band" fullWidth variant="standard"
                                value={formData.ageBand}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="maskedMobileNumber" label="Mobile number" fullWidth variant="standard"
                                value={formData.maskedMobileNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="isAadhaarAddressOwned" checked={formData.isAadhaarAddressOwned} onClick={toggleChange} />
                            <FormLabel>Is Aadhar address owned</FormLabel>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField name="aadhar_father_name" label="(Aadhar) Father Name" fullWidth variant="standard"
                                value={formData.aadhar_father_name}
                                onChange={handleChange}
                            />
                        </Grid>


                        {/* other details */}
                        <Grid item xs={12} sx={{ mt: 5, mb: -2 }}>
                            <Typography variant="h6" gutterBottom>
                                Other details
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField name="relation_with_borrower" label="Relationship with borrower" fullWidth variant="standard"
                                value={formData.relation_with_borrower}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField name="income" label="Income" fullWidth variant="standard"
                                value={formData.income}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField name="ce_age" label="Credit engine age" fullWidth variant="standard"
                                value={formData.ce_age}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField name="ce_age_status" label="Credit engine age status" fullWidth variant="standard"
                                value={formData.ce_age_status}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField name="ce_crif_pull" label="CRIF pull" fullWidth variant="standard"
                                value={formData.ce_crif_pull}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField name="ce_crif_score" label="CRIF score" fullWidth variant="standard"
                                value={formData.ce_crif_score}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField name="onboardingDate" label="Onboarding date" fullWidth variant="standard"
                                value={formData.onboardingDate}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField name="other_remark" label="Other remarks" fullWidth variant="standard"
                                value={formData.other_remark}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField name="creationStage" label="Creation Stage" fullWidth variant="standard"
                                value={formData.creationStage}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField name="mobile_number" label="Mobile Number" fullWidth variant="standard"
                                value={formData.mobile_number}
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