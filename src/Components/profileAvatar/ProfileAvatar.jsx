import "./profile.css";
import portrait from "../../assets/images/testimonial1.png";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

const ProfileAvatar = () => {
  return (
    
<div className="profile">
        <Dropdown>
        <Dropdown.Toggle>
          <img src={portrait} alt="" />
        </Dropdown.Toggle>
        <Dropdown.Menu style={{left: "-12px"}}>
          <Dropdown.Item>     <Link to="/profile" className="nav-link">Profile</Link>  </Dropdown.Item>    
        </Dropdown.Menu>
      </Dropdown>
</div>
  );
};



export default ProfileAvatar;
