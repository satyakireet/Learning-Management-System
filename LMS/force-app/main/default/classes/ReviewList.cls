public with sharing class ReviewList {
    @AuraEnabled(cacheable=true)
    public static List<Review__c> getreviewList() {
        return [
            SELECT Id, Name,Last_Name__c,Rating__c,course__r.Name,Email__c
            FROM Review__c
            LIMIT 10
        ];
    }
}