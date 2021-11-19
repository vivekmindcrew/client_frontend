import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import {
    Col, Row, Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ButtonM from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SubsCtrl from './subCtrl/subscriptionCtrl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loader from "react-loader";
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Tooltip from '@material-ui/core/Tooltip';
import './style.css';
import swal from 'sweetalert';
import getCountry from 'country-state-picker';

function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginTop: "8%",
        textAlign: "center",
        borderRadius: 5,
        fontFamily: 'Poppins'
    },
    title: {
        fontSize: 24,
        color: "white"
    },
    money: {
        backgroundColor: "#ffffff",
        display: "block",
        padding: "5px",
        margin: "0px"
    },
    pos: {
        marginBottom: 12,
        color: "white",
        marginTop: 12,
        fontSize: 16,
        fontWeight: "normal"
    },
    heading: {
        textAlign: "center",
        marginTop: "6%"
    },
    subHeading: {
        fontSize: 16,
        padding: 0
    },
    btn: {
        color: "#c69f6f",
        borderRadius: "15px",
        backgroundColor: "white",
        marginBottom: 20
    },
    label: {
        fontSize: 15
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 7,
            fontSize: 18,
        },
    },
    anchor: {
        fontWeight: 500,
        fontSize: 13,
        fontFamily: 'Poppins'
    }
});

