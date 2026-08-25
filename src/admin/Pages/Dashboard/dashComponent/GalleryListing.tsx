import { NavLink } from "react-router-dom";
import {
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Marquee from "react-fast-marquee";
import { FlatButton } from "../../../../shared/FlatButton";
import { UseDataContext } from "../../../../context/UseDataContext";
import { GalleryHooks } from "../../../Hooks/GalleryHooks";

const Style = {
  GalleriesImage: {
    width: "180px",
    height: "120px",
    objectFit: "cover" as const,
    borderRadius: "10px",
    marginRight: "15px",
  },

  imageContainer: {
    position: "relative" as const,
    marginRight: "15px",
  },

  deleteButton: {
    position: "absolute" as const,
    top: "8px",
    right: "22px",
    width: "30px",
    height: "30px",
    border: "none",
    borderRadius: "50%",
    background: "rgba(220, 38, 38, 0.9)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
};

export const GalleriesListed = () => {
  const { Galleries } = UseDataContext();
  const { deleteGallery } = GalleryHooks();

  return (
    <>
      <Marquee
        speed={50}
        pauseOnHover={true}
        gradient={false}
      >
        {Galleries &&
          Galleries.map((gallery) => (
            <div key={gallery._id}>
              <div style={Style.imageContainer}>
                <img
                  src={gallery.image_url}
                  alt="gallery"
                  style={Style.GalleriesImage}
                />

                <button
                  type="button"
                  style={Style.deleteButton}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteGallery(gallery._id);
                  }}
                >
                  <DeleteOutlined />
                </button>
              </div>
            </div>
          ))}
      </Marquee>

      {Galleries?.length === 0 && (
        <small style={{ color: "gray" }}>
          Gallery images uploaded will be here...
        </small>
      )}

      <div>
        <NavLink to="/admin_jctbdil1$/gallery/addgallery">
          <FlatButton
            className="btn btnPrimary"
            icon={<PlusOutlined />}
            title="Add Gallery Image"
          />
        </NavLink>
      </div>
    </>
  );
};
