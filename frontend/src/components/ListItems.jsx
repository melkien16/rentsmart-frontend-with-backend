import { useState } from "react";
import {
  Package,
  ChevronLeft,
  ChevronRight,
  Check,
  Trash2,
  Plus,
  Upload,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

import { useUploadImageMutation } from "../slices/productsApiSlice";

const AddNewItem = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    priceUnit: "day",
    category: "",
    location: "",
    images: [],
    features: [""],
    rules: [""],
    tags: [""],
    expectedValue: "",
    availability: "Available",
    quantity: "",
  });
  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, title: "Basic Info", description: "Item title and description" },
    { id: 2, title: "Pricing", description: "Price and category" },
    { id: 3, title: "Location", description: "Where is your item located" },
    { id: 4, title: "Features", description: "Item features and rules" },
    { id: 5, title: "Images", description: "Upload item photos" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    let validFiles = [];

    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 10MB limit.`);
        return;
      }
      validFiles.push(file);
    });

    if (formData.images.length + validFiles.length > 5) {
      toast.error("Maximum 5 images allowed.");
      return;
    }

    for (const file of validFiles) {
      try {
        // wrap the file in FormData and use "image" (backend expects this field name)
        const data = new FormData();
        data.append("image", file);

        const result = await uploadImage(data).unwrap();

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, result.image], // backend sends { image: url }
        }));
        toast.success(`${file.name} uploaded successfully!`);
      } catch (err) {
        toast.error(`Failed to upload ${file.name}`);
        return;
      }
    }

    e.target.value = "";
  };

  const handleSubmit = async () => {
   console.log("Submitting form data:", formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="text-gray-400 text-sm font-medium">
                Item Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 transition-colors"
                placeholder='e.g., MacBook Pro 16" M2'
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm font-medium">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:bg-black/60 transition-colors"
              >
                <option value="electronics">Electronics</option>
                <option value="sports">Sports & Outdoor</option>
                <option value="tools">Tools & Equipment</option>
                <option value="vehicles">Vehicles</option>
                <option value="furniture">Furniture</option>
                <option value="clothing">Clothing & Accessories</option>
                <option value="books">Books & Media</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm font-medium">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                placeholder="Describe your item in detail..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm font-medium">
                  Price *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:bg-gray-800 transition-colors"
                  placeholder="60"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm font-medium">
                  Price Unit *
                </label>
                <select
                  value={formData.priceUnit}
                  onChange={(e) =>
                    handleInputChange("priceUnit", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-900 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:bg-gray-800 transition-colors"
                >
                  <option value="day">Per Day</option>
                  <option value="week">Per Week</option>
                  <option value="month">Per Month</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm font-medium">
                  Quantity *
                </label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleInputChange("quantity", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-900 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:bg-gray-800 transition-colors"
                  placeholder="e.g., $1000"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm font-medium">
                  Expected Value *
                </label>
                <input
                  type="text"
                  value={formData.expectedValue}
                  onChange={(e) =>
                    handleInputChange("expectedValue", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-900 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:bg-gray-800 transition-colors"
                  placeholder="e.g., $1000"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="text-gray-400 text-sm font-medium">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:bg-gray-800 transition-colors"
                placeholder="e.g., San Francisco, CA"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm font-medium">
                Availability
              </label>
              <select
                value={formData.availability}
                onChange={(e) =>
                  handleInputChange("availability", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-900 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:bg-gray-800 transition-colors"
              >
                <option value="Now">Available Now</option>
                <option value="Next Soon">Available Soon</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="text-gray-400 text-sm font-medium">
                Features
              </label>
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleArrayChange("features", index, e.target.value)
                      }
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 transition-colors"
                      placeholder="e.g., M2 Pro chip with 12-core CPU"
                    />
                    {formData.features.length > 1 && (
                      <button
                        onClick={() => removeArrayItem("features", index)}
                        className="px-4 py-3 bg-red-400/20 text-red-400 rounded-xl hover:bg-red-400/30 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("features")}
                  className="w-full px-4 py-3 border-2 border-dashed border-emerald-400/30 text-emerald-400 rounded-xl hover:border-emerald-400/50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Feature
                </button>
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm font-medium">
                Rules & Requirements
              </label>
              <div className="space-y-3">
                {formData.rules.map((rule, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={rule}
                      onChange={(e) =>
                        handleArrayChange("rules", index, e.target.value)
                      }
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 transition-colors"
                      placeholder="e.g., ID and credit card required"
                    />
                    {formData.rules.length > 1 && (
                      <button
                        onClick={() => removeArrayItem("rules", index)}
                        className="px-4 py-3 bg-red-400/20 text-red-400 rounded-xl hover:bg-red-400/30 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("rules")}
                  className="w-full px-4 py-3 border-2 border-dashed border-emerald-400/30 text-emerald-400 rounded-xl hover:border-emerald-400/50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Rule
                </button>
              </div>
            </div>
            {/* {for tags the same as add rule} */}
            <div>
              <label className="text-gray-400 text-sm font-medium">
                Tags (optional)
              </label>
              <div className="space-y-3">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) =>
                        handleArrayChange("tags", index, e.target.value)
                      }
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 transition-colors"
                      placeholder="e.g., laptop, Apple, M2"
                    />
                    {formData.tags.length > 1 && (
                      <button
                        onClick={() => removeArrayItem("tags", index)}
                        className="px-4 py-3 bg-red-400/20 text-red-400 rounded-xl hover:bg-red-400/30 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("tags")}
                  className="w-full px-4 py-3 border-2 border-dashed border-emerald-400/30 text-emerald-400 rounded-xl hover:border-emerald-400/50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Tag
                </button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="text-gray-400 text-sm font-medium">
                Upload Images
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Item ${index + 1}`}
                      className="w-full h-32 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => {
                        const newImages = formData.images.filter(
                          (_, i) => i !== index
                        );
                        setFormData((prev) => ({ ...prev, images: newImages }));
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div
                  className="w-full h-32 border-2 border-dashed border-emerald-400/30 rounded-xl flex items-center justify-center text-emerald-400 hover:border-emerald-400/50 transition-colors cursor-pointer"
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  <div className="text-center">
                    <Upload
                      className={`w-8 h-8 mx-auto mb-2 ${
                        isLoading ? "animate-pulse" : ""
                      }`}
                    />
                    <p className="text-sm">
                      {isLoading ? "Uploading..." : "Add Image"}
                    </p>
                  </div>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>
            <div className="bg-emerald-400/10 border border-emerald-400/30 rounded-xl p-4">
              <h4 className="text-emerald-400 font-semibold mb-2">
                Image Guidelines
              </h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Upload high-quality photos (minimum 800x600px)</li>
                <li>• Show your item from different angles</li>
                <li>• Include any damage or wear in photos</li>
                <li>• Maximum 10 images per item</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 sm:p-6">
      <div className="max-w-[90%] mt-[70px] mx-auto">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-emerald-400/10 via-blue-400/10 to-purple-400/10 rounded-2xl border border-white/10 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Plus className="w-8 h-8 text-emerald-400" />
                Add New Item
              </h2>
              <p className="text-gray-300 mt-2">
                Create a new listing for your rental item
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-white font-semibold">
                  Step {currentStep} of {totalSteps}
                </p>
                <p className="text-gray-400 text-sm">
                  {steps[currentStep - 1]?.title}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Progress</span>
              <span className="text-emerald-400 font-semibold">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    currentStep > step.id
                      ? "bg-emerald-400 text-black"
                      : currentStep === step.id
                      ? "bg-blue-400 text-black"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="text-center mt-2">
                  <p
                    className={`text-xs font-medium ${
                      currentStep >= step.id ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              {steps[currentStep - 1]?.title}
            </h3>
            <p className="text-gray-400">
              {steps[currentStep - 1]?.description}
            </p>
          </div>

          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                currentStep === 1
                  ? "bg-gray-400/20 text-gray-500 cursor-not-allowed"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex gap-3">
              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-emerald-400 text-black rounded-xl font-semibold hover:bg-emerald-500 transition-all duration-200 flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-emerald-400 text-black rounded-xl font-semibold hover:bg-emerald-500 transition-all duration-200 flex items-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Create Listing
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Preview Card */}
        {formData.title && (
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Preview</h3>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    {formData.title || "Item Title"}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {formData.category || "Category"}
                  </p>
                </div>
              </div>
              {formData.description && (
                <p className="text-gray-300 text-sm mb-3">
                  {formData.description}
                </p>
              )}
              {formData.price && (
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-semibold">
                    ${formData.price}/{formData.priceUnit}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {formData.location || "Location"}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewItem;
