import React from 'react';
import { storiesOf } from '@storybook/react';

import StatefulUl from './components/StatefulUl';

const items = [
    'First'
]

storiesOf('Unordered List', module)
    .add('default', () => (
        <StatefulUl 
            items={items}
        />
    ));