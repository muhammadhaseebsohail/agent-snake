Here's a basic implementation of a Game Restart button in React:

1. The complete component code

```jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * A button component to restart a game.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {function} props.onRestart - The function to execute when the restart button is clicked.
 * @returns {React.Element} The rendered React element.
 */
function RestartButton({ onRestart }) {
  return (
    <button className="restart-button" onClick={onRestart}>
      Restart Game
    </button>
  );
}

export default RestartButton;
```

2. Any necessary CSS/styling

```css
.restart-button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
```

3. PropTypes or TypeScript interfaces

```jsx
RestartButton.propTypes = {
  onRestart: PropTypes.func.isRequired,
};
```

4. Basic unit test setup

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RestartButton from './RestartButton';

test('calls onRestart prop when clicked', () => {
  const onRestart = jest.fn();
  const { getByText } = render(<RestartButton onRestart={onRestart} />);

  fireEvent.click(getByText('Restart Game'));

  expect(onRestart).toHaveBeenCalledTimes(1);
});
```

In this setup, the `RestartButton` component simply takes a function `onRestart` as a prop, which it calls when the button is clicked. This allows the parent component to define what happens when the game is restarted. The button is styled with CSS for a basic, clean look. The component's prop types are defined using the `prop-types` library to enforce the type of the `onRestart` prop. Finally, a basic unit test checks that the `onRestart` function is called when the button is clicked.