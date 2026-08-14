import type { UploadFile } from "antd/es/upload/interface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UseDataContext } from "../../context/UseDataContext";
import { UseAuthContext } from "../../context/UseAuthContext";



type updateprops={
    values:any,
   
    title:string, description:string, cost:string, 
    _id:string,
    fileList: UploadFile<any>[],
    handleCloseModal:()=>void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface ApartmentFormValues {
  title: string;

  description: string;
  cost: string;
  images: UploadFile[];
}



type postApartment = {
    values:ApartmentFormValues, fileList:UploadFile<any>[], resetForm:()=>void,setLoading:React.Dispatch<React.SetStateAction<boolean>>, setFileList: (value: React.SetStateAction<UploadFile<any>[]> )=>void
}

export const ApartmentHooks = ()=>{
    const {dispatch} = UseDataContext();
    const {user} = UseAuthContext();
    const navigate = useNavigate();
    const postApartment = async ({values,fileList, setFileList, setLoading,resetForm}:postApartment)=>{
        if(!fileList.length){
            return toast.error('please select a file to upload')
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('cost',values.cost);

        fileList.forEach((file) => {
        if (file.originFileObj) {
            formData.append("images", file.originFileObj);
        }
        });

    
        console.log(Array.from(formData.entries()));
        try{
            const res = await fetch("https://magsresidenceserver.vercel.app/apartment",{
                method:"POST",
                headers:{
                    'Authorization': `Bearer ${user?.token}`
                },
                body: formData,
            });
            if(!res.ok){
                throw new Error(`server responded with status ${res.status}`)
            }
            const data = await res.json();
            console.log('apartment added', data);
            dispatch({type:'addApartment', payload:data});
            setFileList([]);
            resetForm();
            toast.success("apartment uploaded successfully!");
        } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Upload failed");
        
        }finally{
            setLoading(false)
        }


    }

    const deleteApartment = async(_id:string)=>{
        try{
            const response = await fetch(`https://magsresidenceserver.vercel.app/apartment/${_id}`,{
                method:'delete',
                headers:{
                    'Authorization': `Bearer ${user?.token}`
                }
            })
            if(!response.ok){
                throw Error('error deleting apartment')
            }
            const json = await response.json();
            console.log('delete successful', json);
            toast.success('Listing delete successful');
            dispatch({type:'deleteApartment', payload:_id});

        }catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error(error);
            }
            toast.error('error deleting document')
        }finally{
            navigate('/admin_jctbdil1$');
        }
    }


    const updateApartment = async ({
  handleCloseModal,
  values,
  fileList,
  setLoading,
  title,
  description,
  cost,
  _id,
}: updateprops) => {
  setLoading(true);

  try {
    const formData = new FormData();

    if (values.title !== title) {
      formData.append("title", values.title);
    }

    if (values.description !== description) {
      formData.append("description", values.description);
    }

    if (values.cost !== String(cost)) {
      formData.append("cost", values.cost);
    }

    /*
     * Only append files that were actually selected/uploaded.
     * Existing images have no originFileObj.
     */
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });

    /*
     * Don't make an API request if nothing changed.
     * Using Array.from avoids TypeScript iteration issues in older target configs.
     */
    if (Array.from(formData.keys()).length === 0) {
      toast.info("No changes were made");
      setLoading(false);
      return;
    }

    const response = await fetch(
      `https://magsresidenceserver.vercel.app/apartment/${_id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update apartment: ${response.status}`);
    }

    const json = await response.json();

    dispatch({
      type: "updateApartment",
      payload: json,
    });

    toast.success("Apartment updated successfully");

    handleCloseModal();
  } catch (error) {
    console.error("Error updating apartment:", error);
    toast.error("Error updating apartment");
  } finally {
    setLoading(false);
  }
};

    return {postApartment, deleteApartment, updateApartment}
}