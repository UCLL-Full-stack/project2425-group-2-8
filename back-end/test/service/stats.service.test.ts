import statsService from '../../service/stats.service';
import statsDb from '../../repository/stats.db';
import userService from '../../service/user.service';
import { StatsInput } from '../../types';
import { Stats } from '../../model/Stats';
import { User } from '../../model/User';




let mockStatsDbAddStats: jest.Mock;
let mockUserServiceGetUserById: jest.Mock;
let mockStatsDbGetStatsByUserId: jest.Mock;

beforeEach(() => {
    mockStatsDbAddStats = jest.fn();
    mockUserServiceGetUserById = jest.fn();
    mockStatsDbGetStatsByUserId = jest.fn();

    statsDb.addStats = mockStatsDbAddStats;
    statsDb.getStatsByUserId = mockStatsDbGetStatsByUserId;
    userService.getUserById = mockUserServiceGetUserById;
    
});

afterEach(() => {
    jest.clearAllMocks();
});

// test('given valid stats input, when addStats is called, then stats are added and returned', async () => {
//     // Arrange
//     const statsInput: StatsInput = {
//         weight: 70,
//         length: 175,
//         pr: 100,
//         userId: 0
//     };

//     const newStats = new Stats({
//         weight: statsInput.weight,
//         length: statsInput.length,
//         pr: statsInput.pr,
//         userId: statsInput.userId,
//     });

//     // Mock the function calls
//     mockStatsDbAddStats.mockReturnValue(newStats); // Mocked return of adding stats

//     // Act
//     const result = await statsService.addStats(statsInput);

//     // Assert
//     expect(mockStatsDbAddStats).toHaveBeenCalledWith(expect.objectContaining({
//         weight: statsInput.weight,
//         length: statsInput.length,
//         pr: statsInput.pr,
//         userId: statsInput.userId,
//         // Do not check 'date' here
//     }));
    
// });

test('given missing required stats fields, when addStats is called, then it throws an error', async () => {
    
    const invalidStatsInput = { weight: 70, length: 175, userId: 1 } as StatsInput;

    
    await expect(statsService.addStats(invalidStatsInput)).rejects.toThrow('All fields are required');
});

test('given a non-existing user, when addStats is called, then it throws an error', async () => {
    
    const statsInput: StatsInput = {
        weight: 70,
        length: 175,
        pr: 100,
        userId: 1,
    };

    mockUserServiceGetUserById.mockResolvedValue(null);

    
    await expect(statsService.addStats(statsInput)).rejects.toThrow('User not found with the provided id.');
});

test('given a valid userId, when getStatsByUserId is called, then returns all stats for that user', async () => {
    
    const userId = 1;
    const userStats = [
        new Stats({ weight: 70, length: 175, pr: 100, userId }),
        new Stats({ weight: 72, length: 176, pr: 105, userId })
    ];
    mockStatsDbGetStatsByUserId.mockResolvedValue(userStats);

    
    const result = await statsService.getStatsByUserId(userId);

    
    expect(mockStatsDbGetStatsByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual(userStats);
});

test('given an invalid userId, when getStatsByUserId is called, then it throws an error', async () => {

    const userId = 2;
    mockStatsDbGetStatsByUserId.mockResolvedValue([]);

    
    await expect(statsService.getStatsByUserId(userId)).rejects.toThrow('No stats found for this user.');
});