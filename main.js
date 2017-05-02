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
