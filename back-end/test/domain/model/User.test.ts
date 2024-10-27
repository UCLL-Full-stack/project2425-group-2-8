import { User } from "../../../model/User";



test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    

    const userData = {
        id: 1,
        email: "gertje@email.com",
        password: "gertje1234"
    };

    const user = new User(userData);

    expect(user.getId()).toBe(1);
    expect(user.getEmail()).toBe("gertje@email.com");
    expect(user.getPassword()).toBe("gertje1234");
});

test('given: email is empty, when: creating user, then: an error is thrown', () => {
    const userData = {
        id: 1,
        email: "", 
        password: "password123"
    };
    
    expect(() => new User(userData)).toThrowError('Email is required!');

});

test('given: password is empty, when: creating user, then: an error is thrown', () => {
    const userData = {
        id: 1,
        email: "gertje@email.com",
        password: ""
    };

    expect(() => new User(userData)).toThrowError('Password is required!');

});