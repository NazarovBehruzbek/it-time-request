import React, { useState } from 'react';
import './styleRequest.css'; 
import logo from '../assets/LOGO6666.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequestPage() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('+998 ');
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState({});
    const [loading,setLoading] = useState(false)
    const formatPhoneNumber = (value) => {
        let digits = value.replace(/\D/g, '');
        if (digits.startsWith('998')) {
            digits = digits.slice(3);
        }
        let formatted = '+998 ';
        if (digits.length > 0) formatted += digits.substring(0, 2);
        if (digits.length > 2) formatted += ' ' + digits.substring(2, 5);
        if (digits.length > 5) formatted += ' ' + digits.substring(5, 7);
        if (digits.length > 7) formatted += ' ' + digits.substring(7, 9);

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
        if (!phone || phone.length !== 17) newErrors.phone = 'Raqam toʻliq kiritilmagan';
        return newErrors;
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
            const chat_id =  -4253120413;
            const url = `https://api.telegram.org/bot${token}/sendMessage`;
            const messageContent = `Ismi: ${name} \nUsername: ${username} \nTelefon: ${phone}`;
    
            axios({
                url: url,
                method: 'POST',
                data: {
                    "chat_id": chat_id,
                    "text": messageContent
                }
            }).then((res) => {
                setName('');
                setUsername('');
                setPhone('');
                toast.success('Ariza muvaffaqiyatli yuborildi!', {
                    autoClose: 1000,
                });
                setTimeout(() => {
                    window.open('https://t.me/+Vh0E5UsdRe0wMzMy', '_blank');
                }, 1000);
            }).catch((error) => {
                console.log("Xatolik", error);
            }).finally(() => {
                setLoading(false);
            });
        }
    };
    

    return (
        <div className="app">
            <header className="header">
                <img src={logo} alt="IT TIME Academy" className="logo" />
                <h1 className="header-title">Ariza qoldiring</h1>
            </header>
            <form onSubmit={handleSubmit} className="form" id='requestForm'>
                <div className="form-group">
                    <label htmlFor="name">Ismingiz?</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="username">Telegram Username bor bo'lsa?</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Raqamingiz</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}
                </div>
                <button type="submit" disabled={loading}>{loading?"Yuborilmoqda":"Yuborish"}</button>
            </form>
        </div>
    );
}

export default RequestPage;
