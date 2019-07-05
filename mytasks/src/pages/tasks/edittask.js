import React, { Component } from 'react'
import TopBanner  from '../../components/TopBanner'
import SideBar  from '../../components/SideBar'
import TaskForm  from '../../components/TaskForm'
import { withRouter } from 'react-router-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import {fetchTask, editTask} from '../../actions';
import { connect } from 'react-redux';

class EditTaskForm extends Component {

	constructor(props) {
		super(props)
    var taskid = props.match.params.taskid;
		this.state = {
			subject: props.subject,
		  description: props.description,
		  taskDate: props.taskDate,
		  taskType: props.taskType,
		  completedPct: props.completedPct,
      isLoading: true
		}

	}
	componentDidMount() {

		this.props.fetchTask(this.props.match.params.taskid).then(()=>{
      this.setState({isLoading: false});
    });
	}
  renderTask(){
    if(this.state.isLoading){
      return <div />
    }else
    return <TaskForm handleSubmit={this.props.handleSubmit}
      id={this.props.match.params.taskid}
      subject = {this.props.task.subject}
      description = {this.props.task.description}
      taskDate = {this.props.task.taskDate}
      taskType = {this.props.task.taskType}
      completedPct = {this.props.task.completedPct}
      subject = {this.props.task.subject}
    />
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
							<Breadcrumb.Item active>Edit Task: {this.props.task.subject}</Breadcrumb.Item>
						</Breadcrumb>
            <div className="container-fluid">
							{this.renderTask()}
              </div>
            </div>
        </div>
      </div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		task: state.task
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
    fetchTask: (id) => dispatch(fetchTask(id)),
    handleSubmit: (value, history) => dispatch(editTask(value, history))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditTaskForm))
//export default connect(null, actions)(withRouter(NewForm));
