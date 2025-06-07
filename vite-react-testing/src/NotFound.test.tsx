import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NotFound } from './NotFound';

// test('renders header', () => {
//   render(<NotFound path="/abc" />);
//   const heading = screen.getByRole('heading', {
//     name: 'Page Not Found',
//   });
//   screen.debug(heading);
//   expect(heading).toBeInTheDocument();
// });

describe('<NotFound />', () => {
  it('renders header', () => {
    render(<NotFound path="/abc" />);
    const heading = screen.getByRole('heading', {
      name: 'Page Not Found',
    });
    // screen.debug(heading);
    expect(heading).toBeInTheDocument();
  });

  it('renders paragraph', () => {
    render(<NotFound path="/abc" />);
    const paragraph = screen.getByText(/^해당 페이지/);
    // screen.debug(paragraph);
    expect(paragraph).toHaveTextContent('해당 페이지(/abc)를 찾을 수 없습니다.');
  });

  it('renders image', () => {
    render(<NotFound path="/abc" />);
    const image = screen.getByAltText(/404/);
    // screen.debug(image);
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif');
  });
});
