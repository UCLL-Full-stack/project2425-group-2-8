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