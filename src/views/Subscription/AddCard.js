import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import { Col, Row, Button, Form, Label, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import CardContent from '@material-ui/core/CardContent';
import ButtonM from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import SubsCtrl from './subCtrl/subscriptionCtrl';
import Loader from "react-loader";
import './styles1.css';
import swal from 'sweetalert';
import { HistoryRounded } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        minWidth: 230,
        maxHeight: 550,
        width: "50%",
        marginLeft: "25%",
        marginTop: "5%",
        textAlign: "left",
        overflowY: "auto"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
        color: "black"
    },
    pos: {
        marginBottom: 12,
    },
    btn: {
        marginLeft: "40%"
    },
    btn2: {
        backgroundColor: "#021E49",
        marginRight: "30%"
    }
});

const numberNormalise = (value) => {
    const regMatch = /^[0-9]*$/.test(value);
    if(regMatch){
        return value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 23) || ""
    }else{
       const value1 = value.replace(/[^0-9 ]/g, "")
       return value1.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 23) || ""
    } 
}

const allowAlphabet = (value) => {
    const regMatch = /^[a-zA-Z]*$/.test(value);
    if(regMatch){
        return value
    }else{
        return value.replace(/[^a-zA-Z ]/g, "")
    }
}

const allowCvv = (value)=>{
  const regMatch = /^[0-9]*$/.test(value);
  if(regMatch){
      return value.replace(/\s/g, "").substr(0, 4) || ""
  }else{
      const value1 = value.replace(/[^0-9 ]/g, "")
      return value1.replace(/\s/g, "").substr(0, 4) || ""
  }
}


