import { renderHook } from '@testing-library/react-native';
import { useFrameworkReady } from '../useFrameworkReady';

describe('useFrameworkReady', () => {
  beforeEach(() => {
    // Reset the mock before each test
    (global.window.frameworkReady as jest.Mock).mockClear();
  });

  it('should call window.frameworkReady on mount', () => {
    renderHook(() => useFrameworkReady());

    expect(window.frameworkReady).toHaveBeenCalledTimes(1);
  });

  it('should only call window.frameworkReady once', () => {
    const { rerender } = renderHook(() => useFrameworkReady());

    // Rerender the hook
    rerender();
    rerender();

    // Should still only be called once due to empty dependency array
    expect(window.frameworkReady).toHaveBeenCalledTimes(1);
  });

  it('should not throw error if window.frameworkReady is undefined', () => {
    // Temporarily remove frameworkReady
    const original = window.frameworkReady;
    delete (window as any).frameworkReady;

    expect(() => {
      renderHook(() => useFrameworkReady());
    }).not.toThrow();

    // Restore
    window.frameworkReady = original;
  });

  it('should handle frameworkReady throwing an error gracefully', () => {
    // Mock frameworkReady to throw an error
    const errorFn = jest.fn(() => {
      throw new Error('Test error');
    });
    window.frameworkReady = errorFn;

    // This should throw because the function itself throws
    expect(() => {
      renderHook(() => useFrameworkReady());
    }).toThrow('Test error');

    expect(errorFn).toHaveBeenCalled();
  });
});
