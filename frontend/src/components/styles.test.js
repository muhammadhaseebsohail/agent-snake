Here is a basic unit test setup for the SnakeController component using Jest and React Testing Library.

```jsx
import { render, fireEvent } from '@testing-library/react';
import SnakeController from './SnakeController';

describe('<SnakeController />', () => {
  it('renders without crashing', () => {
    const handleDirectionChange = jest.fn();
    render(<SnakeController onDirectionChange={handleDirectionChange}/>);
  });

  it('should call onDirectionChange with correct direction on arrow key press', () => {
    const handleDirectionChange = jest.fn();
    render(<SnakeController onDirectionChange={handleDirectionChange}/>);

    fireEvent.keyDown(window, { keyCode: 37 }); // left arrow
    expect(handleDirectionChange).toHaveBeenCalledWith('left');

    fireEvent.keyDown(window, { keyCode: 38 }); // up arrow
    expect(handleDirectionChange).toHaveBeenCalledWith('up');

    fireEvent.keyDown(window, { keyCode: 39 }); // right arrow
    expect(handleDirectionChange).toHaveBeenCalledWith('right');

    fireEvent.keyDown(window, { keyCode: 40 }); // down arrow
    expect(handleDirectionChange).toHaveBeenCalledWith('down');
  });

  it('should not call onDirectionChange on other key press', () => {
    const handleDirectionChange = jest.fn();
    render(<SnakeController onDirectionChange={handleDirectionChange}/>);

    fireEvent.keyDown(window, { keyCode: 65 }); // 'A' key
    expect(handleDirectionChange).not.toHaveBeenCalled();
  });
});
```

This test suite will test if the SnakeController component:
1. Renders without crashing
2. Calls the onDirectionChange prop with the correct direction when an arrow key is pressed
3. Does not call the onDirectionChange prop when a key other than an arrow key is pressed