import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import Input from "../components/Input";
import { Lock, Mail, User } from "lucide-react";
import { CustomInputEvent, SignupCall } from "../types";
import FormFooter from "../components/FormFooter";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import FormButton from "../components/FormButton";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import FormTitle from "../components/FormTitle";
const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup, error, isLoading }: SignupCall = useAuthStore();
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signup({ email, password, name });
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <FormTitle content="Create Account" />

        <form onSubmit={handleSignup}>
          <Input
            Icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e: CustomInputEvent) => setName(e.target.value)}
          />
          <Input
            Icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e: CustomInputEvent) => setEmail(e.target.value)}
          />
          <Input
            Icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: CustomInputEvent) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 mt-2 font-semibold">{error}</p>}
          <PasswordStrengthMeter password={password} />
          <div className="mt-6">
            <FormButton content="Sign Up" isLoading={isLoading} />
          </div>
        </form>
      </div>
      <FormFooter
        question={`Already have an account?`}
        path="/login"
        linkContent="Login"
      />
    </motion.div>
  );
};

export default SignupPage;
