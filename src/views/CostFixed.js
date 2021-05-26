import React, {useState} from "react";
import AuthService from '../services/auth.service';
import CostService from "../services/cost.service";
import { Button } from "reactstrap";

const CostFixed = () => {
    
    const currentUser = AuthService.getCurrentUser();  

    const [fixedCost, setFixedCost] = React.useState([]);
    const [unitPrice, setUnitPrice] = useState(null);

    React.useEffect(() => {
        RetornarCostosFijos();
    }, []);

    const RetornarCostosFijos = async () => {
        const data = await CostService.showFixedCost(currentUser.dni);
        setFixedCost(data); 
    }

    const ActualizarCostosFijos = async (jsonData) => {
        
        const data = await CostService.insertUpdateCost(jsonData)
                                      .then(json => {
                                          onCancel();
                                          RetornarCostosFijos();
                                        });                                   
    }

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });
  
    const onEdit = ({id, currentUnitPrice, idCosteo}) => {
      setInEditMode({
          status: true,
          rowKey: idCosteo
      })
      setUnitPrice(currentUnitPrice);
    }
  
    const onSave = ({id, newUnitPrice, idCosteo}) => {

      const jdata = [{
        id: id,
        dni: currentUser.dni,
        idcosteo: idCosteo,
        idfase: 5,
        cantidad: 0,
        costounitario: newUnitPrice/30.00,
        costototal: 0.00,
        costomensual: newUnitPrice
      }];

      ActualizarCostosFijos(jdata);
    }
  
    const onCancel = () => {

      setInEditMode({
          status: false,
          rowKey: null
      })

      setUnitPrice(null);
    }

    return (
        <div className="content">
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h5 class="card-title">Mantenimiento - Costos Fijos</h5>
                        <p class="card-category">Sistema de gestión de costos en la producción de cuyes</p>
                    </div>
                    <div className="card-body">
                        <div className="container table-responsive stepIndicator">
                            <table className={'table'}>
                                <thead>
                                <tr className={"bg-warning"}>
                                    <th scope = 'col'>Costos Fijos</th>
                                    <th scope = 'col'>Mensual</th>
                                    <th scope = 'col'>Diario</th>
                                    <th scope = 'col'>Acción</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    fixedCost.map((item) => (
                                    item.idHijo === 0 ? (
                                    <tr key={item.id} className={"table-info left-title"}>
                                        <td colSpan = '4'>{item.ElementoCosto}</td>
                                    </tr>
                                    ) : 
                                    (
                                        <tr key={item.idCosteo}>
                                        <td scope = 'row' className={"left-title"}>{item.ElementoCosto}</td>
                                        <td scope = 'row'>
                                            {
                                            inEditMode.status && inEditMode.rowKey === item.idCosteo ? (
                                                <input value={unitPrice}
                                                        className={"form-control input-cost"}
                                                        onChange={(event) => setUnitPrice(event.target.value)}
                                                />
                                                ) : ( parseFloat(item.CostoMensual).toFixed(2) )
                                            }
                                        </td>
                                        <td scope = 'row'>{ parseFloat(item.CostoDiario).toFixed(2) }</td>
                                        <td scope = 'row'>
                                            {
                                            item.idCosteo === 7 || item.idCosteo === 11 ? '' : 
                                            inEditMode.status && inEditMode.rowKey === item.idCosteo ? (
                                                <React.Fragment>
                                                <Button
                                                    className=" btn-icon"
                                                    color="success"
                                                    onClick={() => onSave({id: item.id, newUnitPrice: unitPrice, idCosteo: item.idCosteo})}
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
                                                        onClick={() => onEdit({id: item.id, currentUnitPrice: item.CostoMensual, idCosteo: item.idCosteo})}
                                                        ><i className={"fa fa-edit"}></i>
                                                    </Button>
                                                )
                                            }
                                        </td>
                                        </tr>
                                    )
                                    ))
                                }
                                    <tr>
                                        <td className={"table-info left-title"}>TOTAL COSTOS FIJOS</td>
                                        <td>{fixedCost.reduce((total, x) => total = total + parseFloat(x.CostoMensual), 0)}</td>
                                        <td>{fixedCost.reduce((total, x) => total = total + parseFloat(x.CostoDiario), 0)}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CostFixed;