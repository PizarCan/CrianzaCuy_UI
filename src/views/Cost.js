import React from "react";
import AuthService from '../services/auth.service';
import CostService from '../services/cost.service';
import MultiStep from '../components/react-multistep';

import StepProduccion from '../components/Step1';
import StepLactancia from '../components/Step2';
import StepRecria from '../components/Step3';
import StepEngorde from '../components/Step4';

const Cost = () => {
    const currentUser = AuthService.getCurrentUser();  

    const [detailCost, setDetailtCost] = React.useState([]);
    const [detailFase, setDetailFase] = React.useState([]);

    React.useEffect(() => {
        RetornarDetalleCoste();
    }, []);

    const steps = [
        { name: 'Reproducción', component: <StepProduccion dni = {currentUser.dni} /> },
        { name: 'Lactancia', component: <StepLactancia dni = {currentUser.dni} /> },
        { name: 'Recria', component: <StepRecria dni = {currentUser.dni} /> },
        { name: 'Engorde', component: <StepEngorde dni = {currentUser.dni} /> }
      ]

    const prevStyle = {'border-width': '2px'}
    const nextStyle = {'border-width': '2px'}  

    const RetornarDetalleCoste = async () => {
        const data = await CostService.showDetailCost(currentUser.dni, 1);
        const listDetail = data.filter(item => item.idTipoFase === 1);
        const listFase = data.filter(x => typeof x !== undefined).shift(); 
        setDetailFase(listFase);
        setDetailtCost(data); 
    }

    return (
        <div className="content">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 class="card-title">Mantenimiento - Costos Variables</h5>
                            <p class="card-category">Estructura de Costos de Producción de Cuyes</p>
                        </div>
                        <div className="card-body">
                            <MultiStep showNavigation={true} steps={steps} prevStyle={prevStyle} nextStyle={nextStyle}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Cost;