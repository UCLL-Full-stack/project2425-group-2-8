import jwt from 'jsonwebtoken'



const generateJwtToken = ({ email, role  }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'fitfait'};
    try {
        return jwt.sign({ email, role }, process.env.JWT_SECRET as string, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details');
    }

};
export { generateJwtToken };