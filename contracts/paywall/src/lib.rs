#![no_std]
use soroban_sdk::{contract, contractimpl, token, Address, Env};

#[contract]
pub struct PaywallContract;

#[contractimpl]
impl PaywallContract {
    /// Pay the creator in a specific token (like Testnet XLM)
    pub fn pay_for_content(
        env: Env,
        buyer: Address,
        creator: Address,
        token: Address,
        amount: i128,
    ) {
        buyer.require_auth();

        let client = token::Client::new(&env, &token);
        client.transfer(&buyer, &creator, &amount);
        
        // Emitting an event makes it easy for the frontend to listen for a successful unlock
        env.events().publish(
            (buyer.clone(), creator.clone()),
            amount,
        );
    }
}
