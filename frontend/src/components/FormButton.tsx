import { motion } from "framer-motion";
import { Loader } from "lucide-react";
const FormButton = ({
  content,
  isLoading,
}: {
  content: string;
  isLoading?: boolean;
}) => {
  return (
    <motion.button
      className="w-full py-3 px-4 bg-gradient-to-r
           from-green-500 to-emerald-600 text-white font-bold
            rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:ring-green-500
            focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={isLoading !== undefined && isLoading}
    >
      {isLoading !== undefined && isLoading ? (
        <Loader className="w-6 h-6 animate-spin text-center mx-auto" />
      ) : (
        content
      )}
    </motion.button>
  );
};

export default FormButton;
