import React from "react";
import AuthService from "../services/auth.service";
import CostService from "../services/cost.service";
import MultiStep from './react-multistep';

import './css/custom.css'
import './css/normilize.css'
//import './css/skeleton.css'
import './css/prog-tracker.css'

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();  

    const [detailCost, setDetailtCost] = React.useState([]);
    const [detailFase, setDetailFase] = React.useState([]);

    React.useEffect(() => {
        RetornarDetalleCoste();
    }, []);

    const steps = [
        { name: 'Reproducción', component: <Step1 listDetailCost = {detailCost} listFase = {detailFase} /> },
        { name: 'Lactancia', component: <Step2 listDetailCost = {detailCost} listFase = {detailFase} /> },
        { name: 'Recria', component: <Step3 listDetailCost = {detailCost} listFase = {detailFase} /> },
        { name: 'Engorde', component: <Step4 listDetailCost = {detailCost} listFase = {detailFase} /> }
      ]

    const prevStyle = {'border-width': '2px'}
    const nextStyle = {'border-width': '2px'}  

    const RetornarDetalleCoste = async () => {
        const data = await CostService.showDetailCost(currentUser.dni, 1);
        console.log(data);
        //const listDetail = data.filter(item => item.idTipoFase === 1);
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
            
            
            <div>
                <p>
                    <strong>Criador:</strong> {currentUser.nombreUsuario}
                </p>
                <p>
                    <strong>DNI:</strong> {currentUser.dni}
                </p>
            </div>
        </div>
  );
};

export default Profile;