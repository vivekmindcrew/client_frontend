import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import swal from "sweetalert";
import subsCtrl from "../Subscription/subCtrl/subscriptionCtrl";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
    countyCard: {
        minWidth: 650,
        fontFamily: "Poppins",
        fontSize: 35,
        border: "none"
    },
    btn3: {
        backgroundColor: "#021E49",
        color: "white",
    }
});

export default function ManageSubscriptionpage() {
    const classes = useStyles();
    const [rows, setrows] = useState([]);
    var userId = localStorage.getItem("userId");
    const [nocounty, setnocounty] = useState();
    const [open, setOpen] = React.useState(false);
    const [sId, setSId] = React.useState();

    useEffect(
        () => {
            // setloader(true);
            var userId = localStorage.getItem("userId");
            // console.log(userId, "dfbdshfffffffffffff");
            let userData = {
                "userId": userId
            };
            subsCtrl.getCountyName(userData, (result) => {
                // console.log(result.data.data);
                if (result.data.status === true) {
                    setrows(result.data.data);
                    // console.log(result.data.data[0].isSubscribed, "Check subscription"); 
                    if (result.data.data.length < 0) {
                        setrows([]);
                    }

                } else {
                    setrows([]);
                    setnocounty(true);
                }
            })
        },
        [],
    )
    function handleClose() {

        var userData = {
            subId: sId,
            userId: userId
        }
        setOpen(false);
        // console.log(userData, "User Data");
         subsCtrl.cancelSubscription(userData, (result) => {
            // console.log(result.data.status);
            if (result.data.status === true) { 
                // console.log(result.data.subscribedCounty);
                // console.log(JSON.stringify(result.data.subscribedCounty));
                localStorage.setItem("SubscribedCounties", JSON.stringify(result.data.subscribedCounty));
                window.location.reload(false);

            } else {
                console.log(result.data);
            }
        })
    }
    function handleCancel() {
        setOpen(false);
    }
    function cancelSubscriptionFun(e) {
        setSId(e);
        // console.log(e, "fsdfds");
        setOpen(true);
    }

    return (
        <div style={{}}>
            <h2 style={{ color: "#0d3559", margin: "2%", fontFamily: "Poppins", fontSize: 35, marginBottom: 10, textAlign: "center", fontWeight: "bold" }}>
                Manage Subscription
            </h2>
            {(!nocounty) ? (
                <div className=" countyCard" style={{ fontFamily: "Poppins", marginTop: "5%", padding: 40, fontSize: 20 }}>
                    <Row className="">
                        {rows.map((row, index) => (
                            <Col md={4} sm={6} lg={3} key={row.id} align="center" className="" style={{ backgroundColor: "#4F5D75", color: "white", margin: 20, borderRadius: "5px", paddingTop: 30, 
                            paddingBottom: 30, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} >
                                {(row.isSubscribed == 1) ? (
                                    <div>
                                        <div style={{ height: "100px" }}> {row.countypractice} </div>
                                        <Button type="button" className="" onClick={() => cancelSubscriptionFun(row.subId)}
                                            style={{ backgroundColor: "#eef4f5", margin: 30 }} >
                                            Cancel Subscription
                                        </Button>
                                    </div>
                                ) : (<p></p>)}
                            </Col>
                        ))}
                    </Row>
                </div>
            ) : (
                    <div>
                        <h4 style={{
                            color: "white", backgroundColor: "rgba(0, 0, 0, 0.2)", padding: "2%", margin: "15%",
                            fontFamily: "Poppins", fontSize: 25, marginBottom: 10, textAlign: "center", fontWeight: "bold"
                        }}>
                            You have not subscribed to any County<br /><br />Please ADD COUNTY
                        </h4>
                    </div>

                )}
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Do you want to unsubscribe this county?</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} style={{
                        backgroundColor: "#021E49",
                        color: "white",
                    }}>
                        Cancel
                        </Button>
                    <Button onClick={handleClose} style={{
                        backgroundColor: "#021E49",
                        color: "white",
                    }}>
                        Done
                        </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}