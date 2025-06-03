import "./Success.scss";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react"

function Success() {
    const navigate = useNavigate();
    return (
        <div className="success-wrapper">
            <div className="background"></div>
            <div className="success">
                <motion.h1
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5, delay: 0.1}}
                >Спасибо что прошли наш опрос!</motion.h1>

                <motion.button className="success-btn"
                initial={{y: 2000}}
                animate={{y: 0}}
                transition={{duration: 0.5, delay: 0.1}}
                               onClick={() => navigate("/")}
                >Go to home</motion.button>
            </div>
        </div>
    )
}

export default Success;