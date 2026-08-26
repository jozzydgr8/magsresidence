import { NavLink } from "react-router-dom";
import { FlatButton } from "../../../../shared/FlatButton";
import styles from "../../../admin.module.css";
import { PlusOutlined } from "@ant-design/icons";
import Marquee from "react-fast-marquee";
import { UseDataContext } from "../../../../context/UseDataContext";


const Style = {
  amenitybackground: {
    backgroundRepeat: "no-repeat" as const,
    backgroundSize: "contain",
    height: "100px",
  },
};


export const AmenityListed = () => {
  const { Amenities } = UseDataContext();

  return (
    <>
      <Marquee
        speed={50}
        pauseOnHover={true}
        gradient={false}
      >

        {Amenities &&
          Amenities.map((amenity) => (
            <div key={amenity._id}>

              <div className={styles.apartmentcontainer}>

                {/* =========================
                    AMENITY IMAGE
                ========================== */}

                <div
                  style={{
                    background: amenity.images?.[0]?.url
                      ? `url(${amenity.images[0].url})`
                      : "#f5f5f5",
                    ...Style.amenitybackground,
                  }}
                />

                {/* =========================
                    AMENITY TITLE
                ========================== */}

                <strong>
                  {amenity.title}
                </strong>

                {/* =========================
                    VIEW AMENITY
                ========================== */}

                <div>
                  <NavLink
                    to={`/admin_jctbdil1$/amenities/${amenity._id}`}
                  >
                    <FlatButton
                      title="View Amenity"
                      className="btn btnPrimary"
                    />
                  </NavLink>
                </div>

              </div>

            </div>
          ))}

      </Marquee>


      {/* =========================
          EMPTY STATE
      ========================== */}

      {Amenities?.length === 0 && (
        <small style={{ color: "gray" }}>
          Amenities uploaded will be here...
        </small>
      )}


      {/* =========================
          ADD AMENITY
      ========================== */}

      <div>
        <NavLink
          to="/admin_jctbdil1$/amenities/addamenity"
        >
          <FlatButton
            className="btn btnPrimary"
            icon={<PlusOutlined />}
            title="Add New Amenity"
          />
        </NavLink>
      </div>
    </>
  );
};
