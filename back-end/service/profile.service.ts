import { Profile } from "../model/Profile";
import { ProfileInput } from "../types";
import profileDb from "../repository/profile.db"

const createProfile = async (profileInput: ProfileInput, userId: number): Promise<Profile> => {
    const { firstName, name, dateOfBirth } = profileInput;

    if (!firstName || !name || !dateOfBirth) {
        throw new Error("firstname, name and date of birth can not be empty!");
    }

    const newProfile = new Profile({
        firstName, 
        name,
        dateOfBirth
    });

    return await profileDb.createProfile(newProfile, userId)
}

export default {
    createProfile
}