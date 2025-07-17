
import { useParams, useLocation } from "react-router-dom";
import ClassroomFeed from "@/components/classroom/ClassroomFeed";

const ClassroomFeedPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const classroomName = location.state?.classroomName || "Classroom";

  return (
    <ClassroomFeed
      classroomId={id || ""}
      classroomName={classroomName}
    />
  );
};

export default ClassroomFeedPage;
