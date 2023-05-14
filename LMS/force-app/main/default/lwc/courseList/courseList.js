import { LightningElement, wire, track } from 'lwc';

import getcourseList from '@salesforce/apex/courseReview.getcourseList';
import getreviewList from '@salesforce/apex/courseReview.getreviewList';
import { NavigationMixin } from 'lightning/navigation';


const columns = [{
        label: 'Last Name',
        fieldName: 'Last_Name__c'
    },
    {
        label: 'Email',
        fieldName: 'Email__c',
        type: 'email'
    },
    {
        label: 'Rating',
        fieldName: 'Rating__c',

    },
    {
        label: 'Comments',
        fieldName: 'Comments__c	',

    },
    /*{
                    label: 'Parent', fieldName: 'ParentId', type: 'lookup', typeAttributes: {
                        placeholder: 'Select Parent Account',
                        uniqueId: { fieldName: 'Id' }, //pass Id of current record to lookup for context
                        object: "Account",
                        icon: "standard:account",
                        label: "Account",
                        displayFields: "Name, AccountNumber",
                        displayFormat: "Name (AccountNumber)",
                        filters: ""
                    }
                }*/

];

export default class AccountList extends NavigationMixin(LightningElement) {
    @track courseId = '';
    @track reviews;
    @track columns = columns;

    //s = false;

    @wire(getcourseList) courses;

    eventHandle(event) {
        //this.s = true;
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Review__c',
                actionName: 'new'
            }
        });
        // const childMethod = this.template.querySelector('c-review-lds');
    }
    onValueSelection(event) {

        const selectedCourse = event.target.value;
        this.courseId = event.target.value;
        if (selectedCourse != null) {
            getreviewList({

                    courseId: selectedCourse

                })
                .then(result => {
                    this.reviews = result;

                    console.log('result' + JSON.stringify(result) + selectedCourse);
                })
                .catch(error => {
                    this.error = error;
                });
        }
    }
}