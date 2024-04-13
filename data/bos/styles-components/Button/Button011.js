const Button0011 = styled.button`
  background: transparent;
  position: relative;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid rgb(40, 144, 241);
  border-radius: 25px;
  outline: none;
  overflow: hidden;
  color: rgb(40, 144, 241);
  transition: color 0.3s 0.1s ease-out;
  text-align: center;

  span {
    margin: 10px;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    content: '';
    border-radius: 50%;
    display: block;
    width: 20em;
    height: 20em;
    left: -5em;
    text-align: center;
    transition: box-shadow 0.5s ease-out;
    z-index: -1;
  }

  &:hover {
    color: #fff;
    border: 1px solid rgb(40, 144, 241);
  }

  &:hover::before {
    box-shadow: inset 0 0 0 10em rgb(40, 144, 241);
  }`;
State.init({
    count: 0,
})
const onClick = () => {
    State.update({count:state.count + 1})
}
 return(
        <Button0011 onClick={onClick}>
          <span>Button 0011</span>
        </Button0011>
        )