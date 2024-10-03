import { FormEvent, useEffect, useRef, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CustomInputEvent } from "../types";
import FormButton from "../components/FormButton";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { VerifyEmailCall } from "../types";
import FormTitle from "../components/FormTitle";
const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();
  //const navigate = useNavigate();
  const { isLoading, verifyEmail, error }: VerifyEmailCall = useAuthStore();
  function handleChange(index: number, value: string): void {
    const seged = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        seged[i] = pastedCode[i] || "";
      }
      setCode(seged);
      //focus on the last non-empty input or the first empty one
      const lastIndex =
        seged.length -
        1 -
        [...seged].reverse().findIndex((digit) => digit !== "");
      const focusIndex = lastIndex < 5 ? lastIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      seged[index] = value;
      setCode(seged);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
      return;
    }
  }

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  //auto submit
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code]);

  return (
    <div
      className="max-w-md w-full bg-gray-800 bg-opacity-50
     backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <FormTitle content="Verify Email" />
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code cent to your email address.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el: HTMLInputElement) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={6}
                value={digit}
                onChange={(e: CustomInputEvent) =>
                  handleChange(index, e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(index, e)
                }
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border2
                           border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>
          {error && <p className="text-red-500 mt-2 font-semibold">{error}</p>}
          <FormButton
            content="Verify Email"
            isLoading={isLoading && code.some((digit) => !digit)}
          />
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
