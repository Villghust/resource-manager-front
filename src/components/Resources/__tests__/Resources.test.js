import React from 'react';
import renderer from 'react-test-renderer';

import { ListResources } from '../index';

it('renders correctly', () => {
    const tree = renderer.create(<ListResources />).toJSON();
    expect(tree).toMatchSnapshot();
});
