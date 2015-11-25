import textMask from '../modules/textMask';
import assert from 'assert';

describe('Numberic Inputs', function() {
  describe('#input numeric numbers', function () {
    it('should return 123-123-123', function () {    	
     	const maskedText = textMask({ pattern: '99.999.999/9999-99' });
      	'74152024000100'.split('').forEach(function(i){
			maskedText.put(i);
		});;
		assert.equal('74.152.024/0001-00',maskedText.getDisplayText());
    });
  });
});
