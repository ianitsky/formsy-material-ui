import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import { withFormsy } from 'formsy-react';
import AutoComplete from 'material-ui/AutoComplete';
import { setMuiComponentAndMaybeFocus } from './utils';

class FormsyAutoComplete extends React.Component {
  constructor(props) {
    super(props)

    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdateInput = this.handleUpdateInput.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)

    this.setMuiComponentAndMaybeFocus = setMuiComponentAndMaybeFocus.bind(this)

    this.state = {
      value: this.props.defaultValue || this.props.value || '',
    }
  }

  componentWillMount() {
    this.props.setValue(this.props.defaultValue || this.props.value || '');
  }

  handleBlur(event) {
    this.props.setValue(event.currentTarget.value);
    if (this.props.onBlur) this.props.onBlur(event);
  }

  handleChange(event) {
    this.setState({ value: event.currentTarget.value }, () => this.props.setValue(event.currentTarget.value));
    if (this.props.onChange) this.props.onChange(event);
  }

  handleUpdateInput(value) {
    this.setState({ value }, () => this.props.setValue(value));
    if (this.props.onChange) this.props.onChange(null, value);
  }

  handleKeyDown(event) {
    if (keycode(event) === 'enter') this.props.setValue(event.currentTarget.value);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  }

  render() {
    const {
      defaultValue, // eslint-disable-line no-unused-vars
      onFocus,
      value, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      ...rest } = this.props;
    return (
      <AutoComplete
        disabled={this.props.isFormDisabled()}
        {...rest}
        errorText={this.props.getErrorMessage()}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onUpdateInput={this.handleUpdateInput}
        onFocus={onFocus}
        onKeyDown={this.handleKeyDown}
        ref={this.setMuiComponentAndMaybeFocus}
        searchText={this.state.value}
      />
    );
  }
}

FormsyAutoComplete.propTypes = {
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  validationError: PropTypes.string,
  validationErrors: PropTypes.object,
  validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.any,
}

export default withFormsy(FormsyAutoComplete);
