"use strict";

import React from 'react';
import CardImage from './CardImage';

export default class Card extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<CardImage image={this.props.image}/>
			</div>
		);
	}
}
