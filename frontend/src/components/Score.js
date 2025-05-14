Here is an example of a simple Score component in React:

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Score.css';

/**
 * Score component
 * This component displays a score and has the functionality to update it.
 * @param {object} props - Component props
 * @param {number} props.initialScore - The initial score
 */
const Score = ({ initialScore }) => {
  const [score, setScore] = useState(initialScore);

  // Function to increment the score
  const incrementScore = () => setScore(score + 1);

  // Function to decrement the score
  const decrementScore = () => setScore(score - 1);

  return (
    <div className="score">
      <button onClick={decrementScore}>-</button>
      <span>{score}</span>
      <button onClick={incrementScore}>+</button>
    </div>
  );
};

// Prop types for the component
Score.propTypes = {
  initialScore: PropTypes.number,
};

// Default props for the component
Score.defaultProps = {
  initialScore: 0,
};

export default Score;
```

Here is a basic CSS module for the component:

```css
/* Score.css */
.score {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.score button {
  padding: 5px 10px;
  font-size: 18px;
  cursor: pointer;
}
```

Here is a basic unit test setup for the component using jest and @testing-library/react:

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Score from './Score';

test('renders Score and updates it correctly', () => {
  const { getByText } = render(<Score initialScore={10} />);

  const score = getByText(/10/i);
  const incrementButton = getByText(/\+/i);
  const decrementButton = getByText(/-/i);

  expect(score).toBeInTheDocument();

  fireEvent.click(incrementButton);
  expect(score).toHaveTextContent('11');

  fireEvent.click(decrementButton);
  expect(score).toHaveTextContent('10');
});
```