export default function OutlinedCard() {
    const classes = useStyles();
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = React.useState(false);
    const [error, seterror] = useState(false);
    const [error1, seterror1] = useState(false);
    const [error2, seterror2] = useState(false);
    const [loader, setloader] = useState(true)
    const [coupon, setcoupon] = useState(false)
    const [valid, setvalid] = useState(false)
    const [discount, setDiscount] = useState(0)
    const [previousamount, setpreviousamount] = useState(0)
    const [amount, setamount] = useState(0)
    const [testCoupon, settestCoupon] = useState("");

    var countyPracticeN = localStorage.getItem("SubscribedCounties");
    var countyPracticeNames = JSON.parse(countyPracticeN);
    const handleClose = () => {
        setOpen(false);

        // console.log(countyPracticeNames[0].countypractice);
        history.push('/home/user/leads/' + countyPracticeNames[0].countypractice);
        //history.push("/home/user/leads");
        history.go(0);
    };

    const handleClick = () => {
        let coupon = {
            coupon: testCoupon
        }
        let amountlocal = localStorage.getItem("amount")
        amountlocal = amountlocal / 100;
        SubsCtrl.checkCoupon(coupon, (result) => {
            if (result.data.valid === true) {
                setcoupon(false)
                let realamount = result.data.amount_off / 100;
                setamount(amountlocal - realamount)
                setDiscount(realamount);
                setvalid(true)
            } else {
                setDiscount(0);
                setamount(amountlocal);
                setcoupon(true);
                settestCoupon("")
            }
        })
    }

    useEffect(() => {
        let amountlocal = localStorage.getItem("amount");
        setpreviousamount(amountlocal / 100);
        setamount(amountlocal / 100);
    }, [])

    const onSubmit = (data) => {
        // console.log("add card submit");

        setloader(false);
        let cust_id = localStorage.getItem("USER_INFO");
        var customer = JSON.parse(cust_id);
        let customerID = localStorage.getItem("cID");
        let pid = localStorage.getItem("price_id");
        let month = data.month.split('-');
        let userid = localStorage.getItem("userId");
        let countyNamejson = localStorage.getItem("add-countypractice");
        // console.log(countyNamejson);
        let countyName = countyNamejson;
        let formData = {}
        if (customerID) {
            formData = {
                "cName": data.cName,
                "card_no": data.cNo,
                "exp_month": month[1],
                "exp_year": month[0],
                "cvc": data.cvv,
                "customer_id": customerID,
                "price_id": pid,
                "address": data.address, 
                "city": data.city,
                "state": data.state,
                "postal_code": data.postal_code,
                "coupon": testCoupon,
                "userId": userid,
                "countyName": countyName
            }
        } else {
            formData = {
                "cName": data.cName,
                "card_no": data.cNo,
                "exp_month": month[1],
                "exp_year": month[0],
                "cvc": data.cvv,
                "customer_id": customer[0].customerId,
                "price_id": pid,
                "address": data.address, 
                "city": data.city,
                "state": data.state,
                "postal_code": data.postal_code,
                "coupon": testCoupon,
                "userId": userid,
                "countyName": countyName
            }
        }

        let usercounty = localStorage.getItem("add-countypractice");
        // console.log(usercounty)
        // console.log("userid" + userid)
        let countyData = {
            userId: userid,
            countypractice: usercounty,
        }

        if (userid !== null && usercounty !== null) {
            // console.log("add card call");

            SubsCtrl.addNewCounty(countyData, (result1) => {
                console.log(result1); 
                if (result1.data.status === true) {

                    SubsCtrl.addCard(formData, (result) => {
                        console.log(result)
                        if (result.data.status === "true") {
                            // console.log(result);
                            localStorage.setItem("SubscribedCounties", JSON.stringify(result.data.countyName));
                            var MailchimpApiKey = localStorage.getItem("MailchimpApiKey");
                            // console.log(MailchimpApiKey);
                            if (MailchimpApiKey === null) {
                                localStorage.setItem("MailchimpApiKey", 'null');
                            }
                            setloader(true)
                            setOpen(true)
                        } else {
                            setloader(true)
                            if (result.data.error.code === "invalid_number" || result.data.error.code === 'card_declined' || result.data.error.code === 'incorrect_number') {
                                seterror(true)
                            }
                            if (result.data.error.code === 'invalid_expiry_month') {
                                seterror1(true)
                            }
                            if (result.data.error.code === 'invalid_expiry_year') {
                                seterror1(true)
                            }
                            if (result.data.error.code === 'invalid_cvc') {
                                seterror2(true)
                            }
                            else{
                                swal({
                                    title: result.data.error.raw.message,
                                    icon: "error",
                                });
                            }
//"resource_missing"
                            // console.log(false)
                        }
                    })
                } else if (result1.data.msg === "This County is already Subscribed") {
                    setloader(true)
                    swal({
                        title: "This County is already Subscribed",
                        dangerMode: true,
                        buttons: true,
                    }).then(() => {
                        if (countyPracticeNames.length > 0) {
                            // console.log(countyPracticeNames[0].countypractice);
                            history.push('/home/user/leads/' + countyPracticeNames[0].countypractice);
                        }
                        else {
                            history.push('/home/user/county');
                        }
                    });
                } else if (result1.data.msg === "This County is already added but you have cancel subscription") {
                    setloader(true)
                    swal({
                        title: "This County is already added but you have cancelled subscription",
                        dangerMode: true,
                        buttons: true,
                    }).then(() => {
                        if (countyPracticeNames.length > 0) {
                            // console.log(countyPracticeNames[0].countypractice);
                            history.push('/home/user/leads/' + countyPracticeNames[0].countypractice);
                        }
                        else {
                            history.push('/home/user/county');
                        }
                    });
                } else {
                    setloader(true)
                    swal("Something went wrong", {
                        icon: "error",
                    });
                }
            })

        } else {
            setloader(true)
            setOpen(true)
        }


    }
    // console.log("add card");
    return (
        <div className="container">
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Please add your card details
                </Typography>
                    <Form id="my-form" onSubmit={handleSubmit(onSubmit)}>
                        <Row form>
                            <Col md={12}>
                                <Label for="cardno">Card Name</Label>
                                <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="icon-user"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input innerRef={register} type="text" name="cName" onChange={(event) => {
                                        const { value } = event.target
                                        event.target.value = allowAlphabet(value)
                                    }} placeholder="Name on card" required />
                                    {error ? <Alert severity="error">Please check name on card!</Alert> : <div></div>}
                                </InputGroup>
                            </Col>
                            <Col md={12}>
                                <Label for="cardno">Card Number</Label>
                                <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="icon-credit-card"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input innerRef={register} type="tel" inputMode="numeric" name="cNo" id="cNo" 
                                      onChange={(event) => {
                                        const { value } = event.target
                                        event.target.value = numberNormalise(value)
                                    }} placeholder="0000 0000 0000 0000" required />
                                    {error ? <Alert severity="error">Please check card number!</Alert> : <div></div>}
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={12}>
                                <Label for="month">Expiry Month & Year</Label>
                                <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="icon-calendar"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input innerRef={register} type="month" defaultValue="2020-12" name="month" id="exampleCity" placeholder="MM / YYYY" required />
                                    {error1 ? <Alert severity="error">Please check month and year!</Alert> : <div></div>}
                                </InputGroup>
                            </Col>
                            <Col md={12}>
                                <Label for="cvv">CVV</Label>
                                <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="icon-lock"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input innerRef={register} type="password" name="cvv" id="exampleCity" onChange={(event) => {
                                        const { value } = event.target
                                        event.target.value = allowCvv(value)
                                    }} placeholder="----" required />
                                    {error2 ? <Alert severity="error">Please check CVV!</Alert> : <div></div>}
                                </InputGroup>
                            </Col>
                            <Col md={12}>
                                <Label for="address">Address 1</Label>
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-building-o"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input innerRef={register} type="text" name="address" placeholder="Address Line 1" required />
                                </InputGroup>
                            </Col>
                             <Col md={6}>
                                <Label for="city">City</Label>
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-road"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input innerRef={register} type="text" name="city" placeholder="City" required />
                                </InputGroup>
                            </Col>
                            <Col md={6}>
                                <Label for="state">State</Label>
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-globe"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input innerRef={register} type="text" name="state" placeholder="State" required />
                                </InputGroup>
                            </Col>
                            <Col md={12}>
                                <Label for="postal_code">Postal Code</Label>
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-globe"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input innerRef={register} type="text" maxLength="5" name="postal_code" pattern="[0-9]{5}" placeholder="Postal Code" required />
                                </InputGroup>
                            </Col>
                            <Col md={12}>
                                <Label for="coupon">Promo Code</Label>
                                <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="icon-credit-card"></i>
                                        </InputGroupText>

                                    </InputGroupAddon>
                                    <Input placeholder="" innerRef={register} type="text" name="coupon" defaultValue={testCoupon}
                                        onChange={(e) => settestCoupon(e.target.value)} />

                                    <InputGroupAddon addonType="append">
                                        <Button color="secondary" onClick={handleClick}>Apply</Button> </InputGroupAddon>
                                </InputGroup>
                            </Col>

                            <Col md={12}>
                                {coupon ? <Alert severity="error">Promo is invalid</Alert> : valid ? <Alert severity="success">Promo is valid</Alert> : <div></div>}
                                <div>
                                    <h5 className="text-muted" style={{ marginBottom: 15 }}>Amount Due:<span style={{ marginLeft: "70%" }}>{"$" + previousamount}</span></h5>
                                    <h5 className="text-muted" style={{ marginBottom: 15 }}>Discount:{discount > 0 ? <span style={{ marginLeft: "73%" }}>{"- $" + discount}</span> : <span style={{ marginLeft: "78%" }}>{"- " + discount}</span>}</h5>
                                    <h5 style={{ marginBottom: 15 }}>Total:<span style={{ marginLeft: "82%" }}>{"$" + amount}</span></h5>
                                </div>
                            </Col>
                            <Col md={12}>
                                <FormGroup check>
                                    <Label check style={{ marginBottom: "10px" }}>
                                        <Input type="checkbox" required />{' '}
                                        I agree to the <a href="https://www.clientconnect.ai/terms/" target="_blank" rel="noopener noreferrer">Terms of Use</a> & <a href="https://www.clientconnect.ai/privacypolicy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <ButtonM className={classes.btn} form="my-form" type="submit" size="medium" color="primary" variant="contained">Subscribe</ButtonM>
                    </Form>
                </CardContent>
            </Card>
            <Loader loaded={loader} className="spinner">
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Congratulations on your new subscription!</DialogTitle>
                    <DialogContent>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} className={classes.btn2} color="primary">
                            Access County Data
                        </Button>
                    </DialogActions>
                </Dialog>
            </Loader>
        </div>
    );
}
