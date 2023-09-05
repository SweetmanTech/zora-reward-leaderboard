/* eslint-disable no-nested-ternary */
import { FC } from "react"
import Modal from "../../shared/Modal"
import Media from "../../shared/Media"
import { TxSTATUS } from "../../hooks/useERC721Transfer"

interface Props {
  status?: string
  removing?: boolean
}

const TransferLoadingModal: FC<Props> = ({ status, removing }) => (
  <Modal
    id="train_modal"
    isVisible
    onClose={null}
    containerClassName="rounded-[30px] md:rounded-[56px] overflow-hidden bg-black
      drop-shadow-[2px_3px_2px_rgba(255,255,255,0.25)]"
    modalClassName="!z-[110]"
  >
    <div
      className="px-4 py-10 samsungS8:p-6 xs:p-8 xl:p-6 rounded-lg
          flex-col flex justify-center items-center
          md:w-[692px] md:h-[528px]
          bg-black"
    >
      <div
        className="font-eigerdals 
        text-[30px] md:text-[65px] text-white uppercase
        text-white uppercase"
      >
        {status ? `${status}...` : "Sending...."}
      </div>
      <Media
        type="image"
        link="/assets/Common/loading.svg"
        blurLink="/assets/Common/loading.svg"
        containerClasses="w-[100px] md:w-[150px] h-[130px] md:h-[250px]"
      />
      <pre
        className="font-quicksand 
            text-[18px] md:text-[33px]
            font-bold text-white
            text-center leading-[99.3%]
            w-[260px] md:w-full"
      >
        {`${
          removing
            ? "sign to remove an item from\nyour smart wallet"
            : "sign to send an item to\nyour smart wallet"
        }\n${status ? `#${status === TxSTATUS.INITIALIZING ? "1" : "2"} of 2` : ""}`}
      </pre>
    </div>
  </Modal>
)

export default TransferLoadingModal
