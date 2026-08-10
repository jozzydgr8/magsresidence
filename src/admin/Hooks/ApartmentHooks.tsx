import type { UploadFile } from "antd/es/upload/interface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UseDataContext } from "../../context/UseDataContext";
import { UseAuthContext } from "../../context/UseAuthContext";

interface ApartmentFormValues {
  title: string;
  category: string;
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

    return {postApartment}
}