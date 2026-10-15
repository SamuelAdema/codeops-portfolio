import Image from "next/image";

export default function DishImage({ dish, priority = false }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-stone-100">
      <Image
        src={dish.image}
        alt={dish.name}
        width={600}
        height={400}
        priority={priority}
        className="h-48 w-full object-cover"
      />
    </div>
  );
}