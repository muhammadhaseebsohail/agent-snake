Your test setup is already quite good, you've covered the basic functionality of the button component. Here are some additional tests for edge cases and prop types.

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

// Testing rendering and functionality
test('renders button with text', () => {
  const { getByText } = render(<Button text="Click me" />);
  const buttonElement = getByText(/Click me/i);
  expect(buttonElement).toBeInTheDocument();
});

test('triggers onClick function', () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Button text="Click me" onClick={handleClick} />);
  fireEvent.click(getByText(/Click me/i));
  expect(handleClick).toHaveBeenCalled();
});

// Test the button with additional className
test('renders button with additional className', () => {
  const { container } = render(<Button text="Click me" className="extra-class" />);
  expect(container.firstChild).toHaveClass('extra-class');
});

// Testing prop types
test('fails if text prop is not provided', () => {
  expect(() => {
    PropTypes.checkPropTypes(Button.propTypes, { onClick: jest.fn() }, 'prop', 'Button');
  }).toThrow();
});

test('fails if onClick is not a function', () => {
  expect(() => {
    PropTypes.checkPropTypes(Button.propTypes, { text: 'Click me', onClick: 'not a function' }, 'prop', 'Button');
  }).toThrow();
});

test('fails if className is not a string', () => {
  expect(() => {
    PropTypes.checkPropTypes(Button.propTypes, { text: 'Click me', className: {} }, 'prop', 'Button');
  }).toThrow();
});
```
These tests ensure that the button's rendering and onClick functionality continue to work as expected even with additional className prop. It also checks that the component throws an error when incorrect prop types are provided.