"use strict";

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)

  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/

function BinarySearchTree(value) {
  this.value = value
  this.rigth = null
  this.left = null
}
BinarySearchTree.prototype.size = function () {
  if (!this.left && !this.rigth) return 1
  if (this.left && !this.rigth) return 1 + this.left.size()
  if (!this.left && this.rigth) return 1 + this.rigth.size()
  if (this.left && this.rigth) return 1 + this.left.size() + this.rigth.size()
}
BinarySearchTree.prototype.insert = function (value) {
  if (this.value > value) {
    if (this.left) {
      this.left.insert(value)
    } else {
      this.left = new BinarySearchTree(value)
    }
  } else {
    if (this.rigth) {
      this.rigth.insert(value)
    } else {
      this.rigth = new BinarySearchTree(value)
    }
  }
}
BinarySearchTree.prototype.contains = function (value) {
  if (this.value === value) return true
  if (value < this.value) {
    if (this.left) {
      return this.left.contains(value)
    }
    return false
  } else {
    if (this.rigth) {
      return this.rigth.contains(value)
    } else {
      return false
    }
  }
}
BinarySearchTree.prototype.depthFirstForEach = function (cb, order) {
  switch (order) {
    case "post-order":
      //post-order --> left - rigth - root
      if (this.left) this.left.depthFirstForEach(cb, order)
      if (this.rigth) this.rigth.depthFirstForEach(cb, order)
      cb(this.value)
      break;
    case "pre-order":
      // pre-order --> root - left - rigth
      cb(this.value)
      if (this.left) this.left.depthFirstForEach(cb, order)
      if (this.rigth) this.rigth.depthFirstForEach(cb, order)
      break;
    default:
      // in-order --> left - root - rigth
      if (this.left) this.left.depthFirstForEach(cb, order)
      cb(this.value)
      if (this.rigth) this.rigth.depthFirstForEach(cb, order)
      break;
  }
}
BinarySearchTree.prototype.breadthFirstForEach = function (cb, arr = []) {
  cb(this.value)
  if (this.left) {
    arr.push(this.left)
  }
  if (this.rigth) {
    arr.push(this.rigth)
  }
  if (arr.length) {
    arr.shift().breadthFirstForEach(cb, arr)
  }
}

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  BinarySearchTree,
};
