
import {
    RecursiveCharacterTextSplitter,
} from "langchain/text_splitter";
import { readFileSync } from "fs"
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { HNSWLib } from 'langchain/vectorstores/hnswlib'
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { MintBaseLoader } from './blockchain/mbapi.js'

import { } from 'dotenv/config'


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const jsData = [
    {
        "name": "Button",
        "js": "const onClick = () => {};\r\nconst DoubleClick = () => {};\r\nreturn (\r\n  <div class=\"btn-group\" role=\"group\" aria-label=\"Basic example\">\r\n    <button\r\n      onClick={onClick}\r\n      onDoubleClick={DoubleClick}\r\n      type=\"button\"\r\n      class=\"btn btn-primary\"\r\n    >\r\n      Left\r\n    </button>\r\n    <button\r\n      onClick={onClick}\r\n      onDoubleClick={DoubleClick}\r\n      type=\"button\"\r\n      class=\"btn btn-primary\"\r\n    >\r\n      Middle\r\n    </button>\r\n    <button\r\n      onClick={onClick}\r\n      onDoubleClick={DoubleClick}\r\n      type=\"button\"\r\n      class=\"btn btn-primary\"\r\n    >\r\n      Right\r\n    </button>\r\n  </div>\r\n);\r\n"
    },
    {
        "name": "Input",
        "js": "State.init({\r\n  value: \"\",\r\n});\r\nconst OnChange = (e) => {\r\n  State.update({ value: e.target.value });\r\n};\r\nconsole.log(state.value);\r\nreturn (\r\n  <input\r\n    type=\"text\"\r\n    class=\"form-control mt-2\"\r\n    placeholder=\"Enter text\"\r\n    aria-label=\"text\"\r\n    value={state.value}\r\n    onChange={OnChange}\r\n  />\r\n);\r\n"
    },
    {
        "name": "Accordion",
        "js": "return (\r\n  <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">\r\n    <div class=\"accordion-item\">\r\n      <h2 class=\"accordion-header\" id=\"flush-headingOne\">\r\n        <button\r\n          class=\"accordion-button collapsed\"\r\n          type=\"button\"\r\n          data-bs-toggle=\"collapse\"\r\n          data-bs-target=\"#flush-collapseOne\"\r\n          aria-expanded=\"false\"\r\n          aria-controls=\"flush-collapseOne\"\r\n        >\r\n          Accordion Item #1\r\n        </button>\r\n      </h2>\r\n      <div\r\n        id=\"flush-collapseOne\"\r\n        class=\"accordion-collapse collapse\"\r\n        aria-labelledby=\"flush-headingOne\"\r\n        data-bs-parent=\"#accordionFlushExample\"\r\n      >\r\n        <div class=\"accordion-body\">\r\n          Placeholder content for this accordion, which is intended to\r\n          demonstrate the This is the first item's accordion body.\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n);\r\n"
    },
    {
        "name": "Alerts",
        "js": "return (\r\n  <>\r\n    <div class=\"alert alert-primary\" role=\"alert\">\r\n      A simple primary alert—check it out!\r\n    </div>\r\n    <div class=\"alert alert-secondary\" role=\"alert\">\r\n      A simple secondary alert—check it out!\r\n    </div>\r\n    <div class=\"alert alert-success\" role=\"alert\">\r\n      A simple success alert—check it out!\r\n    </div>\r\n    <div class=\"alert alert-danger\" role=\"alert\">\r\n      A simple danger alert—check it out!\r\n    </div>\r\n    <div class=\"alert alert-warning\" role=\"alert\">\r\n      A simple warning alert—check it out!\r\n    </div>\r\n    <div class=\"alert alert-info\" role=\"alert\">\r\n      A simple info alert—check it out!\r\n    </div>\r\n    <div class=\"alert alert-light\" role=\"alert\">\r\n      A simple light alert—check it out!\r\n    </div>\r\n    <div class=\"alert alert-dark\" role=\"alert\">\r\n      A simple dark alert—check it out!\r\n    </div>\r\n  </>\r\n);\r\n"
    },
    {
        "name": "Avatar",
        "js": "return (\r\n  <>\r\n    <img\r\n      src=\"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp\"\r\n      class=\"rounded-circle\"\r\n      style={{ width: \"150px\" }}\r\n      alt=\"Avatar\"\r\n    />\r\n  </>\r\n);\r\n"
    },
    {
        "name": "Badge",
        "js": "return (\r\n  <>\r\n    <button type=\"button\" class=\"btn btn-primary position-relative\">\r\n      Inbox\r\n      <span class=\"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger\">\r\n        99+\r\n        <span class=\"visually-hidden\">unread messages</span>\r\n      </span>\r\n    </button>\r\n  </>\r\n);\r\n"
    },
    {
        "name": "Carousel",
        "js": "return (\r\n  <>\r\n    <div\r\n      id=\"carouselExampleIndicators\"\r\n      class=\"carousel slide\"\r\n      data-bs-ride=\"carousel\"\r\n    >\r\n      <div class=\"carousel-indicators\">\r\n        <button\r\n          type=\"button\"\r\n          data-bs-target=\"#carouselExampleIndicators\"\r\n          data-bs-slide-to=\"0\"\r\n          class=\"active\"\r\n          aria-current=\"true\"\r\n          aria-label=\"Slide 1\"\r\n        ></button>\r\n        <button\r\n          type=\"button\"\r\n          data-bs-target=\"#carouselExampleIndicators\"\r\n          data-bs-slide-to=\"1\"\r\n          aria-label=\"Slide 2\"\r\n        ></button>\r\n        <button\r\n          type=\"button\"\r\n          data-bs-target=\"#carouselExampleIndicators\"\r\n          data-bs-slide-to=\"2\"\r\n          aria-label=\"Slide 3\"\r\n        ></button>\r\n      </div>\r\n      <div class=\"carousel-inner\">\r\n        <div class=\"carousel-item active\">\r\n          <img\r\n            src=\"https://i.pinimg.com/736x/5e/4c/65/5e4c655b9353e0be289273b3e7c4b227.jpg\"\r\n            class=\"d-block w-100\"\r\n            alt=\"first\"\r\n          />\r\n        </div>\r\n        <div class=\"carousel-item\">\r\n          <img\r\n            src=\"https://wallpaper-house.com/data/out/9/wallpaper2you_358925.jpg\"\r\n            class=\"d-block w-100\"\r\n            alt=\"two\"\r\n          />\r\n        </div>\r\n        <div class=\"carousel-item\">\r\n          <img\r\n            src=\"https://wallpaperset.com/w/full/6/1/a/61893.jpg\"\r\n            class=\"d-block w-100\"\r\n            alt=\"three\"\r\n          />\r\n        </div>\r\n      </div>\r\n      <button\r\n        class=\"carousel-control-prev\"\r\n        type=\"button\"\r\n        data-bs-target=\"#carouselExampleIndicators\"\r\n        data-bs-slide=\"prev\"\r\n      >\r\n        <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n        <span class=\"visually-hidden\">Previous</span>\r\n      </button>\r\n      <button\r\n        class=\"carousel-control-next\"\r\n        type=\"button\"\r\n        data-bs-target=\"#carouselExampleIndicators\"\r\n        data-bs-slide=\"next\"\r\n      >\r\n        <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n        <span class=\"visually-hidden\">Next</span>\r\n      </button>\r\n    </div>\r\n  </>\r\n);\r\n"
    },
    {
        "name": "Bottom Navigation",
        "js": "return (\r\n  <div class=\"navbar fixed-bottom navbar-dark bg-primary\">\r\n    <a class=\"navbar-brand\" href=\"#\">\r\n      Fixed bottom\r\n    </a>\r\n  </div>\r\n);\r\n"
    },
    {
        "name": "Breadcrumb",
        "js": "return (\r\n  <div aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\">\r\n        <a href=\"#\">Home</a>\r\n      </li>\r\n      <li class=\"breadcrumb-item\">\r\n        <a href=\"#\">Library</a>\r\n      </li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">\r\n        Data\r\n      </li>\r\n    </ol>\r\n  </div>\r\n);\r\n"
    },
    {
        "name": "Button Group",
        "js": "return (\r\n  <div class=\"btn-group\" role=\"group\" aria-label=\"Basic example\">\r\n    <button type=\"button\" class=\"btn btn-primary\">\r\n      Left\r\n    </button>\r\n    <button type=\"button\" class=\"btn btn-primary\">\r\n      Middle\r\n    </button>\r\n    <button type=\"button\" class=\"btn btn-primary\">\r\n      Right\r\n    </button>\r\n  </div>\r\n);\r\n"
    },
    {
        "name": "Card",
        "js": "return (\r\n  <div class=\"card\" style={{ width: \"18rem\" }}>\r\n    <img\r\n      src=\"https://wallpaperset.com/w/full/6/1/a/61893.jpg\"\r\n      class=\"card-img-top\"\r\n      alt=\"image\"\r\n    />\r\n    <div class=\"card-body\">\r\n      <h5 class=\"card-title\">Card title</h5>\r\n      <p class=\"card-text\">\r\n        Some quick example text to build on the card title and make up the bulk\r\n        of the card's content.\r\n      </p>\r\n      <a href=\"#\" class=\"btn btn-primary\">\r\n        Go somewhere\r\n      </a>\r\n    </div>\r\n  </div>\r\n);\r\n"
    },
    {
        "name": "Dropdowns",
        "js": "return (\r\n  <div class=\"dropdown\">\r\n    <button\r\n      class=\"btn btn-secondary dropdown-toggle\"\r\n      type=\"button\"\r\n      data-bs-toggle=\"dropdown\"\r\n      aria-expanded=\"false\"\r\n    >\r\n      Dropdown button\r\n    </button>\r\n    <ul class=\"dropdown-menu\">\r\n      <li>\r\n        <a class=\"dropdown-item\" href=\"#\">\r\n          Action\r\n        </a>\r\n      </li>\r\n      <li>\r\n        <a class=\"dropdown-item\" href=\"#\">\r\n          Another action\r\n        </a>\r\n      </li>\r\n      <li>\r\n        <a class=\"dropdown-item\" href=\"#\">\r\n          Something else here\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n);\r\n"
    },
    {
        "name": "Forms",
        "js": "return (\r\n  <div>\r\n    <div class=\"mb-3\">\r\n      <label for=\"exampleInputEmail1\" class=\"form-label\">\r\n        Email address\r\n      </label>\r\n      <input\r\n        type=\"email\"\r\n        class=\"form-control\"\r\n        id=\"exampleInputEmail1\"\r\n        aria-describedby=\"emailHelp\"\r\n      />\r\n      <div id=\"emailHelp\" class=\"form-text\">\r\n        We'll never share your email with anyone else.\r\n      </div>\r\n    </div>\r\n    <div class=\"mb-3\">\r\n      <label for=\"exampleInputPassword1\" class=\"form-label\">\r\n        Password\r\n      </label>\r\n      <input type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" />\r\n    </div>\r\n    <div class=\"mb-3 form-check\">\r\n      <input type=\"checkbox\" class=\"form-check-input\" id=\"exampleCheck1\" />\r\n      <label class=\"form-check-label\" for=\"exampleCheck1\">\r\n        Check me out\r\n      </label>\r\n    </div>\r\n    <button type=\"submit\" class=\"btn btn-primary\">\r\n      Submit\r\n    </button>\r\n  </div>\r\n);\r\n"
    },
    {
        "name": "Gallery",
        "js": "return (\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-4 col-md-12 mb-4 mb-lg-0\">\r\n      <img\r\n        src=\"https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp\"\r\n        class=\"w-100 shadow-1-strong rounded mb-4\"\r\n        alt=\"Boat on Calm Water\"\r\n      />\r\n\r\n      <img\r\n        src=\"https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp\"\r\n        class=\"w-100 shadow-1-strong rounded mb-4\"\r\n        alt=\"Wintry Mountain Landscape\"\r\n      />\r\n    </div>\r\n\r\n    <div class=\"col-lg-4 mb-4 mb-lg-0\">\r\n      <img\r\n        src=\"https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp\"\r\n        class=\"w-100 shadow-1-strong rounded mb-4\"\r\n        alt=\"Mountains in the Clouds\"\r\n      />\r\n\r\n      <img\r\n        src=\"https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp\"\r\n        class=\"w-100 shadow-1-strong rounded mb-4\"\r\n        alt=\"Boat on Calm Water\"\r\n      />\r\n    </div>\r\n\r\n    <div class=\"col-lg-4 mb-4 mb-lg-0\">\r\n      <img\r\n        src=\"https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp\"\r\n        class=\"w-100 shadow-1-strong rounded mb-4\"\r\n        alt=\"Waves at Sea\"\r\n      />\r\n\r\n      <img\r\n        src=\"https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp\"\r\n        class=\"w-100 shadow-1-strong rounded mb-4\"\r\n        alt=\"Yosemite National Park\"\r\n      />\r\n    </div>\r\n  </div>\r\n);\r\n"
    },
    {
        "name": "Jumbotron",
        "js": "return (\r\n  <div class=\"jumbotron\">\r\n    <h1 class=\"display-4\">Hello, world!</h1>\r\n    <p class=\"lead\">\r\n      This is a simple hero unit, a simple jumbotron-style component for calling\r\n      extra attention to featured content or information.\r\n    </p>\r\n    <hr class=\"my-4\" />\r\n    <p>\r\n      It uses utility classes for typography and spacing to space content out\r\n      within the larger container.\r\n    </p>\r\n    <p class=\"lead\">\r\n      <a class=\"btn btn-primary btn-lg\" href=\"#\" role=\"button\">\r\n        Learn more\r\n      </a>\r\n    </p>\r\n  </div>\r\n);\r\n"
    },
    {
        "name": "List Groups",
        "js": "return (\r\n  <ul class=\"list-group\">\r\n    <li class=\"list-group-item\">An item</li>\r\n    <li class=\"list-group-item\">A second item</li>\r\n    <li class=\"list-group-item\">A third item</li>\r\n    <li class=\"list-group-item\">A fourth item</li>\r\n    <li class=\"list-group-item\">And a fifth one</li>\r\n  </ul>\r\n);\r\n"
    },
    {
        "name": "Modal",
        "js": "return (\r\n  <>\r\n    <button\r\n      type=\"button\"\r\n      class=\"btn btn-primary\"\r\n      data-bs-toggle=\"modal\"\r\n      data-bs-target=\"#exampleModal\"\r\n    >\r\n      Launch demo modal\r\n    </button>\r\n\r\n    <div\r\n      class=\"modal fade\"\r\n      id=\"exampleModal\"\r\n      tabindex=\"-1\"\r\n      aria-labelledby=\"exampleModalLabel\"\r\n      aria-hidden=\"true\"\r\n    >\r\n      <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h1 class=\"modal-title fs-5\" id=\"exampleModalLabel\">\r\n              Modal title\r\n            </h1>\r\n            <button\r\n              type=\"button\"\r\n              class=\"btn-close\"\r\n              data-bs-dismiss=\"modal\"\r\n              aria-label=\"Close\"\r\n            ></button>\r\n          </div>\r\n          <div class=\"modal-body\">...</div>\r\n          <div class=\"modal-footer\">\r\n            <button\r\n              type=\"button\"\r\n              class=\"btn btn-secondary\"\r\n              data-bs-dismiss=\"modal\"\r\n            >\r\n              Close\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-primary\">\r\n              Save changes\r\n            </button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </>\r\n);\r\n"
    },
    {
        "name": "Pagination",
        "js": "return (\r\n  <div aria-label=\"Page navigation example\">\r\n    <ul class=\"pagination\">\r\n      <li class=\"page-item\">\r\n        <a class=\"page-link\" href=\"#\">\r\n          Previous\r\n        </a>\r\n      </li>\r\n      <li class=\"page-item\">\r\n        <a class=\"page-link\" href=\"#\">\r\n          1\r\n        </a>\r\n      </li>\r\n      <li class=\"page-item\">\r\n        <a class=\"page-link\" href=\"#\">\r\n          2\r\n        </a>\r\n      </li>\r\n      <li class=\"page-item\">\r\n        <a class=\"page-link\" href=\"#\">\r\n          3\r\n        </a>\r\n      </li>\r\n      <li class=\"page-item\">\r\n        <a class=\"page-link\" href=\"#\">\r\n          Next\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n);\r\n"
    },
    {
        "name": "Progress",
        "js": "return (\r\n  <>\r\n    <div\r\n      class=\"progress mt-2\"\r\n      role=\"progressbar\"\r\n      aria-label=\"Basic example\"\r\n      aria-valuenow=\"0\"\r\n      aria-valuemin=\"0\"\r\n      aria-valuemax=\"100\"\r\n    >\r\n      <div class=\"progress-bar\" style={{ width: \"0\" }}></div>\r\n    </div>\r\n    <div\r\n      class=\"progress mt-2\"\r\n      role=\"progressbar\"\r\n      aria-label=\"Basic example\"\r\n      aria-valuenow=\"25\"\r\n      aria-valuemin=\"0\"\r\n      aria-valuemax=\"100\"\r\n    >\r\n      <div class=\"progress-bar\" style={{ width: \"25%\" }}></div>\r\n    </div>\r\n    <div\r\n      class=\"progress mt-2\"\r\n      role=\"progressbar\"\r\n      aria-label=\"Basic example\"\r\n      aria-valuenow=\"50\"\r\n      aria-valuemin=\"0\"\r\n      aria-valuemax=\"100\"\r\n    >\r\n      <div class=\"progress-bar\" style={{ width: \"50%\" }}></div>\r\n    </div>\r\n    <div\r\n      class=\"progress mt-2\"\r\n      role=\"progressbar\"\r\n      aria-label=\"Basic example\"\r\n      aria-valuenow=\"75\"\r\n      aria-valuemin=\"0\"\r\n      aria-valuemax=\"100\"\r\n    >\r\n      <div class=\"progress-bar\" style={{ width: \"75%\" }}></div>\r\n    </div>\r\n    <div\r\n      class=\"progress mt-2\"\r\n      role=\"progressbar\"\r\n      aria-label=\"Basic example\"\r\n      aria-valuenow=\"100\"\r\n      aria-valuemin=\"0\"\r\n      aria-valuemax=\"100\"\r\n    >\r\n      <div class=\"progress-bar\" style={{ width: \"100%\" }}></div>\r\n    </div>\r\n  </>\r\n);\r\n"
    },
    {
        "name": "Rating",
        "js": "return (\r\n  <div id=\"rating1\" class=\"star-rating\" role=\"rating\" data-rating=\"3\">\r\n    <span class=\"star\" data-value=\"1\">\r\n      &#9733;\r\n    </span>\r\n    <span class=\"star\" data-value=\"2\">\r\n      &#9733;\r\n    </span>\r\n    <span class=\"star\" data-value=\"3\">\r\n      &#9733;\r\n    </span>\r\n    <span class=\"star\" data-value=\"4\">\r\n      &#9733;\r\n    </span>\r\n    <span class=\"star\" data-value=\"5\">\r\n      &#9733;\r\n    </span>\r\n  </div>\r\n);\r\n"
    }
]
let jsLoader = []
for (const data of jsData) {

    jsLoader.push(data.js)
}
const javascriptSplitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
    chunkSize: 2000,
    chunkOverlap: 200,
});
const docs = await javascriptSplitter.createDocuments(jsLoader);
// Define the path to the repo to perform RAG on.
const REPO_PATH = "../data/bos/js";
const loader = new DirectoryLoader(REPO_PATH, {
    ".js": (path) => new TextLoader(path),
});
const docs2 = await loader.load();

