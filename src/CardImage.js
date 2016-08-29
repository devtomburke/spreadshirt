import React from 'react';

export default class CardImage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var divStyle = {display:"block", margin:"auto"};
		return (
			<img className="Image" src={this.props.image} style={divStyle}/>
		);
	}
}
