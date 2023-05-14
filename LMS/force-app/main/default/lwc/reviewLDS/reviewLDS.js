import { LightningElement, track, api } from 'lwc';

export default class ReviewLDS extends LightningElement {

    @api obj;
    @track recordId;
    handleEvent(event) {
        this.recordId = event.detail.Id;
    }
}