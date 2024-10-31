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
        userId: 1,
    };

    const newWorkout = new Workout(workoutInput);
    mockUserServiceGetUserById.mockResolvedValue({ id: 1 }); 
    mockWorkoutDbAddWorkout.mockImplementation(() => newWorkout); 

    
    const result = await workoutService.addWorkout(workoutInput);

    
    expect(mockUserServiceGetUserById).toHaveBeenCalledWith(workoutInput.userId); 
    expect(mockWorkoutDbAddWorkout).toHaveBeenCalledWith(newWorkout); 
    expect(result).toEqual(newWorkout); 
});


test('given missing subject or date, when addWorkout is called, then it throws an error', async () => {
    
    const invalidWorkoutInput = { userId: 1, subject: '', date: new Date() }; 

    
    const addWorkout = async () => await workoutService.addWorkout(invalidWorkoutInput);

    
    await expect(addWorkout()).rejects.toThrow('All field are required'); 
});

test('given non-existent user, when addWorkout is called, then it throws an error', async () => {
    
    const workoutInput: WorkoutInput = {
        subject: 'Back Day',
        date: new Date(),
        userId: 1,
    };
    mockUserServiceGetUserById.mockResolvedValue(null); 


    const addWorkout = async () => await workoutService.addWorkout(workoutInput);


    await expect(addWorkout()).rejects.toThrow('User not found with the provided id'); 
});

test('given a valid user ID, when getWorkoutsByUserId is called, then workouts are returned', async () => {
    
    const userId = 1;
    const mockWorkout = new Workout({ subject: 'Cardio', date: new Date(), userId });
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