import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    role: "",
  });
  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async() => {
    const url = `http://localhost:3000/api/employee/${employeeId}`;
    axios.get(url)
      .then((res) => {
        setEmployee(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Name {employeeId}</label>
          <input type="text" className="form-control" value={employee.name} />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Email</label>
          <input type="email" className="form-control" value={employee.email}/>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputState">Role</label>
          <select id="inputState" className="form-control">
            <option selected>Choose...</option>
            <option value={employee.role}>Admin</option>
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Phone</label>
          <input  className="form-control" value={employee.phone} />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputAddress">Address</label>
        <input
          type="text"
          className="form-control"
          id="inputAddress"
          value={employee.address}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Sign in
      </button>
    </form>
  );
};

export default Edit;
