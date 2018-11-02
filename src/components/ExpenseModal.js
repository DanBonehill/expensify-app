import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const ExpenseModal = (props) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            closeTimeoutMS={150}
            ariaHideApp={ !process.env.NODE_ENV === 'test' }
            className="modal"
        >
            <h3 className="modal__title">Are you sure?</h3>
            <div>
                <button onClick={props.onDeleteClick} className="button button--delete">Remove</button>
                <button onClick={props.closeModal} className="button button--link">Cancel</button>
            </div>
        </Modal>
    )
};

export default ExpenseModal