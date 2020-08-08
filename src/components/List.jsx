import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";

const List = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getEmployeeList();
  }, []);

  const getEmployeeList = async () => {
    // Using fetch - Body property
    // You can use jsonplaceholder.com 
    // const result = await fetch("http://localhost:3000/employee/list");
    // const post = await result.json();
    // setData(post);
    // Using Axios  - Data property
    axios.get('http://localhost:3000/api/list')
    .then(res=>{
      setData(res.data.data);
    })
    .catch(err=>{
      console.log(err);
    });
  };


  return (
    <table className="table table-hover table-striped">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Role</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Address</th>
          <th scope="col">Phone</th>
          <th colSpan="2">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <th>{item.id}</th>
            <td>{item.role.role}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.address}</td>
            <td>{item.phone}</td>
            <td>
              <Link className="btn btn-outline-info " to={`/edit/${item.id}`}> Edit </Link>
            </td>
            <td>
              <button className="btn btn-outline-danger "> Delete </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
