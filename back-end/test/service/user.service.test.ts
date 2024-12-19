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

test('when getAllUsers is called, then it returns all users', () => {
    
    const mockUsers = [
        new User({ email: 'oussie@email.com', password: 'oussie123456', role: "user" }),
        new User({ email: 'gertje@email.com', password: 'gertje123456', role: "user" }),
    ];
    mockUserDbGetAllUsers.mockReturnValue(mockUsers);

    
    const result = userService.getAllUsers();

    
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUsers);
});

test('given valid user input, when registerUser is called, then a new user is created and returned', async () => {
    
    const userInput: UserInput = {
        email: 'oussie@email.com',
        password: 'oussie1234',
        role: "user"
    };
    const newUser = new User({
        email: userInput.email,
        password: userInput.password,
        role: userInput.role
        
    });
    mockUserDbGetUserByEmail.mockReturnValue(null); 
    mockUserDbRegisterUser.mockReturnValue(newUser);

    
    const result = await userService.registerUser(userInput);

    
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledWith(userInput.email);
    expect(mockUserDbRegisterUser).toHaveBeenCalledWith(expect.objectContaining({
        email: userInput.email,
        password: userInput.password,
            
    }));
    
});

test('given existing user email, when registerUser is called, then it throws an error', async () => {
    
    const userInput: UserInput = {
        email: 'bestaatal@email.com',
        password: 'oussie12345',
        role: "user"
    };
    mockUserDbGetUserByEmail.mockReturnValue(new User(userInput)); 

    
    await expect(userService.registerUser(userInput)).rejects.toThrow('A user with this email already exists.');
});

test('given missing email or password, when registerUser is called, then it throws an error', async () => {

    const invalidUserInput: UserInput = {
        email: '',
        password: 'gertje1234567',
        role: "user"
    };

    
    await expect(userService.registerUser(invalidUserInput)).rejects.toThrow('Email and password can not be empty!');
});

test('given a valid user ID, when getUserById is called, then it returns the user', () => {
    
    const userId = 1;
    const mockUser = new User({ email: 'gertje@email.com', password: 'gertje15623', role: "user" });
    mockUserDbGetUserById.mockReturnValue(mockUser);

    
    const result = userService.getUserById(userId);

    
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockUser);
});

test('given a non-existent user ID, when getUserById is called, then it throws an error', () => {
    
    const userId = 999; 
    mockUserDbGetUserById.mockReturnValue(null);

    
    expect(() => userService.getUserById(userId)).toThrow(`User with ID ${userId} does not exist.`);
});