import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  // Params url
  const { employeeId } = useParams();
  // Currently data
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    role: "",
  });
  // New data
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    role: "",
  });

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const emptyData = () => {
    setUser({
      name: "",
      email: "",
      address: "",
      phone: "",
      role: "",
    });
  };

  // Get Employee by id
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

  // Update user's data by id
  const updateData = (event) => {
    event.preventDefault();
    const url = `http://localhost:3000/api/update/${employeeId}`;
    if (
      user.name !== "" &&
      user.address !== "" &&
      user.email !== "" &&
      user.phone !== "" &&
      user.role !== ""
    ) {
      user.role = user.role === "Admin" ? 1 : 0;
      axios
        .post(url, user)
        .then((res) => {
          if (res.data.success === true) {
            alert("User updated succesfully!");
            emptyData();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log("SERVER ERROR >: " + err);
        });
    } else {
      alert("Empty fields!!");
    }
  };

  return (
    <form onSubmit={updateData}>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Name {employeeId}</label>
          <input 
            type="text"
            name="name" 
            className="form-control" 
            placeholder={employee.name}
            onChange={handleInputChange} />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Email</label>
          <input 
            type="email"
            name="email" 
            className="form-control" 
            placeholder={employee.email}
            onChange={handleInputChange}/>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputState">Role</label>
          <select 
            id="inputState"
            name="role" 
            className="form-control"
            onChange={handleInputChange}>
            <option selected>Choose...</option>
            <option placeholder={employee.role}>Admin</option>
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Phone</label>
          <input  
            className="form-control"
            name="phone" 
            placeholder={employee.phone}
            onChange={handleInputChange} />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputAddress">Address</label>
        <input
          type="text"
          name="address"
          className="form-control"
          id="inputAddress"
          placeholder={employee.address}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
};

export default Edit;
