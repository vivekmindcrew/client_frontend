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
import SubCtrl from "../Subscription/subCtrl/subscriptionCtrl";
import { Divider } from '@material-ui/core';

function AddMailChimpPage() {
  const history = useHistory();
  const [mailchimpId, setAddMailchimpId] = useState("");

  function handle(e) {
    setAddMailchimpId(e.target.value);
  }

  function handleClick() {
    var userId = localStorage.getItem("userId");
     
    if (mailchimpId === "") {
      swal({
        title: "Error!",
        text: " Please enter your Mailchimp API Key",
        icon: "error",
      });
      return false;
    }
    let data = {
      mailchimpId: mailchimpId,
      userId: userId
    }
    // console.log(data);
    SubCtrl.addMailchimpIdFun(data, (result) => {
      if (result.data.status === true) {
        //  console.log("Mailchimp Id added", result.data.status); 

        localStorage.setItem("MailchimpApiKey", mailchimpId);
        // history.push('/home/user/addMailchimp/');
        // SubCtrl.addTemplateFun(data, (result) => {
        //   console.log("Mailchimp Id added", result.data.status);
        //   if (result.data.status === true) {
            swal({
              title: "Congratulations!",
              text: "You are successfully connected to Mailchimp",
              icon: "success",
            });
           history.push('/home/user/mailchampEdit')
        //   }
        // })
             //  history.push('/home/user/mailchampEdit')

      } else if (result.data.msg === "API KEY Inserted but audience creation failed. Please check your API KEY") {
        swal({
          title: "Error!",
          text: "Please check your API KEY.",
          icon: "error",
        });


      } else if (result.data.msg === "User not found") {
        swal({
          title: "Error!",
          text: "User not found",
          icon: "error",
        });
      } else if (result.data.msg === "Error") {
        swal({
          title: "Error!",
          text: "Error in connecting with server",
          icon: "error",
        });
      }
    });
  }

  var MailchimpApiKeyValue = localStorage.getItem("MailchimpApiKey");
  return (
    <div className=" " style={{ fontFamily: 'Poppins' }}>
      {(MailchimpApiKeyValue === 'null' || MailchimpApiKeyValue === '(NULL)' || MailchimpApiKeyValue === '') ? (
        <Container>
          <h2 style={{ color: "#0d3559", fontFamily: "Poppins", fontSize: 35, margin: 30, textAlign: "center", fontWeight: "bold" }}>
            Automate Solicitations with MailChimp®
                  </h2>
          <Row className="justify-content-center">
            <Col md="8" sm="12">
              <CardGroup>
                <Card className="pt-4">
                  <CardBody>
                    <Form>
                      <p className="text-muted pb-2" style={{ textAlign: "center", fontSize: 20 }}>
                        Enter your <a href="https://us7.admin.mailchimp.com/account/api/" target="blank">Mailchimp API Key</a>
                      </p>
                      <Row className="justify-content-center">

                        <InputGroup className="col-12">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-key"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="mailchimpKey"
                            value={mailchimpId}
                            onChange={handle} placeholder=" API Key" />
                        </InputGroup>
                      </Row>
                      <Row className="pl-4 ml-4 mt-2">
                        <p style={{ fontSize: 13 }}>
                          Don’t have a MailChimp account? Create one for free
                          <a href="https://login.mailchimp.com/signup/" target="blank"> here</a>.
 </p>
                      </Row>
                      <Row className="justify-content-center">
                        <Button type="button" style={{ backgroundColor: "#0d3559", color: "white", marginTop: 20, marginBottom: 20 }} variant="contained" onClick={handleClick} className="px-4">Submit</Button>

                      </Row>
                      <Row className="justify-content-center">
                        <p style={{ fontSize: 13, padding: 0, margin: 0, alignItems: "center" }}>
                          Once you’ve shared your API key with us,
                            </p>
                      </Row>
                      <Row className="justify-content-center">
                        <p style={{ fontSize: 13, padding: 0, margin: 0 }}>
                          check out our guide on
                        <a href="https://www.clientconnect.ai/automation/" target="blank"> setting up your first automation</a>.
                        </p>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      ) : (<Container>
        <h2 style={{ color: "#0d3559", fontFamily: "Poppins", fontSize: 35, margin: 40, textAlign: "center", fontWeight: "bold" }}>
          Automate Solicitations with MailChimp®
       </h2>
        <Row className="justify-content-center">
          <Col md="8" sm="12">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form>
                    {/* <p className="text-muted" style={{ textAlign: "center", fontSize: 20 }}>
                      <h3  style={{ color: "black", fontFamily: "Poppins", fontSize: 25, margin: 40, textAlign: "center", fontWeight: "bold" }}>
                        API Key <br />
                      </h3>
                      <h2  style={{ color: "black", border:"solid 2px",  fontFamily: "Poppins", fontSize: 25, margin: 40, textAlign: "center", fontWeight: "normal" }}>
                      {MailchimpApiKeyValue} 
                      </h2>
                    </p> */}
                    <Row className="justify-content-center">
                      <p style={{ fontSize: 17, margin: 10, fontFamily: "Poppins" }}> Please Check out our guide on
                        <a href="https://www.clientconnect.ai/automation/" target="blank"> setting up your first automation</a>.
                        </p>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>)}
    </div>
  );
}

export default AddMailChimpPage;
