import { DatePicker, Form, Select } from "antd";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";

import { FlatButton } from "../../../shared/FlatButton";
import { AvailabilityHooks } from "../../Hooks/AvailabilityHooks";
import { UseDataContext } from "../../../context/UseDataContext";

export const AddAvailability = () => {
  const [loading, setLoading] = useState(false);

  const { Apartments } = UseDataContext();
  const { createAvailabilityBlock } = AvailabilityHooks();

  // ==========================================
  // Validation
  // ==========================================

  const validationSchema = Yup.object().shape({
    apartment: Yup.string()
      .required("Apartment is required"),

    checkIn: Yup.string()
      .required("Check-in date is required"),

    checkOut: Yup.string()
      .required("Check-out date is required")
      .test(
        "after-check-in",
        "Check-out must be after check-in",
        function (value) {
          const { checkIn } = this.parent;

          if (!checkIn || !value) {
            return true;
          }

          return dayjs(value).isAfter(dayjs(checkIn), "day");
        }
      ),
  });

  return (
    <section>
      <div className="container-fluid">

        <h2>Block Apartment</h2>

        <Formik
          initialValues={{
            apartment: "",
            checkIn: "",
            checkOut: "",
          }}

          validationSchema={validationSchema}

          onSubmit={(values, { resetForm }) => {
            createAvailabilityBlock({
              apartment: values.apartment,
              checkIn: values.checkIn,
              checkOut: values.checkOut,
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
                  APARTMENT
              ========================================== */}

              <Form.Item
                label="Apartment"
                validateStatus={
                  formik.errors.apartment &&
                  formik.touched.apartment
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.apartment &&
                  formik.errors.apartment
                }
              >
                <Select
                  placeholder="Select apartment"
                  value={
                    formik.values.apartment || undefined
                  }
                  onChange={(value) => {
                    formik.setFieldValue(
                      "apartment",
                      value
                    );
                  }}
                  onBlur={() => {
                    formik.setFieldTouched(
                      "apartment",
                      true
                    );
                  }}
                  options={
                    Apartments?.map((apartment) => ({
                      label: apartment.title,
                      value: apartment._id,
                    })) || []
                  }
                />
              </Form.Item>


              {/* ==========================================
                  CHECK IN
              ========================================== */}

              <Form.Item
                label="Check-in"
                validateStatus={
                  formik.errors.checkIn &&
                  formik.touched.checkIn
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.checkIn &&
                  formik.errors.checkIn
                }
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD"
                  value={
                    formik.values.checkIn
                      ? dayjs(formik.values.checkIn)
                      : null
                  }
                  onChange={(date: Dayjs | null) => {
                    formik.setFieldValue(
                      "checkIn",
                      date
                        ? date.format("YYYY-MM-DD")
                        : ""
                    );
                  }}
                  onBlur={() => {
                    formik.setFieldTouched(
                      "checkIn",
                      true
                    );
                  }}
                  disabledDate={(current) =>
                    current &&
                    current < dayjs().startOf("day")
                  }
                />
              </Form.Item>


              {/* ==========================================
                  CHECK OUT
              ========================================== */}

              <Form.Item
                label="Check-out"
                validateStatus={
                  formik.errors.checkOut &&
                  formik.touched.checkOut
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.checkOut &&
                  formik.errors.checkOut
                }
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD"
                  value={
                    formik.values.checkOut
                      ? dayjs(formik.values.checkOut)
                      : null
                  }
                  onChange={(date: Dayjs | null) => {
                    formik.setFieldValue(
                      "checkOut",
                      date
                        ? date.format("YYYY-MM-DD")
                        : ""
                    );
                  }}
                  onBlur={() => {
                    formik.setFieldTouched(
                      "checkOut",
                      true
                    );
                  }}
                  disabledDate={(current) => {
                    if (!current) return false;

                    if (
                      current < dayjs().startOf("day")
                    ) {
                      return true;
                    }

                    if (formik.values.checkIn) {
                      return !current.isAfter(
                        dayjs(formik.values.checkIn),
                        "day"
                      );
                    }

                    return false;
                  }}
                />
              </Form.Item>


              <br />


              {/* ==========================================
                  SUBMIT
              ========================================== */}

              <FlatButton
                title="Block Apartment"
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
