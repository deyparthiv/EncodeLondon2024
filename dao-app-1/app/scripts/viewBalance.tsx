var StellarSdk = require("stellar-sdk");
var server = new StellarSdk.Horizon.Server(
    "https://horizon-testnet.stellar.org",
);

async function getBalance(accountId:String){
    try{
        const account = await server.loadAccount(accountId);
        console.log(await account.balances);
        // account.balances.forEach((balance: { asset_type: any; balance: any; }) => {
        //     console.log(`Type: ${balance.asset_type},Balance ${balance.balance}`);
        // });
    } catch(error){
        console.error("Error loading balance: ", error);
    }
}

const publicId = 'GA4W4K3S3E7TNURSFDBY2L47TIZI3I6KP63C4FYYEU2YZXUJ6NSMFSWY';
const publicId2 = 'GA7WMCGTKHYJZY5A3KUIFLZW4GLAQZS6IEF7IAYIBJHH5ASQTZ4NPHQV';
//getBalance(publicId);

async function isAccountAbleToVote(accountId:String){
    try{
        const account = await server.loadAccount(accountId);
        const balances = account.balances;
        var isAbleToVote = false;
        balances.forEach((balance : {
            asset_code: string;asset_type: any; balance: any;}) => {
            if(balance.asset_type == 'credit_alphanum12'){
                if(balance.asset_code == 'JPVMToken' && parseFloat(balance.balance)>0) {isAbleToVote = true;}
            }
        });
        console.log(isAbleToVote)
        return isAbleToVote;
    } catch(error){
        console.error("Error loading balance: ", error);
        console.log(false);
        return false;
    }
}
isAccountAbleToVote(publicId)
isAccountAbleToVote(publicId2)