const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async Operation1 ...');
        resolve(1)
    }, 2000)
})

const p2 = new Promise((resolve) => {
        setTimeout(() => {
            console.log('Async Operation1 ...');
            resolve(02)
        }, 2000)
    })
    // Promise.all([p1, p2])
    //     .then(result => console.log(result))
    //     .catch(err => console.log('err', err.message));

Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('err', err.message));

// Promise.resolve({ id: 1 })
//     .then(result => console.log(result));

// const p = Promise.reject(new Error('reaso for rejection'));
// p.catch(err => console.log(err))