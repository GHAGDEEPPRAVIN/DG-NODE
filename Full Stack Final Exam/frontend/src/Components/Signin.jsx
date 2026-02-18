import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function Signin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()  
        try {
            console.log(email, password, role)
            const res = await axios.post('http://localhost:3000/api/auth/', {email, password, role}) 
            if(res.data.status){
                navigate("/home")
            }
            alert(res.data.message)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className='vh-100 d-flex'>
            <div className='w-25 m-auto shadow p-3 rounded'>
                <h2 style={{fontFamily:"-moz-initial"}} className='text-center fw-bold'>SIGN IN</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <select onChange={(e)=>{setRole(e.target.value)}} className="form-select" aria-label="Default select example">
                        <option>select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </Form.Group>                
                
                <Button className='w-100 my-3' variant="primary" type="submit">
                    Submit
                </Button>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <span>Don't have an Account ? <Link style={{textDecoration:"none"}} to="/signup">Sign Up</Link> </span>
                </Form.Group>

            </Form>
        </div>
        </div>
    )
}
