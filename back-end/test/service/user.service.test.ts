import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import { User } from '../../model/User';
import { UserInput } from '../../types';

let mockUserDbGetAllUsers: jest.Mock;
let mockUserDbGetUserByEmail: jest.Mock;
let mockUserDbRegisterUser: jest.Mock;
let mockUserDbGetUserById: jest.Mock;

beforeEach(() => {
    mockUserDbGetAllUsers = jest.fn();
    mockUserDbGetUserByEmail = jest.fn();
    mockUserDbRegisterUser = jest.fn();
    mockUserDbGetUserById = jest.fn();

    userDb.getAllUsers = mockUserDbGetAllUsers;
    userDb.getUserByEmail = mockUserDbGetUserByEmail;
    userDb.registerUser = mockUserDbRegisterUser;
    userDb.getUserById = mockUserDbGetUserById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('when getAllUsers is called, then it returns all users', async () => {
    const mockUsers = [
        new User({ email: 'oussie@email.com', password: 'oussie123456', role: 'user' }),
        new User({ email: 'gertje@email.com', password: 'gertje123456', role: 'user' }),
    ];

    mockUserDbGetAllUsers.mockResolvedValue(mockUsers);  

    const result = await userService.getAllUsers();  

    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUsers);
});

test('given valid user input, when registerUser is called, then a new user is created and returned', async () => {
    const userInput: UserInput = {
        email: 'oussie@email.com',
        password: 'oussie1234',
        role: 'user',
    };

    const newUser = new User({
        email: userInput.email,
        password: userInput.password,
        role: userInput.role,
    });

    mockUserDbGetUserByEmail.mockResolvedValue(null);  
    mockUserDbRegisterUser.mockResolvedValue(newUser);  

    const result = await userService.registerUser(userInput);

    expect(mockUserDbGetUserByEmail).toHaveBeenCalledWith(userInput.email);
    expect(mockUserDbRegisterUser).toHaveBeenCalledWith(expect.objectContaining({
        email: userInput.email,
        password: userInput.password,
        role: userInput.role,
    }));

    expect(result).toEqual(newUser);
});


// test('given existing user email, when registerUser is called, then it throws an error', async () => {
//     const userInput: UserInput = {
//         email: 'bestaatal@email.com',
//         password: 'oussie12345',
//         role: 'user',
//     };

//     const existingUser = new User(userInput);
//     mockUserDbGetUserByEmail.mockResolvedValue(existingUser);  // Return existing user

//     await expect(userService.registerUser(userInput)).rejects.toThrow('A user with this email already exists.');
// });

test('given missing email or password, when registerUser is called, then it throws an error', async () => {
    const invalidUserInput: UserInput = {
        email: '',  
        password: 'gertje1234567',
        role: 'user',
    };

    await expect(userService.registerUser(invalidUserInput)).rejects.toThrow('Email and password cannot be empty!');
});

test('given a valid user ID, when getUserById is called, then it returns the user', async () => {
    const userId = 1;
    const mockUser = new User({ email: 'gertje@email.com', password: 'gertje15623', role: "user" });

    mockUserDbGetUserById.mockResolvedValue(mockUser);  

    const result = await userService.getUserById(userId);  

    expect(mockUserDbGetUserById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockUser);
});

test('given a non-existent user ID, when getUserById is called, then it throws an error', async () => {
    const userId = 999;
    mockUserDbGetUserById.mockResolvedValue(null);  

    await expect(userService.getUserById(userId)).rejects.toThrow(`User with ID ${userId} does not exist.`);
});