import textMask from '../modules/textMask';

let cnpjMask = textMask({
    pattern: '99.999.999/9999-99',
    patternChar: '_',
});

'74152024000100'.split('').forEach(function x(i) {
    cnpjMask.put(i);
});

console.log(cnpjMask.getDisplayText());

cnpjMask = textMask({
    pattern: '99.999.999/9999-99',
});

'7415202'.split('').forEach(function x(i) {
    cnpjMask.put(i);
});

console.log(cnpjMask.getInputText());
console.log(cnpjMask.getDisplayText());
