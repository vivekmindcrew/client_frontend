import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useForm } from "react-hook-form";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import SubCtrl from "../../Subscription/subCtrl/subscriptionCtrl";
import Alert from '@material-ui/lab/Alert';
import swal from "sweetalert";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './styles.css'

const useStyles = makeStyles({

    root: {
        minWidth: 500,
        position: "absolute",
        top: "50%",
        left: "35%",
        textAlign: "center",
        marginTop: "10%",
        fontFamily: 'Poppins',
        zIndex: 1
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 25,
        fontFamily: 'Poppins',
        color: '#C6A780',
        fontWeight: 'bold'
    },
    pos: {
        marginBottom: 12,
    },
    btn: {
        backgroundColor: " #3E5B77",
        marginBottom: 20
    }
});

export default function OutlinedCard(props) {
    const classes = useStyles();
    const [npassword, setnpassword] = useState("")
    const [cpassword, setcpassword] = useState("");
    const { register, handleSubmit } = useForm();
    const [error, seterror] = useState(false);
    const [email, setemail] = useState("");
    const history = useHistory();

    var handleConfirm = (e) => {
        setcpassword(e.target.value)

    }

    useEffect(() => {
        setemail(props.match.params.id)
    }, [email, props.match.params.id])

    var onSubmit = (data) => {
        // var email = localStorage.getItem("tokenreset");

        if (cpassword !== data.npassword) {
            seterror(true);

        } else {
            seterror(false);
            var formData = {
                "id": email,
                "password": cpassword
            }
            console.log(formData)
            SubCtrl.submitPassword(formData, (result) => {
                if (result.data.status === "true") {
                    swal({
                        title: "Password has been reset, Want to login again?",
                        icon: "warning",
                        buttons: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                history.push('/');
                                history.go(0);
                            } else {
                                history.push('/');
                                history.go(0);
                            }
                        });

                } else {
                    swal({
                        title: "Error!",
                        text: result.data.message,
                        icon: "error",
                    });
                }
            })
        }

    }

    return (
        <div className={classes.con}>
            <Form id="my-form" onSubmit={handleSubmit(onSubmit)} style={{ fontFamily: 'Poppins' }}>
                <Row>
                    <Col>
                        <Card className={classes.root} variant="outlined">
                            {/* <i class="fa fa-lock" style={{ fontSize: 100, marginTop: 10, color: 'red' }} aria-hidden="true"></i> */}
                            <LockOutlinedIcon style={{ fontSize: 100, marginTop: 20, color: 'black', opacity: 0.48 }} />
                            <Typography className={classes.title} color="textPrimary">
                                Reset Password
                        </Typography>
                            <CardContent>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="icon-lock"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input innerRef={register} placeholder="New Password" type="password" name="npassword" value={npassword} pattern="^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$" onChange={(e) => { setnpassword(e.target.value) }} autoFocus />
                                </InputGroup>
                                <br />
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="icon-lock"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Confirm Password" type="password" value={cpassword} onChange={handleConfirm} />
                                </InputGroup><br />
                                {error ? <Alert severity="error">Password did not match !</Alert> : ""}

                            </CardContent>
                            <Button variant="contained" size="large" form="my-form" type="submit" className={classes.btn} color="primary">
                                Reset Password
                        </Button>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
