import { Stats } from "../../../model/Stats";
import { User } from "../../../model/User";

test('given: Valid values for Stats, when: stats are created, then: stats are created with those values', () => {

    const user = new User({ email: "gertje@email.com", password: "gertje1234" });

    const statsData = {
        id: 1,
        weigth: 60,
        length: 180,
        pr: 85,
        date: new Date('2024-10-21'),
        user: user
    };

    const stats = new Stats(statsData);

    expect(stats.getId()).toBe(1);
    expect(stats.getWeigth()).toBe(60);
    expect(stats.getLength()).toBe(180);
    expect(stats.getPr()).toBe(85);
    expect(stats.getDate()).toEqual(new Date('2024-10-21'));
});

test('given: weigth is empty, when: creating stats, then: error is thrown', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234" });

    const statsData = {
        id: 1,
        weigth: NaN,
        length: 180,
        pr: 85,
        date: new Date('2024-10-21'),
        user: user
    };

    

    expect(() => new Stats(statsData)).toThrow('Weigth is required!');

});

test('given: length is empty, when: creating stats, then: error is thrown', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234" });

    const statsData = {
        id: 1,
        weigth: 90,
        length: NaN,
        pr: 85,
        date: new Date('2024-10-21'),
        user: user
    };

    

    expect(() => new Stats(statsData)).toThrow('Length is required!');

});

test('given: pr is empty, when: creating stats, then: error is thrown', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234" });

    const statsData = {
        id: 1,
        weigth: 90,
        length: 180,
        pr: NaN,
        date: new Date('2024-10-21'),
        user: user
    };

    

    expect(() => new Stats(statsData)).toThrow('Pr is required!');

});

test('given: date is empty, when: creating stats, then: error is thrown', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234" });

    const statsData: any = {
        id: 1,
        weigth: 90,
        length: 180,
        pr: 85,
        date: undefined,
        user: user
    };

    

    expect(() => new Stats(statsData)).toThrow('Date is required');

});

test('given: user is empty, when: creating stats, then: error is thrown', () => {
    const user = new User({ email: "gertje@email.com", password: "gertje1234" });

    const statsData: any = {
        id: 1,
        weigth: 90,
        length: 180,
        pr: 85,
        date: new Date('2024-10-21'),
        user: undefined
    };

    

    expect(() => new Stats(statsData)).toThrow('User is required');

});