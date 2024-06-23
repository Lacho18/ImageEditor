import "../styles/Editor.css";
import { useRef, useState } from "react";

export default function Editor() {
    //Describes the image styles
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

    const [imgSrc, setImgSrc] = useState({
        src: "",
        scale: 0
    });

    /*const [imgDirection, setImgDirection] = useState(1);

    const imgStyle = useRef({
        brightness: 100,
        saturate: 100,
        contrast: 100,
        grayscale: 0
    });*/

    //called every time the range input has changed
    function getRangeData(event) {
        console.log(event.target.value);
        setStyleSettings(oldStyle => {
            return { ...oldStyle, currentValue: event.target.value }
        })
    }

    //Called after a style has changed, in order to set the object data
    function setStyleType(type) {
        let range = getCorrectRange(type);
        setStyleSettings(oldStyle => {
            return { ...oldStyle, type: type, currentValue: range.begin, functionality: type !== "Saturation" ? type.toLowerCase() : "saturate", range: range };
        })
    }

    //Function that sets the border for the styles
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

    //Function that sets the image that will be visualized by reading the selected file and setting the img source state
    function getImgFile(event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = e.target.result;
                const myImg = new Image();
                myImg.onload = () => {
                    console.log("HEREEEEE");
                    console.log(myImg.width);
                    console.log(myImg.height);

                    let imageType = 0;
                    if (myImg.width > myImg.height) {
                        imageType = 1
                    }
                    else {
                        imageType = 0;
                    }

                    setImgSrc(oldData => {
                        return { src: img, imageType: imageType }
                    });
                }
                myImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    function downLoadImg() {
        let link = document.createElement("a");
        link.href = imgSrc.src;
        link.download = "edited_image.png"
        link.click();
    }

    //console.log(styleSettings);

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
                        <input type="range" step={1} onChange={getRangeData} min={styleSettings.range.min} max={styleSettings.range.max} value={styleSettings.currentValue} />
                    </div>
                    <div className="rotation-buttons" style={{ flexBasis: "20%" }}>
                        <button>➔</button>
                        <button>⇒</button>
                        <button>✦</button>
                        <button>✧</button>
                    </div>
                </div>
                <div className="image-visual">
                    <img src={imgSrc.src}
                        style={{
                            filter: `${styleSettings.functionality}(${styleSettings.currentValue}%)`,
                            width: imgSrc.imageType === 1 ? "500px" : "300px",
                            height: imgSrc.imageType === 0 ? "400px" : "300px",
                        }}
                    />
                </div>
            </div>
            <div className="function-div">
                <div>
                    <button>Reset filter</button>
                </div>
                <div style={{ justifyContent: "flex-end" }}>
                    <input type="file" placeholder="Choose image" accept="image/*" onChange={getImgFile} />
                    <button onClick={downLoadImg}>Save image</button>
                </div>
            </div>
        </div>
    )
}

//src="https://dotesports.com/wp-content/uploads/2020/05/18112329/Cosmic-Dust-Xayah.jpg"