import { User } from "../../../model/User";
import { Role } from "../../../types";

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    const userData = {
        email: "gertje@email.com",
        password: "gertje1234",
        role: "user" as Role
    };

    const user = new User(userData);

    expect(user.getEmail()).toBe("gertje@email.com");
    expect(user.getPassword()).toBe("gertje1234");
    expect(user.getRole()).toBe("user");
});

test('given: email is empty, when: creating user, then: an error is thrown', () => {
    const userData = {
        email: "",
        password: "password123",
        role: "user" as Role
    };

    expect(() => new User(userData)).toThrowError('Email is required!');
});

test('given: password is empty, when: creating user, then: an error is thrown', () => {
    const userData = {
        email: "gertje@email.com",
        password: "",
        role: "user" as Role
    };

    expect(() => new User(userData)).toThrowError('Password is required');
});


