import React, { useState, useEffect } from "react";
import "./styleRequest.css";
import logo from "../assets/LOGO6666.png";
import axios from "axios";
import { Modal, Checkbox, Button } from "antd";

function SMM() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [announcementModal, setAnnouncementModal] = useState(true);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const sheetUrl =
    "https://script.google.com/macros/s/AKfycbwyQa5vzL5hmDf33NSOxguA1QeVNeIILnmX4_vrLcXaTtsi1G0sW2l570F3boKfD5DH/exec";

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

      const token = "7207834215:AAGpiV02gcPvk86_lLkfEoc9eC7TQuFoYZE";
      const chat_id = -1002486027239;
      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      const timeSlotsText = selectedTimeSlots.join(", ");
      const messageContent = `#SMM \nIsmi: ${name} \nUsername: ${username} \nTelefon: ${phone} \nTanlangan vaqt oralig'lari: ${timeSlotsText}`;
      const formData = {
        name: name,
        username: username,
        phone: phone,
        timeSlots: timeSlotsText,
      };

      const params = new URLSearchParams(formData).toString();
      const urlWithParams = `${sheetUrl}?${params}`;

      fetch(urlWithParams, {
        method: "GET",
        mode: "no-cors",
      })
        .then(() => {
          console.log("Request sent successfully");
        })
        .catch((error) => {
          console.error("Error details:", error);
        });

      axios({
        url: url,
        method: "POST",
        data: {
          chat_id: chat_id,
          text: messageContent,
        },
      })
        .then((res) => {
          setName("");
          setUsername("");
          setPhone("");
          setSelectedTimeSlots([]);
          setOpen(true);
        })
        .catch((error) => {
          console.log("Xatolik", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleOnlineClick = () => {
    window.open("https://t.me/it_time", "_blank");
  };

  const handleOfflineClick = () => {
    setAnnouncementModal(false);
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              width: "100%",
              maxWidth: "800px",
              padding: "20px",
              color: "white",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                marginBottom: "1.5rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              SMM kurslari boshlandi!
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.4rem)",
                marginBottom: "3rem",
                lineHeight: "1.6",
                opacity: "0.9",
              }}
            >
              Tezda boshlamoqchi bo'lganlar uchun eng qulay imkoniyat! <br />
              15:00 - 17:00 vaqt oralig'ida keloladiganlar forma to'ldiring.
              <br />
              Kurslarimiz offlayn tarzda va faqat Toshkent shahrida bo'ladi
            </p>
            <div
              style={{
                display: "flex",
                gap: "clamp(1rem, 3vw, 2rem)",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                size="large"
                onClick={handleOnlineClick}
                style={{
                  minWidth: "200px",
                  height: "50px",
                  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                  fontWeight: "bold",
                  background: "rgba(255, 0, 0, 0.619)",
                  border: "none",
                  borderRadius: "25px",
                  boxShadow: "0 4px 15px rgba(255, 0, 0, 0.3)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px",
                  color: "white",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255, 0, 0, 0.8)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255, 0, 0, 0.619)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Onlayn
              </Button>
              <Button
                size="large"
                onClick={handleOfflineClick}
                style={{
                  minWidth: "200px",
                  height: "50px",
                  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                  fontWeight: "bold",
                  background: "rgba(255, 0, 0, 0.619)",
                  border: "none",
                  borderRadius: "25px",
                  boxShadow: "0 4px 15px rgba(255, 0, 0, 0.3)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px",
                  color: "white",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255, 0, 0, 0.8)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255, 0, 0, 0.619)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Offlayn
              </Button>
            </div>
          </div>
        </Modal>
      ) : (
        <>
          <header className="header">
            <img src={logo} alt="IT TIME Academy" className="logo" />
            <p className="header-title">
              SMM kurslari boshlandi! Tezda boshlamoqchi bo'lganlar uchun eng
              qulay imkoniyat! Kurslarimiz <strong>offlayn</strong> tarzda va
              faqat <strong>Toshkent</strong> shahrida bo'ladi
            </p>
          </header>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Ismingiz</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="username">Telegram username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefon raqamingiz</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>
            <div className="form-group">
              <label>Qulay vaqt</label>
              <Checkbox.Group
                options={timeOptions}
                onChange={handleTimeSlotChange}
                className={errors.timeslot ? "error" : ""}
              />
              {errors.timeslot && (
                <span className="error-message">{errors.timeslot}</span>
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
          Tez orada sizga aloqaga chiqamiz 🙂
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
        <button className='modal-btn'><a href="https://t.me/it_time" target='_blank'>Guruhga qo'shilish</a></button>
      </Modal>
    </div>
  );
}

export default SMM;
