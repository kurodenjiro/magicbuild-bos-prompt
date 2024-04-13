const CardMain = styled.div`
        width: 220px;
  height: 270px;
  border-radius: 20px;
  background: #f5f5f5;
  position: relative;
  padding: 1.8rem;
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;

  &:hover {
    border-color: #008bf8;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }

`;
const CardDetails = styled.div`
      color: black;
  height: 100%;
  gap: 0.5em;
  display: grid;
  place-content: center;

`;
const TextTitle = styled.p`
        font-size: 1.5em;
  font-weight: bold;

`;
const TextBody = styled.p`
        color: rgb(134, 134, 134);

`;
const CardButton = styled.button`
          transform: translate(-50%, 125%);
  width: 60%;
  border-radius: 1rem;
  border: none;
  background-color: #008bf8;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;${CardMain}:hover & {
    transform: translate(-50%, 50%);
    opacity: 1;
  }
`;
const profile = Social.getr("magicbuild.near/profile");

const trucateString = (str) => {
  if (str.length > 80) {
    return str.slice(0, 83) + "...";
  } else {
    return str;
  }
};
return (
  <CardMain>
    <CardDetails>
      <TextTitle>{profile.name}</TextTitle>
      <TextBody>{trucateString(profile.description)}</TextBody>
    </CardDetails>
    <CardButton>More info</CardButton>
  </CardMain>
);
