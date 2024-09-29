import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { CustomInputEvent } from "../types";
import FormButton from "../components/FormButton";
import FormFooter from "../components/FormFooter";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = false;
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gay-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>
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
