const Button0008 = styled.button`
  font-size: 16px;
  position: relative;
  margin: auto;
  padding: 1em 2.5em 1em 2.5em;
  border: none;
  background: #fff;
  transition: all 0.1s linear;
  box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.1);
  border-radius:5em;
  &:active {
    transform: scale(0.95);
  }

  span {
    color: #464646;
  }

  .border {
    position: absolute;
    border: 0.15em solid #fff;
    transition: all 0.3s 0.08s linear;
    top: 50%;
    left: 50%;
    width: 10.25em;
    height: 3em;
    transform: translate(-50%, -50%);
  }

  &:hover .border {
    display: block;
    width: 11.5em;
    height: 3.9em;
  }

  .full-rounded {
    border-radius: 5em;
  }
  .border full-rounded {
  border-radius: 5em;
  }`;
 return(
        <Button0008>
          <span>Button 0008</span>
          <div className="border full-rounded"></div>
        </Button0008>
        )