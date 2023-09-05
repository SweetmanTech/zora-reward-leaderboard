import { Button } from "../../../shared/Button"

const AmountButton = ({ onClick, children }) => (
  <Button
    id="minus_btn"
    className="!p-0 
          md:w-[55px] md:h-[55px]
          w-[40px] h-[40px]
          !bg-[white] !text-black
          text-[30px] md:text-[50px]
          font-bold font-quicksand
          rounded-[10px]
          !shadow-[0px_4px_4px_rgb(0,0,0,0.25)]"
    onClick={onClick}
  >
    {children}
  </Button>
)

export default AmountButton
