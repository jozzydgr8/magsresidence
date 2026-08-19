import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { DatePicker, Form, Input, message } from "antd";
import { FlatButton } from "../../../shared/FlatButton";
import { SendOutlined } from "@ant-design/icons";
import { Apartment } from "../../../types";

// @ts-expect-error: @paystack/inline-js does not currently ship TypeScript declarations.
import PaystackPop from "@paystack/inline-js";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required"),

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

type ApartmentFormProps = {
  currentApartment: Apartment;
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
  checkIn: any;
  checkOut: any;
};

export const ApartmentForm = ({
  currentApartment,
}: ApartmentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const initializePayment = async (values: FormValues) => {
    try {
      setIsProcessing(true);

      // ------------------------------------------
      // 1. INITIALIZE PAYMENT WITH BACKEND
      // ------------------------------------------

      const initializeResponse = await fetch(
        "https://magsresidenceserver.vercel.app/bookings/initialize",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            apartmentId: currentApartment._id,

            checkIn: values.checkIn.toISOString(),

            checkOut: values.checkOut.toISOString(),

            name: values.name.trim(),

            email: values.email
              .trim()
              .toLowerCase(),

            phone: values.phone.trim(),
          }),
        }
      );

      // ------------------------------------------
      // 2. READ BACKEND RESPONSE
      // ------------------------------------------

      const responseText =
        await initializeResponse.text();

      let initializeData;

      try {
        initializeData = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Backend returned an invalid response."
        );
      }

      if (!initializeResponse.ok) {
        throw new Error(
          initializeData.message ||
            "Unable to initialize payment"
        );
      }

      // ------------------------------------------
      // 3. GET PAYSTACK ACCESS CODE
      // ------------------------------------------

      const accessCode =
        initializeData.data?.access_code;

      if (!accessCode) {
        throw new Error(
          "Paystack access code was not returned."
        );
      }

      // ------------------------------------------
      // 4. OPEN PAYSTACK CHECKOUT
      // ------------------------------------------

      const paystackPop = new PaystackPop();

      paystackPop.resumeTransaction(
        accessCode,
        {
          // --------------------------------------
          // PAYMENT SUCCESSFUL
          // --------------------------------------

          onSuccess: async (transaction: {
            id: number;
            reference: string;
            message: string;
          }) => {
            try {
              // ----------------------------------
              // 5. VERIFY PAYMENT WITH BACKEND
              // ----------------------------------

              const verifyResponse =
                await fetch(
                  "https://magsresidenceserver.vercel.app/bookings/verify",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body: JSON.stringify({
                      reference:
                        transaction.reference,
                    }),
                  }
                );

              const verifyData =
                await verifyResponse.json();

              // ----------------------------------
              // 6. HANDLE VERIFICATION ERROR
              // ----------------------------------

              if (!verifyResponse.ok) {
                throw new Error(
                  verifyData.message ||
                    "Payment verification failed"
                );
              }

              // ----------------------------------
              // 7. BOOKING CONFIRMED
              // ----------------------------------

              message.success(
                "Payment successful! Your booking has been confirmed."
              );

              console.log(
                "Booking confirmed:",
                verifyData.data
              );

            } catch (error) {
              console.error(
                "Verification error:",
                error
              );

              message.error(
                error instanceof Error
                  ? error.message
                  : "Unable to verify payment"
              );
            } finally {
              setIsProcessing(false);
            }
          },

          // --------------------------------------
          // CUSTOMER CANCELLED PAYMENT
          // --------------------------------------

          onCancel: () => {
            setIsProcessing(false);

            message.info(
              "Payment was cancelled."
            );
          },

          // --------------------------------------
          // PAYSTACK ERROR
          // --------------------------------------

          onError: (error: {
            message?: string;
          }) => {
            console.error(
              "Paystack error:",
              error
            );

            setIsProcessing(false);

            message.error(
              error?.message ||
                "Unable to process payment."
            );
          },
        }
      );

    } catch (error) {
      // ------------------------------------------
      // INITIALIZATION / NETWORK ERROR
      // ------------------------------------------

      console.error(
        "Payment initialization error:",
        error
      );

      message.error(
        error instanceof Error
          ? error.message
          : "Unable to initialize payment."
      );

      setIsProcessing(false);
    }
  };

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
      onSubmit={initializePayment}
    >
      {(formik) => (
        <Form
          layout="vertical"
          onFinish={formik.handleSubmit}
        >
          <div className="row">

            {/* FULL NAME */}

            <div className="col-6">
              <Form.Item
                label="Full Name"
                validateStatus={
                  formik.touched.name &&
                  formik.errors.name
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.name &&
                  formik.errors.name
                    ? formik.errors.name
                    : ""
                }
              >
                <Input
                  name="name"
                  placeholder="Enter your full name"
                  value={
                    formik.values.name
                  }
                  onChange={
                    formik.handleChange
                  }
                  onBlur={
                    formik.handleBlur
                  }
                />
              </Form.Item>
            </div>

            {/* EMAIL */}

            <div className="col-6">
              <Form.Item
                label="Email"
                validateStatus={
                  formik.touched.email &&
                  formik.errors.email
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.email &&
                  formik.errors.email
                    ? formik.errors.email
                    : ""
                }
              >
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={
                    formik.values.email
                  }
                  onChange={
                    formik.handleChange
                  }
                  onBlur={
                    formik.handleBlur
                  }
                />
              </Form.Item>
            </div>

            {/* PHONE */}

            <div className="col-6">
              <Form.Item
                label="Phone Number"
                validateStatus={
                  formik.touched.phone &&
                  formik.errors.phone
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.phone &&
                  formik.errors.phone
                    ? formik.errors.phone
                    : ""
                }
              >
                <Input
                  name="phone"
                  placeholder="Enter your phone number"
                  value={
                    formik.values.phone
                  }
                  onChange={
                    formik.handleChange
                  }
                  onBlur={
                    formik.handleBlur
                  }
                />
              </Form.Item>
            </div>

            {/* CAPACITY */}

            <div className="col-6">
              <Form.Item
                label="Apartment Capacity"
              >
                <Input
                  value={`${currentApartment.capacity} people`}
                  disabled
                />
              </Form.Item>
            </div>

            {/* CHECK-IN */}

            <div className="col-6">
              <Form.Item
                label="Check-in"
                validateStatus={
                  formik.touched.checkIn &&
                  formik.errors.checkIn
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.checkIn &&
                  formik.errors.checkIn
                    ? String(
                        formik.errors.checkIn
                      )
                    : ""
                }
              >
                <DatePicker
                  style={{
                    width: "100%",
                  }}
                  value={
                    formik.values.checkIn
                  }
                  onChange={(date) => {
                    formik.setFieldValue(
                      "checkIn",
                      date
                    );

                    formik.setFieldTouched(
                      "checkIn",
                      true
                    );
                  }}
                  onBlur={() => {
                    formik.setFieldTouched(
                      "checkIn",
                      true
                    );
                  }}
                />
              </Form.Item>
            </div>

            {/* CHECK-OUT */}

            <div className="col-6">
              <Form.Item
                label="Check-out"
                validateStatus={
                  formik.touched.checkOut &&
                  formik.errors.checkOut
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.checkOut &&
                  formik.errors.checkOut
                    ? String(
                        formik.errors.checkOut
                      )
                    : ""
                }
              >
                <DatePicker
                  style={{
                    width: "100%",
                  }}
                  value={
                    formik.values.checkOut
                  }
                  onChange={(date) => {
                    formik.setFieldValue(
                      "checkOut",
                      date
                    );

                    formik.setFieldTouched(
                      "checkOut",
                      true
                    );
                  }}
                  onBlur={() => {
                    formik.setFieldTouched(
                      "checkOut",
                      true
                    );
                  }}
                />
              </Form.Item>
            </div>

            {/* PAYMENT BUTTON */}

            <div className="col-12">
              <FlatButton
                type="submit"
                title={
                  isProcessing
                    ? "Processing..."
                    : "Continue to Payment"
                }
                icon={
                  <SendOutlined />
                }
                className="btn btnSuccess"
                disabled={
                  isProcessing
                }
              />
            </div>

          </div>
        </Form>
      )}
    </Formik>
  );
};