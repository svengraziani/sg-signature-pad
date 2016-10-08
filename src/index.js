import angular from 'angular';
import SignaturePad from './signature_pad';
import SignaturePadComponent from './signature-pad.component';

const sgSignaturePad = angular.module('sg.signature-pad',[])
    .constant('SignaturePad', SignaturePad)
    .component('sgSignaturePad', SignaturePadComponent).name;


export default  sgSignaturePad;