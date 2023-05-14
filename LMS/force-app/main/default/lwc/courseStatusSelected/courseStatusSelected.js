import { LightningElement, track, api, wire } from 'lwc';
import getSelectedStatusList from '@salesforce/apex/courseStatus.getSelectedStatusList';
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
export default class CourseStatusSelected extends LightningElement {


    @track selectedStatus;
    @track error;
    @track columns = columns;
    @wire(CurrentPageReference) pageRef;
    @wire(getSelectedStatusList)
    wiredCourses({
        error,
        data
    }) {
        if (data) {
            this.selectedStatus = data;
        } else if (error) {
            this.error = error;
        }
    }
}