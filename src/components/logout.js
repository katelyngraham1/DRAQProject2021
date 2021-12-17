import React, { useState } from 'react';
import axios from 'axios';
import { LOGIN_TOKEN_NAME, LOGIN_TOKEN_ID } from '../constants';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Alert} from 'react-bootstrap';


// Create Login Element
export default function Logout(props)  {
    const history = useHistory();

    const onLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem(LOGIN_TOKEN_NAME);
        localStorage.removeItem(LOGIN_TOKEN_ID);
        history.push("/");
        window.location.reload();
    };

    const onCancelLogout = (e) => {
        e.preventDefault();
        history.push("/planner")    
    };

    return (
        <Container className="login">
            <Row>
                <Col>
                    <h3>Are You Sure You Want To Logout</h3>        
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <form>
                        <div className='form-group'>
                            <Row>
                                <Col>
                                    <input type='submit'
                                    value='Yes Logout'
                                    className='btn btn-info mt-3'
                                    onClick={onLogout}></input>
                                </Col>
                                <Col>
                                    <input type='submit'
                                        value='No Cancel That'
                                        className='btn btn-info mt-3'
                                        onClick={onCancelLogout}></input>
                                </Col>
                            </Row>
                        </div>
                    </form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
