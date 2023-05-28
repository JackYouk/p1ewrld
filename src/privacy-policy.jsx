import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
    // const navigate = useNavigate();

    return (
        <div style={{overflowY: 'scroll'}}>
            <h1>Privacy Policy</h1>

            <div >
                <h2>Personal Information</h2>
                <p>We collect personal information that you provide to us such as name, address, contact information, and passwords. We may also collect personal information that you voluntarily give us when participating in user forums and message boards.</p>
            </div>

            <div >
                <h2>Non-Personal Information</h2>
                <p>We automatically collect certain non-personal information from you when you use our site, including IP address, web browser type, mobile operating system, pages viewed, time spent on pages, links clicked, and conversion information.</p>
            </div>

            <div >
                <h2>Cookies</h2>
                <p>We use cookies and similar tracking technologies to track activity on our site and maintain certain information about our users.</p>
            </div>

            <div >
                <h2>How We Use Your Information</h2>
                <p>We use the information we collect to provide, maintain, and improve our services, as well as to understand and analyze how you use our services and develop new products, services, features, and functionality.</p>
            </div>

            <div >
                <h2>Changes to This Privacy Policy</h2>
                <p>We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>
            </div>
        </div>
    );
}