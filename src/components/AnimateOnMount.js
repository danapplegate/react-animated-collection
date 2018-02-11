// libraries
import React, { Component } from 'react';

const transitionStyle = 'opacity 0.25s ease';

const initStyles = {
    opacity: '0.01',
    transition: transitionStyle
};

const hideStyles = {
    opacity: '0',
    transition: transitionStyle
};

const showStyles = {
    opacity: '1',
    transition: transitionStyle
};

export default class AnimateOnMount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            style: initStyles
        };
        
        this.transitionEnd = this.transitionEnd.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState(state => ({ 
                ...state,
                style: state.visible ? showStyles : hideStyles
            }));
        }, 10);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps fired');
        console.log(nextProps);
        if (!nextProps.visible) {
            this.setState(state => ({
                ...state,
                style: hideStyles
            }));
        }
    }

    transitionEnd() {
        if (!this.props.visible) {
            this.setState(state => ({
                ...state,
                visible: false
            }));
        }
    }

    render() {
        console.log('render fired');
        console.log(this.state);
        return this.state.visible && (
            <div style={{ ...this.state.style }} onTransitionEnd={this.transitionEnd}>
                { React.Children.only(this.props.children) }
            </div>
        );
    }
}