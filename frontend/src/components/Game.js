Here's a simple example of how you might implement this game logic in React with hooks. This component represents a game where the player's score increases whenever they "eat" a piece of food.

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Game.css';

/**
 * This component represents a simple game where the player can "eat" food to increase their score.
 *
 * @param {object} props The component's props.
 * @param {number} props.startingFood The amount of food the player starts with.
 */
const Game = ({ startingFood }) => {
  const [score, setScore] = useState(0);
  const [food, setFood] = useState(startingFood);

  // This function is called when the player clicks the "Eat" button.
  const eatFood = () => {
    if (food > 0) {
      setScore(score + 1);
      setFood(food - 1);
    } else {
      alert('No more food left!');
    }
  };

  return (
    <div className="game">
      <p>Score: {score}</p>
      <p>Food left: {food}</p>
      <button onClick={eatFood}>Eat</button>
    </div>
  );
};

Game.propTypes = {
  startingFood: PropTypes.number.isRequired,
};

export default Game;
```

Here's the CSS file for the Game component:

```css
/* Game.css */

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.button {
  margin-top: 20px;
}
```

For the unit test, you might test that clicking the "Eat" button increases the score and decreases the food count:

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Game from './Game';

test('clicking "Eat" button increases score and decreases food', () => {
  const { getByText } = render(<Game startingFood={5} />);
  
  fireEvent.click(getByText('Eat'));
  
  expect(getByText('Score: 1')).toBeInTheDocument();
  expect(getByText('Food left: 4')).toBeInTheDocument();
});
```