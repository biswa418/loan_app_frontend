import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import SwitchBase from '@mui/material/internal/SwitchBase';

export default function UserForm(props) {
    const { user } = props;

    const [formData, setFormData] = React.useState({
        origin: "",
        onboarded_nbfc: "",
        onboarded_anchor: "",
        onboarded_application: "",
        country_code: "",
        gender: "",
        email_id: "",
        dob: "",
        is_corporate: false,

        pan_number: "",
        pan_name: "",
        pan_father_name: "",
        pan_aadhar_linked: false,
        pan_aadhaar_matched: false,
        pan_dob: "",
        pan_is_business: false,

        corporate_pan_name: "",
        corporate_pan_number: "",
        corporate_pan_linked_pans: [],

        // residential_address: "",
        isAadhaarAddressSame: false,
        address: "",
        pincode: "",
        propertyOwned: false,
        city: "",
        district: "",
        state: "",

        //permanent address
        p_address: "",
        p_city: "",
        p_state: "",
        p_district: "",
        p_pincode: "",

        //aadhar
        verificationType: "",
        aadhaarName: "",
        aadhaarAddress: "",
        aadharGender: "",
        aadhar_id: "",

        // aadhar address -- more nested
        aadhar_add_address: "",
        aadhar_add_pincode: "",
        aadhar_add_state: "",
        aadhar_add_city: "",
        aadhar_add_district: "",

        //not nested -- aadhar
        UID: "",
        ageBand: "",
        maskedMobileNumber: "",
        isAadhaarAddressOwned: false,
        aadhar_father_name: null,
        aadhar_documents: null,
        aadhaarMobileMatched: "",

        // out of aadhar
        isPanUploaded: true,

        //kyc approval
        kycStatus: "",
        kycRemarks: "",
        kyc_embify_user: "",

        //other details
        otherIncome: "",
        otherEducation: "",
        otherReferences: "",
        otherFamily: "",
        drivingLicenseNumber: "",

        // normal
        sms_verified: "",
        creationStage: "",
        onboardingDate: "",
        customerId: "",
        mobile_number: ""
    });

    const [doc, setDoc] = React.useState({
        //documents -> aadhar back
        aadhar_back_name: "",
        aadhar_back_category: "",
        aadhar_back_fileLink: "",
        aadhar_back_uploadStatus: "",
        aadhar_back_uploadDateMS: "",
        aadhar_back_error: "",
        aadhar_back_isApproved: "",
        aadhar_back_meta_page_document: "",
        aadhar_back_completed: "",
        aadhar_back_page: "",
        aadhar_back_uploadedFrom: "",

        // documents -> aadhar front
        aadhar_front_name: "",
        aadhar_front_category: "",
        aadhar_front_fileLink: "",
        aadhar_front_uploadStatus: "",
        aadhar_front_uploadDateMS: "",
        aadhar_front_error: "",
        aadhar_front_isApproved: "",
        aadhar_front_meta_page_document: "",
        aadhar_front_completed: "",
        aadhar_front_page: "",
        aadhar_front_uploadedFrom: "",

        // pan
        pan_name: "",
        pan_category: "",
        pan_fileLink: "",
        pan_uploadStatus: "",
        pan_uploadDateMS: "",
        pan_error: "",
        pan_isApproved: "",
        pan_meta_page_document: "",
        pan_completed: "",
        pan_page: "",
        pan_uploadedFrom: "",

        // customer photo
        customer_name: "",
        customer_category: "",
        customer_fileLink: "",
        customer_uploadStatus: "",
        customer_uploadDateMS: "",
        customer_error: "",
        customer_isApproved: "",
        customer_meta_page_document: "",
        customer_completed: "",
        customer_page: "",
        customer_uploadedFrom: "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <>
            <Typography variant="h6" gutterBottom>
                User details
            </Typography>

            <Grid container spacing={3}>
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
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField required name="pan_name" label="Name on PAN" fullWidth variant="standard"
                        value={formData.pan_name}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField name="pan_father_name" label="Father's Name" fullWidth variant="standard"
                        value={formData.pan_father_name}
                    />
                </Grid>

                <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Checkbox name="pan_aadhar_linked" checked={formData.pan_aadhar_linked} onClick={toggleChange} />
                    <FormLabel>PAN Aadhar Linked</FormLabel>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Checkbox name="pan_aadhar_matched" checked={formData.pan_aadhar_matched} onClick={toggleChange} />
                    <FormLabel>PAN Aadhar Matched</FormLabel>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Checkbox name="pan_is_business" checked={formData.pan_is_business} onClick={toggleChange} />
                    <FormLabel>PAN is Business</FormLabel>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <TextField name="pan_dob" label="DOB" fullWidth variant="standard"
                        value={formData.pan_dob}
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
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="corporate_pan_name" label="Corporate PAN Name" fullWidth variant="standard"
                        value={formData.corporate_pan_name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="corporate_pan_linked_pans" label="Corporate PAN linked PANs" fullWidth variant="standard"
                        value={formData.corporate_pan_linked_pans?.[0]}
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
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField required name="city" label="City" fullWidth variant="standard"
                        value={formData.city}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField required name="district" label="District" fullWidth variant="standard"
                        value={formData.district}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField required name="state" label="State" fullWidth variant="standard"
                        value={formData.state}
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
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="p_pincode" label="Pincode" fullWidth variant="standard"
                        value={formData.p_pincode}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="p_city" label="City" fullWidth variant="standard"
                        value={formData.p_city}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="p_district" label="District" fullWidth variant="standard"
                        value={formData.p_district}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="p_state" label="State" fullWidth variant="standard"
                        value={formData.p_state}
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
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="aadhaarName" label="Aadhaar Name" fullWidth variant="standard"
                        value={formData.aadhaarName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField required name="aadhaarAddress" label="Aadhar Address" fullWidth variant="standard"
                        value={formData.aadhaarAddress}
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
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"Others"}>Others</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="aadhar_id" label="Aadhar ID" fullWidth variant="standard"
                        value={formData.aadhar_id}
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
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="aadhar_add_pincode" label="PIN Code" fullWidth variant="standard"
                        value={formData.aadhar_add_pincode}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="aadhar_add_city" label="City" fullWidth variant="standard"
                        value={formData.aadhar_add_city}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="aadhar_add_district" label="District" fullWidth variant="standard"
                        value={formData.aadhar_add_district}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="aadhar_add_state" label="State" fullWidth variant="standard"
                        value={formData.aadhar_add_state}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField required name="UID" label="UID" fullWidth variant="standard"
                        value={formData.UID}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="ageBand" label="Age Band" fullWidth variant="standard"
                        value={formData.ageBand}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required name="maskedMobileNumber" label="Mobile number" fullWidth variant="standard"
                        value={formData.maskedMobileNumber}
                    />
                </Grid>


                {/* //done */}

                <Grid item xs={12}>
                    <TextField required name="country_code" label="Country code" fullWidth variant="standard"
                        value={user?.country_code}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid>

                <>
                    <Box sx={{ mx: "auto" }}>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ mt: 3, ml: 1 }}
                        >
                            Create
                        </Button>
                    </Box>
                </>
            </Grid>
        </>
    );
}