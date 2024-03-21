export default function Button({ id, name,onClick, buttonClass, buttonType, box }) {
    return (
        <button 
            onClick={onClick}
            className={buttonClass}
            type={buttonType}
            id={id}
        >
            {box}{name} 
        </button>
    )
}