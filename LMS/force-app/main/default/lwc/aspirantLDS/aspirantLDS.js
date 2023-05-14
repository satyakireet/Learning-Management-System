import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AspirantLDS extends LightningElement {
    @api obj;
    @track recordId;
    handleEvent(event) {
        this.recordId = event.detail.Id;
        const evt = new ShowToastEvent({
            title: 'Success',
            message: 'Succesfully submitted the record',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
}