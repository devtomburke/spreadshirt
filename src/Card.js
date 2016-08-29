"use strict";

import React from 'react';
import CardImage from './CardImage';
import thumbup from './images/thumbup.png';
import thumbdown from './images/thumbdown.png';



export default class Card extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
			keyword: this.props.keyword
		};
	}


	render() {
		return (
			<div >
				<CardImage image={this.props.image}/>
				<div>
					<img className="thumbup" src={thumbup} width="64" height="64" onClick={this.props.ratingHandler.bind(null,"thumbup", this.state.keyword)}/>
					<img className="thumbdown" src={thumbdown} width="64" height="64" onClick={this.props.ratingHandler.bind(null,"thumbdown", this.state.keyword)}/>
				</div>
			</div>
		);
	}
}
