import MenuCard, { MenuItem } from "./MenuCard";

interface MenuSectionProps {
  id: string;
  title: string;
  items: MenuItem[];
  category: "makanan" | "camilan";
  emptyMessage: string;
  onSelectItem: (item: MenuItem, category: string) => void;
}

export default function MenuSection({
  id,
  title,
  items,
  category,
  emptyMessage,
  onSelectItem,
}: MenuSectionProps) {
  return (
    <div id={id} className="pt-8 mx-auto max-w-6xl px-6">
      <div className="flex items-center mb-6">
        <h3 className="text-2xl font-bold text-slate-800 pr-4 whitespace-nowrap">{title}</h3>
        <div className="h-[1.5px] w-full bg-slate-200"></div>
      </div>

      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {items.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              category={category}
              onSelect={onSelectItem}
            />
          ))}
        </div>
      ) : (
        <p className="text-slate-400 italic mb-10">{emptyMessage}</p>
      )}
    </div>
  );
}