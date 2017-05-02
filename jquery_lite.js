/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  html(string) {
    if (typeof string === 'string') {
      for (let i = 0; i < this.htmlElements.length; i++) {
        this.htmlElements[i].innerHTML = string;
      }
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  empty() {
    for (let i = 0; i < this.htmlElements.length; i++){
      this.htmlElements[i].innerHTML = "";
    }
  }

  append(arg) {
    for (let i = 0; i < this.htmlElements.length; i++){
      if(typeof arg === 'string'){
        this.htmlElements[i].innerHTML+= arg;
      } else if (arg instanceof HTMLElement) {
        this.htmlElements[i].innerHTML += arg.outerHTML;
      } else if (arg instanceof DOMNodeCollection) {
        for(let j = 0; j < arg.htmlElements.length; j++){
          this.htmlElements[i].innerHTML += arg.htmlElements[j].outerHTML;
        }
      } else {
        throw new TypeError("Invalid input for append");
      }
    }
  }

  attr(attributeName) {
    return this.htmlElements[0].getAttribute(attributeName);
  }

  addClass(className) {
    for(let i = 0; i < this.htmlElements.length; i++){
      this.htmlElements[i].setAttribute("class", className);
    }
    return this.htmlElements;
  }

  removeClass(className) {
    for (let i = 0; i < this.htmlElements.length; i++) {
      if (this.htmlElements[i].getAttribute("class") === className) {
        this.htmlElements[i].removeAttribute("class");
      }
    }
    return this.htmlElements;
  }

  children() {
    let childrenArr = [];
    for (let i = 0; i < this.htmlElements.length; i++) {
      let childs = this.htmlElements[i].children;
      for (let j = 0; j < childs.length; j++) {
        childrenArr.push(childs[j]);
      }
    }

    return new DOMNodeCollection(childrenArr);
  }

  parent() {
    let parentArr = [];
    for (let i = 0; i < this.htmlElements.length; i++) {
      parentArr.push(this.htmlElements[i].parentNode);
    }

    return new DOMNodeCollection(parentArr);
  }

  find(selector) {
    let nodes = [];
    for (let i = 0; i < this.htmlElements.length; i++) {
      let descendants = this.htmlElements[i].querySelectorAll(selector);
      for(let j = 0; j < descendants.length; j++){
        nodes.push(descendants[j]);
      }
    }
    return new DOMNodeCollection(nodes);
  }

  remove() {
    for (let i = 0; i < this.htmlElements.length; i++) {
      this.htmlElements[i].outerHTML = "";
    }
    this.htmlElements = [];
  }

  on(type, callback) {
    for(let i = 0; i < this.htmlElements.length; i++) {
      this.htmlElements[i].addEventListener(type, callback);
      const eventKey = `jQLiteEvents-${type}`;
      if (!this.htmlElements[i][eventKey]) {
        this.htmlElements[i][eventKey] = [];
      }
      this.htmlElements[i][eventKey].push(callback);
    }
  }

  off(type) {
    for(let i = 0; i < this.htmlElements.length; i++) {
      let callbacks = this.htmlElements[i][`jQLiteEvents-${type}`];
      debugger
      if(callbacks) {
        callbacks.forEach(callback => {
          this.htmlElements[i].removeEventListener(type, callback)
        });
      }

      this.htmlElements[i][type] = [];
    }
  }

  
 }

module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

const _docReadyCallbacks = [];
let _docReady = false;

window.$l = function(tagName) {
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
};

$l.extend = (...objects) => {
  const mergedObj = objects[0];
  objects.slice(1).forEach((obj) => {
    Object.keys(obj).forEach((key) => mergedObj[key] = obj[key])
  });
  return mergedObj;
}

$l.ajax = options => {
  let request  = new XMLHttpRequest();
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

  if(options.method === "GET") {
    options.url += "?" + toQueryString(options.data);
  }

  request.open(options.method, options.url, true);

  request.onload = e => {
    if(request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  }

  // let returnPromise = new Promise(
  //   (resolve, reject) => {
  //     if(request.status === 200) {
  //       resolve(request.response);
  //     } else {
  //       reject(request.response);
  //     }
  //   }
  // );
  //
  // returnPromise.then((fromResolve) => {
  //   console.log(fromResolve);
  // }).catch((fromReject) => {
  //   console.log(fromReject);
  // });
  //
  // return returnPromise;
  request.send(options.data);
}

const toQueryString = obj => {
  let result = "";
  Object.keys(obj).forEach(key => result += key + "=" + obj[key] + "&");
  return result.substring(0, result.length - 1);
}

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach(callback => callback());
})


/***/ })
/******/ ]);