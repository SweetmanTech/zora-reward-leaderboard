import Media from "../../../shared/Media"
import { Button } from "../../../shared/Button"
import Modal from "../../../shared/Modal"

interface ReserveProps {
  handleClose: () => void
}

const NoTicket = ({ handleClose }: ReserveProps) => (
  <Modal id="no_ticket" onClose={handleClose} isVisible containerClassName="!p-0" showCloseButton>
    <div
      className="dark:bg-[url('/assets/Common/popup.png')] bg-[url('/assets/Common/dark_popup.png')] 
              dark:bg-center bg-cover
              w-[290px] samsungS8:w-[340px] md:w-[400px] 
              h-[400px] md:h-[600px] 
              dark:shadow-[0px_5px_9px_rgba(255,255,255,0.25)] shadow-[0px_5px_9px_rgba(0,0,0,0.25)]
              rounded-[20px] flex flex-col justify-center items-center gap-[20px] relative"
    >
      <div
        className="font-eigerdals text-[30px] md:text-[36px] text-center leading-[99.3%]
      dark:text-black text-white
      drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)]"
      >
        No Claim Tickets!
      </div>
      <Media
        link="/assets/Claim/ticket.svg"
        type="image"
        containerClasses="w-[300px] h-[150px] md:w-[280px] md:h-[300px]"
      />
      <Button
        type="button"
        id="go_btn_in_redeem"
        className="!uppercase w-[200px] 
        !bg-[white] !text-black dark:!bg-[black] dark:!text-[white]
        !shadow-[0px_4px_4px_rgb(255,255,255,0.25)] dark:!shadow-[0px_4px_4px_rgb(0,0,0,0.25)]
        z-[3] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <a href="https://reserve.cre8ors.com" target="_blank" rel="noreferrer">
          Reserve Now
        </a>
      </Button>
    </div>
  </Modal>
)

export default NoTicket
