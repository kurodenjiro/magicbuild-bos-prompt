const Button0010 = styled.button`
  color: #ecf0f1;
  font-size: 17px;
  background-color: #e67e22;
  border: 1px solid #f39c12;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 6px 0px #d35400;
  transition: all 0.1s;

  &:active {
    box-shadow: 0px 2px 0px #d35400;
    position: relative;
    top: 2px;
  }`;
  State.init({
    count: 0,
})
const onClick = () => {
    State.update({count:state.count + 1})
}
 return(
        <Button0010 onClick={onClick}>Button 0010 </Button0010>
        )