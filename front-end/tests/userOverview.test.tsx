import React from "react"
import { render, screen } from '@testing-library/react'
import ProfileOverview from "../components/users/ProfileOverview"

window.React = React

//given 
const user = {
    id: 1,
        email: "duvel@moortgat.be",
        role: "admin",
        // password: "666",
        profile: {
            firstName: "Duvel",
            name: "Moortgat",
            dateOfBirth: "2000-01-01T00:00:00.000Z"
        }
};

test("given user - when you want to see the user's profile - then the user's profile is rendered", async () => {
    //when 
    render(<ProfileOverview user={user}/>)

    //then
    expect(screen.getByText(/Duvel Moortgat/))
    expect(screen.getByText(/duvel@moortgat.be/))
    expect(screen.getByText(/admin/))
    expect(screen.getByText(/Geboortedatum:\s*1\/1\/2000/))
})