import { NavLink } from "react-router-dom";
import { FlatButton } from "../../../../shared/FlatButton";
import styles from "../../../admin.module.css";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { UseDataContext } from "../../../../context/UseDataContext";
import { AvailabilityHooks } from "../../../Hooks/AvailabilityHooks";

export const AvailabilityListed = () => {
  const { AvailabilityBlocks } = UseDataContext();

  const {
    deleteAvailabilityBlock,
  } = AvailabilityHooks();

  return (
    <>
      {/* =========================
          AVAILABILITY BLOCKS
      ========================== */}

      <div>
        {AvailabilityBlocks &&
          AvailabilityBlocks.map((block) => (
            <div
              key={block._id}
              className={styles.apartmentcontainer}
            >
              {/* =========================
                  APARTMENT
              ========================== */}

              <strong>
                Apartment: {block.apartment}
              </strong>

              {/* =========================
                  CHECK IN
              ========================== */}

              <div>
                <small>
                  Check-in:{" "}
                  {new Date(block.checkIn).toLocaleDateString()}
                </small>
              </div>

              {/* =========================
                  CHECK OUT
              ========================== */}

              <div>
                <small>
                  Check-out:{" "}
                  {new Date(block.checkOut).toLocaleDateString()}
                </small>
              </div>

              {/* =========================
                  ACTIONS
              ========================== */}

              <div>
                <NavLink
                  to={`/admin_jctbdil1$/availability/${block._id}`}
                >
                  <FlatButton
                    title="View Block"
                    className="btn btnPrimary"
                  />
                </NavLink>

                <FlatButton
                  title="Delete"
                  icon={<DeleteOutlined />}
                  className="btn btnDanger"
                  onClick={() =>
                    deleteAvailabilityBlock(block._id)
                  }
                />
              </div>
            </div>
          ))}
      </div>

      {/* =========================
          EMPTY STATE
      ========================== */}

      {AvailabilityBlocks?.length === 0 && (
        <small style={{ color: "gray" }}>
          No apartments are currently blocked...
        </small>
      )}

      {/* =========================
          ADD AVAILABILITY BLOCK
      ========================== */}

      <div>
        <NavLink
          to="/admin_jctbdil1$/availability/add"
        >
          <FlatButton
            className="btn btnPrimary"
            icon={<PlusOutlined />}
            title="Block Apartment"
          />
        </NavLink>
      </div>
    </>
  );
};
