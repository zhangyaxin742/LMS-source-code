
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AssignmentForm from '../AssignmentForm';
import { Assignment, Module } from '../types';

interface EditAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSave?: (assignment: Assignment) => void;
  modules?: Module[];
  assignment?: Assignment;
}

const EditAssignmentModal: React.FC<EditAssignmentModalProps> = ({
  isOpen,
  onClose,
  title = "Edit Assignment",
  onSave,
  modules = [],
  assignment
}) => {
  const handleSave = (assignment: Assignment) => {
    if (onSave) {
      onSave(assignment);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {assignment && modules && (
            <AssignmentForm
              onSave={handleSave}
              onCancel={onClose}
              modules={modules}
              initialValues={assignment}
            />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => {
            // Trigger the form submission via event
            document.dispatchEvent(new Event('assignment-submit'));
          }}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAssignmentModal;
