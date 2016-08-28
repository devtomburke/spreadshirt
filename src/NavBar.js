"use strict";

import React from 'react';
import NavButton from './NavButton';

// Use Image resources via require
const Icons = {
	prev: require('./styles/prev.png'),
	next: require('./styles/next.png'),
	prevHi: require('./styles/prev-hi.png'),
	nextHi: require('./styles/next-hi.png')
};

export default class NavBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="NavBar">
				<NavButton image={Icons.prev} onClick={this.props.onPrev}/>
				<NavButton image={Icons.next} onClick={this.props.onNext}/>
			</div>
		)
	}
}