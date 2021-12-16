import React from 'react';
import MeetInfo from './meetInfo';
import { Container, Row, Col, Alert} from 'react-bootstrap';

export class Meetings extends React.Component {
    
    meetings() {
        return this.props.appointments.map((appointment) => {
            return <MeetInfo meeting={appointment}  key={appointment._id} ReloadData={this.props.ReloadData}></MeetInfo>
        })
    };
    render() {
        if (this.props.appointments.length == 0) {
            return (
                <p>Nothing Scheduled</p>
            )
        }
        return (
            <Container>
                {this.meetings()}
            </Container>
        )
    
    }
}

export default Meetings;