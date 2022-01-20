import React from 'react';
import Home from '../../pages';
import { render } from '../utils';

describe(`Home`, () => {
  it(`show home page`, () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
