import "../styles/BiggerImage.css"

export default function BiggerImage(props) {

    return (
        <div className="big-image-div">
            <img src={props.imageSrc} />
            <button>X</button>
        </div>
    );
}