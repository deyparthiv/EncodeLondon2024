#![no_std]
use soroban_sdk::{contract, contracttype, contractimpl, vec, Env, String, Vec,log};

//LIST TO STORE REGISTERED MEMBERS
//const MEMBERS: Vec<String> = Vec::new(&env);
//LIST TO STORE PROJECTS
//const PROJECTS: Vec<String> = Vec::new(&env);

//LIST TO STORE REGISTERED MEMBERS
#[derive(Clone)]
#[contracttype]
pub enum Members {
    Vec,
}
#[contract]
pub struct VotingContract;

#[contractimpl]
impl VotingContract {
    pub fn setup(env: Env) -> (){
        env.storage().persistent().set(&Members::Vec, &Vec::<String>::new(&env));
        log!(&env,"after setup:", env.storage().persistent().get(&Members::Vec).unwrap_or(vec![&env,String::from_str(&env,"failure")]));
    }
    pub fn addMember(env: Env, member: String) -> Vec<String> {
        //load list of members from env into function for mutation
        let mut members: Vec<String> = env.storage()
                                        .persistent()
                                        .get(&Members::Vec)
                                        .unwrap_or(vec![&env, String::from_str(&env,"failure to fetch list")]);
        log!(&env, "members before adding new member: {}",members);
        members.push_back(member);
        log!(&env, "members: {}",members);
        env.storage().persistent().set(&Members::Vec, &members);
        //env.storage().instance().extend_ttl(100, 100);
        members
    }
}

mod test;

