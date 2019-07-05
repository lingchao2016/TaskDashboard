import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { withRouter } from 'react-router-dom'
import Datetime from 'react-datetime'
import { connect } from 'react-redux';

class TaskForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
      id:props.id,
			subject: props.subject,
		  description: props.description,
		  taskDate: props.taskDate,
		  taskType: props.taskType,
		  completedPct: props.completedPct,
      handleSubmit: props.handleSubmit,
      errorMsg: ""
		}
	}
	componentDidMount() {
    this.setState({taskDate: this.props.taskDate?this.props.taskDate:new Date().getTime()});
	}
  validate = () =>{

      try{
        var percentage = parseInt(this.state.completedPct);
        if(isNaN(percentage) || percentage<0 ||percentage>100){
          this.setState({errorMsg: "Please enter a valid % Completed."})
          return false;
        }
      }catch(e){
        console.log("error")
        this.setState({errorMsg: "Please enter a valid % Completed."})
        return false;
      }
      return true
  };
	handleSubmit(event) {

    const form = event.currentTarget;
    var hasError = this.validate();
    console.log("hasError: "+ hasError)
    if (form.checkValidity() === false || !hasError ) {

      event.preventDefault();
      event.stopPropagation();
    }else{
      this.props.handleSubmit(this.state, this.props.history)
      this.props.history.push('/mytasks');
    }
  }
  handleChange = (e) => {
		let newState = {errorMsg: ""}
		newState[e.target.name] = e.target.value
		this.setState(newState)
	}
  handleDate = (taskDate) =>{
      //console.log(taskDate.toDate().getTime())
     this.setState({taskDate: taskDate.toDate().getTime()});
  };
	render() {
		return (
            <Form onSubmit={e => this.handleSubmit(e)} id="task-form">
              {this.state.errorMsg == ""? "":
              <Alert variant="danger">
                {this.state.errorMsg}
              </Alert>
            }
              <Form.Group controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control required type="text" placeholder="Enter subject" name="subject" value={this.state.subject} onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="taskdate">
                <Form.Label>Due Date</Form.Label>
								<Datetime defaultValue={this.state.taskDate?new Date(this.state.taskDate):new Date()} onChange={this.handleDate}/>
              </Form.Group>
              <Form.Group controlId="percentage">
                <Form.Label>% Completed</Form.Label>
                <Form.Control type="text" placeholder="Enter percentage" value={this.state.completedPct} name="completedPct"  onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="type">
                <Form.Label>Task Type</Form.Label>
                <select className="form-control" value={this.state.taskType} name="taskType"  onChange={this.handleChange}>
                    <option value="0"></option>
                    <option value="1">Assignment</option>
                    <option value="2">Contest</option>
                    <option value="3">Project</option>
                </select>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control required as="textarea" rows="3" value={this.state.description} name="description"  onChange={this.handleChange}/>
              </Form.Group>


              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
		   )
	}
}

export default connect(null, null)(withRouter(TaskForm));
