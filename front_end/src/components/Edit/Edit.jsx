import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Assuming you are using react-router-dom
import BaseURL from "../../axios";
import Swal from 'sweetalert2';

const Edit = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [phone, setPhone] = useState("");
  // const [token, setToken] = useState("");
  const navigate = useNavigate();
const inputData = {
    username,
    email,
    sex,
    phone,
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await BaseURL.get(`/student/${id}/edit`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data =  res.data.data;
        setUsername(data.username);
        setSex(data.sex);
        setPhone(data.phone);
        setEmail(data.email);
        console.log(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    getData();

    // // AccessToken user login
    //  const GetToken = localStorage.getItem("token");
    //  if (GetToken) {
    //    setToken(GetToken);
    //  }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Update it!",

      });
      if (result.isConfirmed) {
        await BaseURL.put(`/update/${id}`, inputData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        Swal.fire({
          title: "Updated!",
          text: "Your file has been updated.",
          icon: "success",
        });
        navigate("/student");
      }
    } catch (error) {
        console.log(error);
  };
  }
  return (
    <div>
      <h2>Edit Student</h2>
      <form>
        <label>Name:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          className="form-select"
          aria-label="Default select example"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Edit;
