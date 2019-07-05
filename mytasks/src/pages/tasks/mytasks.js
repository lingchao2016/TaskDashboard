import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as moment from 'moment'
import TopBanner  from '../../components/TopBanner'
import SideBar  from '../../components/SideBar'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Modal from 'react-bootstrap/Modal'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { Link } from 'react-router-dom'
import { fetchTasks, filterTasks, deleteTask, editTask } from '../../actions';
import Datetime from 'react-datetime'
import { withRouter } from 'react-router-dom'


const taskTpyes = {1: "Assignment", 2:"Contest", 3:"Project"}
class MyTasks extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isLoading: false,
			completedtasks: false,
			uncompletedtasks: false,
			pasttasks: false,
			overduetasks: false,
			fromdate: 0,
			todate: 0,
			showDeleteModal: false,
			deletingTaskId: "",
			showCompleteModal: false,
			completingTaskId: "",
			tasks: this.props.tasks
		}
	}
	componentDidMount(){
    this.props.fetchTasks();
  }
	//Handle Filter Tasks-----Start
	handleFromDate = (taskDate) =>{
	 	this.setState({fromdate: taskDate.toDate().getTime()}, function () {
	    this.filter();
		});
  };
	handleToDate = (taskDate) =>{
		this.setState({todate: taskDate.toDate().getTime()}, function () {
		 	this.filter();
	 	});
	};
	filter = (e) =>{
		var isCompleted = -1;
		var isPast = -1;
		var fromDate = this.state.fromdate;
		var toDate = this.state.todate;
		if(e){
			if(e.target.name=="completedtasks"){
				this.setState({completedtasks:  e.target.checked});
				if(e.target.checked){
					this.refs["uncompletedtasks"].checked = false;
					isCompleted = 100;
				}
			}
			if(e.target.name=="uncompletedtasks"){
				this.setState({uncompletedtasks:  e.target.checked});
				if(e.target.checked){
					this.refs["completedtasks"].checked = false;
					isCompleted = 0;
				}
			}
			if(e.target.name=="pasttasks"){
				this.setState({pasttasks:  e.target.checked});
				if(e.target.checked){
					isPast = 1;
				}
			}
			if(e.target.name=="overduetasks"){
				this.setState({overduetasks:  e.target.checked});
				if(e.target.checked){
					this.refs["pasttasks"].checked = false;
					this.refs["uncompletedtasks"].checked = false;
					isPast = 1;
					isCompleted = 0;
				}
			}
		}
    this.props.filterTasks(isCompleted,isPast,fromDate,toDate);
	}
  //Handle Filter Tasks-----End
	// Handle Delete Task function-----Start
	showDeleteModal = (taskId) => {
    this.setState({ showDeleteModal: true, deletingTaskId: taskId });
  }
	hideDeleteModal = (e) => {
		this.setState({ showDeleteModal: false });
	}
	deleteTask = (e) => {
		this.props.deleteTask(this.state.deletingTaskId).then(()=>{
			this.setState({ showDeleteModal: false });
			this.props.fetchTasks();
		})
	}
	// Handle Delete Task function-----End

	// Handle Complete Task function-----Start
	showCompleteModal = (taskId) => {
    this.setState({ showCompleteModal: true, completingTaskId: taskId });
  }
	hideCompleteModal = (e) => {
		this.setState({ showCompleteModal: false });
	}
	markTask = (e) => {
		this.props.editTask({id: this.state.completingTaskId, completedPct: 100}).then(()=>{
			this.setState({ showCompleteModal: false });
			this.props.fetchTasks();
		})

	}
	// Handle Complete Task function-----End
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
						<Breadcrumb.Item active>
							My Tasks
						</Breadcrumb.Item>
					</Breadcrumb>
						<div className="container-fluid">
              <div className="py-3 col-13"> <Button><Link to="/mytasks/new">Add Task</Link></Button></div>
							<div className="row py-3">
							<div className="col-3">

							<Form>
								<Form.Group controlId="formBasicChecbox">
								<Form.Check type="checkbox" label="Completed Tasks" name="completedtasks" ref="completedtasks" onChange={this.filter}/>
								</Form.Group>
								<Form.Group controlId="formBasicChecbox">
								<Form.Check type="checkbox" label="UnCompleted Tasks" name="uncompletedtasks" ref="uncompletedtasks" onChange={this.filter}/>
								</Form.Group>
								<Form.Group controlId="formBasicChecbox">
								<Form.Check type="checkbox" label="Past Tasks" name="pasttasks" ref="pasttasks" onChange={this.filter}/>
								</Form.Group>
								<Form.Group controlId="formBasicChecbox">
								<Form.Check type="checkbox" label="OverDue Tasks" name="overduetasks" ref="overduetasks" onChange={this.filter}/>
								</Form.Group>
								<Form.Group controlId="taskdate">
	                <Form.Label>From Date</Form.Label>
									<Datetime inputProps={{ id: 'yourInputID', name: 'yourInputName'}} timeFormat={false} name="fromdate" ref="fromdate" onChange={this.handleFromDate}/>
	              </Form.Group>
								<Form.Group controlId="taskdate">
	                <Form.Label>To Date</Form.Label>
									<Datetime  timeFormat={false} name="todate" ref="todate" onChange={this.handleToDate}/>
	              </Form.Group>
						  </Form>
							</div>
							<div className="col-9">
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subject</th>
                    <th>Description</th>
										<th>Task Type</th>
                    <th>Due Date</th>
                    <th>Percentage</th>
										<th></th>
                  </tr>
                </thead>
                <tbody>{
                  this.props.tasks?this.props.tasks.map((item, key) => {

                    return  <tr>
                        <td>
												{item.completedPct==100?
													<i className="fas fa-check"></i>
													:
													<OverlayTrigger
											      overlay={
											        <Tooltip>
											          Mark this task as completed
											        </Tooltip>
											      }
											    >
											      <i className="fas fa-times" onClick={()=>{this.showCompleteModal(item._id)}}></i>
											    </OverlayTrigger>
												}

												</td>
                        <td><Link to={`/mytasks/${item._id}`}>{item.subject}</Link></td>
                        <td>{item.description}</td>
												<td>{taskTpyes[item.taskType]}</td>
                        <td>{moment(item.taskDate).format('hh:mm MM/DD/YYYY')}</td>
                        <td>{item.completedPct}%</td>
												<td><i className="far fa-trash-alt" onClick={()=>{this.showDeleteModal(item._id)}}></i></td>
                      </tr>
                  }):""
                }
                 </tbody>
               </Table>
							 </div>
							 </div>
              </div>
            </div>
        </div>
				<Modal show={this.state.showDeleteModal} onHide={this.hideDeleteModal} >
          <Modal.Header closeButton>
            <Modal.Title>Delete Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideDeleteModal}>
              No
            </Button>
            <Button variant="primary" onClick={this.deleteTask}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
				<Modal show={this.state.showCompleteModal} onHide={this.hideCompleteModal} >
          <Modal.Header closeButton>
            <Modal.Title>Mark as Completed</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to mark this task as completed?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideCompleteModal}>
              No
            </Button>
            <Button variant="primary" onClick={this.markTask}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
		)
	}
}

function mapStateToProps({tasks}){
  return { tasks };
}
const mapDispatchToProps = (dispatch) => {
	return {
    fetchTasks: (id) => dispatch(fetchTasks()),
    filterTasks: (isCompleted, isPast,fromDate,toDate)  => dispatch(filterTasks(isCompleted, isPast,fromDate,toDate) ),
		deleteTask: (id) => dispatch(deleteTask(id)),
		editTask: (id) => dispatch(editTask(id)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyTasks));
