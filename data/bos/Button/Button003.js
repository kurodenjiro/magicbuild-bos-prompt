const Button0003 = styled.button`
--btn-default-bg: rgb(41, 41, 41);
  --btn-padding: 15px 20px;
  --btn-hover-bg: rgb(51, 51, 51);
  --btn-transition: 0.3s;
  --btn-letter-spacing: 0.1rem;
  --btn-animation-duration: 1.2s;
  --btn-shadow-color: rgba(0, 0, 0, 0.137);
  --btn-shadow: 0 2px 10px 0 var(--btn-shadow-color);
  --hover-btn-color: #FAC921;
  --default-btn-color: #fff;
  --font-size: 16px;
  --font-weight: 600;
  --font-family: Menlo, Roboto Mono, monospace;

  box-sizing: border-box;
  padding: var(--btn-padding);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--default-btn-color);
  font: var(--font-weight) var(--font-size) var(--font-family);
  background: var(--btn-default-bg);
  border: none;
  cursor: pointer;
  transition: background var(--btn-transition);
  overflow: hidden;
  box-shadow: var(--btn-shadow);
  transform-origin: center;
  transform: scale(1);
  transition: transform 0.3s;

  span {
    letter-spacing: var(--btn-letter-spacing);
    transition: color var(--btn-transition);
    box-sizing: border-box;
    position: relative;
    background: inherit;
  }

  &:hover, &:focus {
    background: var(--btn-hover-bg);

    span {
      color: var(--hover-btn-color);
    }

    transform: scale(1.1); /* Bounce effect */
  }
}`;
State.init({
    value: ""
})

const getValue = () => {
    const greeting = Near.view("hello.near-examples.testnet", "get_greeting", {});

    if (greeting === null) return "Loading...";
    State.update({value:greeting})
}

return(
    <Button0003 onClick={getValue}>
          <span>Button 0003</span>
    </Button0003>
)