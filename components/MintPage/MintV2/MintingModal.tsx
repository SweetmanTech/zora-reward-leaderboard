import Media from "../../../shared/Media"
import Modal from "../../../shared/Modal"

const MintingModal = () => (
  <Modal
    id="mint_loading_modal"
    isVisible
    onClose={() => {}}
    containerClassName="!rounded-[15px] md:!rounded-[20px] overflow-hidden"
  >
    <div
      className="p-4
                flex-col flex justify-center items-center
                bg-black
                xl:w-[500px] xl:h-[425px]"
    >
      <Media
        type="image"
        link="/assets/MintV2/minting.svg"
        blurLink="/assets/MintV2/minting.png"
        containerClasses="md:w-[400px] md:h-[300px]
        w-[280px] h-[150px]
        z-[3]"
      />
      <Media
        type="image"
        link="/assets/MintV2/loading.gif"
        blurLink="/assets/MintV2/loading.gif"
        containerClasses="md:w-[350px] md:h-[200px]
        w-[200px] h-[100px]
        z-[3]"
      />
    </div>
  </Modal>
)

export default MintingModal
