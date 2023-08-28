import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { AppBar, Box, Button, Container, CssBaseline, FormControl, FormLabel, InputLabel, MenuItem, Paper, Select, Toolbar } from '@mui/material';
import axios from 'axios';
import { links } from '../utils';
import { toast } from 'react-hot-toast';

export default function UserForm(props) {
    const { user, heading, subHeading } = props;
    const [formData, setFormData] = React.useState({
        origin: user?.origin ?? '',
        onboarded_nbfc: user?.onboarded_nbfc ?? '',
        onboarded_anchor: user?.onboarded_anchor ?? '',
        onboarded_application: user?.onboarded_application ?? '',
        country_code: user?.country_code ?? '',
        gender: user?.gender ?? '',
        email_id: user?.email_id ?? '',
        dob: user?.dob ?? '',
        is_corporate: user?.is_corporate ?? false,

        pan_number: user?.pan_details?.number ?? '',
        pan_name: user?.pan_details?.name ?? '',
        pan_father_name: user?.pan_details?.father_name ?? '',
        pan_masked_aadhar: user?.pan_details?.masked_aadhaar ?? '',
        pan_aadhar_linked: user?.pan_details?.pan_aadhaar_linked ?? false,
        pan_aadhaar_matched: user?.pan_details?.pan_aadhaar_matched ?? false,
        pan_dob: user?.pan_details?.dob ?? '',
        pan_is_business: user?.pan_details?.is_business ?? false,

        corporate_pan_name: user?.corporate_pan_details?.name ?? '',
        corporate_pan_number: user?.corporate_pan_details?.number ?? '',
        corporate_pan_linked_pans: user?.corporate_pan_details?.linked_pans ?? [],

        // residential_address: "" ?? '',
        isAadhaarAddressSame: user?.residential_address?.is_aadhaar_address_same ?? false,
        address: user?.residential_address?.address ?? '',
        pincode: user?.residential_address?.pincode ?? '',
        propertyOwned: user?.residential_address?.property_owned ?? false,
        city: user?.residential_address?.city ?? '',
        district: user?.residential_address?.district ?? '',
        state: user?.residential_address?.state ?? '',

        //permanent address
        p_address: user?.permanent_address?.address ?? '',
        p_city: user?.permanent_address?.city ?? '',
        p_state: user?.permanent_address?.state ?? '',
        p_district: user?.permanent_address?.district ?? '',
        p_pincode: user?.permanent_address?.pincode ?? '',

        //aadhar
        verificationType: user?.aadhaar_details?.verification_type ?? '',
        aadhaarName: user?.aadhaar_details?.name ?? '',
        aadhaarAddress: user?.aadhaar_details?.address ?? '',
        aadharGender: user?.aadhaar_details?.gender ?? '',
        aadhar_id: user?.aadhaar_details?.id_number ?? '',

        // aadhar address -- more nested
        aadhar_add_address: user?.aadhaar_details?.address_information?.address ?? '',
        aadhar_add_pincode: user?.aadhaar_details?.address_information?.pincode ?? '',
        aadhar_add_state: user?.aadhaar_details?.address_information?.state ?? '',
        aadhar_add_city: user?.aadhaar_details?.address_information?.city ?? '',
        aadhar_add_district: user?.aadhaar_details?.address_information?.district ?? '',

        //not nested -- aadhar
        UID: user?.aadhaar_details?.UID ?? '',
        ageBand: user?.aadhaar_details?.age_band ?? '',
        maskedMobileNumber: user?.aadhaar_details?.masked_mobile_number ?? '',
        isAadhaarAddressOwned: user?.aadhaar_details?.is_aadhaar_address_owned ?? false,
        aadhar_father_name: user?.aadhaar_details?.father_name ?? '',
        aadhar_documents: user?.aadhaar_details?.documents ?? '',
        aadhaarMobileMatched: user?.aadhaar_details?.aadhaar_mobile_matched ?? false,

        // out of aadhar
        isPanUploaded: user?.is_pan_uploaded ?? false,

        //kyc approval
        kycStatus: user?.kyc_approval_details?.status ?? false,
        kycRemarks: user?.kyc_approval_details?.remarks ?? '',
        kyc_embify_user: user?.kyc_approval_details?.embifi_user ?? '',

        //other details
        otherIncome: user?.other_details?.income ?? '',
        otherEducation: user?.other_details?.education ?? '',
        otherReferences: user?.other_details?.references ?? '',
        otherFamily: user?.other_details?.family ?? '',
        drivingLicenseNumber: user?.other_details?.driving_license_number ?? '',

        // normal
        sms_verified: user?.sms_verified ?? false,
        creationStage: user?.creation_stage ?? '',
        onboardingDate: user?.onboarding_date ?? '',
        customerId: user?.customer_id ?? '',
        mobile_number: user?.mobile_number ?? '',
    });

    const [doc, setDoc] = React.useState({
        //documents -> aadhar back
        aadhar_back_name: user?.documents?.aadhaar_back?.name ?? '',
        aadhar_back_category: user?.documents?.aadhaar_back?.category ?? '',
        aadhar_back_fileLink: user?.documents?.aadhaar_back?.fileLink ?? '',
        aadhar_back_uploadStatus: user?.documents?.aadhaar_back?.uploadStatus ?? false,
        aadhar_back_uploadDateMS: user?.documents?.aadhaar_back?.uploadedDateMS ?? '',
        aadhar_back_error: user?.documents?.aadhaar_back?.error ?? '',
        aadhar_back_isApproved: user?.documents?.aadhaar_back?.isApproved ?? false,
        aadhar_back_meta_page_document: user?.documents?.aadhaar_back?.meta_page_document ?? false,
        aadhar_back_completed: user?.documents?.aadhaar_back?.completed ?? '',
        aadhar_back_page: user?.documents?.aadhaar_back?.page ?? '',
        aadhar_back_uploadedFrom: user?.documents?.aadhaar_back?.uploadedFrom ?? '',

        // documents -> aadhaar front
        aadhar_front_name: user?.documents?.aadhaar_front?.name ?? '',
        aadhar_front_category: user?.documents?.aadhaar_front?.category ?? '',
        aadhar_front_fileLink: user?.documents?.aadhaar_front?.fileLink ?? '',
        aadhar_front_uploadStatus: user?.documents?.aadhaar_front?.uploadStatus ?? false,
        aadhar_front_uploadDateMS: user?.documents?.aadhaar_front?.uploadedDateMS ?? '',
        aadhar_front_error: user?.documents?.aadhaar_front?.error ?? '',
        aadhar_front_isApproved: user?.documents?.aadhaar_front?.isApproved ?? false,
        aadhar_front_meta_page_document: user?.documents?.aadhaar_front?.meta_page_document ?? false,
        aadhar_front_completed: user?.documents?.aadhaar_front?.completed ?? '',
        aadhar_front_page: user?.documents?.aadhaar_front?.page ?? '',
        aadhar_front_uploadedFrom: user?.documents?.aadhaar_front?.uploadedFrom ?? '',

        // pan
        pan_name: user?.documents?.pan?.name ?? '',
        pan_category: user?.documents?.pan?.category ?? '',
        pan_fileLink: user?.documents?.pan?.fileLink ?? '',
        pan_uploadStatus: user?.documents?.pan?.uploadStatus ?? false,
        pan_uploadDateMS: user?.documents?.pan?.uploadedDateMS ?? '',
        pan_error: user?.documents?.pan?.error ?? '',
        pan_isApproved: user?.documents?.pan?.isApproved ?? false,
        pan_meta_page_document: user?.documents?.pan?.meta_page_document ?? false,
        pan_completed: user?.documents?.pan?.completed ?? '',
        pan_page: user?.documents?.pan?.page ?? '',
        pan_uploadedFrom: user?.documents?.pan?.uploadedFrom ?? '',

        // customer photo
        customer_name: user?.documents?.customer_photo[0]?.name ?? '',
        customer_category: user?.documents?.customer_photo[0]?.category ?? '',
        customer_fileLink: user?.documents?.customer_photo[0]?.fileLink ?? '',
        customer_uploadStatus: user?.documents?.customer_photo[0]?.uploadStatus ?? false,
        customer_uploadDateMS: user?.documents?.customer_photo[0]?.uploadedDateMS ?? '',
        customer_error: user?.documents?.customer_photo[0]?.error ?? '',
        customer_isApproved: user?.documents?.customer_photo[0]?.isApproved ?? false,
        customer_meta_page_document: user?.documents?.customer_photo[0]?.meta_page_document ?? false,
        customer_completed: user?.documents?.customer_photo[0]?.completed ?? '',
        customer_page: user?.documents?.customer_photo[0]?.page ?? '',
        customer_uploadedFrom: user?.documents?.customer_photo[0]?.uploadedFrom ?? '',
        customer_rejection_reason: user?.documents?.customer_photo[0]?.rejectionReason ?? '',
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
            origin: formData.origin,
            onboarded_nbfc: formData.onboarded_nbfc,
            onboarded_anchor: formData.onboarded_anchor,
            onboarded_application: formData.onboarded_application,
            country_code: formData.country_code,
            gender: formData.gender,
            email_id: formData.email_id === '' ? null : formData.email_id,
            dob: formData.dob,
            is_corporate: formData.is_corporate,
            pan_details: {
                number: formData.pan_number,
                name: formData.pan_name,
                father_name: formData.pan_father_name === '' ? null : formData.pan_father_name,
                masked_aadhaar: formData.pan_masked_aadhar,
                pan_aadhaar_linked: formData.pan_aadhar_linked,
                pan_aadhaar_matched: formData.pan_aadhaar_matched,
                dob: formData.pan_dob === '' ? null : formData.pan_dob,
                is_business: formData.pan_is_business
            },
            corporate_pan_details: {
                name: formData.corporate_pan_name === '' ? null : formData.corporate_pan_name,
                number: formData.corporate_pan_number === '' ? null : formData.corporate_pan_number,
                linked_pans: formData.corporate_pan_linked_pans
            },
            residential_address: {
                is_aadhaar_address_same: formData.isAadhaarAddressSame,
                address: formData.address,
                pincode: formData.pincode,
                property_owned: formData.propertyOwned,
                city: formData.city,
                district: formData.district,
                state: formData.state
            },
            permanent_address: {
                address: formData.p_address === '' ? null : formData.p_address,
                city: formData.p_city === '' ? null : formData.p_city,
                state: formData.p_state === '' ? null : formData.p_state,
                district: formData.p_district === '' ? null : formData.p_district,
                pincode: formData.p_pincode === '' ? null : formData.p_pincode,
            },
            aadhaar_details: {
                verification_type: formData.verificationType,
                name: formData.aadhaarName,
                address: formData.aadhaarAddress,
                gender: formData.aadharGender,
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
                is_aadhaar_address_owned: formData.isAadhaarAddressOwned,
                father_name: formData.aadhar_father_name === '' ? null : formData.aadhar_father_name,
                documents: formData.aadhar_documents === '' ? null : formData.aadhar_documents,
                aadhaar_mobile_matched: formData.aadhaarMobileMatched
            },
            is_pan_uploaded: formData.isPanUploaded,
            kyc_approval_details: {
                status: formData.kycStatus,
                remarks: formData.kycRemarks === '' ? null : formData.kycRemarks,
                embifi_user: formData.kyc_embify_user === '' ? null : formData.kyc_embify_user
            },
            other_details: {
                income: formData.otherIncome === '' ? null : formData.otherIncome,
                education: formData.otherEducation === '' ? null : formData.otherEducation,
                references: formData.otherReferences === '' ? null : formData.otherReferences,
                family: formData.otherFamily === '' ? null : formData.otherFamily,
                driving_license_number: formData.drivingLicenseNumber === '' ? null : formData.drivingLicenseNumber
            },
            sms_verified: formData.sms_verified,
            creation_stage: formData.creationStage,
            onboarding_date: new Date(formData.onboardingDate),
            customer_id: formData.customerId,
            documents: {
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
                customer_photo: [
                    {
                        name: doc.customer_name,
                        category: doc.customer_category,
                        fileLink: doc.customer_fileLink,
                        uploadStatus: doc.customer_uploadStatus,
                        uploadedDateMS: Number(doc.customer_uploadDateMS),
                        error: doc.customer_error === '' ? null : doc.customer_error,
                        isApproved: doc.customer_isApproved,
                        meta_page_document: doc.customer_meta_page_document,
                        completed: doc.customer_completed === '' ? null : doc.customer_completed,
                        page: doc.customer_page === '' ? null : doc.customer_page,
                        uploadedFrom: doc.customer_uploadedFrom,
                        rejectionReason: doc.customer_rejection_reason
                    }
                ]
            },
            mobile_number: formData.mobile_number === '' ? null : Number(formData.mobile_number)
        }

        if (!data.customer_id) {
            toast.error('Customer ID is required');
            return;
        }

        // make the API call
        if (subHeading === 'Create') {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: links.createUser,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            };

            try {
                const reponse = await axios.request(config);
                toast.success('User has been created successfully.');

            } catch (err) {
                toast.error(err?.response?.data?.message);
                // console.log('ere-----', err?.response);
            }

        } else if (subHeading === 'Update') {
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: links.updateUser,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            };

            try {
                const reponse = await axios.request(config);
                toast.success('User has been updated successfully.');

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
                        User details
                    </Typography>


                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField name="customerId" disabled={subHeading === 'Update' ? true : false} label="Customer ID" fullWidth variant="standard"
                                value={formData.customerId}
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
                            <TextField required name="onboarded_nbfc" label="Onboarded nbfc" fullWidth variant="standard"
                                value={formData.onboarded_nbfc}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField required name="onboarded_anchor" label="Onboarded anchor" fullWidth variant="standard"
                                value={formData.onboarded_anchor}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="onboarded_application" label="Onboarded application" fullWidth variant="standard"
                                value={formData.onboarded_application}
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
                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="is_corporate" checked={formData.is_corporate} onClick={toggleChange} />
                            <FormLabel>is Corporate?</FormLabel>
                        </Grid>

                        {/* PAN CARD */}
                        <Grid item xs={12} sm={12} sx={{ mt: 5, mb: -2 }}>
                            <Typography variant="h6" gutterBottom>
                                PAN Card details
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField required name="pan_number" label="PAN Number" fullWidth variant="standard"
                                value={formData.pan_number}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField required name="pan_name" label="Name on PAN" fullWidth variant="standard"
                                value={formData.pan_name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="pan_father_name" label="Father's Name" fullWidth variant="standard"
                                value={formData.pan_father_name}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="pan_aadhar_linked" checked={formData.pan_aadhar_linked} onClick={toggleChange} />
                            <FormLabel>PAN Aadhar Linked</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="pan_aadhaar_matched" checked={formData.pan_aadhaar_matched} onClick={toggleChange} />
                            <FormLabel>PAN Aadhar Matched</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="pan_is_business" checked={formData.pan_is_business} onClick={toggleChange} />
                            <FormLabel>PAN is Business</FormLabel>
                        </Grid>
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField name="pan_dob" label="DOB" fullWidth variant="standard"
                                value={formData.pan_dob}
                                onChange={handleChange}
                            />
                        </Grid>


                        {/* CORPORATE PAN */}
                        <Grid item xs={12} sm={12} sx={{ mt: 5, mb: -2 }}>
                            <Typography variant="h6" gutterBottom>
                                Corporate PAN Cards details
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField name="corporate_pan_number" label="Corporate PAN Number" fullWidth variant="standard"
                                value={formData.corporate_pan_number}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="corporate_pan_name" label="Corporate PAN Name" fullWidth variant="standard"
                                value={formData.corporate_pan_name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="corporate_pan_linked_pans" label="Corporate PAN linked PANs" fullWidth variant="standard"
                                value={formData.corporate_pan_linked_pans?.[0]}
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

                        {/* Permanent Address */}
                        <Grid item xs={12} sx={{ mt: 5, mb: -2 }}>
                            <Typography variant="h6" gutterBottom>
                                Permanent Address
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField required name="p_address" label="Address" fullWidth variant="standard"
                                value={formData.p_address}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="p_pincode" label="Pincode" fullWidth variant="standard"
                                value={formData.p_pincode}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="p_city" label="City" fullWidth variant="standard"
                                value={formData.p_city}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="p_district" label="District" fullWidth variant="standard"
                                value={formData.p_district}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required name="p_state" label="State" fullWidth variant="standard"
                                value={formData.p_state}
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
                                    <MenuItem value={"MALE"}>Male</MenuItem>
                                    <MenuItem value={"FEMALE"}>Female</MenuItem>
                                    <MenuItem value={"OTHERS"}>Others</MenuItem>
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

                        <Grid item xs={12} sm={4}>
                            <TextField name="aadhar_father_name" label="(Aadhar) Father Name" fullWidth variant="standard"
                                value={formData.aadhar_father_name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="aadhar_documents" label="Aadhar Documents" fullWidth variant="standard"
                                value={formData.aadhar_documents}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="aadhaarMobileMatched" checked={formData.aadhaarMobileMatched} onClick={toggleChange} />
                            <FormLabel>Is Aadhar address owned</FormLabel>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="isPanUploaded" checked={formData.isPanUploaded} onClick={toggleChange} />
                            <FormLabel>Is PAN uploaded</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="kycStatus" checked={formData.kycStatus} onClick={toggleChange} />
                            <FormLabel>KYC Status</FormLabel>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox name="sms_verified" checked={formData.sms_verified} onClick={toggleChange} />
                            <FormLabel>SMS Verified</FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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