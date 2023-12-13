import React, { useState } from 'react'
import "./user-option.css"
import { followUser } from '../../services/user/actions/folllowUser';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../libs/getCurrentUser';
import { deletePost } from '../../services/post/actions/crud/deletePost';
import { muteUser } from '../../services/user/actions/muteUser';
import { blockUser } from '../../services/user/actions/blockUser';
import { reportUser } from '../../services/user/actions/reportUser';
import useWindowWidth from '../../hooks/useWindowWidth';
import Button from '../ui/Button';

const UserOption = ({ user, postId}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch()
  const currentUser = getCurrentUser()
  const {screenWidth} = useWindowWidth()
  const {_id, username} = user

  console.log(user)

  // const userUid = _id === currentUser.userUid && user.userName

  const userUid = currentUser.userUid === _id

  const options = [
    {label: `Copy Link`, action:  () =>  console.log("link")},
    {label: `Mute @${username}`, action:  () =>  console.log("mute")},
    {label: `Block @${username}`, action: () =>  console.log("block")},
    {label: `Report Post`, action:() => console.log("report")},
    userUid && {label: `Delete Post`, action:() => console.log("report")},
]

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    let options;

    switch (option.label) {
      case 'Copy Link':
        console.log("copyLink")
        break;
      case `Mute @${username}`:
        options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.userToken}
            `,
          },
        };
        dispatch(muteUser({options, userUid: _id}))
        break;
      case `Block @${username}`:
        console.log("Block")
        options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.userToken}
            `,
          },
        };
        dispatch(blockUser({options, userUid: _id}))
        break;
      case 'Report Post':
        options = {
          options: {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}
              `,
            },
          },
          userUid: _id,
          postId
        }

        dispatch(reportUser(options))
        break;
      case 'Delete Post':
        console.log(postId)
        options = {
          options: {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}`,
            },
          },
          postId
        }
        console.log("delete", options)
        return dispatch(deletePost(options))
      default:
        break;
    }
  };

  const handleUserAction = (option) => {
    if (option && option.action) {
      return option.action()
    }
  };

  const excludedLabels = [`Mute @${username}`, `Block @${username}`, `Report Post`];

  const filteredOptions = !userUid
    ? 
      options
    : 
      options.filter((option) => !excludedLabels.includes(option.label))
  ;

  return (
    <aside className={`user-option-container  ${screenWidth >= 768 && "screen"}`  } >
      <div className="option-container">
        <ul className="option-list">
          {filteredOptions.map((option) => (
            <li key={option.label} onClick={() => handleOptionClick(option)}>
              <Button text={option.label} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default UserOption
