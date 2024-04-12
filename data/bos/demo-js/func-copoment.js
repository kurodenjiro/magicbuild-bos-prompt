// An examle func conpoment
function Magic(props) {
    return <div>Magic: {props.children}</div>;
}

return <Magic>Hello World</Magic>;