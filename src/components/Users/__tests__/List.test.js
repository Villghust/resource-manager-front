import React from 'react';
import renderer from 'react-test-renderer';

import { ListUsers } from '../list';

it('renders correctly', () => {
    const tree = renderer.create(<ListUsers />).toJSON();
    expect(tree).toMatchSnapshot();
});
