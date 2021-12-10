import React from 'react';
import { Component } from 'react';
import { Grid, Button, Typography, Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Form, Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import SkipIcon from '../../icons/skip-icon@3x.png';
import InputAdornment from '@material-ui/core/InputAdornment';

/**Renders customer data form */
class CustomerDataForm extends Component {
    render() {
        const { onProceed, customerData, handleSkip } = this.props;
        const btnStyle = { float: 'right' }

        //Customer form data validation
        const validationSchema = Yup.object().shape(
            {
                fullName: Yup.string().required("Required"),
                phoneNumber: Yup.number().typeError("Enter in numbers").required("Required"),
                address: Yup.string().required("Required"),
                email: Yup.string().email("Enter valid email id").required("Required"),
                pinCode: Yup.number().typeError("Enter in numbers").required("Required")
            }
        )
        return (
            <Box >
                <Grid container>
                    <Grid item md={6} ><Typography style={{ paddingBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>CUSTOMER DETAILS</Typography></Grid>
                    <Grid item md={6} style={{ paddingBottom: '5px', marginTop: '0px' }}>
                        <Button style={btnStyle} onClick={(e) => handleSkip(e)}><Typography style={{ fontSize: '15px', color: 'skyblue', fontWeight: 'bolder' }}>Skip</Typography>
                            &nbsp;<img src={SkipIcon} alt="skip-icon" style={{ float: 'right', height: 20, width: 20 }}></img></Button>
                    </Grid>
                </Grid>
                <hr />
                <Formik initialValues={customerData} validationSchema={validationSchema}>
                    {(props) => (
                        <Form onSubmit={(event) => onProceed(event, props.values)} >
                            <Grid container style={{ paddingTop: '20px' }} >
                                {/* <Grid container direction="row" spacing={2}>  */}
                                <Grid item md={6} style={{ padding: '0px 20px 20px 0px' }}>
                                    <Typography>Full Name&nbsp;*</Typography>
                                    <Field as={TextField} name="fullName" variant="outlined"
                                        placeholder='Customer Name'
                                        error={props.errors.fullName && props.touched.fullName}
                                        helpertext={<ErrorMessage name="fullName" />} required size="medium" fullWidth />
                                </Grid>
                                <Grid item md={6} style={{ padding: '0px 10px 20px 20px' }}>
                                    <Typography>Phone Number&nbsp;*</Typography>
                                    <Field as={TextField} name="phoneNumber" variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    +91
                                                </InputAdornment>
                                            ),
                                        }}
                                        error={props.errors.phoneNumber && props.touched.phoneNumber}
                                        helpertext={<ErrorMessage name="phoneNumber" />} required size="medium" fullWidth />
                                </Grid>
                                <Grid item md={6} style={{ padding: '0px 20px 20px 0px' }}>
                                    <Typography>Address</Typography>
                                    <Field as={TextField} multiline name="address" variant="outlined" rows={6}
                                        placeholder="Complete Address"
                                        error={props.errors.address && props.touched.address}
                                        helpertext={<ErrorMessage name="address" />} size="medium" fullWidth />
                                </Grid>
                                <Grid item md={6} >
                                    <Grid item style={{ padding: '0px 10px 20px 20px' }}>
                                        <Typography>Email ID&nbsp;*</Typography>
                                        <Field as={TextField} name="email" variant="outlined"
                                            placeholder="Customer Email Address"
                                            error={props.errors.email && props.touched.email}
                                            helpertext={<ErrorMessage name="email" />} required size="medium" fullWidth />
                                    </Grid>
                                    <Grid item style={{ padding: '0px 250px 0px 20px' }}>
                                        <Typography>Pincode</Typography>
                                        <Field as={TextField} name="pinCode" variant="outlined"
                                            placeholder="560067"
                                            error={props.errors.pinCode && props.touched.pinCode}
                                            helpertext={<ErrorMessage name="pinCode" />} size="medium" fullWidth />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button type="submit" style={btnStyle} variant="contained" color="primary">Proceed</Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        )
    }
}

export default CustomerDataForm;