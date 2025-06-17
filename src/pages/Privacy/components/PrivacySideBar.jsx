import "../styles/_Privacy.scss";

function PrivacySideBar() {

  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  }

  const handleScrollBottom = () => {
    window.scrollTo(100, 900);
  }

  return (
    <div className="privacy-side-bar">
      <section className="bar-top">
        <p className="p-unhidden">1-6</p>
        <img
          onClick={() => handleScrollTop()}
          src="/icons/arrow-top01.svg"
          alt="arrow-bottom"
        />
      </section>
      <section className="bar-bottom">
        <img
          onClick={() => handleScrollBottom()}
          src="/icons/arrow-bottom01.svg"
          alt="arrow-bottom"
        />
        <p className="p-unhidden">7-12</p>
      </section>
    </div>
  )
}

export default PrivacySideBar;