Here is a basic implementation of a component that handles keyboard inputs for a snake game. This component uses the useState and useEffect hooks to manage state and lifecycle events. 

```jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// CSS-in-JS Styling
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
};

// This component is responsible to manage the keyboard inputs to control the snake movement
function SnakeController({ onDirectionChange }) {
  //initial direction is set to right
  const [direction, setDirection] = useState('right');

  // This effect will listen to keydown event
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.keyCode) {
        case 37:
          setDirection('left');
          break;
        case 38:
          setDirection('up');
          break;
        case 39:
          setDirection('right');
          break;
        case 40:
          setDirection('down');
          break;
        default:
          break;
      }
      onDirectionChange(direction);
    };

    window.addEventListener('keydown', handleKeyDown);

    // cleanup function will remove event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction, onDirectionChange]);

  return (
    <div style={styles.container}>
      Use arrow keys to control the snake movement
    </div>
  );
}

SnakeController.propTypes = {
  onDirectionChange: PropTypes.func.isRequired,
};

export default SnakeController;
```

For the PropTypes, we have:
```jsx
SnakeController.propTypes = {
  onDirectionChange: PropTypes.func.isRequired,
};
```

For the basic unit test setup, you can use Jest and Enzyme like this:
```jsx
import { shallow } from 'enzyme';
import SnakeController from './SnakeController';

describe('<SnakeController />', () => {
  it('renders without crashing', () => {
    shallow(<SnakeController onDirectionChange={() => {}} />);
  });
});
```
Remember to add the necessary packages to your project to run this test.