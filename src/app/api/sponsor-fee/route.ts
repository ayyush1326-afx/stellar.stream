import { NextResponse } from 'next/server';
import { TransactionBuilder, Keypair, Networks } from 'stellar-sdk';

/**
 * Fee-Bump Sponsorship API (Level 6 Feature)
 * -----------------------------------------
 * This allows the core StellarStream project (using a treasury secret key)
 * to sponsor transaction fees for users who may not have XLM for gas.
 */
export async function POST(req: Request) {
    try {
        const { xdr } = await req.json();
        const sponsorSecret = process.env.SPONSOR_SECRET_KEY;
        const TESTNET_PASSPHRASE = "Test SDF Network ; September 2015";

        if (!sponsorSecret) {
            return NextResponse.json({ error: "Sponsorship disabled: No secret key on server." }, { status: 501 });
        }

        const sponsorKeypair = Keypair.fromSecret(sponsorSecret);
        
        // Load the original signed transaction
        const userTx = TransactionBuilder.fromXDR(xdr, TESTNET_PASSPHRASE) as any;
        
        // Build the Fee Bump Transaction
        const sponsoredTx = TransactionBuilder.buildFeeBumpTransaction(
            sponsorKeypair,
            "1000", // Fixed fee for sponsorship (base fee * 10)
            userTx,
            TESTNET_PASSPHRASE
        );

        // Sign the Fee Bump
        sponsoredTx.sign(sponsorKeypair);
        
        const sponsoredXdr = sponsoredTx.toXDR();

        return NextResponse.json({ 
            sponsoredXdr,
            sponsor: sponsorKeypair.publicKey()
        });
    } catch (error: any) {
        console.error("Fee Sponsor API Error:", error);
        return NextResponse.json({ error: error.message || "Failed to sponsor transaction" }, { status: 500 });
    }
}
