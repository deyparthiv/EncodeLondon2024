var StellarSdk = require("stellar-sdk");
var server = new StellarSdk.Horizon.Server(
  "https://horizon-testnet.stellar.org",
);
var sourceKeys = StellarSdk.Keypair.fromSecret(
    "SDGCT6GL3F46RPD2JP4PRG3J56FRTSSGZDD4DNFT3YAG53FMO4XIXWLY" //alice private key
);
var issuerKeys = StellarSdk.Keypair.fromSecret(
    "SC4XUSPY3A7ODBZY72URVCIFKREIB56AX6N2UUGQW7VDKLPZ47DUQH2Z", 
  );
async function sendAsset(recipientPrivateKey:String, assetToken:any){
    var receivingKeys = StellarSdk.Keypair.fromSecret(
        "SDGCT6GL3F46RPD2JP4PRG3J56FRTSSGZDD4DNFT3YAG53FMO4XIXWLY",
      );
    var transaction;
    //check if account exists

    server //establish trust between accounts
  .loadAccount(receivingKeys.publicKey())
  .then(function (receiver: any) {
    var transaction = new StellarSdk.TransactionBuilder(receiver, {
      fee: 100,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(
        StellarSdk.Operation.changeTrust({
          asset: assetToken,
        }),
      )
      // setTimeout is required for a transaction
      .setTimeout(100)
      .build();
    transaction.sign(receivingKeys);
    return server.submitTransaction(transaction);
  })
  .then(console.log)
  server.loadAccount(receivingKeys.publicKey()).catch(function (error: any) {
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
                destination: receivingKeys.publicKey(), 
                asset: assetToken,
                amount: "1",
            }),
        ).addMemo(StellarSdk.Memo.text("Transferring voting token")).setTimeout(180).build();
        transaction.sign(sourceKeys);
        return server.submitTransaction(transaction);
    }).then(function (result: any) {
        console.log("Success! Results:", result);
    })
    .catch(function (error:any) {
        console.error("Something went wrong!", error);
    });
}

sendAsset("GBTK44HVP6KRU6QNWUQTGLS3HQN3QDPSSIARB6H55A5FSZE5M7WQGKIL",new StellarSdk.Asset("JPVMToken", issuerKeys.publicKey()));
