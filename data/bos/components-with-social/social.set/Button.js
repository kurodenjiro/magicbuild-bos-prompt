const onClick = () => {
    Social.set({
      post: {
        main: JSON.stringify({
          type: "md",
          text: "I've read the docs!"
        })
      }
    })
};

return <>
    <button onClick={onClick}><span>Save the Message</span></button>
</>