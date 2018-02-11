// libraries
import React, { Component, Fragment } from 'react';

import AnimateOnMount from './AnimateOnMount';

export default class AnimatedCollection extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            collectionMembersMap: this.indexChildrenByKey(props.children),
            removedMemberKeys: []
        };
    }

    indexChildrenByKey(children) {
        const childMap = {};
        React.Children.forEach(children, child => {
            childMap[child.key] = child;
        });
        return childMap;
    }

    componentWillReceiveProps(nextProps) {
        const nextChildrenMap = this.indexChildrenByKey(nextProps.children);
        const nextChildrenKeys = Object.keys(nextChildrenMap);
        this.setState(state => {
            const cleanedNewMembersEntries = Object.entries(state.collectionMembersMap)
                .filter(([ key, element ]) => !state.removedMemberKeys.includes(key));
            const cleanedNewMembers = cleanedNewMembersEntries.reduce((prevValue, [ key, element ]) => ({
                ...prevValue,
                [key]: element
            }), {});
            return {
                collectionMembersMap: {
                    ...cleanedNewMembers,
                    ...nextChildrenMap
                },
                removedMemberKeys: Object.keys(cleanedNewMembers).filter(key => {
                    return !nextChildrenKeys.includes(key);
                })
            };
        });
    }

    render() {
        return (
            <Fragment>
                { React.Children.map(Object.values(this.state.collectionMembersMap), child => (
                    <AnimateOnMount visible={!this.state.removedMemberKeys.includes(child.key)} key={child.key}>
                        {child}
                    </AnimateOnMount>
                ))}
            </Fragment>
        );
    }
}