import {List, Map} from 'immutable'

function setState(state, newState) {
    return state.merge(newState);
}

function vote(state, entry) {
    const currPair = state.getIn(['vote', 'pair']);
    if (currPair && currPair.includes(entry))
        return state.set('hasVoted', entry);
    else
        return state;
}

function resetVote(state) {
    const hasVoted = state.get('hasVoted');
    const currPair = state.getIn(['vote', 'pair'], List());
    if (hasVoted && !currPair.includes(hasVoted))
        return state.remove('hasVoted');
    else
        return state;
}

export default function(state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE':
            return resetVote(setState(state, action.state));
            break;
        case 'VOTE':
            return vote(state, action.entry);
            break;
    }
    return state;
}