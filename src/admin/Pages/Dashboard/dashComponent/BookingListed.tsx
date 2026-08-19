import { Table} from "antd";
import { useState } from "react";
import { FormatDate } from "../../../../shared/FormatDate";
import { SendMessage } from "./SendMessage";
import { UseDataContext } from "../../../../context/UseDataContext";
import { Booking } from "../../../../types";


export const BookingListed = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState("");
    const { Bookings } = UseDataContext();

  const columns = [
    {
        title:"Date",
        dataIndex:"createdAt",
        key:"createdAt",
        render:(createdAt:Booking["createdAt"])=>
            FormatDate({createdAt})
    },
    {
      title: "Reference",
      dataIndex: "bookingReference",
      key: "bookingReference",
    },
    {
      title: "Guest",
      dataIndex: "guest",
      key: "guest",
      render: (guest: Booking["guest"]) => guest.name,
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
      render: (apartment: Booking["apartment"]) =>
        apartment.title.slice(0,7),
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (checkIn: string) =>
        FormatDate({ createdAt:checkIn }),
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (checkOut: string) =>
        FormatDate({ createdAt:checkOut }),
    },
    {
      title: "Guests",
      dataIndex: "guests",
      key: "guests",
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) =>
        `₦${amount.toLocaleString()}`,
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      render: (payment: Booking["payment"]) => (
        <span
          className={
            payment.status === "paid"
              ? "text-success"
              : "text-danger"
          }
        >
          {payment.status}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Booking["status"]) => status,
    },
  ];

    const handleRowClick = (record: any) => {
    setSelectedEmail(record.email);
    setIsModalOpen(true);
  };
  return (
    <section>
      <div className="container-fluid">
        <Table
          columns={columns}
          dataSource={Bookings ?? []}
          pagination={{ pageSize: 5 }}
        rowKey={(record) => record._id} // Ensures a unique key
        onRow={(record) => ({
        onClick: () => handleRowClick(record),
        })}

        />

        <SendMessage isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedEmail={selectedEmail}/>
      </div>
    </section>
  );
};
