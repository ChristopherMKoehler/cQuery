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
      const eventKey = `cQEvents-${type}`;
      if (!this.htmlElements[i][eventKey]) {
        this.htmlElements[i][eventKey] = [];
      }
      this.htmlElements[i][eventKey].push(callback);
    }
  }

  off(type) {
    for(let i = 0; i < this.htmlElements.length; i++) {
      let callbacks = this.htmlElements[i][`cQEvents-${type}`];

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
