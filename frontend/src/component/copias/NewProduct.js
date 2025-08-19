import React, { useState } from "react";
import apiService from "../service/AppService";

function NewUsuario() {
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [checked, setchecked] = useState(false);




  
  const handleSubmit = async (event) => {
    event.preventDefault();    
    const newUsuario = {
      name,
      price,
      quantity,
      checked,
    };

    try {
      const createdUsuario = await apiService.createUsuario(newUsuario);
      alert("Usuario created successfully");
      console.log(
        "Usuario created successfully : " + JSON.stringify(createdUsuario)
      );
      // Clear form fields after successful submission
      setname("");
      setprice("");
      setquantity("");
      setchecked(false);
    } catch (error) {
      console.error("Error adding Usuario:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Add New Usuario</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Usuario Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Usuario Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Usuario Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setquantity(e.target.value)}
                    required
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="checked"
                    checked={checked}
                    onChange={() => setchecked(!checked)}
                  />
                  <label className="form-check-label" htmlFor="checked">
                    Checked
                  </label>
                </div>
                <button type="submit" className="btn btn-outline-success mt-3">
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUsuario;
