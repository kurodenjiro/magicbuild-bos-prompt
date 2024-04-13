let accountId = context.accountId;
/**
 * Mint NFT Form
 */
if (!accountId) {
    return "Please sign in with NEAR wallet";
}
let cid =
    props.cid ?? "bafkreibmc23xhip63mxv2mulb7xko5htpiqszrch4fo3optszuctjtlrau";
let image = props.image;
const mintButton = props.mintButton ?? "Mint";
const showDetails = props.showDetails ?? true;
const title = props.title ?? "Example title";
const receiver = props.receiver ?? "ogruss.near";

if (image) {
    cid = image.cid;
    console.log("Image CID: " + cid);
}

let description = props.description ?? "Proof of Vibes powered by GenaDrop";
const profile = socialGetr(`${accountId}/profile`);

if (profile === null) {
    IpfsImageUpload();
    return "Loading";
}
State.init({
    cid: cid,
    description: description,
    title: title,
    image: image,
    receiver: receiver,
    //   image: "",
});

const handleMint = () => {
    if (!state.image.cid) {
        return;
    }
    if (!accountId) {
        console.log("Please login"); // add share dogvwallet
        State.update({
            showAlert: true,
            toastMessage: "Please log in before continuing",
        });
        setTimeout(() => {
            State.update({
                showAlert: false,
            });
        }, 3000);
    } else if (!state.title) {
        console.log("Please Enter title");
        State.update({
            showAlert: true,
            toastMessage: "Please enter a title for the NFT",
        });

        setTimeout(() => {
            State.update({
                showAlert: false,
            });
        }, 3000);
    } else if (!state.description) {
        State.update({
            showAlert: true,
            toastMessage: "Please enter a description for the NFT",
        });
        setTimeout(() => {
            State.update({
                showAlert: false,
            });
        }, 3000);
    } else {
        const metadata = {
            name: state.title,
            description: state.description,
            properties: [],
            image: `ipfs://${state.image.cid}`,
        };
        console.log("come", metadata);
        asyncFetch("https://ipfs.near.social/add", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: metadata,
        }).then((res) => {
            console.log("GO ON SOUN", res);
            const cid = res.body.cid;
            const gas = 200000000000000;
            const deposit = 10000000000000000000000;
            console.log("State Image CID: " + state.image.cid);
            console.log("Reference CID: " + cid);
            Near.call([
                {
                    contractName: "nft.genadrop.near",
                    methodName: "nft_mint",
                    args: {
                        token_id: `${Date.now()}`,
                        metadata: {
                            title: state.title,
                            description: state.description,
                            media: `https://ipfs.io/ipfs/${state.image.cid}`,
                            reference: `ipfs://${cid}`,
                        },
                        receiver_id: state.receiver,
                    },
                    gas: gas,
                    deposit: deposit,
                },
            ]);
        });
    }
};

initState({
    title: "",
    description: "",
    showAlert: false,
    toastMessage: "",
});

const onChangeTitle = (title) => {
    State.update({
        title,
    });
};
const onChangeReceiver = (receiver) => {
    State.update({
        receiver,
    });
};

const onChangeDesc = (description) => {
    State.update({
        description,
    });
};

if (!accountId) {
    console.log("Please login");
    State.update({
        showAlert: true,
        toastMessage: "Please log in before continuing",
    });
}



return (
    <div className="container-fluid">
        <div>
            <div className="d-flex flex-column align-items-center">
                {!!state.image.cid ?? (
                    <div>
                        <img
                            src={`https://ipfs.io/ipfs/` + state.image.cid}
                            alt="uploaded image"
                            width="100%"
                            height="100%"
                            className="rounded-3"
                        />
                    </div>
                )}
                <div>
                    <IpfsImageUpload
                        image={state.image}
                        className="btn btn-outline-primary border-0 rounded-3"
                    />
                </div>
            </div>
            {showDetails && (
                <div>
                    <h5>NFT Details</h5>
                    <div>
                        Title:
                        <input
                            type="text"
                            onChange={(e) => onChangeTitle(e.target.value)}
                            placeholder={state.title}
                        />
                    </div>
                    <div>
                        Description:
                        <textarea
                            type="text"
                            onChange={(e) => onChangeDesc(e.target.value)}
                            placeholder={state.description}
                        />
                    </div>
                    <div>
                        Receiver:
                        <input
                            type="text"
                            onChange={(e) => onChangeReceiver(e.target.value)}
                            placeholder={state.receiver}
                        />
                    </div>
                </div>
            )}
            <div className="d-flex justify-content-center mb-2">
                <button type="button" className="btn btn-primary" onClick={handleMint}>
                    {mintButton}
                </button>
            </div>
        </div>
    </div>
)