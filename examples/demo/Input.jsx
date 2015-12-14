import React from 'react';
import classNames from 'classnames';

import { setSelection, getSelection } from 'react/lib/ReactInputSelection';
import textMask from '../../modules';

class TextInput extends React.Component {

    constructor(){
        super();
        this.state = {};
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onKeyonPasteDown = this.onPaste.bind(this);
        this.updateInputSelection = this.updateInputSelection.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.focusTextBox = this.focusTextBox.bind(this);
        this.clearAndFocusInput = this.clearAndFocusInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onPaste = this.onPaste.bind(this);

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
        if (this.mask === undefined) return;

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
        if (this.mask === undefined)return;

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

    handleClick(){
        if (this.mask){
            const startEnd = this.mask.getSelection();
            this.mask.setSelection(getSelection(this._input));
        }
    }

    handleFocus() {

        this.setState({
            focused: true,
            floatLabel: true
        });

        if (this.props.handleFocus) {
            this.props.handleFocus(event);
        }
    }

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

    clearAndFocusInput() {
        this.setState({
            value: ''
        }, () => this._input.focus());
    }

    focusTextBox() {
        this._input.focus();
    }

    render() {
        return (
            <div>
                 <input ref={(c) => this._input = c}
                        name={this.props.name}
                        id={this.props.id}
                        placeholder={this.props.maskPlaceholder}
                        value={this.mask && this.mask.getInputText().length > 0 ? this.mask.getDisplayText() : this.state.value}

                        pattern={this.props.pattern}
                        readOnly={false}

                        onMouseOver={this.handleMouseOver}
                        onMouseOut={this.handleMouseOut}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        onClick={this.handleClick}
                        onKeyDown={this.onKeyDown}
                        onKeyPress={this.onKeyPress}
                        onPaste={this.onPaste}
                />
            </div>
        );
    }
};

export default TextInput;