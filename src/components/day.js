import React from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { dayOfWeek, formatDate } from "../utils";
import { Meetings } from "./meetings";

export default class Day extends React.Component {

    constructor() {
        super();
    }

    render() {
        console.log("Creating day");
        console.log(this.props);
        return (
            <Card>            
                <Card.Header>{this.props.showday && <h5>{dayOfWeek(this.props.date)}</h5>}
                    {this.props.showdate && <p>{this.props.date}</p>}
                </Card.Header>
                <Row className="m-0">
                    <Col>
                        <Meetings appointments={this.props.appointments}>
                        </Meetings>
                    </Col>
                </Row>
            </Card>
        );
    }
}

