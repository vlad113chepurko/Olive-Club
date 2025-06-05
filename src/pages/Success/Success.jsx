import "./Success.scss";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react"

function Success() {
    const navigate = useNavigate();
    return (
        <div className="success-wrapper">
            <div className="success-bg"></div>
            <div className="success">
                <h1> До встречи на вашей будущей плантации!</h1>
                <p>
                    Ваши ответы помогут нам предложить вам наиболее подходящий формат участия.
                </p>
                <p>
                    Мы свяжемся с вами в ближайшее время и предоставим подробную информацию по следующему шагу.
                </p>
                <img src="/logo-success.svg" alt="logo" width={250} height={275} />
                <button className="success-btn " onClick={() => navigate('/')}>Завершить</button>
            </div>
        </div>
    )
}

export default Success;