import API from "./api";

// CREATE Profile
export const createProfile = (data) => 
  API.post("/profile/create", data);

// GET My Profile
export const getMyProfile = () => 
  API.get("/profile/me");

// UPDATE Profile
export const updateProfile = (data) => 
  API.put("/profile/update", data);

// DELETE Profile
export const deleteProfile = () => 
  API.delete("/profile/delete");