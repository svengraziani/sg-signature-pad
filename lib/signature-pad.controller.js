'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EMPTY_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

var SignaturePadController = function () {
    function SignaturePadController($window, $timeout, $scope, $element, SignaturePad) {
        _classCallCheck(this, SignaturePadController);

        this.$window = $window;
        this.$timeout = $timeout;
        this.SignaturePad = SignaturePad;
        this.$scope = $scope;
        this.signaturePadCanvas;
        this.$element = $element;
        this.dataUrl = undefined;
    }

    _createClass(SignaturePadController, [{
        key: '$onInit',
        value: function $onInit() {
            var _this = this;

            this.canvas = this.$element.find('canvas')[0];
            this.signaturePadCanvas = new this.SignaturePad(this.canvas);

            this.$timeout(function () {
                _this.canvas.width = _this.width;
                _this.canvas.height = _this.height;
            }, 500);

            this.$scope.$watch("dataUrl", function (dataUrl) {
                if (dataUrl) {
                    _this.signaturePadCanvas.fromDataURL(dataUrl);
                }
            });
        }
    }, {
        key: 'onTouchStart',
        value: function onTouchStart() {
            var _this2 = this;

            this.$scope.$apply(function () {
                return _this2.$scope.notifyDrawing({ drawing: true });
            });
            return this;
        }
    }, {
        key: 'onTouchEnd',
        value: function onTouchEnd() {
            var _this3 = this;

            this.$scope.$apply(function () {
                _this3.updateModel();
                _this3.notifyDrawing({ drawing: false });
            });
            return this;
        }
    }, {
        key: 'onResize',
        value: function onResize() {
            var canvar = void 0,
                ratio = void 0;

            canvas = this.$element.find('canvas')[0];
            ratio = Math.max(this.$window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);

            this.dataUrl = null;
        }
    }, {
        key: 'accept',
        value: function accept() {
            var signature = {};
            if (false === this.signaturePadCanvas.isEmpty()) {
                signature.dataUrl = this.signaturePadCanvas.toDataURL();
                signature.isEmpty = false;
            } else {
                signature.dataUrl = EMPTY_IMAGE;
                signature.isEmpty = true;
            }
            return signature;
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp() {
            this.updateModel();
            this.notifyDrawing({ drawing: false });
        }
    }, {
        key: 'updateModel',
        value: function updateModel() {
            var _this4 = this;

            var ctrl = this;
            this.$timeout().then(function () {
                var result = _this4.accept();
                _this4.$scope.dataUrl = result.isEmpty ? undefined : result.dataUrl;
                _this4.model = result;
            });
        }
    }, {
        key: 'clear',
        value: function clear() {

            this.signaturePadCanvas.clear();
            this.dataUrl = undefined;
        }
    }, {
        key: 'bindEventListeners',
        value: function bindEventListeners() {
            var _this5 = this;

            this.$element('touchstart', this.onTouchStart);
            this.$element('touchend', this.onTouchEnd);

            _angular2.default.element(this.$window).bind('resize', function () {
                _this5.onResize();
            });
        }
    }]);

    return SignaturePadController;
}();

SignaturePadController.$inject = ['$window', '$timeout', '$scope', '$element', 'SignaturePad'];

exports.default = SignaturePadController;