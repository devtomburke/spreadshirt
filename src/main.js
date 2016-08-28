// "use strict";
// import React from 'react';

// // "Data"


// // Our application



"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';
import Superagent from 'superagent';

import cards from './cards.json';
import GreetingCard from './GreetingCard';
import SearchBar from 'react-search-bar';

const baseURL = "http://api.spreadshirt.net/api/v1/shops/205909/designs?showFacets=true&spellcheck=true&sortField=price&sortOrder=desc&locale=de_DE&mediaType=json&limit=20";


const Carousel = React.createClass ({


	getInitialState(){
		return {
		    photos: [],
		    offset:10,
		    input:""

		}
	},

	cardsCreator() {
    return cards.map(function(index) { // (2)
      return(<div className="GreetingCard">
				<GreetingCard card={index} />
			</div>); 
    	});
  	},

  	handleChange(input, resolve) {return null},

  	handleSearch(input) {
  	console.info('Searching "${input}"');
    Superagent.get('${baseURL}&query=${input}&offset=${offset}', res => {
      	console.log(res.status);

        if (res.status === 200 && res.designs.design)
          this.setState({
            photos: res.designs.design.resources.resource
          });
      });
  	},

    render() {
        return (<div>
	        		<h3>Spreadshirt Search</h3>
	        		<SearchBar
	        		  onChange={this.handleChange}
					  onSearch={this.handleSearch} />

		            <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
		                {::this.cardsCreator()}
		            </ReactSwipe>
	            </div>
        );
    }
});

ReactDOM.render(
    <Carousel />,
    document.getElementById('mount')
);
