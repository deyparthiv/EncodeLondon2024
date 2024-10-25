#![cfg(test)]

use super::*;
use soroban_sdk::{vec, Env, String};

#[test]
fn test1() {
    let env = Env::default();
    let contract_id = env.register_contract(None, VotingContract);
    let client = VotingContractClient::new(&env, &contract_id);
    client.setup();
    assert_eq!(
       client.addMember(&String::from_str(&env,"James")), vec![&env,String::from_str(&env,"James"),]
    );
}

#[test]
fn test2() {
    let env = Env::default();
    let contract_id = env.register_contract(None, VotingContract);
    let client = VotingContractClient::new(&env, &contract_id);
    client.setup();
    client.addMember(&String::from_str(&env,"James"));
    assert_eq!(
        client.addMember(&String::from_str(&env,"Parthiv")),vec![&env,String::from_str(&env,"James"),String::from_str(&env,"Parthiv")]
    );
}
