import { Workout } from "../../../model/Workout";

test('given: valid values for workout, when: creating workout, then: workout is created with those values', () => {

    const workoutData = {
        id: 1,
        subject: "chestday",
        date: new Date('2024-10-21')
    }

    const workout = new Workout(workoutData);


    expect(workout.getId()).toBe(1);
    expect(workout.getSubject()).toBe("chestday");
    expect(workout.getDate()).toEqual(new Date('2024-10-21'));
});

