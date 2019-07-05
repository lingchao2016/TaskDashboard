import React, { Component } from 'react'
export default class TopBanner extends Component {

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
			<nav className="navbar navbar-expand navbar-dark bg-dark static-top">
        <div className="navbar-brand mr-1">{this.props.title}</div>
      </nav>
		)
	}
}

/*const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUser: ( f) => dispatch(fetchUser(f))
	}
}

const connectedContainer = connect(mapStateToProps, mapDispatchToProps)(TopBanner)
const routedContainer = withRouter(connectedContainer)
export default routedContainer*/
