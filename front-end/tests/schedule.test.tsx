import React from "react"
import { render, screen } from '@testing-library/react'
import ScheduleOverviewTable from "../components/users/ScheduleOverviewTable"
import WorkoutService from "@/services/WorkoutService"

window.React = React

//given
const duvel = {
    id: 1,
    email: "duvel@moortgat.be",
    password: "666",
    profile: {
        id: 1,
        firstName: "Duvel",
        name: "Moortgat",
        dateOfBirth: "2000-01-01T00:00:00.000Z"
    }
}

const chouffe = {
    id: 2,
    email: "la@chouffe.be",
    password: "999",
    profile: {
        id: 2,
        firstName: "La",
        name: "Chouffe",
        dateOfBirth: "2002-01-01T00:00:00.000Z"
    }
}
const users = [duvel, chouffe]

const workouts = [
    {
        id: 1,
        subject: "legs",
        date: "2025-12-25T00:00:00.000Z",
        users: [
            duvel
        ]
    }, 
    {
        id: 2,
        subject: "chest",
        date: "2025-12-27T00:00:00.000Z",
        users: [
            duvel,
            chouffe
        ]
    }
]

let scheduleService: jest.Mock
scheduleService = jest.fn()

test('given workouts - when you want to see the overview of a users workout - then the workouts are rendered', async () => {
    //given 
    WorkoutService.getWorkoutsByUserId = scheduleService.mockResolvedValue(workouts)
    
    //when 
    render(<ScheduleOverviewTable users={users}/>)

    //then
    expect(screen.getByText("legs"))
    expect(screen.getByText("chest"))
})