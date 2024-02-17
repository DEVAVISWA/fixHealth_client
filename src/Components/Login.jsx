import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        //login logic
        const loginBody = {
            email: loginData.email,
            password: loginData.password,
        }
        try {
            const response = await axios.post('http://127.0.0.1:3000/api/user/login', loginBody)
            console.log(response.body)
            setLoginData({
                email: '',
                password: '',
            })
            setToken(response.data.token)
            setUser(response.data)
            window.localStorage.setItem('token', response.data.token)
            window.localStorage.setItem('user', JSON.stringify(response.data))
            if (response.data.userType === "patient") {
                navigate(`/dashboard/patient/${response.data.name}`)
            } else if (response.data.userType === "physio") {
                navigate(`/dashboard/physio/${response.data.name}`)
            } else if (response.data.userType === "sales") {
                navigate(`/dashboard/sales/${response.data.name}`)
            }
        } catch (err) {
            console.log(err)
        }
        console.log('logged in successful', loginData);
    };
    return (
        <div>
            <div className="signup-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                    </label>
                    <button type="submit">Sign Up</button>
                    <p className='text-center'>
                        Dont have an account? <a href="/signup">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login