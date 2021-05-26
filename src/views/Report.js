import React, { useState } from "react";
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
import AuthService from '../services/auth.service';
import CostService from "../services/cost.service";

const Report = () => {
    
    const currentUser = AuthService.getCurrentUser();  
    const [resumeCost, setResumeCost] = React.useState([]);

    const [detailFase1, setDetailFase1] = React.useState([]);
    const [detailFase2, setDetailFase2] = React.useState([]);
    const [detailFase3, setDetailFase3] = React.useState([]);
    const [detailFase4, setDetailFase4] = React.useState([]);

    const [valorVenta1, setValorVenta1] = useState(null);
    const [valorVenta2, setValorVenta2] = useState(null);

    React.useEffect(() => {
        RetornarResumenCostos();
    }, []);

    const RetornarResumenCostos = async () => {
        const data = await CostService.showResumeCost(currentUser.dni);
        const dataFase1 = data.filter(x => x.id === 1).shift(); 
        const dataFase2 = data.filter(x => x.id === 2).shift(); 
        const dataFase3 = data.filter(x => x.id === 3).shift(); 
        const dataFase4 = data.filter(x => x.id === 4).shift(); 
        setResumeCost(data); 
        setDetailFase1(dataFase1);
        setDetailFase2(dataFase2);
        setDetailFase3(dataFase3);
        setDetailFase4(dataFase4);
    }

    const ActualizarResumen = async (valorVenta1, valorVenta2) => {
        const dni = currentUser.dni;
        const data = await CostService.insertUpdateResumen(dni, valorVenta1, valorVenta2)
                                      .then(json => {
                                          onCancel();
                                          RetornarResumenCostos();
                                        });                                   
      }

    const [inEditMode, setInEditMode] = useState({
        status: false
    });
  
    const onEdit = ({currentValorVenta1, currentValorVenta2}) => {
      setInEditMode({
          status: true
      })
      setValorVenta1(currentValorVenta1);
      setValorVenta2(currentValorVenta2);
    }
  
    const onSave = ({newValorVenta1, newValorVenta2}) => {
        ActualizarResumen(newValorVenta1, newValorVenta2);  
    }
  
    const onCancel = () => {
      // reset the inEditMode state value
      setInEditMode({
          status: false
      })
      // reset the unit price state value
      setValorVenta1(null);
      setValorVenta2(null);
    }

    return (
        <div className="content">
            <Row>
                <Col md="4">
                    <Card className="card-stats">
                        <CardBody>  
                            <Table>
                                <thead className="font-weight-bold text-primary">
                                    <tr>
                                        <td colspan="2" className="text-center">Asignación Costos Variables</td>
                                    </tr>
                                    <tr>
                                        <td>Etapa</td>
                                        <td className="text-right">Cost. Unit.</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Reproducción</td>
                                        <td className="text-right">{parseFloat(detailFase1.Poblacion).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Lactancia</td>
                                        <td className="text-right">{parseFloat(detailFase2.Poblacion).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Recría</td>
                                        <td className="text-right">{parseFloat(detailFase3.Poblacion).toFixed(2)}</td>
                                    </tr>
                                    <tr className="table-info left-title">
                                        <td>Total (1)</td>
                                        <td className="text-right">{parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.Poblacion)), 0)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Engorde</td>
                                        <td className="text-right">{parseFloat(detailFase4.Poblacion).toFixed(2)}</td>
                                    </tr>
                                    <tr className="table-info left-title">
                                        <td>Total (2)</td>
                                        <td className="text-right">{parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.Poblacion), 0)).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                    <Card className="card-stats">
                        <CardBody>
                            <Table>
                                <thead className="font-weight-bold text-primary">
                                    <tr>
                                        <td colspan="3" className="text-center">Asignación Costos Fijos</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>BA (Días)</td>
                                        <td className="text-right">Total</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Reproducción</td>
                                        <td>{detailFase1.Duracion}</td>
                                        <td className="text-right">{parseFloat(detailFase1.CostoTotalFijo).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Lactancia</td>
                                        <td>{detailFase2.Duracion}</td>
                                        <td className="text-right">{parseFloat(detailFase2.CostoTotalFijo).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Recría</td>
                                        <td>{detailFase3.Duracion}</td>
                                        <td className="text-right">{parseFloat(detailFase3.CostoTotalFijo).toFixed(2)}</td>
                                    </tr>
                                    <tr className="table-info left-title">
                                        <td>Total (1)</td>
                                        <td>{resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.Duracion)), 0)}</td>
                                        <td className="text-right">{parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.CostoTotalFijo)), 0)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Engorde</td>
                                        <td>{detailFase4.Duracion}</td>
                                        <td className="text-right">{parseFloat(detailFase4.CostoTotalFijo).toFixed(2)}</td>
                                    </tr>
                                    <tr className="table-info left-title">
                                        <td>Total (2)</td>
                                        <td>{resumeCost.reduce((total, x) => total = total + parseFloat(x.Duracion), 0)}</td>
                                        <td className="text-right">{parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.CostoTotalFijo), 0)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td># de Cuyes (1)</td>
                                        <td></td>
                                        <td className="text-right">{detailFase1.CantidadRecria}</td>
                                    </tr>
                                    <tr>
                                        <td># de Cuyes (2)</td>
                                        <td></td>
                                        <td className="text-right">{detailFase1.CantidadEngorde}</td>
                                    </tr>
                                    <tr>
                                        <td>Costo Unitario (1)</td>
                                        <td></td>
                                        <td className="text-right">{parseFloat(parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.CostoTotalFijo)), 0)).toFixed(2) / parseFloat(detailFase1.CantidadRecria).toFixed(2)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Costo Unitario (2)</td>
                                        <td></td>
                                        <td className="text-right">{parseFloat(parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.CostoTotalFijo), 0)).toFixed(2) / parseFloat(detailFase1.CantidadEngorde).toFixed(2)).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>

                    <Card className="card-stats">
                        <CardBody>
                            <Table>
                                <thead className="font-weight-bold text-primary">
                                    <tr>
                                        <td colspan="2" className="text-center">Costo Unit. Total</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>CVUnit.</td>
                                        <td className="text-right">{parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.Poblacion)), 0)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>CFUnit.</td>
                                        <td className="text-right">{parseFloat(parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.CostoTotalFijo)), 0)).toFixed(2) / parseFloat(detailFase1.CantidadRecria).toFixed(2)).toFixed(2)}</td>
                                    </tr>
                                    <tr className="table-info left-title">
                                        <td>Total</td>
                                        <td className="text-right">{parseFloat(parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.Poblacion)), 0)) + parseFloat(parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.CostoTotalFijo)), 0)).toFixed(2) / parseFloat(detailFase1.CantidadRecria).toFixed(2))).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>

                    <Card className="card-stats">
                        <CardBody>
                            <Table>
                                <thead className="font-weight-bold text-primary">
                                    <tr>
                                        <td colspan="2" className="text-center">Costo Unit. Total</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>CVUnit.</td>
                                        <td className="text-right">{parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.Poblacion), 0)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>CFUnit.</td>
                                        <td className="text-right">{parseFloat(parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.CostoTotalFijo), 0)).toFixed(2) / parseFloat(detailFase1.CantidadEngorde).toFixed(2)).toFixed(2)}</td>
                                    </tr>
                                    <tr className="table-info left-title">
                                        <td>Total</td>
                                        <td className="text-right">{parseFloat(parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.Poblacion), 0)) + parseFloat(parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.CostoTotalFijo), 0)).toFixed(2) / parseFloat(detailFase1.CantidadEngorde).toFixed(2))).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>

                <Col md="8">
                    <Card className="card-stats">
                        <CardBody>
                            <Table>
                                <thead className="font-weight-bold text-primary">
                                    <tr>
                                        <td colspan="4" className="text-center">Estado de Resultados (1)</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Cant.</td>
                                        <td>C.U.</td>
                                        <td className="text-right">Importe</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Ingresos</td>
                                        <td>{detailFase1.CantidadRecria}</td>
                                        <td>{detailFase1.ValorVenta1}</td>
                                        <td className="text-right">{parseFloat(detailFase1.CantidadRecria) * parseFloat(detailFase1.ValorVenta1)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-danger">Costos Variables</td>
                                        <td>{detailFase1.CantidadRecria}</td>
                                        <td>{parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.Poblacion)), 0)).toFixed(2)}</td>
                                        <td className="text-right">{parseFloat(detailFase1.CantidadRecria) * parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.Poblacion)), 0)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Margen de Contribución</td>
                                        <td></td>
                                        <td></td>
                                        <td className="text-right text-danger">{parseFloat((parseFloat(detailFase1.CantidadRecria) * parseFloat(detailFase1.ValorVenta1)) - (parseFloat(detailFase1.CantidadRecria) * parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.Poblacion)), 0)).toFixed(2))).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-danger">Costos Fijos</td>
                                        <td></td>
                                        <td></td>
                                        <td className="text-right">{parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.CostoTotalFijo)), 0)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Utilidad Operativa</td>
                                        <td></td>
                                        <td></td>
                                        <td className="text-right text-danger">{parseFloat(((parseFloat(detailFase1.CantidadRecria) * parseFloat(detailFase1.ValorVenta1)) - (parseFloat(detailFase1.CantidadRecria) * parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.Poblacion)), 0)).toFixed(2))) - (parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.CostoTotalFijo)), 0)).toFixed(2))).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>

                    <Card className="card-stats">
                        <CardBody>
                            <Table>
                                <thead className="font-weight-bold text-primary">
                                    <tr>
                                        <td colspan="4" className="text-center">Estado de Resultados (2)</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Cant.</td>
                                        <td>C.U.</td>
                                        <td className="text-right">Importe</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Ingresos</td>
                                        <td>{detailFase1.CantidadEngorde}</td>
                                        <td>{detailFase1.ValorVenta2}</td>
                                        <td className="text-right">{parseFloat(detailFase1.CantidadEngorde)*parseFloat(detailFase1.ValorVenta2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-danger">Costos Variables</td>
                                        <td>{detailFase1.CantidadEngorde}</td>
                                        <td>{parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.Poblacion), 0)).toFixed(2)}</td>
                                        <td className="text-right">{parseFloat(parseFloat(detailFase1.CantidadEngorde) * parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.Poblacion), 0)).toFixed(2)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Margen de Contribución</td>
                                        <td></td>
                                        <td></td>
                                        <td className="text-right text-danger">{parseFloat(parseFloat(detailFase1.CantidadEngorde)*parseFloat(detailFase1.ValorVenta2) - parseFloat(parseFloat(detailFase1.CantidadEngorde) * parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.Poblacion), 0)).toFixed(2)).toFixed(2)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-danger">Costos Fijos</td>
                                        <td></td>
                                        <td></td>
                                        <td className="text-right">{parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.CostoTotalFijo), 0)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Utilidad Operativa</td>
                                        <td></td>
                                        <td></td>
                                        <td className="text-right text-danger">{parseFloat(parseFloat(detailFase1.CantidadEngorde)*parseFloat(detailFase1.ValorVenta2) - parseFloat(parseFloat(detailFase1.CantidadEngorde) * parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.Poblacion), 0)).toFixed(2)).toFixed(2)).toFixed(2) - parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.CostoTotalFijo), 0)).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>

                    <Card className="card-stats">
                        <CardBody>
                            <Table>
                                <thead className="font-weight-bold text-primary">
                                    <tr>
                                        <td></td>
                                        <td className="text-center">Margen de Contribución (1)</td>
                                        <td className="text-center">Margen de Contribución (2)</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="table-danger left-title">
                                        <td>Valor de Venta</td>
                                        <td className="text-right">
                                            {
                                            inEditMode.status ? (
                                                <input value={valorVenta1}
                                                        className={"form-control input-cost"}
                                                        onChange={(event) => setValorVenta1(event.target.value)}
                                                />
                                                ) : ( detailFase1.ValorVenta1 )
                                            }
                                        </td>
                                        <td className="text-right">
                                            {
                                            inEditMode.status ? (
                                                <input value={valorVenta2}
                                                        className={"form-control input-cost"}
                                                        onChange={(event) => setValorVenta2(event.target.value)}
                                                />
                                                ) : ( detailFase1.ValorVenta2 )
                                            }
                                        </td>
                                        <td>
                                        {
                                            inEditMode.status ? (
                                                <React.Fragment>
                                                <Button
                                                    className=" btn-icon"
                                                    color="success"
                                                    onClick={() => onSave({newValorVenta1: valorVenta1, newValorVenta2: valorVenta2})}
                                                ><i className={"fa fa-save"}></i>
                                                </Button>

                                                <Button
                                                    className=" btn-icon"
                                                    color="danger"
                                                    onClick={() => onCancel()}
                                                ><i className={"fa fa-close"}></i>
                                                </Button>
                                                </React.Fragment>
                                            ) : (
                                                    <Button 
                                                        className=" btn-icon"
                                                        color="info"
                                                        onClick={() => onEdit({currentValorVenta1: detailFase1.ValorVenta1, currentValorVenta2: detailFase1.ValorVenta2})}
                                                        ><i className={"fa fa-edit"}></i>
                                                    </Button>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>C.VAR.Unitario</td>
                                        <td className="text-right">{parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.Poblacion)), 0)).toFixed(2)}</td>
                                        <td className="text-right">{parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.Poblacion), 0)).toFixed(2)}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>MCU</td>
                                        <td className="text-right">{parseFloat(parseFloat(detailFase1.ValorVenta1) - parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.Poblacion)), 0)).toFixed(2)).toFixed(2)}</td>
                                        <td className="text-right">{parseFloat(parseFloat(detailFase1.ValorVenta2) - parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.Poblacion), 0)).toFixed(2)).toFixed(2)}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>P.E.</td>
                                        <td className="text-right">{parseFloat(parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.CostoTotalFijo)), 0)).toFixed(2) / parseFloat(parseFloat(detailFase1.ValorVenta1) - parseFloat(resumeCost.reduce((total, x) => total = total + ((x.id == 4) ? 0 : parseFloat(x.Poblacion)), 0)).toFixed(2)).toFixed(2)).toFixed(2)}</td>
                                        <td className="text-right">{parseFloat(parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.CostoTotalFijo), 0)).toFixed(2) / parseFloat(parseFloat(detailFase1.ValorVenta2) - parseFloat(resumeCost.reduce((total, x) => total = total + parseFloat(x.Poblacion), 0)).toFixed(2)).toFixed(2)).toFixed(2)}</td>
                                        <td></td>
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