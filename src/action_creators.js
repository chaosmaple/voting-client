export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    }
}

export function onVote(entry) {
    return {
        meta: {remote: true},
        type: 'VOTE',
        entry
    }
}

export function next() {
    return {
        meta: {remote: true},
        type: 'NEXT'
    }
}
