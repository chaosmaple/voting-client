import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import Vote from './Vote'
import Winner from './Winner'
import * as actionCreators from '../action_creators'

export const Voting = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        const {props} = this;
        return (
            <div>
                {
                    props.winner ?
                    <Winner ref='winner' winner={props.winner}/> :
                    <Vote {...props} />
                }
            </div>
        )
    }
});

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        hasVoted: state.get('hasVoted'),
        winner: state.get('winner')
    }
}

export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);
