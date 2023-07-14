import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Confirmation from './../components/Contirmation'
import { MemoryRouter } from 'react-router-dom';
import Thanksyou from '../components/Thanksyou';

describe('Thanksyou component', () => {
    it("renders Confirmation component", () => {
        render(<MemoryRouter><Thanksyou /></MemoryRouter>);
        expect(screen.getByText("Thank you")).toBeInTheDocument();
      });

});
