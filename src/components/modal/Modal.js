import React, { Component } from 'react';

class Modal extends Component {

  close = (e) => {
    e.preventDefault()

    if (this.props.onClose) {
    this.props.onClose()
    }
  }

  render() {
    if (this.props.isOpen === false)
      return null

      let modalStyle = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999',
        background: '#fff'
      }

      let backdropStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px',
        zIndex: '9998',
        background: 'rgba(0, 0, 0, 0.3)'
      }
  
      return (
        <div className={this.props.containerClassName}>
            <div className={this.props.className} style={modalStyle}>
                {this.props.children}
            </div>
            {!this.props.noBackdrop &&
                <div className={this.props.backdropClassName} style={backdropStyle}
                    onClick={this.close}/>}
        </div>
      )
  }
  
}

export default Modal;
