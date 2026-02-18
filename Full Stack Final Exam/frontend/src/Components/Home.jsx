import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavbarPage } from './Navbar.jsx'

export default function Home() {
    // const role = JSON.parse(localStorage.getItem("role"))
    return (
        <div>
            <NavbarPage />
            <hr />
            <div className='container'>
                {/* <h1>Welcome to Home Page</h1>
                {role === "admin" ? <h2>You are logged in as Admin</h2> : <h2>You are logged in as User</h2>} */}

                <div>
                    <div className='w-50 m-auto shadow p-4 rounded'>
                    <h1>Add Articles</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Articles Title Here" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" placeholder="Enter Content Here" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Article
                        </Button>
                    </Form>
                </div>
                <div className='vh-100 w-50 m-auto shadow p-4 rounded'>
                    <h2>All Articles</h2>
                    <hr />
                </div>
                </div>
            </div>
        </div>
    )
}
