// so this particular note is for async
// i already understand the concept of async ... so i will not need
// to really write that dw
console.log('before');
getUser(1, function(user) {
    console.log('User', user)
});
console.log('after');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('reading a user from a database')
        callback({ id: id, gitHubUsername: 'mosh' })
    }, 2000);
};
// that is an example of what a call back looks like 
// what is a promise 
// a promise is an obj that hold the eventual result of an asynchronous operation 
// states of promises 
//pending:
//fulfilled :completed (here we are going to have a value);
// rejected state:error
//this is the code that was written to explain promises 
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
        // reject(new Error('message that will be send when there is an error'));
    }, 2000);


});

p
    .then(result => console.log('Result', result))
    .catch(err => console.log("Error", err.message));