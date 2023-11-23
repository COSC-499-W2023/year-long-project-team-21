import {hello} from '../../src/common/utils'

describe('printHelloWorld', () => {
    it('prints "Hello, World!" to the console', () => {
      // Mock console.log
      const consoleSpy = jest.spyOn(console, 'log');
  
      // Call the function
      hello();
  
      // Check if console.log was called with the right argument
      expect(consoleSpy).toHaveBeenCalledWith("Hello, World!");
  
      // Restore the original console.log function to avoid side effects
      consoleSpy.mockRestore();
    });
  });