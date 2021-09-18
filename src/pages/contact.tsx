import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactFormValidator,
  ContactFormValidatorType,
} from "@/shared/contact-form";
import { trpc } from "@/frontend/utils/trpc";
import { GetServerSideProps } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { CustomSiteHead } from "@/frontend/components/head";

const ContactForm = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValidatorType>({
    resolver: zodResolver(ContactFormValidator),
  });

  const postMutation = trpc.useMutation("contact.submit-form");

  if (!session) {
    return (
      <div className="flex justify-center py-8">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => signIn("github")}
        >
          Sign in with Github
        </button>
      </div>
    );
  }

  if (postMutation.isLoading) {
    return <div className="text-center">Submitting...</div>;
  }

  if (postMutation.data) {
    return <div className="text-center">Submission received, hang tight!</div>;
  }

  return (
    <div className="flex flex-col items-start w-full">
      <label
        className="block text-gray-200 text-md font-bold mb-2"
        htmlFor="github"
      >
        Github
      </label>
      <div className="flex items-center">
        {session.user?.name}
        <button onClick={() => signOut()} className="font-bold ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <form
        onSubmit={handleSubmit((input) => {
          postMutation.mutate(input);
        })}
        className="flex flex-col items-start w-full"
        style={{ flex: "1" }}
      >
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
          htmlFor="repoUrl"
        >
          Git repo URL (optional)
        </label>
        <input
          {...register("repoUrl")}
          type="text"
          id="repoUrl"
          placeholder="github.com/theobr/t3-astro"
        />
        {errors.repoUrl && (
          <p className="text-red-400">Error: {errors.repoUrl?.message}</p>
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
    </div>
  );
};

export default function ContactPage() {
  return (
    <div
      id="about"
      className="flex flex-col justify-center items-center min-h-screen cursor-default relative text-gray-200"
    >
      <CustomSiteHead title="Contact Us" />
      <div className="w-[28rem] md:w-[42rem] max-w-full mx-4 text-lg p-4 bg-gray-700 bg-transparent-50 rounded-xl shadow-xl flex flex-col animate-fade-in-down">
        <ContactForm />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  return { props: { session } };
};
