import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


function Physio() {
  const user = window.localStorage.getItem('user')
  const userJson = JSON.parse(user)
  const token = window.localStorage.getItem('token')

  const physioName = userJson.name
  const physioEmail = userJson.email

  const navigate = useNavigate()
  const logoutHandler = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')
    console.log('Logged out successfully')
    navigate('/login')
  }

  const [physioData, setPhysioData] = useState({
    days: '',
    slotTiming: '',
    slot: ''
  })

  // const [age, setAge] = React.useState(''); //day
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]); //slot time
  const handleChangeChip = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    const physioDataBody = {
      name: physioName,
      email: physioEmail,
      day: physioData.days,
      filter: physioData.slot
    }
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/booking/physio/createBooking', physioDataBody)
      console.log("slot booked" ,response.body)
      setPhysioData({
        days: '',
        slotTiming: '',
        slot: ''
      })
    } catch( err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div>
        hello {userJson.name}
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={logoutHandler}>Logout
      </button>

      <form onSubmit={handleSubmit}>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Days</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={physioData.days}
                    label="Age"
                    onChange={(e) => setPhysioData({ ...physioData, days: e.target.value })}
                  >
                    <MenuItem value={"Monday"}>Monday</MenuItem>
                    <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                    <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                    <MenuItem value={"Thursday"}>Thursday</MenuItem>
                    <MenuItem value={"Friday"}>Friday</MenuItem>
                    <MenuItem value={"Saturday"}>Saturday</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="col">
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Select Your Slot Timing</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChangeChip}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col">
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Slot</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={physioData.slot}
                  onChange={(e) => setPhysioData({ ...physioData, slot: e.target.value })}
                >
                  <FormControlLabel value="Morning" control={<Radio />} label="Morning" />
                  <FormControlLabel value="Afternoon" control={<Radio />} label="Afternoon" />
                  <FormControlLabel value="Evening" control={<Radio />} label="Evening" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-outline-success btn-lg">Confirm Slot</button>
            </div>
          </div>
        </div>
      </form>

      <div className="container text-center">
        Table
      </div>
    </div>
  )
}

export default Physio