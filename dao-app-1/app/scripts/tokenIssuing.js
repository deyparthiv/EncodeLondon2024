var StellarSdk = require("stellar-sdk");
var server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");
// Keys for accounts to issue and receive the new asset
var issuerKeys = StellarSdk.Keypair.fromSecret("SC4XUSPY3A7ODBZY72URVCIFKREIB56AX6N2UUGQW7VDKLPZ47DUQH2Z");
var receivingKeys = StellarSdk.Keypair.fromSecret("SDGCT6GL3F46RPD2JP4PRG3J56FRTSSGZDD4DNFT3YAG53FMO4XIXWLY");
// Create an object to represent the new asset
var voteAsset = new StellarSdk.Asset("JPVMToken", issuerKeys.publicKey());
// First, the receiving account must trust the asset
server
    .loadAccount(receivingKeys.publicKey())
    .then(function (receiver) {
    var transaction = new StellarSdk.TransactionBuilder(receiver, {
        fee: 100,
        networkPassphrase: StellarSdk.Networks.TESTNET,
    })
        // The `changeTrust` operation creates (or alters) a trustline
        // The `limit` parameter below is optional
        .addOperation(StellarSdk.Operation.changeTrust({
        asset: voteAsset,
    }))
        // setTimeout is required for a transaction
        .setTimeout(100)
        .build();
    transaction.sign(receivingKeys);
    return server.submitTransaction(transaction);
})
    .then(console.log)
    // Second, the issuing account actually sends a payment using the asset
    .then(function () {
    return server.loadAccount(issuerKeys.publicKey());
})
    .then(function (issuer) {
    var transaction = new StellarSdk.TransactionBuilder(issuer, {
        fee: 100,
        networkPassphrase: StellarSdk.Networks.TESTNET,
    })
        .addOperation(StellarSdk.Operation.payment({
        destination: receivingKeys.publicKey(),
        asset: voteAsset,
        amount: "1",
    }))
        // setTimeout is required for a transaction
        .setTimeout(100)
        .build();
    transaction.sign(issuerKeys);
    return server.submitTransaction(transaction);
})
    .then(console.log)
    .catch(function (error) {
    console.error("Error!", error);
});
