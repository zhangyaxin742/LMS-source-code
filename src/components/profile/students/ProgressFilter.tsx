
import React from "react";

interface ProgressFilterProps {
  progressFilter: string;
  setProgressFilter: (value: string) => void;
}

const ProgressFilter: React.FC<ProgressFilterProps> = ({ progressFilter, setProgressFilter }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <select
        className="px-3 py-2 bg-background border border-input rounded-md text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
        value={progressFilter}
        onChange={(e) => setProgressFilter(e.target.value)}
      >
        <option value="all">All Students</option>
        <option value="completed">Completed</option>
        <option value="ongoing">Ongoing</option>
      </select>
    </div>
  );
};

export default ProgressFilter;
