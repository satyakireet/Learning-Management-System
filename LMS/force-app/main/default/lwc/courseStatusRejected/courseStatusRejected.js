import { LightningElement, track, api, wire } from 'lwc';
import getRejectedStatusList from '@salesforce/apex/courseStatus.getRejectedStatusList';
import { CurrentPageReference } from 'lightning/navigation';
const columns = [{
        label: 'Course Application Number',
        fieldName: 'Name'
    },
    {
        label: 'Status',
        fieldName: 'Status__c'
    },
];
export default class CourseStatusRejected extends LightningElement {


    @track rejectedStatus;
    @track error;
    @track columns = columns;
    @wire(CurrentPageReference) pageRef;
    @wire(getRejectedStatusList)
    wiredCourses({
        error,
        data
    }) {
        if (data) {
            this.rejectedStatus = data;
        } else if (error) {
            this.error = error;
        }
    }
}