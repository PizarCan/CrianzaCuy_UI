import React, {useState} from "react";
import AuthService from '../services/auth.service';
import CostService from "../services/cost.service";

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
        dni: '47238670',
        idcosteo: idCosteo,
        idfase: 5,
        cantidad: 0,
        costounitario: 0.00,
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
                                                <button
                                                    className={"btn btn-success"}
                                                    onClick={() => onSave({id: item.id, newUnitPrice: unitPrice, idCosteo: item.idCosteo})}
                                                ><i className={"fa fa-save"}></i>
                                                </button>

                                                <button
                                                    className={"btn btn-secondary"}
                                                    onClick={() => onCancel()}
                                                ><i className={"fa fa-close"}></i>
                                                </button>
                                                </React.Fragment>
                                            ) : (
                                                    <button 
                                                    className={"btn btn-info"}
                                                    onClick={() => onEdit({id: item.id, currentUnitPrice: item.CostoMensual, idCosteo: item.idCosteo})}
                                                    ><i className={"fa fa-edit"}></i>
                                                    </button>
                                                )
                                            }
                                        </td>
                                        </tr>
                                    )
                                    ))
                                }
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