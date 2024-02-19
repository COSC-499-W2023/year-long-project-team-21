import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreen from '../../src/screens/SplashScreen';

// mock navigation
const mockNav = {
    navigate: jest.fn(), 
};

// clear all mocks before each run 
beforeEach(() => {
    jest.clearAllMocks(); 
});

describe("SplashScreen page tests", () => { 
    it("Should render the animation, gradient, icon, load indicator, and puns correctly if there are no exceptions", () => { 

        const { getByTestId, getByText } = render(<SplashScreen navigation={mockNav} />);
        
        const animeView = getByTestId("animation");
        const grad = getByTestId("gradient");
        const icon = getByTestId("icon");
        const loading = getByTestId("loading");
        const puns = getByTestId("text-pun");

        expect(animeView).toBeTruthy();
        expect(grad).toBeTruthy();
        expect(icon).toBeTruthy();
        expect(loading).toBeTruthy();
        expect(puns).toBeTruthy();
    })
})

