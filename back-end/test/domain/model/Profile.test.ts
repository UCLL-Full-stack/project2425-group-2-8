import { Profile } from "../../../model/Profile";
import { User } from "../../../model/User";

test('given: valid values for profile, when: profile is created, then: profile is created with those values', () => {

    const user = new User({ email: "gertje@email.com", password: "gertje1234" });
    

    
    const profileData = {
        id: 1,
        firstName: 'John',
        name: 'Doe',
        dateOfBirth: new Date('1990-01-01'),
        user: user
    };

    
    const profile = new Profile(profileData);

    
    expect(profile.getId()).toBe(1);
    expect(profile.getFirstName()).toBe('John');
    expect(profile.getName()).toBe('Doe');
    expect(profile.getDateOfBirth()).toEqual(new Date('1990-01-01'));
});

test('given: empty first name, when: creating profile, then: error is thrown', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234" });

    
    const profileData = {
        id: 1,
        firstName: '',
        name: 'Doe', 
        dateOfBirth: new Date('1990-01-01'),
        user: user
    };

    expect(() => new Profile(profileData)).toThrow('First name is required');


});

test('given: empty name, when: creating profile, then: error is thrown', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234" });

    
    const profileData = {
        id: 1,
        firstName: 'John',
        name: '',
        dateOfBirth: new Date('1990-01-01'),
        user: user
    };

    expect(() => new Profile(profileData)).toThrow('Name is required');
});

test('given: empty date of birth, when: creating profile, then: error is thrown', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234" });

    
    const profileData: any = {
        id: 1,
        firstName: 'John',
        name: 'Doe',
        dateOfBirth: undefined,
        user: user
    };

    expect(() => new Profile(profileData)).toThrow('Date of birth is required');
});

test('given: empty user, when: creating profile, then: error is thrown', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234" });

    
    const profileData: any = {
        id: 1,
        firstName: 'John',
        name: 'Doe',
        dateOfBirth: new Date('1990-01-01'),
        user: undefined
    };

    expect(() => new Profile(profileData)).toThrow('User is required');
});