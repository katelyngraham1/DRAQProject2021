import React, { useState } from 'react';
import axios from 'axios';
import { API_ROOT, LOGIN_TOKEN_NAME, LOGIN_TOKEN_ID } from '../constants';
import { useHistory, Link } from "react-router-dom";
import { Container, Row, Col, Alert} from 'react-bootstrap';


// Create Login Element
export default function Login(props)  {
    const history = useHistory();
    const [error, setError] = useState("");
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState("");

    const validateInputs = () => {
        if (!email || email.trim() == "") {
            setError("Please enter an email address");
            return false;
        }
        if (!password || password.trim() == "") {
            setError("Please enter a password");
            return false;
        }
        setError("");
        return true;
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateInputs()) {
            return;
        }
        console.log("Logging in with " + email);
        const newLogin = {
            email: email,
            password: password
        }
        console.log("Calling " + API_ROOT);
        axios.post(API_ROOT + 'login', newLogin)
            .then((res) => {
                console.log("Login response");
                console.log(res);
                if (res.data.error) {
                    setError(res.data.details);
                } else {
                    localStorage.setItem(LOGIN_TOKEN_NAME, res.data.details.name);
                    localStorage.setItem(LOGIN_TOKEN_ID, res.data.details.id);
                    history.push("/");  
                    window.location.reload();
                }
            })
            .catch((err) => {
                setError(err);
                console.log(err);
            }
        );
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <Container className="login">
            <Row>
                <Col>
                    <h3>Welcome to Our Planner</h3>        
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <form>
                        <p>Please enter your email and password below to login</p>
                        <div className='form-group'>
                            <label>Email Address: </label>
                            <input type='text'
                                className='form-control'
                                value={email}
                                onChange={onChangeEmail}>
                            </input>
                        </div>

                        <div className='form-group'>
                            <label>Password: </label>
                            <input type='password'
                                className='form-control'
                                value={password}
                                onChange={onChangePassword}>
                                
                            </input>
                        </div>
                        {error && <Alert className="my-3 p-0" variant="danger">{error}</Alert>}
                        <div className='form-group'>
                            <input type='submit'
                                value='Login'
                                className='btn btn-info mt-3'
                                onClick={onSubmit}></input>
                        </div>
                        <div className='form-group'>
                        <Link 
                            className='btn btn-info mt-3'
                            to={"/register"}>Register
                        </Link>
                        </div>
                    </form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
