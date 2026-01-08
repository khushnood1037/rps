import type { ReactNode } from "react";
import { useRef } from "react";
import "./Commonheading.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, useGSAP);

function CommonHeading({
  title,
  centered,
  className,
  subtitle,
  col6,
}: {
  title?: string | ReactNode;
  centered?: boolean;
  className?: string;
  subtitle?: string | ReactNode;
  col6?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null)
  // useGSAP(() => {
  //   const ctx = gsap.context(() => {
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: containerRef.current,
  //         start: "top 70%",
  //         toggleActions: "play none none reverse",
  //       },
  //     });

  //     tl.from(".title", {
  //       y: 80,
  //       opacity: 0,
  //       duration: 0.7,
  //       ease: "power3.out",
  //     }).from(
  //       subtitleRef.current,
  //       {
  //         y: 30,
  //         opacity: 0,
  //         duration: 0.5,
  //         ease: "power2.out",
  //       },
  //       "-=0.3"
  //     );
  //   }, containerRef);

  //   return () => ctx.revert();
  // }, { scope: containerRef });
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", // trigger later for better consistency
            toggleActions: "play none none reverse",
          },
        });

        tl.from(containerRef.current.querySelector(".title"), {
          y: 80,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        });

        if (subtitleRef.current) {
          tl.from(
            subtitleRef.current,
            {
              y: 30,
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.3"
          );
        }
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );
  return (
    <div
      ref={containerRef}
      className={`common_heading ${centered ? "text-center" : ""} ${className || ""
        } ${col6 ? "col_6" : ""}`}
    >
      {title && <h2 className="title">{title}</h2>}
      {subtitle && <p className="subtitle" ref={subtitleRef}>{subtitle}</p>}
    </div>
  );
}

export default CommonHeading;