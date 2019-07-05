import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class SideBar extends Component {

	constructor(props) {
		super(props)
		this.state = {
			showNav: false
		}
	}
	componentDidMount() {
		//this.props.fetchUser();
	}

	render() {

		return (
      <ul className="sidebar navbar-nav">
        <li className="nav-item">
          <Link to='/' className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span className="px-2">Tasks</span>
          </Link>
					<Link to='/calendar' className="nav-link">
            <i class="far fa-calendar-alt"></i>
            <span className="px-2">Calendar</span>
          </Link>
        </li>
    </ul>
		)
	}
}
