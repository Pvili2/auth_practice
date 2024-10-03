import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import Input from "../components/Input";
import { Mail } from "lucide-react";
import { CustomInputEvent } from "../types";
import FormButton from "../components/FormButton";
import FormFooter from "../components/FormFooter";
import { useAuthStore } from "../store/authStore";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, error, forgotPassword } = useAuthStore();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await forgotPassword(email);
    } catch (error) {
      console.log(error);
    }
    setIsSubmitted(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="h-10 text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Forgot Password
        </h2>
        {isSubmitted ? (
          <div>
            <div className=" mx-auto size-14 p-1 bg-emerald-500 rounded-full text-white flex justify-center items-center">
              <Mail className=" size-8" />
            </div>
            <p className="mt-4 text-gray-300 mx-auto text-center">
              If an account exists for <i>{email}</i>, you will receive a
              password reset link shortly.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-gray-300 mx-auto text-center">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
            <form onSubmit={handleSubmit}>
              <Input
                Icon={Mail}
                placeholder="Enter your Email"
                value={email}
                onChange={(e: CustomInputEvent) => setEmail(e.target.value)}
              />
              {error && (
                <p className="text-red-700 font-semibold mt-3">{error}</p>
              )}
              <FormButton content="Send Reset Link" isLoading={isLoading} />
            </form>
          </>
        )}
      </div>
      <FormFooter question="" path="/login" linkContent="<-- Back to login" />
    </motion.div>
  );
};

export default ForgotPasswordPage;
