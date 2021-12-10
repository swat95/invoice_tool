import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '../../icons/close-btn@3x.png'
import { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import CustomerDataForm from './CustomerDataForm';
import ItemDataForm from './ItemDataForm';
import { Grid, Typography } from '@material-ui/core';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(5),

  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(0)
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'fixed',
            color: (theme) => theme.palette.grey[500],
          }}
          style={{ float: 'right', padding: '0px 0px 0px 0px', margin: '0px 0px 0px 0px' }}
        >
          <img src={CloseIcon} alt="close-icon" style={{ width: 25, height: 25 }}></img>
        </IconButton>

      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const StyledFab = styled(Fab)({
  margin: 40,
  top: 10,
  right: 100,
  left: 'auto',
  position: 'absolute',
});

class ModalBoxCustomer extends Component {
  state = {
    open: false,
    proceedClicked: false,
    editClicked: false,
    skipClicked: false,
    customerData: {
      fullName: '',
      phoneNumber: '',
      address: '',
      email: '',
      pinCode: ''
    },
    initialValues: {
      itemData: [
        {
          formItemName: '',
          formItemQuantity: '',
          formItemPrice: ''
        }
      ],
      tax: 0,
      discount: 0,
      subTotal: 0.00,
      grandTotal: 0.00
    },
    formData: [],
    formValid: false
  };

  render() {
    const { open, initialValues, formData, formValid } = this.state;
    const { invoices, invoiceHandler } = this.props;

    //Switch to customer data form modal box
    const editCustomerData = (event, values) => {
      event.preventDefault();
      this.setState((prevState) => (
        {
          ...prevState.formData,
          customerData: JSON.parse(localStorage.getItem('invoiceData')),
          editClicked: true,
          proceedClicked: false,
          skipClicked: false
        }
      ))
    }
    //Switch to product data form modal box
    const onProceed = (event, values) => {
      event.preventDefault();
      values = values ? localStorage.setItem("invoiceData", JSON.stringify(values)) : ""
      this.setState((prevState) => (
        {
          ...prevState.customerData,
          formValid: true,
          proceedClicked: true,
          editClicked: false
        }
      )
      );
    }

    //Save new invoice details to the existing invoice list
    const onSave = async (event, values) => {
      let localObj = {}
      event.preventDefault();
      values.itemData.map((data, index) => (
        this.state.formData.push(
          {
            itemName: values.itemData[index].formItemName,
            quantity: values.itemData[index].formItemQuantity,
            price: values.itemData[index].formItemPrice
          }
        )
      ));
      console.log(this.state.formData)
      localObj = JSON.parse(localStorage.getItem('invoiceData'))
      localObj.tax = values.tax
      localObj.discount = values.discount
      localObj.subTotal = handleSubTotal(values.itemData)
      localObj.grandTotal = handleGrandTotal(values)
      //Push product form data to the local storage
      localObj['items'] = this.state.formData
      console.log(localObj)
      localStorage.setItem('invoiceData', JSON.stringify(localObj))

      //Save new invoice details to the existing list
      saveNewInvoice(localObj);

      this.setState({
        formValid: false,
        proceedClicked: false,
        skipClicked: false,
        formData: [],
        customerData: {
          fullName: '',
          phoneNumber: '',
          address: '',
          email: '',
          pinCode: ''
        }
      })

      //Clear the local storage data
      localStorage.clear();
    }

    //Save new invoice data to the api using post request
    const saveNewInvoice = async (newInvoice) => {
      try {
        const response = await fetch(`http://localhost:8001/invoices`, {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newInvoice)
        });
        if (!response.ok) {
          const message = 'Error with Status Code: ' + response.status;
          throw new Error(message);
        }
        const data = await response.json();

        //Updates the invoice list by triggering 'invoiceHandler' function defined in the main component 'Dashboard'
        invoiceHandler(data)

      } catch (error) {
        alert("Server Error: "+ error+ " Please check the api URL or network connectivity !" )
        console.log('Error: ' + error);
      }
    }

    //Calculate sub total
    const handleSubTotal = (formEntries) => {
      let total = 0;
      formEntries.map((item, index) => (
        total = total + (item.formItemPrice * item.formItemQuantity)
      ));
      return total.toFixed(2);
    }

    //Calculate grand total
    const handleGrandTotal = (values) => {
      let grandTotal = 0.00
      let subTotal = 0.00
      let taxValue = (values.tax / 100)
      let discountValue = (values.discount / 100)

      values.itemData.map((item, index) => (
        subTotal = subTotal + (values.itemData[index].formItemPrice * values.itemData[index].formItemQuantity)
      ))
      grandTotal = (subTotal + (subTotal * taxValue) - (subTotal * discountValue)).toFixed(2)
      return grandTotal;
    }

    //Calculate tax amount
    const handleTax = (values, formEntries) => {
      let total = 0;
      formEntries.map((item, index) => (
        total = total + (item.formItemPrice * item.formItemQuantity)
      ));
      return ((total * values.tax) / 100).toFixed(2);
    }

    //Calculate discount amount
    const handleDiscount = (values, formEntries) => {
      let total = 0;
      formEntries.map((item, index) => (
        total = total + (item.formItemPrice * item.formItemQuantity)
      ));
      return ((total * values.discount) / 100).toFixed(2);
    }

    //Skips customer data form
    const handleSkip = (event) => {
      event.preventDefault();
      //Avoid input warning in console...
      localStorage.setItem("invoiceData", JSON.stringify(this.state.customerData))
      this.setState((prevState) => (
        {
          ...prevState.customerData,
          skipClicked: true
        }
      )
      )
    }

    //Open customer data form
    const handleClickOpenCustomerForm = () => {
      this.setState(
        {
          open: true,
        }
      )
    };

    //Close customer data form
    const handleCloseCustomerForm = () => {
      this.setState(
        {
          open: false,
        }
      )

    };
    return (
      <div>
        <StyledFab style={{ backgroundColor: "#f81894" }} aria-label="add" onClick={handleClickOpenCustomerForm}>
          <AddIcon style={{ color: "white" }} />
        </StyledFab>
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth='md'
          fullWidth
        >
          <Grid container >
            <Grid item md={3} ><Typography style={{ fontWeight: 'bolder', fontSize: '20px', padding: '20px 0px 20px 40px' }}>Create New Invoice</Typography></Grid>
            <Grid item md={3} ><Typography style={{ fontWeight: 'bolder', color: 'grey', fontSize: '15px', padding: '25px 0px 20px 30px' }}>ORDER NO.{invoices.length + 1}</Typography></Grid>
            <Grid item md={6}><BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseCustomerForm}> </BootstrapDialogTitle></Grid>
          </Grid>

          <DialogContent style={{ paddingTop: 0 }}>
            {((this.state.proceedClicked || this.state.skipClicked) === true) ?
              (<ItemDataForm
                editCustomerData={editCustomerData}
                handleSubTotal={handleSubTotal}
                handleGrandTotal={handleGrandTotal}
                initialValues={initialValues}
                handleTax={handleTax}
                handleDiscount={handleDiscount}
                onSave={onSave}
                formValid={formValid}
                formData={formData} />
              ) :
              <CustomerDataForm
                customerData={this.state.customerData}
                onProceed={onProceed}
                handleSkip={handleSkip} />}
          </DialogContent>
        </BootstrapDialog>
      </div>
    );
  }
}

export default ModalBoxCustomer;