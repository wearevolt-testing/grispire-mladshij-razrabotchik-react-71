import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const style = {
  marginBottom: 0,
};

export const ModalConfirm = ({
  show, header, text, onHide, onConfirm,
}) => (
  <Modal show={show} onHide={onHide}>
    <Alert bsStyle="danger" style={style} onDismiss={onHide}>
      <h4>{header}</h4>
      <p>{text}</p>
      <br />
      <p>
        <Button bsSize="small" bsStyle="danger" onClick={onConfirm}>
          Confirm
        </Button>
        <span> or </span>
        <Button bsSize="small" onClick={onHide}>
          Reject
        </Button>
      </p>
    </Alert>
  </Modal>
);

ModalConfirm.propTypes = {
  show: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ModalConfirm;
