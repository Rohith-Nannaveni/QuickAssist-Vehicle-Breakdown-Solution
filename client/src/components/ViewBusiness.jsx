import React, { useState, useEffect } from 'react';
import { Link ,useParams} from 'react-router-dom';
import axios from 'axios';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";

import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import imgMech from "./img/mechanic.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewBusiness = () => {
  
  const [businessData, setBusinessData] = useState([]);
  //const [searchTerm, setSearchTerm] = useState('');
  //const [selectedType, setSelectedType] = useState('');
  const [vendoremail, setVendoremail] = useState('');
  const [vendorEmailForFeedback, setVendorEmailForFeedback] = useState('');
  
  
  const { id } = useParams(); // Use useParams to get route parameters


  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/business/${id}`);
        if (response.status === 200) {
          setBusinessData(response.data);
        } else {
          console.error('Error fetching business data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching business data:', error.message);
      }
    };

    fetchBusinessData();
  }, []);

// When vendoremail changes, set cookie and redirect
useEffect(() => {
  if (vendoremail) {
    document.cookie = `vendoremail=${vendoremail}`;
    window.location.href = '/post_request';
  }
}, [vendoremail]);

// When vendorEmailForFeedback changes, set cookie and redirect
useEffect(() => {
  if (vendorEmailForFeedback) {
    document.cookie = `vendoremail=${vendorEmailForFeedback}`;
    window.location.href = '/post_feedback';
  }
}, [vendorEmailForFeedback]);


  if (!businessData) {
    return <p>Loading business details...</p>;
  }

  // Optionally, check if status is approved, else show message
  if (!businessData.status || businessData.status.toLowerCase() !== 'approved') {
    return <p>This business is not approved yet.</p>;
  }

  /*
  const filteredData = businessData.filter((business) => {
    const matchesSearch = Object.values(business).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const isApproved = business.status.toLowerCase() === 'approved';
    
    //return matchesSearch && isApproved ;
    return matchesSearch && isApproved ;
  });
  */

  const handleCall = () => {
    window.location.href = `tel:${business.mobile}`;
  };
  

    
  return (
    <div>
        <div>
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'#020310'}}><img src={imgSmall} alt=""/> <Title /> </div>
        
            <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas"><span></span><span></span><span></span></div>
        </div>
        </div>  

{/* tabindex="-1" */}
        <div className="offcanvas offcanvas-start suha-offcanvas-wrap"  id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel">
      <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>

      <div className="offcanvas-body">
        <div className="sidenav-profile">
          <div className="user-profile"><img src={imgBg} alt=""/></div>
          <div className="user-info">
            <h6 className="user-name mb-1">On Road Help</h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/user_home"><i className="lni lni-home"></i>Home</Link></li>
          <li><Logout /></li>  
          </ul>
      </div>
    </div>
      </div>
    </div>
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          
        <div className="section-heading d-flex align-items-center justify-content-between">
            <h6>Road Services</h6>
			
          </div>
         
            


            <div className="row" style={{marginTop:10}}>
                {/* {filteredData.map((business) => ( */}
              <div className="col-12 col-md-6">                                        
        
              <div className="card product-card" style={{marginBottom:10}}>
                <div className="card-body"    >
                      <a className="product-title d-block"  >Business Name:  <b> {businessData.name} </b></a>
                      <a className="product-title d-block"  > Name:  <b>  {businessData.mechanicname} </b></a>
                      <a className="product-title d-block"  >Type :  <b>  {businessData.type} </b></a>
                      <a className="product-title d-block"  >Service Description:{businessData.service}  </a>
                      <a className="product-title d-block"  >Available: {businessData.available} </a>
                      <a className="product-title d-block"  >Address:  {businessData.address} </a>	
                      <a className="product-title d-block"  >Locality: {businessData.locality} </a>
                      <a className="product-title d-block"  >City: {businessData.city} </a>
                      <a className="product-title d-block"  >Mobile: {businessData.mobile}  </a>
                      
                      <a className="product-title d-block"  >Lat: {businessData.lat}  </a>
                      <a className="product-title d-block"  >Long: {businessData.long}  </a>

                      {/* Display the event image */}
                      {businessData.image && (
                          <img
                            src={businessData.image}
                            alt="Onroad service"
                            style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }}
                          />
                        )}
                    </div>
                    
                  </div>   
                  
                  <button
                  className="btn btn-danger"
                  onClick={() => setVendoremail(businessData.vendoremail)}
                >
                  Request
                </button>

                <a
                  className="btn btn-danger"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://wa.me/${businessData.mobile}`}
                >
                  WhatsApp
                </a>

                <a
                  className="btn btn-danger"
                  target="_blank"
                  href={`https://maps.google.com/?q=${businessData.lat},${businessData.long}`}
                >
                  Show Map
                </a>

                <button
                  className="btn btn-danger"
                  onClick={() => setVendorEmailForFeedback(businessData.vendoremail)}
                >
                  Feedback
                </button>

                  
              </div>


          {/*    ))} */}
              
        </div>
           
        </div>
    </div>


            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/user_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                  </ul>
                </div>
              </div>
            </div>



</div>


</div>
</div>
  )
}

export default ViewBusiness