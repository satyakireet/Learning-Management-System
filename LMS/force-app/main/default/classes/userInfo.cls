public with sharing class userInfo {
    @AuraEnabled(cacheable=true)
    public static List<Aspirant__c> getCourses(String recId) {
        return [
            SELECT Name from Aspirant__c where CreatedById=:recId];
}
}