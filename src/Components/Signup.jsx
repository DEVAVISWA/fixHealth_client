import React, { useState } from 'react'
import './Signup.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';

//RADIO BUTTON NOT HANDLED

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //signup logic
    const signupBody = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    }
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/user/signup', signupBody)
      console.log(response.body)
      setFormData({
        name: '',
        email: '',
        password: ''
      })
    } catch (err) {
      console.log(err)
    }
    console.log('Form submitted:', formData);
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Select Role</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="patient" control={<Radio />} label="patient" />
            <FormControlLabel value="sales" control={<Radio />} label="sales" />
            <FormControlLabel value="physio" control={<Radio />} label="physio" />
          </RadioGroup>
        </FormControl>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup  