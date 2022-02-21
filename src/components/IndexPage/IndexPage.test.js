import React from 'react';
import '@testing-library/jest-dom';
import IndexPage from './IndexPage';
import { render, screen, waitFor } from '@testing-library/react';

describe('IndexPage', () => {
  beforeEach(() => {
    render(<IndexPage />);
  });

  it('renders title', () => {
    const { getByRole } = screen;
    expect(
      getByRole('heading', { name: /Lord of the Rings Character Index/i })
    ).toBeInTheDocument();
  });

  it('renders logo image', () => {
    const { getByRole } = screen;

    expect(getByRole('img', { name: /logo/i })).toBeInTheDocument();
  });

  it('renders loading text', () => {
    const { getByText } = screen;

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  describe('when api resolves', () => {
    it('stops loading and renders filter and sort options', async () => {
      await waitFor(() => {
        expect(screen.queryByText('Loading...')).toBeFalsy();
        expect(
          screen.getByRole('combobox', { name: /Category/i })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('combobox', { name: /Order by/i })
        ).toBeInTheDocument();
      });
    });
  });
});
