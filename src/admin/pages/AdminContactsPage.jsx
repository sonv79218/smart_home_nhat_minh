import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useToast, useConfirm } from "../../contexts/ToastContext";

const STATUS_OPTIONS = ["new", "contacted", "done"];

const STATUS_COLORS = {
  new: "bg-amber-500",
  contacted: "bg-blue-500",
  done: "bg-green-500",
};

const STATUS_LABELS = {
  new: "Mới",
  contacted: "Đã liên hệ",
  done: "Hoàn tất",
};

const AdminContactsPage = () => {
  const toast = useToast();
  const { confirm } = useConfirm();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "contact_requests"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching contact requests:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";

    if (timestamp?.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (timestamp instanceof Date) {
      return timestamp.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return "N/A";
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      await updateDoc(doc(db, "contact_requests", contactId), {
        status: newStatus,
      });

      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? { ...contact, status: newStatus } : contact
        )
      );

      toast.success("Cập nhật trạng thái thành công.", {
        title: "Thành công",
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Không thể cập nhật trạng thái.", {
        title: "Cập nhật thất bại",
      });
    }
  };

  const handleDelete = async (contactId) => {
    const accepted = await confirm({
      title: "Xóa yêu cầu liên hệ",
      message: "Bạn có chắc muốn xóa yêu cầu này không?",
      confirmText: "Xóa yêu cầu",
      cancelText: "Hủy",
    });

    if (!accepted) return;

    try {
      await deleteDoc(doc(db, "contact_requests", contactId));

      setContacts((prev) =>
        prev.filter((contact) => contact.id !== contactId)
      );

      toast.success("Yêu cầu liên hệ đã được xóa.", {
        title: "Xóa thành công",
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Không thể xóa yêu cầu liên hệ.", {
        title: "Xóa thất bại",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Quản lý yêu cầu liên hệ
          </h1>
          <p className="text-slate-500 mt-1">
            Tổng số:{" "}
            <span className="font-semibold text-primary-600">
              {contacts.length}
            </span>{" "}
            yêu cầu
          </p>
        </div>
      </div>

      {/* Empty */}
      {contacts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-slate-700 mb-2">
            Chưa có yêu cầu liên hệ
          </h3>
          <p className="text-slate-500">
            Khi có người gửi yêu cầu từ trang liên hệ, danh sách sẽ hiển thị ở đây.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Họ tên
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Số điện thoại
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Nội dung
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Thời gian gửi
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-slate-800">
                      {contact.fullName || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {contact.phone || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {contact.email || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">
                      {contact.message || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold text-white ${
                          STATUS_COLORS[contact.status] || "bg-slate-400"
                        }`}
                      >
                        {STATUS_LABELS[contact.status] || contact.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {contact.status !== "contacted" && (
                          <button
                            onClick={() =>
                              handleStatusChange(contact.id, "contacted")
                            }
                            className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                          >
                            Đã liên hệ
                          </button>
                        )}
                        {contact.status !== "done" && (
                          <button
                            onClick={() =>
                              handleStatusChange(contact.id, "done")
                            }
                            className="px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-200"
                          >
                            Hoàn tất
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y divide-slate-100">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-slate-800">
                      {contact.fullName || "N/A"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {contact.phone || "N/A"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {contact.email || "-"}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold text-white ${
                      STATUS_COLORS[contact.status] || "bg-slate-400"
                    }`}
                  >
                    {STATUS_LABELS[contact.status] || contact.status}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {contact.message || "-"}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {formatDate(contact.createdAt)}
                  </span>
                  <div className="flex items-center gap-2">
                    {contact.status !== "contacted" && (
                      <button
                        onClick={() =>
                          handleStatusChange(contact.id, "contacted")
                        }
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                      >
                        Đã liên hệ
                      </button>
                    )}
                    {contact.status !== "done" && (
                      <button
                        onClick={() =>
                          handleStatusChange(contact.id, "done")
                        }
                        className="px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-200"
                      >
                        Hoàn tất
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactsPage;
