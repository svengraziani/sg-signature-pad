"use strict";
import controller from './signature-pad.controller';

const SignaturePadComponent = {
    bindings: {
        model: '=',
        clear: '=',
        dataUrl: '=',
        height: '@',
        width: '@',
        notifyDrawing: '&onDrawing'
    },
    controller,
    template: ($element, $attrs) => {

        return `
<div class="signature" ng-style="{ height: $ctrl.height + \'px\', width: $ctrl.width + \'px\'}" style="border: 1px solid black;">
    <canvas ng-mouseup="$ctrl.onMouseUp()" ng-mousedown="$ctrl.notifyDrawing({ drawing: true})"></canvas>
</div>
`
    }

};


export default SignaturePadComponent;