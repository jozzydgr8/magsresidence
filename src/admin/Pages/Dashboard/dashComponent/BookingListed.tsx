import { Table, Tag, Select, Input } from "antd";
import { useMemo, useState } from "react";
import { FormatDate } from "../../../../shared/FormatDate";
import { SendMessage } from "./SendMessage";
import { UseDataContext } from "../../../../context/UseDataContext";
import { Booking } from "../../../../types";
import { BookHooks } from "../../../Hooks/BookHooks";

export const BookingListed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const {
  handleCheckIn,
  handleCheckOut,
} = BookHooks();


  // Default filter = confirmed
  const [statusFilter, setStatusFilter] = useState<
    Booking["status"] | "all"
  >("confirmed");

  // Search booking reference
  const [referenceSearch, setReferenceSearch] = useState("");

  const { Bookings } = UseDataContext();

  // ==========================================
  // CHECK IN
  // ==========================================



  // ==========================================
  // ROW CLICK
  // ==========================================

  const handleRowClick = (record: Booking) => {
    setSelectedEmail(record.guest.email);
    setIsModalOpen(true);
  };

  // ==========================================
  // FILTER BOOKINGS
  // ==========================================

  const filteredBookings = useMemo(() => {
    if (!Bookings) return [];

    return Bookings.filter((booking: Booking) => {
      // --------------------------------------
      // STATUS FILTER
      // --------------------------------------

      const matchesStatus =
        statusFilter === "all" ||
        booking.status === statusFilter;

      // --------------------------------------
      // REFERENCE SEARCH
      // --------------------------------------

      const search = referenceSearch
        .trim()
        .toLowerCase();

      const matchesReference =
        !search ||
        booking.bookingReference
          ?.toLowerCase()
          .includes(search);

      return matchesStatus && matchesReference;
    });
  }, [Bookings, statusFilter, referenceSearch]);

  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",

      render: (createdAt: Booking["createdAt"]) =>
        FormatDate({
          createdAt,
        }),
    },

    {
      title: "Reference",
      dataIndex: "bookingReference",
      key: "bookingReference",

      render: (bookingReference: string) => (
        <strong>{bookingReference}</strong>
      ),
    },

    {
      title: "Guest",
      dataIndex: "guest",
      key: "guest",

      render: (guest: Booking["guest"]) =>
        guest.name,
    },

    {
      title: "Email",
      dataIndex: "guest",
      key: "email",

      render: (guest: Booking["guest"]) =>
        guest.email
          ? `${guest.email.slice(0, 15)}...`
          : "",
    },

    {
      title: "Apartment",
      dataIndex: "apartment",
      key: "apartment",

      render: (
        apartment: Booking["apartment"]
      ) =>
        apartment?.title
          ? apartment.title.slice(0, 15)
          : "",
    },

    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",

      render: (checkIn: string) =>
        FormatDate({
          createdAt: checkIn,
        }),
    },

    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",

      render: (checkOut: string) =>
        FormatDate({
          createdAt: checkOut,
        }),
    },

    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",

      render: (amount: number) =>
        `₦${amount.toLocaleString()}`,
    },

    // ==========================================
    // PAYMENT
    // ==========================================

    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",

      render: (
        payment: Booking["payment"]
      ) => (
        <Tag
          color={
            payment.status === "paid"
              ? "green"
              : "red"
          }
        >
          {payment.status.toUpperCase()}
        </Tag>
      ),
    },

    // ==========================================
    // BOOKING STATUS
    // ==========================================

    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (
        status: Booking["status"]
      ) => {
        if (status === "confirmed") {
          return (
            <Tag color="blue">
              CONFIRMED
            </Tag>
          );
        }

        if (status === "checked-in") {
          return (
            <Tag color="green">
              CHECKED IN
            </Tag>
          );
        }

        if (status === "completed") {
          return (
            <Tag color="default">
              COMPLETED
            </Tag>
          );
        }

        if (status === "cancelled") {
          return (
            <Tag color="red">
              CANCELLED
            </Tag>
          );
        }

        return (
          <Tag>
            {String(status).toUpperCase()}
          </Tag>
        );
      },
    },

    // ==========================================
    // ACTION
    // ==========================================

    {
      title: "Action",
      key: "action",

      render: (
        _: any,
        record: Booking
      ) => {

        // CONFIRMED → CHECK IN
       if (record.status === "confirmed") {
        return (
          <button
            type="button"
            className="btn btn-sm btn-success"
            onClick={(event) => {
              event.stopPropagation();

              handleCheckIn(record._id);
            }}
          >
            Check In
          </button>
        );
      }

      if (record.status === "checked-in") {
        return (
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={(event) => {
              event.stopPropagation();

              handleCheckOut(record._id);
            }}
          >
            Check Out
          </button>
        );
      }


        // COMPLETED
        if (
          record.status === "completed"
        ) {
          return (
            <Tag color="green">
              ✓ Completed
            </Tag>
          );
        }

        // CANCELLED
        if (
          record.status === "cancelled"
        ) {
          return (
            <Tag color="red">
              Cancelled
            </Tag>
          );
        }

        return null;
      },
    },
  ];

  return (
    <section>
      <div className="container-fluid">

        {/* ======================================
            FILTERS
        ====================================== */}

        <div
          className="d-flex justify-content-between align-items-center mb-3"
          style={{
            gap: "12px",
            flexWrap: "wrap",
          }}
        >

          {/* STATUS FILTER */}

          <Select
            value={statusFilter}
            onChange={(value) =>
              setStatusFilter(value)
            }
            style={{
              width: 180,
            }}
            options={[
              {
                label: "Confirmed",
                value: "confirmed",
              },
              {
                label: "Checked In",
                value: "checked-in",
              },
              {
                label: "Completed",
                value: "completed",
              },
              {
                label: "Cancelled",
                value: "cancelled",
              },
              {
                label: "All Bookings",
                value: "all",
              },
            ]}
          />

          {/* REFERENCE SEARCH */}

          <Input
            placeholder="Search booking reference..."
            value={referenceSearch}
            onChange={(event) =>
              setReferenceSearch(
                event.target.value
              )
            }
            allowClear
            style={{
              width: 280,
            }}
          />

        </div>

        {/* ======================================
            TABLE
        ====================================== */}

        <Table
          columns={columns}
          dataSource={filteredBookings}
          pagination={{
            pageSize: 5,
          }}
          rowKey={(record) =>
            record._id
          }
          onRow={(record) => ({
            onClick: () =>
              handleRowClick(record),
          })}
        />

        {/* ======================================
            SEND MESSAGE MODAL
        ====================================== */}

        <SendMessage
          isModalOpen={isModalOpen}
          setIsModalOpen={
            setIsModalOpen
          }
          selectedEmail={
            selectedEmail
          }
        />

      </div>
    </section>
  );
};
