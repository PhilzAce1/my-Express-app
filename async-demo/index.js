// console.log('before');
// getUser(1, getRepositories);
// console.log('after');

// function getRepositories(user) {
//     getRepositories(user.gitHubUsername, getCommits);
// };

// function getCommits(repos) {
//     getCommits(repo, displayCommits);

// };

// function displayCommits(commits) {
//     console.log(commits)
// };
console.log('before')
getUser(1)
    .then(user => getRepositories(user => gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('commits', commits))
    .catch(err => console.log('Error', err.message))
console.log('after')


// //synchronous 
// console.log('before');
// const user = getUser(1);
// const repos = getRepositories(user.gitHubUsername);
// const commit = getCommits(repos[0]);
// console.log('after')






function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('reading a user from a database')
            resolve({ id: id, gitHubUsername: 'mosh' })
        }, 2000);
    })

};

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling gitHub api');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000)
    })

};

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('this is just an example ');
            resolve(['commits'])
        }, 2000)
    })
}