import Facebook from '@mui/icons-material/FacebookOutlined';
import Instagram from '@mui/icons-material/Instagram';
import Twitter from '@mui/icons-material/Twitter';
import Pinterest from '@mui/icons-material/Pinterest';
import Room from '@mui/icons-material/Room';
import Phone from '@mui/icons-material/Phone';
import Email from '@mui/icons-material/Email';
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="left">
          <h1>Sole Craze</h1>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly believable.
          </p>
          <div className="socialContainer">
            <div className='facebook'>
                <Facebook/>
            </div>
            <div className='instagram'>
                <Instagram/>
            </div>
            <div className='twitter'>
                <Twitter/>
            </div>
            <div className='pinterest'>
                <Pinterest/>
            </div>
          </div>
        </div>
        <div className="center">
          <h3>Useful Links</h3>
          <ul>
            <li>Home</li>
            <li>Cart</li>
            <li>Man Fashion</li>
            <li>Woman Fashion</li>
            <li>Accessories</li>
            <li>My Account</li>
            <li>Order Tracking</li>
            <li>Wishlist</li>
            <li>Delivery</li>
            <li>Terms</li>
          </ul>
        </div>
        <div className="right">
          <div className="contactItem">
            <i><Room/></i> 622 Dixie Path , South Tobinchester 98336
          </div>
          <div className="contactItem">
            <i><Phone/></i> +1 234 56 78
          </div>
          <div className="contactItem">
            <i><Email/></i> contact@lama.dev
          </div>
          <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="" />
        </div>
      </div>
    </div>
    
  );
};

export default Footer;