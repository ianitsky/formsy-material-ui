import React from 'react'
import PropTypes from 'prop-types'
import { withFormsy } from 'formsy-react'
import TimePicker from 'material-ui/TimePicker'
import { setMuiComponentAndMaybeFocus } from './utils'

class FormsyTime extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.setMuiComponentAndMaybeFocus = setMuiComponentAndMaybeFocus.bind(this)
  }

  componentDidMount() {
    const { defaultTime } = this.props;
    const value = this.props.getValue();

    if (typeof value === 'undefined' && typeof defaultTime !== 'undefined') {
      this.props.setValue(defaultTime);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value) {
      if (!this.props.value || !timesEq(this.props.value, newProps.value)) {
        this.props.setValue(newProps.value);
      }
    } else if (!this.props.value && newProps.defaultTime) {
      if (!timesEq(this.props.defaultTime, newProps.defaultTime)) {
        this.props.setValue(newProps.defaultTime);
      }
    }

    /**
     * Check time equality by hours and minutes
     * @param {Date} date1
     * @param {Date} date2
     */
    function timesEq(date1, date2) {
      return date1.getHours() === date2.getHours() &&
        date1.getMinutes() === date2.getMinutes();
    }
  }

  handleChange(event, value) {
    this.props.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render() {
    const {
      defaultTime, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    return (
      <TimePicker
        disabled={this.props.isFormDisabled()}
        {...rest}
        errorText={this.props.getErrorMessage()}
        onChange={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.props.getValue()}
      />
    );
  }
}

FormsyTime.propTypes = {
  defaultTime: PropTypes.object,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  validationError: PropTypes.string,
  validationErrors: PropTypes.object,
  validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.object,
}

export default withFormsy(FormsyTime)
