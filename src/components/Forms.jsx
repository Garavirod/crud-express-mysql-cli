import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";

const Form = () => {
  let userId = 0;
  //let userId = this.props.match.params.employeeId;
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    role: "",
  });

  const handleInputChange = (event) => {
    // console.log(event.target.value);
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

  const sendData = (event) => {
    event.preventDefault();
    const url = "http://localhost:3000/api/create";
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
            alert("User register succesfully!");
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
    <form onSubmit={sendData}>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Name {userId}</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputState">Role</label>
          <select
            id="inputState"
            className="form-control"
            name="role"
            onChange={handleInputChange}
          >
            <option defaultValue>Choose ..</option>
            <option>Admin</option>
            <option>Employee</option>
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Phone</label>
          <input
            type="text"
            className="form-control"
            placeholder="phone"
            name="phone"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputAddress">Address</label>
        <input
          type="text"
          className="form-control"
          id="inputAddress"
          placeholder="1234 Main St"
          name="address"
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Sign in
      </button>
    </form>
  );
};

export default Form;
