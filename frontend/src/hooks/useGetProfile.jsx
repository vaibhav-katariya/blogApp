import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../store/userSlice";

const useGetProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch("/api/v2/users/get-current-user");
        const {userData} = await response.json();
        // console.log(userData);
        dispatch(getMyProfile(userData));
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, []);
};

export default useGetProfile;
