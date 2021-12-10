import React from 'react';
import { Component } from 'react';
import { Grid, Button, Typography, Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputAdornment from '@material-ui/core/InputAdornment';
import EditIcon from '../../icons/edit@3x.png';
import { Form, Formik, ErrorMessage, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

let customerInfo = "";
/**Renders product data form */
class ItemDataForm extends Component {
    //Gets customer name
    handleCustomerName = () => {
        customerInfo = localStorage.getItem('invoiceData') === "" ? "" : JSON.parse(localStorage.getItem('invoiceData'))
        return customerInfo.fullName;
    }

    //Gets customer email
    handleCustomerEmail = () => {
        customerInfo = localStorage.getItem('invoiceData') === "" ? "" : JSON.parse(localStorage.getItem('invoiceData'))
        return customerInfo.email;
    }

    //Gets tax amount
    taxEntered = (formEntry) => {
        console.log(formEntry)
        return ((formEntry.subTotal * formEntry.tax) / 100).toFixed(2)
    }

    //Gets discount amount
    discountEntered = (formEntry) => {
        return ((formEntry.subTotal * formEntry.discount) / 100).toFixed(2)
    }

    render() {
        let itemEntries = [];
        const { editCustomerData, initialValues, formValid, onSave, handleSubTotal, handleGrandTotal, handleTax, handleDiscount } = this.props;
        const btnStyle = { marginTop: 10, float: 'right' }
        const validationSchema = Yup.object().shape({
            tax: Yup
                .number("Must be number")
                .positive()
                .min(0, "Min is 0")
                .max(100, "max is 100"),
            discount: Yup
                .number("Must be number")
                .positive()
                .min(0, "Min is 0")
                .max(100, "max is 100")
        });
        return (
            <div>
                <Grid container>
                    <Grid item md={6} style={{ padding: '30px 0px 0px 40px' }}>
                        <Typography style={{ fontSize: '13px', fontWeight: 'bold' }}>PRODUCT DETAILS</Typography>
                    </Grid>
                    <Grid item md={4} style={{ padding: '30px 0px 0px 40px', textAlign: 'end' }}>
                        <Typography style={{ color: 'grey', fontSize: '12px', fontWeight: 'bold' }}>CUSTOMER DETAILS</Typography>
                        <Typography style={{ fontSize: '15px', fontWeight: 'bolder' }}>{this.handleCustomerName()}</Typography>
                        <Typography style={{ color: 'grey', fontSize: '12px', paddingTop: '5px', fontWeight: 'bold' }}>{this.handleCustomerEmail()}</Typography>
                    </Grid>
                    <Grid item md={2} style={{ padding: '60px 0px 0px 0px' }}>
                        <Button onClick={(event) => { editCustomerData(event, itemEntries) }} color="primary">
                            <img src={EditIcon} alt="edit-icon" style={{ float: 'right', height: 20, width: 20 }}></img></Button>
                    </Grid>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema}>
                    {(props, handleChange) => (
                        // eslint-disable-next-line
                        itemEntries = (props.values['itemData']),
                        <Form onSubmit={(event) => { onSave(event, props.values) }}>
                            <TableContainer >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{ padding: "0px 30px 0px 30px" }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ITEM</TableCell>
                                            <TableCell align="right">QUANTITY</TableCell>
                                            <TableCell align="right">PRICE&nbsp;-&nbsp;₹</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        {itemEntries.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.formItemName}</TableCell>
                                                <TableCell align="right">{item.formItemQuantity}</TableCell>
                                                <TableCell align="right">{item.formItemPrice}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <br />
                            <FieldArray name="itemData">
                                {(fieldArrayProps) => {
                                    const { push, form } = fieldArrayProps
                                    const { values, errors, touched } = form
                                    const { itemData } = values
                                    return (
                                        itemData.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <Grid container spacing={2}>
                                                    <Grid item md={5}>
                                                        <Field name={`itemData[${index}].formItemName`}
                                                            variant="outlined" label="Item Name"
                                                            error={errors.formItemName && touched.formItemName} as={TextField}
                                                            helperText={<ErrorMessage name={`itemData[${index}].formItemName`} />}
                                                            required size="medium" fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <Field name={`itemData[${index}].formItemQuantity`} type="number"
                                                            variant="outlined" label="Item Quantity"
                                                            error={errors.formItemQuantity && touched.formItemQuantity} as={TextField}
                                                            helperText={<ErrorMessage name={`itemData[${index}].formItemQuantity`} />}
                                                            required />
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <Field name={`itemData[${index}].formItemPrice`} type="number"
                                                            variant="outlined" label="Item Price"
                                                            error={errors.formItemPrice && touched.formItemPrice} as={TextField}
                                                            helperText={<ErrorMessage name={`itemData[${index}].formItemPrice`} />}
                                                            required />
                                                    </Grid>
                                                    <Grid item md={1}>
                                                        <Button onClick={() => push({ formItemName: '', formItemQuantity: '', formItemPrice: '' })}
                                                            variant="outlined" style={{ borderColor: 'skyblue', color: 'skyblue' }}><b>Add</b></Button>
                                                    </Grid>
                                                </Grid>
                                            </React.Fragment>
                                        ))
                                    )
                                }}
                            </FieldArray>
                            <br />
                            <Box>
                                <Grid container spacing={2} style={{ padding: '100px 0px 0px 0px' }}>
                                    <Grid item md={2}>
                                        <Field name="tax" type="number" label="Tax" variant="outlined" as={TextField}
                                            error={props.errors.tax && props.touched.tax}
                                            helperText={<ErrorMessage name="tax" />}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        %
                                                    </InputAdornment>
                                                ),
                                            }} />
                                    </Grid>
                                    <Grid item md={2}>
                                        <Field name="discount" type="number" label="Discount" variant="outlined" as={TextField}
                                            error={props.errors.discount && props.touched.discount}
                                            helperText={<ErrorMessage name="discount" />}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        %
                                                    </InputAdornment>
                                                ),
                                            }} />
                                    </Grid>
                                    <Grid item md={4}></Grid>
                                    <Grid item md={2}>
                                        <Typography>Sub Total</Typography>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Typography>₹ {handleSubTotal(itemEntries)}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Grid container spacing={2} >
                                    <Grid item md={2}>
                                        <Typography>Tax</Typography>
                                        <Typography>₹ {handleTax(props.values, itemEntries)}</Typography>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Typography>Discount</Typography>
                                        <Typography>₹ {handleDiscount(props.values, itemEntries)}</Typography>
                                    </Grid>
                                    <Grid item md={4}></Grid>
                                    <Grid item md={2} style={{ textAlign: 'left' }}>
                                        <Typography>Grand Total </Typography>
                                        <Typography>₹ {handleGrandTotal(props.values)}</Typography>
                                    </Grid>
                                    <Grid item md={2}>
                                        {formValid === false ?
                                            <Button style={btnStyle} variant="contained" color="primary" disabled>SAVE</Button> :
                                            <Button style={btnStyle} variant="contained" color="primary" type="submit" >SAVE</Button>}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </div >
        )
    }
}

export default ItemDataForm;