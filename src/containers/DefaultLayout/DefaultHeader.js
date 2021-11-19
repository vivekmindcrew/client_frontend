import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { UncontrolledDropdown, DropdownToggle, Nav, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import { ExitToApp, GetApp } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import subCtrl from '../../views/Subscription/subCtrl/subscriptionCtrl';
import swal from 'sweetalert';
import { ExportToCsv } from 'export-to-csv';
// import SubsCtrl from './../../views/Subscription/subCtrl/subscriptionCtrl';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import config from '../../config/Config';

// import Tooltip from '@material-ui/core/Tooltip';


const propTypes = {
  children: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  body: {
    fontFamily: 'Poppins'
  },
  anchor: {
    fontWeight: 500,
    lineHeight: 3,
    fontSize: 13,
    fontFamily: 'Poppins'
  },
  text: {
    color: "#3E5B77",
    textDecoration: "none"
  },
}));

const defaultProps = {};

function DefaultHeader(props) {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setstate] = useState(true)
  const [county, setCounty] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose1 = () => {
    setOpen(false);
  };
  const currentUserId = localStorage.getItem("userId");
 
   
//------------------------------------------------------
  // const [open2, setOpen2] = useState(false);
  // const [email2, setEmail2] = useState('');
  // const [days, setDays] = useState('');

  // const handleClickOpen2 = () => {
  //   setOpen2(true);
  // };

  // const handleClose2 = () => {
  //   setOpen2(false);
  // };


 

  // // const handleChange3 = (event) => {
  // //   setDays(event.target.value);
  // // };

  // const handleSubmitDilogue = (e)=>{
  //   // console.log(email2,days)
  //   // alert('data submitted')
  //   const dialogueData = {email2,days};
  //   axios.post(config.baseUrl+'/demo/demo',dialogueData)
  //       .then(res=>{
  //           console.log(res)
  //           setOpen2(false);
  //           swal({
  //               title: "Congratulations!",
  //               text: "Email Sent Successfully",
  //               icon: "success",
  //             });

  //       })
  // }

