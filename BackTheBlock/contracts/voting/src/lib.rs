#![no_std]
use soroban_sdk::{contract, contracttype, contractimpl, vec, Env, String, Vec,log};

//LIST TO STORE REGISTERED MEMBERS
//const MEMBERS: Vec<String> = Vec::new(&env);
//LIST TO STORE PROJECTS
//const PROJECTS: Vec<String> = Vec::new(&env);

//LIST TO STORE REGISTERED MEMBERS
#[derive(Clone)]
#[contracttype]
pub enum MemberKeys {
    Vec,
}
#[contracttype]
pub enum ProjectKeys {
    Vec,
}
#[contract]
pub struct VotingContract;

#[contractimpl]
impl VotingContract {
    pub fn setup(env: Env) -> (){
        env.storage().persistent().set(&MemberKeys::Vec, &Vec::<String>::new(&env));
        env.storage().persistent().set(&ProjectKeys::Vec, &Vec::<String>::new(&env));
        log!(&env,"after setup:", env.storage().persistent().get(&MemberKeys::Vec).unwrap_or(vec![&env,String::from_str(&env,"failure to initialise member keys")]));
        log!(&env,"after setup:", env.storage().persistent().get(&ProjectKeys::Vec).unwrap_or(vec![&env,String::from_str(&env,"failure to initialise project keys")]));
    }
    pub fn addMemberKey(env: Env, member: String) -> Vec<String> {
        //load list of members from env into function for mutation
        let mut members: Vec<String> = env.storage()
                                        .persistent()
                                        .get(&MemberKeys::Vec)
                                        .unwrap_or(vec![&env, String::from_str(&env,"failure to fetch members")]);
        log!(&env, "members before adding new member: {}",members);
        members.push_back(member);
        log!(&env, "members: {}",members);
        env.storage().persistent().set(&MemberKeys::Vec, &members);
        //env.storage().instance().extend_ttl(100, 100);
        members
    }
    pub fn addProjectKey(env: Env, project: String) -> Vec<String> {
        //load list of members from env into function for mutation
        let mut projects: Vec<String> = env.storage()
                                        .persistent()
                                        .get(&ProjectKeys::Vec)
                                        .unwrap_or(vec![&env, String::from_str(&env,"failure to fetch projects list")]);
        log!(&env, "projects before adding new project: {}",projects);
        projects.push_back(project);
        log!(&env, "projects: {}",projects);
        env.storage().persistent().set(&ProjectKeys::Vec, &projects);
        //env.storage().instance().extend_ttl(100, 100);
        projects
    }
}

mod test;

