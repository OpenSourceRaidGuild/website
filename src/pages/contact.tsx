import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactFormValidator,
  ContactFormValidatorType,
} from "@/shared/contact-form";
import { trpc } from "@/frontend/utils/trpc";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValidatorType>({
    resolver: zodResolver(ContactFormValidator),
  });

  const postMutation = trpc.useMutation("contact-form");

  if (postMutation.isLoading) {
    return <div className="text-center">Submitting...</div>;
  }

  if (postMutation.data) {
    return <div className="text-center">Submission received, hang tight!</div>;
  }

  return (
    <form
      onSubmit={handleSubmit((input) => {
        postMutation.mutate(input);
      })}
      className="flex flex-col items-start w-full"
      style={{ flex: "1" }}
    >
      <label
        className="block text-gray-200 text-md font-bold mb-2"
        htmlFor="name"
      >
        Name
      </label>
      <input
        {...register("name")}
        type="text"
        id="name"
        placeholder="Your Name"
      />
      {errors.name && (
        <p className="text-red-400">Error: {errors.name?.message}</p>
      )}

      <div className="py-4" />

      <label
        className="block text-gray-200 text-md font-bold mb-2"
        htmlFor="email"
      >
        Email
      </label>
      <input
        {...register("email")}
        type="text"
        id="email"
        placeholder="something@example.com"
      />
      {errors.email && (
        <p className="text-red-400">Error: {errors.email?.message}</p>
      )}

      <div className="py-4" />

      <label
        className="block text-gray-200 text-md font-bold mb-2"
        htmlFor="role"
      >
        Role
      </label>
      <select {...register("role")} id="role" placeholder="Please select one">
        <option value="Maintainer">Maintainer</option>
        <option value="Contributor">Contributor</option>
        <option value="Guild Member">Guild Member</option>
        <option value="Other">Other</option>
      </select>
      {errors.role && (
        <p className="text-red-400">Error: {errors.role?.message}</p>
      )}

      <div className="py-4" />

      <label
        className="block text-gray-200 text-md font-bold mb-2"
        htmlFor="message"
      >
        Message
      </label>
      <textarea
        {...register("message")}
        placeholder="I want to...."
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      />
      {errors.message && (
        <p className="text-red-400">Error: {errors.message?.message}</p>
      )}

      <div className="py-4" />

      <input
        type="submit"
        value="Submit"
        aria-label="Submit"
        className="p-4 rounded bg-blue-200 text-black"
      />
    </form>
  );
};

export default function ContactPage() {
  return (
    <div
      id="about"
      className="flex flex-col justify-center items-center min-h-screen cursor-default relative text-gray-200"
    >
      <div className="w-[28rem] md:w-[42rem] max-w-full mx-4 text-lg p-4 bg-gray-700 bg-transparent-50 rounded-xl shadow-xl flex flex-col">
        <ContactForm />
      </div>
    </div>
  );
}
