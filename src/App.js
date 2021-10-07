import React, { useState } from 'react'
import SingleColor from './SingleColor'
import 'bootstrap/dist/css/bootstrap.min.css';
import Values from 'values.js'
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values('#40e0d0').all(10));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleSubmit = (e) =>{
    e.preventDefault();
    try{
      let colors = new Values(color).all(10);
      setList(colors);
    }
    catch(error){
      setError(true);
      setShow(true);
    }
  }


  return (
  <>
  <section className="container">
    <h3>color generator project</h3>
    <form onSubmit={handleSubmit}>
    <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#40e0d0"
          />
      <Button  type="submit" className="btn btn-style">Submit</Button>
        <Modal show={show} onHide={handleClose} size="md">
          <Modal.Header closeButton>
            <Modal.Title>
              ERROR: Unable to parse color
            </Modal.Title>
          </Modal.Header>
        </Modal>
    </form>
  </section>
  <section className="colors">
    {list.map((color, index)=>{
      return <SingleColor key={index} {...color} index={index} hexColor={color.hex}/>;
    })}
    
    </section></>);
}

export default App
