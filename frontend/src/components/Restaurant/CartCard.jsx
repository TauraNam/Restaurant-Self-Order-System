const CartCard = ({button, item}) => {console.log(item)
    return (
        <div className="cart-content-details">
            <img src={`http://localhost:4000/uploads/${item.imagePath}`} alt="product"></img>
            <p className="cart-title">{item.quantity > 1 ? `${item.quantity} x` : ''} {item.title}</p>
            <p className="cart-price">{item.price} €</p>
            {button && button}
        </div>
    );
}

export default CartCard;