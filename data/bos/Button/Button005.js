const Button0005 = styled.button`
font-family: monospace;
  font-size: 1em;
  color: #FAFAFA;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 10px;
  border: 4px solid #FAFAFA;
  background: #252525;
  box-shadow: 6px 6px #fafafa;
  cursor: pointer;
  margin: 35px 0;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:active {
    box-shadow: none;
    transform: translate(5px, 5px);
  }`;
State.init({
  data: "",
});
const showData = () => {
  const datas = Near.view("inotel.pool.f863973.m0", "get_accounts", {
    from_index: 0,
    limit: 5,
  });
  State.update({data:datas})
};

return <Button0005>Button 0005</Button0005>;
