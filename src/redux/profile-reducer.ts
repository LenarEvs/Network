import {profileAPI} from "../api/api";
import {reset} from "redux-form";
import { ProfileType, PostsType } from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE'; 
const SET_USER_STATUS = 'SET-USET-STATUS'; 
const SET_MY_PROFILE = 'SET_MY_PROFILE';


let initialState ={
  profile: null as null | ProfileType,
  myProfile: null as null | ProfileType,
  status: "",
  postData: [
    {author: 'Lenar Evstafev', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, dolor ut mollis rutrum, mauris arcu mollis lacus, eget imperdiet neque neque eget nisl.', like: 0, id: 1},
    {author: 'Lenar Evstafev', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, dolor ut mollis rutrum, mauris arcu mollis lacus, eget imperdiet neque neque eget nisl.', like: 12, id: 2},
    {author: 'Lenar Evstafev', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, dolor ut mollis rutrum, mauris arcu mollis lacus, eget imperdiet neque neque eget nisl.', like: 45, id: 3},
  ] as Array<PostsType>
}

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action:ActionType):initialStateType  =>{
  switch(action.type){
    case ADD_POST:
      let newPost ={
        author: 'Lenar Evstafev',
        text: action.newPostText,
        like: 0,
        id: 4,
      }
      return{
        ...state,
        postData: [...state.postData, newPost]
      }
      case SET_USER_PROFILE: 
      return { 
        ...state, 
        profile: action.profile
      } 
    case SET_MY_PROFILE:  
    return { 
      ...state, 
      myProfile: action.profile
    } 
    case SET_USER_STATUS: 
      return{ 
        ...state, 
        status: action.status 
      } 
    default:
      return state;
  }
}

type ActionType = AddPostActionType | SetMyProfileActionType | SetUserProfileActionType | SetUserStatusActionType

type AddPostActionType = {
  type: typeof ADD_POST,
  newPostText: string
}
export const AddPost = (newPostText:string): AddPostActionType => ({type: ADD_POST, newPostText});
type SetMyProfileActionType = {
  type: typeof SET_MY_PROFILE,
  profile: ProfileType
}
export const SetMyProfile = (profile: ProfileType): SetMyProfileActionType => ({type: SET_MY_PROFILE, profile});
type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
}
export const SetUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});
type SetUserStatusActionType = {
  type: typeof SET_USER_STATUS,
  status: string
}
export const SetUserStatus = (status: string): SetUserStatusActionType => ({type: SET_USER_STATUS, status});

export const AddNewPost = (newPostText: string) => (dispatch: Dispatch<ActionType>) =>{
  dispatch(AddPost(newPostText));
  dispatch(<AddPostActionType>reset('post'));
}
export const getProfile = (userId: number) => async (dispatch: Dispatch<ActionType>) =>{
  const profile = await profileAPI.getUserProfile(userId); 
  dispatch(SetUserProfile(profile.data)); 
} 
export const getMyProfile = (userId: number | null) => async (dispatch: Dispatch<ActionType>) =>{
  const profile = await profileAPI.getUserProfile(userId); 
  dispatch(SetMyProfile(profile.data)); 
} 
 
export const getStatus = (userId: string) => async (dispatch: Dispatch<ActionType>) => {
  const status = await profileAPI.getUserStatus(userId);
  dispatch(SetUserStatus(status)); 
} 

export const updateStatus =(status: string) => async (dispatch: Dispatch<ActionType>) =>{
  let response = await profileAPI.updateStatus(status);
  if(response.data.resultCode === 0) {
    dispatch(SetUserStatus(status));
  }
}
export default profileReducer