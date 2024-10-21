import { Stats } from "../../../model/Stats";

test('given: Valid values for Stats, when: stats are created, then: stats are created with those values', () => {

    const statsData = {
        id: 1,
        weight: 60,
        lenght: 180,
        pr: 85,
        date: new Date('2024-10-21')
    };

    const stats = new Stats(statsData);

    expect(stats.getId()).toBe(1);
    expect(stats.getWeight()).toBe(60);
    expect(stats.getLenght()).toBe(180);
    expect(stats.getPr()).toBe(85);
    expect(stats.getDate()).toEqual(new Date('2024-10-21'));
});