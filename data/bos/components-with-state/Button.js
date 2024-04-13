const Button0024 = styled.button`
  font-size: 16px;
  font-weight: 700;
  color: #ff7576;
  background-color: #2b3044;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 12px 24px;
  position: relative;
  line-height: 24px;
  border-radius: 9px;
  box-shadow: 0px 1px 2px #2b3044, 0px 4px 16px #2b3044;
  transform-style: preserve-3d;
  transform: scale(var(--s, 1)) perspective(600px)
    rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  perspective: 600px;
  transition: transform 0.1s;

  .sp {
    background: linear-gradient(
      90deg,
      #866ee7,
      #ea60da,
      #ed8f57,
      #fbd41d,
      #2cca91
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    display: block;
  }

  &:active {
    transition: 0.3s;
    transform: scale(0.93);
  }
`;
State.int({
    count:0,
})
const handleClick = () =>{
    State.update({
        count:state.count+1
    })
}
 return(
         <Button0024 onClick={handleClick} data-label="Button0024">
          <span className="sp">Button 0024</span>
        </Button0024>
              )