const texts = await javascriptSplitter.splitDocuments(docs2);


const overview = readFileSync('../data/bos/overview.md', { encoding: 'utf8', flag: 'r' });
const quickstart = readFileSync('../data/bos/tutorial/quickstart.md', { encoding: 'utf8', flag: 'r' });
const helloNear = readFileSync('../data/bos/tutorial/hello-near.md', { encoding: 'utf8', flag: 'r' });
const helloLido = readFileSync('../data/bos/tutorial/hello-lido.md', { encoding: 'utf8', flag: 'r' });
const designSystem = readFileSync('../data/bos/tutorial/design-system.md', { encoding: 'utf8', flag: 'r' });
const bosEthersjs = readFileSync('../data/bos/tutorial/bos-ethersjs.md', { encoding: 'utf8', flag: 'r' });
const bosEthersjsBestPractices = readFileSync('../data/bos/tutorial/bos-ethersjs-best-practices.md', { encoding: 'utf8', flag: 'r' });
const near = readFileSync('../data/bos/api/near.md', { encoding: 'utf8', flag: 'r' });
const builtinComponents = readFileSync('../data/bos/api/builtin-components.md', { encoding: 'utf8', flag: 'r' });
const notifications = readFileSync('../data/bos/api/notifications.md', { encoding: 'utf8', flag: 'r' });
const primitives = readFileSync('../data/bos/api/primitives.md', { encoding: 'utf8', flag: 'r' });
const social = readFileSync('../data/bos/api/social.md', { encoding: 'utf8', flag: 'r' });
const state = readFileSync('../data/bos/api/state.md', { encoding: 'utf8', flag: 'r' });
const webMethods = readFileSync('../data/bos/api/web-methods.md', { encoding: 'utf8', flag: 'r' });
const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    chunkSize: 500,
    chunkOverlap: 0,
});
const docs1 = await splitter.createDocuments([overview, quickstart, helloNear, helloLido, designSystem, bosEthersjs, bosEthersjsBestPractices, near, builtinComponents, notifications, primitives, social, state, webMethods]);
const blockchainType = {
    NEAR_MAINNET: "mainnet",
    NEAR_TESTNET: "testnet",
};
const loaderMintbase = new MintBaseLoader(["mint.yearofchef.near"], "omni-site", blockchainType.NEAR_MAINNET);
const docs3 = await loaderMintbase.load();

docs.concat(docs1)
docs.concat(docs2)
docs.concat(docs3)

const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({ apiKey: OPENAI_API_KEY }));
vectorStore.save(`BOS-js`);
