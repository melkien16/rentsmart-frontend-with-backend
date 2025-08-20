import { toast } from "react-toastify";

export function validateFormData(formData, setCurrentStep) {
  // Step 1 validation
  const { title, description } = formData;
  if (!title || !description) {
    toast("Please fill all required fields in step 1");
    setCurrentStep(1);
    return false;
  }

  // Step 2 validation
  const { price, expectedValue, quantity } = formData;
  if (!price || !expectedValue || !quantity) {
    toast("Please fill all required fields in step 2");
    setCurrentStep(2);
    return false;
  }

  // Step 3 validation
  const { location, availability } = formData;
  if (!location || !availability) {
    toast("Please fill all required fields in step 3");
    setCurrentStep(3);
    return false;
  }

  // Step 5 validation
  const { images } = formData;
  if (!images || images.length === 0) {
    toast("Please upload at least one image in step 5");
    setCurrentStep(5);
    return false;
  }

  return true;
}
