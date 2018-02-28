import React from 'react'
import PropTypes from 'prop-types'
import { withFormsy } from 'formsy-react'
import DatePicker from 'material-ui/DatePicker'
import { setMuiComponentAndMaybeFocus } from './utils'

class FormsyDate extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.setMuiComponentAndMaybeFocus = setMuiComponentAndMaybeFocus.bind(this)
  }

  componentDidMount() {
    const { defaultDate } = this.props;
    const value = this.props.getValue();

    if (typeof value === 'undefined' && typeof defaultDate !== 'undefined') {
      this.props.setValue(defaultDate);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value) {
      if (!this.props.value || !datesEq(this.props.value, newProps.value)) {
        this.props.setValue(newProps.value);
      }
    } else if (!this.props.value && newProps.defaultDate) {
      if (!datesEq(this.props.defaultDate, newProps.defaultDate)) {
        this.props.setValue(newProps.defaultDate);
      }
    }

    /**
     * Check date equality by year, month and day
     * @param {Date} date1
     * @param {Date} date2
     */
    function datesEq(date1, date2) {
      return date1.getFullYear() === date2.getFullYear() &&
        date1.getDate() === date2.getDate() &&
        date1.getDay() === date2.getDay();
    }
  }

  handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render() {
    const {
      defaultDate, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      requiredError,
      isFormSubmitted,
      isPristine,
      isRequired,
      isValid,
      ...rest } = this.props;
    const isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
    const errorText = this.props.getErrorMessage() || isRequiredError;
    return (
      <DatePicker
        disabled={this.props.isFormDisabled()}
        {...rest}
        errorText={errorText}
        onChange={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.props.getValue()}
      />
    );
  }
}

FormsyDate.propTypes = {
  defaultDate: PropTypes.object,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  requiredError: PropTypes.string,
  validationError: PropTypes.string,
  validationErrors: PropTypes.object,
  validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.object,
}

export default withFormsy(FormsyDate)
