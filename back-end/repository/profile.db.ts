import { Certificate } from "crypto";
import { Profile } from "../model/Profile";
import database from "./database";

const createProfile = async (profile: Profile, userId: number): Promise<Profile> => {
    try {
        const createdProfile = await database.profile.create({
            data: {
                firstName: profile.getFirstName(),
                name: profile.getName(),
                dateOfBirth: profile.getDateOfBirth(),
                user: {
                    connect: { id: userId}
                }
            }
        });
        return Profile.from(createdProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details');
    }
};

export default {
    createProfile
}