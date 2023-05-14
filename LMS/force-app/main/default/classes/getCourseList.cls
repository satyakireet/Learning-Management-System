public with sharing class getCourseList {
    @AuraEnabled(cacheable=true)
    public static List<Course__c> getcourseList( ) {
        //String strKey = '%' + searchKey + '%'; 
        return [SELECT Id, Name,Level_of_Course__c,Course_Duration__c,Skills_Covered__c,Course_Description__c,Prerequisites__c
         FROM Course__c LIMIT 10];
    }
}