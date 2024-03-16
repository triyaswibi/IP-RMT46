export default function Button({ name,onClick, buttonClass, buttonType, box }) {
    return (
        <button 
            onClick={onClick}
            className={buttonClass}
            type={buttonType}
        >
            {box}{name} 
        </button>
    )
}