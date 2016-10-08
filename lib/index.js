'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _signature_pad = require('./signature_pad');

var _signature_pad2 = _interopRequireDefault(_signature_pad);

var _signaturePad = require('./signature-pad.component');

var _signaturePad2 = _interopRequireDefault(_signaturePad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sgSignaturePad = _angular2.default.module('sg.signature-pad', []).constant('SignaturePad', _signature_pad2.default).component('sgSignaturePad', _signaturePad2.default).name;

exports.default = sgSignaturePad;