import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CharacterTileMemoized } from './CharacterTile';

describe('CharacterTile', () => {
  const name = 'testName';
  const category = 'testCategory';
  const description = 'testDescription';
  const avatar = 'testImage.jpg';
  const significanceIndex = 1;

  const renderComponent = () => {
    render(
      <CharacterTileMemoized
        name={name}
        category={category}
        description={description}
        avatar={avatar}
        significanceIndex={significanceIndex}
      />
    );
  };

  beforeEach(() => {
    renderComponent();
  });

  it('renders with the name argument from props', () => {
    expect(
      screen.getByRole('heading', { name: /testName/i })
    ).toBeInTheDocument();
  });

  it('renders with the category argument from props', () => {
    expect(screen.getByText('testCategory')).toBeInTheDocument();
  });

  it('renders with the description argument from props', () => {
    expect(screen.getByText('testDescription')).toBeInTheDocument();
  });

  it('renders with the image argument from props', () => {
    const image = screen.getByRole('img', { name: /testName/i });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/characters/testImage.jpg');
  });
});
