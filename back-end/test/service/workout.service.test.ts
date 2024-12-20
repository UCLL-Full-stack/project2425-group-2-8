import workoutService from '../../service/workout.service';
import workoutDb from '../../repository/workout.db';
import userService from '../../service/user.service';
import { WorkoutInput } from '../../types';
import { Workout } from '../../model/Workout';

jest.mock('../../repository/workout.db');
jest.mock('../../service/user.service');

let mockWorkoutDbAddWorkout: jest.Mock;
let mockWorkoutDbGetWorkoutsByUserId: jest.Mock;
let mockUserServiceGetUserById: jest.Mock;

beforeEach(() => {
    mockWorkoutDbAddWorkout = jest.fn();
    mockWorkoutDbGetWorkoutsByUserId = jest.fn();
    mockUserServiceGetUserById = jest.fn();

    (workoutDb.addWorkout as jest.Mock) = mockWorkoutDbAddWorkout;
    (workoutDb.getWorkoutsByUserId as jest.Mock) = mockWorkoutDbGetWorkoutsByUserId;
    (userService.getUserById as jest.Mock) = mockUserServiceGetUserById;
});

afterEach(() => {
    jest.clearAllMocks();
});

// test('adds a new workout when valid input is provided', async () => {
//     const workoutInput: WorkoutInput = {
//         subject: 'Leg Day',
//         date: new Date(),
//         userIds: [1, 2],
//     };

//     const mockUsers = [
//         { id: 1, name: 'User 1', email: 'user1@example.com', password: 'password1', role: 'user' },
//         { id: 2, name: 'User 2', email: 'user2@example.com', password: 'password2', role: 'user' },
//     ];

//     mockUserServiceGetUserById
//         .mockResolvedValueOnce(mockUsers[0])
//         .mockResolvedValueOnce(mockUsers[1]);

//     const expectedWorkout = new Workout({
//         subject: workoutInput.subject,
//         date: workoutInput.date,
//         users: mockUsers,
//     });

//     mockWorkoutDbAddWorkout.mockResolvedValue(expectedWorkout);

//     const result = await workoutService.addWorkout(workoutInput);

//     expect(mockUserServiceGetUserById).toHaveBeenCalledTimes(2);
//     expect(mockUserServiceGetUserById).toHaveBeenCalledWith(1);
//     expect(mockUserServiceGetUserById).toHaveBeenCalledWith(2);
//     expect(mockWorkoutDbAddWorkout).toHaveBeenCalledWith(expect.objectContaining({
//         subject: 'Leg Day',
//         date: expect.any(Date),
//         users: mockUsers,
//     }));
//     expect(result).toEqual(expectedWorkout);
// });

test('throws an error when subject or date is missing', async () => {
    const invalidWorkoutInput = {
        subject: '',
        date: new Date(),
        userIds: [1],
    };

    await expect(workoutService.addWorkout(invalidWorkoutInput))
        .toThrow('All fields are required');

    expect(mockUserServiceGetUserById).not.toHaveBeenCalled();
    expect(mockWorkoutDbAddWorkout).not.toHaveBeenCalled();
});

test('throws an error when user does not exist', async () => {
    const workoutInput: WorkoutInput = {
        subject: 'Back Day',
        date: new Date(),
        userIds: [1],
    };

    mockUserServiceGetUserById.mockResolvedValue(null);

    await expect(workoutService.addWorkout(workoutInput))
        .rejects.toThrow('User not found with the provided id.');

    expect(mockUserServiceGetUserById).toHaveBeenCalledWith(1);
    expect(mockWorkoutDbAddWorkout).not.toHaveBeenCalled();
});

// test('returns workouts for a valid user ID', async () => {
//     const userId = 1;
//     const mockWorkout = new Workout({ subject: 'Cardio', date: new Date(), users: [{ id: 1, name: 'User 1' }] });
//     const workouts = [mockWorkout];

//     mockWorkoutDbGetWorkoutsByUserId.mockResolvedValue(workouts);

//     const result = await workoutService.getWorkoutsByUserId(userId);

//     expect(mockWorkoutDbGetWorkoutsByUserId).toHaveBeenCalledWith(userId);
//     expect(result).toEqual(workouts);
// });

test('throws an error when no workouts are found for a user ID', async () => {
    const userId = 2;
    mockWorkoutDbGetWorkoutsByUserId.mockResolvedValue([]);

    await expect(workoutService.getWorkoutsByUserId(userId))
        .rejects.toThrow('No workouts found for this user.');

    expect(mockWorkoutDbGetWorkoutsByUserId).toHaveBeenCalledWith(userId);
});
