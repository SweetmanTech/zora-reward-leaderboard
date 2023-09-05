import Media from "../../shared/Media"

const DownloadAssetsButton = () => (
  <button
    type="button"
    className="w-[183px] h-[26px] bg-[black] 
                      text-white text-[15px]
                      font-bold font-quicksand
                      hover:scale-[1.05] scale-[1] transition duration-[300ms]
                      flex items-center justify-center
                      drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
                      rounded-[3px] cursor-pointer uppercase"
  >
    Download Assets
    <Media
      type="image"
      link="/assets/Profile/download.svg"
      blurLink="/assets/Profile/download.png"
      containerClasses="w-[16px] h-[16px]"
    />
  </button>
)

export default DownloadAssetsButton
