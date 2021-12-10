import React from 'react';
import { Component } from 'react';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Search from './searchbar/Search';
import InvoiceDetails from './listItems/InvoiceDetails';

/**Render the main component 'Dashboard'*/
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchItem: '',
            invoices: [],
            selectedIndex: 0,
            invoiceId: 1
        }
        this.handleListClick = this.handleListClick.bind(this);
        this.totalPrice = this.totalPrice.bind(this);
        this.invoiceHandler = this.invoiceHandler.bind(this);
    }

    /**Fetch request to get the list of invoices from api*/
    async componentDidMount() {
        try {
            const response = await fetch(`http://localhost:8001/invoices`);
            if (!response.ok) {
                const message = 'Error with Status Code: ' + response.status;
                throw new Error(message);
            }
            const json = await response.json();
            this.setState({ invoices: json });
        }
        catch (error) {
            alert("Server Error: " + error + " Please check the api URL or network connectivity !")
            console.log('Error' + error)
        }
    }

    /**'invoiceHandler' function triggers on saving new invoice details*/
    invoiceHandler = (newInvoice) => {
        let invoiceInfo = this.state.invoices.push(newInvoice)
        this.setState((prevState) => ({
            ...prevState.invoices, invoiceInfo
        }))
        console.log(this.state.invoices)
    }

    /**Triggers on click of an invoice in the search list*/
    handleListClick = (id, index) => {
        this.setState(
            {
                selectedIndex: index,
                invoiceId: id
            }
        )
    }

    /**Calculates the grand total of items*/
    totalPrice = (itemId) => {
        let total = 0;
        // eslint-disable-next-line
        this.state.invoices.map((invoice) => {
            if (invoice.id === itemId) {
                total = invoice.grandTotal
            }
        }
        )
        return total;
    };

    render() {
        const { invoices } = this.state;

        /**Clear 'localStorage' on refresh*/
        localStorage.clear();

        return (
            <Box style={{ position: 'relative', height: '80vh' }}>
                <Header invoices={invoices} invoiceHandler={this.invoiceHandler} />
                <Grid container >
                    <Grid item md={2} >
                        <Paper style={{ backgroundColor: "#36454f" }}>
                            <Search searchItem={this.state.searchItem} onChange={(e) => this.setState({ searchItem: e.target.value })}
                                handleListClick={this.handleListClick} selectedIndex={this.state.selectedIndex} totalPrice={this.totalPrice} invoices={invoices} />
                        </Paper>
                    </Grid>
                    <Grid item md={10} style={{ backgroundColor: "#e0e0e0", paddingRight: '30px', paddingLeft: '30px', paddingBottom: '50px' }}>
                        <Typography style={{ color: "grey", margin: '20px', fontWeight: 'bold', fontSize: '15px', marginLeft: '5px' }}>INVOICE DETAILS</Typography>
                        <Paper style={{ overflow: 'auto', height: '80vh' }}>
                            <InvoiceDetails data-testid="invoice-details" invoices={this.state.invoices} invoiceId={this.state.invoiceId} />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default Dashboard;