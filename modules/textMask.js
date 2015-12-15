export default function mask(options = { pattern: '', placeholder: '', patternChar: '_' }) {

    const { pattern, placeholder, patternChar } = options;

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

    let text = '';
    let inputText = '';
    let start = 0;
    let end = 0;

    // pending a full check for pattern vs placeholder
    function generatePlaceholderText(_placeholder = '', _pattern, _patternChar = '_') {
        let newPlaceholder = _placeholder;

        if (_pattern.length !== _placeholder.length) {
            newPlaceholder = String(_pattern)
                .replace(/[9|a|\*]/g, _patternChar);
        }
        return newPlaceholder;
    }

    function put(inputChar) {

        if (text.length === patternSelected.length) return false;

        if (end === patternSelected.length) return false;

        // check for pattern character
        const curPatternChar = patternSelected[end];
        const curPaceholderChar = placeholderSelected[end];

        console.log(curPatternChar);
        console.log(curPaceholderChar);

        // need a better check here
        if (curPatternChar === curPaceholderChar) {
            text = text + curPatternChar;
            end = end + 1;
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

            text = text + inputChar;
            inputText = inputText + inputChar;
            end = end + 1;

            return this;
        }
    }

    function back() {

        if (text.length === 0 || end === 0) return false;

        text = text.substring(0, text.length - 1);
        inputText = inputText.substring(0, inputText.length - 1);

        if (text.length > 0) {
            const curPatternChar = patternSelected[text.length - 1];
            const curPaceholderChar = placeholderSelected[text.length - 1];

            if (curPatternChar === curPaceholderChar) {
                text = text.substring(0, text.length - 1);
                end -= 1;
            }
            end -= 1;
        }

        return this;
    }

    function getInputText() {

        return inputText;
    }

    function getText() {

        return text;
    }

    function getDisplayText() {

        return text + placeholderSelected.substring(text.length);
    }

    function getSelection() {
        start = end - 1;

        return { start, end };
    }

    function setSelection(index) {
        const startIndex = index;
        const endIndx = index + 1;
        return { startIndex, endIndx };
    }

    return {
        placeholder: placeholderSelected,
        pattern: patternSelected,
        put: put,
        getText: getText,
        getInputText: getInputText,
        getDisplayText: getDisplayText,
        getSelection: getSelection,
        setSelection: setSelection,
        back: back,
    };
}
