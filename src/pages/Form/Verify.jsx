import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Verify() {
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [resendMessage, setResendMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if(savedEmail) setEmail(savedEmail);
        localStorage.removeItem('email');
    }, []);

    const handleResendCode = async () => {
        try {
            const response = await axios.post('http://localhost:3000/resend-code', {
                email
            });

        } catch (error) {
            console.error('Ошибка отправки кода:', error);
            setResendMessage(error.response?.data?.message || 'Ошибка при отправке кода');
        }
    }
    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/verify', {
                email,
                code
            });

            setMessage(response.data.message);
            navigate('/login')
        } catch (error) {
            console.error('Ошибка подтверждения:', error);
            setMessage(error.response?.data?.message || 'Ошибка при подтверждении');
        }
    };

    return (
      <div className="over-flow">
          <div className="form-container">
              <form onSubmit={handleVerify}>
                  <div className="form-inside-container">
                      <section className="form-inside-container-left">
                          <h1 className="text-white font-800 text-3xl mb-16 text-left">Подтвердите почту</h1>
                          <input
                            type="email"
                            placeholder="Ваша почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <input
                            type="text"
                            placeholder="Код из письма"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                          />
                          <section className="flex flex-col gap-5 justify-center w-full">
                              <button type="submit">Подтвердить</button>
                              <button type="button" onClick={() => navigate('/login')}>Пропустить верификацию</button>
                              <button type="button" onClick={handleResendCode}>
                                  Отправить код ещё раз
                              </button>
                          </section>
                          {message && <p>{message}</p>}
                          {resendMessage && <p>{resendMessage}</p>}
                      </section>
                  </div>
              </form>
          </div>
      </div>
    );
}
