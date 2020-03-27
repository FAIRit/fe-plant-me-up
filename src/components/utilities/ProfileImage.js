import React from "react";
import defaultProfileImg from "./img/default-profile-img.jpg";

export const ProfileImage = props => {
  console.log(defaultProfileImg)
  return (
    <div>
      {props.profileImage === undefined ? (
        <div>
          <img
            src={defaultProfileImg}
            className="grid-profile-img"
            alt="profile"
          />
        </div>
      ) : (
        <div>
          <img src={props.profileImage} alt="profile" />
        </div>
      )}
    </div>
  );
};
