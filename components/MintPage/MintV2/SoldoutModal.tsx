import Modal from "../../../shared/Modal"
import Media from "../../../shared/Media"
import MintModalCTAButton from "./MintModalCTAButton"

const SoldoutModal = ({ isModalVisible, toggleIsVisible }) => (
  <Modal
    id="sold_out_modal"
    isVisible={isModalVisible}
    onClose={toggleIsVisible}
    showCloseButton
    modalClassName="!pt-[40px]"
    containerClassName="!rounded-[15px] md:!rounded-[20px] overflow-hidden"
  >
    <div
      className="bg-black flex flex-col items-center
      px-4 py-[30px] md:px-8 md:py-[60px] relative"
    >
      <pre
        className="font-quicksand 
                text-[15px] xl:text-[25px]
                text-center 
                dark:text-black text-white
                leading-[103.3%]
                absolute"
      >
        {`Sorry, we're all`}
      </pre>
      <Media
        type="image"
        link="/assets/MintV2/sold-out.svg"
        blurLink="/assets/MintV2/sold-out.png"
        containerClasses="md:w-[400px] md:h-[300px]
          w-[280px] h-[200px]"
      />
      <MintModalCTAButton
        id="share_tweet_btn"
        link="https://opensea.io/collection/cre8orsaipeps"
        target="_blank"
        className="mt-[40px]"
      >
        <p className="!p-0 !m-0 !leading-[120.3%]">View on opensea</p>
      </MintModalCTAButton>
    </div>
  </Modal>
)

export default SoldoutModal
