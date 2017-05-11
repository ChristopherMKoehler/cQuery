const DOMNodeCollection = require('./dom_node_collection.js');

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

  if (options.method === "GET" && options.data) {
    options.url += "?" + toQueryString(options.data);
  }

  function makeRequest (opts) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(opts.method, opts.url);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };

      xhr.onerror = function () {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      };
      xhr.send(opts.data);
    });
  }

  makeRequest(options)
  .then(function () {
    return makeRequest(options);
  })
  .catch(function (err) {
    console.error('Error:', err.statusText);
  });

  return makeRequest(options);
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
