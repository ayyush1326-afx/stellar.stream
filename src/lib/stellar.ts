import { signTransaction } from "@stellar/freighter-api";
import { Horizon, TransactionBuilder, Networks, Asset, Operation } from "stellar-sdk";

export async function payCreator(creatorAddress: string, priceXLM: string, senderPublicKey: string) {
  try {
    const server = new Horizon.Server("https://horizon-testnet.stellar.org");
    const account = await server.loadAccount(senderPublicKey);

    const tx = new TransactionBuilder(account, {
      fee: "100",
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: creatorAddress,
          asset: Asset.native(),
          amount: priceXLM,
        })
      )
      .setTimeout(30)
      .build();

    const signedXdr = await signTransaction(tx.toXDR(), { network: "TESTNET" });
    const txToSubmit = TransactionBuilder.fromXDR(signedXdr as string, Networks.TESTNET);
    
    const response = await server.submitTransaction(txToSubmit);
    return response;
  } catch (error) {
    console.error("Payment failed", error);
    throw error;
  }
}
