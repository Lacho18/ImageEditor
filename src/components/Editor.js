import "../styles/Editor.css";
import { useState } from "react";

export default function Editor() {
    const [styleSettings, setStyleSettings] = useState({
        type: "Brightness",
        currentValue: 100,
        functionality: "brightness",
        range: {
            min: 0,
            max: 200,
            begin: 100
        }
    });

    function getRangeData(event) {
        console.log(event.target.value);
        setStyleSettings(oldStyle => {
            return { ...oldStyle, currentValue: event.target.value }
        })
    }

    function setStyleType(type) {
        let range = getCorrectRange(type);
        setStyleSettings(oldStyle => {
            return { ...oldStyle, type: type, currentValue: 0, functionality: type !== "Saturation" ? type.toLowerCase() : "saturate", range: range };
        })
    }

    function getCorrectRange(type) {
        let response = {
            min: 0,
            max: 0,
            begin: 0
        }
        switch (type) {
            case "Brightness": response.min = 0; response.max = 200; response.begin = 100;
                break;
            case "Saturation": response.min = 0; response.max = 200; response.begin = 100;
                break;
            case "Contrast": response.min = 0; response.max = 200; response.begin = 100;
                break;
            case "Grayscale": response.min = 0; response.max = 100; response.begin = 0;
                break;
            default: return;
        }

        return response;
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
                        <button onClick={() => { setStyleType("Contrast"); }}>Contrast</button>
                        <button onClick={() => { setStyleType("Grayscale"); }}>Grayscale</button>
                    </div>
                    <div className="input-range-div" style={{ flexBasis: "20%" }}>
                        <div>
                            <p style={{ flexBasis: "80%" }}>{styleSettings.type}</p>
                            <p style={{ flexBasis: "20%", textAlign: "right" }}>{styleSettings.currentValue}%</p>
                        </div>
                        <input type="range" onChange={getRangeData} min={styleSettings.range.min} max={styleSettings.range.max} value={styleSettings.range.begin} />
                    </div>
                    <div className="rotation-buttons" style={{ flexBasis: "20%" }}>
                        <button>➔</button>
                        <button>⇒</button>
                        <button>✦</button>
                        <button>✧</button>
                    </div>
                </div>
                <div className="image-visual">
                    <img src="https://dotesports.com/wp-content/uploads/2020/05/18112329/Cosmic-Dust-Xayah.jpg"
                        style={{ filter: `${styleSettings.functionality}(${styleSettings.currentValue}%)` }}
                    />
                </div>
            </div>
            <div className="function-div">
                <div>
                    <button>Reset filter</button>
                </div>
                <div style={{ justifyContent: "flex-end" }}>
                    <input type="file" placeholder="Choose image" />
                    <button>Save image</button>
                </div>
            </div>
        </div>
    )
}