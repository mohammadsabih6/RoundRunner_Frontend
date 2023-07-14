import { render } from "@testing-library/react";
import Cardetails from "./../components/Cardetails";

const mockCar = {
    id: 1,
    name: "Car 1",
    image_link: "https://cars/cars.jpg",
    short_desc: "Petrol Avg",
    long_desc: "Its an expensive",
    rental_fee: 10000,
};

test("renders loading message when car is null", () => {
  const { getByText } = render(<Cardetails />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const loadingText = getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();
});
  