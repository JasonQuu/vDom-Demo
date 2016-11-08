var vDom = function(){
  function vElement(tag, prop, children, option){
    this.tagname = tagname;
    this.porp = porp;
    this.children = children;
    this.key = option && option.key;
  }
  function el(tagname, porp, children, option){
    return new vElement(tagname, prop, children, option);
  }

  return {
    vElement : vElement,
    el : el
  }
}

vElement.prototype.render = function(){
  var el = document.createElement(this.tagName),
      children = this.children || [];
  for (var propKey in this.prop){
    el.setAttribute(propKey, this.prop[propKey]);
  }

  children.forEach(function(child){
    if(child instanceOf vElement){
      el.appendChild(child.render());
    }else if(typeOf child === 'string'){
      el.appendChild.(document.createTextNode(child));
    }
  })
  return el;
}

vElement.prototype.diff = function (oldTree, newTree) {
  var index = 0 // 当前节点的标志
  var patches = {} // 用来记录每个节点差异的对象
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

// 对两棵树进行深度优先遍历
function dfsWalk (oldNode, newNode, index, patches) {
  // 对比oldNode和newNode的不同，记录下来
  patches[index] = [...]

  diffChildren(oldNode.children, newNode.children, index, patches)
}

// 遍历子节点
function diffChildren (oldChildren, newChildren, index, patches) {
  var leftNode = null
  var currentNodeIndex = index
  oldChildren.forEach(function (child, i) {
    var newChild = newChildren[i]
    currentNodeIndex = (leftNode && leftNode.count) // 计算节点的标识
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1
    dfsWalk(child, newChild, currentNodeIndex, patches) // 深度遍历子节点
    leftNode = child
  })
}

var ul = vDom.el('ul', {id: 'list'},[
  vDom.el('h1', {style: 'color:red'}, ['Title']),
  vDom.el('li', {class: 'item'}, ['Item 1'], {key: 1}),
  vDom.el('li', {class: 'item'}, ['Item 2'], {key: 2}),
  vDom.el('li', {class: 'item'}, ['Item 3'], {key: 3})
])
