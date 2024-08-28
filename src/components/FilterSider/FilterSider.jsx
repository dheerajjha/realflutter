import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Filter, X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
const FilterSider = ({
  checkBoxItem,
  selected,
  handleCheckChange,
  setSelected,
}) => {
  const handleFilterClear = () => {
    setSelected([]);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="flex items-center gap-2 lg:hidden"
          variant="gradient"
        >
          <Filter size={18} />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mt-20">
          <div className="flex items-center justify-between gap-10 h-14">
            <div>
              <p className="whitespace-nowrap">6 Reasults</p>
            </div>
            <div className="flex items-center flex-wrap gap-5">
              <Button
                variant="text"
                className="underline text-lg text-blueHeading"
                onClick={handleFilterClear}
              >
                Clear Filters
              </Button>
            </div>
          </div>
          <Separator className="my-5" />
          <div>
            <ul className="space-y-3">
              {checkBoxItem.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-start gap-2"
                >
                  <Checkbox
                    className="mr-3"
                    onCheckedChange={(e) =>
                      handleCheckChange(e, item.name, item.slug)
                    }
                    checked={selected.some((i) => i.value === item.slug)}
                    name={item.slug}
                  />
                  {item.name}
                  <Image
                    src={`/assets/platform${item.icon}`}
                    alt={item.name}
                    width={24}
                    height={24}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSider;
