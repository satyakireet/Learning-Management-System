public with sharing class courseReview {
    @AuraEnabled(cacheable=true)
    public static List<Course__c> getcourseList() {
        return [SELECT Id, Name FROM Course__c LIMIT 10];
    }
    @AuraEnabled(cacheable=true)
    public static List<Review__c> getreviewList(String courseId) {
        System.debug('test');
        return [SELECT Id, Name,Last_Name__c,Rating__c,course__r.Name,Email__c,Comments__c FROM Review__c where course__r.Id=:courseId];
    }
    @AuraEnabled(cacheable=true)
    public static List<Aspirant__c> getaspirants() {
        return [
            SELECT Name,Contact__c,Email__C from Aspirant__c];
}
}