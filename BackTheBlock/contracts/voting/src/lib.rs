#![no_std]
use soroban_sdk::{contract, contracttype, contractimpl, vec, Env, String, Vec,log, Symbol, symbol_short, Address, Map};

//LIST TO STORE REGISTERED MEMBERS
//const MEMBERS: Vec<String> = Vec::new(&env);
//LIST TO STORE PROJECTS
//const PROJECTS: Vec<String> = Vec::new(&env);

//LIST TO STORE REGISTERED MEMBERS

const IS_VOTING_PERIOD:Symbol = symbol_short!("isVP"); 
const BALANCE:Symbol = symbol_short!("bal");
const POOL_ADDRESS:Symbol = symbol_short!("padd");

#[contracttype]
pub enum MemberKeys {
    Vec,
}
#[contracttype]
pub enum ProjectKeys {
    Vec,
}

#[contracttype]
pub enum VoteMap {
    Map,
}

#[contract]
pub struct VotingContract;

#[contractimpl]
impl VotingContract {

    pub fn setup(env: Env) -> (){
        env.storage().persistent().set(&MemberKeys::Vec, &Vec::<String>::new(&env));
        env.storage().persistent().set(&ProjectKeys::Vec, &Vec::<String>::new(&env));
        env.storage().persistent().set(&IS_VOTING_PERIOD,&false);
        env.storage().persistent().set(&POOL_ADDRESS, &Address::from_string(&String::from_str(&env,"GA7WMCGTKHYJZY5A3KUIFLZW4GLAQZS6IEF7IAYIBJHH5ASQTZ4NPHQV")));
        // log!(&env,"after setup:", env.storage().persistent().get(&MemberKeys::Vec).unwrap_or(vec![&env,String::from_str(&env,"failure to initialise member keys")]));
        // log!(&env,"after setup:", env.storage().persistent().get(&ProjectKeys::Vec).unwrap_or(vec![&env,String::from_str(&env,"failure to initialise project keys")]));
    }
    //------------------------------------------------------------------------------------------------------
    pub fn add_member_key(env: Env, member: String) -> Vec<String> { //add new member into storage
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
    //------------------------------------------------------------------------------------------------------
    pub fn add_project_key(env: Env, project: String) -> Vec<String> { //add new project into storage
        let is_voting_period:bool = env.storage().persistent().get(&IS_VOTING_PERIOD).unwrap_or(false);
        if is_voting_period {
            log!(&env, "adding project attempted when voting period is open");
            return Vec::new(&env);
        }
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

    pub fn check_vote_num(env: Env, project_key:String) -> i32 {
        let vote_map: Map<String, i32> = env
            .storage()
            .persistent()
            .get(&VoteMap::Map)
            .unwrap_or(Map::new(&env));

        // Retrieve the vote count for the project or default to 0 if not found
        vote_map.get(project_key).unwrap_or(0)
    }

    pub fn register_vote(env: Env, member_key: String, project_key: String) -> bool {
    // Check if voting is open
    let is_voting_period: bool = env.storage().persistent().get(&IS_VOTING_PERIOD).unwrap_or(false);
    if !is_voting_period {
        log!(&env, "Voting attempted when the voting period is not open");
        return false;
    }

    // Check if the member is registered
    if !Self::is_member_registered(&env, member_key) {
        log!(&env, "Unregistered member tried to vote");
        return false;
    }

    // Load or initialize vote map
    let mut vote_map: Map<String, i32> = env
        .storage()
        .persistent()
        .get(&VoteMap::Map)
        .unwrap_or(Map::new(&env));

    // Increment vote count for the project
    let votes = vote_map.get(project_key.clone()).unwrap_or(0);
    vote_map.set(project_key.clone(), votes + 1);  // Use `&project_key` here

    // Save updated map back to storage
    env.storage().persistent().set(&VoteMap::Map, &vote_map);
    log!(&env, "Vote registered for project: {}", project_key.clone());

    true
    }

    pub fn is_member_registered(env: &Env, member_key: String) -> bool {
        let members:Vec<String> = env.storage().persistent().get(&MemberKeys::Vec).unwrap_or(Vec::new(&env));
        log!(&env, "state of members before contains()", members);
        log!(&env, "member being checked:", member_key);
        return members.contains(&member_key);
    }

    //--------------------------------------------------------------------------------

    pub fn is_voting_open(env: Env) -> bool {
        return env.storage().persistent().get(&IS_VOTING_PERIOD).unwrap_or(false);
    }
    pub fn open_voting(env:Env) -> () {
        env.storage().persistent().set(&IS_VOTING_PERIOD, &true);

        let vote_map: Map<String, i32> = env.storage()
            .persistent()
            .get(&VoteMap::Map)
            .unwrap_or(Map::new(&env));
        env.storage().persistent().set(&VoteMap::Map, &vote_map);

    }
    pub fn close_voting(env:Env) -> () {
        env.storage().persistent().set(&IS_VOTING_PERIOD, &false);
    }

    //--------------------------------------------------------------------------------
    // pub fn check_payment_to_bank_and_add_voter(env:Env, amount:String, destination_key:String) -> bool {
        
    // }

}

mod test;

