import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: "sm" | "md" | "lg";
}

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  size = "md",
}: QuantitySelectorProps) => {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const numberClasses = {
    sm: "text-sm min-w-[2rem]",
    md: "text-base min-w-[2.5rem]",
    lg: "text-lg min-w-[3rem]",
  };

  return (
    <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-1">
      <Button
        variant="ghost"
        size="sm"
        className={`${sizeClasses[size]} text-blue-600 hover:bg-blue-100 p-0`}
        onClick={onDecrease}
      >
        <Minus className="w-4 h-4" />
      </Button>

      <span
        className={`${numberClasses[size]} text-center font-medium text-blue-700`}
      >
        {quantity}
      </span>

      <Button
        variant="ghost"
        size="sm"
        className={`${sizeClasses[size]} text-blue-600 hover:bg-blue-100 p-0`}
        onClick={onIncrease}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