export default function OutlinedCard(props) {
    const classes = useStyles();
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [rows, setRows] = useState([]);
    const [loader, setloader] = useState(false);
    const [isTrue, setTrue] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [error, seterror] = useState(false);
    const [cpassword, setcpassword] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [county, setCounty] = useState("");


    const handleClickOpen = (id, amount) => {
        localStorage.setItem("price_id", id);
        localStorage.setItem("amount", amount)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeCounty = (val) => {
        setCounty(val.label)
    }
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const onSubmit = (data) => {

        let formData = {
            first: data.fname,
            last: data.lname,
            password: data.password,
            email: data.email,
            countypractice: county,
            firmname: data.firmname,
            barid: data.barid
        }
        if (cpassword !== data.password) {
            seterror(true);
        } else {
            seterror(false);
            // console.log(formData);


            SubsCtrl.createCustomer(formData, (result) => {
                // console.log(result.data.response);
                if (result.data.status === "true") {
                    localStorage.setItem("cID", result.data.customerid);
                    localStorage.setItem("ADMIN", false);
                    localStorage.setItem("firmname", data.firmname);
                    localStorage.setItem("token", true);
                    // localStorage.setItem("county", county);
                    localStorage.setItem("userId", JSON.stringify(result.data.id));
                    localStorage.setItem("MailchimpApiKey", 'null');
                    localStorage.setItem("add-countypractice", county);
                    history.push('/details');
                } else if (result.data.msg === "Email already registered") {
                    swal({
                        title: "Email already registered, Please sign in",
                        dangerMode: true,
                        buttons: true,
                    }).then((isLogged) => {
                        if (isLogged) {
                            history.push("/");
                        }
                    });
                } else {
                    swal("Something went wrong", {
                        icon: "error",
                    });
                }
            })
        }
    }

    useEffect(() => {
        SubsCtrl.getSubscription((result) => {
            if (result.data.data.data.length > 0) {
                setRows(result.data.data.data);
                setloader(true);
            } else {
                setTrue(true);
                setloader(true);
                swal({
                    title: "Error!",
                    text: "Please check all the fields",
                    icon: "error",
                });
                // console.log("false")
            }
        })
    }, [])

    return (
        <div>
            <div>
                {!(isTrue) ? (
                    <Loader loaded={loader} className="spinner">
                        <div className="container" style={{ fontFamily: 'Poppins' }}>
                            <div className={classes.heading}>
                                <h1>Ready to get started?</h1>
                                <p className={classes.subHeading} data-wow-delay=".1s">Choose a plan, Select your county, Start reaching out to prospective clients today.</p>
                            </div>
                            <Row>
                                {rows.map((row, i) => (
                                    <Col md={4} sm={12} lg={4} key={i} className="single-package  text-center wow fadeInLeft">
                                        <Card className={classes.root}
                                            style={{ backgroundColor: i === 1 ? "#c69f6f" : "#eef4f5", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", padding: "0px" }}>
                                            <CardContent>
                                                <Typography className={classes.title} style={{ fontFamily: 'Poppins', color: i === 1 ? "white" : "#3E5B77" }} color="textPrimary" gutterBottom>
                                                    {row.interval_count === 3 ? "3-MONTH BILLING" : row.interval_count === 6 ? "6-MONTH BILLING" : "MONTHLY BILLING"}
                                                </Typography>
                                                <div className={classes.money}>
                                                    <Typography variant="h5" component="h4">
                                                        <sup>$</sup>{+ row.amount / (100 * row.interval_count)}/month
                                                    </Typography>
                                                </div>

                                                <Typography className={classes.pos} variant="h6" component="h4" color="textSecondary" style={{ fontFamily: 'Poppins', color: i === 1 ? "white" : "#3E5B77" }}>
                                                    {row.interval_count === 3 ? "Automate Email Solicitations" : row.interval_count === 6 ? "Automate Email Solicitations" : ""}
                                                </Typography>
                                                <Typography className={classes.pos} variant="h6" component="h4" color="textSecondary" style={{ fontFamily: 'Poppins', color: i === 1 ? "white" : "#3E5B77" }}>
                                                    99% Email Deliverability
                                                </Typography>
                                                <Typography className={classes.pos} variant="h6" component="h4" color="textSecondary" style={{ fontFamily: 'Poppins', color: i === 1 ? "white" : "#3E5B77" }}>
                                                    US-Based Support
                                                </Typography>
                                                <Typography className={classes.pos} variant="h6" component="h4" color="textSecondary" style={{ fontFamily: 'Poppins', color: i === 1 ? "white" : "#3E5B77" }}>
                                                    Social Media Ad Support
                                                </Typography>

                                            </CardContent>
                                            <ButtonM className={classes.btn} onClick={() => handleClickOpen(row.id, row.amount)} size="medium" variant="contained" style={{ fontFamily: 'Poppins', backgroundColor: i === 1 ? "white" : "#c69f6f", color: i === 1 ? "#c69f6f" : "white" }}>Get Started</ButtonM>
                                            <CardActions>
                                            </CardActions>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                        </div>
                    </Loader>
                )
                    :
                    (<div>
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    No Subscription Plan available.
                            </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </div>)
                }

            </div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ color: "#3E5B77", fontFamily: 'Poppins' }}>Please enter your details</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Form id="my-form" onSubmit={handleSubmit(onSubmit)} style={{ fontFamily: 'Poppins' }}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="firstname" className={classes.label}>First Name</Label>
                                        <Input type="text" innerRef={register} name="fname" id="exampleEmail" placeholder="Enter First Name" required />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="lastname" className={classes.label}>Last Name</Label>
                                        <Input type="text" innerRef={register} name="lname" id="exampleEmail" placeholder="Enter Last Name" required />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="password" className={classes.label}>Password</Label>
                                        <Tooltip title="Minimum eight characters, at least one uppercase letter, one lowercase letter and one number" aria-label="password">
                                            {/* <Input type="password" innerRef={register} name="password" id="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" placeholder="Enter Password" required /> */}
                                            <Input type="password" innerRef={register} name="password" id="password" pattern="^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$" placeholder="Enter Password" required />



                                        </Tooltip>

                                    </FormGroup>

                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="cpassword" className={classes.label}>Confirm Password</Label>
                                        <Input type="password" value={cpassword} onChange={(e) => setcpassword(e.target.value)} id="exampleEmail" placeholder="Enter Confirm Password" required />
                                        {error ? <Alert severity="error">Password does not match</Alert> : <div></div>}
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="countyPractice" className={classes.label}>County of Practice</Label>
                                        {/* <Input type="text" innerRef={register} name="countypractice" id="countyPractice" placeholder="Enter County of Practice" required /> */}
                                        <Autocomplete
                                            id="county-select"
                                            // style={{ width: 260 }}
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
                                                    label="Choose a County"
                                                    variant="outlined"
                                                    required
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'new-password',
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
                                    </FormGroup>
                                </Col>

                            </Row>
                            <FormGroup>
                                <Label for="email" className={classes.label}>Email</Label>
                                <Input type="email" innerRef={register} name="email" id="exampleAddress" placeholder="Enter Email" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="firmname" className={classes.label}>Firm Name</Label>
                                <Input type="text" innerRef={register} name="firmname" id="exampleAddress" placeholder="Enter Firm Name" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="barid" className={classes.label}>Bar Identification Number</Label>
                                <Input type="number" innerRef={register} name="barid" id="barid" placeholder="Enter Bar Identification Number" required />
                            </FormGroup>
                        </Form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ButtonM onClick={handleClose} color="primary">
                        Cancel
                    </ButtonM>
                    <ButtonM form="my-form" type="submit" color="primary" autoFocus>
                        Submit
                    </ButtonM>
                </DialogActions>
            </Dialog>
        </div > 
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
// Host name - 3.16.63.72
// User name - ec2-user 