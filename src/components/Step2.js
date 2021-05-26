import React, { useState } from 'react'
import CostService from '../services/cost.service';
import { Button } from "reactstrap";

export default (params) => {

  const [detailCost, setDetailtCost] = React.useState([]);
  const [detailFase, setDetailFase] = React.useState([]);

  const [unitPrice, setUnitPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);

  React.useEffect(() => {
    RetornarCostoLactancia();
  }, []);

  const RetornarCostoLactancia = async () => {
    const data = await CostService.showDetailCost(params.dni, 2);
    console.log(data);
    const dataFase = data.filter(x => typeof x !== undefined).shift(); 
    setDetailFase(dataFase);
    setDetailtCost(data); 
  }

  const ActualizarCostosFijos = async (jsonData) => {
        
    const data = await CostService.insertUpdateCost(jsonData)
                                  .then(json => {
                                      onCancel();
                                      RetornarCostoLactancia();
                                    });                                   
  }

  const [inEditMode, setInEditMode] = useState({
      status: false,
      rowKey: null
  });

  const onEdit = ({id, currentUnitPrice}) => {
    setInEditMode({
        status: true,
        rowKey: id
    })
    setUnitPrice(currentUnitPrice);
  }

  const onSave = ({id, idCosteo, newUnitPrice}) => {

    const jdata = [{
      id: idCosteo,
      dni: params.dni,
      idcosteo: id,
      idfase: 2,
      cantidad: newUnitPrice,
      costounitario: 0.00,
      costototal: 0.00,
      costomensual: 0.00
    }];

    ActualizarCostosFijos(jdata);
  }

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
        status: false,
        rowKey: null
    })
    // reset the unit price state value
    setUnitPrice(null);
  }

  return (
    <div className="container table-responsive">
      <table className={'table'}>
        <thead>
          <tr className={"table-active"}>
            <th colSpan = '2' rowSpan = '4'>Costos Variables</th>
          </tr>
          <tr>
            <th colSpan = '4' className={"bg-danger"}>{detailFase.NombreFase}</th>
          </tr>
          <tr>
            <th>Peso:</th>
            <th colSpan = '3'>{detailFase.Peso}</th>
          </tr>   
          <tr>
            <th scope = 'col'>Duración</th>
            <th scope = 'col' colSpan = '2'>{detailFase.Duracion}</th>
            <th scope = 'col'>Días</th>
          </tr> 
          <tr className={"bg-warning"}>
            <th scope = 'col'>Elemento del Costo</th>
            <th scope = 'col'>Unidad de Medida</th>
            <th scope = 'col'>Cantidad</th>
            <th scope = 'col'>Costo Unitario</th>
            <th scope = 'col'>Costo Total</th>
            <th scope = 'col'>Acción</th>
          </tr>
        </thead>
        <tbody>
          {
            detailCost.map((item) => (
              item.idHijo === 0 ? (
              <tr key={item.id} className={"table-info  left-title"}>
                <td colSpan = '6'>{item.ElementoCosto}</td>
              </tr>
              ) : 
              (
                <tr key={item.id}>
                  <td scope = 'row'  className={"left-title"}>{item.ElementoCosto}</td>
                  <td scope = 'row'>{item.Medida}</td>
                  <td scope = 'row'>
                    {
                      inEditMode.status && inEditMode.rowKey === item.id ? (
                          <input value={unitPrice}
                                 className={"form-control input-cost"}
                                 onChange={(event) => setUnitPrice(event.target.value)}
                          />
                        ) : ( parseFloat(item.Cantidad).toFixed(2) )
                    }
                  </td>
                  <td scope = 'row'>
                    {
                      parseFloat(item.CostoUnitario).toFixed(2)
                    }
                  </td>
                  <td scope = 'row'>{parseFloat(item.CostoTotal).toFixed(2)}</td>
                  <td scope = 'row'>
                    {
                      item.id !== 9 ? '' : 
                      inEditMode.status && inEditMode.rowKey === item.id ? (
                        <React.Fragment>
                          <Button
                            className=" btn-icon"
                            color="success"
                            onClick={() => onSave({id: item.id, idCosteo: item.idCosteo, newUnitPrice: unitPrice})}
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
                              onClick={() => onEdit({id: item.id, currentUnitPrice: item.Cantidad})}
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
            <td></td>
            <td></td>
            <td></td>
            <td className={"table-info left-title"}>Costo Total</td>
            <td>{parseFloat(detailCost.reduce((total, x) => total = total + parseFloat(x.CostoTotal), 0)).toFixed(2)}</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className={"table-info left-title"}>Población</td>
            <td>{parseFloat(detailCost.reduce((total, x) => total = total + ((x.id == 2) ? parseFloat(x.Cantidad) : 0), 0)).toFixed(2)}</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className={"table-info left-title"}>Costo Per-Cápita</td>
            <td>{parseFloat(detailCost.reduce((total, x) => total = total + parseFloat(x.CostoTotal), 0) / detailCost.reduce((total, x) => total = total + ((x.id == 2) ? parseFloat(x.Cantidad) : 0), 0)).toFixed(2)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>  
  )
}