## cQuery

cQuery is a functional clone of jQuery using Vanilla JavaScript DOM manipulation to achieve the vast functionality that made jQuery an industry standard.

### Notable Functions

### $l

  This is the primary way to create a collection of HTML Elements to manipulate. It will behave differently depending on what type of input you give it. If you give it a string, it will search the document for elements that have that tag name. If the input is a HTMLElement, the function will wrap it in my DOMNodeCollection class, which gives it all of the functionality. Finally, if its a function, it queues it to be called once the document is ready, or, if the document is already ready, it calls it.

### $l.extend

  This function is similar to Lodash's merge function. It creates a deep clone of an object and merges it with the rest of the inputs to the function, which should also be objects.


### $l.ajax

  This function handles making HTTP requests as it does in jQuery. It takes an options object which could contain some of the following:
    1) contentType
    2) method - (GET, PATCH, DELETE, POST, etc..)
    3) url - the location to dispatch the request to
    4) success callback
    5) error callback
    6) Any data to include in the request

  This object is merged with a defaults object using our extend function. This object is used in a promise to make the request and allow the user to make then statements on what to do with the repsonse of their request.


### DOMNodeCollection

  This is a class wrapper that provides extensive functionality to the html elements provided to it.
  The following are the methods included in the class.

  1) html -> replaces the inner html of each of the elements with the inputted string
  2) empty -> clears the inner html of all of the elements in the collection
  3) append -> add html of either a html element, a string, or a whole DOMNodeCollection to the       elements that exist in the current DOMNodeCollection
  4) attr -> returns the attribute that corresponds to the attributeName inputted to the function
  5) add/removeClass -> adds/removes a class from each of the elements in the DOMNodeCollection
  6) children -> returns a DOMNodeCollection of all of the children of all of the elements in the current DOMNodeCollection
  7) parent -> returns the parents of each element as a DOMNodeCollection
  8) find -> locates and returns an element that matches the selector given to the function
  9) remove -> removes all of the elements from the DOMNodeCollection
  10) on -> adds an event listener to the elements with a type and an action callback
  11) off -> turns off the event listeners set up by the on function
