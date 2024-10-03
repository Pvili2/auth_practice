import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import FormTitle from "../components/FormTitle";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import { FormEvent, useState } from "react";
import { CustomInputEvent } from "../types";
import FormButton from "../components/FormButton";
import { useAuthStore } from "../store/authStore";
const ResetPasswordPage = () => {
  const token: string | undefined = useParams().token;
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errors, setError] = useState("");
  const navigate = useNavigate();
  const { error, isLoading, resetPassword } = useAuthStore();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== repassword) {
      setError("The two passwords must be the same");
      return;
    }
    try {
      await resetPassword(password, token);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <FormTitle content="Reset Password" />
        <form onSubmit={handleSubmit}>
          <Input
            Icon={Lock}
            placeholder="New Password"
            type="password"
            value={password}
            onChange={(e: CustomInputEvent) => setPassword(e.target.value)}
          />
          <Input
            Icon={Lock}
            placeholder="Confirm New Password"
            type="password"
            value={repassword}
            onChange={(e: CustomInputEvent) => setRepassword(e.target.value)}
          />
          {error ||
            (errors && (
              <p className="text-red-600 font-semibold my-3">
                {error ? error : errors}
              </p>
            ))}
          <FormButton content="Set New Password" isLoading={isLoading} />
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
