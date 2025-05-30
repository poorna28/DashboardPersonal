"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    contactNumber: "",
    companyName: "",
    websiteUrl: "",
    contactMessage: "",
    whyDouJOin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let baseUrl;

    try {
      const configRes = await fetch('/config.json');
      const configData = await configRes.json();
      baseUrl = configData.API_URL;

      const res = await fetch(`${baseUrl}/api/GTM/contactMe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Thank you for registering! 🎉");
        setFormData({
          name: "",
          email: "",
          designation: "",
          contactNumber: "",
          companyName: "",
          websiteUrl: "",
          contactMessage: "",
          whyDouJOin: "",
        });
      } else {
        toast.error("Error sending email: " + data.error);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} method="POST" className="contact__form">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name">
                Person Name <span style={{ color: "red" }}>*</span>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">
                Email <span style={{ color: "red" }}>*</span>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="tel"
                name="contactNumber"
                placeholder="contact number"
                value={formData.contactNumber}
                onChange={handleChange}
                inputMode="numeric"
                pattern="^\d{10,15}$"
                title="please enter numbers only."
                required
              />
              <label htmlFor="contact-number">
                Mobile No <span style={{ color: "red" }}>*</span>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                name="designation"
                placeholder="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
              <label htmlFor="designation">
                Designation <span style={{ color: "red" }}>*</span>
              </label>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group">
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder="company-name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
              <label htmlFor="company-name">
                Company Name <span style={{ color: "red" }}>*</span>
              </label>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group">
              <input
                type="url"
                name="websiteUrl"
                placeholder="website-url"
                value={formData.websiteUrl}
                onChange={handleChange}
                required
              />
              <label htmlFor="website-url">
                Website URL <span style={{ color: "red" }}>*</span>
              </label>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group">
              <textarea
                name="contactMessage"
                placeholder="Write a brief discussion about your business (100-200 words)..."
                rows="2"
                cols="50"
                value={formData.contactMessage}
                onChange={handleChange}
                required
              ></textarea>
              <label htmlFor="contact-message">
                Brief discussion of your business{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group">
              <textarea
                name="whyDouJOin"
                placeholder="message"
                rows="2"
                cols="50"
                value={formData.whyDouJOin}
                onChange={handleChange}
                required
              ></textarea>
              <label htmlFor="contact-message">
                Why do you join this program?{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
            </div>
          </div>
          <div className="col-12">
            <button className="common-btn" style={{ color: "black" }}>
              Send Message
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}



// "use client";
// import { useState } from "react";

// export default function ContactForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     designation: "",
//     contactNumber: "",
//     companyName: "",
//     websiteUrl: "",
//     contactMessage: "",
//     whyDouJOin: "",
//   });

//   const [submitted, setSubmitted] = useState(false); // State for thank-you message

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
  
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let baseUrl;
//     await fetch('/config.json')
//     .then(response => response.json())
//     .then(data => {
//     baseUrl = data.API_URL;
//   });
//     const res = await fetch(`${baseUrl}/api/GTM/contactMe`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();
//     if (data.success) {
//       setSubmitted(true); // Show thank-you message
//       setFormData({
//         name: "",
//         email: "",
//         designation: "",
//         contactNumber: "",
//         companyName: "",
//         websiteUrl: "",
//         contactMessage: "",
//         whyDouJOin: "",
//       });
//     } else {
//       alert("Error sending email: " + data.error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} method="POST" className="contact__form">
//       <div className="row g-4">
//         <div className="col-md-6">
//           <div className="input-group">
//             <input
//               type="text"
//               name="name"
//               placeholder="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="name">Person Name <span style={{ color: "red" }}>  * </span></label>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="input-group">
//             <input
//               type="email"
//               name="email"
//               placeholder="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="email">Email <span style={{ color: "red" }}>  * </span></label>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="input-group">
//             <input
//               type="tel"
//               name="contactNumber"
//               placeholder="contact number"
//               value={formData.contactNumber}
//               onChange={handleChange} inputMode="numeric" pattern="^\d{10,15}$"     title="please enter numbers only."
//               required
//             />
//             <label htmlFor="contact-number">Mobile No <span style={{ color: "red" }}>  * </span></label>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="input-group">
//             <input
//               type="text"
//               name="designation"
//               placeholder="designation"
//               value={formData.designation}
//               onChange={handleChange}
//               required
//             />
//             {/* <label htmlFor="designation">Designation +"\n" + *</label> */}
//             <label htmlFor="designation"> Designation <span style={{ color: "red" }}>  * </span></label>

//           </div>
//         </div>
//         <div className="col-12">
//           <div className="input-group">
//             <input
//               type="text"
//               id="companyName"
//               name="companyName"
//               placeholder="company-name"
//               value={formData.companyName}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="company-name">Company Name <span style={{ color: "red" }}>  * </span></label>
//           </div>
//         </div>
//         <div className="col-12">
//           <div className="input-group">
//             <input
//               type="url"
//               name="websiteUrl"
//               placeholder="website-url"
//               value={formData.websiteUrl}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="website-url">Website URL <span style={{ color: "red" }}>  * </span></label>
//           </div>
//         </div>
//         <div className="col-12">
//           <div className="input-group">
//             <textarea
//               name="contactMessage"
//               placeholder="Write a brief discussion about your business (100-200 words)..."
//               rows="2"
//               cols="50"
//               value={formData.contactMessage}
//               onChange={handleChange}
//               required
//             ></textarea>
//             <label htmlFor="contact-message">Brief discussion of your business <span style={{ color: "red" }}>*</span></label>
//           </div>
//         </div>
//         <div className="col-12">
//           <div className="input-group">
//             <textarea
//               name="whyDouJOin"
//               placeholder="message"
//               rows="2"
//               cols="50"
//               value={formData.whyDouJOin}
//               onChange={handleChange}
//               required
//             ></textarea>
//             <label htmlFor="contact-message">Why do you join this program? <span style={{ color: "red" }}>  * </span></label>
//           </div>
//         </div>
//         <div className="col-12">
//           <button className="common-btn" style={{ color: "black" }}>
//             Send Message
//             <i className="fa-solid fa-arrow-right"></i>
//           </button>
//         </div>

//         {submitted && (
//   <div className="col-12">
//     <p className="thank-you-note">
//       <strong>Note:</strong> Thank you for registering! 🎉
//     </p>
//   </div>
// )}

//       </div>
//     </form>
//   );
// }

