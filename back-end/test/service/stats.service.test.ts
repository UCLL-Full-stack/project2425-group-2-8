import statsService from '../../service/stats.service';
import statsDb from '../../repository/stats.db';
import userService from '../../service/user.service';
import { StatsInput } from '../../types';
import { Stats } from '../../model/Stats';

jest.mock('../../repository/stats.db');
jest.mock('../../service/user.service');

let mockStatsDbAddStats: jest.Mock;
let mockUserServiceGetUserById: jest.Mock;
let mockStatsDbGetStatsByUserId: jest.Mock;

beforeEach(() => {
    mockStatsDbAddStats = jest.fn();
    mockStatsDbGetStatsByUserId = jest.fn();
    mockUserServiceGetUserById = jest.fn();

    (statsDb.addStats as jest.Mock) = mockStatsDbAddStats;
    (statsDb.getStatsByUserId as jest.Mock) = mockStatsDbGetStatsByUserId;
    (userService.getUserById as jest.Mock) = mockUserServiceGetUserById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given valid stats input, when addStats is called, then stats are added and returned', async () => {
    const user = { id: 1, email: 'oussie@email.com', password: 'oussie123456' };
    const statsInput: StatsInput = { weight: 70, length: 175, pr: 100, userId: 1 };
    const newStats = new Stats(statsInput);

    mockUserServiceGetUserById.mockResolvedValue(user);
    mockStatsDbAddStats.mockResolvedValue(newStats);

    const result = await statsService.addStats(statsInput);

    expect(mockUserServiceGetUserById).toHaveBeenCalledWith(statsInput.userId);
    expect(mockStatsDbAddStats).toHaveBeenCalledWith(expect.objectContaining(statsInput));
    expect(result).toEqual(newStats);
});

test('given missing required stats fields, when addStats is called, then it throws an error', async () => {
    const invalidStatsInput = { weight: 70, length: 175, userId: 1 } as StatsInput;

    await expect(statsService.addStats(invalidStatsInput)).rejects.toThrow('All fields are required');

    expect(mockUserServiceGetUserById).not.toHaveBeenCalled();
    expect(mockStatsDbAddStats).not.toHaveBeenCalled();
});

test('given missing userId, when addStats is called, then it throws an error', async () => {
    const invalidStatsInput = { weight: 70, length: 175, pr: 100 } as StatsInput;

    await expect(statsService.addStats(invalidStatsInput)).rejects.toThrow('A user must be given when entering stats');

    expect(mockUserServiceGetUserById).not.toHaveBeenCalled();
    expect(mockStatsDbAddStats).not.toHaveBeenCalled();
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

    expect(mockUserServiceGetUserById).toHaveBeenCalledWith(statsInput.userId);
    expect(mockStatsDbAddStats).not.toHaveBeenCalled();
});

test('given a valid userId, when getStatsByUserId is called, then returns all stats for that user', async () => {
    const userId = 1;
    const userStats = [
        new Stats({ weight: 70, length: 175, pr: 100, userId }),
        new Stats({ weight: 72, length: 176, pr: 105, userId }),
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

    expect(mockStatsDbGetStatsByUserId).toHaveBeenCalledWith(userId);
});
