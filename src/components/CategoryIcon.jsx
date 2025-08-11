const CategoryIcon = ({ category, size="big" }) => {
  return (
    <div
      className={`category-icon ${size == 'small' ? 'category-icon--small' : ''}`}
      style={{ backgroundColor: category.bgColor }}
    >
      <img
        src={category.icon}
        alt={category.name}
        aria-hidden="true"
        className='category-icon-img'
      />
    </div>
  );
}

export default CategoryIcon
