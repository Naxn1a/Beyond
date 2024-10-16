import { useRouter } from "next/router";
import { CardList } from "@/components/cardlist";

const CardPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <CardList selectedId={id} />;
};

export default CardPage;
