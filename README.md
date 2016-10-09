# Angular 1.5/ES6 Signature Pad Component

SignaturePad.js portation to Angular 1.5 Component

Based on: 
  *   [szimek signature pad](https://github.com/szimek/signature_pad/) 
  *   [legalthings Angular signature](https://github.com/legalthings/angular-signature/blob/master/README.md)
  *   [angular-web-pack-workflow] (https://github.com/preboot/angular-webpack/)


##Installation

Install this module using npm

    npm install sg-signature-pad --save
  
Add the module to your app

    import angular from 'angular';
    import sgSignaturePad from 'sg-signature-pad/lib/index';
    
    const yourApp = angular.module('yourApp', [sgSignaturePad]).name;
  
    export default yourApp;
  
## Usage

### Component markup
 The component stores the signature as base64 encoded image string into the variable passed as "model" param.
 The signature pad dimensions get defined by the "height" and "width" param.
```html
  <sg-signature-pad model="$ctrl.signatureModel" height="(int)" width="(int)"></sg-signature-pad>
```

## Todo
* test on touch devices

