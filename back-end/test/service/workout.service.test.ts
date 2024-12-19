import workoutService from '../../service/workout.service';
import workoutDb from '../../repository/workout.db';
import userService from '../../service/user.service';
import { Workout } from '../../model/Workout';
import { WorkoutInput } from '../../types';

let mockWorkoutDbAddWorkout: jest.Mock;
let mockWorkoutDbGetWorkoutsByUserId: jest.Mock;
let mockUserServiceGetUserById: jest.Mock;

beforeEach(() => {
    mockWorkoutDbAddWorkout = jest.fn();
    mockWorkoutDbGetWorkoutsByUserId = jest.fn();
    mockUserServiceGetUserById = jest.fn();

    workoutDb.addWorkout = mockWorkoutDbAddWorkout;
    workoutDb.getWorkoutsByUserId = mockWorkoutDbGetWorkoutsByUserId;
    userService.getUserById = mockUserServiceGetUserById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given valid workout input, when addWorkout is called, then a new workout is added and returned', async () => {
    const workoutInput: WorkoutInput = {
        subject: 'Leg Day',
        date: new Date(),
        userIds: [1, 2] // Changed from users to userIds
    };
    
    const mockUsers = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' }
    ];
    
    // Mock getUserById for each user
    mockUserServiceGetUserById
        .mockResolvedValueOnce(mockUsers[0])
        .mockResolvedValueOnce(mockUsers[1]);

    const expectedWorkout = new Workout({
        subject: workoutInput.subject,
        date: workoutInput.date,
        users: mockUsers
    });
    
    mockWorkoutDbAddWorkout.mockReturnValue(expectedWorkout);
    
    const result = await workoutService.addWorkout(workoutInput);
    
    expect(mockUserServiceGetUserById).toHaveBeenCalledTimes(2);
    expect(mockUserServiceGetUserById).toHaveBeenCalledWith(1);
    expect(mockUserServiceGetUserById).toHaveBeenCalledWith(2);
    expect(mockWorkoutDbAddWorkout).toHaveBeenCalledWith(expectedWorkout);
    expect(result).toEqual(expectedWorkout);
});


test('given missing subject or date, when addWorkout is called, then it throws an error', async () => {
    const invalidWorkoutInput = {
        subject: '',
        date: new Date(),
        userIds: [1]
    };
    
    await expect(workoutService.addWorkout(invalidWorkoutInput))
        .rejects.toThrow('All field are required');
});

test('given non-existent user, when addWorkout is called, then it throws an error', async () => {
    
    const workoutInput: WorkoutInput = {
        subject: 'Back Day',
        date: new Date(),
        users: 1,
    };
    mockUserServiceGetUserById.mockResolvedValue(null); 


    const addWorkout = async () => await workoutService.addWorkout(workoutInput);


    await expect(addWorkout()).rejects.toThrow('User not found with the provided id'); 
});

test('given a valid user ID, when getWorkoutsByUserId is called, then workouts are returned', async () => {
    
    const userId = 1;
    const mockWorkout = new Workout({ subject: 'Cardio', date: new Date(), users });
    const workouts = [mockWorkout];
    mockWorkoutDbGetWorkoutsByUserId.mockReturnValue(workouts); 

    
    const result = await workoutService.getWorkoutsByUserId(userId);

    
    expect(mockWorkoutDbGetWorkoutsByUserId).toHaveBeenCalledWith(userId); 
    expect(result).toEqual(workouts); 
});

test('given non-existent workouts, when getWorkoutsByUserId is called, then an error is thrown', async () => {

    const userId = 2;
    mockWorkoutDbGetWorkoutsByUserId.mockReturnValue([]); 


    const getWorkouts = async () => await workoutService.getWorkoutsByUserId(userId);

    
    await expect(getWorkouts()).rejects.toThrow('No workouts found for this user.'); 
});