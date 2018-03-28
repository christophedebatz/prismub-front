
## Prismub front interface

**Used stack:**
* React (as the view library)
* React Router v4 (for container switching) 
* React Bootstrap (for the design basis)
* chartjs (for the plots)
* axios (for the http calls)

**Tools**
* webpack (as a local dev server and for the final optimized build)
* Babel (as the transpiler from Typescript to ES2015)

***
**Developer remarks:**
* At the begining of the project I was using Redux. After several Google researches about some Redux behaviors, I discovered the blog of Blair Anderson on which he describes Redux as the new state management standard  for React professionnal UI. But he also talk about the overuse of Redux, particularly for the small projects that can handle a store with a simple "singleton" or that don't need a store! So, the small app I had to do can works without any state manager and I think it would be overkill to add these complex mechanisms. So the app is "state-manager-less" and it simplified the development.
Source: https://medium.com/@blairanderson/you-probably-dont-need-redux-1b404204a07f

**Architecture**
The architecture is quite the same of a "standard" redux application architecture. Given that we have:
* **public/** directory to store our pictures.
* **src/** to store the source code.
	* **components/** which contains our reusable components.
	* **config/** which contains the whole app config according to the environments.
	* **containers/** that contains our web pages (that are using our components).
	* **css/** which contains our custom styles in addition of Bootstrap.
	* **helpers/** which contains some static helpers (for strings management or http requests).
	* **services/** that contains all http services which carry on the xhr requests to the server API.
