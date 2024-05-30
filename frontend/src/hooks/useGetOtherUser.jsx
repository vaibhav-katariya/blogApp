import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherProfile } from "../store/userSlice";

const useGetOtherUser = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getOtherUser = async () => {
      try {
        const res = await fetch(`/api/v2/users/get-user/${id}`);
        const data = await res.json();
        dispatch(getOtherProfile(data));
      } catch (error) {
        console.log(error);
      }
    };
    getOtherUser();
  }, []);
};

export default useGetOtherUser;
