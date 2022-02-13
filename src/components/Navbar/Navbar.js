import { AppBar, Badge, Icon, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';
import React from 'react'
import logo from '../../assets/logo.png';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({tottalitems}) => {
    // console.log(tottalitems);
    const location = useLocation();
    
    const classes = useStyles();
  return (
      <>
          <AppBar position='fixed' className={classes.AppBar} color= 'inherit'>
          <Toolbar>
              <Typography  component = {Link} to = '/' variant='h6' className={classes.title} color = 'inherit'>
                  <img src = {logo} alt = 'Commerce.js' height="25px" className={classes.image}/>
                  Commerce.js
              </Typography>
              <div className={classes.grow}/>
              {location.pathname == '/'  && (
                  <div className={classes.button}>
                  <IconButton  component = {Link} to = '/cart' aria-label='show cart items' color='inherit'>
                  <Badge badgeContent={tottalitems} color='secondary'> 
                  <ShoppingCart/>

                  </Badge>  
                       
                  </IconButton>

              </div>)}
              

          </Toolbar>

          </AppBar>
      </>
  
  )
}

export default Navbar