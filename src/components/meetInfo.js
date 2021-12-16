import React from 'react';
import Card from 'react-bootstrap/Card';
import { withRouter } from 'react-router-dom';

import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { API_ROOT } from "../constants";
import { formatDate} from "../utils";
import * as Icon from 'react-bootstrap-icons';
import { Container, Row, Col} from 'react-bootstrap';

export class MeetInfo extends React.Component {

    constructor() {
        super();

        this.DeleteMeeting = this.DeleteMeeting.bind(this);
    }

    DeleteMeeting(e){
        e.preventDefault();
        console.log("Delete: "+ this.props.meeting._id);
        let _this = this;
        axios.delete(API_ROOT + "meeting/" + this.props.meeting._id)
        .then(()=>{
            // this.props.ReloadData();
            _this.props.history.push("/planner");  
            window.location.reload();
        })
        .catch();
    }

    render() {
        return (
                <Card className="mb-3 mt-3 sm">
                    <Card.Header style={{fontSize: "70%"}}>
                        {this.props.showdate && formatDate(this.props.meeting.date) + " - "}
                            {this.props.meeting.starttime} to {this.props.meeting.endtime}                        
                    </Card.Header>
                    <Card.Body style={{fontSize: "70%"}} className="p-1">
                        {this.props.meeting.description}
                        </Card.Body>
                        <Card.Footer className="pl-1 m-0">
                        <span  style={{display: "flex"}} className="p-0 m-0">
                        <Card.Link className="p-0" title="click here to edit this entry"  href={"/update/" +this.props.meeting._id} className="btn btn-info btn-sm">
                        <Icon.Pencil />
                        </Card.Link>                    
                        <Card.Link className="float-sm-end" onClick={this.DeleteMeeting} title="click here to delete this entry"  href="#" className="btn btn-info btn-sm">
                        <Icon.Trash />
                        </Card.Link>                    
                        </span>
                        </Card.Footer>
                    
                </Card>
        );
    }
}

export default withRouter(MeetInfo);