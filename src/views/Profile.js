import React from "react";
import imgBackground from '../assets/img/damir-bosnjak.jpg'
import imgProfile from '../assets/img/mike.jpg'

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  } from "reactstrap";

const Profile = () => {
    
    React.useEffect(() => {
        
    }, []);

    return (
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img
                    alt="..."
                    src={imgBackground}
                  />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={imgProfile}
                      />
                      <h5 className="title">Luis Pizarro</h5>
                    </a>
                    <p className="description">@pizarcan</p>
                  </div>
                  <p className="description text-center">
                    "Si algo se puede soñar se <br />
                    puede programar"
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Editar Perfil</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Nombres</label>
                          <Input
                            defaultValue="Chet"
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Apellidos</label>
                          <Input
                            defaultValue="Faker"
                            placeholder="Last Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Dirección</label>
                          <Input
                            defaultValue="Melbourne, Australia"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Acerca de mí</label>
                          <Input
                            type="textarea"
                            defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Actualizar Perfil
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
  );
};

export default Profile;