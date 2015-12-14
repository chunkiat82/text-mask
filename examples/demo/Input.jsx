import React from 'react';
import classNames from 'classnames';

import { setSelection } from 'react/lib/ReactInputSelection';
import textMask from '../../modules';

class TextInput extends React.Component {

    constructor(){
        super();
        this.state = {          
            placeholder: 'MM/DD/YYYY'
        };
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onKeyonPasteDown = this.onPaste.bind(this);
        this.updateInputSelection = this.updateInputSelection.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.focusTextBox = this.focusTextBox.bind(this);
        this.clearAndFocusInput = this.clearAndFocusInput.bind(this);

    }

    componentWillMount() {
        if (this.props.maskPattern) {        
            this.mask = textMask({ pattern: this.props.maskPattern, placeholder: this.props.maskPlaceholder });
        }
    }

    onKeyDown(e) {
        if (!this.mask) return;

        if (e.key === 'Backspace') {
            e.preventDefault();
            if (this.mask.back()) {
                const value = this.mask.getDisplayText();
                e.target.value = value;
                this.updateInputSelection();
                this.handleChange(e);
            }
        }
    }

    onKeyPress(e) {
        if (!this.mask) return;

        if (e.metaKey || e.altKey || e.ctrlKey) return;

        e.preventDefault();
        if (this.mask.put(e.key)) {
            console.log('here');
            e.target.value = this.mask.getDisplayText();
            this.updateInputSelection();
            this.handleChange(e);
        }
    }

    onPaste(e) {
        if (!this.mask) return;

        e.preventDefault();

        const clipboardData = e.clipboardData.getData('Text');

        clipboardData.split('').forEach(char => {
            this.mask.put(char);
        });

        e.target.value = this.mask.getDisplayText();
        setTimeout(this.updateInputSelection, 0);
        this.handleChange(e);
    }

    updateInputSelection() {
        setSelection(this._input, this.mask.getSelection());
    }


    handleFocus() {
        this.setState({
            focused: true,
            floatLabel: true
        });

        // wait until the label floating up animation is done before we show the placeholder
        setTimeout(() => {
            if (this.state.floatLabel && !!this.props.label) {
                this.setState({
                    placeholder: this.props.helpText
                });
            }
        }, 375);

        if (this.props.handleFocus) {
            this.props.handleFocus(event);
        }
    }

    /**
     * Don't float the label on blur, but keep it floated if there's an input value
     */
    handleBlur(event) {
        const value = this.mask ? this.mask.getInputText() : event.target.value;

        this.setState({
            focused: false,
            floatLabel: !!value,
            placeholder: '',
            value: value
        });

        if (this.props.handleBlur) {
            this.props.handleBlur(event);
        }
    }

    handleChange(event) {        
        if (this.mask) {            
            let returnValue = this.mask.getInputText();
            this.setState({
                value: returnValue
            });
        } else {
            this.setState({
                value: event.target.value
            });
        }
    }

    /**
     * Clear the input and focus after clearing the value in the state
     */
    clearAndFocusInput() {
        this.setState({
            value: ''
        }, () => this._input.focus());
    }

    focusTextBox() {
        this._input.focus();
    }

    render() {

        const shouldHandle = (handler) => {
            return handler;            
        };

        return (
            <div>
                 <input ref={(c) => this._input = c}
                        type={this.props.type}
                        name={this.props.name}
                        id={this.props.id}
                        placeholder={this.state.placeholder}
                        value={this.mask && this.mask.getInputText().length > 0 ? this.mask.getDisplayText() : this.state.value}

                        autoComplete={this.props.autocomplete}
                        dir={this.props.dir}

                        pattern={this.props.pattern}
                        readOnly={false}


                        onMouseOver={shouldHandle(this.handleMouseOver)}
                        onMouseOut={shouldHandle(this.handleMouseOut)}
                        onFocus={shouldHandle(this.handleFocus)}
                        onBlur={shouldHandle(this.handleBlur)}
                        onChange={shouldHandle(this.handleChange)}

                        onKeyDown={shouldHandle(this.onKeyDown)}
                        onKeyPress={shouldHandle(this.onKeyPress)}
                        onPaste={shouldHandle(this.onPaste)}
                />
            </div>
        );
    }
};

export default TextInput;