import React, { useState } from "react";
import { Mail, Phone, CheckCircle2, Shield, Upload, X } from "lucide-react";
import { Card } from "../ui/Card";

// Reusable Modal
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-white"
      >
        <X className="w-5 h-5" />
      </button>
      <h2 className="text-lg font-bold text-white mb-4">{title}</h2>
      {children}
    </div>
  </div>
);

export const VerificationStatus = ({ verification }) => {
  const [activeModal, setActiveModal] = useState(null); // "email" | "phone" | "id"
  const [step, setStep] = useState(1);

  // reset step when closing modal
  const closeModal = () => {
    setActiveModal(null);
    setStep(1);
  };

  const items = [
    {
      label: "Email Verification",
      key: "isEmailVerified",
      icon: Mail,
      color: "blue",
      description: "Confirm your email address",
      type: "email",
    },
    {
      label: "Phone Verification",
      key: "isPhoneVerified",
      icon: Phone,
      color: "emerald",
      description: "Verify your phone number",
      type: "phone",
    },
    {
      label: "ID Verification",
      key: "isIdVerified",
      icon: Shield,
      color: "purple",
      description: "Upload and verify your ID",
      type: "id",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-montserrat">
      <div className="min-h-screen max-w-[90%] mx-auto pt-40">
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg lg:text-xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              Verification Status
            </h3>
          </div>

          <div className="space-y-4">
            {items.map((item, idx) => {
              const isVerified = verification?.[item.key];
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 bg-${item.color}-400/20 rounded-xl flex items-center justify-center`}
                    >
                      <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm lg:text-base">
                        {item.label}
                      </p>
                      <p className="text-gray-400 text-xs lg:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isVerified ? (
                      <span className="flex items-center text-emerald-400 font-medium text-sm">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Verified
                      </span>
                    ) : (
                      <button
                        onClick={() => setActiveModal(item.type)}
                        className={`px-3 py-1.5 text-sm rounded-lg border border-${item.color}-400/30 text-${item.color}-400 hover:bg-${item.color}-400/20 transition`}
                      >
                        Verify Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ====================== MODALS ====================== */}

        {/* EMAIL */}
        {activeModal === "email" && (
          <Modal title="Verify Your Email" onClose={closeModal}>
            {step === 1 ? (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                />
                <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium">
                  Send Code
                </button>
              </form>
            ) : (
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 tracking-widest text-center"
                />
                <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium">
                  Verify Email
                </button>
              </form>
            )}
          </Modal>
        )}

        {/* PHONE */}
        {activeModal === "phone" && (
          <Modal title="Verify Your Phone" onClose={closeModal}>
            {step === 1 ? (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
              >
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                />
                <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-medium">
                  Send Code
                </button>
              </form>
            ) : (
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter SMS code"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 tracking-widest text-center"
                />
                <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-medium">
                  Verify Phone
                </button>
              </form>
            )}
          </Modal>
        )}

        {/* ID */}
        {activeModal === "id" && (
          <Modal title="Verify Your ID" onClose={closeModal}>
            <form className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">
                  Upload a government-issued ID
                </p>
                <input type="file" className="mt-2 text-sm text-gray-300" />
              </div>
              <button className="w-full py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-medium">
                Submit for Review
              </button>
              <p className="text-xs text-gray-400 text-center">
                Your ID will be reviewed by our admin team.
              </p>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default VerificationStatus;
