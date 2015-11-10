import React from 'react'
import {List, Map} from 'immutable'

const pair = List.of('Trainspotting', '28 Days Later');
const tally = Map({
    'Trainspotting': 4,
    '28 Days Later': 3
});

export default React.createClass({
    render: function() {
        return this.props.children;
    }
})
