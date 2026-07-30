import { Formik } from "formik"
import * as Yup from 'yup';
import { Form, Input } from "antd";
import { FlatButton } from "../../../shared/FlatButton";
import {SendOutlined} from '@ant-design/icons';
import { handleRequest } from "../../../shared/handleRequest";
import { toast } from 'react-toastify';


const validationSchema = Yup.object().shape({
   
    message: Yup.string().required("Service is required"),

});
const Styles ={
   formStyle :{
        padding:"30px",
        color:"black",
        backgroundColor:"var(--offWhite)",
        borderRadius:"12px",
        boxShadow:" 0 4px 6px -1px var(--electric-teal)",
        maxWidth:'900px',
        margin: "0 auto",
        
    },
}


export const CtaForm= ()=>{
    return(
        <Formik
        initialValues={{
            message:''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, resetForm)=>{handleRequest(values.message);toast.success('Thank you for your message!')}}>
            {
                formik=>{
                    return(
                        <Form layout="vertical" onFinish={formik.handleSubmit} style={Styles.formStyle}>
                            <div>
                                <Form.Item label='Your Message*'>
                                    <Input.TextArea name="message"
                                          placeholder="Tell us about your stay - number of guests, apartment preference, any special requirements..."
                                            value={formik.values.message}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            required/>
                                </Form.Item>
                                <FlatButton  className="btn btnSuccess btn-xl" title="Subscribe" icon={<SendOutlined/>} onClick={formik.handleSubmit}
                                />
                                <br/>
                                <small>We respect your privacy. Your information will only be used to respond to your inquiry.</small>
                            </div>
                        </Form>
                    )
                }
            }

        </Formik>
    )
}