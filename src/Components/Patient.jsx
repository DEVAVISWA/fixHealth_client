import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Patient.css'
import Card from 'react-bootstrap/Card';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function Patient() {
  const navigate = useNavigate()

  const user = window.localStorage.getItem('user')
  const userJson = JSON.parse(user)
  const token = window.localStorage.getItem('token')

  const logoutHandler = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')
    console.log('Logged out successfully')
    navigate('/login')
  }
  return (
    <div>
      Welcome {userJson.name}
      <button
        type="button"
        className="btn btn-primary"
        onClick={logoutHandler}>Logout</button>
      <div className='imageCard'>
        <img src="https://t3.ftcdn.net/jpg/01/93/82/20/360_F_193822017_azy2itvLLnCFO9eodX4CLgJG8op7dH33.jpg" className="img-fluid" alt="..." />
        <div className="card banner-text" style={{ "width": "18rem" }}>
          {/* <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p>
            <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a>
          </div> */}
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Book a FREE Appointment</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">The body achieves what the mind believes.</Card.Subtitle>
              <div className="badge bg-primary text-wrap padding" >
                Start Your Recovery now
              </div>
              <Card.Subtitle className='text-center'>
                select your slots below
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className='text-center radios'>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Slot Time of the Day</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="morning" control={<Radio />} label="Morning" />
            <FormControlLabel value="afternoon" control={<Radio />} label="Afternoon" />
            <FormControlLabel value="evening" control={<Radio />} label="Evening" />            
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  )
}

export default Patient