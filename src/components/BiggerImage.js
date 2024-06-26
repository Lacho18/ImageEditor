import "../styles/BiggerImage.css"

export default function BiggerImage(props) {

    return (
        <div className="big-image-div">
            <img src={props.imageSrc} style={{ transform: `rotate(${props.degRotate}deg)` }} />
            <button>X</button>
        </div>
    );
}