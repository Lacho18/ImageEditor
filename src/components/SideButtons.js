export default function RotationButtons(props) {

    return (
        <div className="rotation-buttons" style={{ flexBasis: "20%" }}>
            <button onClick={() => { props.onRotate(1) }}>➔</button>
            <button onClick={() => { props.onRotate(0) }}>⇒</button>
            <button>✦</button>
            <button>✧</button>
        </div>
    );
}