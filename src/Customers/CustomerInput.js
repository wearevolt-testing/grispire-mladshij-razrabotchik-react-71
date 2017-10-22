import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const CustomerInput = ({
  id, header, name, value, placeholder, getValidationState, onChange,
}) => (
  <FormGroup controlId={id} validationState={getValidationState(name)}>
    <ControlLabel>{header}</ControlLabel>
    <FormControl
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e)}
    />
  </FormGroup>
);

CustomerInput.propTypes = {
  id: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  getValidationState: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomerInput;
