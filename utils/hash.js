import bcrypt from "bcryptjs";

const hashPassword = async (plainText) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainText, salt);
};

const comparePassword = async (plainText, cipherText) => {
    return bcrypt.compare(plainText, cipherText);
};

export default { hashPassword, comparePassword };
