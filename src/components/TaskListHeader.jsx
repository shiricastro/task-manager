import { memo } from "react";
import FilterBar from "./FilterBar";

const TaskListHeader = ({ selectedCategoryId, onSelectCategory, title, count, filterId }) => {
  return (
    <div className="flex items-center justify-between mb-mb-base">
      <div className="text-heading dark:text-dark-text desktop:text-heading-desktop">
        {title}<span className="text-primary ml-[10px]">{count}</span>
      </div>

      <FilterBar
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={onSelectCategory}
        id={filterId}
      />
    </div>
  );
};

export default memo(TaskListHeader);
