import { Button, Form, Input, Upload, Select, Switch } from "antd"
import { Formik } from "formik"
import { FlatButton } from "../../../shared/FlatButton";
import { useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from "antd/es/upload/interface";
// import { ApartmentHooks } from "../../Hooks/ApartmentHooks";
import * as Yup from 'yup';

export const AddApartment = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  // const { postApartment } = ApartmentHooks();

  const beforeUpload = () => false;

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
   
    description: Yup.string().required("Description is required"),
    cost: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable()
      .required("Reading time is required"),
  });

  return (
    <section>
      <div className="container-fluid">
        <h2>Add New Apartment</h2>
        <Formik
          initialValues={{
            title: '', category: "", description: "", cost: '', image: '', featured: false
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            // Explicit check for file validation before calling your API hook
            if (fileList.length === 0) {
              alert("Please upload a featured image!"); // Or use your toast handler
              return;
            }
            // postApartment({ values, setFileList, fileList, setLoading, resetForm });
          }}
        >
          {(formik) => (
            /* Changed onFinish to just native HTML onSubmit via formik */
            <Form 
              layout="vertical" 
              onFinish={formik.handleSubmit} 
              style={{ background: "white", padding: "30px", borderRadius: '12px' }}
            >
              {/* TITLE */}
              <Form.Item 
                label="Title" 
                validateStatus={formik.errors.title && formik.touched.title ? "error" : ""}
                help={formik.touched.title && formik.errors.title}
              >
                <Input
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

           
              {/* description */}
              <Form.Item 
                label="Description"
                validateStatus={formik.errors.description && formik.touched.description ? "error" : ""}
                help={formik.touched.description && formik.errors.description}
              >
                <Input
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              {/* READING TIME */}
              <Form.Item 
                label="Cost Per Day"
                validateStatus={formik.errors.cost && formik.touched.cost ? "error" : ""}
                help={formik.touched.cost && formik.errors.cost}
              >
                <Input
                  name="cost"
                  type="number"
                  value={formik.values.cost}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              

              {/* UPLOAD IMAGES (Removed AntD rules) */}
              <Form.Item label="Upload Images">
                <Upload.Dragger
                  accept="image/*"
                  multiple={false}
                  maxCount={1}
                  fileList={fileList}
                  onChange={handleFileChange}
                  beforeUpload={beforeUpload}
                  showUploadList
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>Drag or Click to Upload</Button>
                </Upload.Dragger>
              </Form.Item>

              <br />
              {/* SUBMIT BUTTON */}
              <FlatButton
                title="Add Apartment"
                className="btn btnPrimary"
                disabled={loading}
              
              />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}