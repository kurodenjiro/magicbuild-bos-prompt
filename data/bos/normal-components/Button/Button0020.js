const Button0020 = styled.button`
  padding: 15px 20px;
  font-size: 16px;
  background: transparent;
  border: none;
  position: relative;
  color: #f0f0f0;
  z-index: 1;
  cursor: pointer;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;
    transition: all 0.4s;
    transform: translate(0%, 0%);
    width: 100%;
    height: 100%;
    background: #28282d;
    border-radius: 10px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;
    transition: all 0.4s;
    transform: translate(10px, 10px);
    width: 35px;
    height: 35px;
    background: #ffffff15;
    backdrop-filter: blur(5px);
    border-radius: 50px;
  }

  &:hover::before {
    transform: translate(5%, 20%);
    width: 110%;
    height: 110%;
  }

  &:hover::after {
    border-radius: 10px;
    transform: translate(0, 0);
    width: 100%;
    height: 100%;
  }

  &:active::after {
    transition: 0s;
    transform: translate(0, 5%);
  }`;
 return(
        <Button0020>Button 0020</Button0020>
      )