import type { UploadFile } from "antd/es/upload/interface";
import { toast } from "react-toastify";
import { UseDataContext } from "../../context/UseDataContext";
import { UseAuthContext } from "../../context/UseAuthContext";


interface AmenityFormValues {
  title: string;
  description: string;
}

type postAmenityProps = {
  values: AmenityFormValues;
  fileList: UploadFile[];
  resetForm: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFileList: (
    value: React.SetStateAction<UploadFile<any>[]>
  ) => void;
};

type updateAmenityProps = {
  values: AmenityFormValues;
  imagesChanged: boolean;
  title: string;
  description: string;
  _id: string;
  fileList: UploadFile<any>[];
  handleCloseModal: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};


export const AmenityHooks = () => {
  const { dispatch } = UseDataContext();
  const { user } = UseAuthContext();


  // ==========================================
  // CREATE AMENITY
  // ==========================================

  const postAmenity = async ({
    values,
    fileList,
    setFileList,
    setLoading,
    resetForm,
  }: postAmenityProps) => {

    if (!fileList.length) {
      return toast.error("Please select an image to upload");
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });

      const response = await fetch(
        "https://magsresidenceserver.vercel.app/amenity",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server responded with status ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Amenity added:", data);

      dispatch({
        type: "addAmenity",
        payload: data,
      });

      setFileList([]);
      resetForm();

      toast.success("Amenity uploaded successfully!");

    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload amenity");

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // DELETE AMENITY
  // ==========================================

  const deleteAmenity = async (_id: string) => {
    try {
      const response = await fetch(
        `https://magsresidenceserver.vercel.app/amenity/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting amenity");
      }

      const json = await response.json();

      console.log("Delete successful:", json);

      dispatch({
        type: "deleteAmenity",
        payload: _id,
      });

      toast.success("Amenity deleted successfully");

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }

      toast.error("Error deleting amenity");
    }
  };


  // ==========================================
  // UPDATE AMENITY
  // ==========================================

  const updateAmenity = async ({
    values,
    imagesChanged,
    title,
    description,
    _id,
    fileList,
    handleCloseModal,
    setLoading,
  }: updateAmenityProps) => {

    setLoading(true);

    try {
      const formData = new FormData();

      let hasChanges = false;


      // ==========================================
      // Text fields
      // ==========================================

      if (values.title !== title) {
        formData.append("title", values.title);
        hasChanges = true;
      }

      if (values.description !== description) {
        formData.append("description", values.description);
        hasChanges = true;
      }


      // ==========================================
      // Images
      // ==========================================

      if (imagesChanged) {
        hasChanges = true;

        // Existing images that were NOT deleted
        const existingImages = fileList
          .filter(
            (file) =>
              !file.originFileObj &&
              file.url
          )
          .map((file) => file.uid);

        formData.append(
          "existingImages",
          JSON.stringify(existingImages)
        );


        // New images
        fileList.forEach((file) => {
          if (file.originFileObj) {
            formData.append(
              "images",
              file.originFileObj
            );
          }
        });
      }


      // ==========================================
      // Nothing changed
      // ==========================================

      if (!hasChanges) {
        toast.info("No changes were made");
        setLoading(false);
        return;
      }


      // ==========================================
      // Send request
      // ==========================================

      const response = await fetch(
        `https://magsresidenceserver.vercel.app/amenity/${_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: formData,
        }
      );


      if (!response.ok) {
        throw new Error(
          `Failed to update amenity: ${response.status}`
        );
      }


      const json = await response.json();

      console.log("Amenity updated:", json);


      // Update context
      dispatch({
        type: "updateAmenity",
        payload: json,
      });


      toast.success("Amenity updated successfully");

      handleCloseModal();

    } catch (error) {
      console.error(
        "Error updating amenity:",
        error
      );

      toast.error("Error updating amenity");

    } finally {
      setLoading(false);
    }
  };


  return {
    postAmenity,
    deleteAmenity,
    updateAmenity,
  };
};
