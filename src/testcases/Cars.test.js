import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cars from './../components/Cars';

const mockCar = {
  id: 1,
  name: 'Audi Cars',
  short_desc: 'Its has a good interior',
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
    expect(screen.getByAltText('Cars Images')).toBeInTheDocument();
    expect(screen.getByText('Audi Cars')).toBeInTheDocument();
    expect(screen.getByText('Its has a good interior')).toBeInTheDocument();
    expect(screen.getByText('Rs: 100')).toBeInTheDocument();
    const carDetailsLink = screen.getByRole('link', { name: 'Audi Cars' });
    expect(carDetailsLink).toHaveAttribute('href', '/cardetails/1');

    const confirmationLink = screen.getByRole('link', { name: 'Book My Rental' });
    expect(confirmationLink).toHaveAttribute('href', '/confirmation/1');
  });
});
