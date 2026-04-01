function FooterBtn(props) {
  const { onClickGamePlay, children } = props;
  return (
    <Button className="footer-btn" onClick={onClickGamePlay}>
      {children}
    </Button>
  );
}

export default FooterBtn;
