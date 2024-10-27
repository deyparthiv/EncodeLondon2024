(async () => {
    const {
        Keypair,
        Contract,
        SorobanRpc,
        TransactionBuilder,
        Networks,
        BASE_FEE,
        nativeToScVal,
        Address,
    } = require("@stellar/stellar-sdk");

    // The source account will be used to sign and send the transaction.
    // GCWY3M4VRW4NXJRI7IVAU3CC7XOPN6PRBG6I5M7TAOQNKZXLT3KAH362
    const sourceKeypair = Keypair.fromSecret(
        "SDGCT6GL3F46RPD2JP4PRG3J56FRTSSGZDD4DNFT3YAG53FMO4XIXWLY" //alice private key,
    );

    // Configure SorobanClient to use the `soroban-rpc` instance of your
    // choosing.
    var server = new StellarSdk.Horizon.Server(
        "https://horizon-testnet.stellar.org",
    );

    // Here we will use a deployed instance of the `increment` example contract.
    const contractAddress =
        "CCTAMZGXBVCQJJCX64EVYTM6BKW5BXDI5PRCXTAYT6DVEDXKGS347HWU";
    const contract = new Contract(contractAddress);

    // Transactions require a valid sequence number (which varies from one
    // account to another). We fetch this sequence number from the RPC server.
    const sourceAccount = await server.getAccount(sourceKeypair.publicKey());

    // The transaction begins as pretty standard. The source account, minimum
    // fee, and network passphrase are provided.
    let builtTransaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
    })
        // The invocation of the `increment` function of our contract is added
        // to the transaction.
        .addOperation(
            contract.call(
                "register_vote",
                nativeToScVal(Address.fromString(sourceKeypair.publicKey())),
                nativeToScVal(5, { type: "u32" }),
            ),
        )
        // This transaction will be valid for the next 30 seconds
        .setTimeout(30)
        .build();

    console.log(`builtTransaction=${builtTransaction.toXDR()}`);

    // We use the RPC server to "prepare" the transaction. This simulating the
    // transaction, discovering the storage footprint, and updating the
    // transaction to include that footprint. If you know the footprint ahead of
    // time, you could manually use `addFootprint` and skip this step.
    let preparedTransaction = await server.prepareTransaction(builtTransaction);

    // Sign the transaction with the source account's keypair.
    preparedTransaction.sign(sourceKeypair);

    // Let's see the base64-encoded XDR of the transaction we just built.
    console.log(
        `Signed prepared transaction XDR: ${preparedTransaction
            .toEnvelope()
            .toXDR("base64")}`,
    );

    // Submit the transaction to the Soroban-RPC server. The RPC server will
    // then submit the transaction into the network for us. Then we will have to
    // wait, polling `getTransaction` until the transaction completes.
    try {
        let sendResponse = await server.sendTransaction(preparedTransaction);
        console.log(`Sent transaction: ${JSON.stringify(sendResponse)}`);

        if (sendResponse.status === "PENDING") {
            let getResponse = await server.getTransaction(sendResponse.hash);
            // Poll `getTransaction` until the status is not "NOT_FOUND"
            while (getResponse.status === "NOT_FOUND") {
                console.log("Waiting for transaction confirmation...");
                // See if the transaction is complete
                getResponse = await server.getTransaction(sendResponse.hash);
                // Wait one second
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            console.log(`getTransaction response: ${JSON.stringify(getResponse)}`);

            if (getResponse.status === "SUCCESS") {
                // Make sure the transaction's resultMetaXDR is not empty
                if (!getResponse.resultMetaXdr) {
                    throw "Empty resultMetaXDR in getTransaction response";
                }
                // Find the return value from the contract and return it
                let transactionMeta = getResponse.resultMetaXdr;
                let returnValue = transactionMeta.v3().sorobanMeta().returnValue();
                console.log(`Transaction result: ${returnValue.value()}`);
            } else {
                throw `Transaction failed: ${getResponse.resultXdr}`;
            }
        } else {
            throw sendResponse.errorResultXdr;
        }
    } catch (err) {
        // Catch and report any errors we've thrown
        console.log("Sending transaction failed");
        console.log(JSON.stringify(err));
    }
})();