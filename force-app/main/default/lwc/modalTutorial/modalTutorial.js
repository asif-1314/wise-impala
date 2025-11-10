import LightningModal from 'lightning/modal';

export default class ModalTutorial extends LightningModal {

    handleCancel(event){
        const cusEvent = new CustomEvent('modalresponse', {
            bubble: true,
            composed: true,
            cancelable: false,
            detail:{
                message: 'Message received from modal'
            }
        });
        this.dispatchEvent(cusEvent);
        this.close('Canceled and Closed.')
    }
}