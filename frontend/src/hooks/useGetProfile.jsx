import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../store/userSlice";
import { getRefresh } from "../store/blogSlice";

const useGetProfile = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(`/api/v2/users/get-user/${id}`);
        const user = await response.json();
        dispatch(getMyProfile(user));
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, []);
};

export default useGetProfile;
