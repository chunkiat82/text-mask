import textMask from '../modules/textMask';

let cnpjMask = textMask({
    pattern: '99.999.999/9999-99',
    patternChar: '_',
});


function* cnpjMasker(){
  	const text = '74152024000100'
  	let i = 0;
  	while (i < text.length){
  		yield cnpjMask.put(text[i++]);
	}
}

const cnpjText = cnpjMasker();
let loopValue = cnpjText.next().value;

while (loopValue){
	console.log(loopValue.getDisplayText());
	loopValue = cnpjText.next().value;
}