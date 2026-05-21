import "./FooterBtn.css";
import cn from "classnames";
import { Button } from "react-bootstrap";

function FooterBtn(props) {
  const {
    variant,
    ariaLabel,
    onClick,
    disabled,
    children,
    btnClassName = '',
  } = props;
  const classes = cn("footer-btn", btnClassName );
  return (
    <Button
      className={classes}
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
