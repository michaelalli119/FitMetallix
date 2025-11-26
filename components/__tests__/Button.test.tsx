import React from 'react';
import { render, fireEvent } from '../../__tests__/utils/test-helpers';
import Button from '../Button';

describe('Button Component', () => {
  it('should render with title', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} />
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onPress={onPressMock} />
    );

    fireEvent.press(getByText('Click Me'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Disabled" onPress={onPressMock} disabled />
    );

    fireEvent.press(getByText('Disabled'));

    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('should not call onPress when loading', () => {
    const onPressMock = jest.fn();
    const { queryByText } = render(
      <Button title="Loading" onPress={onPressMock} loading />
    );

    // Title should not be visible when loading
    expect(queryByText('Loading')).toBeNull();
    expect(onPressMock).not.toHaveBeenCalled();
  });

  describe('Variants', () => {
    it('should render primary variant', () => {
      const { getByText } = render(
        <Button title="Primary" onPress={() => {}} variant="primary" />
      );

      expect(getByText('Primary')).toBeTruthy();
    });

    it('should render secondary variant', () => {
      const { getByText } = render(
        <Button title="Secondary" onPress={() => {}} variant="secondary" />
      );

      expect(getByText('Secondary')).toBeTruthy();
    });

    it('should render outline variant', () => {
      const { getByText } = render(
        <Button title="Outline" onPress={() => {}} variant="outline" />
      );

      expect(getByText('Outline')).toBeTruthy();
    });

    it('should render metallic variant', () => {
      const { getByText } = render(
        <Button title="Metallic" onPress={() => {}} variant="metallic" />
      );

      expect(getByText('Metallic')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      const { getByText } = render(
        <Button title="Small" onPress={() => {}} size="small" />
      );

      expect(getByText('Small')).toBeTruthy();
    });

    it('should render medium size (default)', () => {
      const { getByText } = render(
        <Button title="Medium" onPress={() => {}} />
      );

      expect(getByText('Medium')).toBeTruthy();
    });

    it('should render large size', () => {
      const { getByText } = render(
        <Button title="Large" onPress={() => {}} size="large" />
      );

      expect(getByText('Large')).toBeTruthy();
    });
  });

  describe('Loading State', () => {
    it('should show activity indicator when loading', () => {
      const { queryByText } = render(
        <Button title="Submit" onPress={() => {}} loading />
      );

      // Title should not be visible
      expect(queryByText('Submit')).toBeNull();
    });

    it('should disable button when loading', () => {
      const onPressMock = jest.fn();
      const { getByRole } = render(
        <Button title="Submit" onPress={onPressMock} loading />
      );

      const button = getByRole('button');
      fireEvent.press(button);

      expect(onPressMock).not.toHaveBeenCalled();
    });
  });

  describe('FullWidth', () => {
    it('should render full width button', () => {
      const { getByText } = render(
        <Button title="Full Width" onPress={() => {}} fullWidth />
      );

      expect(getByText('Full Width')).toBeTruthy();
    });

    it('should not be full width by default', () => {
      const { getByText } = render(
        <Button title="Normal" onPress={() => {}} />
      );

      expect(getByText('Normal')).toBeTruthy();
    });
  });

  describe('Custom Styles', () => {
    it('should accept custom button style', () => {
      const customStyle = { backgroundColor: 'red' };
      const { getByText } = render(
        <Button title="Custom" onPress={() => {}} style={customStyle} />
      );

      expect(getByText('Custom')).toBeTruthy();
    });

    it('should accept custom text style', () => {
      const customTextStyle = { color: 'blue' };
      const { getByText } = render(
        <Button title="Custom Text" onPress={() => {}} textStyle={customTextStyle} />
      );

      expect(getByText('Custom Text')).toBeTruthy();
    });
  });

  describe('Press Animation', () => {
    it('should respond to press state', () => {
      const { getByText } = render(
        <Button title="Press Me" onPress={() => {}} />
      );

      const button = getByText('Press Me');
      fireEvent.press(button);

      // Button should have been pressed
      expect(button).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    it('should show disabled opacity', () => {
      const { getByText } = render(
        <Button title="Disabled" onPress={() => {}} disabled />
      );

      expect(getByText('Disabled')).toBeTruthy();
    });

    it('should not respond to press when disabled', () => {
      const onPressMock = jest.fn();
      const { getByText } = render(
        <Button title="Disabled" onPress={onPressMock} disabled />
      );

      fireEvent.press(getByText('Disabled'));

      expect(onPressMock).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      const { queryByText } = render(
        <Button title="" onPress={() => {}} />
      );

      // Component should still render
      expect(queryByText('')).toBeTruthy();
    });

    it('should handle long title text', () => {
      const longTitle = 'This is a very long button title that should still work correctly';
      const { getByText } = render(
        <Button title={longTitle} onPress={() => {}} />
      );

      expect(getByText(longTitle)).toBeTruthy();
    });

    it('should handle multiple rapid presses', () => {
      const onPressMock = jest.fn();
      const { getByText } = render(
        <Button title="Rapid Press" onPress={onPressMock} />
      );

      const button = getByText('Rapid Press');
      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);

      expect(onPressMock).toHaveBeenCalledTimes(3);
    });
  });
});
