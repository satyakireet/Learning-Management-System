import { LightningElement, wire, track } from 'lwc';
import getCourses from "@salesforce/apex/userInfo.getCourses";
import Id from '@salesforce/user/Id';
const columns = [{
    label: 'Aspirant Name',
    fieldName: 'Name'
}, ];
export default class TrackCourse extends LightningElement {
    userId = Id;
    @track aspirants;
    @track error;
    @track columns = columns;
    @wire(getCourses, {
        recId: '$userId'
    })
    wiredUser({
        error,
        data
    }) {
        if (data) {
            this.aspirants = data;
        } else if (error) {
            this.error = error;
        }
    }
}