import React, { useState } from 'react';
import axios from 'axios';
import { API_ROOT, LOGIN_TOKEN_NAME, LOGIN_TOKEN_ID } from '../constants';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Alert, Nav} from 'react-bootstrap';


// Create Register Element
export default function Register(props)  {
    const history = useHistory();
    const [error, setError] = useState("");
    const [email, setEmail] = useState(props.email);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");

    const validateInputs = () => {
        if (!name || name.trim() == "") {
            setError("Please enter an email address");
            return false;
        }
        if (!email || email.trim() == "") {
            setError("Please enter an email address");
            return false;
        }
        if (!password || password.trim() == "") {
            setError("Please enter a password");
            return false;
        }
        if (!password1 || password1.trim() == "") {
            setError("Please enter the same password a second time");
            return false;
        }

        if (password1 != password) {
            setError("The two passwords entered are not the same");
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
        console.log("Register new user with " + email);
        const newLogin = {
            email: email,
            password: password,
            name: name
        }
        console.log("Calling " + API_ROOT);
        axios.post(API_ROOT + 'user', newLogin)
            .then((res) => {
                console.log("Register response");
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
            });
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangePassword1 = (e) => {
        setPassword1(e.target.value);
    };

    return (
        <Container className="login">
            <Row>
                <Col>
                    <h3>Register To Use Planner</h3>        
                </Col>
            </Row>
            <Row>
            <Col></Col>
            <Col>
                <form>
                    <p>To register to use the Planner please enter your email and a new password twice</p>
                    <div className='form-group'>
                        <label>Full Name: </label>
                        <input type='text'
                            className='form-control'
                            value={name}
                            onChange={onChangeName}>
                        </input>
                    </div>

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
                    <div className='form-group'>
                        <label>Confirm Password: </label>
                        <input type='password'
                            className='form-control'
                            value={password1}
                            onChange={onChangePassword1}>
                            
                        </input>
                    </div>

                    {error && <Alert className="my-3 p-0" variant="danger">{error}</Alert>}

                    <div className='form-group'>
                        <input type='submit'
                        value='Register'
                            className='btn btn-info mt-3'
                            onClick={onSubmit}></input>
                    </div>
                </form>
                </Col>
                <Col></Col>
                </Row>
        </Container>
    );

}
