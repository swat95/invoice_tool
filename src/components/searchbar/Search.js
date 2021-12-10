import { Grid, TextField, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';
import { Component } from 'react';
import List from '@material-ui/core/List';
import MuiListItem from "@material-ui/core/ListItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItemText from '@material-ui/core/ListItemText';
import { styled } from '@material-ui/core/styles';
import './Search.css';
import SearchIcon from '../../icons/search-icon@3x.png';

const myStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const ListItem = withStyles({
  root: {
    "padding": "0px 0px 0px 0px",
    "&$selected": {
      backgroundColor: "#606060",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&$selected:hover": {
      backgroundColor: "grey",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&:hover": {
      backgroundColor: "grey",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    }
  },
  selected: {}
})(MuiListItem);

/**Renders the 'Search' component */
class Search extends Component {
  SearchBox = styled(TextField)(() => ({
    '& fieldset': {
      borderRadius: '75px',
      padding: '10px 10px 10px 10px',
      margin: '10px 10px 10px 10px',
      borderColor: 'none'
    },
  }));

  render() {
    const classes = myStyles;
    const { searchItem, handleListClick, selectedIndex, totalPrice, invoices } = this.props;
    let time = new Date().toLocaleTimeString();
    let day = new Date().getDay();
    let dayList = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
    return (
      <div >
        {/* Search bar to search invoices from the invoice list */}
        <div className="search" style={{position: 'relative', display: 'inline-block'}}>
          <img src={SearchIcon} alt="search-icon" style={{position: 'absolute', left: 25, top: 20, width: 15, height: 15}}/>
          <this.SearchBox placeholder="Search..." variant="outlined" fullWidth onChange={this.props.onChange} ></this.SearchBox>
        </div>
        {/* Invoice list */}
        <Box style={{ width: '100%', color: "white", padding: "0px,0px,0px,0px"}}>
          <Typography style={{ fontSize: '12px', fontWeight: 'bold', color: 'grey', paddingLeft: '20px', paddingTop: '15px' }}>INVOICES - {invoices.length}</Typography>
          <List style={{ overflow:'auto', height:'80vh', overflowX:'hidden', scrollbarWidth:'none'}}>
          {/* eslint-disable-next-line */}
            {invoices.filter((filteredItem) => {
              if (searchItem === " ") {
                return filteredItem;
              }
              else if (filteredItem.fullName.toLowerCase().includes(searchItem.toLowerCase())) {
                return filteredItem;
              }
            }).map((item, key) => {
              return (
                <ListItem key={key} className={classes.root} selected={key === selectedIndex}
                  onClick={() => { handleListClick(item.id, key); }}>
                  <ListItemText >
                    <Grid container>
                      <Grid item md={6}>
                        <Typography style={{ fontSize: '15px', fontWeight: 'bolder', padding: '20px 20px 15px 20px' }}>INV. # - {item.id}</Typography>
                      </Grid>
                      <Grid item md={6}>
                        <Typography style={{ fontSize: '13px', textAlign: "right", padding: '20px 20px 0px 0px' }}>{time}&nbsp;-&nbsp;{dayList[day]}</Typography>
                      </Grid>
                      <Grid item md={6}>
                        <Typography style={{ fontSize: '13px', paddingLeft: '20px', paddingRight: '20px' }}>Items - {item.items.length}</Typography>
                        <Typography style={{ fontSize: '13px', color: '#45b1e8', paddingLeft: '20px', paddingBottom: '20px', paddingRight: '20px' }}>{item.fullName}</Typography>
                      </Grid>
                      <Grid item md={6} style={{ alignSelf: 'center' }}>
                        <Typography style={{ fontSize: '15px', float: 'right', fontWeight: 'bolder', padding: '0px 20px 20px 0px' }}>₹ {totalPrice(item.id)}</Typography>
                      </Grid>
                    </Grid>
                  </ListItemText>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </div>
    )
  }
}

export default Search;