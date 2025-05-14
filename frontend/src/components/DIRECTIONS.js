Below is an example of how you might implement a snake movement game using React and JavaScript. For simplicity, this example uses a 10x10 grid and moves the snake one square at a time in the direction specified by the arrow keys.

```jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SnakeMovement.css';

const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
}

const SnakeMovement = ({ gridSize }) => {
    const [snake, setSnake] = useState([{x: 0, y: 0}]);
    const [direction, setDirection] = useState(DIRECTIONS.RIGHT);

    // Moves the snake in the current direction
    const moveSnake = () => {
        const newSnake = [...snake];
        const head = { ...newSnake[0] }; // new head position
        head.x += direction.x;
        head.y += direction.y;
        newSnake.unshift(head);
        newSnake.pop(); // remove tail
        setSnake(newSnake);
    }

    useEffect(() => {
        const interval = setInterval(moveSnake, 200);
        return () => clearInterval(interval);
    }, [snake, direction]);

    // Update direction based on key press
    const handleKeyDown = (ev) => {
        const newDirection = getDirectionFromKeyCode(ev.keyCode);
        if (newDirection) {
            setDirection(newDirection);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="grid">
            {Array(gridSize).fill().map((_, i) =>
                Array(gridSize).fill().map((_, j) =>
                    <div className={`cell ${isSnakeCell(i, j) ? 'snake-cell' : ''}`} />
                )
            )}
        </div>
    );
}

const getDirectionFromKeyCode = (keyCode) => {
    switch (keyCode) {
        case 37: return DIRECTIONS.LEFT;
        case 38: return DIRECTIONS.UP;
        case 39: return DIRECTIONS.RIGHT;
        case 40: return DIRECTIONS.DOWN;
        default: return null;
    }
}

SnakeMovement.propTypes = {
    gridSize: PropTypes.number.isRequired
}

export default SnakeMovement;
```

CSS:

```css
.grid {
    display: flex;
    flex-wrap: wrap;
    width: 300px;
}

.cell {
    width: 30px;
    height: 30px;
    border: 1px solid #000;
}

.snake-cell {
    background: #000;
}
```

The component uses two `useEffect` hooks: one for moving the snake and another for handling key presses. The interval for moving the snake is cleared when the component is unmounted to prevent memory leaks.

Test:

```jsx
import { render, fireEvent } from '@testing-library/react';
import SnakeMovement from './SnakeMovement';

test('changes direction when arrow keys are pressed', () => {
    const { container } = render(<SnakeMovement gridSize={10} />);
    fireEvent.keyDown(container, { key: 'ArrowRight', code: 'ArrowRight' });
    // Check the state or effect of the key press
});
```