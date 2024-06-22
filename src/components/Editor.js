import "../styles/Editor.css";

export default function Editor() {

    return (
        <div className="main-div">
            <div className="style-div">
                <div className="menu-section">
                    <div>
                        <p>Image Editor</p>
                    </div>
                    <div>
                        <button>Brightness</button>
                        <button>Saturation</button>
                        <button>Inversion</button>
                        <button>Grayscale</button>
                    </div>
                    <div>
                        <input type="text" />
                    </div>
                    <div>
                        <button>➔</button>
                        <button>⇒</button>
                        <button>✦</button>
                        <button>✧</button>
                    </div>
                </div>
                <div className="image-visual">

                </div>
            </div>
            <div className="function-div">
                <p>123</p>
            </div>
        </div>
    )
}