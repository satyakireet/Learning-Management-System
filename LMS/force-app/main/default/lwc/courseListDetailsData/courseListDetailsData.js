import { LightningElement, api, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';


const columns = [{ label: 'Prerequisite', fieldName: 'Prerequisites__c' },
    { label: 'Course Description', fieldName: 'Course_Description__c' },
    { label: 'Skills Covered', fieldName: 'Skills_Covered__c' },
];


export default class CourseListDetailsData extends LightningElement {
    @track recordId;
    @wire(CurrentPageReference) pageRef;
    connectedCallback() {
        registerListener('passEvent', this.showHandler, this);
    }
    showHandler(payload) {
        this.recordId = payload;
    }
    disconnectedCallback() {
        unregisterAllListeners(this);
    }
}