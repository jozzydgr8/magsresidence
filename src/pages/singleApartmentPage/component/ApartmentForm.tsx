import { Formik } from "formik";
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import { FlatButton } from '../../../shared/FlatButton';
import {SendOutlined} from '@ant-design/icons'
import { DatePicker, Form } from "antd";

const validationSchema = Yup.object().shape({

})
export const ApartmentForm = ()=>{
    return(
        <Formik
        initialValues={{
            checkIn:null,
            checkOut:null,
            
        }}
        onSubmit={(values)=>{console.log(values)}}>
            {(formik)=>{
                return(
                    <Form layout="vertical" onFinish={formik.handleSubmit}>
                        <div className="row">
                            <div className="col-6">
                                <Form.Item
                                label='Check-in'>
                                    <DatePicker
                                    style={{width:'100%'}}
                                    value={formik.values.checkIn}
                                    onChange={(date)=>{
                                        formik.setFieldValue("checkIn", date)
                                    }}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}