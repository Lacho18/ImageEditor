import "../styles/Editor.css";
import { useState } from "react";

export default function Editor() {
    const [styleSettings, setStyleSettings] = useState({
        type: "Brightness",
        currentValue: 0,
        functionality: "brightness"
    });

    function getRangeData(event) {
        console.log(event.target.value);
    }

    function setStyleType(type) {
        setStyleSettings(oldStyle => {
            return { ...oldStyle, type: type, currentValue: 0 }
        })
    }

    console.log(styleSettings);

    return (
        <div className="main-div">
            <div className="style-div">
                <div className="menu-section">
                    <div style={{ flexBasis: "10%", fontSize: "1.4em", fontWeight: "bold", textAlign: "center" }}>
                        <p>Image Editor</p>
                    </div>
                    <div className="buttons-style-type" style={{ flexBasis: "50%" }}>
                        <button onClick={() => { setStyleType("Brightness"); }}>Brightness</button>
                        <button onClick={() => { setStyleType("Saturation"); }}>Saturation</button>
                        <button onClick={() => { setStyleType("Inversion"); }}>Inversion</button>
                        <button onClick={() => { setStyleType("Grayscale"); }}>Grayscale</button>
                    </div>
                    <div className="input-range-div" style={{ flexBasis: "20%" }}>
                        <div>
                            <p style={{ flexBasis: "80%" }}>{styleSettings.type}</p>
                            <p style={{ flexBasis: "20%", textAlign: "right" }}>{styleSettings.currentValue}%</p>
                        </div>
                        <input type="range" onChange={getRangeData} />
                    </div>
                    <div className="rotation-buttons" style={{ flexBasis: "20%" }}>
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