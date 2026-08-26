import { Button, Form, Input, Upload } from "antd";
import { Formik } from "formik";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import * as Yup from "yup";

import { FlatButton } from "../../../shared/FlatButton";
import { AmenityHooks } from "../../Hooks/AmenityHook";

export const AddAmenity = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  const { postAmenity } = AmenityHooks();

  const beforeUpload = () => false;

  const handleFileChange = ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(fileList);
  };

  // ==========================================
  // Validation
  // ==========================================

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required"),

    description: Yup.string()
      .required("Description is required"),
  });

  return (
    <section>
      <div className="container-fluid">

        <h2>Add New Amenity</h2>

        <Formik
          initialValues={{
            title: "",
            description: "",
          }}

          validationSchema={validationSchema}

          onSubmit={(values, { resetForm }) => {

            // Check images
            if (fileList.length === 0) {
              alert("Please upload at least one image");
              return;
            }

            postAmenity({
              values,
              fileList,
              setFileList,
              setLoading,
              resetForm,
            });
          }}
        >
          {(formik) => (
            <Form
              layout="vertical"
              onFinish={formik.handleSubmit}
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "12px",
              }}
            >

              {/* ==========================================
                  TITLE
              ========================================== */}

              <Form.Item
                label="Title"
                validateStatus={
                  formik.errors.title &&
                  formik.touched.title
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.title &&
                  formik.errors.title
                }
              >
                <Input
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter amenity title"
                />
              </Form.Item>


              {/* ==========================================
                  DESCRIPTION
              ========================================== */}

              <Form.Item
                label="Description"
                validateStatus={
                  formik.errors.description &&
                  formik.touched.description
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.description &&
                  formik.errors.description
                }
              >
                <Input.TextArea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter amenity description"
                  rows={5}
                />
              </Form.Item>


              {/* ==========================================
                  IMAGES
              ========================================== */}

              <Form.Item label="Upload Images">
                <Upload.Dragger
                  accept="image/*"
                  multiple={true}
                  maxCount={5}
                  fileList={fileList}
                  onChange={handleFileChange}
                  beforeUpload={beforeUpload}
                  showUploadList
                  listType="picture"
                >
                  <Button
                    icon={<UploadOutlined />}
                  >
                    Drag or Click to Upload
                  </Button>
                </Upload.Dragger>
              </Form.Item>


              <br />


              {/* ==========================================
                  SUBMIT
              ========================================== */}

              <FlatButton
                title="Add Amenity"
                className="btn btnPrimary"
                disabled={loading}
                type="submit"
              />

            </Form>
          )}
        </Formik>

      </div>
    </section>
  );
};
