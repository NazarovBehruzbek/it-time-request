import React, { useState } from 'react';
import './styleRequest.css';
import logo from '../assets/LOGO6666.png';
import axios from 'axios';
import { Modal, Radio, Checkbox } from 'antd';

function School() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('+998');
    const [age, setAge] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const formatPhoneNumber = (value) => {
        let digits = value.replace(/\D/g, '');
        if (digits.startsWith('998')) {
            digits = digits.slice(3);
        }
        let formatted = '+998';
        if (digits.length > 0) formatted += digits.substring(0, 2);
        if (digits.length > 2) formatted += '' + digits.substring(2, 5);
        if (digits.length > 5) formatted += '' + digits.substring(5, 7);
        if (digits.length > 7) formatted += '' + digits.substring(7, 9);

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
        if (!name) newErrors.name = 'Ismingiz kerak';
        if (!phone || phone.length !== 13) newErrors.phone = 'Raqam toʻliq kiritilmagan';
        if (selectedTimeSlots.length === 0) newErrors.timeslot = 'Kamida bitta vaqt oralig’i tanlanishi kerak';
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
            const chat_id = -4520864696;
            const url = `https://api.telegram.org/bot${token}/sendMessage`;
            const timeSlotsText = selectedTimeSlots.join(', ');
            const messageContent = `${value === 1 ? "#offline" : "#online"} \nIsmi: ${name} \nTelefon: ${phone} \nYoshi: ${age} \nTanlangan vaqt oralig'lari: ${timeSlotsText}`;
            axios({
                url: url,
                method: 'POST',
                data: {
                    "chat_id": chat_id,
                    "text": messageContent
                }
            }).then((res) => {
                setName('');
                setPhone('');
                setSelectedTimeSlots([]);
                setOpen(true);
            }).catch((error) => {
                console.log("Xatolik", error);
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    const timeOptions = [
        { label: 'Ertalab', value: 'Ertalab' },
        { label: 'Abetdan keyin', value: 'Abetdan keyin' },
        { label: 'Kechki', value: 'Kechki' }
    ];

    return (
        <div className="app">
            <header className="header">
                <img src={logo} alt="IT TIME Academy" className="logo" />
                <p className="header-title">Bizning manzil <strong>Toshkent</strong> shahrida  Bodomzor &#x24C2; metro ro'parasida joylashgan kela olsangiz formani to'ldiring</p>
            </header>
            <form onSubmit={handleSubmit} className="form" id='requestForm'>
                <div className="form-group">
                    <label htmlFor="name"> Farzandingizning ismi va familiyasi</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Ismingizni kiriting'
                        required
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
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
                    <label htmlFor="age">Farzandingizni yoshi</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => {
                            // Faqat 2 raqamli yosh kiritishga ruxsat beriladi
                            if (e.target.value.length <= 2) {
                                setAge(e.target.value);
                            }
                        }}
                        required
                        min={1}
                        max={99} // maksimal yosh 99
                        placeholder="Yoshingizni kiriting"
                    />
                    {errors.age && <p className="error">{errors.age}</p>}
                </div>

                <div className="form-group">
                    <p className='radio-text'> Farzandingiz aniq kela oladimi?</p>
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1}>Ha, bora oladi</Radio>
                        <Radio value={2}>Onlayn kerak</Radio>
                    </Radio.Group>
                </div>
                <div className="form-group">
                    <label style={{ fontSize: '15px' }}>Farzandingiz kursimizga qaysi vaqtlarda qatnasha oladi? </label>
                    <Checkbox.Group
                        options={timeOptions}
                        value={selectedTimeSlots}
                        onChange={handleTimeSlotChange}
                    />
                    {errors.timeslot && <p className="error">{errors.timeslot}</p>}
                </div>
                <button type="submit" disabled={loading}>{loading ? "Yuborilmoqda" : "Yuborish"}</button>
            </form>
            <Modal
                width={500}
                title={null}
                footer={null}
                closable={false}
                open={open}
                onCancel={() => setOpen(true)}
            >
                <h2 className='modal-title'>Tez orada sizga aloqaga chiqamiz 🙂</h2>
                <p className='modal-text'>Ko'proq ma'lumot olish uchun telegram guruhga qo'shilib oling</p>
                <button className='modal-btn'><a href="https://t.me/it_time" target='_blank'>Guruhga qo'shilish</a></button>
            </Modal>
        </div>
    );
}

export default School;
