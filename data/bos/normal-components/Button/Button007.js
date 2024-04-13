const Button0007 = styled.button`
  padding: 0.1em 0.25em;
  width: 13em;
  height: 4.2em;
  background-color: #212121;
  border: 0.08em solid #fff;
  border-radius: 0.3em;
  font-size: 12px;
  cursor: pointer;

  span {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0.4em;
    width: 8.25em;
    height: 2.5em;
    background-color: #212121;
    border-radius: 0.2em;
    font-size: 1.5em;
    color: #fff;
    border: 0.08em solid #fff;
    box-shadow: 0 0.4em 0.1em 0.019em #fff;
    transition: all 0.5s;

    &:hover {
      transform: translate(0, 0.4em);
      box-shadow: 0 0 0 0 #fff;
      transition: all 0.5s;
    }
  }`;
 return(
        <Button0007>
          <span>Button 0007</span>
        </Button0007>
        )