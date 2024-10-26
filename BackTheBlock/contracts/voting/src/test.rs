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
       client.addMemberKey(&String::from_str(&env,"James")), vec![&env,String::from_str(&env,"James"),]
    );
}

#[test]
fn test2() {
    let env = Env::default();
    let contract_id = env.register_contract(None, VotingContract);
    let client = VotingContractClient::new(&env, &contract_id);
    client.setup();
    client.addMemberKey(&String::from_str(&env,"James"));
    assert_eq!(
        client.addMemberKey(&String::from_str(&env,"Parthiv")),vec![&env,String::from_str(&env,"James"),String::from_str(&env,"Parthiv")]
    );
}
#[test]
fn test3() {
    let env = Env::default();
    let contract_id = env.register_contract(None, VotingContract);
    let client = VotingContractClient::new(&env, &contract_id);
    client.setup();
    assert_eq!(
       client.addProjectKey(&String::from_str(&env,"Project1")), vec![&env,String::from_str(&env,"Project1"),]
    );
}
#[test]
fn test4() {
    let env = Env::default();
    let contract_id = env.register_contract(None, VotingContract);
    let client = VotingContractClient::new(&env, &contract_id);
    client.setup();
    client.addProjectKey(&String::from_str(&env,"Project1"));
    assert_eq!(
        client.addProjectKey(&String::from_str(&env,"Project2")),vec![&env,String::from_str(&env,"Project1"),String::from_str(&env,"Project2")]
    );
}