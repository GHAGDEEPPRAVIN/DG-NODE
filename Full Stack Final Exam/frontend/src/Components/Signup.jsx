import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function Signup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()  
        console.log(name,email, password, role)
        try {
            const res = await axios.post('http://localhost:3000/api/auth/signup', {name,email, password, role}) 
            console.log(res.data)
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
                <h2 style={{fontFamily:"-moz-initial"}} className='text-center fw-bold'>SIGN UP</h2>
            <Form>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Full Name" />
                </Form.Group>
                
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
                        <option selected>select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </Form.Group>                
                
                <Button onClick={handleSubmit} className='w-100 my-3' variant="primary" type="submit">
                    Submit
                </Button>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <span>Already have an Account ? <Link style={{textDecoration:"none"}} to="/">Sign In</Link> </span>
                </Form.Group>

            </Form>
        </div>
        </div>
    )
}
