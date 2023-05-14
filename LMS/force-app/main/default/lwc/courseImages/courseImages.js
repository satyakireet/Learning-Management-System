import { LightningElement } from 'lwc';
import courseImages from '@salesforce/resourceUrl/courseImages';


export default class CourseImages extends LightningElement {
    java = courseImages + '/static/1.png';
    dm = courseImages + '/static/2.jpg';
    ios = courseImages + '/static/3.png';
    ml = courseImages + '/static/4.png';
    ds = courseImages + '/static/5.jpg';
    ba = courseImages + '/static/6.jpg';
    sa = courseImages + '/static/7.jpg';
}