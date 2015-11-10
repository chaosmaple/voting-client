export default socket => store => next => action => {
    if (action.meta && action.meta.remote) {
        console.log('in middleware', action);
        socket.emit('action', action);
    }
    return next(action);
}

// export default function(store) {
//     return function(next) {
//         return function(action) {
//             console.log('in middleware', action);
//             return next(action);
//         }
//     }
// }
