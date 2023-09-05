import getPFPAttributes from "../../../lib/getPFPAttributes"
import { useUserProvider } from "../../../providers/UserProvider"
import AttributeCard from "./AttributeCard"

const PFPInformation = () => {
  const { metaData, cre8orNumber } = useUserProvider()

  return (
    <>
      <div
        className="font-quicksand uppercase text-[68px] [writing-mode:vertical-rl]
              text-white
              leading-[103.3%]
              rotate-[180deg]"
      >
        {cre8orNumber ? `CRE8OR #${cre8orNumber}` : ""}
      </div>
      <div className="flex flex-col gap-y-[10px]">
        {getPFPAttributes(metaData?.attributes).map((attr) => (
          <AttributeCard key={attr.trait_type} label={attr.trait_type} attribute={attr.value} />
        ))}
      </div>
    </>
  )
}

export default PFPInformation
