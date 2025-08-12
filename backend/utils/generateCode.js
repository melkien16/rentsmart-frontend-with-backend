import crypto from "crypto";
export const generateCode = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  
  // Convert to string and pad with leading zeros if necessary
  const code = String(randomNumber).padStart(6, '0');
  
  // Generate two random uppercase letters
  const letters = crypto.randomBytes(2).toString('hex').toUpperCase().slice(0, 2);
  
  // Combine letters and code
  return `${letters}${code}`;
}