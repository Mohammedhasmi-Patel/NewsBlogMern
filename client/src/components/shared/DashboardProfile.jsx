import React from "react";
import { useSelector } from "react-redux";
import defaultUser from "../../assets/defaultuser.png";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { user } = currentUser;
  console.log(user);

  return (
    <div className="max-w-xl mx-auto p-4 w-full">
      <h1 className="text-center text-3xl font-semibold mb-6">
        Update Profile
      </h1>

      <form className="flex flex-col gap-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
            <img
              src={user.profilePicture || defaultUser}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <Input type="file" className="w-48" />
        </div>

        {/* Username */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            defaultValue={user.username}
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
            defaultValue={user.email}
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
            placeholder="Enter new password"
            className="h-11"
          />
        </div>

        <Button type="submit" className="mt-4 bg-green-600 w-full">
          Save Changes
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
