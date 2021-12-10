import React, { Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Box, Grid, Typography } from '@material-ui/core';
import PrinterIcon from '../../icons/printer-blue@3x.png';

/**Displays selected invoice details from the invoice list */
class InvoiceDetails extends Component {
  render() {
    const { invoices, invoiceId } = this.props;
    const name = invoices.map((invoice) => {
      let name = ""
      if (invoice.id === invoiceId) {
        name = invoice.fullName.toUpperCase();
      }
      return name;
    })
    const email = invoices.map((invoice) => {
      let email = ""
      if (invoice.id === invoiceId) {
        email = invoice.email
      }
      return email;
    })
    const id = invoices.map((invoice) => {
      let id = ''
      if (invoice.id === invoiceId) {
        id = invoice.id
      }
      return id;
    })
    const subTotal = invoices.map((invoice) => {
      let subtotal = ''
      if (invoice.id === invoiceId) {
        subtotal = invoice.subTotal
      }
      return subtotal;
    })
    const grandTotal = invoices.map((invoice) => {
      let grandtotal = ''
      if (invoice.id === invoiceId) {
        grandtotal = invoice.grandTotal
      }
      return grandtotal;
    })
    const tax = invoices.map((invoice) => {
      let tax = ''
      if (invoice.id === invoiceId) {
        tax = invoice.tax
      }
      return tax;
    })
    const discount = invoices.map((invoice) => {
      let discount = ''
      if (invoice.id === invoiceId) {
        discount = invoice.discount
      }
      return discount;
    })
    const appliedTax = invoices.map((invoice) => {
      let appliedtax = ''
      if (invoice.id === invoiceId) {
        appliedtax = ((invoice.subTotal * invoice.tax) / 100).toFixed(2)
      }
      return appliedtax;
    })
    const appliedDiscount = invoices.map((invoice) => {
      let applieddiscount = ''
      if (invoice.id === invoiceId) {
        applieddiscount = ((invoice.subTotal * invoice.discount) / 100).toFixed(2)
      }
      return applieddiscount;
    })
    let time = new Date().toLocaleTimeString();
    let day = new Date().getDay();
    let dayList = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
    return (
      <Box style={{ position: 'relative'}}>
        <Grid container >
          <Grid item md={8} style={{ padding: '30px 0px 0px 40px', textAlign: 'start' }}>
            <Typography style={{ fontWeight: 'bolder' }}>INVOICE</Typography>
            <Typography style={{ color: 'grey' }}># INV{id}</Typography>
            <Typography style={{ color: 'grey', fontSize: '15px' }}>{time}&nbsp;-&nbsp;{dayList[day]}</Typography>
          </Grid>
          <Grid item md={2} style={{ padding: '30px 10px 10px 10px', textAlign: 'end' }}>
            <Typography style={{ color: 'grey', fontSize: '12px', fontWeight: 'bold' }}>CUSTOMER DETAILS</Typography>
            <Typography style={{ fontSize: '12px', fontWeight: 'bolder', paddingTop: '5px' }}>{name}</Typography>
            <Typography style={{ color: 'grey', fontSize: '12px', paddingTop: '5px', fontWeight: 'bold' }}>{email}</Typography>
          </Grid>
          <Grid item md={2} style={{ padding: '30px 0px 0px 40px' }}>
            <Button variant="outlined" style={{ fontWeight: 'bolder', borderColor: 'skyblue', color: 'skyblue' }}>PRINT&nbsp;
              <img src={PrinterIcon} alt="print-icon" style={{ height: 20, width: 20 }}></img></Button>
          </Grid>
        </Grid>
        <TableContainer>
          <Table aria-label="simple table" stickyHeader style={{ padding: "30px 40px 0px 40px" }}>
            <TableHead>
              <TableRow>
                <TableCell>ITEM</TableCell>
                <TableCell align="center" style={{width:'280px'}}>QUANTITY</TableCell>
                <TableCell align="center" style={{width:'280px'}}>PRICE&nbsp;-&nbsp;₹</TableCell>
              </TableRow>
            </TableHead>
            {
              invoices.map((item) =>
                item.id === invoiceId ? (item.items.map((data, index) =>
                  <TableBody key={index}>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>{data.itemName}</TableCell>
                      <TableCell align="center">{data.quantity}</TableCell>
                      <TableCell align="center">{(data.price).toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                )) : null
              )
            }
          </Table>
        </TableContainer>
        <Grid container style={{ paddingTop: 30, paddingBottom: 30, paddingLeft: 40, paddingRight: 40 }} spacing={2}>
          <Grid item md={6}>
          </Grid>
          <Grid item md={3} style={{textAlign: 'right'}}>
            <Typography >Sub Total</Typography>
            <Typography >Tax ({tax}%)</Typography>
            <Typography >Discount ({discount}%)</Typography>
            <Typography style={{ fontWeight: 'bold' }}>Grand Total</Typography>
          </Grid>
          <Grid item md={2} style={{textAlign: 'right'}}>
            <Typography >₹ {subTotal}</Typography>
            <Typography >₹ {appliedTax}</Typography>
            <Typography >₹ -{appliedDiscount}</Typography>
            <Typography style={{ fontWeight: 'bold' }}>₹ {grandTotal}</Typography>
          </Grid>
          <Grid item md={1}>
          </Grid>
        </Grid>
      </Box>
    )
  }
}
export default InvoiceDetails;