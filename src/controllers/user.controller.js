import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation feilds checking -- not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object -- create entry in database
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const { username, email, fullName, password } = req.body
    console.log("email: ", email);

    if (
        [username, email, fullName, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

   const userExists = User.findOne({
        $or: [{ email }, { username }]
    })

    if (userExists) {
        throw new ApiError(409, "User already exists")
    }
   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if (!avatarLocalPath) {
       throw new ApiError(400, "Avatar is required");
   }

    const avatar = await uploadToCloudinary(avatarLocalPath);
   const coverImage = await uploadToCloudinary(coverImageLocalPath);

   if (!avatar) {
       throw new ApiError(400, "Avatar upload failed");
   }

  const user = await User.create({
       username: username.toLowerCase(),
       email,
       fullname: fullName,
       avatar: avatar.url,
       coverImage: coverImage?.url || "",
       password,
   });

   const createdUser = await User.findById(user._id).select("-password -refreshToken");
   
   if (!createdUser) {
       throw new ApiError(500, "User creation failed");
   }

   res.status(201).json(new ApiResponse(201, "User created successfully", createdUser));
})

export { registerUser }