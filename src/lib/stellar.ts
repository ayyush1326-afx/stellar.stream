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

    const signedXdr = await signTransaction(tx.toXDR() as any, { network: "TESTNET" } as any);
    const finalXdr = typeof signedXdr === 'string' ? signedXdr : (signedXdr as any).signedTxXdr;
    
    if (!finalXdr) {
      throw new Error("Failed to get signed transaction from Freighter");
    }

    const txToSubmit = TransactionBuilder.fromXDR(finalXdr as string, Networks.TESTNET);
    console.log("Submitting transaction to Horizon...", txToSubmit.hash().toString('hex'));
    
    const response = await server.submitTransaction(txToSubmit);
    
    if (!response.successful) {
      console.error("Horizon response unsuccessful:", response);
      throw new Error("Transaction was not successful on the network.");
    }

    console.log("Transaction successfully submitted! Hash:", response.hash);
    return response;
  } catch (error: any) {
    console.error("Payment failed", error);
    if (error?.response?.data?.extras?.result_codes) {
      const codes = error.response.data.extras.result_codes;
      console.error("Horizon Error Details:", codes);
      throw new Error(`Transaction failed: ${JSON.stringify(codes)}`);
    }
    throw new Error(error.message || "Unknown error during payment");
  }
}
