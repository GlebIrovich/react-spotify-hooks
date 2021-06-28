import { render } from '@testing-library/react';

import ReactSpotifyHooks from './react-spotify-hooks';

describe('ReactSpotifyHooks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactSpotifyHooks />);
    expect(baseElement).toBeTruthy();
  });
});
