import styled from "styled-components";
import CategoryBar from "../../../components/common/CategoryBar/CategoryBar.jsx";
import ProductCard from "../../../components/common/ProductCard/ProductCard.jsx";
import { getProductInfoList } from "../../../api/customer/customerApi.js";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
    const {
        status,
        error,
        data: dbProduct,
    } = useQuery({
        queryKey: ["dbProductInfo"],
        queryFn: () =>
            getProductInfoList().then((data) => {
                return data.payload;
            }),
    });

    if (status === "loading") return <h1>Loading...</h1>;
    if (status === "error") return <h1>{JSON.stringify(error)}</h1>;

    return (
        <>
            <MainContainer>
                <CategoryBar />
                <ProductGrid>
                    {dbProduct && dbProduct.length > 0 ? (
                        dbProduct.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    ) : (
                        <h1>No products available</h1>
                    )}
                </ProductGrid>
            </MainContainer>
        </>
    );
};

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10rem 1rem 0; /* Adjusted padding for better spacing */
    width: 100%;
    box-sizing: border-box;
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr; /* Ensures one product per row */
    column-gap: 1.5rem;
    width: 100%;
    max-width: 1200px; /* Set a max-width for better control over layout */
    
`;

export default HomePage;
