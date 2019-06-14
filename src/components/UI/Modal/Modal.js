import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    // Improvement: The purpose of shouldComponentUpdate is to make sure 
    // that the OrderSummary component only renders when the Modal is shown
    shouldComponentUpdate(nextProps, nextState){
        // Children could be either the OrderSummary or the Spinner component
        // then if a change occurs (Spinner shows or hide) the modal should be updated
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }} >
                    {this.props.children}
                </div>
            </>
        )
    }
}


export default Modal;