import React from 'react';
import renderer from 'react-test-renderer';

import { ReportsList } from '../index';

it('renders correctly', () => {
    const tree = renderer.create(<ReportsList />).toJSON();
    expect(tree).toMatchSnapshot();
});
