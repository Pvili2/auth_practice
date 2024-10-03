import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { CustomInputEvent, LoginCall } from "../types";
import FormButton from "../components/FormButton";
import FormFooter from "../components/FormFooter";
import { useAuthStore } from "../store/authStore";
import FormTitle from "../components/FormTitle";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, login }: LoginCall = useAuthStore();
  const navigate = useNavigate();
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(password);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <FormTitle content="Welcome Back" />
        <form onSubmit={handleLogin}>
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
          <div className="flex items-center mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-green-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          {error && <p className="text-red-500 mt-2 font-semibold">{error}</p>}
          <FormButton content="Login" isLoading={isLoading} />
        </form>
      </div>
      <FormFooter
        question={`Don't have an account?`}
        path="/signup"
        linkContent="Sign Up"
      />
    </motion.div>
  );
};

export default LoginPage;
