import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const ProfileDetails = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");

  // Fetch user data to pre-fill the form
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/users?email=${user?.email}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const userData = await response.json();

        if (userData) {
          reset({ name: userData.name }); // Pre-fill the form
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [user?.email, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/users?email=${user?.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name }),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile");
    }
  };
  return <div className="mt-32 flex justify-center">
    <div className="p-4 border rounded shadow mx-2 lg:mx-0 lg:w-[500px]">
      <h2 className="text-lg font-semibold mb-2">Update Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Enter new name"
          className="border p-2 rounded w-full"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <button type="submit" className="mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
          Update Name
        </button>
      </form>
      {message && <p className="mt-2 text-[blue]">{message}</p>}
    </div>
  </div>;
};
export default ProfileDetails;