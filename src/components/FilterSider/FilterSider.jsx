import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Filter, X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import analytics from "@/lib/analytics/service";

const FilterSider = ({
  checkBoxItem,
  selected,
  handleCheckChange,
  setSelected,
}) => {
  const handleFilterClear = () => {
    analytics.logEvent('clear_all_filters', {
      previous_filter_count: selected.length,
      filters: selected.map(s => s.value)
    });
    setSelected([]);
  };

  const handleFilterToggle = (e, name, slug) => {
    handleCheckChange(e, name, slug);
    analytics.filterUse(e ? 'add_filter' : 'remove_filter', slug);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="flex items-center gap-2 lg:hidden"
          variant="gradient"
          onClick={() => analytics.logEvent('open_filter_sheet')}
        >
          <Filter size={18} />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mt-20">
          <div className="flex items-center justify-between gap-10 h-14">
            <div>
              <p className="whitespace-nowrap">6 Results</p>
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
                      handleFilterToggle(e, item.name, item.slug)
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
