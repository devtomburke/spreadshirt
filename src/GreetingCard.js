"use strict";

import React from 'react';
import CardImage from './CardImage';

export default class GreetingCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<CardImage image={this.props.card.image}/>
			</div>
		);
	}
}
