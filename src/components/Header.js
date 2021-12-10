import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Component } from 'react';
import ModalBoxCustomer from './modalForms/ModalBoxCustomer';

/**Rendering 'Header' component*/
class Header extends Component {
    render() {
        const {invoices, invoiceHandler} = this.props;
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{backgroundColor: "#2565AE"}}>
                    <Toolbar>
                        <Typography variant="h6" >
                            Dashboard
                        </Typography>
                            <ModalBoxCustomer invoices={invoices} invoiceHandler={invoiceHandler}></ModalBoxCustomer>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}

export default Header;
