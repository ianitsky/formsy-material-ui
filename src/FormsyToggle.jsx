import React from 'react'
import PropTypes from 'prop-types'
import { withFormsy } from 'formsy-react'
import Toggle from 'material-ui/Toggle'
import { setMuiComponentAndMaybeFocus } from './utils'

class FormsyToggle extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.setMuiComponentAndMaybeFocus = setMuiComponentAndMaybeFocus.bind(this)
  }

  componentDidMount() {
    this.props.setValue(this.muiComponent.isToggled());
  }

  handleChange(event, value) {
    this.props.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render() {
    const {
      defaultToggled,
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      ...rest } = this.props;

    let value = this.props.getValue();

    if (typeof value === 'undefined') {
      value = (typeof defaultToggled !== 'undefined') ? defaultToggled : false;
    }

    return (
      <Toggle
        disabled={this.props.isFormDisabled()}
        {...rest}
        onToggle={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        toggled={value}
      />
    );
  }
}

FormsyToggle.propTypes = {
  defaultToggled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  validationError: PropTypes.string,
  validationErrors: PropTypes.object,
  validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default withFormsy(FormsyToggle)
