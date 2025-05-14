Your test setup is correct and covers the main functionality of the `RestartButton` component. Here is the same test setup for reference:

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RestartButton from './RestartButton';

describe('RestartButton', () => {
  it('calls onRestart prop when clicked', () => {
    const onRestart = jest.fn();
    const { getByText } = render(<RestartButton onRestart={onRestart} />);

    fireEvent.click(getByText('Restart Game'));

    expect(onRestart).toHaveBeenCalledTimes(1);
  });
});
```

In this unit test, we're using Jest as the test runner and React Testing Library for rendering the component and firing events.

We're rendering the `RestartButton` with a mock `onRestart` function passed as a prop. Then we're simulating a click event on the button and asserting that `onRestart` was called exactly once. This verifies that the component behaves correctly when the button is clicked. 

Remember that it's important to ensure your tests are isolated and don't have side effects that could affect other tests. Always clean up after each test if necessary.