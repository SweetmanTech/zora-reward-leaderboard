import Modal from "../../shared/Modal"
import WalletConnectButton from "../WalletConnectButton"

interface ConnectWalletProps {
  handleClose: () => void
}

const ConnectWallet = ({ handleClose }: ConnectWalletProps) => (
  <Modal
    id="connect_wallet_claim"
    onClose={handleClose}
    isVisible
    containerClassName="!p-0"
    showCloseButton
  >
    <div
      className="dark:bg-[url('/assets/Common/popup.png')] bg-[url('/assets/Common/dark_popup.png')] 
              dark:bg-center bg-cover
              w-full 
              w-[290px] samsungS8:w-[340px] md:w-[400px] 
              h-[400px] md:h-[600px] 
              dark:shadow-[0px_5px_9px_rgba(255,255,255,0.25)] shadow-[0px_5px_9px_rgba(0,0,0,0.25)]
              rounded-[20px] flex flex-col justify-center items-center gap-[35px] relative"
    >
      <div
        className="font-eigerdals text-[36px] mb-[10px] text-white dark:text-black
       drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)]"
      >
        Connect
      </div>
      <WalletConnectButton>
        <button
          type="button"
          id="connect_wallet_in_claim"
          className="w-[270px]
          rounded
        !bg-[white] !text-black dark:!bg-[black] dark:!text-[white]
        shadow-[0px_4px_4px_rgb(255,255,255,0.25)] dark:shadow-[0px_4px_4px_rgb(0,0,0,0.25)]
        hover:scale-[1.1] scale-[1] transition duration-[300ms] 
        px-[28px] py-[11px]
        font-bold font-quicksand 
        flex items-center justify-center gap-[10px]"
        >
          Connect
        </button>
      </WalletConnectButton>
    </div>
  </Modal>
)

export default ConnectWallet
