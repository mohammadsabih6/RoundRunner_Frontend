// import React from 'react';
// import { render, screen, act } from '@testing-library/react';
// import CarsList from './../components/CarsList';
// import { MemoryRouter } from 'react-router-dom';

// const mockCarsList = [
//   {
//     id: 1,
//     name: 'Car 1',
//     short_desc: 'Description 1',
//     rental_fee: 100,
//     image_link: 'car1.jpg',
//   },
//   {
//     id: 2,
//     name: 'Car 2',
//     short_desc: 'Description 2',
//     rental_fee: 200,
//     image_link: 'car2.jpg',
//   },
// ];

// // Mock the fetch function to return the mockCarsList
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve(mockCarsList),
//   })
// );

// describe('CarsList Component', () => {
//   test('renders list of cars correctly', async () => {
//     await act(async () => {
//       render(
//         <MemoryRouter>
//           <CarsList />
//         </MemoryRouter>
//       );
//     });

//     // Check if the car details are rendered correctly
//     expect(screen.getByText('Car 1')).toBeInTheDocument();
//     expect(screen.getByText('Description 1')).toBeInTheDocument();
//     expect(screen.getByText('Rs: 100')).toBeInTheDocument();
//     expect(screen.getByAltText('Cars Images')).toBeInTheDocument();

//     expect(screen.getByText('Car 2')).toBeInTheDocument();
//     expect(screen.getByText('Description 2')).toBeInTheDocument();
//     expect(screen.getByText('Rs: 200')).toBeInTheDocument();
//     expect(screen.getByAltText('Cars Images')).toBeInTheDocument();
//   });

//   // You can write more test cases for different scenarios if needed
// });
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import CarsList from './../components/CarsList';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

const mockCarsList = [
  {
    id: 1,
    name: 'Car 1',
    short_desc: 'Description 1',
    rental_fee: 100,
    image_link: 'car1.jpg',
  },
  {
    id: 2,
    name: 'Car 2',
    short_desc: 'Description 2',
    rental_fee: 200,
    image_link: 'car2.jpg',
  },
];

// Mock the fetch function using jest-fetch-mock
fetchMock.enableMocks();
fetchMock.mockResponseOnce(JSON.stringify(mockCarsList));

describe('CarsList Component', () => {
  test('renders list of cars correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <CarsList />
        </MemoryRouter>
      );
    });

    // Check if the car details are rendered correctly
    expect(screen.getByText('Car 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Rs: 100')).toBeInTheDocument();
    expect(screen.getByAltText('Cars Images')).toBeInTheDocument();

    expect(screen.getByText('Car 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('Rs: 200')).toBeInTheDocument();
    expect(screen.getByAltText('Cars Images')).toBeInTheDocument();
  });

  // You can write more test cases for different scenarios if needed
});
