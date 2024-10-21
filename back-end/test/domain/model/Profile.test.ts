import { Profile } from "../../../model/Profile";

test('given: valid values for profile, when: profile is created, then: profile is created with those values', () => {
    
    const profileData = {
        id: 1,
        firstName: 'John',
        name: 'Doe',
        dateOfBirth: new Date('1990-01-01')
    };

    
    const profile = new Profile(profileData);

    
    expect(profile.getId()).toBe(1);
    expect(profile.getFirstName()).toBe('John');
    expect(profile.getName()).toBe('Doe');
    expect(profile.getDateOfBirth()).toEqual(new Date('1990-01-01'));
});