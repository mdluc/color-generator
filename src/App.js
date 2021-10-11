import React, { useState } from "react";
import SingleColor from "./SingleColor";
import "bootstrap/dist/css/bootstrap.min.css";
import Values from 'values.js';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import {AiFillCloseCircle} from "react-icons/ai"

function App() {
  const [color, setColor] = useState("#41609b"); //default color
  const [show, setShow] = useState(false); //state used for showing the error modal
  const [gradation, setGradation] = useState(""); //state used for setting the level of gradation for each type tint/shade
  const [list, setList] = useState(new Values("#41609b").all(gradation)); //state used for listing all the colors using the values.js library
  const [error, setError] = useState(false);
  
  const handleClose = () => setShow(false);

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const handleChangeGradation = (event) => {
    const value = event.target.value;
    if (value === "0") {
      setShow(true);
    } else {
      setGradation(parseInt(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (
        isNaN(gradation) ||
        gradation < 1 ||
        gradation > 100 ||
        gradation.toString() === ""
      ) {
        setShow(true);
      } else {
        let colors = new Values(color).all(gradation);
        setList(colors);
      }
    } catch(error){
      setError(true)
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
        <h3>color generator project</h3>

        <Form className="forms" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Enter the level of gradation you want:</Form.Label>

            <Form.Control
              type="number"
              value={gradation}
              onChange={handleChangeGradation}
              placeholder="ex: 10"
            />
          </Form.Group>
          <Form.Control
            type="color"
            value={color}
            onChange={handleChangeColor}
          />

          <Button type="submit" id="btn-styling">
            GENERATE
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            size="md"
            className="modal-styling"
          >
            <Modal.Header closeButton>
              <AiFillCloseCircle style={{margin:"10px",fontSize:"25px"}}/>
              <Modal.Title>ERROR!</Modal.Title>{" "}
            </Modal.Header>
            <Modal.Body>
              Out of range value. Please add a value between [1 - 100]
            </Modal.Body>
          </Modal>
        </Form>
        </Row>
     
      <Row>
        {list.map((color, index) => {
          return (
            <Col md={3}  id="colors"><SingleColor key={index} {...color} index={index} hex={color.hex} /></Col>
          );
        })}
      </Row>
    </Container>
    </>
  );
}

export default App;
