import { Button } from "react-bootstrap";

function FooterBtn(props) {
  const { variant, ariaLabel, onClick, disabled, children } = props;
  return (
    <Button
      className="footer-btn"
      variant={variant}
      title={ariaLabel}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export default FooterBtn;
