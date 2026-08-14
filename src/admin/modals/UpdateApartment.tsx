import {
  Form,
  Input,
  Modal,
  Popconfirm,
  Upload,
  UploadFile,
} from "antd";
import { Formik } from "formik";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import { FlatButton } from "../../shared/FlatButton";
import { ApartmentHooks } from "../Hooks/ApartmentHooks";

type ApartmentImage = {
  _id?: string;
  url: string;
};

type UpdateApartmentProps = {
  isOpen: boolean;
  handleCloseModal: () => void;

  title: string;
  description: string;
  cost: number;

  images: ApartmentImage[];

  _id: string;
};

interface ApartmentFormValues {
  title: string;
  description: string;
  cost: string;
  images: UploadFile[];
}

export const UpdateApartment = ({
  isOpen,
  handleCloseModal,
  title,
  description,
  cost,
  images,
  _id,
}: UpdateApartmentProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  const { updateApartment, deleteApartment } = ApartmentHooks();

  /*
   * Convert the existing apartment images into Ant Design UploadFile objects.
   */
  useEffect(() => {
    if (images?.length) {
      const existingFiles: UploadFile[] = images.map((image, index) => ({
        uid: image._id || `existing-${index}`,
        name: `current-image-${index + 1}.jpg`,
        status: "done",
        url: image.url,
      }));

      setFileList(existingFiles);
    } else {
      setFileList([]);
    }
  }, [images]);

  const initialValues: ApartmentFormValues = {
    title,
    description,
    cost: String(cost),
    images: [],
  };

  return (
    <Modal
      onCancel={handleCloseModal}
      open={isOpen}
      footer={null}
      title="Update Apartment"
      destroyOnClose
    >
      <Formik<ApartmentFormValues>
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          await updateApartment({
            values,
            fileList,
            title,
            description,
            cost: String(cost),
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
            <Form.Item label="Title">
              <Input
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder="Apartment title"
              />
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                rows={4}
                placeholder="Apartment description"
              />
            </Form.Item>

            <Form.Item label="Cost">
              <Input
                name="cost"
                type="number"
                value={formik.values.cost}
                onChange={formik.handleChange}
                placeholder="Apartment cost"
              />
            </Form.Item>

            <Form.Item label="Images">
              <Upload
                listType="picture"
                fileList={fileList}
                beforeUpload={() => false}
                multiple
                onChange={({ fileList: newFileList }) => {
                  setFileList(newFileList);
                  formik.setFieldValue("images", newFileList);
                }}
                onRemove={(file) => {
                  const updatedList = fileList.filter(
                    (item) => item.uid !== file.uid
                  );

                  setFileList(updatedList);
                  formik.setFieldValue("images", updatedList);

                  return true;
                }}
              >
                <FlatButton
                  title="Upload Image"
                  icon={<UploadOutlined />}
                  className="btn btnSuccess"
                />
              </Upload>
            </Form.Item>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <FlatButton
                title={loading ? "Updating..." : "Update"}
                disabled={loading}
                className="btn btnSuccess"
                onClick={() => formik.handleSubmit()}
              />

              <Popconfirm
                title="Are you sure you want to delete this apartment?"
                description="This action cannot be undone."
                onConfirm={() => deleteApartment(_id)}
                okText="Yes, delete"
                cancelText="Cancel"
              >
                <span>
                  <FlatButton
                    className="btn btnPrimary"
                    title="Delete Apartment"
                    icon={<DeleteOutlined />}
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