import { useNavigate, useParams } from "react-router-dom";
import { Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import Style from "../../admin.module.css";
import { FlatButton } from "../../../shared/FlatButton";
import { UpdateAmenity } from "../../modals/UpdateAmenity";
import { UseDataContext } from "../../../context/UseDataContext";
import { AmenityHooks } from "../../Hooks/AmenityHook";


const styles = {
  backgroundImage: {
    height: "300px",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
};


export const SingleAdminAmenity = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();

  const { Amenities } = UseDataContext();

  const { deleteAmenity } = AmenityHooks();

  const navigate = useNavigate();


  /*
   * Find the amenity using the URL id.
   */
  const data = Amenities?.find(
    (amenity) =>
      amenity._id?.toString().toLowerCase() ===
      id?.toLowerCase()
  );


  /*
   * If the amenity doesn't exist,
   * return to the admin dashboard.
   */
  useEffect(() => {
    if (!data && Amenities) {
      navigate("/admin_jctbdil1$");
    }
  }, [data, Amenities, navigate]);


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
   * Get the first amenity image.
   */
  const featuredImage = data?.images?.[0]?.url;


  return (
    <section>
      <div className="container-fluid">

        <div className={Style.dashboardproductcontainer}>

          {!data ? (
            <p>Loading amenity...</p>
          ) : (
            <>
              {/* =========================
                  AMENITY IMAGE
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
                  title="Are you sure you want to delete this amenity?"
                  description="This action cannot be undone."
                  onConfirm={() =>
                    deleteAmenity(data._id)
                  }
                  okText="Yes, delete"
                  cancelText="Cancel"
                >

                  <span>

                    <FlatButton
                      className="btn btn-danger"
                      title="Delete Amenity"
                      icon={<DeleteOutlined />}
                    />

                  </span>

                </Popconfirm>

              </div>

            </>
          )}

        </div>


        {/* =========================
            UPDATE MODAL
        ========================== */}

        {data && (
          <UpdateAmenity
            isOpen={isOpen}
            handleCloseModal={handleCloseModal}
            title={data.title}
            description={data.description}
            images={data.images || []}
            _id={data._id}
          />
        )}

      </div>
    </section>
  );
};
