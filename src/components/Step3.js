import React, { useState } from 'react'
import CostService from '../services/cost.service';

export default (params) => {

  const [detailCost, setDetailtCost] = React.useState([]);
  const [detailFase, setDetailFase] = React.useState([]);

  const [unitPrice, setUnitPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);

  React.useEffect(() => {
    RetornarCostoRecria();
  }, []);

  const RetornarCostoRecria = async () => {
    const data = await CostService.showDetailCost(params.dni, 3);
    const dataFase = data.filter(x => typeof x !== undefined).shift(); 
    setDetailFase(dataFase);
    setDetailtCost(data); 
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
    console.log(id, currentUnitPrice);
    setUnitPrice(currentUnitPrice);
  }

  const onSave = ({id, newUnitPrice}) => {
    console.log(id, newUnitPrice);
    //updateInventory({id, newUnitPrice});
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
              <tr key={item.id} className={"table-info left-title"}>
                <td colSpan = '6'>{item.ElementoCosto}</td>
              </tr>
              ) : 
              (
                <tr key={item.id}>
                  <td scope = 'row' className={"left-title"}>{item.ElementoCosto}</td>
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
                  <td scope = 'row'></td>
                  <td scope = 'row'>
                    {
                      item.id !== 2 && item.id !== 9 ? '' : 
                      inEditMode.status && inEditMode.rowKey === item.id ? (
                        <React.Fragment>
                          <button
                            className={"btn btn-success"}
                            onClick={() => onSave({id: item.id, newUnitPrice: unitPrice})}
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
                              onClick={() => onEdit({id: item.id, currentUnitPrice: item.unit_price})}
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
  )
}