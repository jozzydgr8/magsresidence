import { Formik } from "formik";
import * as Yup from "yup";
import { DatePicker, Form, Input } from "antd";
import { FlatButton } from "../../../shared/FlatButton";
import { SendOutlined } from "@ant-design/icons";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  phone: Yup.string()
    .required("Phone number is required"),

  checkIn: Yup.date()
    .nullable()
    .required("Check-in date is required"),

  checkOut: Yup.date()
    .nullable()
    .required("Check-out date is required"),
});

type capacityProp = {
  capacity: number;
};

export const ApartmentForm = ({ capacity }: capacityProp) => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        checkIn: null,
        checkOut: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log({
          ...values,
          capacity,
        });
      }}
    >
      {(formik) => (
        <Form layout="vertical" onFinish={formik.handleSubmit}>
          <div className="row">

            <div className="col-6">
              <Form.Item
                label="Full Name"
                validateStatus={
                  formik.touched.name && formik.errors.name
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : ""
                }
              >
                <Input
                  name="name"
                  placeholder="Enter your full name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="Email"
                validateStatus={
                  formik.touched.email && formik.errors.email
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""
                }
              >
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="Phone Number"
                validateStatus={
                  formik.touched.phone && formik.errors.phone
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : ""
                }
              >
                <Input
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item label="Apartment Capacity">
                <Input
                  value={`${capacity} people`}
                  disabled
                />
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="Check-in"
                validateStatus={
                  formik.touched.checkIn && formik.errors.checkIn
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.checkIn && formik.errors.checkIn
                    ? String(formik.errors.checkIn)
                    : ""
                }
              >
                <DatePicker
                  style={{ width: "100%" }}
                  value={formik.values.checkIn}
                  onChange={(date) =>
                    formik.setFieldValue("checkIn", date)
                  }
                />
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="Check-out"
                validateStatus={
                  formik.touched.checkOut && formik.errors.checkOut
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.checkOut && formik.errors.checkOut
                    ? String(formik.errors.checkOut)
                    : ""
                }
              >
                <DatePicker
                  style={{ width: "100%" }}
                  value={formik.values.checkOut}
                  onChange={(date) =>
                    formik.setFieldValue("checkOut", date)
                  }
                />
              </Form.Item>
            </div>

            <div className="col-12">
              <FlatButton
                type="submit"
                title="Continue to Payment"
                icon={<SendOutlined />}
                className="btn btnSuccess"
              />
            </div>

          </div>
        </Form>
      )}
    </Formik>
  );
};
