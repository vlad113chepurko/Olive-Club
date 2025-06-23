import "./_Error.scss";
import useErrorStore from "../../store/ErrorStore";

function Error() {
    const { clearError, errorMessage, setError } = useErrorStore();
    return (
        <div className="error-container">
            <section className="error-block">
                <img
                  src="https://img.icons8.com/?size=100&id=5342&format=png&color=FFFFFF"
                  alt="alert"
                  width={30}
                  height={30}
                />
                <p>{errorMessage}</p>
            </section>
            <section className="error-block">
                <button
                  className="error-button "
                  onClick={clearError}>
                    Close
                </button>
            </section>
        </div>
    )
}

export default Error;