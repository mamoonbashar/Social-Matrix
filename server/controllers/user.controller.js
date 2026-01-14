import { json } from "stream/consumers";
import userModel from "../models/user.model.js";


// Get userprofile  details following followees and name email
// and checking user seeing it own profile or someone elses profile

// Show Loged-in User Profile Details
export async function getProfile(req, res) {
  const userId = req.params.id;
try{
  const user = await userModel.findById(userId).select("-password -email -contact");
  const userData = {
    id: user._id,
    name: user.fullname,
    email: user.email,
    followers: user.followers.length,
    following: user.following.length,
    contact: user.contact,
  };
  res.send(userData);
}
catch(error){
  console.log(error.message)
}
}

export async function getFollowers(req, res) {
  const userId = req.params.id;
  try {
    const userFollower = await userModel
      .findById(userId)
      .populate("followers", "fullname")
      .select("-password");
    const followerData = userFollower.followers.map((follower) => ({
      id: follower._id,
      fullname: follower.fullname,
    }));
    console.log(followerData);
    res.send(followerData);
  } catch (error) {
    res.send(error);
  }
}
export async function getFollowing(req, res) {
  const userId = req.params.id;
 
  try {
    const userFollower = await userModel
      .findById(userId)
      .populate("following", "fullname")
      .select("-password");
       
    const followingData = userFollower.following.map((following) => ({
      id: following._id,
      fullname: following.fullname,
    }));
    
    res.send(followingData);
  } catch (error) {
    res.send(error);
  }
}

export async function updateProfile(req, res) {
  const userIdFromCookie = req.user.id;
  const alllowedFields = ["fullname", "contact"];
  const updates = {};

  for (let key of alllowedFields) {
    if (req.body[key] !== undefined) {
      updates[key] = req.body[key];
    }
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "Nothing to Update" });
  }

  const user = await userModel
    .findByIdAndUpdate(
      userIdFromCookie,
      { $set: updates },
      { new: true, runValidator: true }
    )
    .select("-password");
  res.send(user);
}

// Following and Follow user
export async function follow(req, res) {
  const userId = req.user.id;
  const paramId = req.params.id;
  try {
    if (userId !== paramId) {
      // add me to param user followers
      await userModel.findByIdAndUpdate(paramId, {
        $addToSet: { followers: userId },
      });

      // add params to my following list
      await userModel.findByIdAndUpdate(userId, {
        $addToSet: { following: paramId },
      });

      // req.flash("message", "user Followed Successfully");
      res.json({ message: "User Followed Successfully" });
    } else {
      console.log("You cannot follow Yourself");
    }
  } catch (error) {
    console.error(error, "cant follow user,User doesn't exist");
  }
}


export async function unfollow(req, res) {
  const userId = req.user.id;
  const paramId = req.params.id;
  try {
    // remove target from my following
    await userModel.findByIdAndUpdate(userId, {
      $pull: { following: paramId },
    });
    // remove id from target followers
    await userModel.findByIdAndUpdate(paramId, {
      $pull: { followers: userId },
    });
    res.json({ message: "You Unfollwed succefully" });
  } catch (error) {
    res.json({ message: "Somethin went wrong " });
  }
}
