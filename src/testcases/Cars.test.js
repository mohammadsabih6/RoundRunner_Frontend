import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cars from './../components/Cars';

const mockCar = {
  id: 1,
  name: 'Test Car',
  short_desc: 'Test description',
  rental_fee: 100,
  image_link: 'test-image-link.jpg',
};

describe('Cars Component', () => {
  test('renders car details correctly', () => {
    render(
      <MemoryRouter>
        <Cars item={mockCar} />
      </MemoryRouter>
    );

    // Check if the car details are rendered correctly
    expect(screen.getByAltText('Cars Images')).toBeInTheDocument();
    expect(screen.getByText('Test Car')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Rs: 100')).toBeInTheDocument();

    // Check if the link to car details page is present
    const carDetailsLink = screen.getByRole('link', { name: 'Test Car' });
    expect(carDetailsLink).toHaveAttribute('href', '/cardetails/1');

    // Check if the link to the confirmation page is present
    const confirmationLink = screen.getByRole('link', { name: 'Book My Rental' });
    expect(confirmationLink).toHaveAttribute('href', '/confirmation/1');
  });

  // You can write more test cases for different scenarios if needed
});
