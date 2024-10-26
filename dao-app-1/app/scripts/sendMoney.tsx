var StellarSdk = require("stellar-sdk");
var server = new StellarSdk.Horizon.Server(
    "https://horizon-testnet.stellar.org",
);
var sourceKeys = StellarSdk.Keypair.fromSecret(
    "SDGCT6GL3F46RPD2JP4PRG3J56FRTSSGZDD4DNFT3YAG53FMO4XIXWLY" //alice private key
);
var destinationId = "GA7WMCGTKHYJZY5A3KUIFLZW4GLAQZS6IEF7IAYIBJHH5ASQTZ4NPHQV"; //bank public key

async function sendTo(destinationPublicKey:String, amount:String){
    var transaction;
    //check if account exists
    server.loadAccount(destinationId).catch(function (error: any) {
        if(error instanceof StellarSdk.NotFoundError) {
            throw new Error("The destination account does not exist!");
        } else return error;
    }).then(function() {
        return server.loadAccount(sourceKeys.publicKey());
    }).then(function(sourceAccount: any) {
        transaction = new StellarSdk.TransactionBuilder(sourceAccount,{
            fee:StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET,
        }).addOperation(
            StellarSdk.Operation.payment({
                destination: destinationId, 
                asset: StellarSdk.Asset.native(),
                amount: amount,
            }),
        ).addMemo(StellarSdk.Memo.text("Test transaction")).setTimeout(180).build();
        transaction.sign(sourceKeys);
        return server.submitTransaction(transaction);
    }).then(function (result: any) {
        console.log("Success! Results:", result);
    })
    .catch(function (error:any) {
        console.error("Something went wrong!", error);
    });
}
sendTo(destinationId, "500");