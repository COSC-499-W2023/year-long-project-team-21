import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SelectRangeBar from '../src/components/SelectRangeBar';

describe('SelectRangeBar', () => {
 
  it('renders without crashing', () => {
    const { getByTestId } = render(<SelectRangeBar onSelectRange={() => {}} />);
    const placeholderText = getByTestId('select-radius-dropdown');
    expect(placeholderText).toBeTruthy();
  });


});


//*************Testing seems Officially not supported for dropdown picker compoenmt*/