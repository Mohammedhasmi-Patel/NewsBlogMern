import React, { useState } from "react";
import { useSelector } from "react-redux";
import defaultUser from "../../assets/defaultuser.png";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import axios from "axios";

const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { user } = currentUser;

  const [imageFile, setImageFile] = useState(null);
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      if (password) formData.append("password", password);
      if (imageFile) formData.append("profilePicture", imageFile);

      const response = await axios.put(
        `/api/users/update/${user._id}`, // ✅ Update this as per your backend route
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update success:", response.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Profile update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 w-full">
      <h1 className="text-center text-3xl font-semibold mb-6">
        Update Profile
      </h1>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
            <img
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : user.profilePicture || defaultUser
              }
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <Input
            type="file"
            className="w-48"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        {/* Username */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="h-11"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="h-11"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="h-11"
          />
        </div>

        <Button
          type="submit"
          className="mt-4 bg-green-600 w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Save Changes"}
        </Button>

        <div className="text-red-500 flex justify-between mt-5 cursor-pointer">
          <span>Delete</span>
          <span>Sign Out</span>
        </div>
      </form>
    </div>
  );
};

export default DashboardProfile;
