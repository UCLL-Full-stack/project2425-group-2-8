import React from "react";
import { render, screen } from "@testing-library/react";
import LoginCredentials from "../components/users/loginCredentials";
import { useRouter } from "next/router"; 

jest.mock("next/router", () => ({
  useRouter: jest.fn(), 
}));

window.React = React;

//given
const users = [
  {
    id: 1,
    email: "duvel@moortgat.be",
    role: "admin",
    password: "666",
    profile: {
      id: 1,
      firstName: "Duvel",
      name: "Moortgat",
      dateOfBirth: "2000-01-01T00:00:00.000Z",
    },
  },
  {
    id: 2,
    email: "la@chouffe.be",
    role: "admin",
    password: "999",
    profile: {
      id: 2,
      firstName: "La",
      name: "Chouffe",
      dateOfBirth: "2002-01-01T00:00:00.000Z",
    },
  },
];

test("given users - when you want to see the overview of all the users - then the users are rendered", async () => {
  //given
  (useRouter as jest.Mock).mockImplementation(() => ({
    push: jest.fn(),
  }));

  //when
  render(<LoginCredentials users={users} />);

  //then
  expect(screen.getByText("Duvel Moortgat"));
  expect(screen.getByText("La Chouffe"));
});
