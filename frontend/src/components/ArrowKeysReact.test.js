You've already provided a basic unit test setup for the ArrowKeysReact component. But I would add some more tests to make sure that the component handles all arrow keys properly and doesn't allow the snake to move in the opposite direction immediately.

Here is the updated test:

```jsx
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ArrowKeysReact from './ArrowKeysReact';

describe('<ArrowKeysReact />', () => {
  let onChange;
  beforeEach(() => {
    onChange = jest.fn();
    render(<ArrowKeysReact onChange={onChange} />);
  });

  it('handles arrow keys properly', () => {
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith('Up');

    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalledWith('Down');

    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith('Left');

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('Right');
  });

  it('does not allow the snake to move in the opposite direction immediately', () => {
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalledWith('Up');
    expect(onChange).not.toHaveBeenCalledWith('Down');
  });
});
```

This test suite first checks if the `onChange` callback is correctly called with the new direction when an arrow key is pressed. Then it checks if the component correctly prevents the snake from moving in the opposite direction immediately. 

These tests are using Jest and React Testing Library.