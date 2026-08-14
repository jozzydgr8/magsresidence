import { useNavigate, useParams } from "react-router-dom";
import { Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import Style from "../../admin.module.css";
import { FlatButton } from "../../../shared/FlatButton";
import { UpdateApartment } from "../../modals/UpdateApartment";
import { ApartmentListed } from "../Dashboard/dashComponent/ApartmentListed";
import { UseDataContext } from "../../../context/UseDataContext";
import { ApartmentHooks } from "../../Hooks/ApartmentHooks";

const styles = {
  backgroundImage: {
    height: "300px",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
};

export const SingleAdminApartment = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();

  const { Apartments } = UseDataContext();

  const { deleteApartment } = ApartmentHooks();

  const navigate = useNavigate();

  /*
   * Find the apartment using the URL id.
   */
  const data = Apartments?.find(
    (apartment) =>
      apartment._id?.toString().toLowerCase() ===
      id?.toLowerCase()
  );

  /*
   * If the apartment doesn't exist,
   * return to the admin dashboard.
   */
  useEffect(() => {
    if (!data && Apartments) {
      navigate("/admin_jctbdil1$");
    }
  }, [data, Apartments, navigate]);

  /*
   * Close update modal.
   */
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  /*
   * Open update modal.
   */
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  /*
   * Get the first apartment image.
   */
  const featuredImage = data?.images?.[0]?.url;

  return (
    <section>
      <div className="container-fluid">
        <div className={Style.dashboardproductcontainer}>

          {!data ? (
            <p>Loading apartment...</p>
          ) : (
            <>
              {/* =========================
                  APARTMENT IMAGE
              ========================== */}
              <div>
                <FlatButton
                  className="btn btnPrimary"
                  onClick={handleOpenModal}
                  icon={<EditOutlined />}
                />

                {featuredImage ? (
                  <div
                    style={{
                      backgroundImage: `url(${featuredImage})`,
                      ...styles.backgroundImage,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      ...styles.backgroundImage,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <span>No image available</span>
                  </div>
                )}
              </div>

              {/* =========================
                  TITLE
              ========================== */}
              <strong>
                {data.title}

                <FlatButton
                  className="btn btnPrimary"
                  onClick={handleOpenModal}
                  icon={<EditOutlined />}
                />
              </strong>

              <br />

              {/* =========================
                  DESCRIPTION
              ========================== */}
              <p>
                {data.description}

                <FlatButton
                  className="btn btnPrimary"
                  onClick={handleOpenModal}
                  icon={<EditOutlined />}
                />
              </p>

              {/* =========================
                  COST
              ========================== */}
              <p>
                <strong>Cost:</strong> {data.cost}

                <FlatButton
                  className="btn btnPrimary"
                  onClick={handleOpenModal}
                  icon={<EditOutlined />}
                />
              </p>

              {/* =========================
                  IMAGES COUNT
              ========================== */}
              <p>
                <strong>Images:</strong>{" "}
                {data.images?.length || 0}
              </p>

              {/* =========================
                  DELETE
              ========================== */}
              <div>
                <Popconfirm
                  title="Are you sure you want to delete this apartment?"
                  description="This action cannot be undone."
                  onConfirm={() => deleteApartment(data._id)}
                  okText="Yes, delete"
                  cancelText="Cancel"
                >
                  <span>
                    <FlatButton
                      className="btn btn-danger"
                      title="Delete Apartment"
                      icon={<DeleteOutlined />}
                    />
                  </span>
                </Popconfirm>
              </div>
            </>
          )}
        </div>

        {/* =========================
            APARTMENTS LIST
        ========================== */}

        <ApartmentListed />

        {/* =========================
            UPDATE MODAL
        ========================== */}

        {data && (
          <UpdateApartment
            isOpen={isOpen}
            handleCloseModal={handleCloseModal}
            title={data.title}
            description={data.description}
            cost={data.cost}
            images={data.images || []}
            _id={data._id}
          />
        )}
      </div>
    </section>
  );
};