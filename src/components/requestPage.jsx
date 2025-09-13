import React, { useState } from "react";
import "./styleRequest.css";
import logo from "../assets/LOGO6666.png";
import { Modal, Radio, Checkbox, Button, message } from "antd";

function RequestPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [announcementModal, setAnnouncementModal] = useState(true);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const sheetUrl =
    "https://script.google.com/macros/s/AKfycbwnCdEwl8R-QmtLqV5IcR1LHMb15G30SXgsaTwooJYX2xp3x4LMDBohCiyd_61s9Aqg/exec";

  const now = new Date();
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleOnlineClick = () => {
    window.open("https://t.me/it_time", "_blank");
  };

  const handleOfflineClick = () => {
    setAnnouncementModal(false);
  };

  const formatPhoneNumber = (value) => {
    let digits = value.replace(/\D/g, "");
    if (digits.startsWith("998")) {
      digits = digits.slice(3);
    }
    let formatted = "+998";
    if (digits.length > 0) formatted += digits.substring(0, 2);
    if (digits.length > 2) formatted += "" + digits.substring(2, 5);
    if (digits.length > 5) formatted += "" + digits.substring(5, 7);
    if (digits.length > 7) formatted += "" + digits.substring(7, 9);

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if (input.length <= 17) {
      setPhone(formatPhoneNumber(input));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Ismingiz kerak";
    if (!username) {
      newErrors.username = "Telegram username kiriting";
    } else if (username.length < 3) {
      newErrors.username =
        "Telegram username kamida 3 ta belgidan iborat bo'lishi kerak";
    }
    if (!phone || phone.length !== 13)
      newErrors.phone = "Raqam toʻliq kiritilmagan";
    if (selectedTimeSlots.length === 0)
      newErrors.timeslot = "Kamida bitta vaqt oralig’i tanlanishi kerak";
    return newErrors;
  };

  const handleTimeSlotChange = (checkedValues) => {
    setSelectedTimeSlots(checkedValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
    } else {
      setErrors({});
      const timeSlotsText = selectedTimeSlots.join(", ");
      const formData = {
        name: name,
        username: username,
        phone: phone,
        timeSlots: timeSlotsText,
        value: value === 1 ? "#offline" : "#online",
      };

      const params = new URLSearchParams(formData).toString();
      const urlWithParams = `${sheetUrl}?${params}`;

      if (value === 1) {
        fetch(urlWithParams, {
          method: "GET",
          mode: "no-cors",
        })
          .then(() => {
            setName("");
            setUsername("");
            setPhone("");
            setSelectedTimeSlots([]);
            setOpen(true);
          })
          .catch((error) => {
            message.error("Xatolik")
          });
      }

    }
  };

  const timeOptions = [
    { label: "10:00 - 12:00", value: "10:00 - 12:00" },
    { label: "15:00 - 17:00", value: "15:00 - 17:00" },
    { label: "17:00 - 19:00", value: "17:00 - 19:00" },
    { label: "19:00 - 21:00", value: "19:00 - 21:00" },
  ];

  return (
    <div className="request-container">
      {announcementModal ? (
        <Modal
          title={null}
          open={announcementModal}
          closable={false}
          maskClosable={false}
          onCancel={null}
          footer={null}
          style={{ top: 0, padding: "0" }}
          width="100%"
          bodyStyle={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
            padding: "1rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              width: "100%",
              maxWidth: "800px",
              color: "white",
              padding: "1rem",
            }}
          >
            <p
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                marginBottom: "2.5rem",
                lineHeight: "1.6",
                fontWeight: 500,
              }}
            >
              Kurslarimiz{" "}
              <strong
                style={{
                  backgroundColor: "#fff",
                  color: "#d60000",
                  padding: "4px 8px",
                  borderRadius: "5px",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
                  marginRight: "4px",
                  display: "inline-block",
                }}
              >
                Toshkent shahri
              </strong>
              ,
              <strong
                style={{
                  backgroundColor: "#fff",
                  color: "#0070f3",
                  padding: "4px 8px",
                  borderRadius: "5px",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
                  marginLeft: "4px",
                  marginTop: "10px",
                  display: "inline-block",
                }}
              >
                Bodomzor metro bekati
              </strong>{" "}
              ro‘parasida bo‘lib o‘tadi. Aniq qatnasha olasizmi?
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                alignItems: "center",
              }}
            >
              <button
                onClick={handleOnlineClick}
                style={{
                  width: "90%",
                  maxWidth: "300px",
                  height: "55px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  background: "#ff4d4f",
                  border: "none",
                  borderRadius: "30px",
                  color: "#fff",
                  boxShadow: "0 4px 15px rgba(255, 0, 0, 0.3)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#ff1a1a";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#ff4d4f";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Yo‘q, faqat onlayn kerak
              </button>

              <button
                onClick={handleOfflineClick}
                style={{
                  width: "90%",
                  maxWidth: "300px",
                  height: "55px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  background: "#4caf50",
                  border: "none",
                  borderRadius: "30px",
                  color: "#fff",
                  boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#388e3c";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#4caf50";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Ha, bora olaman
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        <>
          <header className="header">
            <img src={logo} alt="IT TIME Academy" className="logo" />
            <p className="header-title">
              Bizning manzil <strong style={{ textShadow: "1px 1px 1px red" }}>Toshkent shahri Bodomzor metro </strong>
              ro'parasida joylashgan kela olsangiz formani to'ldiring
            </p>
          </header>
          <form onSubmit={handleSubmit} className="form" id="requestForm">
            <div className="form-group">
              <label htmlFor="name">Ismingiz</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingizni kiriting"
                required
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="username">Telegram username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Telegram username"
                required
              />
              {errors.username && (
                <p className="error-message">{errors.username}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefon raqamingiz</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                required
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <div className="form-group">
              <p className="radio-text">
                Bizning kursimiz Toshkent shaharda joylashgan. Agar aniq kelib
                o’qiy olsangiz, Toshkentni belgilang.
              </p>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>Toshkentga bora olaman</Radio>
                <Radio value={0}>Onlayn</Radio>
              </Radio.Group>
            </div>
            <div className="form-group">
              <label style={{ fontSize: "15px" }}>
                Qaysi vaqtda qatnasha olasiz?
              </label>
              <Checkbox.Group
                options={timeOptions}
                value={selectedTimeSlots}
                onChange={handleTimeSlotChange}
              />
              {errors.timeslot && (
                <p className="error-message">{errors.timeslot}</p>
              )}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Yuborilmoqda" : "Yuborish"}
            </button>
          </form>
        </>
      )}
      <Modal
        width={520}
        title={null}
        footer={null}
        closable={false}
        open={open}
        bodyStyle={{
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Tez orada sizga <span  style={{color:'#ff4d4f'}}>55 513 19 19</span> raqamidan aloqaga chiqamiz 🙂
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#666",
            marginBottom: "25px",
            lineHeight: "1.5",
          }}
        >
          Ko'proq ma'lumot olish uchun telegram guruhga qo'shilib oling
        </p>
        <button className="modal-btn">
          <a href="https://t.me/it_time" target="_blank">
            Guruhga qo'shilish
          </a>
        </button>
      </Modal>
    </div>
  );
}

export default RequestPage;
