const ROLES = {
    _REP: 'REP',
    _SUPERVISOR: 'SUP',
    _ADMIN: 'ADM',
    _ANONYMOUS: 'ANO'
}

const users = [
    { username: 'kamran', name: 'Kamran Shaikh', role: ROLES._REP },
    { username: 'imtiaz', name: 'Imtiaz Quraishi', role: ROLES._SUPERVISOR },
    { username: 'wazir', name: 'Wazir Khan', role: ROLES._ADMIN },
    { username: 'anonymous', name: 'Anonymous', role: ROLES._ANONYMOUS }
];


const getUserByUsername = (username) => {
    return users.find(user => user.username == username);
}

module.exports = { ROLES, getUserByUsername }