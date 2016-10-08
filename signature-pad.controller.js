import angular from 'angular';

const EMPTY_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

class SignaturePadController{
    constructor($window, $timeout, $scope, $element, SignaturePad){
        this.$window = $window;
        this.$timeout = $timeout;
        this.SignaturePad = SignaturePad;
        this.$scope = $scope;
        this.signaturePadCanvas;
        this.$element = $element;
        this.dataUrl = undefined;
    }
    $onInit(){
        this.canvas = this.$element.find('canvas')[0];
        this.signaturePadCanvas = new this.SignaturePad(this.canvas);


        this.$timeout(() => {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }, 500);

        this.$scope.$watch("dataUrl", (dataUrl) => {
            if(dataUrl){
                this.signaturePadCanvas.fromDataURL(dataUrl);
            }
        });
    }

    onTouchStart(){
        this.$scope.$apply( ()=> this.$scope.notifyDrawing({drawing: true}));
        return this;
    }

    onTouchEnd(){
        this.$scope.$apply( () => {
            this.updateModel();
            this.notifyDrawing({drawing: false});
        });
        return this;
    }

    onResize(){
        let canvar, ratio;

        canvas = this.$element.find('canvas')[0];
        ratio = Math.max(this.$window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);

        this.dataUrl = null;
    }

    accept() {
        let signature = {};
        if(false === this.signaturePadCanvas.isEmpty()){
            signature.dataUrl = this.signaturePadCanvas.toDataURL();
            signature.isEmpty = false;
        }else{
            signature.dataUrl = EMPTY_IMAGE;
            signature.isEmpty = true;
        }
        return signature;
    }
    onMouseUp(){
        this.updateModel();
        this.notifyDrawing({drawing: false});
    }


    updateModel(){
        let ctrl = this;
        this.$timeout().then(() => {
           let result = this.accept();
            this.$scope.dataUrl = result.isEmpty ? undefined : result.dataUrl;
            this.model = result;
        });
    }

    clear(){
        this.signaturePadCanvas.clear();
        this.dataUrl = undefined;
    }


    bindEventListeners(){
            this.$element('touchstart', this.onTouchStart);
            this.$element('touchend', this.onTouchEnd);

            angular.element(this.$window).bind('resize', () => {
               this.onResize();
            });
    }




}

SignaturePadController.$inject = ['$window', '$timeout', '$scope', '$element', 'SignaturePad'];

export default SignaturePadController;
