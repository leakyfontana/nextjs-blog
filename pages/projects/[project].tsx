import { NextPage } from "next";
import router from "next/router";

const KVS: NextPage = () => {
    const { project } = router.query;

    return (
        <div>
            {`I am the ${project} page`}
        </div>
    );
}

export default KVS;