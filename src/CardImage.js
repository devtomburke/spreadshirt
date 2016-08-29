import React from 'react';

export default class CardImage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<img className="Image" src={this.props.image} />
		);
	}
}
