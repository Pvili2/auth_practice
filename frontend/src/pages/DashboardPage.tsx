import { motion } from "framer-motion";
import { FormEvent } from "react";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/dateFormat";
import FormButton from "../components/FormButton";
import FormTitle from "../components/FormTitle";
const DashboardPage = () => {
  const { user, logout, error, isLoading } = useAuthStore();

  const handleLogout = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 1, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80
       backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
    >
      <FormTitle content="Dashboard" />
      <div className="space-y-6">
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Profile Information
          </h3>
          <p className="text-gray-300">Name: {user?.name}</p>
          <p className="text-gray-300">Email: {user?.email}</p>
        </motion.div>
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Account Activity
          </h3>
          <p className="text-gray-300">
            <span className="font-bold">Joined: </span>
            {new Date(user?.createdAt || "").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-300">
            <span className="font-bold">Last Login: </span>

            {formatDate(user?.lastLogin + "" || "")}
          </p>
        </motion.div>
      </div>
      {error && <p className="mt-3 text-red-700 font-semibold">{error}</p>}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4"
      >
        <form className="mt-10" onSubmit={handleLogout}>
          <FormButton content="Logout" isLoading={isLoading} />
        </form>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
