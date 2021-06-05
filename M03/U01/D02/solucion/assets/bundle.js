(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cliente = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _nombre = /*#__PURE__*/new WeakMap();

var _impuesto = /*#__PURE__*/new WeakMap();

var Cliente = /*#__PURE__*/function () {
  function Cliente(nombre, impuesto) {
    _classCallCheck(this, Cliente);

    _nombre.set(this, {
      writable: true,
      value: ''
    });

    _impuesto.set(this, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _nombre, nombre);

    _classPrivateFieldSet(this, _impuesto, impuesto);
  }

  _createClass(Cliente, [{
    key: "nombre",
    get: function get() {
      return _classPrivateFieldGet(this, _nombre);
    },
    set: function set(nombre) {
      _classPrivateFieldSet(this, _nombre, nombre);
    }
  }, {
    key: "calcularImpuesto",
    value: function calcularImpuesto() {
      return (_classPrivateFieldGet(this, _impuesto).monto - _classPrivateFieldGet(this, _impuesto).deducciones) * 0.21;
    }
  }]);

  return Cliente;
}();

exports.Cliente = Cliente;
},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Impuesto = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _monto = /*#__PURE__*/new WeakMap();

var _deducciones = /*#__PURE__*/new WeakMap();

var Impuesto = /*#__PURE__*/function () {
  function Impuesto(monto, deducciones) {
    _classCallCheck(this, Impuesto);

    _monto.set(this, {
      writable: true,
      value: 0
    });

    _deducciones.set(this, {
      writable: true,
      value: 0
    });

    _classPrivateFieldSet(this, _monto, monto);

    _classPrivateFieldSet(this, _deducciones, deducciones);
  }

  _createClass(Impuesto, [{
    key: "monto",
    get: function get() {
      return _classPrivateFieldGet(this, _monto);
    },
    set: function set(monto) {
      _classPrivateFieldSet(this, _monto, monto);
    }
  }, {
    key: "deducciones",
    get: function get() {
      return _classPrivateFieldGet(this, _deducciones);
    },
    set: function set(deducciones) {
      _classPrivateFieldSet(this, _deducciones, deducciones);
    }
  }]);

  return Impuesto;
}();

exports.Impuesto = Impuesto;
},{}],3:[function(require,module,exports){
"use strict";

var _cliente = require("./cliente.js");

var _impuesto = require("./impuesto.js");

var impuesto = new _impuesto.Impuesto(1100000, 100000);
var cliente = new _cliente.Cliente('Ariel', impuesto);
console.log(cliente.calcularImpuesto());
document.getElementById('nombre').innerText = cliente.nombre;
document.getElementById('impuesto').innerText = cliente.calcularImpuesto();
},{"./cliente.js":1,"./impuesto.js":2}]},{},[3]);
