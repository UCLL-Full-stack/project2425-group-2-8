import { Workout } from "../../../model/Workout";
import { User } from "../../../model/User";

test('given: valid values for workout, when: creating workout, then: workout is created with those values', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234", role: "user" });

    const workoutData = {
        id: 1,
        subject: "chestday",
        date: new Date('2024-10-21'),
        users: [user]
    };

    const workout = new Workout(workoutData);

    expect(workout.getId()).toBe(1);
    expect(workout.getSubject()).toBe("chestday");
    expect(workout.getDate().toISOString()).toEqual(new Date('2024-10-21').toISOString());
    expect(workout.getUsers()).toEqual([user]);
});

test('given: empty subject, when: creating workout, then: error is thrown', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234", role: "user" });

    const workoutData = {
        id: 1,
        subject: "",
        date: new Date('2024-10-21'),
        users: [user]
    };

    expect(() => new Workout(workoutData)).toThrow('Subject is required');
});

test('given: empty date, when: creating workout, then: error is thrown', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234", role: "user" });

    const workoutData: any = {
        id: 1,
        subject: "chestday",
        date: undefined,
        users: [user]
    };

    expect(() => new Workout(workoutData)).toThrow('Date is required');
});

test('given: empty users array, when: creating workout, then: error is thrown', () => {
    const workoutData: any = {
        id: 1,
        subject: "chestday",
        date: new Date('2024-10-21'),
        users: []
    };

    expect(() => new Workout(workoutData)).toThrow('User is required');
});
