The task description is a bit unclear in terms of the context in which the component should be created. It appears to be about a "Snake" game. I will create a simple example of direction control logic for a hypothetical Snake game. 

1. The complete component code

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ArrowKeysReact = ({ onChange }) => {
  const [direction, setDirection] = useState('Right');

  const handleKeydown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'Down') {
          onChange('Up');
          setDirection('Up');
        }
        break;
      case 'ArrowDown':
        if (direction !== 'Up') {
          onChange('Down');
          setDirection('Down');
        }
        break;
      case 'ArrowLeft':
        if (direction !== 'Right') {
          onChange('Left');
          setDirection('Left');
        }
        break;
      case 'ArrowRight':
        if (direction !== 'Left') {
          onChange('Right');
          setDirection('Right');
        }
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [direction]);

  return null;
};

ArrowKeysReact.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ArrowKeysReact;
```
2. Any necessary CSS/styling

Since this component doesn't render anything, no styling is required.

3. PropTypes or TypeScript interfaces

```jsx
ArrowKeysReact.propTypes = {
  onChange: PropTypes.func.isRequired,
};
```

4. Basic unit test setup

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import ArrowKeysReact from './ArrowKeysReact';

test('handles arrow keys properly', () => {
  const onChange = jest.fn();
  render(<ArrowKeysReact onChange={onChange} />);
  const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
  window.dispatchEvent(event);
  expect(onChange).toHaveBeenCalledWith('Up');
});
```

The ArrowKeysReact component is a React Hook that listens to arrow key press events and calls the `onChange` callback with the new direction if it's not the opposite of the current direction. This prevents the snake from moving in the opposite direction immediately.