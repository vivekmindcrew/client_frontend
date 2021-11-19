import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import {
    Col, Row, Button, Form, FormGroup, Label, Input,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
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

const useStyles = makeStyles({

});

export default function OutlinedCard(props) {
    const classes = useStyles();
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [county, setCounty] = useState("");


    const handleClose = () => {
        setOpen(false);
    };
    const handleChangeCounty = (val) => {
        setCounty(val.label)
    }
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const currentUserId = localStorage.getItem("userId");
    const onSubmit = (data) => {

        let formData = {
            userId: currentUserId,
            countypractice: county,
        }
        console.log(formData);

        SubsCtrl.addNewCounty(formData, (result) => {
            console.log(result.data.status);
            if (result.data.status === true) {
                history.push('/details');

            } else if (result.data.msg === "This County is already Subscribed") {
                swal({
                    title: "This County is already Subscribed",
                    dangerMode: true,
                    buttons: true,
                });
            } else {
                swal("Something went wrong", {
                    icon: "error",
                });
            }
        })

    }

    return (
        <div>
            <Form id="my-form" className="formCountyadd" onSubmit={handleSubmit(onSubmit)}
            >
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="countyPractice" className={classes.label}>County of Practice</Label>
                            {/* <Input type="text" innerRef={register} name="countypractice" id="countyPractice" placeholder="Enter County of Practice" required /> */}
                            <Autocomplete
                                id="county-select"
                                style={{ width: 260 }}
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
                                            // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            <Row >
                <Col md={4}></Col>
                <Col md={6}>
                    <ButtonM onClick={handleClose} color="primary">
                        Cancel
                    </ButtonM>
                    <ButtonM form="my-form" type="submit" color="primary" autoFocus>
                        Submit
                    </ButtonM>
                </Col>
            </Row>
        </div >
    );
}

const counties = [
    { label: 'Bexar' },
    { label: 'Hillsborough' },
    { label: 'Escambia' },
    { label: 'Los Angeles' },
    { label: 'San Luis Obispo' },
    { label: 'San Bernardino' },
]