/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useParams } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import BaseURL from "../axios";

const Students = () => {
  const [Liststudents, setListStudents] = useState([]);
 

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await BaseURL.get("/student");
        console.log(response.data);
        setListStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

 const handleDelete = async (id) => {
   try {
     const result = await Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to revert this!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes, delete it!",
     });

     if (result.isConfirmed) {
       await BaseURL.delete(`/delete/${id}`,{
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       });
       // Remove the deleted employee from the list
       setListStudents((prevListstudents) =>
         prevListstudents.filter((item) => item.id !== id)
       );

       Swal.fire({
         title: "Deleted!",
         text: "Your file has been deleted.",
         icon: "success",
       });
     }
   } catch (error) {
     console.error("Error deleting employee:", error);
   }
 };
const [query,SetQuery] = useState ('')
 const handleSearch = (e) => {
      SetQuery(e.target.value)

      
 }
 const ListSt = Liststudents.filter ((item) => {
  const search = query.toLowerCase();
   return (
     String(item.id).toLowerCase().includes(search) ||
     item.username.toLowerCase().includes(search) ||
     item.sex.toLowerCase().includes(search) ||
     String(item.phone).toLowerCase().includes(search)||
     item.email.toLowerCase().includes(search)
   );
   });




  return (
    <main className="container">
      <h2 className="mb-3">Student Details</h2>
      <div className="mb-3">
        <Link to="/add/student">
          <button className="btn btn-success">Add Student</button>
        </Link>
      </div>
      <div>
        <div className=" mb-3">
          <input
            type="text"
            className="form-control shadow-none border-3"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Sex</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {ListSt.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.username}</td>
              <td>{item.sex}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>
                <Link to={`/student/edit/${item.id}`}>
                  <button className="btn btn-primary me-2 ">Edit</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Students;
