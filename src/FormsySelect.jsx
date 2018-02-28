import React from 'react'
import PropTypes from 'prop-types'
import { withFormsy } from 'formsy-react'
import SelectField from 'material-ui/SelectField'
import { setMuiComponentAndMaybeFocus } from './utils'

class FormsySelect extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.setMuiComponentAndMaybeFocus = setMuiComponentAndMaybeFocus.bind(this)
    this.state = {
      hasChanged: false,
    }
  }

  handleChange(event, index, value) {
    this.props.setValue(value);

    this.setState({
      hasChanged: value !== '',
    });

    if (this.props.onChange) this.props.onChange(event, value, index);
  }

  render() {
    const {
      isFormSubmitted,
      isPristine,
      isRequired,
      isValid,
      requiredError,
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      value: valueProp,
      onChange,
      ...rest
    } = this.props;

    const isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
    const errorText = this.props.getErrorMessage() || isRequiredError;
    const value = this.state.hasChanged ? this.props.getValue() : valueProp;

    return (
      <SelectField
        disabled={this.props.isFormDisabled()}
        errorText={errorText}
        onChange={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        value={value}
        {...rest}
      >
        {this.props.children}
      </SelectField>
    );
  }
}

FormsySelect.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  requiredError: PropTypes.string,
  validationError: PropTypes.string,
  validationErrors: PropTypes.object,
  validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.any,
}

export default withFormsy(FormsySelect)
