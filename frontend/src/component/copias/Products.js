import React, { useContext, useEffect, useState } from "react";

import {
  faCheckCircle,
  faEdit,
  faSearch,
  faTimesCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import apiService, { AppContext } from "../service/AppService";

function Usuarios() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [UsuariosState, setUsuariosState] = useContext(AppContext);

  useEffect(() => {
    fetchProducts(UsuariosState.keyword, UsuariosState.currentPage, UsuariosState.pageSize);
  }, []);

  const fetchUsuarios = async (keyword, currentPage, sizePage) => {
    try {
      const response = await apiService.getAllUsuarios(
        keyword,
        currentPage,
        sizePage
      );
      const totalElementCount = response.headers["x-total-count"];
      let totalPages = Math.floor(totalElementCount / sizePage);
      if (totalElementCount % sizePage !== 0) ++totalPages;
      setUsuariosState({
        ...UsuariosState,
        usuarios: response.data,
        currentPage: currentPage,
        keyword: keyword, // Corrected keyword to keyword
        sizePage: sizePage,
        totalPages: totalPages,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await apiService.deleteUsuario(productId);
      fetchUsuarios(
        UsuariosState.keyword,
        UsuariosState.currentPage,
        UsuariosState.sizePage
      ); // Refresh the products list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const changeCheckedState = async (product) => {
    try {
      await apiService.updateCheckedStatus(product);
      fetchUsuarios(
        UsuariosState.keyword,
        UsuariosState.currentPage,
        UsuariosState.sizePage
      ); // Refresh the products list after update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleGoToPage = (page) => {
    fetchUsuarios(UsuariosState.keyword, page, UsuariosState.pageSize);
  };

  const handlSearch = (event) => {
    event.preventDefault();
    fetchUsuarios(query, 1, UsuariosState.pageSize);  
  };
  return (
    <div className="container-fluid mt-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title position-relative">
            Product List{" "}
            <span className="bg bg-info bg-pill  position-absolute top-0 start-100 translate-middle  rounded-pill ">
              {prodState.products.length}
            </span>
          </h5>

          <div className="row g-2 mt-2">
            <div className="col-auto">
              <form onSubmit={handlSearch}>
                <div className="input-group">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                  <button type="submit" className="btn  btn-primary">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <table className="table align-middle mb-0 bg-white">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Checked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {UsuariosState.usuarios.map((usuarios) => (
                <tr key={UsuariosState.id}>
                  <td>{UsuariosState.id}</td>
                  <td>{UsuariosState.nombre}</td>
                  <td>${UsuariosState.email}</td>
                  <td>{UsuariosState.creado_en}</td>
                  <td>
                    <button
                      onClick={() => changeCheckedState(usuarios)}
                      className={
                        usuarios.checked
                          ? "btn btn-outline-success btn-sm"
                          : "btn btn-outline-danger btn-sm"
                      }
                    >
                      <FontAwesomeIcon
                        icon={usuarios.checked ? faCheckCircle : faTimesCircle}
                      />
                    </button>
                  </td>
                  <td className="d-flex align-items-center">
                    <button
                      className="btn btn-link btn-sm ml-3"
                      onClick={() => navigate(`editProduct/${usuarios.id}`)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="btn  btn-link btn-sm "
                      onClick={() => handleDelete(usuarios.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="...">
            <ul className="pagination justify-content-end mt-3 mb-1">
              <li className="page-item ">
                <button
                  onClick={() => handleGoToPage(UsuariosState.currentPage - 1)}
                  className={
                    UsuariosState.currentPage !== 1
                      ? "page-link"
                      : "page-link disabled"
                  }
                >
                  Previous
                </button>
              </li>

              {new Array(UsuariosState.totalPages).fill(0).map((v, index) => (
                <li key={index + 1} className="page-item ">
                  <button
                    onClick={() => handleGoToPage(index + 1)}
                    className={
                      UsuariosState.currentPage === index + 1
                        ? "page-link active"
                        : "page-link "
                    }
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className="page-item">
                <button
                  onClick={() => handleGoToPage(UsuariosState.currentPage + 1)}
                  className={
                    UsuariosState.totalPages !== UsuariosState.currentPage
                      ? "page-link"
                      : "page-link disabled"
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Usuarios;
