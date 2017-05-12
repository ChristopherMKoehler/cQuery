## cQuery

cQuery is a lightweight DOM manipulation library using Vanilla JavaScript DOM manipulation that allows for controlling the elements of a webpage.

### Notable Functions

### $l

  This is the primary way to create a collection of HTML Elements to manipulate. It will behave differently depending on what type of input you give it. If you give it a string, it will search the document for elements that have that tag name. If the input is a HTMLElement, the function will wrap it in my DOMNodeCollection class, which gives it all of the functionality. Finally, if its a function, it queues it to be called once the document is ready, or, if the document is already ready, it calls it.


  ```JavaScript
      if (typeof tagName === 'string') {
        const htmlElements = Array.from(document.querySelectorAll(tagName));
        return new DOMNodeCollection(htmlElements);
      } else if (tagName instanceof HTMLElement) {
        const htmlElements = [tagName];
        return new DOMNodeCollection(htmlElements);
      } else if(typeof tagName === "function") {
        !_docReady ? _docReadyCallbacks.push(tagName) : tagName();
      } else {
        throw new TypeError("Invalid input.");
      }
  ```

### $l.extend

  This function is similar to Lodash's merge function. It creates a shallow clone of an object and merges it with the rest of the inputs to the function, which should also be objects.

  ```JavaScript
    $l.extend = (...objects) => {
      const mergedObj = objects[0];
      objects.slice(1).forEach((obj) => {
        Object.keys(obj).forEach((key) => mergedObj[key] = obj[key])
      });
      return mergedObj;
    }
  ```

### $l.ajax

  This function handles making HTTP requests. It takes an options object which could contain some of the following:
    1) contentType
    2) method - (GET, PATCH, DELETE, POST, etc..)
    3) url - the location to dispatch the request to
    4) success callback
    5) error callback
    6) Any data to include in the request

  This object is merged with a defaults object using our extend function and is reformatted to have a standard method casing and have the url contain an appropriate query string.

  ```JavaScript
    let defaults = {
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: "GET",
      url: "",
      success: () => {},
      error: () => {},
      data: {},
    }

    options = $l.extend(defaults, options);
    options.method = options.method.toUpperCase();

    if (options.method === "GET") {
      options.url += "?" + toQueryString(options.data);
    }
  ```

  The toQueryString function is just a helper to convert the data to a query string.

  ```JavaScript
    const toQueryString = obj => {
      let result = "";
      Object.keys(obj).forEach(key => result += key + "=" + obj[key] + "&");
      return result.substring(0, result.length - 1);
    }

  ```
  This object is used in a promise to make the request and allow the user to make then statements on what to do with the repsonse of their request.


### DOMNodeCollection

  This is a class wrapper that provides extensive functionality to the html elements provided to it.
  The following are the methods included in the class.

  1) ``` html() ``` -> replaces the inner html of each of the elements with the inputted string
  2) ``` empty() ```-> clears the inner html of all of the elements in the collection
  3) ``` append() ```-> add html of either a html element, a string, or a whole DOMNodeCollection to the       elements that exist in the current DOMNodeCollection
  4) ``` attr() ```-> returns the attribute that corresponds to the attributeName inputted to the function
  5) ``` add/removeClass() ```-> adds/removes a class from each of the elements in the DOMNodeCollection
  6) ``` children() ```-> returns a DOMNodeCollection of all of the children of all of the elements in the current DOMNodeCollection
  7) ``` parent() ```-> returns the parents of each element as a DOMNodeCollection
  8) ``` find() ```-> locates and returns an element that matches the selector given to the function
  9) ``` remove() ```-> removes all of the elements from the DOMNodeCollection
  10) ``` on() ```-> adds an event listener to the elements with a type and an action callback

  ```JavaScript
    //example
    $l.("button").on("click", () => alert("You clicked the button!"));
  ```
  11) ``` off() ```-> turns off the event listeners set up by the on function

  ```JavaScript
    //example
    $l.("button").off("click");
    //This turns off the on click we put on in the on example
  ```

### How to use the demo

1) Clone this repository
2) Open the demo.html file that is found inside of the demo folder in your browser, which will show a few different html elements
3) Open the developer tools (function + f12 on Windows, command + option + i on Mac)
4) In the console, use $l to select the elements from the html that you woul like to manipulate (eg. $l("button") will select the "Useless Button")
5) Use an action defined above to manipulate those elements. Try $l("button").on("click", () => alert("You pressed the useless button")) and then click on the useless button to see what happens.
6) Feel free to try this out on your own html docs or add more elements to this document.
