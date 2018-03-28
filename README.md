
## Prismub front interface

### Functionnalities ###
* Search for a public repository
	* On Github yet. But the back architecture allow adding more suppliers (i.e. Gitlab etc.) quite easily.
	* With paginated autocompletion.
* View of some statistics about the selected repository:
	* Repartition of participation between the developers who pushed their work into the 100 last commits of all the branches of the repository. This repartition of the work is presented via a plot.
	* The list of the developers that have commited one or more commits among the 100 last commits.
	* A timeline of the 100 last commits of the repository.

> *NB: all the endpoints already offer some pagination (with simple page number instead of (offset, limit), because of the model of Github v3
> API (you can note here the bad pattern that consists on implementing a
> service according to another service, I'm conscious of that but to
> gain some time for this small project, I decided to keep this model
> ;-) Kids, don't do that at home!)*


### Technical recipe ###
**General stack**
* React (as the view library)
* React Router v4 (for container switching)
* React Bootstrap (for the design basis)
* chartjs (for the plots)
* axios (for the http calls)

**Tools**
* webpack (as a local dev server and for the final optimized build)
* Babel (as the transpiler from Typescript to ES2015)

***
### Developer remarks ###
* At the begining of the project I was using Redux. After several Google researches about some Redux behaviors, I discovered the blog of Blair Anderson on which he describes Redux as the new state management standard  for React professionnal UI. But he also talk about the overuse of Redux, particularly for the small projects that can handle a store with a simple "singleton" or that don't need a store! So, the small app I had to do can works without any state manager and I think it would be overkill to add these complex mechanisms. So the app is "state-manager-less" and it simplified the development.
Source: https://medium.com/@blairanderson/you-probably-dont-need-redux-1b404204a07f

### Architecture ###

The architecture is quite the same of a "standard" redux application architecture. Given that we have:
* **public/** directory to store our pictures.
* **src/** to store the source code.
	* **components/** which contains our reusable components.
	* **config/** which contains the whole app config according to the environments.
	* **containers/** that contains our web pages (that are using our components).
	* **css/** which contains our custom styles in addition of Bootstrap.
	* **helpers/** which contains some static helpers (for strings management or http requests).
	* **services/** that contains all http services which carry on the xhr requests to the server API.
