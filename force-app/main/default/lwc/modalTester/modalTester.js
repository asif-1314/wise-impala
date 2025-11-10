import { LightningElement } from 'lwc';
import ModalTutorial from 'c/modalTutorial';

export default class ModalTester extends LightningElement {

    async openModal(event){

        try{
            const result = await ModalTutorial.open({
                label:'Modal Tutorial',
                size:'medium',
                description:'This Modal is just for the testing purpose.',
                context:'This is the context of the modal',
                onmodalresponse: (e)=>{
                    console.log(e.detail.message);
                }
            });
            console.log(result);
        }catch(error){
            console.error(error);
        }
    }
}