import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Col, Row, Button } from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ButtonM from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SubsCtrl from './subCtrl/subscriptionCtrl';
import Loader from "react-loader";
import './style.css';
import swal from 'sweetalert';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginTop: "8%",
        textAlign: "center",
        borderRadius: 5,
        fontFamily: 'Poppins',
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
        color: "white"
    },
    money: {
        backgroundColor: "#ffffff",
        display: "block",
        padding: "5px"
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
        padding: 10
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
});

export default function OutlinedCard(props) {
    const classes = useStyles();
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [loader, setloader] = useState(false);
    const [isTrue, setTrue] = useState(false);


    const handleClickOpen = (id, amount) => {
        localStorage.setItem("price_id", id);
        localStorage.setItem("amount", amount);
        const isAuthenticated = localStorage.getItem('token');
        if (isAuthenticated) {
            history.push("/details");
        } else {
            history.push("/");
        }
    };

    useEffect(() => {
        SubsCtrl.getSubscription((result) => {
            if (result.data.data.data.length > 0) {
                setRows(result.data.data.data);
                setloader(true);
            } else {
                setTrue(false);
                setloader(true);
                swal({
                    title: "Error!",
                    text: "Please check all the fields",
                    icon: "error",
                });
                console.log("false")
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
                                        <Card className={classes.root} variant="outlined"
                                            style={{ backgroundColor: i === 1 ? "#c69f6f" : "#eef4f5", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
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
                                            <ButtonM className={classes.btn} onClick={() => handleClickOpen(row.id, row.amount)} size="medium" 
                                            variant="contained" style={{ fontFamily: 'Poppins', backgroundColor: i === 1 ? "white" : "#c69f6f", color: i === 1 ? "#c69f6f" : "white" }}>Get Started</ButtonM>
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
        </div >
    );
}