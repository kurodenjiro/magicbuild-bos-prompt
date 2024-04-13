const Button0021 = styled.button`

  position: relative;
  text-decoration: none;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 5px;
  line-height: 48px;
  width: 160px;
  font-weight: bold;
  height: 55px;
  cursor: pointer;
  background: transparent;
  -webkit-box-reflect: bottom 1px linear-gradient(transparent, #0004);
  overflow: hidden;

  span {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 4px;
    right: 4px;
    bottom: 4px;
    left: 4px;
    text-align: center;
    background: #2E2E2E;
    color: rgba(255, 255, 255, 0.781);
    transition: 0.5s;
    z-index: 1;
  }

  &:hover span {
    color: rgba(255, 255, 255, 1);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: 400%;
    opacity: 0;
    transition: 0.5s;
    background: linear-gradient(45deg, #91155d, #525296, #0f0, #ff0, #fb0094, #00f, #0f0, #ff0);
    animation: animate123 20% linear infinite;
  }

  &::after {
    filter: blur(20px);
  }

  &:hover::before,
  &:hover::after {
    opacity: 1;
  }

  span::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: rgba(255, 255, 255, 0.1);
  }
}

@keyframes animate123 {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 300% 0;
  }

  100% {
    background-position: 0 0;
  }
}
`;

State.init({
    count: 0,
})
const onClick = () => {
    State.update({count:state.count + 1})
}

 return(
        <Button0021 onClick={onClick}>
          <span>Button0021</span>
        </Button0021>      )