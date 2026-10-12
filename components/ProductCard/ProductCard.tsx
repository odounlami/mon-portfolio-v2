

export default function ProductCard({
    name, price, imageUrl, inStock, isLoading
}: ProductCardProps) {
    const formatPrice = ` ${price} Fcfa`
    if (isLoading) {
        return <div className="animate-pulse bg-gray-200 h-40 rounded" />;
    }

    return (


        <div className="grid grid-cols-1 grid-rows-4 gap-4">
            { }
            <img src={imageUrl} alt="Description" />
            <h2>{name}</h2>
            <div>{formatPrice}</div>
            {!inStock && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm w-fit">
                    Rupture de stock
                </span>
            )}
            <button
                disabled={!inStock}
                className={`px-4 py-2 rounded ${inStock ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
                Ajouter au panier
            </button>
        </div>

    )
}