import React from 'react';
import { Meetings } from './meetings';
import axios from 'axios';
import { API_ROOT, LOGIN_TOKEN_ID } from "../constants";
import { allDaysInWeek, filterByDate } from "../utils";
import Day  from './day';
import { Container, Row, Col} from 'react-bootstrap';

const userId = localStorage.getItem(LOGIN_TOKEN_ID);

export class Planner extends React.Component {

    constructor(){
        super()
    }

    state = {
        days: []
    };

    componentDidMount() {
        axios.get(API_ROOT + 'meetings/' + userId)
            .then((response) => {
                this.setState({ days: this.populatedays(response.data.details) })
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    populatedays(meetings) {
        let today = new Date();
        let wdays = allDaysInWeek(today);
        console.log("populating days");
        console.log(wdays);
        let days = [];
        wdays.forEach(day => {
            days.push({
                date: day,
                meetings: filterByDate(meetings, day)
            })
        });
        console.log(days);
        return days;
    }

    days() {
        return this.state.days.map((day) => {
            return <Col><Day showdate={true} showday={true} appointments={day.meetings}  date={day.date} showdate={true} key={day.date} /></Col>
        })

    }

    render() {
        return (
            <div>
                <h1>Your Weekly Planner View</h1>
                <Row>
                    {this.days()}
                </Row>                
            </div>
        );
    }
}

export default Planner;
