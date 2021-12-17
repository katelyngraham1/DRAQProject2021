import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { API_ROOT, LOGIN_TOKEN_ID } from "../constants";
import Form  from './form';
import InputField from './inputfield';
import Button from './button';
import { Row, Col, Alert} from 'react-bootstrap';


// Create Component
export class Update extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeMeeting = this.onChangeMeeting.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);

        this.state = {
            Description: '',
            Date: '',
            StartTime: '',
            EndTime: '',
            error: ''
        }
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
        this.loadMeetingData()
    }

    loadMeetingData() {
        let _this = this;
        axios.get(API_ROOT + 'meeting/' + this.props.match.params.id)
        .then(response => {
            console.log("Loading data");
            console.log(response.data.details);
            _this.setState({
                _id:response.data.details._id,
                Description:response.data.details.description,
                Date:response.data.details.date,
                StartTime:response.data.details.starttime,
                EndTime:response.data.details.endtime
            })
        }).catch((error)=> {
            console.log(error);
        })
    }

    onChangeMeeting(e) {
        this.setState({
            Description: e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            Date: e.target.value
        });
    }

    onChangeStartTime(e) {
        this.setState({
            StartTime: e.target.value
        });
    }

    onChangeEndTime(e) {
        this.setState({
            EndTime: e.target.value
        });
    }

    validateInput() {
        if (this.state.Description == '') {
            return "Please enter a description for the meeting";
        }
        if (this.state.Date == '') {
            return "Please enter a date for the meeting";
        }
        if (this.state.StartTime == '') {
            return "Please enter a start time for the meeting";
        }
        if (this.state.EndTime == '') {
            return "Please enter an end time for the meeting";
        }
        return null;
    }

    onSubmit(e) {
        e.preventDefault();
        
        const isValid = this.validateInput();
        if (isValid != null) {
            this.setState({error: isValid});
            return;
        }
        
        const updateMeeting = {
            description: this.state.Description,
            date: this.state.Date,
            starttime: this.state.StartTime,
            endtime: this.state.EndTime,
            userId: localStorage.getItem(LOGIN_TOKEN_ID),
            _id: this.state._id
        }

        axios.put(API_ROOT + 'meeting/' + this.state._id, updateMeeting)
        .then(res => {
            console.log(res.data)
            this.props.history.push("/planner");  
            window.location.reload();
        })
        .catch((error)=> {
            console.log(error);
            this.setState(error);
        })

    }

    render() {
        return (
            <Form title="Update Meeting" onSubmit={this.onSubmit}>                
                <InputField type="text" label="Meeting Description" value = {this.state.Description} onChange={this.onChangeMeeting} />
                <InputField type="date" label="Date Of Meeting" value = {this.state.Date} onChange={this.onChangeDate} />
                <InputField type="time" label="Start Time Of Meeting" value = {this.state.StartTime} onChange={this.onChangeStartTime} />
                <InputField type="time" label="End Time Of Meeting" value = {this.state.EndTime} onChange={this.onChangeEndTime} />

                {this.state.error != "" && <Row><Col></Col><Col><Alert className="my-3 p-0" variant="danger">{this.state.error}</Alert></Col></Row>}
                <Button label="" value ="Save Changes" />                
            </Form>

        );
    }
}

export default withRouter(Update);
