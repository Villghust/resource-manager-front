import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { Link } from '../index';

it('renders correctly', () => {
    const tree = renderer
        .create(
            <BrowserRouter>
                <Link to="/reports">Relatórios</Link>
            </BrowserRouter>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
