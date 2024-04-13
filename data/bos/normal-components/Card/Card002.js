const CardWrapper = styled.div`
    width: 220px;
  height: 270px;
  background: #07182E;
  position: relative;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 20px;

`;
const CardTitle = styled.h2`
    z-index: 1;
  color: white;
  font-size: 2em;

`;
const CardBefore = styled.div`
    content: '';
  position: absolute;
  width: 100px;
  background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
  height: 130%;
  animation: rotateBackground 3s linear infinite;
  transition: all 0.2s linear;
  @keyframes rotateBackground {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

`;
const CardAfter = styled.div`
    content: '';
  position: absolute;
  background: #07182E;
  inset: 5px;
  border-radius: 15px;

`;
 return(
        <CardWrapper>
          <CardTitle>CARD</CardTitle>
          <CardBefore></CardBefore>
          <CardAfter></CardAfter>
        </CardWrapper>
  )