"use client";
import type { SVGProps } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = SVGProps<SVGSVGElement>;

export const ZeroLogo = (props: Props) => {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: Intentional
    <svg
      {...props}
      fill="none"
      height="400"
      viewBox="0 0 400 400"
      width="400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M200 360C288.366 360 360 288.366 360 200C360 111.634 288.366 40 200 40C111.634 40 40 111.634 40 200C40 288.366 111.634 360 200 360ZM200 312C261.856 312 312 261.856 312 200C312 138.144 261.856 88 200 88C138.144 88 88 138.144 88 200C88 261.856 138.144 312 200 312Z"
        fill="white"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const ZeroLogoHover = (props: React.ComponentProps<typeof ZeroLogo>) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className="h-auto w-auto p-0" variant="ghost">
          <ZeroLogo {...props} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Zero</p>
      </TooltipContent>
    </Tooltip>
  );
};
