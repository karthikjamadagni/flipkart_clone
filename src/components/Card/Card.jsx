import './Card.css';

const Card = ({product_image, title, price}) => {
    return <>
    <div className="layout">
        <div className="layout-image">
            <img src={product_image} alt="not found"/>
        </div>
        <h3 className="title">{title}</h3>
        <h2>${price}</h2>
    </div>
    </>
}
 
export default Card;