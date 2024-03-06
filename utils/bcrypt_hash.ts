import bcrypt from "bcryptjs";
async function runBcrypt(password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Hashed Password:", hashedPassword);
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log("Password Match:", isMatch);
  } catch (error) {
    console.error("Error:", error);
  }
}

export default runBcrypt;
