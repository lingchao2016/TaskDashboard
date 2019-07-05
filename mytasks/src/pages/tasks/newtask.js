import React, { Component } from 'react'
import TopBanner  from '../../components/TopBanner'
import SideBar  from '../../components/SideBar'
import TaskForm  from '../../components/TaskForm'
import { withRouter } from 'react-router-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import {createTask} from '../../actions';
import { connect } from 'react-redux';

class NewForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isLoading: false,
			subject: props.subject,
		  description: props.description,
		  taskDate: props.taskDate,
		  taskType: props.taskType,
		  completedPct: props.completedPct
		}
	}
	componentDidMount() {
		//this.props.newTask();
	}
	render() {

		return (
      <div>
  			<TopBanner
          title="Task Dashboard"
        />
        <div id="wrapper">
          <SideBar />
          <div id="content-wrapper">
						<Breadcrumb>
							<Breadcrumb.Item href="/">
								My Tasks
							</Breadcrumb.Item>
							<Breadcrumb.Item active>Create A Task</Breadcrumb.Item>
						</Breadcrumb>
            <div className="container-fluid">
							<TaskForm handleSubmit={this.props.handleSubmit}/>

              </div>
            </div>
        </div>
      </div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		subject: state.subject
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		handleSubmit: (value, history) => dispatch(createTask(value, history))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewForm))
//export default connect(null, actions)(withRouter(NewForm));
