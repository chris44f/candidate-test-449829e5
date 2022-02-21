import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { CharacterList } from './CharacterList';

describe('CharacterList', () => {
  const mockCharactersArray = [
    {
      name: 'Arwen Evenstar',
      category: 'elf',
      description:
        'Daughter of Elrond. She forsakes her elven immortality to betroth herself to Aragorn, although her father will not allow them to marry unless Aragorn reclaims the throne of Gondor. Other names: Undómiel.',
      significanceIndex: 14,
      avatar: 'arwen_evenstar.jpg',
    },
    {
      name: 'Galadriel',
      category: 'elf',
      description:
        "Lady of the Golden Wood of Lothlórien, Galadriel rules one of the last elven strongholds in Middle-earth. Very old and very wise, she gives the Fellowship shelter and advice after Gandalf's fall. Her parting gifts to each member of the Fellowship become immensely significant.",
      significanceIndex: 15,
      avatar: 'galadriel.jpg',
    },
    {
      name: 'Saruman the White',
      category: 'wizard',
      description:
        "The head of the order of wizards. Although he was once the wisest, lust for power has led him to side with Sauron. The magic of his voice can seduce or overwhelm the will of most men. Saruman is obsessed with machinery, cutting down forests to fuel his engines and forges. He hopes to take the Ring for himself and take Sauron's place as Lord of the Rings. Other names: Saruman the Wise, Saruman of Many Colors, the Voice, Sharkey.",
      significanceIndex: 16,
      avatar: 'saruman_the_white.jpg',
    },
    {
      name: 'Éomer',
      category: 'human',
      description:
        "Son of Éomund. Nephew of Théoden (King of Rohan) and Éowyn's brother. Third Marshall of the Riddermark. Loyal captain of the horselords and a valiant warrior. He suspects Wormtongue's treachery.",
      significanceIndex: 17,
      avatar: 'eomer.jpg',
    },
  ];

  beforeEach(() => {
    render(<CharacterList characters={mockCharactersArray} />);
  });

  it('renders the filter dropdown and category options', () => {
    const { getByRole } = screen;

    expect(getByRole('combobox', { name: /Category/i })).toBeInTheDocument();
    expect(getByRole('option', { name: /Filter by.../i })).toBeInTheDocument();
    expect(getByRole('option', { name: /Human/i })).toBeInTheDocument();
    expect(getByRole('option', { name: /Wizard/i })).toBeInTheDocument();
    expect(getByRole('option', { name: /Elf/i })).toBeInTheDocument();
  });

  it('renders the sort dropdown and category options', () => {
    const { getByRole } = screen;

    expect(getByRole('combobox', { name: /Order by/i })).toBeInTheDocument();
    expect(
      getByRole('option', { name: /Alphabetically \(A to Z\)/i })
    ).toBeInTheDocument();
    expect(
      getByRole('option', { name: /Alphabetically \(Z to A\)/i })
    ).toBeInTheDocument();
    expect(
      getByRole('option', { name: /Significance \(Low to High\)/i })
    ).toBeInTheDocument();
    expect(
      getByRole('option', { name: /Significance \(High to Low\)/i })
    ).toBeInTheDocument();
  });

  it('renders the four character tiles, one for each character in the array props argument ', () => {
    const { getAllByRole, getByRole } = screen;

    expect(getAllByRole('img').length).toBe(4);
    expect(getAllByRole('heading', { level: 3 }).length).toBe(4);
    expect(
      getByRole('heading', { name: 'Arwen Evenstar' })
    ).toBeInTheDocument();
    expect(
      getByRole('heading', { name: 'Saruman the White' })
    ).toBeInTheDocument();
    expect(getByRole('heading', { name: 'Galadriel' })).toBeInTheDocument();
    expect(getByRole('heading', { name: 'Éomer' })).toBeInTheDocument();
  });

  describe('filtering characters', () => {
    it('only renders two character tiles if elf is selected from the dropdown', () => {
      const { getByRole, queryByRole, getAllByRole } = screen;
      const filterSelect = getByRole('combobox', {
        name: /Category/i,
      });

      userEvent.selectOptions(filterSelect, 'Elf');

      expect(getAllByRole('heading', { level: 3 }).length).toBe(2);
      expect(
        queryByRole('heading', { name: /Saruman the White/i })
      ).toBeFalsy();
      expect(queryByRole('heading', { name: /Éomer/i })).toBeFalsy();
    });

    it('renders all character tiles if "Filter by..." is selected from the dropdown', () => {
      const { getAllByRole } = screen;
      const filterSelect = screen.getByRole('combobox', {
        name: /Category/i,
      });

      userEvent.selectOptions(filterSelect, 'empty');

      expect(getAllByRole('heading', { level: 3 }).length).toBe(4);
    });
  });
});
