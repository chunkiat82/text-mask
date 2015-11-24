import textMask from '../modules/textMask';

const maskObj = textMask({ pattern: '99/99/99', placeholder:'DD/MM/YY', patternChar:'_'});

maskObj.put('A');
maskObj.put('1');
maskObj.put('1');

maskObj.put('0');
maskObj.put('3');

maskObj.put('A');
maskObj.put('A');
maskObj.put('A');
maskObj.put('8');
maskObj.put('2');

maskObj.back();
maskObj.back();
maskObj.back();

console.log(maskObj.getText());
console.log(maskObj.getDisplayText());
