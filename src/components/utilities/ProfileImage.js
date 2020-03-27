import React from "react";
import defaultProfileImg from "./img/default-profile-img.jpg";

export const ProfileImage = props => {
  return (
    <div>
      {props.profileImage === null ? (
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