//-------------------------------



  function handleClick() {
    var data = {
      "userId": currentUserId
    };
    subCtrl.userLogout(data, (result) => {
      if (result.data.status === true) {
         window.location.href = 'https://www.clientconnect.ai/';    
              localStorage.clear();
      }
      else {
        swal({
          title: "Error!",
          text: "Please check your internet connection.",
          icon: "error",
        });
      }
    })
} 
  const handleChangeCounty = (val) => {
    setCounty(val.label)

  }

  const onSubmit = (data) => {
    if (county === "") {
      swal("Please choose a county", {
        icon: "error",
      });
    } else { 
      localStorage.setItem("add-countypractice", county)
       history.push('/county-subscription');
    }

  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    var match_token = localStorage.getItem("ADMIN");
     if (match_token === 'true') {
      setstate(false)
    }

  }, [])


  const handleClose = (event) => {

    const county = location.pathname.replace('/home/user/leads/', ''); 
    let data = {
      "day": event.target.value,
      "currentUserId": currentUserId,
      "county": county
    }

     const options = {
      fieldSeparator: ',',
      showLabels: true,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    subCtrl.downloadLeads(data, (result) => {
       if (result.data.status === "true") {
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(result.data.response);
      }
      else if (result.data.msg === "No lead found") {
        swal("No lead available", {
          icon: "error",
        });
      } else {
        swal("Please try again", {
          icon: "error",
        });
      }
    })
    setAnchorEl(null);
  };
  // eslint-disable-next-line
  const { children, ...attributes } = props;

  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand href="http://www.clientconnect.ai/" style={{ color: "#0d3559", marginLeft: 5, fontWeight: "bold", fontSize: 20, fontFamily: 'Poppins' }}>Client Connect</AppNavbarBrand>
      <AppSidebarToggler className="d-md-down-none" display="lg" />

      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav direction="down">
          <DropdownToggle className={classes.body} nav>
           
           
          {/* <Button 
             variant="contained" 
             color="default" 
             onClick={handleClickOpen2} 
             className={classes.button}
             style={{ marginRight: 10 }}
          >
             Enter your Email
           </Button>
            <Dialog open={open2} onClose={handleClose2} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Enter your email</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Enter your Email here"
                  fullWidth
                  style={{ width: '300px'}}
                  onChange={(e) => setEmail2(e.target.value)}
                />
                <br/><br/>
                <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label" >days</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  style={{width:'120px'}}
                >
                  <MenuItem value={1}>current day</MenuItem>
                  <MenuItem value={7}>past 7 days</MenuItem>
                  <MenuItem value={30}>past 30 days</MenuItem>
                </Select>
              </FormControl>


              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose2} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmitDilogue} color="primary">
                  Submit
                </Button>
               
              </DialogActions>
            </Dialog> */}

           
           
           
            {state ? (
              <Button
                variant="contained"
                color="default"
                startIcon={<AddIcon />}
                className={classes.button}
                style={{ marginRight: 10 }}
                onClick={handleClickOpen}
              >
                Add County
              </Button>
            ) : (<div></div>)}

            {state ? (
              <Button aria-controls="simple-menu" aria-haspopup="true" variant="contained" color="default"
                startIcon={<GetApp />} style={{ marginRight: 10 }} onClick={handleMenu}>
                Download
              </Button>
            ) : (<div></div>)}

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} value="1">24 hours</MenuItem>
              <MenuItem onClick={handleClose} value="7">7 days</MenuItem>
              <MenuItem onClick={handleClose} value="30">30 days</MenuItem>
            </Menu>
            {/* <Link to="/"> */}
            {/* <Button
                variant="contained"
                color="default"
                startIcon={<ExitToApp />}
                 className={classes.button}
                style={{ marginRight: 10 }}
              >
                <a href="http://www.clientconnect.ai/" style={{ color: "#0d3559" }}>Logout</a>

                </Button>
       */}
            {/* -<i className="fa fa-sign-out"  style={{ fontSize: 30, color: "black" }} aria-hidden="true" /> */}
            {/* </Link> */}

            <Dialog open={open} aria-labelledby="form-dialog-title" style={{ fontFamily: 'Poppins' }}>
              <DialogTitle id="form-dialog-title" style={{ fontFamily: 'Poppins' }}>Add new county</DialogTitle>
              <DialogContent>
                <Form id="my-form">
                  <Autocomplete
                    id="county-select"
                    style={{ width: 400, fontFamily: 'Poppins' }}
                    options={counties}
                    classes={{
                      option: classes.option,
                    }}
                    size="small"
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    onChange={(event, value) => handleChangeCounty(value)}
                    renderOption={(option) => (
                      <React.Fragment>
                        {option.label}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Choose a county"
                        variant="outlined"
                        required
                        inputProps={{
                          ...params.inputProps,
                          style: { fontFamily: 'Poppins' }
                          // disable autocomplete and autofill
                        }}
                        InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                      />
                    )}
                  />
                  <span className={classes.anchor}>Don’t see your county?
                  <a href="https://www.clientconnect.ai/request-county/" target="_blank" rel="noopener noreferrer" onClick={"window.open('https://www.clientconnect.ai/request-county/')"} className={classes.text}> Request additional county support</a>
                  </span>
                </Form>

              </DialogContent>
              <DialogActions>

                <Button onClick={handleClose1} color="primary">
                  Cancel
                </Button>
                <Button form="my-form" type="submit" onClick={onSubmit} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

          </DropdownToggle>
        </UncontrolledDropdown>
        {/* <a href="http://www.clientconnect.ai/" style={{ color: "black", textDecoration: "none" }}> */}
        <Button
          variant="contained"
          color="default"
          startIcon={<ExitToApp />}
          onClick={handleClick}
          className={classes.button}
          style={{ marginRight: 10, marginLeft: 0 }}
        >
          Logout

                </Button>

        {/* </a> */}
      </Nav>
      {/* <AppAsideToggler className="d-md-down-none" /> */}
      {/*<AppAsideToggler className="d-lg-none" mobile />*/}
    </React.Fragment>
  );
}


const counties = [
  { label: 'Maricopa County, Arizona' }, 
{ label: 'Alameda County, California' },
{ label: 'Los Angeles County, California' },
{ label: 'Orange County, California' },
{ label: 'Riverside County, California' },
{ label: 'San Diego County, California' },
{ label: 'San Luis Obispo County, California' },
{ label: 'San Bernardino County, California' },
{ label: 'Santa Clara County, California' },
{ label: 'Denver County, Colorado' },
{ label: 'Broward County, Florida' },
{ label: 'Escambia County, Florida' },
{ label: 'Hillsborough County, Florida' },
{ label: 'Miami-Dade County, Florida' },
{ label: 'Orange County, Florida' },
{ label: 'Palm Beach County, Florida' },
{ label: 'Sarasota County, Florida' },
{ label: 'Cook County, Illinois' }, 
{ label: 'Oakland County, Michigan'},
{ label: 'Wayne County, Michigan'},
{ label: 'Clark County, Nevada' },
{ label: 'Franklin County, Ohio' },
{ label: 'Bexar County, Texas' },
{ label: 'Collin County, Texas' },
{ label: 'Dallas County, Texas' }, 
{ label: 'Harris County, Texas' }, 
{ label: 'Lubbock County, Texas' },
{ label: 'Tarrant County, Texas' },
{ label: 'King County, Washington' },
] 

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
