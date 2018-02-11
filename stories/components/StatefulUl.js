// libraries
import React, { Component, Fragment } from 'react';

// components
import AnimatedCollection from '../../src/components/AnimatedCollection';

export default class StatefulUl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items
        };

        this.appendNew = this.appendNew.bind(this);
        this.removeLast = this.removeLast.bind(this);
    }

    appendNew() {
        this.setState(state => ({
            items: [ ...state.items, `New Item ${ state.items.length + 1 }`]
        }))
    }

    removeLast() {
        this.setState(state => ({
            items: state.items.slice(0, state.items.length - 1)
        }));
    }

    render() {
        return (
            <Fragment>
                <ul>
                    <AnimatedCollection>
                        { this.state.items.map(item => (
                            <li key={item}>{item}</li>
                        )) }
                    </AnimatedCollection>
                </ul>
                <button onClick={this.removeLast}>Remove Last</button>
                <button onClick={this.appendNew}>Append New</button>
            </Fragment>
        );
    }
}
