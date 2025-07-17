
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAssignmentNavigation = (isEditModalOpen: boolean, setIsEditModalOpen: (open: boolean) => void) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check for edit=true in URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('edit') === 'true' && !isEditModalOpen) {
      setIsEditModalOpen(true);
    }
  }, [location.search, isEditModalOpen, setIsEditModalOpen]);

  const handleBackToAssignments = () => {
    // Check if we came from a classroom page
    if (location.state && location.state.from && location.state.from.includes('classroom')) {
      navigate(location.state.from);
    } else {
      navigate("/assignments");
    }
  };

  const handleCreateAssignment = () => {
    navigate("/assignments?create=true");
  };

  return {
    location,
    navigate,
    handleBackToAssignments,
    handleCreateAssignment
  };
};
