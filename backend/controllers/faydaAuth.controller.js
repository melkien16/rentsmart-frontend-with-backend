import { FaydaAuth } from "fayda-auth";
import asyncHandler from "../middleware/asyncHandler";

// Initialize the SDK with your API key
const fayda = new FaydaAuth({
  apiKey: process.env.FAYDA_API_KEY,
});

const authenticateUser = async (req, res) => {
  // <-- async here
  const { fcn, otp } = req.body;
  if (!fcn) {
    return res.status(400).json({ error: "FCN is required" });
  }

  try {
    // Step 1: Initiate OTP
    const otpResult = await fayda.initiateOTP(fcn); // <-- await
    console.log("OTP sent to:", otpResult.maskedMobile);
    console.log("Transaction ID:", otpResult.transactionId);

    if (!otp) {
      return res.status(400).json({ error: "OTP is required" });
    }

    // Step 2: Verify OTP
    const verifyResult = await fayda.verifyOTP(
      otpResult.transactionId,
      otp,
      fcn
    ); // <-- await
    console.log("User authenticated:", verifyResult.user.fullName[0].value);

    return res.status(200).json({ user: verifyResult.user });
  } catch (error) {
    console.error("Authentication failed:", error);
    return res.status(500).json({ error: "Authentication failed" });
  }
};

export { authenticateUser };
