import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { Toolbar } from '../index';

it('renders correctly', () => {
    const tree = renderer
        .create(
            <BrowserRouter>
                <Toolbar />
            </BrowserRouter>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
