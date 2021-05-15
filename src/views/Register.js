import React, { useState, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import '../assets/css/style.css'
import ImageBackground from '../assets/img/img_bg.png';
import Logo from '../assets/img/logo.png';

const required = (value) => {
    if (!value) {
        return (
            <span className={"text-warning"}>Este Campo es Requerido!</span>
        );
    }
};
  
const vDni = (value) => {
    if (value.length < 8 || value.length > 8) {
        return (
            <span className={"text-warning"}>El dni solo debe tener 8 caracteres</span>
        );
    }
};

const Register = (props) => {

    const form = useRef();
    const checkBtn = useRef();
    
    const [dni, setDni] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
  
    /*const vConfirmPassword = (value) => {
        if (value !== password) {
            console.log('confirma: ' + value, 'password: ' + password);
            return (
                <span className={"text-warning"}>La contraseñas deben ser iguales</span>
            );
        }
    };*/

    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };

    const onChangeConfirmPassword = (e) => {
      const confirm_password = e.target.value;
      setConfirmPassword(confirm_password);
    };

    const onChangeApellidos = (e) => {
      const apellidos = e.target.value;
      setApellidos(apellidos);
    };

    const onChangeNombres = (e) => {
      const nombres = e.target.value;
      setNombres(nombres);
    };

    const onChangeDni = (e) => {
      const dni = e.target.value;
      setDni(dni);
    };
  
    const handleRegister = (e) => {
      e.preventDefault();
  
      setMessage("");
      setSuccessful(false);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        AuthService.register(dni, nombres, apellidos, password, confirm_password).then(
          (response) => {
            
            if (response.status >= 200 && response.status < 400){
                props.history.push("/admin/dashboard");
                window.location.reload();
                /*setMessage(response.data.message);
                setSuccessful(true);*/
            }
            else{

                const errors = response.errors;

                setMessage(response.message);

                if (errors)
                {
                    setMessage(
                        <ul>
                        {
                            errors.map((item, i) => <li key={i}>{item.msg}</li>)
                        }
                        </ul>
                    );
                }
                else
                {
                    setMessage(response.message);
                }
                
                setSuccessful(false);
            }
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
                
            console.log('Error UI');  
            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      }
    };

  return (
    <div className="login-3">
        <div className="container-fluid">
            <div className="row login-box">
                <div className="col-lg-8 align-self-center pad-0 form-section clip-home">
                    <div className="form-inner">
                        <a href="index.html" className="logo">
                            <img src={Logo} alt="logo" />
                        </a>
                        <h3>Crear una Cuenta</h3>
                        <Form onSubmit={handleRegister} ref={form}>
                                <div className="form-group form-box">
                                <Input type="text" name="fullname" placeholder="DNI" 
                                    className={"input-text"}
                                    value={dni}
                                    onChange={onChangeDni}
                                    validations={[required, vDni]}
                                />
                                </div>
                                <div className="form-group form-box">
                                    <Input type="text" name="email" placeholder="Nombres" 
                                        className={"input-text"}
                                        value={nombres}
                                        onChange={onChangeNombres}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group form-box">
                                    <Input type="text" name="email" placeholder="Apellidos" 
                                        className={"input-text"}
                                        value={apellidos}
                                        onChange={onChangeApellidos}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group form-box">
                                    <Input type="password" name="Password" placeholder="Contraseña" 
                                        className={"input-text"}
                                        value={password}
                                        onChange={onChangePassword}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group form-box">
                                    <Input type="password" name="Confirm_Password" placeholder="Confirmar Contraseña" 
                                        className={"input-text"}
                                        value={confirm_password}
                                        onChange={onChangeConfirmPassword}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group form-box">
                                    <button type="submit" className="btn-md btn-theme float-left">Registrar</button>
                                </div>                           
                            {message && (
                                <div className="form-group form-box">
                                    <div
                                        className={ successful ? "alert alert-success" : "alert alert-danger" }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                        <div className="clearfix"></div>
                        <p>Ya eres usuario? 
                            <Link to={"/login"} className="thembo">
                                Ingresar Aqui
                            </Link>
                        </p>
                    </div>
                </div>
                <div class="col-lg-4 bg-color-15 align-self-center pad-0 none-992 bg-img">
                    <div class="info clearfix">
                        <img src={ImageBackground} alt="logo" class="w-100 img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Register;