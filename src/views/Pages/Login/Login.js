import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import swal from "sweetalert";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SubCtrl from "../../Subscription/subCtrl/subscriptionCtrl";
import Loader from "react-loader";

function Login() {
  const history = useHistory();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("")
  const [open, setOpen] = React.useState(false);
  const [loader, setloader] = useState(true)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  function handle(e) {
    setUserName(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handlePasswordReset(e) {
    setemail(e.target.value);
  }

  var submitResetEmail = () => {
    setloader(false)

    var formData = {
      "email": email
    }
    SubCtrl.resetPassword(formData, (result) => {
      if (result.data.status === "true") {
        swal({
          title: "Success!",
          text: result.data.message,
          icon: "success",
        });
        localStorage.setItem("tokenreset", email);
        setloader(true);
        setOpen(false);
      } else {

        swal({
          title: "Error!",
          text: result.data.message,
          icon: "error",
        });
        setloader(true);
        setOpen(false);
      }
    })

  }

  function handleClick() {
    if (username === "") {
      swal({
        title: "Error!",
        text: " Please enter username",
        icon: "error",
      });
      return false;
    }
    if (password === "") {
      swal({
        title: "Error!",
        text: " Please enter password",
        icon: "error",
      });
      return false;
    }
    let data = {
      email: username,
      password: password
    }

    SubCtrl.userLogin(data, (result) => {
      if (result.data.status === "true") {
        localStorage.setItem("USER_INFO", JSON.stringify(result.data.response));
        localStorage.setItem("username", result.data.response[0].username);
        localStorage.setItem("userId", result.data.response[0].id);
        // console.log(localStorage.getItem("userId"))
        localStorage.setItem("SubscribedCounties", JSON.stringify(result.data.subscribedCounty));

        // if (result.data.email === "admin@gmail.com" && result.data.password === "Admin99$") {
        if (result.data.email === "admin@gmail.com") {
          localStorage.setItem("ADMIN", true);
          localStorage.setItem("token", true);
          history.push('/home/user/user-management');
        } else {
          localStorage.setItem("ADMIN", false);
          localStorage.setItem("token", true);
          localStorage.setItem("firmname", result.data.firmname);
          localStorage.setItem("MailchimpApiKey", result.data.mailchimpApiKey);
          var countyPracticeN = localStorage.getItem("SubscribedCounties");
          var countyPracticeNames = JSON.parse(countyPracticeN);
          if (countyPracticeNames.length > 0) {
            console.log(countyPracticeNames, countyPracticeNames.length);
            history.push('/home/user/leads/' + countyPracticeNames[0].countypractice);
          }
          else {
            history.push('/home/user/county');
          }

        }
      } else if (result.data.msg === "Password is incorrect") {
        swal({
          title: "Error!",
          text: "Incorrect password",
          icon: "error",
        });
      } else if (result.data.msg === "Email is incorrect") {
        swal({
          title: "Error!",
          text: "User not found",
          icon: "error",
        });
      } else if (result.data.msg === "User not registered") {
        swal({
          title: "Error!",
          text: "User not found",
          icon: "error",
        });
      }
    });
  }

  return (
    <div className="app flex-row align-items-center" style={{ fontFamily: 'Poppins' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md="8" sm="12">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form>
                    <img src="/Subscription/logo-with-name.png" alt="logo" style={{ marginLeft: 60, width: 200 }} />
                    {/* <img src="/Subscription/logo.png" alt="logo" style={{ marginLeft: 120, width: 60 }} /> */}
                    <p className="text-muted" style={{ textAlign: "center" }}>Sign in to start reaching prospective clients</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" name="email" autoComplete="username"
                        value={username}
                        onChange={handle} placeholder="Email" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" value={password} onChange={handlePassword} placeholder="Password" autoComplete="password" />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button type="button" style={{ backgroundColor: "#C6A780" }} variant="contained" onClick={handleClick} className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button style={{ fontSize: 12, color: "#C6A780" }} className="px-0" onClick={handleClickOpen}>Forgot password?</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card className="text-white py-5 sm-col-12" style={{ width: '100%', backgroundColor: "#3E5B77" }}>
                <CardBody className="text-center">
                  <h2>Sign up</h2>
                  <Link to="/subscribe">
                    <Button style={{ color: "#ffffff" }} className="mt-3" active tabIndex={-1}>Register Now</Button>
                  </Link>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
      <Loader className="spinner" loaded={loader}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Forgot password?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To reset your password, please enter your registered email address here.
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={email}
              onChange={handlePasswordReset}
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={submitResetEmail} color="primary">
              Confirm
          </Button>
          </DialogActions>
        </Dialog>
      </Loader>
    </div>
  );
}

export default Login;
