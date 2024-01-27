import React, { useState } from "react";
import BaseURL from "../../axios";
import Swal from "sweetalert2"
import { Link } from "react-router-dom";

const AddStudent = () => {
  const [username, setUsername] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // const [token, setToken] = useState("");
  // useEffect(() => {
  //   // Retrieve token from local storage on component mount
  //   const storedToken = localStorage.getItem("token");
  //   try{
  //     setToken(storedToken);
  //   } catch (error) {
  //     console.error(error);
  //   }

  // }, []);

  const inputData = {
    username: username,
    sex: sex,
    phone: phone,
    email: email,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // Post data to create student
      const response = await BaseURL.post("/create", inputData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

      });


      console.log("Successfully created", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control shadow-none border-3"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <select
            className="form-select border-3 shadow-none"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
            <option selected>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Famale">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control shadow-none border-3"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="email"
            className="form-control border-3 shadow-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <Link to="/student">
            <button type="submit" className="btn btn-primary me-2">
              Submit
            </button>
            <Link to="/student">
                  <button className="btn btn-danger">Back</button>
            </Link>
          </Link>
        </div>
      </form>
    </main>
  );
};
export default AddStudent;
