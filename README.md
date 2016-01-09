#Problem:
  Sedan chairs never go out of style, but it is incredibly hard to order them.

#Solution:
Use 
+ React Maps
+ React Motion
+ and Google Voice 

to set up an app that calls a bunch of people to carry you in a pvc chair around a campfire.

##Details

Uses redux pattern, and react/redux-router -- both of which are totally unneccesary for something like this (which has only one action)


Flow of application is 
index.html 
+  pulls in:  index.js
  + requires: containers/root.js
      + _(which is where you can load the Redux devtools)_
    + root container is home of Routes component
      + Routes/index.js is where all the routes are housed 
        + (i.e. where you can play with what component will load for what url)
        + map and 
    + Route container feeds in the Redux store 
      + this is (the global object that holds state)
        + changes to redux state are made through dispatching actions to reducers