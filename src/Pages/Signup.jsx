import React, { useState } from "react";
import "./Signup.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../config/routes";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    value: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //signup logic
    const signupBody = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      userType: formData.value,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/user/signup",
        signupBody
      );
      console.log(response.body); //ERROR UNDEFINED ???????????
      setFormData({
        name: "",
        email: "",
        password: "",
        value: "",
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
    console.log("Form submitted:", formData);
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Select a Role
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={formData.value}
            onChange={(e) =>
              setFormData({ ...formData, value: e.target.value })
            }
          >
            <FormControlLabel
              value="patient"
              control={<Radio />}
              label="patient"
            />
            <FormControlLabel
              value="sales"
              control={<Radio color="secondary" />}
              label="sales"
            />
            <FormControlLabel
              value="physio"
              control={<Radio color="success" />}
              label="physio"
            />
          </RadioGroup>
        </FormControl>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </label>
        <button type="submit">Sign Up</button>
        <p className="text-center">
          Alredy have an account? <Link to={ROUTES.login}>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
