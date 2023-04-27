import { useNavigate } from "react-router-dom";


export default function Market() {
    const router = useNavigate();

    // set up a pi wallet and a pi app
    // login page with pi network auth
    // auction page - payment goes to P1EWRLD wallet, 10% cut taken, then sent to seller
    // casino page - chose basic ($0.99), rare ($1.99), or ultra ($4.99) machine and spin for new avatar
    // market page - chose avatars from the market ($0.99 - $19.99 based on rarity)

    return(
        <>
        <button onClick={() => router('/')}>back</button>
        Market
        </>
    );
}