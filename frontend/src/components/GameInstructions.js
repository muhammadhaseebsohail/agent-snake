Sure, here's a simple React component which displays some gameplay instructions:

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import './GameInstructions.css';

/**
 * GameInstructions - A component to display game instructions.
 *
 * @param  {object} props The properties object.
 * @param  {string} props.instructions The game instructions.
 * @return {React.Element} The rendered component.
 */
const GameInstructions = ({ instructions }) => (
  <div className="game-instructions">
    <h2>Game Instructions</h2>
    <p>{instructions}</p>
  </div>
);

GameInstructions.propTypes = {
  instructions: PropTypes.string.isRequired,
};

export default GameInstructions;
```

And here is the CSS for this component using CSS modules:

```css
/* GameInstructions.css */
.game-instructions {
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.game-instructions h2 {
  margin: 0 0 1em;
  font-size: 1.5em;
}

.game-instructions p {
  margin: 0;
}
```

This component uses PropTypes to ensure that the `instructions` prop is always a string.

Here's a simple unit test setup for the component:

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import GameInstructions from './GameInstructions';

test('renders game instructions', () => {
  const { getByText } = render(<GameInstructions instructions="Test instructions" />);
  const instructionsElement = getByText(/Test instructions/i);
  expect(instructionsElement).toBeInTheDocument();
});
```

In this unit test we use Jest and the React Testing Library to render the component and then assert that the instructions text is present in the document.