import React, {useState} from 'react';
import axios from 'axios';
import Day  from './day';
import {LOGIN_TOKEN_NAME, API_ROOT, LOGIN_TOKEN_ID} from "../constants";
import { dayOfWeek, filterByDate } from '../utils';


const user = localStorage.getItem(LOGIN_TOKEN_NAME);
const userId = localStorage.getItem(LOGIN_TOKEN_ID);

export class Content extends React.Component {
    state = {
        meetings: []
    };

    constructor(){
        super();
    };

    componentDidMount() {
        this.loadMeetings();
    }

    loadMeetings() {
        axios.get(API_ROOT + 'meetings/' + userId)
        .then((response) => {
            // filter meetings to today
            this.setState({meetings:filterByDate(response.data.details, new Date().toLocaleDateString())});
        })
        .catch((error) => {
            console.log(error)
        });
    }

    render() {
        const parts = user.split(" ");
        const date = new Date().toLocaleDateString();
        
        return ( <div>
            <h1 > Today is {dayOfWeek(date)} </h1>
            {this.state.meetings.length > 0 && <p>You have the following appointments scheduled for today</p>}
            <Day showdate={true} date={date} appointments={this.state.meetings}/>
            </div>
        );    
    }
}

