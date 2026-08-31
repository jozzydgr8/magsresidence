import { toast } from "react-toastify";
import { UseDataContext } from "../../context/UseDataContext";
import { UseAuthContext } from "../../context/UseAuthContext";
import { AvailabilityBlock } from "../../types";

type CreateAvailabilityProps = {
  apartment: string;
  checkIn: string;
  checkOut: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  resetForm?: () => void;
};

type UpdateAvailabilityProps = {
  _id: string;
  apartment?: string;
  checkIn?: string;
  checkOut?: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AvailabilityHooks = () => {
  const { dispatch } = UseDataContext();
  const { user } = UseAuthContext();

  const baseUrl =
    "https://magsresidenceserver.vercel.app/availability";

  // ------------------------------------------
  // Get availability blocks
  // ------------------------------------------

  const getAvailabilityBlocks = async () => {
    dispatch({ type: "loading", payload: true });

    try {
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error(
          `Failed to get availability blocks: ${response.status}`
        );
      }

      const data: AvailabilityBlock[] = await response.json();

      dispatch({
        type: "getAvailabilityBlocks",
        payload: data,
      });

      return data;
    } catch (error) {
      console.error("Error getting availability blocks:", error);

      toast.error("Failed to get availability blocks");

      dispatch({ type: "loading", payload: false });
    }
  };

  // ------------------------------------------
  // Create availability block
  // ------------------------------------------

  const createAvailabilityBlock = async ({
    apartment,
    checkIn,
    checkOut,
    setLoading,
    resetForm,
  }: CreateAvailabilityProps) => {
    setLoading(true);

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          apartment,
          checkIn,
          checkOut,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.message ||
            `Failed to create availability block: ${response.status}`
        );
      }

      const data: {
        message: string;
        availability: AvailabilityBlock;
      } = await response.json();

      dispatch({
        type: "addAvailabilityBlock",
        payload: data.availability,
      });

      toast.success("Apartment blocked successfully");

      resetForm?.();

      return data.availability;
    } catch (error) {
      console.error(
        "Error creating availability block:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to block apartment"
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------
  // Update availability block
  // ------------------------------------------

  const updateAvailabilityBlock = async ({
    _id,
    apartment,
    checkIn,
    checkOut,
    setLoading,
  }: UpdateAvailabilityProps) => {
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          ...(apartment !== undefined && { apartment }),
          ...(checkIn !== undefined && { checkIn }),
          ...(checkOut !== undefined && { checkOut }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.message ||
            `Failed to update availability block: ${response.status}`
        );
      }

      const data: {
        message: string;
        availability: AvailabilityBlock;
      } = await response.json();

      dispatch({
        type: "updateAvailabilityBlock",
        payload: data.availability,
      });

      toast.success("Availability block updated successfully");

      return data.availability;
    } catch (error) {
      console.error(
        "Error updating availability block:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update availability block"
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------
  // Delete availability block
  // ------------------------------------------

  const deleteAvailabilityBlock = async (
    _id: string,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading?.(true);

    try {
      const response = await fetch(`${baseUrl}/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.message ||
            `Failed to delete availability block: ${response.status}`
        );
      }

      await response.json();

      dispatch({
        type: "deleteAvailabilityBlock",
        payload: _id,
      });

      toast.success("Availability block deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting availability block:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete availability block"
      );
    } finally {
      setLoading?.(false);
    }
  };

  return {
    getAvailabilityBlocks,
    createAvailabilityBlock,
    updateAvailabilityBlock,
    deleteAvailabilityBlock,
  };
};
