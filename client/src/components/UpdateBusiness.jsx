import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const UpdateBusiness = () => {
  const { id } = useParams();

  const [editedBusiness, setEditedBusiness] = useState({
    vendoremail: '',
    name: '',
    mechanicname: '',
    type: '',
    service: '',
    available: '',
    locality: '',
    address: '',
    city: '',
    mobile: '',
    image: '', // Will be updated if new image is uploaded
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/business/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEditedBusiness(data);
        } else {
          console.error('Error fetching business data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching business data:', error.message);
      }
    };

    fetchBusinessDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBusiness((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpdateBusiness = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(editedBusiness.mobile)) {
      alert('Mobile number must be a 10-digit number');
      return;
    }

    const formData = new FormData();
    for (let key in editedBusiness) {
      formData.append(key, editedBusiness[key]);
    }

    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/business/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('Business details updated successfully!');
        window.location.href = "/view_my_business";
      } else {
        console.error('Error updating business:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
          <div className="logo-wrapper" style={{ color: '#020310' }}>
            <img src={imgSmall} alt="" /> <Title />
          </div>
          <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="offcanvas offcanvas-start suha-offcanvas-wrap" id="suhaOffcanvas">
        <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas"></button>
        <div className="offcanvas-body">
          <div className="sidenav-profile">
            <div className="user-profile"><img src={imgBg} alt="" /></div>
            <div className="user-info"><h6 className="user-name mb-1">On Road Help</h6></div>
          </div>
          <ul className="sidenav-nav ps-0">
            <li><Link to="/vendor_home"><i className="lni lni-home"></i>Home</Link></li>
            <li><Logout /></li>
          </ul>
        </div>
      </div>

      {/* Form */}
      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Update Business</h6>
            </div>
            <div className="profile-wrapper-area py-3">
              <div className="card user-data-card">
                <div className="card-body">
                  <form onSubmit={handleUpdateBusiness} encType="multipart/form-data">
                    {/* Fields */}
                    {[
                      { label: "Vendor Email", name: "vendoremail", disabled: true },
                      { label: "Business Name", name: "name" },
                      { label: "Mechanic Name", name: "mechanicname" },
                      { label: "Type", name: "type" },
                      { label: "Services", name: "service" },
                      { label: "Available", name: "available" },
                      { label: "Locality", name: "locality" },
                      { label: "Address", name: "address" },
                      { label: "City", name: "city" },
                      { label: "Mobile", name: "mobile" },
                    ].map(({ label, name, disabled }) => (
                      <div className="mb-3" key={name}>
                        <div className="title mb-2"><span>{label}</span></div>
                        <input
                          className="form-control"
                          name={name}
                          value={editedBusiness[name]}
                          onChange={handleInputChange}
                          type="text"
                          disabled={disabled}
                        />
                      </div>
                    ))}

                    {/* Image Upload (no preview) */}
                    <div className="mb-3">
                      <div className="title mb-2"><span>Upload New Image (optional)</span></div>
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </div>

                    <button className="btn btn-success w-100" type="submit">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="footer-nav-area" id="footerNav">
        <div className="container h-100 px-0">
          <div className="suha-footer-nav h-100">
            <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
              <li className="active"><Link to="/vendor_home"><i className="lni lni-home"></i>Home</Link></li>
              <li><Logout /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBusiness;
