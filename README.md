# spreadshirt trial with react-native

## Tasks done
- The	user	is	presented	a	possibility	to	search	for	certain	designs	in	Spreadshirt’s	shop with	shop	ID	205909	by	a	certain	keyword
- The	items	in	the	result	list	of	the	search	are presented	to	the	user	one	after	the	other
- With	each	design	presented,	users	will	be	able	to	like	or	dislike	it
- Users	can	switch	back	to the	keyword	search	at	any	time
- Users	can	finish voting	at	any	time
- When	the	user	finishes	the	voting,	she	should	get	a	small	overview	on	how	many	
- designs	have	been	voted	on	and	how	many	positive	or	negative	votes	she	submitted	grouped	by	keyword

## what could be done better?
- the JS design: a state controlling app-class which holds all state and contains the searchbar and the like-dislike overview, while the gallery to rate the designs is in an overlapping gallery
- a better seperation of concerns and component to reduce connections
- better (and responsive!) buttons , especially for like/dislike
- a general responsive design and viewport awareness
- a smoother transition between slides when new ones are loaded
- a facet selector to improve search

##Things I noticed
- the API is not HTTP conform, as it requires uppercase letters and is case sensitive
- also the API should be able to use the Header 'accept:application/json' to retrieve json.

## how to run:
    npm install
    npm run devserver
You can reach the devserver at localhost:8080. You need to reload the page after using the mobile device to get swipe to work.


### notes
- I started using react yesterday (sunday, 28th Aug 2016)
- I unfortunately started doing this with reapp, which is more or less a dead project. This caused further delay in the deployment process
