Here is a simple example of a reusable and maintainable React functional component. This component is a Button component, which can be reused in different parts of an application. The component accepts text, onClick function, and additional classNames as props. It uses CSS modules for styling.

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

/**
 * Button component
 * @param {object} props - component arguments
 * @param {string} props.text - button text
 * @param {function} [props.onClick] - click handler
 * @param {string} [props.className] - additional CSS classes
 * @returns {React.Element}
 */
const Button = ({ text, onClick, className }) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};

Button.defaultProps = {
  onClick: () => {},
  className: ''
};

export default Button;
```

CSS (Button.module.css):

```css
.button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #ddd;
}
```

Test (Button.test.js):

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

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
```
The component is clean and intuitive, with clear PropTypes for easy understanding of the expected inputs. The CSS module ensures styles are scoped to the component, preventing conflicts with styles from different parts of the application. The tests ensure the button is rendering correctly and the onClick function is working as expected.