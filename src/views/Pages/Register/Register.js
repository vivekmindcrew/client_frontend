import React from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, CardFooter, Row } from 'reactstrap';
import subsCtrl from '../../Subscription/subCtrl/subscriptionCtrl';
import swal from "sweetalert";

function Register() {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    let formData = {
      email: data.email,
      username: data.username,
      password: data.password,
      country: data.country
    }
    console.log(formData);
    subsCtrl.userRegister(data, (result) => {
      console.log(result)
      if (result.data.status === "true") {
        localStorage.setItem("USER_INFO", JSON.stringify(result.data.response));
        //localStorage.setItem("ADMIN", true);
        localStorage.setItem("token", true);
        history.push('/subscribe');
      } else if (result.data.status === "true1") {
        swal({
          title: "Error!",
          text: "User already exists",
          icon: "error",
        });
      } else {
        swal({
          title: "Error!",
          text: "Something went wrong",
          icon: "error",
        });
      }
    })
  }
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form id="my-form" onSubmit={handleSubmit(onSubmit)}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <Input type="text" innerRef={register} name="username" placeholder="Username" autoComplete="username" required />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input type="text" innerRef={register} name="email" placeholder="Email" autoComplete="email" required />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input type="password" innerRef={register} name="password" placeholder="Password" autoComplete="password" required />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input type="country" innerRef={register} name="country" placeholder="Country" required />
                  </InputGroup>
                  <Button color="success" form="my-form" type="submit" block>Create Account</Button>
                </Form>
              </CardBody>
              <CardFooter className="p-4">
                <Link to="/">
                  <Row>
                    <Col xs="12" sm="12">
                      <Button className="btn-facebook mb-1" block><span>Log In</span></Button>
                    </Col>
                  </Row>
                </Link>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
