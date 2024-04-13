const Button0013 = styled.button`
 /* Styling for the button in its default state */
  display: inline-block;
  position: relative;
  padding: 10px 25px;
  background-color: #4CC713;
  color: white;
  font-family: sans-serif;
  text-decoration: none;
  font-size: 0.9em;
  text-align: center;
  text-indent: 15px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a21a;
    color: white;

    &:before {
      border-color: #cdefbd; 
    }

    &:after {
      margin-top: 0; 
      opacity: 0.4;
    }
  }

  &:before, &:after {
content: ' ';    display: block;
    position: absolute;
    left: 15px;
    top: 52%;
  }

  &:before {
    width: 10px;
    height: 2px;
    border-style: solid;
    border-width: 0 2px 2px;
    transition: border-color 0.3s; 
  }

  &:after {
    width: 0;
    height: 0;
    margin-left: 1px;
    margin-top: -7px;
    border-style: solid;
    border-width: 4px 4px 0 4px;
    border-color: transparent;
    border-top-color: inherit;
    transition: margin-top 0.3s, opacity 0.3s; 
  }`;
  State.init({
    count: 0,
})
const onClick = () => {
    State.update({count:state.count + 1})
}
 return(
        <Button0013 onClick={onClick}>Button 0013</Button0013>
        )