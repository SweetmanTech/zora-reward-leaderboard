import { FC } from "react"

interface SkeletonProps {
  className?: string
  type?: "single" | "multi"
  rowSpans?: number
}
const Skeleton: FC<SkeletonProps> = ({ className, type = "single", rowSpans }) => (
  <div className={`${className} rounded-[4px] gap-y-[5px] overflow-hidden flex flex-col bg-gray`}>
    {type === "single" && <div className="bg-gray-200 animate-pulse w-full h-full" />}
    {type === "multi" &&
      [...Array(rowSpans)].map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="bg-gray-200 animate-pulse w-full h-full rounded-[4px]" />
      ))}
  </div>
)
export default Skeleton
