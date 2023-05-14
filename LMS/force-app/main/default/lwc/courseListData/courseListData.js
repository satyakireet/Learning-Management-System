import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getcourseList from '@salesforce/apex/getCourseList.getcourseList';
import { getRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

const actions = [
    { label: 'View', name: 'view' },
    { label: 'Details', name: 'details' },
];
const columns = [{ label: 'Course Name', fieldName: 'Name' },
    { label: 'Level', fieldName: 'Level_of_Course__c' },
    { label: 'Course Duration', fieldName: 'Course_Duration__c' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions }
    },
];

export default class CourseListData extends NavigationMixin(LightningElement) {
    @api recordId;
    record = {};
    @track courseList;
    @track error;
    @track columns = columns;
    @wire(CurrentPageReference) pageRef;
    /*handleKeyChange(event) {

            const searchKey = event.target.value;

            if (searchKey) {

                getcourseList({ searchKey })
                    .then(result => {

                        this.courseList = result;

                    })
                    .catch(error => {

                        this.error = error;

                    });

            } else
                this.courseList = undefined;

        }*/
    @wire(getcourseList)
    wiredCourses({
        error,
        data
    }) {
        if (data) {
            this.courseList = data;
        } else if (error) {
            this.error = error;
        }
    }
    handleRowAction(event) {

        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.recordId = row.Id;
        console.log('rowId ' + this.recordId);
        switch (actionName) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        actionName: 'view'
                    }
                });
                break;
            case 'details':
                this.aevent(row);
                break;
            default:
        }



    }
    aevent(row) {
        this.record = row;
        fireEvent(this.pageRef, 'passEvent', this.record.Id);
    }

}