To generate a basic unit test for the GameRequirements component, we are going to use Jest and React Testing Library.

Here is the test:

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import GameRequirements from './GameRequirements';

describe('GameRequirements', () => {
  test('renders GameRequirements component', () => {
    render(<GameRequirements requirements={["8GB RAM", "2GB VRAM", "50GB Storage"]} />);

    expect(screen.getByText('Game Requirements:')).toBeInTheDocument();
    expect(screen.getByText('8GB RAM')).toBeInTheDocument();
    expect(screen.getByText('2GB VRAM')).toBeInTheDocument();
    expect(screen.getByText('50GB Storage')).toBeInTheDocument();
  });

  test('renders no requirements message when there are no requirements', () => {
    render(<GameRequirements requirements={[]} />);

    expect(screen.getByText('No requirements provided.')).toBeInTheDocument();
  });
});
```

This will test two scenarios:

1. When the GameRequirements component is rendered with a set of requirements, it should display all of them.
2. When the GameRequirements component is rendered with an empty array, it should display a message stating "No requirements provided.".

Note: In order to test the second scenario, you would need to add a conditional rendering in the GameRequirements component to display the message "No requirements provided." when there are no requirements.