"use strict";

import React from 'react';

// Credits for :hover handling goes to https://github.com/Sitebase/cssinjs/blob/a83c22436978f1db9a6a3898d971583bba1b0c78/interaction-aware-mixin.js
export default class NavBar extends React.Component {
	constructor(props) {
		super(props);
	}

	getImageDomNode() {
		return React.findDOMNode(this.refs.image);
	}

	render() {
		return (
			<img src={this.props.image}
					 onClick={this.props.onClick}
					 ref='image'
				/>
		);
	}


}
