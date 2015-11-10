import React from 'react'
import ReactDOM from 'react-dom'
import {List} from 'immutable'
import ReactTestUtils from 'react-addons-test-utils'
import {Voting} from '../../src/components/Voting'
import {expect} from 'chai'

const {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
} = ReactTestUtils;

describe('Voting', () => {
    let pair;

    beforeEach(function() {
        pair = ['Trainspotting', '28 Days Later'];
    })

    it('render a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={pair} />
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('Trainspotting');
        expect(buttons[1].textContent).to.equal('28 Days Later');
    });

    it('invoke a callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry => votedWith = entry);

        const component = renderIntoDocument(
            <Voting pair={pair}
                    onVote={vote} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);

        expect(votedWith).to.equal('Trainspotting');
    });

    it('disables button when user has voted', () => {
        const component = renderIntoDocument(
            <Voting pair={pair}
                    hasVoted={'Trainspotting'}/>
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });

    it('adds label to the voted entry', () => {
        const component = renderIntoDocument(
            <Voting pair={pair}
                    hasVoted={'Trainspotting'}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons[0].textContent).to.contain('Voted');
    });

    it('renders just the winner when there is one', () => {
        const component = renderIntoDocument(
            <Voting winner='Trainspotting' />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(0);

        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Trainspotting');
    });

    it('renders as a pure component', () => {
        const div = document.createElement('div');
        const component = ReactDOM.render(
            <Voting pair={pair} />,
            div
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.contain('Trainspotting');

        pair[0] = 'Sunshine';
        ReactDOM.render(
            <Voting pair={pair} />,
            div
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.contain('Trainspotting');
    });

    it('does update DOM when prop change', () => {
        const div = document.createElement('div');
        pair = List.of('Trainspotting', '28 Days Later');

        const component = ReactDOM.render(
            <Voting pair={pair} />,
            div
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Trainspotting');

        const newPair = pair.set(0, 'Sunshine');
        ReactDOM.render(
            <Voting pair={newPair} />,
            div
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Sunshine');
    })
})
