import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from '@material-ui/core/Typography';
//import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { COUNTRY } from '../config/config';

const useStyles = makeStyles(theme => ({
  formControl: {
      margin: theme.spacing(1),      
  },
}));

const TabPills = props => {

    const [activeTab, setactiveTab] = useState(0);

    const handleChange = (event, activeTab) => {
        setactiveTab(activeTab);
        let  category = props.cat[activeTab]
        props.getarticle(category);
        props.isloading(true);
    };

    const classes = useStyles();

  const handleCountry = event => {
    props.filterarticle(event.target.value);
    props.isloading(true);
  };

    return (
        <div style={{marginBottom:120}}>
        <AppBar color="secondary" position="fixed">
         <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
        
           <Typography style={{fontVariant:'small-caps'}} variant="h5" color="inherit">
             News App
           </Typography>
        
           <FormControl className={classes.formcontrol}>

            <Select
             labelId="region"
             id="demo-simple-select"
             value={props.country}
             color='textPrimary'
             displayEmpty
             style={{width:130, color:'white',textAlign:'center'}}
             onChange={handleCountry} >             
            <MenuItem value='' disabled>Change Country</MenuItem>
        {COUNTRY.map((c,i) => 

        (<MenuItem style={{textAlign:'center'}} key={i} value={c.code}>{c.name}</MenuItem>)
        )}
            </Select>
          </FormControl>
        </Toolbar>

        <Tabs variant="scrollable" value={activeTab} onChange={handleChange} textColor="inherit">
            {
            props.cat.map( (tab,i) => (
              <Tab
                key = {i}
                label = {tab}
                value = {i}
              />
            ))
            }
          </Tabs>
        </AppBar>
        
        
        </div>
    );
    
}

export default TabPills;
