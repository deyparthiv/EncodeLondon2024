var StellarSdk = require("stellar-sdk");
var server = new StellarSdk.Horizon.Server(
    "https://horizon-testnet.stellar.org",
);

async function getBalance(accountId:String){
    try{
        const account = await server.loadAccount(accountId);
        account.balances.forEach((balance: { asset_type: any; balance: any; }) => {
            console.log(`Type: ${balance.asset_type},Balance ${balance.balance}`);
        });
    } catch(error){
        console.error("Error loading balance: ", error);
    }
}

const publicId = 'GA4W4K3S3E7TNURSFDBY2L47TIZI3I6KP63C4FYYEU2YZXUJ6NSMFSWY';
getBalance(publicId);