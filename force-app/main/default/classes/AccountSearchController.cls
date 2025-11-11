public class AccountSearchController {

    public string text{get;set;}
    public List<Account> accs;
    
    public List<Account> getAccounts(){
        return accs;
    }
    
    public PageReference search(){
        accs = [select Id, Name, BillingCity, CreatedBy.FirstName from Account WHERE CreatedBy.FirstName=:text];
        return null;
    }
}