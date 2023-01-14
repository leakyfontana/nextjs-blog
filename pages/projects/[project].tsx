import { NextPage } from "next";
import { useRouter } from 'next/router'

const ProjectPage: NextPage = () => {
    const router = useRouter()
    const { project } = router.query;

    return (
        <div>
            {`I am the ${project} page`}
        </div>
    );
}

export default ProjectPage;