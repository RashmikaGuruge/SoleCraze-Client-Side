import { Send } from '@mui/icons-material'
import "./newsletter.scss";

const Newsletter = () => {
  return (
    <div className="newsletter">
      <div className="container">
        <h1>Newsletter</h1>
        <p>
        Get timely updates from your favorite products.
        </p>
        <div className="inputContainer">
          <input type="text" placeholder='Your email' />
          <button><Send /></button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
