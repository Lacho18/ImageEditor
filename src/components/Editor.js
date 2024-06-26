import "../styles/Editor.css";
import "../styles/MobileStyle.css";
import { useRef, useState } from "react";
import BiggerImage from "./BiggerImage";
import SideButtons from "./SideButtons";

export default function Editor() {
    //Checks if the user device is a phone
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    //Describes the image styles
    const [styleSettings, setStyleSettings] = useState({
        type: "Brightness",
        currentValue: 100,
        functionality: "brightness",
        range: {
            min: 0,
            max: 200,
            begin: 100
        },
        settings: {
            brightness: 100,
            saturate: 100,
            contrast: 100,
            grayscale: 0
        }
    });

    //Describes the image source from the selected file and scale describes whether the image height is bigger that its width 
    const [imgSrc, setImgSrc] = useState({
        src: "",
        scale: 0
    });

    //Checks if the image is selected or clicked in order to show it bigger
    const [selectedImg, setSelectedImg] = useState(false);

    const [imgDegree, setImgDegree] = useState(0);

    //Reference values of the fixed style components. These are passed to the canvas element when the image is downloaded
    const imgStyle = useRef({
        brightness: 100,
        saturate: 100,
        contrast: 100,
        grayscale: 0
    });

    //SStores the data for the image resolution
    const imgSizes = useRef({
        width: 0,
        height: 0
    })

    //called every time the range input has changed
    function getRangeData(event) {
        styleSettings.settings[styleSettings.functionality] = Number(styleSettings.currentValue);
        setStyleSettings(oldStyle => {
            return { ...oldStyle, currentValue: event.target.value }
        })
    }

    //Called after a style has changed, in order to set the object data
    function setStyleType(type) {
        imgStyle.current[styleSettings.functionality] = Number(styleSettings.currentValue);
        styleSettings.settings[styleSettings.functionality] = Number(styleSettings.currentValue);
        let range = getCorrectRange(type);
        setStyleSettings(oldStyle => {
            return { ...oldStyle, type: type, currentValue: range.begin, functionality: type !== "Saturation" ? type.toLowerCase() : "saturate", range: range };
        });

        console.log(imgStyle.current);
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

    //Function that reset the image styles or on download image resets everything with the image
    function resetFilter(afterDownload) {
        if (afterDownload) {
            setStyleSettings({
                type: "Brightness",
                currentValue: 100,
                functionality: "brightness",
                range: {
                    min: 0,
                    max: 200,
                    begin: 100
                },
                settings: {
                    brightness: 100,
                    saturate: 100,
                    contrast: 100,
                    grayscale: 0
                }
            });
            setImgSrc({
                src: "",
                scale: 0
            });
        }
        else {
            setStyleSettings(oldStyle => {
                return {
                    ...oldStyle, settings: {
                        brightness: 100,
                        saturate: 100,
                        contrast: 100,
                        grayscale: 0
                    }
                }
            })

            console.log("RESET FUNCTION ELSE BLOCK");
            console.log(styleSettings);
        }
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
                    imgSizes.current.width = myImg.width;
                    imgSizes.current.height = myImg.height;
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

    //Function that describes the process of downloading the image 
    function downLoadImg() {
        console.log(imgSizes.current);
        if (imgSizes.current.width > 0) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext('2d');

            canvas.width = imgSizes.current.width;
            canvas.height = imgSizes.current.height;

            const filters = `
            brightness(${styleSettings.settings.brightness}%)
            saturate(${styleSettings.settings.saturate}%)
            contrast(${styleSettings.settings.contrast}%)
            grayscale(${styleSettings.settings.grayscale}%)
        `;

            context.filter = filters.trim();

            let editedImage = document.getElementById("editedImage");

            context.drawImage(editedImage, 0, 0);

            const dataUrl = canvas.toDataURL("image/png");

            resetFilter(true);

            let link = document.createElement("a");
            link.href = dataUrl;
            link.download = "edited_image.png"
            link.click();
        }
    }

    //Function that hides the selected image. It activates wherever on the computer screen is clicked. Does not work on phone.
    function hideSelectedImage() {
        console.log(selectedImg);
        if (selectedImg) {
            setSelectedImg(false);
        }
    }

    function rotationHandler(direction) {
        if (direction === 1) {
            console.log(123);
            if (imgDegree + 90 < 360) {
                setImgDegree(imgDegree + 90);
            }
            else {
                setImgDegree(0);
            }
        }
        else {
            if (imgDegree - 90 > 0) {
                setImgDegree(imgDegree - 90);
            }
            else {
                setImgDegree(360);
            }
        }
    }

    //Dynamic styling
    const combinedFilter = `
    brightness(${styleSettings.settings.brightness}%)
    saturate(${styleSettings.settings.saturate}%)
    contrast(${styleSettings.settings.contrast}%)
    grayscale(${styleSettings.settings.grayscale}%)
  `;

    return (
        <div className="main-div" onClick={hideSelectedImage}>
            <div className="style-div">
                <div className="menu-section">
                    <div style={{ flexBasis: "10%", fontSize: "1.4em", fontWeight: "bold", textAlign: "center", color: '#00796b' }}>
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
                    <SideButtons onRotate={rotationHandler} />
                </div>
                {!isMobile ? (
                    <div className="image-visual">
                        {imgSrc.src !== "" ? (
                            <img
                                id="editedImage"
                                src={imgSrc.src}
                                onClick={() => {
                                    if (!isMobile) {
                                        setSelectedImg(true)
                                    }
                                }}
                                style={{
                                    filter: combinedFilter.trim(),
                                    width: imgSrc.imageType === 1 ? "500px" : "300px",
                                    height: imgSrc.imageType === 0 ? "350px" : "300px",
                                    transform: `rotate(${imgDegree}deg)`
                                }}
                            />
                        ) : (
                            <p>Select image to visualize it here</p>
                        )}
                    </div>
                ) : (
                    <div className="image-visual">
                        {imgSrc.src !== "" ? (
                            <img
                                id="editedImage"
                                src={imgSrc.src}
                                style={{
                                    filter: combinedFilter.trim()
                                }}
                            />
                        ) : <p>Select image to visualize it here</p>}
                    </div>
                )}
            </div>
            <div className="function-div">
                <div className="reset-button">
                    <button onClick={() => { resetFilter(false) }}>Reset filter</button>
                </div>
                <div style={{ justifyContent: "flex-end" }}>
                    <input type="file" placeholder="Choose image" accept="image/*" onChange={getImgFile} />
                    <button onClick={downLoadImg}>Save image</button>
                </div>
            </div>
            {selectedImg && <BiggerImage imageSrc={imgSrc.src} />}
        </div>
    )
}