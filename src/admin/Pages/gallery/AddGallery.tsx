import { Button, Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState } from "react";
import { FlatButton } from "../../../shared/FlatButton";
import { GalleryHooks } from "../../Hooks/GalleryHooks";

export const AddGallery = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const {postGallery} = GalleryHooks();

  const beforeUpload = () => false;

  const handleFileChange: UploadProps["onChange"] = ({ fileList }) => {
    // Only allow one image
    setFileList(fileList.slice(-1));
  };

 

  return (
    <section>
      <div className="container-fluid">
        <h2>Add Gallery Image</h2>

        <Form
          layout="vertical"
          onFinish={()=>postGallery({fileList, setFileList,setLoading})}
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
          }}
        >
          <Form.Item label="Gallery Image">
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
              <Button icon={<UploadOutlined />}>
                Drag or Click to Upload
              </Button>
            </Upload.Dragger>
          </Form.Item>

          <br />

          <FlatButton
            title="Add Gallery Image"
            className="btn btnPrimary"
            disabled={loading}
            type="submit"
          />
        </Form>
      </div>
    </section>
  );
};
