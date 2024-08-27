import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const BreadCrumbs = ({ breadCrumbs = [] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumbs.map((item, index) => (
          <React.Fragment key={index}>
            {item.id === breadCrumbs.length ? (
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={item.url}
                  className="text-[#62A5DA] font-medium"
                >
                  {item.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={item.url}
                  className="text-heading font-medium"
                >
                  {item.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {
              // Add a separator after each breadcrumb item
              item.id !== breadCrumbs.length && <BreadcrumbSeparator />
            }
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
