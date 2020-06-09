import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

it('render correctly with no props', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
});
