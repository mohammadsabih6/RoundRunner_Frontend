import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Confirmation from './../components/Contirmation'
import { MemoryRouter } from 'react-router-dom';

describe("Confirmation", () => {
    
    it("renders Confirmation component", () => {
      render(<MemoryRouter><Confirmation /></MemoryRouter>);
      expect(screen.getByText("Confirmation")).toBeInTheDocument();
    });
        test('renders the form fields', () => {
          render(<MemoryRouter><Confirmation /></MemoryRouter>);
          
          // Find form fields by their labels and check if they are in the document
          expect(screen.getByTestId("name")).toBeInTheDocument();
          expect(screen.getByTestId("phone")).toBeInTheDocument();
          expect(screen.getByTestId("address")).toBeInTheDocument();
          expect(screen.getByTestId("driverLicences")).toBeInTheDocument();
          expect(screen.getByTestId("rental")).toBeInTheDocument();
          expect(screen.getByTestId("insurance")).toBeInTheDocument();
          expect(screen.getByTestId("pickdate")).toBeInTheDocument();
          expect(screen.getByTestId("dropdate")).toBeInTheDocument();
          expect(screen.getByTestId("insured")).toBeInTheDocument();
          expect(screen.getByTestId("totalamount")).toBeInTheDocument();
          const submitButton = screen.getByText(/Submit/i);
          expect(submitButton).toBeInTheDocument();
        });
});