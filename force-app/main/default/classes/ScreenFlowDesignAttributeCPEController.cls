public with sharing class ScreenFlowDesignAttributeCPEController {
    public ScreenFlowDesignAttributeCPEController() {

    }

    
    public class Item{
        @AuraEnabled
        public string label{get;set;}
        @AuraEnabled
        public string value{get;set;}
    }

    @AuraEnabled(cacheable=true)
    public static List<Item> getAllObjects(){
        List<Item> result = new List<Item>();

        Map<String, Schema.SObjectType> globalDescribe = Schema.getGlobalDescribe();
        for (String objectName : globalDescribe.keySet()) {
            Item item = new Item();
            item.label = globalDescribe.get(objectName).getDescribe().getLabel();
            item.value = objectName;
            result.add(item);
        }
        return result;
    }

    @AuraEnabled(cacheable=true)
    public static List<Item> getAllFields(String objectApiName){
        List<Item> result = new List<Item>();

        // 1. Get the SObjectType token for the given object API name
        Schema.SObjectType objectType = Schema.getGlobalDescribe().get(objectApiName);

        if (objectType != null) {
            // 2. Get the DescribeSObjectResult for the object
            Schema.DescribeSObjectResult describeResult = objectType.getDescribe();

            // 3. Get the map of all fields for the object
            Map<String, Schema.SObjectField> fieldMap = describeResult.fields.getMap();

            // 4. Iterate through the field map and add field names to the list
            for (String fieldApiName : fieldMap.keySet()) {
                Schema.SObjectField sObjField = fieldMap.get(fieldApiName);
                DescribeFieldResult fieldDescribe = sObjField.getDescribe();
                String fieldLabel = fieldDescribe.getLabel();
                Item item = new Item();
                item.label = fieldLabel;
                item.value = fieldApiName;
                result.add(item);
            }
            return result;
        } else {
            System.debug('Object with API Name "' + objectApiName + '" not found.');
        }
        

        return result;
    }
}