import React from 'react';
import { useForm } from "react-hook-form";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

function Forms() {

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              Create <strong>Free</strong> Challenge
              </CardHeader>
            <CardBody>
              <Form id="my-form" onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Challenge Name:</Label>
                      <Input innerRef={register} type="text" name="Challenge_name" id="exampleEmail" placeholder="Please enter challenge name" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="examplePassword">Challenge Description:</Label>
                      <Input innerRef={register} type="text" name="Challenge_description" id="examplePassword" placeholder="Please enter challenge description" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleSelect">Type of Challenge</Label>
                      <Input innerRef={register} type="select" name="Challenge_type" id="exampleSelect">
                        <option>Please Select</option>
                        <option value="Jumping Jack">Jumping Jack</option>
                        <option value="Squat">Squat</option>
                        <option value="Push-up">Push-up</option>
                        <option value="Dance">Dance</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleDate">Challenge Date:</Label>
                      <Input
                        innerRef={register}
                        type="date"
                        name="Challenge_date"
                        id="exampleDate"
                        placeholder="date placeholder"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleTime">Challenge Start Time:</Label>
                      <Input
                        innerRef={register}
                        type="time"
                        name="Challenge_starttime"
                        id="exampleTime"
                        placeholder="time placeholder"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleTime">Challenge End Time:</Label>
                      <Input
                        innerRef={register}
                        type="time"
                        name="Challenge_endtime"
                        id="exampleTime"
                        placeholder="time placeholder"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleTime">Challenge Participants:</Label>
                      <Input
                        innerRef={register}
                        type="number"
                        name="Challenge_participants"
                        min="2"
                        max="10"
                        pattern='[0-9]{0,5}'
                        id="exampleTime"
                        placeholder="Please enter challenge participants"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleTime">Number of Winners:</Label>
                      <Input
                        innerRef={register}
                        type="number"
                        name="winners"
                        id="exampleTime"
                        placeholder="Please enter number of winners"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleTime">Entry Fees:</Label>
                      <Input
                        innerRef={register}
                        type="number"
                        name="Challenge_entryfees"
                        min="2"
                        pattern='[0-9]{0,5}'
                        id="exampleTime"
                        placeholder="Please enter entry fees"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleTime">Our Profit:</Label>
                      <Input
                        innerRef={register}
                        type="number"
                        name="Challenge_ourprofit"
                        id="exampleTime"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleTime">User Profit:</Label>
                      <Input
                        innerRef={register}
                        type="number"
                        name="Challenge_userprofit"
                        min="2"
                        pattern='[0-9]{0,5}'
                        id="exampleTime"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleTime">Pool Price:</Label>
                      <Input
                        type="number"
                        name="Challenge_poolprize"
                        id="exampleTime"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleSelect">Select Target Duration</Label>
                      <Input innerRef={register} type="select" name="Target_Points" id="exampleSelect">
                        <option value="">Please Select</option>
                        <option>Max in 30 seconds</option>
                        <option>Max in 45 seconds</option>
                        <option>Max in 60 seconds</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleSelect">Challenge Duration</Label>
                      <Input innerRef={register} type="select" name="select" id="exampleSelect">
                        <option value="">Please Select</option>
                        <option>30</option>
                        <option>45</option>
                        <option>60</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Challenge Image:</Label>
                      <Input innerRef={register} type="file" name="challenge_image" id="exampleEmail" />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" form="my-form" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Forms;
