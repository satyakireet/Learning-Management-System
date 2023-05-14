public with sharing class courseStatus {
    @AuraEnabled(cacheable=true)
    public static List<Course_Application__c> getSelectedStatusList() {
        return [SELECT Id, Name, Aspirant__c, Course__c, Status__c FROM Course_Application__c where Status__c ='Selected' LIMIT 10];
    }
    @AuraEnabled(cacheable=true)
    public static List<Course_Application__c> getRejectedStatusList() {
        return [SELECT Id, Name, Aspirant__c, Course__c, Status__c FROM Course_Application__c where Status__c ='Rejected' LIMIT 10];
    }
}
