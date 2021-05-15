import React, { useState, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import '../assets/css/style.css'
import ImageBackground from '../assets/img/img_bg.png';
import Logo from '../assets/img/logo_admin.png';

const required = (value) => {
  if (!value) {

    return (
      <span className={"text-warning"}>Este Campo es Requerido!</span>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeDNI = (e) => {
    const dni = e.target.value;
    setDni(dni);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(dni, password).then(
        () => {
          props.history.push("/admin/dashboard");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
     <div className={"login-3"}>
        <div className={"container-fluid"}>
            <div className={"row login-box"}>
                <div className={"col-lg-8 align-self-center pad-0 form-section clip-home"}>
                    <div className={"form-inner"}>
                        <a href="#" className={"logo"}>
                            <img src={Logo} alt="logo" />
                        </a>
                        <h3>Bienvenido</h3>
                        <Form onSubmit={handleLogin} ref={form}>
                            <div className={"form-group form-box"}>
                                <Input 
                                    type="text" 
                                    name="dni" 
                                    className={"input-text"} 
                                    placeholder="DNI" 
                                    value={dni}
                                    onChange={onChangeDNI}
                                    validations={[required]}
                                />
                            </div>
                            <div className={"form-group form-box"}>
                                <Input 
                                    type="password"
                                    name="password"
                                    className={"input-text"} 
                                    placeholder="Contraseña" 
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required]}
                                />
                            </div>
                            <div className={"form-group form-box"}>
                                <button type="submit" className={"btn-md btn-theme float-left"} disabled={loading}>
                                    {loading && (
                                        <span className={"spinner-border spinner-border-sm"}></span>
                                    )}
                                    Ingresar
                                </button>
                                <a href="forgot-password.html" className={"forgot-password"}>Olvidé mi contraseña</a>
                            </div>
                            {message && (
                                <div className="form-group  form-box">
                                  <div className="alert alert-danger" role="alert">
                                      {message}
                                  </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                        <div className={"clearfix"}></div>
                        <br/>
                        <p>No tengo una cuenta? 
                          <Link to={"/register"} className="thembo">
                            Registrar
                          </Link>    
                        </p>
                    </div>
                </div>
                <div className={"col-lg-4 bg-color-15 align-self-center pad-0 none-992 bg-img"}>
                    <div className={"info clearfix"}>
                        <img src={ImageBackground} alt="logo" className={"w-100 img-fluid"} />
                    </div>
                </div>
            </div>
        </div>
    </div>  
  );
};

export default Login;