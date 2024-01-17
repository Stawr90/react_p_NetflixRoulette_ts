import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import AppFooter from '../AppFooter';

describe('AppFooter Component', () => {
    test('footer element display', () => {
        render(<AppFooter/>);
        
        expect(screen.getByText(/netflixroulette/i)).toBeInTheDocument();
    });    
});