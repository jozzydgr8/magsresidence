import {
  Form,
  Input,
  Modal,
  Popconfirm,
  Upload,
  UploadFile,
} from "antd";

import { Formik } from "formik";
import {
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { useEffect, useState } from "react";

import { FlatButton } from "../../shared/FlatButton";
import { AmenityHooks } from "../Hooks/AmenityHook";


type AmenityImage = {
  _id?: string;
  url: string;
  public_id?: string;
};


type UpdateAmenityProps = {
  isOpen: boolean;
  handleCloseModal: () => void;

  title: string;
  description: string;

  images: AmenityImage[];

  _id: string;
};


interface AmenityFormValues {
  title: string;
  description: string;
  images: UploadFile[];
}


export const UpdateAmenity = ({
  isOpen,
  handleCloseModal,
  title,
  description,
  images,
  _id,
}: UpdateAmenityProps) => {

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [imagesChanged, setImagesChanged] = useState(false);

  const {
    updateAmenity,
    deleteAmenity,
  } = AmenityHooks();


  // ==========================================
  // Convert existing images to UploadFile
  // ==========================================

  useEffect(() => {
    if (images?.length) {

      const existingFiles: UploadFile[] =
        images.map((image, index) => ({
          uid: image._id || `existing-${index}`,
          name: `current-image-${index + 1}.jpg`,
          status: "done",
          url: image.url,
        }));

      setFileList(existingFiles);

    } else {

      setFileList([]);

    }

    setImagesChanged(false);

  }, [images]);


  // ==========================================
  // Initial Formik values
  // ==========================================

  const initialValues: AmenityFormValues = {
    title,
    description,
    images: [],
  };


  return (
    <Modal
      onCancel={handleCloseModal}
      open={isOpen}
      footer={null}
      title="Update Amenity"
      destroyOnClose
    >

      <Formik<AmenityFormValues>
        enableReinitialize
        initialValues={initialValues}

        onSubmit={async (values) => {

          await updateAmenity({
            values,
            fileList,
            imagesChanged,
            title,
            description,
            _id,
            handleCloseModal,
            setLoading,
          });

        }}
      >

        {(formik) => (

          <Form
            layout="vertical"
            onFinish={formik.handleSubmit}
          >

            {/* ==========================================
                TITLE
            ========================================== */}

            <Form.Item label="Title">

              <Input
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Amenity title"
              />

            </Form.Item>


            {/* ==========================================
                DESCRIPTION
            ========================================== */}

            <Form.Item label="Description">

              <Input.TextArea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
                placeholder="Amenity description"
              />

            </Form.Item>


            {/* ==========================================
                IMAGES
            ========================================== */}

            <Form.Item label="Images">

              <Upload
                listType="picture"
                fileList={fileList}
                beforeUpload={() => false}
                multiple

                onChange={({
                  fileList: newFileList,
                }) => {

                  setFileList(newFileList);
                  setImagesChanged(true);

                  formik.setFieldValue(
                    "images",
                    newFileList
                  );

                }}

                onRemove={(file) => {

                  const updatedList =
                    fileList.filter(
                      (item) =>
                        item.uid !== file.uid
                    );

                  setFileList(updatedList);
                  setImagesChanged(true);

                  formik.setFieldValue(
                    "images",
                    updatedList
                  );

                  return true;

                }}
              >

                <FlatButton
                  title="Upload Image"
                  icon={<UploadOutlined />}
                  className="btn btnSuccess"
                  type="button"
                />

              </Upload>

            </Form.Item>


            {/* ==========================================
                BUTTONS
            ========================================== */}

            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >

              <FlatButton
                title={
                  loading
                    ? "Updating..."
                    : "Update"
                }
                disabled={loading}
                className="btn btnSuccess"
                onClick={() =>
                  formik.handleSubmit()
                }
              />


              <Popconfirm
                title="Are you sure you want to delete this amenity?"
                description="This action cannot be undone."

                onConfirm={() =>
                  deleteAmenity(_id)
                }

                okText="Yes, delete"
                cancelText="Cancel"
              >

                <span>

                  <FlatButton
                    className="btn btnPrimary"
                    title="Delete Amenity"
                    icon={<DeleteOutlined />}
                    type="button"
                  />

                </span>

              </Popconfirm>

            </div>

          </Form>

        )}

      </Formik>

    </Modal>
  );
};
