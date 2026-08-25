import type { UploadFile } from "antd/es/upload/interface";
import { toast } from "react-toastify";
import { UseDataContext } from "../../context/UseDataContext";
import { UseAuthContext } from "../../context/UseAuthContext";

interface PostGalleryProps {
  fileList: UploadFile<any>[];
  setFileList: React.Dispatch<
    React.SetStateAction<UploadFile<any>[]>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GalleryHooks = () => {
  const { dispatch } = UseDataContext();
  const { user } = UseAuthContext();

  const postGallery = async ({
    fileList,
    setFileList,
    setLoading,
  }: PostGalleryProps) => {

    if (!fileList.length) {
      return toast.error("Please select an image to upload");
    }

    // Get the actual File object
    const file = fileList[0].originFileObj;

    if (!file) {
      return toast.error("Please select a valid image");
    }

    setLoading(true);

    const formData = new FormData();

    // IMPORTANT:
    // This must match upload.single("image") in your backend
    formData.append("image", file);

    try {
      const res = await fetch(
        "https://magsresidenceserver.vercel.app/gallery",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error(
          `Server responded with status ${res.status}`
        );
      }

      const data = await res.json();

      console.log("Gallery added:", data);

      dispatch({
        type: "addGallery",
        payload: data,
      });

      setFileList([]);

      toast.success("Gallery image uploaded successfully!");

    } catch (error) {
      console.error("Gallery upload failed:", error);

      toast.error("Gallery upload failed");

    } finally {
      setLoading(false);
    }
  };

  
  const deleteGallery = async (_id: string) => {
    try {
      const response = await fetch(
        `https://magsresidenceserver.vercel.app/gallery/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete gallery: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Gallery deleted:", data);

      dispatch({
        type: "deleteGallery",
        payload: _id,
      });

      toast.success("Gallery image deleted successfully!");

    } catch (error) {
      console.error("Gallery delete failed:", error);
      toast.error("Error deleting gallery image");
    }
  };

  return {
    postGallery,deleteGallery
  };
};
