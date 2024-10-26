#![cfg(test)]

use super::*;
use soroban_sdk::{vec, Env, String, Map};

#[test]
fn test1() {
    let env = Env::default();
    let contract_id = env.register_contract(None, VotingContract);
    let client = VotingContractClient::new(&env, &contract_id);
    client.setup();
    assert_eq!(
       client.add_member_key(&String::from_str(&env,"James")), vec![&env,String::from_str(&env,"James"),]
    );
}

#[test]
fn test2() {
    let env = Env::default();
    let contract_id = env.register_contract(None, VotingContract);
    let client = VotingContractClient::new(&env, &contract_id);
    client.setup();
    client.add_member_key(&String::from_str(&env,"James"));
    assert_eq!(
        client.add_member_key(&String::from_str(&env,"Parthiv")),vec![&env,String::from_str(&env,"James"),String::from_str(&env,"Parthiv")]
    );
}
#[test]
fn test3() {
    let env = Env::default();
    let contract_id = env.register_contract(None, VotingContract);
    let client = VotingContractClient::new(&env, &contract_id);
    client.setup();
    assert_eq!(
       client.add_project_key(&String::from_str(&env,"Project1")), vec![&env,String::from_str(&env,"Project1"),]
    );
}
#[test]
fn test4() {
    let env = Env::default();
    let contract_id = env.register_contract(None, VotingContract);
    let client = VotingContractClient::new(&env, &contract_id);
    client.setup();
    client.add_project_key(&String::from_str(&env,"Project1"));
    assert_eq!(
        client.add_project_key(&String::from_str(&env,"Project2")),vec![&env,String::from_str(&env,"Project1"),String::from_str(&env,"Project2")]
    );
}
#[test]
fn test5() {
    let env = Env::default();
    let contract_id = env.register_contract(None, VotingContract);
    let client = VotingContractClient::new(&env, &contract_id);
    client.setup();
    assert_eq!(
        client.is_member_registered(&String::from_str(&env,"James")),false
    );
}
#[test]
fn test6() {
    let env = Env::default();
    let contract_id = env.register_contract(None, VotingContract);
    let client = VotingContractClient::new(&env, &contract_id);
    client.setup();
    client.add_member_key(&String::from_str(&env,"James"));
    assert_eq!(
        client.is_member_registered(&String::from_str(&env,"James")),true
    );
}
#[test]
fn test7() {
    let env = Env::default();
    let contract_id = env.register_contract(None, VotingContract);
    let client = VotingContractClient::new(&env, &contract_id);
    client.setup();
    assert_eq!(
        client.is_voting_open(),false
    );
}
#[test]
fn test8() {
    let env = Env::default();
    let contract_id = env.register_contract(None, VotingContract);
    let client = VotingContractClient::new(&env, &contract_id);
    client.setup();
    client.open_voting();
    assert_eq!(
        client.is_voting_open(),true
    );
}
// #[test]
// fn test9() {
//     let env = Env::default();
//     let contract_id = env.register_contract(None, VotingContract);
//     let client = VotingContractClient::new(&env, &contract_id);
//     client.setup();
//     client.open_voting();
//     let vote_success = client.register_vote(member_key);
//     assert_eq!(
//         client.is_voting_open(),false
//     );
// }

#[test]
fn test10() {
    let env = Env::default();
    let contract_id = env.register_contract(None, VotingContract);
    let client = VotingContractClient::new(&env, &contract_id);
    client.setup();
    let member_key = String::from_str(&env, "James");
    let project_key = String::from_str(&env, "Project1");

    client.add_member_key(&member_key);
    client.add_project_key(&project_key);
    client.open_voting();
    let vote_success = client.register_vote(&member_key, &project_key);
    assert_eq!(vote_success, true, "Vote should be successfully registered.");

    // Check the vote count for the project
    let vote_num = client.check_vote_num(&project_key);
    assert_eq!(vote_num, 1, "Vote count for Project1 should be 1 after one vote.");
}

