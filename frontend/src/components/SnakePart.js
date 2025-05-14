Here's a basic example of how you might structure your React components to render the snake and food items on the game board.

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import './GameBoard.css';

const SnakePart = ({ part }) => (
  <div className="snake-part" style={{ left: `${part.x}px`, top: `${part.y}px` }}></div>
);

SnakePart.propTypes = {
  part: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

const Food = ({ food }) => (
  <div className="food" style={{ left: `${food.x}px`, top: `${food.y}px` }}></div>
);

Food.propTypes = {
  food: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

const GameBoard = ({ snake, food }) => (
  <div className="game-board">
    {snake.parts.map((part, index) => <SnakePart key={index} part={part} />)}
    <Food food={food} />
  </div>
);

GameBoard.propTypes = {
  snake: PropTypes.shape({
    parts: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  food: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default GameBoard;
```

Here's the CSS you'd need to style the game board, the snake, and the food:

```css
/* GameBoard.css */

.game-board {
  position: relative;
  height: 500px;
  width: 500px;
  border: 1px solid black;
}

.snake-part, .food {
  position: absolute;
  height: 20px;
  width: 20px;
}

.snake-part {
  background-color: green;
}

.food {
  background-color: red;
}
```

And here's a basic unit test setup for the GameBoard component:

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import GameBoard from './GameBoard';

test('renders the game board with a snake and food', () => {
  const snake = { parts: [{ x: 100, y: 100 }, { x: 120, y: 100 }] };
  const food = { x: 200, y: 200 };

  const { getAllByRole } = render(<GameBoard snake={snake} food={food} />);

  const snakeParts = getAllByRole('snake-part');
  expect(snakeParts).toHaveLength(2);

  const foodItem = getAllByRole('food');
  expect(foodItem).toHaveLength(1);
});
```

Note: This is a very basic implementation and may not meet all the requirements of a full-featured snake game. For example, it doesn't handle the snake's movement or collision detection. However, it should give you a good starting point for building out the rest of the game.