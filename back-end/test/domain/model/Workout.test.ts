import { Workout } from "../../../model/Workout";
import { User } from "../../../model/User";

test('given: valid values for workout, when: creating workout, then: workout is created with those values', () => {

    const user = new User({ email: "gertje@email.com", password: "gertje1234" });


    const workoutData = {
        id: 1,
        subject: "chestday",
        date: new Date('2024-10-21'),
        userId: 1
    }

    const workout = new Workout(workoutData);


    expect(workout.getId()).toBe(1);
    expect(workout.getSubject()).toBe("chestday");
    expect(workout.getDate()).toEqual(new Date('2024-10-21'));
});

test('given: empty subject, when: creating workout, then: error is throw', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234" });


    const workoutData = {
        id: 1,
        subject: "",
        date: new Date('2024-10-21'),
        userId: 1
    }
    expect(() => new Workout(workoutData)).toThrow('Subject is required');

});

test('given: empty date, when: creating workout, then: error is throw', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234" });


    const workoutData: any = {
        id: 1,
        subject: "chestday",
        date: undefined,
        userId: 1
    }
    expect(() => new Workout(workoutData)).toThrow('Date is required');

});

test('given: empty user, when: creating workout, then: error is throw', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234" });


    const workoutData: any = {
        id: 1,
        subject: "chestday",
        date: new Date('2024-10-21'),
        userId: undefined
    }
    expect(() => new Workout(workoutData)).toThrow('User is required');

});

