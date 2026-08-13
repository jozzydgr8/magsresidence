import type { UploadFile } from "antd/es/upload/interface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UseDataContext } from "../../context/UseDataContext";
import { UseAuthContext } from "../../context/UseAuthContext";



type updateprops={
    values:any,
    category:string,
    title:string, description:string, image:UploadFile[], cost:string, 
    _id:string,
    fileList: UploadFile<any>[],
    handleCloseModal:()=>void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

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


    const updateApartment = async ({handleCloseModal,values,fileList,  setLoading, description, title, category,image, cost, _id }:updateprops)=>{

        setLoading(true);
        const formData = new FormData();
        const originalApartment = {title, description, category, image, cost};
        const keys: (keyof typeof originalApartment)[]=['title', 'description', 'category', 'image','cost'];

        for (const key of keys){
            if(values[key] !== undefined && values[key] !== originalApartment[key]){
                formData.append(key, values[key]);
            }
        }

        fileList.forEach((file) => {
        if (file.originFileObj) {
            formData.append("images", file.originFileObj);
        }
        });

       //Fixed: if no data changes, alert the user and safely turn off loading
       if(!formData.has('images') && formData.keys().next().done){
            console.log('no changes to submit');
            setLoading(false);
            return;
       }
        try{
            const response = await fetch(`https://magsresidenceserver/apartment/${_id}`,{
                method:"PATCH",
                headers:{
                    'Authorization': `Bearer ${user?.token}`
                },
                body: formData,
            });
            if(!response.ok){
                throw new Error('failed to update listing');
            }
            const json = await response.json();
            dispatch({type:'updateApartment',payload:json});
            toast.success('Listing updated successfully');
            handleCloseModal();
        }catch(error){
            console.error("error updating apartment:",error);
            toast.error('error updating document');
        }finally{
            setLoading(false);
        }
    };

    return {postApartment, deleteApartment, updateApartment}
}