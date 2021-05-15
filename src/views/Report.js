import React from "react";
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
    Table,
  } from "reactstrap";

const Report = () => {
    
    React.useEffect(() => {
        
    }, []);

    return (
        <div className="content">
            <Row>
                <Col md="4">
                    <Card className="card-stats">
                        <CardBody>  
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th colSpan ="2">Asignación Costos Variables</th>
                                    </tr>
                                    <tr>
                                        <th>Etapa</th>
                                        <th className="text-right">Cost. Unit.</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Dakota Rice</td>
                                        <td className="text-right">$36,738</td>
                                    </tr>
                                    <tr>
                                        <td>Minerva Hooper</td>
                                        <td className="text-right">$23,789</td>
                                    </tr>
                                    <tr>
                                        <td>Sage Rodriguez</td>
                                        <td className="text-right">$56,142</td>
                                    </tr>
                                    <tr>
                                        <td>Philip Chaney</td>
                                        <td className="text-right">$38,735</td>
                                    </tr>
                                    <tr>
                                        <td>Doris Greene</td>
                                        <td className="text-right">$63,542</td>
                                    </tr>
                                    <tr>
                                        <td>Mason Porter</td>
                                        <td className="text-right">$78,615</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                    <Card className="card-stats">
                        <CardBody>
                            <p className="card-category">Asignación Costos Fijos</p>

                            <Table>
                                <thead className="text-primary">
                                    <tr>
                                        <th>Total</th>
                                        <th>BA (Días)</th>
                                        <th className="text-right">Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Dakota Rice</td>
                                        <td>4</td>
                                        <td className="text-right">$36,738</td>
                                    </tr>
                                    <tr>
                                        <td>Minerva Hooper</td>
                                        <td>4</td>
                                        <td className="text-right">$23,789</td>
                                    </tr>
                                    <tr>
                                        <td>Sage Rodriguez</td>
                                        <td>4</td>
                                        <td className="text-right">$56,142</td>
                                    </tr>
                                    <tr>
                                        <td>Philip Chaney</td>
                                        <td>4</td>
                                        <td className="text-right">$38,735</td>
                                    </tr>
                                    <tr>
                                        <td>Doris Greene</td>
                                        <td>4</td>
                                        <td className="text-right">$63,542</td>
                                    </tr>
                                    <tr>
                                        <td>Mason Porter</td>
                                        <td>4</td>
                                        <td className="text-right">$78,615</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>

                <Col md="8">
                    <Card className="card-stats">
                        <CardBody>
                            <p className="card-category">Estado de Resultados (1)</p>

                            <Table>
                                <thead className="text-primary">
                                    <tr>
                                        <th></th>
                                        <th>Cant.</th>
                                        <th>C.U.</th>
                                        <th className="text-right">Importe</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Dakota Rice</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td className="text-right">$36,738</td>
                                    </tr>
                                    <tr>
                                        <td>Minerva Hooper</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td className="text-right">$23,789</td>
                                    </tr>
                                    <tr>
                                        <td>Sage Rodriguez</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td className="text-right">$56,142</td>
                                    </tr>
                                    <tr>
                                        <td>Philip Chaney</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td className="text-right">$38,735</td>
                                    </tr>
                                    <tr>
                                        <td>Doris Greene</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td className="text-right">$63,542</td>
                                    </tr>
                                    <tr>
                                        <td>Mason Porter</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td className="text-right">$78,615</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>

                    <Card className="card-stats">
                        <CardBody>
                            <p className="card-category">Estado de Resultados (2)</p>

                            <Table>
                                <thead className="text-primary">
                                    <tr>
                                        <th></th>
                                        <th>Cant.</th>
                                        <th>C.U.</th>
                                        <th className="text-right">Importe</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Dakota Rice</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td className="text-right">$36,738</td>
                                    </tr>
                                    <tr>
                                        <td>Minerva Hooper</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td className="text-right">$23,789</td>
                                    </tr>
                                    <tr>
                                        <td>Sage Rodriguez</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td className="text-right">$56,142</td>
                                    </tr>
                                    <tr>
                                        <td>Philip Chaney</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td className="text-right">$38,735</td>
                                    </tr>
                                    <tr>
                                        <td>Doris Greene</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td className="text-right">$63,542</td>
                                    </tr>
                                    <tr>
                                        <td>Mason Porter</td>
                                        <td>0.00</td>
                                        <td>0.00</td>
                                        <td className="text-right">$78,615</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md = "3">
                    <Card className="card-stats">
                        <CardBody>
                            <p className="card-category">Margen de Contribución</p>

                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Dakota Rice</td>
                                        <td className="text-right">$36,738</td>
                                    </tr>
                                    <tr>
                                        <td>Minerva Hooper</td>
                                        <td className="text-right">$23,789</td>
                                    </tr>
                                    <tr>
                                        <td>Sage Rodriguez</td>
                                        <td className="text-right">$56,142</td>
                                    </tr>
                                    <tr>
                                        <td>Philip Chaney</td>
                                        <td className="text-right">$38,735</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>        
                </Col>
                <Col md = "3">
                <Card className="card-stats">
                        <CardBody>
                            <p className="card-category">Margen de Contribución</p>

                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Dakota Rice</td>
                                        <td className="text-right">$36,738</td>
                                    </tr>
                                    <tr>
                                        <td>Minerva Hooper</td>
                                        <td className="text-right">$23,789</td>
                                    </tr>
                                    <tr>
                                        <td>Sage Rodriguez</td>
                                        <td className="text-right">$56,142</td>
                                    </tr>
                                    <tr>
                                        <td>Philip Chaney</td>
                                        <td className="text-right">$38,735</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
                <Col md = "3">
                <Card className="card-stats">
                        <CardBody>
                            <p className="card-category">Margen de Contribución</p>

                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Dakota Rice</td>
                                        <td className="text-right">$36,738</td>
                                    </tr>
                                    <tr>
                                        <td>Minerva Hooper</td>
                                        <td className="text-right">$23,789</td>
                                    </tr>
                                    <tr>
                                        <td>Sage Rodriguez</td>
                                        <td className="text-right">$56,142</td>
                                    </tr>
                                    <tr>
                                        <td>Philip Chaney</td>
                                        <td className="text-right">$38,735</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
                <Col md = "3">
                <Card className="card-stats">
                        <CardBody>
                            <p className="card-category">Margen de Contribución</p>

                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Dakota Rice</td>
                                        <td className="text-right">$36,738</td>
                                    </tr>
                                    <tr>
                                        <td>Minerva Hooper</td>
                                        <td className="text-right">$23,789</td>
                                    </tr>
                                    <tr>
                                        <td>Sage Rodriguez</td>
                                        <td className="text-right">$56,142</td>
                                    </tr>
                                    <tr>
                                        <td>Philip Chaney</td>
                                        <td className="text-right">$38,735</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
    </div>
  );
};

export default Report;