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

  const navigate = useNavigate()
  const logoutHandler = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')
    console.log('Logged out successfully')
    navigate('/login')
  }

  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChangeChip = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
      <div className="container text-center">
        <div className="row">
          <div className="col-3">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Days</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={"monday"}>Monday</MenuItem>
                  <MenuItem value={"tuesday"}>Tuesday</MenuItem>
                  <MenuItem value={"wednesday"}>Wednesday</MenuItem>
                  <MenuItem value={"thursday"}>Thursday</MenuItem>
                  <MenuItem value={"friday"}>Friday</MenuItem>
                  <MenuItem value={"saturday"}>Saturday</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="col">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Select Slot</InputLabel>
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
          <div className="col-2">
            <button type="button" className="btn btn-outline-success btn-lg">Confirm Slot</button>
          </div>
        </div>
      </div>
      <div className="container text-center">
        Table
      </div>
    </div>
  )
}

export default Physio