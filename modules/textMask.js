String.prototype.replaceAt = function replaceAt(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

export default function mask(options = { pattern: '', placeholder: '', patternChar: '_' }) {

    const { pattern, placeholder = '', patternChar = '_' } = options;

    // using 9 for number
    const NUMERIC_REGEX = /^\d$/;
    // using a for alphabet
    const ALPHA_REGEX = /^[a-zA-Z]$/;
    // using * for alphabet
    const ALPHANNUMERIC_REGEX = /^[a-zA-Z\d]$/;

    const patternSelected = pattern;

    const patternCharSelected = patternChar;

    // pattern and placeholder should have the same length
    const placeholderSelected = generatePlaceholderText(placeholder, patternSelected, patternCharSelected);

    let inputText = generatePlaceholderText(placeholder, patternSelected, patternCharSelected);

    let start = 0;
    let end = 1;

    // pending a full check for pattern vs placeholder
    function generatePlaceholderText(_placeholder, _pattern, _patternChar) {
        let newPlaceholder = _placeholder;

        if (_pattern.length !== _placeholder.length) {
            newPlaceholder = String(_pattern)
                .replace(/[9|a|\*]/g, _patternChar);
        }

        return newPlaceholder;
    }

    function put(inputChar) {

        if (start >= patternSelected.length) return false;

        const curPatternChar = patternSelected[start];
        const curPlaceholderChar = placeholderSelected[start];

        if (curPatternChar === curPlaceholderChar) {
            inputText = inputText.replaceAt(start, curPatternChar);

            start += 1;
            end = start + 1;

            return put(inputChar);
        } else {
            switch (curPatternChar) {
                case '9':
                    if (!inputChar.match(NUMERIC_REGEX)) return false;
                    break;
                case 'a':
                    if (!inputChar.match(ALPHA_REGEX)) return false;
                    break;
                case '*':
                    if (!inputChar.match(ALPHANNUMERIC_REGEX)) return false;
                    break;
                default:
                    return false;
            }
            inputText = inputText.replaceAt(start, inputChar);

            start += 1;
            end = start + 1;
        }

        return this;
    }

    function empty() {
        return placeholderSelected === inputText;
    }

    function back() {

        if (start <= 0) return false;

        start -= 1;
        end = start + 1;

        const curPatternChar = patternSelected[start];
        const curPlaceholderChar = placeholderSelected[start];

        if (curPatternChar === curPlaceholderChar) {
            inputText = inputText.replaceAt(start, curPatternChar);

            return back();

        } else {

            inputText = inputText.replaceAt(start, curPlaceholderChar);
        }

        return this;
    }

    function getRawText() {
        let rawText = '';
        patternSelected.split('').forEach( (c, index) => {
            if (c !== placeholderSelected[index]) {
                if (inputText[index] !== patternCharSelected) {
                    rawText += inputText[index];
                }
            }
        });
        return rawText;
    }

    function getInputText() {

        return inputText;
    }

    function getSelection() {
        return { start, end };
    }

    function setSelection(startInput, endInput) {
        start = startInput;
        end = endInput;
    }

    return {
        placeholder: placeholderSelected,
        pattern: patternSelected,
        put: put,
        getInputText: getInputText,
        getRawText: getRawText,
        getSelection: getSelection,
        setSelection: setSelection,
        back: back,
        empty: empty,
    };
}
