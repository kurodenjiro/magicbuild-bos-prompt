const Button0019 = styled.button`
  display: inline-block; 
  cursor: pointer;
  color: white;
  margin: 0 auto;
  position: relative;
  text-decoration: none;
  font-weight: 600;
  border-radius: 6px;
  overflow: hidden;
  padding: 3px;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(115deg, #4fcf70, #fad648, #a767e5, #12bcfe, #44ce7b);
    background-size: 200% 100%;
    animation: gradientMove 1.5s linear infinite;
    border-radius: 6px;
  }

  span {
    position: relative;
    display: inline-block;
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    background: #000;
    border-radius: 3px;
    height: 100%;
    z-index: 1;
    text-decoration: none;
  }
  
  @keyframes gradientMove {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }`;

  State.init({
    count: 0,
})
const onClick = () => {
    State.update({count:state.count + 1})
}

 return(
        <Button0019>
          <span>Button 0019</span>
        </Button0019>      )