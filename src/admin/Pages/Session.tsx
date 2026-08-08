import { Formik } from "formik";
import { Form, Input, Typography } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import { FlatButton } from "../../shared/FlatButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { AuthHooks } from "../Hooks/AuthHooks";


const COOLDOWN_DURATION = 120; // seconds
const STORAGE_KEY = "reset_password_cooldown";

 
const { Text, Title } = Typography;


type formikType = {
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/\d/, "Must contain at least one number"),
});

export default function Session() {
  const [cooldown, setCooldown] = useState(0);
  
    useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const expiresAt = parseInt(stored, 10);
      const now = Math.floor(Date.now() / 1000);
      const remaining = expiresAt - now;
      if (remaining > 0) {
        setCooldown(remaining);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => {
          const newVal = prev - 1;
          if (newVal <= 0) localStorage.removeItem(STORAGE_KEY);
          return newVal;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);
  const navigate = useNavigate()
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {signInWithEmailAndPassword, forgotPassword} = AuthHooks();

  const handleSignIn = async (values: formikType) => {
    const {email, password} = values
    signInWithEmailAndPassword({email, password, setLoading})
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        handleSignIn(values);
      }}
    >
      {(formik) => (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            height:'100vh'
          }}
        >
          <div style={{ maxWidth: "600px", width: "100%" }}>
            <div style={{ position: "relative", textAlign: "right" }}>
              <CloseOutlined
                onClick={() => navigate("/")}
                style={{
                  fontSize: "24px",
                  padding: "10px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              />
            </div>

            <Title level={3} style={{ marginBottom: 0 }}>
              Login
            </Title>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              welcome to Seun Ogunsanya admin!
            </Text>

            <br />

            {error && (
              <Text type="danger">Email or Password mismatch</Text>
            )}

            <Form layout="vertical" onFinish={formik.handleSubmit}>
              <Form.Item
                label="Email"
                validateStatus={formik.errors.email && formik.touched.email ? "error" : ""}
                help={formik.touched.email && formik.errors.email}
              >
                <Input
                  name="email"
                  placeholder="e.g. myemail@mail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                validateStatus={formik.errors.password && formik.touched.password ? "error" : ""}
                help={formik.touched.password && formik.errors.password}
              >
                <Input.Password
                  name="password"
                  placeholder="Enter password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="custom-password"
                  
                  
                />
              </Form.Item>

              <FlatButton title="Sign In" onClick={formik.handleSubmit} disabled={loading} className=" btn btnSuccess" />
              <>
                <FlatButton 
                className="btnPrimary btn"
                  disabled={cooldown > 0}
                  title={ "Reset Password"}
                  onClick={async()=>{ 
                    
                    if(!formik.values.email && !formik.errors.email){
                      return
                    }
                    const expiresAt = Math.floor(Date.now() / 1000) + COOLDOWN_DURATION;
                      localStorage.setItem(STORAGE_KEY, expiresAt.toString());
                      setCooldown(COOLDOWN_DURATION);
                     await forgotPassword(formik.values.email);}}
                />
                
                <p>{cooldown > 0 ? `Wait ${cooldown}s before trying again` : ""}</p>
                </>
            </Form>

           
             
             
                
            
                
              
            
          </div>
        </div>
      )}
    </Formik>
  );
}