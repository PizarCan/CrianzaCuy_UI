import React, { useState } from 'react'
import { Container } from "react-bootstrap";

export default (params) => {

  return (
    <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <p className="copyright text-center">
              © {new Date().getFullYear()}{" "}
              <a href="#">Luis Pizarro</a>, si algo se puede soñar se puede programar
          </p>
        </Container>
      </footer>
  )
}