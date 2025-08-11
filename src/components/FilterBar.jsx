import { useMemo, useCallback, useId, useState } from "react";
import { useDropdowns } from "../context/DropdownContext";
import { CATEGORIES } from "../constants/categories";
import CategoryIcon from "./CategoryIcon";
import DropdownIcon from "./icons/DropdownIcon";

const FilterBar = ({ selectedCategoryId, onSelectCategory, id }) => {
  const ctx = useDropdowns();
  const controlled = !!ctx;

  const isOpen = controlled ? ctx.openId === id : undefined;
  const [internalOpen, setInternalOpen] = useState(false);

  const setOpen = useCallback((next) => {
    if (controlled) {
      ctx.setOpenId(next ? id : null);
    } else {
      setInternalOpen(!!next);
    }
  }, [controlled, ctx, id]);

  const open = controlled ? isOpen : internalOpen;

  const onBlur = useCallback((e) => {
    const next = e.relatedTarget;
    if (open && !e.currentTarget.contains(next)) {
      setOpen(false);
    }
  }, [open, setOpen]);

  const onKeyDown = useCallback((e) => {
    if (e.key === "Escape") setOpen(false);
    if ((e.key === "Enter" || e.key === " ") && !open) {
      e.preventDefault();
      setOpen(true);
    }
  }, [open, setOpen]);

  const selectedCategory = useMemo(
    () => CATEGORIES.find(cat => cat.id === selectedCategoryId) || null,
    [selectedCategoryId]
  );

  const listboxId = useId();

  const handleSelect = (categoryId) => {
    onSelectCategory(categoryId);
    setOpen(false);
  };

  return (
    <div
      className={`filter-bar-container ${open ? "z-20" : ""}`}
      onBlur={onBlur}
      tabIndex={-1}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        className="filter-bar-button main"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open ? "true" : "false"}
        aria-controls={open ? listboxId : undefined}
      >
        {selectedCategory ? (
          <div className="filter-bar-button-text">
            <CategoryIcon category={selectedCategory} size="small" />
            <span>{selectedCategory.name}</span>
          </div>
        ) : (
          <span className="filter-bar-button-text">Select category</span>
        )}
        <DropdownIcon
          className={`icon-size text-primary dark:text-dark-text transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id={listboxId}
          className="filter-bar-list-container"
          role="listbox"
          aria-label="Categories"
        >
          {selectedCategoryId != null && (
            <li
              key="all"
              role="option"
              aria-selected={selectedCategoryId == null ? "true" : "false"}
              onClick={() => handleSelect(null)}
              className="filter-bar-list-item"
              tabIndex={0}
            >
              <div className="filter-bar-list-item-wrap">
                <span>All categories</span>
              </div>
            </li>
          )}

          {CATEGORIES.map((cat) => (
            <li
              key={cat.id}
              role="option"
              aria-selected={cat.id === selectedCategoryId ? "true" : "false"}
              onClick={() => handleSelect(cat.id === selectedCategoryId ? null : cat.id)}
              className="filter-bar-list-item"
              tabIndex={0}
            >
              <div className="filter-bar-list-item-wrap">
                <CategoryIcon category={cat} size="small" />
                <span>{cat.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterBar;
