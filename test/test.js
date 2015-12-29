import textMask from '../modules/textMask';
import assert from 'assert';

describe('Numberic Inputs', function() {
    describe('#input numeric numbers', function() {
        it('should return 74.152.024/0001-00', function() {
            const maskedText = textMask({
                pattern: '99.999.999/9999-99',
            });
            '74152024000100'.split('').forEach(function(i) {
                maskedText.put(i);
            });
            assert.equal('74.152.024/0001-00', maskedText.getInputText());
            // assert.equal('74152024000100', maskedText.getRawText());
        });
    });
    describe('#input numeric numbers', function() {
        it('should return 74.152.02_/____-__', function() {
            const maskedText = textMask({
                pattern: '99.999.999/9999-99',
            });
            '7415202'.split('').forEach(function(i) {
                maskedText.put(i);
            });
            assert.equal('74.152.02_/____-__', maskedText.getInputText());
            console.log(maskedText.getRawText());
            // assert.equal('7415202_______', maskedText.getRawText());
        });
    });
    describe('#input date of birth', function() {
        it('should return 11/03/1982 && 11/0M/YYYY', function() {
            const maskedText = textMask({
                pattern: '99/99/9999',
                placeholder: 'DD/MM/YYYY',
            });
            '11031982'.split('').forEach(function(i) {
                maskedText.put(i);
            });
            assert.equal('11/03/1982', maskedText.getInputText());
            // assert.equal('11031982', maskedText.getRawText());
            // delete 5 times
            maskedText.back().back().back().back().back();

            assert.equal('11/0M/YYYY', maskedText.getInputText());
            // assert.equal('110', maskedText.getInputText());
        });
    });
});
