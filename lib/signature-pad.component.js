"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _signaturePad = require('./signature-pad.controller');

var _signaturePad2 = _interopRequireDefault(_signaturePad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SignaturePadComponent = {
    bindings: {
        model: '=',
        dataUrl: '=',
        height: '@',
        width: '@',
        notifyDrawing: '&onDrawing'
    },
    controller: _signaturePad2.default,
    template: function template($element, $attrs) {

        return '\n<div class="signature" ng-style="{ height: $ctrl.height + \'px\', width: $ctrl.width + \'px\'}" style="border: 1px solid black;">\n    <canvas ng-mouseup="$ctrl.onMouseUp()" ng-mousedown="$ctrl.notifyDrawing({ drawing: true})"></canvas>\n    <button class="btn btn-warning" ng-click="$ctrl.clear()">Reset</button>\n</div>\n';
    }

};

exports.default = SignaturePadComponent;