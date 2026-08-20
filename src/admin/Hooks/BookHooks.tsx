import { toast } from "react-toastify";
import { UseAuthContext } from "../../context/UseAuthContext";
import { UseDataContext } from "../../context/UseDataContext";

export const BookHooks = () => {
  const { user } = UseAuthContext();
  const { dispatch } = UseDataContext();

  // ==========================================
  // CHECK IN
  // ==========================================

  const handleCheckIn = async (id: string) => {
    try {
      if (!user?.token) {
        toast.error("You are not authenticated");
        return;
      }

      const response = await fetch(
        `https://magsresidenceserver.vercel.app/bookings/${id}/check-in`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(
          json.message || "Unable to check in guest"
        );
      }

      dispatch({
        type: "updateBooking",
        payload: json.data || json,
      });

      toast.success("Guest checked in successfully");

      return json;
    } catch (error) {
      console.error("CHECK IN ERROR:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to check in guest"
      );

      throw error;
    }
  };

  // ==========================================
  // CHECK OUT
  // ==========================================

  const handleCheckOut = async (id: string) => {
    try {
      if (!user?.token) {
        toast.error("You are not authenticated");
        return;
      }

      const response = await fetch(
        `https://magsresidenceserver.vercel.app/bookings/${id}/check-out`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(
          json.message || "Unable to check out guest"
        );
      }

      dispatch({
        type: "updateBooking",
        payload: json.data || json,
      });

      toast.success("Guest checked out successfully");

      return json;
    } catch (error) {
      console.error("CHECK OUT ERROR:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to check out guest"
      );

      throw error;
    }
  };

  // ==========================================
  // RETURN
  // ==========================================

  return {
    handleCheckIn,
    handleCheckOut,
  };
};
