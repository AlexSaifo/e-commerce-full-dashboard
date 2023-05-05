
const Card = (props) => {
    return (
        <div className='p-4 rounded-2xl shadow-md bg-white dark:bg-secondary-dark-bg '>
            {
                props.children
            }
        </div>
    );
}
export default Card;