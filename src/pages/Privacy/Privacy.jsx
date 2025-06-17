import PrivacySideBar from './components/PrivacySideBar';
import PrivacyHeader from "./components/PrivacyHeader";
import "./styles/_Privacy.scss";

function Privacy() {
  return (
    <div className="privacy-wrapper">
      <PrivacyHeader />
      <PrivacySideBar />
      <div className="privacy-container">
        <article className={"privacy-h1-container"}>
          <h1 className="privacy-h1">PRIVACY POLICY</h1>
        </article>
        <article className="article-start">
          <h3>1. General Provisions</h3>
          <p>This Privacy Policy governs the collection, storage, and processing of users'
            personal data, as well as the conditions for accessing content on the website
            <a href={"https://www.familyoliveclub.com"}>https://www.familyoliveclub.com</a>. By submitting their data through forms on the site, users give informed consent to the processing of their data in accordance with the terms of this policy.</p>
        </article>
        <article className="article-center">
          <h3>2. Data We Collect</h3>
          <div className="list-container">
            <section>
              <ul>
                <p>2.1 Personal Data Collected only with the user's consent via form submission:</p>
                <li>Name</li>
                <li>Email</li>
                <li>Phone number</li>
                <li>UTM tags (if available)</li>
              </ul>
            </section>
            <section>
              <ul>
                <p>2.2 Technical Data (collected automatically)</p>
                <li>IP address</li>
                <li>Browser language</li>
                <li>Device type</li>
                <li>Geo-location by IP</li>
                <li>
                  On-site behavior (scrolls, clicks)
                  Referrer, traffic source</li>
              </ul>
            </section>
          </div>
        </article>
        <article className="article-center">
          <h3>3. Content Access Conditions</h3>
          <p>Landing page content is accessible only after completing the form and consenting to data processing.On first visit, a popup is displayed with a consent checkbox:
            I consent to the processing of my personal data and accept the privacy policy.Access to the site is not possible without confirmation of consent.</p>
        </article>
        <article className="article-center">
          <h3>4. Purpose of Data Processing</h3>
          <section className="list-container">
            <ul>
              <li>Providing access to landing page content</li>
              <li>User identification</li>
              <li>Exporting the database to the admin panel</li>
              <li>User communication and support</li>
              <li>Integration with CRM/messengers (if permitted)
                Marketing and behavioral analytics (with consent)</li>
            </ul>
          </section>
        </article>
        <article className="article-center">
          <h3>5. Image and Media Processing Policy</h3>
          <section className="list-container">
            <ul>
              <p>Images and event descriptions may be added via the admin panel.
                Administrators are obligated to:</p>
              <li>Not use images that violate copyright</li>
              <li>Not publish images containing personal data of third parties without consent</li>
              <li>Remove inappropriate or outdated content upon request</li>
              <p>All images uploaded through the admin panel are automatically processed (resized, optimized) and stored on the site’s servers.</p>
            </ul>
          </section>
        </article>
        <article className="article-center">
          <h3>6. Data Storage and Protection</h3>
          <section className="list-container">
            <ul>
              <li>Server data is stored on secure cloud platforms</li>
              <li>Admin passwords are encrypted (bcrypt)</li>
              <li>Cookies and tokens are used for automatic login</li>
              <p>Protection against XSS, CSRF, and SQL injections is implemented</p>
            </ul>
          </section>
        </article>
        <article className="article-center">
          <h3>7. Cookies and localStorage</h3>
          <section className="list-container">
            <ul>
              <p>We use cookies and/or localStorage for:</p>
              <li>Login persistence</li>
              <li>
                Storing technical preferences</li>
              <li>Behavior analysis (via Google Analytics, Consent Mode)</li>
              <p>Users can disable cookies in their browser, but some functionality of the site may be limited.</p>
            </ul>
          </section>
        </article>
        <article className="article-center">
          <h3>8. Your Rights</h3>
          <section className="list-container">
            <ul>
              <p>Users have the right to:</p>
              <li>Request a copy of their data</li>
              <li>Request deletion/modification of data</li>
              <li>Withdraw consent</li>
              <li>Receive a description of data processing algorithms</li>
              <p>To exercise these rights, please contact: <a href={"#"}>info@familyoliveclub.com</a></p>
            </ul>
          </section>
        </article>
        <article className="article-center">
          <h3>9. Data Retention</h3>
            <section className="list-container">
              <ul>
                <li>Data is stored until a deletion request is received</li>
                <li>For marketing purposes — no longer than 36 months</li>
                <li>Visit logs (IP and actions) — up to 12 months</li>
              </ul>
            </section>
        </article>
        <article className="article-center">
          <h3>10. Third-Party Disclosure</h3>
          <section className="list-container">
            <ul>
              <p>We do not sell or transfer personal data to third parties without consent, except:</p>
              <li>Integration with Mailchimp/SendGrid (if subscribed)</li>
              <li>CRM systems (amoCRM or similar)</li>
              <li>Telegram bot (lead notification)</li>
              <p>Legal requests by court order</p>
            </ul>
          </section>
        </article>
        <article className="article-center">
          <h3>11. Policy Updates</h3>
          <section className="list-container">
            <ul>
              <p>This policy may be updated. All changes will be published on this page.</p>
              <p> Last updated: April 2, 2025</p>
            </ul>
          </section>
        </article>
        <article className="article-center">
          <h3>12. Contact Information</h3>
          <section className="list-container">
            <ul>
              <p>Family Olive Club</p>
              <p>Legal address: Tbilisi Vakhtang Bochorishvili St. 37b apart. 18</p>
              <p>Email: <a href={"#"}>info@familyoliveclub.com</a></p>
              <p>Website: <a href="https://www.familyoliveclub.com">https://www.familyoliveclub.com</a></p>
            </ul>
          </section>
        </article>
      </div>
    </div>
  )
}

export default Privacy;