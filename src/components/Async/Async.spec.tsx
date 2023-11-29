import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Async } from ".";

// it("renders correctly", () => {
//   render(<Async />);

//   expect(screen.getByText("Hello World")).toBeInTheDocument();

// fails because it didn't wait for the button to render yet.
//   expect(screen.getByText("Button")).toBeInTheDocument();
// });

// findByText - Components
// it("renders correctly", async () => {
//   render(<Async />);

//   expect(screen.getByText("Hello World")).toBeInTheDocument();
//   expect(await screen.findByText("Button")).toBeInTheDocument();

//   // expect(await screen.findByText("Button", {}, {timeout: 2000})).toBeInTheDocument();
// });

// waitFor - anything
// it("renders correctly", async () => {
//   render(<Async />);

//     expect(screen.getByText("Hello World")).toBeInTheDocument();

//   await waitFor(() => {
//     return expect(screen.getByText("Button")).toBeInTheDocument();
//   });
// });

// waitForElementToBeRemoved - to check if the element has been removed.
it("renders correctly", async () => {
  render(<Async />);

  screen.logTestingPlaygroundURL();

  expect(screen.getByText("Hello World")).toBeInTheDocument();

  await waitForElementToBeRemoved(screen.queryByText("Button"));
});

// methods screen
// get - synchronous (Does not wait for the elements to be rendered on the screen and fails the test )
// query - synchronous (Does not wait for the elements to be rendered on the screen and does not fail the test )
// find - asynchronous (keep watching to see if this element will appear at some point and the tests fails if is not found)
