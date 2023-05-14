import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getcourseList from '@salesforce/apex/getCourseList.getcourseList';
import getaspirants from '@salesforce/apex/courseReview.getaspirants';
import { NavigationMixin } from 'lightning/navigation';

const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
];
const actions1 = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
];
const columns = [{ label: 'Course Name', fieldName: 'Name' },
    { label: 'Level', fieldName: 'Level_of_Course__c' },
    { label: 'Course Duration', fieldName: 'Course_Duration__c' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions }
    },
];
const columns1 = [{ label: 'Aspirant Name', fieldName: 'Name' },
    { label: 'Contact', fieldName: 'Contact__c' },
    { label: 'Email', fieldName: 'Email__c' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions1 }
    },
];
export default class CourseManager extends NavigationMixin(LightningElement) {
    @api recordId;
    @track courseList;
    @track aspirants;
    @track error;
    @track columns = columns;
    @track columns1 = columns1;
    @wire(CurrentPageReference) pageRef;
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
    @wire(getaspirants)
    wiredAspirants({
        error,
        data
    }) {
        if (data) {
            this.aspirants = data;
        } else if (error) {
            this.error = error;
        }
    }
    eventHandle(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Course__c',
                actionName: 'new'
            }
        });
    }
    eventHandle1(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Course_Application__c',
                actionName: 'new'
            }
        });
    }
    eventHandle2(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Aspirant__c',
                actionName: 'new'
            }
        });
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
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Course__c',
                        actionName: 'edit'
                    }
                });
            default:
        }
    }

    handleRowAction1(event) {

        const actionName = event.detail.action.name;
        const row = event.detail.row;
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
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Aspirant__c',
                        actionName: 'edit'
                    }
                });
            default:
        }
    }

}